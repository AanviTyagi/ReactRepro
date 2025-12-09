import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    promotions: false,
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleNotificationChange = (e) => {
    setNotifications({
      ...notifications,
      [e.target.name]: e.target.checked,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved!');
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    toast.success('Password updated successfully!');
    setPassword({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Notifications Section */}
          <div className="bg-white rounded-xl shadow-md p-6 animate-fade-in-up">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Email Notifications</h3>
                  <p className="text-xs text-gray-500">Receive updates about your appointments via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="email"
                    checked={notifications.email}
                    onChange={handleNotificationChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">SMS Notifications</h3>
                  <p className="text-xs text-gray-500">Get text messages for appointment reminders</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="sms"
                    checked={notifications.sms}
                    onChange={handleNotificationChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveNotifications}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 text-sm"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="bg-white rounded-xl shadow-md p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Change Password</h2>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  name="current"
                  value={password.current}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    name="new"
                    value={password.new}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirm"
                    value={password.confirm}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                    required
                  />
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 text-sm"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
