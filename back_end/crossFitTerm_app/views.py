from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import CrossFitTerm
from .serializers import CrossFitTermSerializer


class TermListView(APIView):
    def get(self, request):
        terms = CrossFitTerm.objects.all()
        serializer = CrossFitTermSerializer(terms, many=True)
        return Response(serializer.data)


class TermDetailView(APIView):
    def get(self, request, id): 
        term = get_object_or_404(CrossFitTerm, id=id)
        serializer = CrossFitTermSerializer(term)
        return Response(serializer.data)
