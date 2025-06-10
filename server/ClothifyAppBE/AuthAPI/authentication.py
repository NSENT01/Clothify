from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Read the token from the cookie instead of Authorization header
        raw_token = request.COOKIES.get('access_token')
        if raw_token is None:
            return None  # No token in cookies

        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token