import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Edit } from "lucide-react";

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Farm Road, Countryside, CA 90210",
  });

  const handleSave = () => {
    // Mock save
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your account information.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Personal Information
          </h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <Edit className="w-4 h-4" />
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              ) : (
                <p className="mt-1 text-gray-900">{profile.name}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              ) : (
                <p className="mt-1 text-gray-900">{profile.email}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              ) : (
                <p className="mt-1 text-gray-900">{profile.phone}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              {isEditing ? (
                <textarea
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={3}
                />
              ) : (
                <p className="mt-1 text-gray-900">{profile.address}</p>
              )}
            </div>
          </div>
          {isEditing && (
            <div className="pt-4">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
