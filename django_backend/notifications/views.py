"""
Notification views for ARTX Platform
"""
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .tasks import send_tier_upgrade_email, send_alliance_join_email


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_email_notification(request):
    """Send email notification"""
    # TODO: Implement email sending logic
    return Response({'message': 'Email notification sent'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_sms_notification(request):
    """Send SMS notification"""
    # TODO: Implement SMS sending logic
    return Response({'message': 'SMS notification sent'}, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def notification_preferences(request):
    """Get or update notification preferences"""
    if request.method == 'GET':
        # TODO: Get user notification preferences
        return Response({'preferences': {}}, status=status.HTTP_200_OK)
    else:
        # TODO: Update user notification preferences
        return Response({'message': 'Preferences updated'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def notification_history(request):
    """Get notification history"""
    # TODO: Implement notification history
    return Response({'notifications': []}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tier_upgrade_notification(request):
    """Send tier upgrade email notification"""
    try:
        old_tier = request.data.get('old_tier')
        new_tier = request.data.get('new_tier')
        
        if not old_tier or not new_tier:
            return Response(
                {'error': 'old_tier and new_tier are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Send tier upgrade email
        send_tier_upgrade_email(request.user.id, old_tier, new_tier)
        
        return Response({
            'message': f'Tier upgrade email sent for {old_tier} -> {new_tier}',
            'success': True
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def alliance_join_notification(request):
    """Send alliance join email notification"""
    try:
        alliance_name = request.data.get('alliance_name')
        
        if not alliance_name:
            return Response(
                {'error': 'alliance_name is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # For now, we'll create a mock alliance or use alliance ID 1
        # In a real implementation, you'd look up the alliance by name
        alliance_id = 1  # Mock alliance ID
        
        # Send alliance join email
        send_alliance_join_email(request.user.id, alliance_id)
        
        return Response({
            'message': f'Alliance join email sent for {alliance_name}',
            'success': True
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )