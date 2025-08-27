import LoaderStar from '@/assets/logo.png';

const LegacyLoader = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-black/70 pointer-events-auto"
      style={{ zIndex: 9999 }}
    >
      <img src={LoaderStar} alt="loader" className="pointer-events-auto w-20" />
    </div>
  );
};

export default LegacyLoader;
