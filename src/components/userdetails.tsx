import React, { useState } from "react";
import Modal from "../modals/modal";
import {
  Check,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  FileText,
  Eye,
  EyeOff,
} from "lucide-react";
import { useUserProfile } from "../contexts/UserContext";
import type { User as UserType, UserFormData } from "../types/user";

interface FormErrors {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  address?: string;
  bio?: string;
  dateOfBirth?: string;
  occupation?: string;
  password?: string;
  confirmPassword?: string;
}

const UserDetails: React.FC = () => {
  const { user, loading, updateUser } = useUserProfile();
  const [formData, setFormData] = useState<Partial<UserType>>({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    bio: user?.bio || "",
    dateOfBirth: user?.dateOfBirth || "",
    gender: user?.gender || "other",
    occupation: user?.occupation || "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isFormChanged, setIsFormChanged] = useState(false);

  // Update form data when user data changes
  React.useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        bio: user.bio || "",
        dateOfBirth: user.dateOfBirth || "",
        gender: user.gender || "other",
        occupation: user.occupation || "",
      });
    }
  }, [user]);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.firstname?.trim()) {
      errors.firstname = "First name is required";
    }

    if (!formData.lastname?.trim()) {
      errors.lastname = "Last name is required";
    }

    if (!formData.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (
      formData.phone &&
      !/^[+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-()]/g, ""))
    ) {
      errors.phone = "Please enter a valid phone number";
    }

    if (formData.bio && formData.bio.length > 500) {
      errors.bio = "Bio must be less than 500 characters";
    }

    if (password && password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (password && password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof UserType, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsFormChanged(true);

    // Clear specific field error when user starts typing
    if (formErrors[field as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const updateData: Partial<UserFormData> = { ...formData };

      // Include password if provided
      if (password) {
        updateData.password = password;
      }

      console.log("Attempting to update user with data:", updateData);

      const result = await updateUser(updateData);

      if (result) {
        setModalType("success");
        setModalMessage("Profile updated successfully!");
        setPassword("");
        setConfirmPassword("");
        setIsFormChanged(false);
      } else {
        setModalType("error");
        setModalMessage(
          "Failed to update profile. Please check your connection and try again."
        );
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setModalType("error");
      setModalMessage(
        `An unexpected error occurred: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }

    setShowModal(true);
    setTimeout(() => setShowModal(false), 4000);
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center mb-4">
            <User className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstname || ""}
                onChange={(e) => handleInputChange("firstname", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                  formErrors.firstname
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Enter your first name"
              />
              {formErrors.firstname && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.firstname}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.lastname || ""}
                onChange={(e) => handleInputChange("lastname", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                  formErrors.lastname
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Enter your last name"
              />
              {formErrors.lastname && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.lastname}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dateOfBirth || ""}
                onChange={(e) =>
                  handleInputChange("dateOfBirth", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                value={formData.gender || "other"}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
              >
                <option value="other">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Occupation */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Briefcase className="w-4 h-4 inline mr-1" />
                Occupation
              </label>
              <input
                type="text"
                value={formData.occupation || ""}
                onChange={(e) =>
                  handleInputChange("occupation", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                placeholder="What do you do for work?"
              />
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center mb-4">
            <Mail className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Contact Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-3 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                    formErrors.email
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your email address"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`w-full px-3 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                    formErrors.phone
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
              {formErrors.phone && (
                <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MapPin className="w-4 h-4 inline mr-1" />
              Address
            </label>
            <textarea
              value={formData.address || ""}
              onChange={(e) => handleInputChange("address", e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-none ${
                formErrors.address
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
              placeholder="Enter your full address"
            />
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center mb-4">
            <FileText className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">About You</h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              value={formData.bio || ""}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              rows={4}
              maxLength={500}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-none ${
                formErrors.bio ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Tell us a little about yourself..."
            />
            <div className="flex justify-between items-center mt-1">
              {formErrors.bio && (
                <p className="text-red-500 text-sm">{formErrors.bio}</p>
              )}
              <p className="text-gray-500 text-sm ml-auto">
                {(formData.bio || "").length}/500
              </p>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mr-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Security</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                    formErrors.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                  formErrors.confirmPassword
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Confirm new password"
              />
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>Note:</strong> Leave password fields empty if you don't
              want to change your password.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            {isFormChanged && (
              <div className="flex items-center text-orange-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-sm">You have unsaved changes</span>
              </div>
            )}
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  firstname: user?.firstname || "",
                  lastname: user?.lastname || "",
                  email: user?.email || "",
                  phone: user?.phone || "",
                  address: user?.address || "",
                  bio: user?.bio || "",
                  dateOfBirth: user?.dateOfBirth || "",
                  gender: user?.gender || "other",
                  occupation: user?.occupation || "",
                });
                setPassword("");
                setConfirmPassword("");
                setFormErrors({});
                setIsFormChanged(false);
              }}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Reset
            </button>

            <button
              onClick={handleSave}
              disabled={loading || !isFormChanged}
              className={`px-8 py-2 rounded-lg font-medium transition-colors flex items-center ${
                loading || !isFormChanged
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && modalMessage && modalType && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="flex items-center justify-center p-6">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 ${
                modalType === "success" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {modalType === "success" ? (
                <Check className="w-6 h-6 text-green-600" />
              ) : (
                <X className="w-6 h-6 text-red-600" />
              )}
            </div>
            <div>
              <h3
                className={`text-lg font-medium ${
                  modalType === "success" ? "text-green-900" : "text-red-900"
                }`}
              >
                {modalType === "success" ? "Success!" : "Error"}
              </h3>
              <p className="text-gray-600 mt-1">{modalMessage}</p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UserDetails;
