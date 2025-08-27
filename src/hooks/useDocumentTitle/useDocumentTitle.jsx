import { useEffect } from 'react';

function useDocumentTitle(title, keepOnUnmount = false, suffix = 'CRC') {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} - ${suffix}`;

    return () => {
      if (!keepOnUnmount) {
        document.title = previousTitle;
      }
    };
  }, [title, suffix]);
}

export default useDocumentTitle;
