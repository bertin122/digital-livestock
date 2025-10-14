import { BASE_URL } from '../constants/urls';

// Legacy user update function that matches the original implementation
export const legacyUpdateUser = async (updateData: {
  firstname: string;
  lastname: string;  
  email: string;
  password?: string;
  phone?: string;
}) => {
  try {
    // Use a fixed user ID of 1 for now, matching the original implementation
    const payload = {
      id: 1,
      firstname: updateData.firstname || '',
      lastname: updateData.lastname || '',
      email: updateData.email || '',
      password: updateData.password || '',
    };

    console.log('Legacy update payload:', payload);

    const response = await fetch(`${BASE_URL}/user/update`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Legacy response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Legacy update failed:', response.status, errorText);
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Legacy update success:', data);
    return data;
  } catch (error) {
    console.error('Legacy update error:', error);
    throw error;
  }
};