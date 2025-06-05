"use client";
import Sidebar from "@/app/components/sidebar";
import Navbar from "@/app/components/navbar";
import Image from "next/image";
import React, { useState } from "react";
import clsx from "clsx";
import { useLanguage } from "@/app/context/LanguageContext";

const labels = {
  id: {
    profile: "Profil",
    fullName: "Nama Lengkap",
    email: "Email",
    phone: "Nomor Telepon",
    gender: "Jenis Kelamin",
    male: "Laki - Laki",
    female: "Perempuan",
    dob: "Tanggal Lahir",
    role: "Peran",
    admin: "Administrator",
    user: "Pengguna",
    staff: "Staf",
    edit: "Edit Profil",
    cancel: "Batal",
    save: "Simpan Perubahan",
    changePhoto: "Ganti Foto",
  },
  en: {
    profile: "Profile",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone Number",
    gender: "Gender",
    male: "Male",
    female: "Female",
    dob: "Date of Birth",
    role: "Role",
    admin: "Administrator",
    user: "User",
    staff: "Staff",
    edit: "Edit Profile",
    cancel: "Cancel",
    save: "Save Changes",
    changePhoto: "Change Photo",
  },
};

type LanguageKey = keyof typeof labels;

const Profile = () => {
  const { language } = useLanguage() as { language: LanguageKey };
  const label = labels[language];

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Mr Abqory",
    email: "abqory@example.com",
    phone: "085134563182",
    gender: "",
    dob: "2027-04-18",
    role: "Administrator",
    avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Submit logic here
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 text-black dark:bg-[#242F59] dark:text-white min-h-screen">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Navbar - Visible on mobile, hidden on desktop */}
      <div className="lg:hidden">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full">
        {/* Header */}
        <div className="p-4 sm:p-6 lg:p-8">
          <h1 className="text-xl sm:text-2xl font-bold">{label.profile}</h1>
        </div>

        {/* Profile Card */}
        <div className="mx-4 sm:mx-6 lg:mx-8 mb-4 sm:mb-6 lg:mb-8">
          <div className="p-4 sm:p-6 lg:p-8 shadow-2xl dark:shadow-white/20 dark:bg-[#0F103F] bg-white rounded-lg">
            {/* Avatar Section */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative">
                <Image
                  src={formData.avatar}
                  alt="User Avatar"
                  width={100}
                  height={100}
                  className="w-20 h-20 sm:w-24 sm:h-24 lg:w-25 lg:h-25 rounded-full border object-cover"
                />
                <button
                  disabled={!isEditing}
                  className="absolute bottom-0 right-0 bg-white p-1 rounded-full border shadow-sm text-sm disabled:opacity-50"
                >
                  ✎
                </button>
              </div>
              <button
                disabled={!isEditing}
                className={clsx(
                  `btn btn-info mt-2 text-xs sm:text-sm`,
                  isEditing ? "text-white" : "text-gray-400"
                )}
              >
                {label.changePhoto}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-sm text-gray-600 dark:text-white mb-1">
                    {label.fullName}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-2 sm:p-3 border dark:border-[#242F59] rounded-md bg-gray-100 disabled:bg-gray-200 dark:bg-[#242F59] text-sm sm:text-base"
                  />
                </div>

                {/* Email */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-sm text-gray-600 dark:text-white mb-1">
                    {label.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-2 sm:p-3 border dark:border-[#242F59] rounded-md bg-gray-100 disabled:bg-gray-200 dark:bg-[#242F59] text-sm sm:text-base"
                  />
                </div>

                {/* Phone Number */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-sm text-gray-600 dark:text-white mb-1">
                    {label.phone}
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-2 sm:p-3 border dark:border-[#242F59] rounded-md bg-gray-100 disabled:bg-gray-200 dark:bg-[#242F59] text-sm sm:text-base"
                  />
                </div>

                {/* Gender */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-sm text-gray-600 dark:text-white mb-1">
                    {label.gender}
                  </label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-2">
                    <label className="flex items-center gap-2 text-sm sm:text-base">
                      <input
                        type="radio"
                        name="gender"
                        value={label.male}
                        checked={formData.gender === label.male}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-4 h-4"
                      />
                      {label.male}
                    </label>
                    <label className="flex items-center gap-2 text-sm sm:text-base">
                      <input
                        type="radio"
                        name="gender"
                        value={label.female}
                        checked={formData.gender === label.female}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-4 h-4"
                      />
                      {label.female}
                    </label>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-sm text-gray-600 dark:text-white mb-1">
                    {label.dob}
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-2 sm:p-3 border dark:border-[#242F59] rounded-md bg-gray-100 disabled:bg-gray-200 dark:bg-[#242F59] text-sm sm:text-base"
                  />
                </div>

                {/* Role */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-sm text-gray-600 dark:text-white mb-1">
                    {label.role}
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-2 sm:p-3 border dark:border-[#242F59] rounded-md bg-gray-100 disabled:bg-gray-200 dark:bg-[#242F59] text-sm sm:text-base"
                  >
                    <option value="Administrator">{label.admin}</option>
                    <option value="User">{label.user}</option>
                    <option value="Staff">{label.staff}</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className={clsx(
                    "btn bg-[#50A663] border-[#50A663] text-white dark:bg-primary py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-base",
                    isEditing ? "sm:w-auto" : "w-full sm:w-auto"
                  )}
                >
                  {isEditing ? label.cancel : label.edit}
                </button>
                {isEditing && (
                  <button
                    type="submit"
                    className="btn btn-success text-white dark:btn-info py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-base w-full sm:w-auto"
                  >
                    {label.save}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;