from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status
from .serializers import RegisterSerializer, UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter

#when user clicks login form data is validated, if not in user table return with response of invalid credentials, else return refresh token in httponly cookie
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(username=email, password=password)
    if user is None:
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    if not user.is_active:
        return Response({"detail": "User account is not active"}, status=status.HTTP_403_FORBIDDEN)
    
    refresh = RefreshToken.for_user(user)

    response = Response()

    response.set_cookie(
        key='access_token',
        value=str(refresh.access_token),
        httponly=True,
        secure=False,
        samesite='Lax',
        max_age=60*60,
    )
    response.data = {"message": "Login succesful", "access": str(refresh.access_token), "refresh": str(refresh)}
    return response

#when user creates an account, use register serializer to register their data, if its valid save user to db else dont
@api_view(['POST'])
@permission_classes([AllowAny])
def create_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({"message": "User created"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#when frontend sends get request for profile send user data regardless of if its null or exists
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    user=request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)

#deletes and blacklists jwt refresh token in cookie
@api_view(['POST'])
@permission_classes([])
def logout_view(request):
    refresh_token = request.data.get("refresh")
    print("Received refresh token:", refresh_token) 
    if not refresh_token:
        return Response({"error": "Refresh token required"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        token = RefreshToken(refresh_token)
        token.blacklist()
        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token', path='/')
        return response
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

#if google returns a valid user and token, send token in httponly cookie
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:5173"
    client_class = OAuth2Client

    def get_response(self):
        try:
            print(self.request.data)
            super_response = super().get_response()

            if not self.user:
                return Response({"error": "User object is None"}, status=400)
            user = self.user
            
            refresh = RefreshToken.for_user(user)
            response = Response({"message": "Google login successful", "access": str(refresh.access_token), "refresh": str(refresh)})
            response.set_cookie(
                key='access_token',
                value=str(refresh.access_token),
                httponly=True,
                secure=False,
                samesite='Lax',
                max_age=60*60,
            )
            return response
        except Exception as e:
            return Response({"error": str(e)}, status=500)
        