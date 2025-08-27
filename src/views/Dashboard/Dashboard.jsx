import { useDocumentTitle } from '@/hooks';

const Dashboard = () => {
  useDocumentTitle('Dashboard');
  return (
    <div className="p-6 shadow-inner space-y-6 bg-[#ededed] dark:bg-gray-900 text-black dark:text-white">
        <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
