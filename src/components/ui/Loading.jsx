import React from "react";

const Loading = () => {
  return (
    <div className="flex-centric h-screen">
      {/* Spinner */}
      <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
    </div>
  );
};

export default Loading;
