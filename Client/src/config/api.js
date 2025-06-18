const API_BASE_URL = 'http://localhost:5002/api';

export const API_ENDPOINTS = {
  register: `${API_BASE_URL}/users/register`,
  login: `${API_BASE_URL}/users/login`,
  profile: `${API_BASE_URL}/users/profile`,
  moods: `${API_BASE_URL}/moods`,
  uploadProfileImage: `${API_BASE_URL}/users/upload-profile-image`,
  updateProfile: `${API_BASE_URL}/users/profile`,
};

export default API_BASE_URL; 