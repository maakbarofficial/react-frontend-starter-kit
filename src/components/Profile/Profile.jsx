import {useUserStore } from '@/stores';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { MdOutlineLogout } from 'react-icons/md';

const Profile = () => {
  const { user, setUser } = useUserStore();

  const handleLogout = () => {
    setUser(null);
    toast.success('Logout successfully');
  };
  return (
    <div className="w-full shadow-inner text-black bg-[#C29962] px-4 py-1 flex items-center gap-2 justify-between">
      <div className="flex items-center justify-center gap-2">
        <p className="font-medium text-xs">Logged in as:</p>
        <FaUser size={12} />
        <p className="font-bold text-xs">
          {user?.firstName?.toUpperCase()} {user?.lastName?.toUpperCase()}
        </p>
      </div>
      <div onClick={handleLogout}>
        <button className="font-bold flex text-xs items-center gap-2">
          <MdOutlineLogout size={12} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
