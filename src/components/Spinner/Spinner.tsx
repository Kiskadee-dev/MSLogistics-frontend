import React from 'react'

// Spinner component
const Spinner = () => (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border-t-transparent border-solid animate-spin border-blue-500 border-4 border-t-4 rounded-full h-12 w-12" />
    </div>
  );

export default Spinner