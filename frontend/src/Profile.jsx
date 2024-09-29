import React from "react";

function Profile() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800">Profile Settings</h2>
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-gray-700">Email Address</label>
            <input type="email" className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
