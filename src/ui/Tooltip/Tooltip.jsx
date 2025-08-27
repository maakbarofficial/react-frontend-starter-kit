import React, { useState, useRef } from 'react';

const Tooltip = ({ content, position = 'top', children, show = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef();

  const toggleTooltip = (visible) => {
    setIsVisible(visible);
  };

  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
    'top-left': 'bottom-full right-full mb-2 mr-2',
    'top-right': 'bottom-full left-full mb-2 ml-2',
    'bottom-left': 'top-full right-full mt-2 mr-2',
    'bottom-right': 'top-full left-full mt-2 ml-2',
    center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  if (!show) {
    return children;
  }

  return (
    <div className="relative inline-flex cursor-help">
      <div onMouseEnter={() => toggleTooltip(true)} onMouseLeave={() => toggleTooltip(false)} className="inline-flex">
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            absolute z-50 py-2 px-3 text-[10px] font-medium text-white bg-gray-800 border border-white rounded-lg shadow-lg
            ${positionClasses[position] || positionClasses.top}
            min-w-max
            transform
          `}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {typeof content === 'string'
              ? content.split('|').map((item, index) => (
                  <span key={index} className="whitespace-nowrap">
                    {item.trim()}
                  </span>
                ))
              : content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
