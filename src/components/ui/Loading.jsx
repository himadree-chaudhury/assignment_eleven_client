import React from "react";

const Loading = () => {
  return (
    <div className="flex-centric h-screen">
      {/* Spinner */}
      <div className="animate-spin rounded-full border-4 border-t-transparent border-primary w-12 h-12"></div>
    </div>
  );
};

export default Loading;
