import React, { useState } from 'react';

const DebugPanel = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  // Ensure data is array for navigation
  const items = Array.isArray(data) ? data : [data];
  const currentItem = items[index] || {};

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button onClick={() => setVisible(!visible)} className="bg-blue-600 text-white px-3 py-1 rounded shadow-lg">
        {visible ? 'Hide Debug' : 'Show Debug'}
      </button>

      {visible && (
        <div className="mt-2 bg-gray-900 text-green-300 p-3 rounded-lg shadow-lg max-w-md max-h-96 overflow-auto">
          {/* Navigation for arrays */}
          {items.length > 1 && (
            <div className="flex justify-between mb-2">
              <button
                onClick={() => setIndex((i) => (i > 0 ? i - 1 : items.length - 1))}
                className="bg-gray-700 px-2 py-1 rounded"
              >
                Prev
              </button>
              <span className="text-sm">
                {index + 1}/{items.length}
              </span>
              <button
                onClick={() => setIndex((i) => (i < items.length - 1 ? i + 1 : 0))}
                className="bg-gray-700 px-2 py-1 rounded"
              >
                Next
              </button>
            </div>
          )}

          {/* Data Viewer */}
          <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(currentItem, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DebugPanel;
