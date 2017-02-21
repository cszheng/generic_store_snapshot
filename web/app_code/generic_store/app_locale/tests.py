from rest_framework import status
from rest_framework.test import APITestCase
from generic_store.settings import LANGUAGE_CODE
from .models import AppLocaleName

#tests for r'get_locale/$' url
class GetLocaleTest(APITestCase):
	fixtures = ['app_locale_applocalename.json'] 

	def test_get_locale(self):
		response = self.client.get('/api/app_locale/get_locale/')
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		responseObj = response.data
		self.assertEqual(responseObj['locale_code'], LANGUAGE_CODE)

#tests for r'set_locale/$' url
class SetLocaleTest(APITestCase):
	fixtures = ['app_locale_applocalename.json'] 

	def setUp(self):
		self.data = { 'locale_code': 'en-us' }

	def test_set_locale(self):
		response = self.client.post('/api/app_locale/set_locale/', self.data, format='json')
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		responseObj = response.data
		self.assertEqual(responseObj['locale_code'], self.data['locale_code'])

#tests for r'^' ir;s
class AppLocaleNameGetTest(APITestCase):
	fixtures = ['app_locale_applocalename.json'] 

	def test_get_list(self):
		response = self.client.get('/api/app_locale/applocalename/')
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(len(response.data), AppLocaleName.objects.count())

	def test_get(self):
		response = self.client.get('/api/app_locale/applocalename/1/')
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		responseObj = response.data
		modelObj = AppLocaleName.objects.get(pk=1)
		self.assertEqual(responseObj['locale_code'], modelObj.locale_code)