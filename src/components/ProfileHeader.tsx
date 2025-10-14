import React, { useRef } from 'react';
import { Camera, Mail, Phone, MapPin, Calendar, Shield, CheckCircle, XCircle, User } from 'lucide-react';
import { useUserProfile } from '../contexts/UserContext';
import { getAccountAgeText } from '../services/userService';

interface ProfileHeaderProps {
  showEditButton?: boolean;
  onEditClick?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  showEditButton = true, 
  onEditClick 
}) => {
  const { user, loading, error, updateUser, uploadAvatar } = useUserProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-200 rounded w-48"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-center text-red-500">
          <XCircle className="w-6 h-6 mr-2" />
          <span>Failed to load profile information</span>
        </div>
      </div>
    );
  }

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }

      const success = await uploadAvatar(file);
      if (!success) {
        alert('Failed to upload profile picture. Please try again.');
      }
    }
  };

  const displayName = `${user.firstname} ${user.lastname}`.trim();
  const profileInitials = `${user.firstname?.charAt(0) || ''}${user.lastname?.charAt(0) || ''}`.toUpperCase();
  const accountAge = user.joinDate ? getAccountAgeText(user.joinDate) : 'Recently joined';
  
  // Determine completion percentage
  const completionFields = [
    user.firstname,
    user.lastname,
    user.email,
    user.phone,
    user.address,
    user.bio
  ];
  const completedFields = completionFields.filter(Boolean).length;
  const completionPercentage = Math.round((completedFields / completionFields.length) * 100);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative p-8">
          {/* Profile Section */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Avatar */}
            <div className="relative group">
              <div 
                className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 shadow-xl"
                onClick={handleAvatarClick}
              >
                {user.profilePicture ? (
                  <img 
                    src={user.profilePicture} 
                    alt={displayName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white text-4xl font-bold">
                    {profileInitials || 'U'}
                  </span>
                )}
                
                {/* Camera Overlay */}
                <div className="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              
              {/* Status Indicator */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* User Information */}
            <div className="flex-1 space-y-4">
              {/* Name and Role */}
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {displayName || 'Anonymous User'}
                  </h1>
                  {user.role === 'admin' && (
                    <div className="flex items-center space-x-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      <Shield className="w-4 h-4" />
                      <span>Admin</span>
                    </div>
                  )}
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className="capitalize">{user.status}</span>
                  </div>
                </div>
                
                {user.bio && (
                  <p className="text-gray-600 text-lg leading-relaxed">{user.bio}</p>
                )}
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.email && (
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{user.email}</p>
                        {user.isEmailVerified ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {user.phone && (
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{user.phone}</p>
                        {user.isPhoneVerified ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {user.address && (
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
                      <MapPin className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                      <p className="font-medium">{user.address}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Account Info */}
              <div className="flex items-center space-x-6 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Member for {accountAge}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Profile {completionPercentage}% complete</span>
                </div>
                
                {user.lastLogin && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="text-sm">
                      Last active: {new Date(user.lastLogin).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            {showEditButton && (
              <div className="flex flex-col space-y-3">
                <button
                  onClick={onEditClick}
                  className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Edit Profile
                </button>
                
                {completionPercentage < 100 && (
                  <div className="text-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">Complete your profile</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;