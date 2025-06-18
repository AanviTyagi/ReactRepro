import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppointments } from '../context/AppointmentContext';
import { FaStar, FaCheckCircle } from 'react-icons/fa';

function Consult() {
  const [specialization, setSpecialization] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const { addAppointment } = useAppointments();

  const doctors = [
    {
      id: 1,
      initials: 'AP',
      name: 'Dr. Arun Patel',
      specialization: 'Fertility Specialist',
      rating: 4.9,
      reviews: 156,
      address: '123 Medanta Hospital, Sector 38, Gurugram',
      isVerified: true
    },
    {
      id: 2,
      initials: 'RK',
      name: 'Dr. Rajesh Kumar',
      specialization: 'Urologist',
      rating: 4.8,
      reviews: 142,
      address: '456 Apollo Hospital, Sarita Vihar, Delhi',
      isVerified: true
    },
    {
      id: 3,
      initials: 'PM',
      name: 'Dr. Priya Mehta',
      specialization: 'Gynecologist',
      rating: 4.9,
      reviews: 189,
      address: '789 Max Hospital, Sector 19, Noida',
      isVerified: true
    },
    {
      id: 4,
      initials: 'SS',
      name: 'Dr. Sanjay Singh',
      specialization: 'Fertility Specialist',
      rating: 4.7,
      reviews: 134,
      address: '321 Fortis Hospital, Vasant Kunj, Delhi',
      isVerified: true
    },
    {
      id: 5,
      initials: 'AS',
      name: 'Dr. Anjali Sharma',
      specialization: 'Gynecologist',
      rating: 4.8,
      reviews: 167,
      address: '567 Artemis Hospital, Sector 51, Gurugram',
      isVerified: true
    }
  ];

  const specializations = [
    'All Specializations',
    'Fertility Specialist',
    'Urologist',
    'Gynecologist'
  ];

  const genders = ['All', 'Male', 'Female'];

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    const appointment = addAppointment(doctor);
    toast.success(
      <div>
        <p>Appointment booked successfully!</p>
        <p>Contact {doctor.name} at {doctor.phone}</p>
        <p className="text-sm mt-1">View details in your profile</p>
      </div>
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
  };

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Find Reproductive Health Specialists</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8 flex flex-wrap gap-4">
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="p-2 border border-gray-300 rounded-md min-w-[200px]"
          >
            {specializations.map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="p-2 border border-gray-300 rounded-md min-w-[150px]"
          >
            {genders.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="p-2 border border-gray-300 rounded-md min-w-[200px]"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            Search
          </button>
        </form>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-lg">
                      {doctor.initials}
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                        {doctor.isVerified && (
                          <FaCheckCircle className="ml-2 text-green-600" title="Verified Doctor" />
                        )}
                      </div>
                      <p className="text-gray-600">{doctor.specialization}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center text-yellow-400">
                    <FaStar />
                    <span className="ml-1 text-gray-900">{doctor.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-600">{doctor.reviews} reviews</span>
                </div>

                <p className="text-gray-600 mb-4">{doctor.address}</p>

                <button
                  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
                  onClick={() => handleBookAppointment(doctor)}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Consult; 