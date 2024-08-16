from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken,TokenError

class CookieAndHeaderJWTAuth(JWTAuthentication):
    def authenticate(self, request):
        header_auth = super().authenticate(request)
        if header_auth:
            return header_auth
        
        cookie_token = request.COOKIES.get('access_token')
        
        if cookie_token is None:
            return None
        
        try:
            validated_token = self.get_validated_token(cookie_token)
            return self.get_user(validated_token), validated_token
        except (InvalidToken, TokenError) as e:
            return None
            
    