from rest_framework.views import APIView
from django.http import JsonResponse, Http404
from googleapiclient.discovery import build
from final_proj.settings import env
from crossFitTerm_app.models import CrossFitTerm


class VideoView(APIView):
    def get(self, request, exercise):
        api_key = env.get("Youtube_API_Key")
        channel_id = "UCtcQ6TPwXAYgZ1Mcl3M1vng"

        term = CrossFitTerm.objects.get(term=exercise)
        if term.workout:
            youtube = build("youtube", "v3", developerKey=api_key)
            request = youtube.search().list(
                q=exercise, part="id,snippet", channelId=channel_id, maxResults=1
            )
            response = request.execute()

            if "error" in response:
                return JsonResponse(
                    {"error": "Error in YouTube API request"},
                    status=response.status_code,
                )

            return JsonResponse(response)
        else:
            return JsonResponse({})
