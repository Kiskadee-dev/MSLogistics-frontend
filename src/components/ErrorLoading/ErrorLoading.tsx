import React from "react";

const ErrorLoading = ({ error }: { error: string }) => (
  <div
    className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <strong className="font-bold">Error:</strong>
    <span className="block sm:inline"> {error}</span>
    <button
      className="absolute top-0 right-0 px-4 py-3 text-red-500 hover:text-red-700"
      onClick={() => {}}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>
  </div>
);

export default ErrorLoading;
