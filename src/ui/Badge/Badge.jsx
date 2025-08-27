const colorStyles = {
  Default: {
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-800',
    darkBgClass: 'dark:bg-blue-900',
    darkTextClass: 'dark:text-blue-300',
  },
  Dark: {
    bgClass: 'bg-gray-100',
    textClass: 'text-gray-800',
    darkBgClass: 'dark:bg-gray-700',
    darkTextClass: 'dark:text-gray-300',
  },
  Red: {
    bgClass: 'bg-red-100',
    textClass: 'text-red-800',
    darkBgClass: 'dark:bg-red-900',
    darkTextClass: 'dark:text-red-300',
  },
  Green: {
    bgClass: 'bg-green-100',
    textClass: 'text-green-800',
    darkBgClass: 'dark:bg-green-900',
    darkTextClass: 'dark:text-green-300',
  },
  Yellow: {
    bgClass: 'bg-yellow-100',
    textClass: 'text-yellow-800',
    darkBgClass: 'dark:bg-yellow-900',
    darkTextClass: 'dark:text-yellow-300',
  },
  Indigo: {
    bgClass: 'bg-indigo-100',
    textClass: 'text-indigo-800',
    darkBgClass: 'dark:bg-indigo-900',
    darkTextClass: 'dark:text-indigo-300',
  },
  Purple: {
    bgClass: 'bg-purple-100',
    textClass: 'text-purple-800',
    darkBgClass: 'dark:bg-purple-900',
    darkTextClass: 'dark:text-purple-300',
  },
  Pink: {
    bgClass: 'bg-pink-100',
    textClass: 'text-pink-800',
    darkBgClass: 'dark:bg-pink-900',
    darkTextClass: 'dark:text-pink-300',
  },
};

const Badge = ({ text, color, className = '' }) => {
  const styles = colorStyles[color] || colorStyles.Default; // Fallback to Default

  return (
    <span
      className={`${styles.bgClass} ${styles.textClass} text-xs font-bold inline-flex items-center px-4 py-2 rounded ${styles.darkBgClass} ${styles.darkTextClass} ${className}`}
    >
      {text}
    </span>
  );
};

export default Badge;
