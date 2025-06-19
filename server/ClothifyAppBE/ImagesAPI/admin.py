from django.contrib import admin
from .models import ClothingItem

class ClothingItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user', 'clothingType')
    list_filter = ('clothingType', 'user')
    search_fields = ('title', 'user__username', 'clothingType')

admin.site.register(ClothingItem, ClothingItemAdmin)
