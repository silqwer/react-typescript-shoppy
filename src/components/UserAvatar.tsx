import { type User } from 'firebase/auth';
import React from 'react';

interface UserAvatarProps {
  user: User;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user: { photoURL, displayName } }) => {
  const imgSrc = photoURL === null ? undefined : photoURL;
  const name = displayName === null ? undefined : displayName;

  return (
    <div className='flex items-center'>
      <img src={imgSrc} alt={name} className='w-10 h-10 mr-2 rounded-full' />
      <span className='hidden md:block'>{name}</span>
    </div>
  );
};

export default UserAvatar;
