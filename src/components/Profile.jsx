import React, { useState } from "react";
import { avatar, nonProfile } from "../data";

function Profile({ handleImageChange }) {
  const [userAvatar, setUserAvatar] = useState(avatar);

  return (
    <div>
      <div className="absolute -top-20 left-15 max-sm:-top-20 max-sm:left-24">
        <input
          type="file"
          id="avatar-upload"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <label htmlFor="avatar-upload" className="cursor-pointer block">
          <div className="w-32 h-32 object-cover rounded-full mx-auto my-4">
            <img
              src={userAvatar || nonProfile}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.target.src = nonProfile; // Fallback to default image if error
              }}
            />
          </div>
        </label>
      </div>
    </div>
  );
}

export default Profile;
