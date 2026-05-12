"""
Notifications URLs for ARTX Platform
"""
from django.urls import path
from . import views

urlpatterns = [
    # Email notifications
    path('send-email/', views.send_email_notification, name='send_email'),
    
    # SMS notifications
    path('send-sms/', views.send_sms_notification, name='send_sms'),
    
    # Notification preferences
    path('preferences/', views.notification_preferences, name='notification_preferences'),
    
    # Notification history
    path('history/', views.notification_history, name='notification_history'),
    
    # Frontend integration endpoints
    path('tier-upgrade/', views.tier_upgrade_notification, name='tier_upgrade_notification'),
    path('alliance-join/', views.alliance_join_notification, name='alliance_join_notification'),
]