import React, { useState } from 'react';

const Debug = ({ data }) => {
  const items = Array.isArray(data) ? data : [data];
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const prevItem = () => setIndex((i) => (i > 0 ? i - 1 : items.length - 1));
  const nextItem = () => setIndex((i) => (i < items.length - 1 ? i + 1 : 0));

  return (
    <div className="bg-brand p-2 rounded text-white w-full">
      {/* Navigation */}
      {items.length > 1 && (
        <div className="flex justify-between items-center mb-1">
          <button onClick={prevItem} className="px-2 bg-black rounded">
            Prev
          </button>
          <span>
            {index + 1}/{items.length}
          </span>
          <button onClick={nextItem} className="px-2 bg-black rounded">
            Next
          </button>
        </div>
      )}

      {/* Expand/Collapse */}
      <button onClick={() => setExpanded(!expanded)} className="w-full bg-black text-white p-1 mb-1 rounded">
        {expanded ? '▲ Hide' : '▼ Show'}
      </button>

      {/* Data */}
      {expanded && <pre className="whitespace-pre-wrap font-normal text-black text-xs">{JSON.stringify(items[index], null, 2)}</pre>}
    </div>
  );
};

export default Debug;
