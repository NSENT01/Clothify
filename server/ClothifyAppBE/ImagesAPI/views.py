
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import ClothingItemSerializer
from .models import ClothingItem
import requests
from django.core.files.base import ContentFile
import os
import re
from django.conf import settings
import uuid

pixian_id = os.getenv("PIXIAN_ID")
pixian_secret = os.getenv("PIXIAN_SECRET")

# Create your views here.
#when front end loads protected wardrobe dashboard send post request for their clothing items from table
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def image_retrieval(request):
    user = request.user
    items = ClothingItem.objects.filter(user=user)
    serializer = ClothingItemSerializer(items, many=True)
    return Response(serializer.data)

#upon upload, if entered files and names are valid, send to pixian api to offload ai background removal and then store in clothing item model 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def image_upload(request):
    image_file = request.FILES.get('uploadItem')
    title = request.data.get('title')
    clothing_type = request.data.get('clothingType')
    unique_suffix = uuid.uuid4().hex[:8]

    if not image_file or not title or not clothing_type:
        return Response({'error': 'Missing fields'}, status=status.HTTP_400_BAD_REQUEST)

    # Clean the title for a safe filename
    safe_title = re.sub(r'[^a-zA-Z0-9_-]', '_', title)

    # Send image to Pixian API
    try:
        pixian_response = requests.post(
            'https://api.pixian.ai/api/v2/remove-background',
            files={'image': (image_file.name, image_file, image_file.content_type)},
            auth=(pixian_id, pixian_secret)
        )
    except Exception as e:
        return Response({'error': f'Pixian API request failed: {str(e)}'}, status=500)

    if pixian_response.status_code != 200:
        return Response({'error': f'Background removal failed: {pixian_response.text}'}, status=500)

    # Save the processed image to your model
    processed_image = ContentFile(pixian_response.content)
    clothing_item = ClothingItem(
        title=title,
        user=request.user,
        clothingType=clothing_type,
    )
    clothing_item.uploadItem.save(f"{safe_title}_{unique_suffix}_nobg.png", processed_image)
    clothing_item.save()

    serializer = ClothingItemSerializer(clothing_item)
    return Response(serializer.data, status=status.HTTP_201_CREATED)