import React, { useState } from 'react';

function ProfilePicture() {
    const [profilePic, setProfilePic] = useState(null);

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                <img
                    src={profilePic || 'https://via.placeholder.com/100'} // Default image
                    alt="Profile"
                    className="w-24 h-24 rounded-full border"
                />
            </div>
            <label htmlFor="profile-pic-upload" className="mt-2 cursor-pointer text-maincolor">
                Update Profile Picture
            </label>
            <input
                id="profile-pic-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
            />
        </div>
    );
}

export default ProfilePicture;
