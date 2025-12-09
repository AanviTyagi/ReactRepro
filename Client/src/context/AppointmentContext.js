import React, { createContext, useContext, useState, useEffect } from 'react';

const AppointmentContext = createContext();

export const useAppointments = () => {
  return useContext(AppointmentContext);
};

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(() => {
    const savedAppointments = localStorage.getItem('appointments');
    return savedAppointments ? JSON.parse(savedAppointments) : [];
  });

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (doctor) => {
    const newAppointment = {
      id: Date.now(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      phone: doctor.phone,
      address: doctor.address,
      status: 'Pending',
      date: new Date().toISOString(),
    };

    setAppointments(prev => [...prev, newAppointment]);
    return newAppointment;
  };

  const updateAppointmentStatus = (appointmentId, status) => {
    setAppointments(prev =>
      prev.map(app =>
        app.id === appointmentId ? { ...app, status } : app
      )
    );
  };

  const cancelAppointment = (appointmentId) => {
    setAppointments(prev =>
      prev.map(app =>
        app.id === appointmentId ? { ...app, status: 'Cancelled' } : app
      )
    );
  };

  const deleteAppointment = (appointmentId) => {
    setAppointments(prev => prev.filter(app => app.id !== appointmentId));
  };

  const value = {
    appointments,
    addAppointment,
    updateAppointmentStatus,
    cancelAppointment,
    deleteAppointment,
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
}; 