import { ServerHealthCheck } from '@/api/apis';
import { Tooltip } from '@/ui';
import { useEffect, useState } from 'react';
import { FaServer, FaWifi } from 'react-icons/fa';

const HealthCheck = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isServerUp, setIsServerUp] = useState(false);

  const fetchServerHealth = async () => {
    try {
      const response = await ServerHealthCheck();
      setIsServerUp(response === 'CRC Backend is working.');
    } catch (error) {
      setIsServerUp(false);
      console.error('Health check failed:', error);
    }
  };

  useEffect(() => {
    // Check internet every 1 second
    const internetInterval = setInterval(() => {
      setIsOnline(navigator.onLine);
    }, 1000);

    return () => clearInterval(internetInterval);
  }, []);

  useEffect(() => {
    fetchServerHealth();
    // Check server health every 60 seconds
    const serverInterval = setInterval(() => {
      fetchServerHealth();
    }, 60000);

    return () => clearInterval(serverInterval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex gap-3">
      <Tooltip content={isOnline ? 'Online' : 'Offline'} position="top">
        <div className="p-1 bg-white rounded-full shadow">
          <FaWifi color={isOnline ? 'green' : 'red'} size={15} title="Internet" />
        </div>
      </Tooltip>
      <Tooltip content={isServerUp ? 'Server Up' : 'Server Down'} position="top">
        <div className="p-1 bg-white rounded-full shadow">
          <FaServer color={isServerUp ? 'green' : 'red'} size={15} title="Server" />
        </div>
      </Tooltip>
    </div>
  );
};

export default HealthCheck;
