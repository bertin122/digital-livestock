import { BASE_URL } from '../constants/urls';

export const testServerConnectivity = async () => {
  console.log('🔍 Starting server diagnostic...');
  console.log('Base URL:', BASE_URL);

  // Test 1: Check if server is reachable
  try {
    console.log('📡 Testing server connectivity...');
    const response = await fetch(`${BASE_URL}/user/namebyid`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 1 }),
    });
    
    console.log('Server response status:', response.status);
    console.log('Server response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Server is reachable. Sample user data:', data);
    } else {
      console.log('❌ Server returned error:', response.status, response.statusText);
    }
  } catch (error) {
    console.log('❌ Server connectivity test failed:', error);
  }

  // Test 2: Try a simple update request
  try {
    console.log('🔄 Testing user update endpoint...');
    const updateResponse = await fetch(`${BASE_URL}/user/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 1,
        firstname: 'Test',
        lastname: 'User',
        email: 'test@example.com'
      }),
    });
    
    console.log('Update response status:', updateResponse.status);
    
    if (updateResponse.ok) {
      const updateData = await updateResponse.json();
      console.log('✅ Update endpoint works. Response:', updateData);
    } else {
      const errorText = await updateResponse.text();
      console.log('❌ Update endpoint failed:', updateResponse.status, errorText);
    }
  } catch (error) {
    console.log('❌ Update test failed:', error);
  }
};

export const debugUserUpdate = async (updateData: any) => {
  console.log('🛠️ Debug: Attempting user update with data:', updateData);
  
  try {
    const response = await fetch(`${BASE_URL}/user/update`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('Raw response text:', responseText);
    
    try {
      const responseJson = JSON.parse(responseText);
      console.log('Parsed response JSON:', responseJson);
      return { success: response.ok, data: responseJson };
    } catch (parseError) {
      console.log('Failed to parse response as JSON:', parseError);
      return { success: false, error: 'Invalid JSON response', rawResponse: responseText };
    }
  } catch (networkError) {
    console.log('Network error:', networkError);
    return { success: false, error: networkError.message };
  }
};