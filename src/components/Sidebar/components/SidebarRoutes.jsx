import { FaUserShield } from 'react-icons/fa';
import { MdOutlineFlight, MdOutlineSecurity } from 'react-icons/md';
import { PiTreeStructureFill } from 'react-icons/pi';
import { TbDeviceDesktopAnalytics, TbDeviceAnalytics } from 'react-icons/tb';
import { FcHeatMap } from 'react-icons/fc';

export const routes = [
  { path: '/dashboard', name: 'Dashboard', icon: <TbDeviceDesktopAnalytics /> },
  // { path: "/dashboardv2", name: "Dashboard V2", icon: <TbDeviceAnalytics /> },
  // { path: "/dashboardv3", name: "Dashboard V3", icon: <TbDeviceAnalytics /> },
  { path: '/profile', name: 'Profile', icon: <FaUserShield /> },
  { path: '/load', name: 'Load', icon: <FcHeatMap /> },
];

export const dropdownMenus = [
  {
    title: 'Flight Configuration',
    icon: <MdOutlineFlight />,
    menu: 'Flight Configuration',
    items: [
      {
        path: '/flight-configuration/flight-opening',
        name: 'Flight Opening',
        icon: <MdOutlineFlight />,
      },
      {
        path: '/flight-configuration/flight-updation',
        name: 'Flight Updation',
        icon: <MdOutlineFlight />,
      },
      {
        path: '/flight-configuration/range-flight-update',
        name: 'Range Flight Update',
        icon: <MdOutlineFlight />,
      },
      {
        path: '/flight-configuration/class-fare',
        name: 'Class Fare',
        icon: <MdOutlineFlight />,
      },
      {
        path: '/flight-configuration/schedule',
        name: 'Schedule',
        icon: <MdOutlineFlight />,
      },
      {
        path: '/flight-configuration/sector',
        name: 'Sector',
        icon: <MdOutlineFlight />,
      },
    ],
  },
  {
    title: 'System Structure',
    icon: <PiTreeStructureFill />,
    menu: 'System Structure',
    items: [
      {
        path: '/system-structure/aircraft',
        name: 'Aircraft',
        icon: <PiTreeStructureFill />,
      },
      {
        path: '/system-structure/class',
        name: 'Class',
        icon: <PiTreeStructureFill />,
      },
      {
        path: '/system-structure/country',
        name: 'Country',
        icon: <PiTreeStructureFill />,
      },
      {
        path: '/system-structure/e-ticket-functions',
        name: 'E-Ticket Functions',
        icon: <PiTreeStructureFill />,
      },
      {
        path: '/system-structure/functions',
        name: 'Functions',
        icon: <PiTreeStructureFill />,
      },
      {
        path: '/system-structure/location',
        name: 'Location',
        icon: <PiTreeStructureFill />,
      },
      {
        path: '/system-structure/res-currency',
        name: 'Res Currency',
        icon: <PiTreeStructureFill />,
      },
      {
        path: '/system-structure/territory',
        name: 'Territory',
        icon: <PiTreeStructureFill />,
      },
    ],
  },
  {
    title: 'System Security',
    icon: <MdOutlineSecurity />,
    menu: 'System Security',
    items: [
      {
        path: '/system-security/change-password',
        name: 'Change Password',
        icon: <MdOutlineSecurity />,
      },
      {
        path: '/system-security/custom-rights',
        name: 'Custom Rights',
        icon: <MdOutlineSecurity />,
      },
      {
        path: '/system-security/user-status',
        name: 'User Status',
        icon: <MdOutlineSecurity />,
      },
      {
        path: '/system-security/privileges',
        name: 'Privileges',
        icon: <MdOutlineSecurity />,
      },
      {
        path: '/system-security/find-user-by-territory',
        name: 'Find User By Territory',
        icon: <MdOutlineSecurity />,
      },
      {
        path: '/system-security/staff',
        name: 'Staff',
        icon: <MdOutlineSecurity />,
      },
    ],
  },
];

export const roleBasedDropdowns = {
  // admin: [
  //   {
  //     title: "Admin Operations",
  //     icon: <FaUserShield />,
  //     items: [
  //       {
  //         path: "/admin/manage-users",
  //         name: "Manage Users",
  //         icon: <FaUserShield />,
  //       },
  //       { path: "/admin/settings", name: "Admin Settings", icon: <FaCog /> },
  //     ],
  //   },
  // ],
  // user: [
  //   {
  //     title: "User Operations",
  //     icon: <FaUserShield />,
  //     items: [
  //       { path: "/user/profile", name: "Profile", icon: <FaUserShield /> },
  //       { path: "/user/settings", name: "Settings", icon: <FaCog /> },
  //     ],
  //   },
  // ],
};
