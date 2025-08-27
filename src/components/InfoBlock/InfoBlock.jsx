const InfoBlock = ({ label, value }) => {
  return (
    <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
      <p className="text-xs text-gray-500 uppercase font-semibold">{label}</p>
      <p className="text-base font-medium text-gray-900">{value || '-'}</p>
    </div>
  );
};

export default InfoBlock;
