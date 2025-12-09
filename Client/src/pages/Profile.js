import React, { useState, useEffect, useRef } from 'react';
import { API_ENDPOINTS } from '../config/api';
import { toast } from 'react-toastify';
import { useAppointments } from '../context/AppointmentContext';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const fileInputRef = useRef(null);
  const prescriptionInputRef = useRef(null);
  const { appointments, cancelAppointment, deleteAppointment } = useAppointments();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(API_ENDPOINTS.profile, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setUserData(data);
        setEditedData(data);
        setProfileImage(data.profileImage || null);
        setPrescriptions(data.prescriptions || []);
      } catch (error) {
        toast.error('Error loading profile');
        console.error('Profile fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.match('image.*')) {
      toast.error('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.uploadProfileImage, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload profile image');
      }

      const data = await response.json();
      
      // Update both the profile image state and the user data state
      setProfileImage(data.imageUrl);
      setUserData(prevData => ({
        ...prevData,
        profileImage: data.imageUrl
      }));
      
      // Also update the edited data if in edit mode
      if (isEditing) {
        setEditedData(prevData => ({
          ...prevData,
          profileImage: data.imageUrl
        }));
      }

      toast.success('Profile picture updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Error uploading profile picture');
      console.error('Profile image upload error:', error);
    }
  };

  const handlePrescriptionUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size should be less than 10MB');
      return;
    }

    // Validate file type
    if (!file.type.match('application/pdf|image.*')) {
      toast.error('Please upload a PDF or image file');
      return;
    }

    const formData = new FormData();
    formData.append('prescription', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.uploadPrescription, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload prescription');
      }

      const data = await response.json();
      setPrescriptions([...prescriptions, data]);
      toast.success('Prescription uploaded successfully!');
    } catch (error) {
      toast.error(error.message || 'Error uploading prescription');
      console.error('Prescription upload error:', error);
    }
  };

  const handleDeletePrescription = async (prescriptionId) => {
    if (!window.confirm('Are you sure you want to delete this prescription?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.deletePrescription}/${prescriptionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete prescription');
      }

      setPrescriptions(prev => prev.filter(p => p._id !== prescriptionId));
      toast.success('Prescription deleted successfully');
    } catch (error) {
      toast.error('Error deleting prescription');
      console.error('Delete error:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(userData);
  };

  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.updateProfile, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedData = await response.json();
      setUserData(updatedData);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Profile update error:', error);
    }
  };

  const handleCancelAppointment = (appointmentId) => {
    cancelAppointment(appointmentId);
    toast.info('Appointment cancelled successfully');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'Completed':
        return 'text-green-600 bg-green-50';
      case 'Cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Profile</h3>
          <p className="text-gray-600">We couldn't load your profile data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-32 bg-gradient-to-r from-green-500 to-green-600">
            <div className="absolute -bottom-16 left-8">
              <div 
                className="relative h-32 w-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100">
                    <svg className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleProfileImageUpload}
              />
            </div>
            <div className="absolute top-4 right-4">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-8 pt-20 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                  ) : (
                    <div className="text-lg font-semibold text-gray-900">{userData.name}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="flex items-center space-x-2">
                    <div className="text-gray-900">{userData.email}</div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editedData.phone || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                  ) : (
                    <div className="text-gray-900">{userData.phone || 'Not provided'}</div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={editedData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                  ) : (
                    <div className="text-gray-900">
                      {new Date(userData.dateOfBirth).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  {isEditing ? (
                    <select
                      name="gender"
                      value={editedData.gender}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  ) : (
                    <div className="text-gray-900">{userData.gender}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                  <div className="text-gray-900">
                    {new Date(userData.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="text-green-600 text-lg font-semibold mb-2">Appointments</div>
                  <div className="text-3xl font-bold text-gray-900">{appointments.length}</div>
                  <div className="text-sm text-gray-600 mt-1">Total consultations</div>
                </div>
                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="text-green-600 text-lg font-semibold mb-2">Health Records</div>
                  <div className="text-3xl font-bold text-gray-900">{prescriptions.length}</div>
                  <div className="text-sm text-gray-600 mt-1">Uploaded documents</div>
                </div>
                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="text-green-600 text-lg font-semibold mb-2">Prescriptions</div>
                  <div className="text-3xl font-bold text-gray-900">{prescriptions.length}</div>
                  <div className="text-sm text-gray-600 mt-1">Active medications</div>
                </div>
              </div>
            </div>

            {/* Prescriptions Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Prescriptions & Medical Records</h3>
                <button
                  onClick={() => prescriptionInputRef.current?.click()}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Upload New
                </button>
                <input
                  type="file"
                  ref={prescriptionInputRef}
                  className="hidden"
                  accept="application/pdf,image/*"
                  onChange={handlePrescriptionUpload}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prescriptions.map((prescription, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{prescription.name}</h4>
                          <p className="text-xs text-gray-500">{new Date(prescription.uploadedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <a
                          href={prescription.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700"
                          title="View"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </a>
                        <button
                          onClick={() => handleDeletePrescription(prescription._id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {prescriptions.length === 0 && (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No prescriptions</h3>
                  <p className="mt-1 text-sm text-gray-500">Upload your first prescription or medical record.</p>
                </div>
              )}
            </div>

            {/* Appointments Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
              <h2 className="text-2xl font-bold mb-6">My Appointments</h2>
              
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div 
                      key={appointment.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{appointment.doctorName}</h3>
                          <p className="text-gray-600">{appointment.specialization}</p>
                          <p className="text-gray-500 text-sm mt-1">{appointment.address}</p>
                          <p className="text-gray-500 text-sm">Contact: {appointment.phone}</p>
                          <p className="text-gray-500 text-sm">
                            Booked on: {new Date(appointment.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                          {appointment.status === 'Pending' && (
                            <button
                              onClick={() => handleCancelAppointment(appointment.id)}
                              className="mt-2 text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              Cancel Appointment
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if(window.confirm('Delete this appointment record?')) {
                                deleteAppointment(appointment.id);
                                toast.success('Appointment deleted');
                              }
                            }}
                            className="mt-1 text-gray-400 hover:text-red-500 text-xs flex items-center"
                          >
                            <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete Record
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
                  <p className="mt-1 text-sm text-gray-500">Book your first appointment with a specialist.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 