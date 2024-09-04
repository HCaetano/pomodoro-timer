import React, { ReactNode, useState } from "react";

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {isVisible && (
        <div className="absolute bottom-full mb-2 w-max rounded bg-gray-800 px-2 py-1 text-sm text-white shadow-lg">
          {content}
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
