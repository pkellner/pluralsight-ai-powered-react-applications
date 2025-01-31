import React from "react";

export default function InBoxListPlaceHolder() {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      <div className="w-1/3 border-r border-gray-300 flex flex-col">
        <div className="p-4 border-b border-gray-300 bg-white font-bold text-lg">
          Inbox
        </div>
        <div className="flex-1 overflow-auto space-y-4 p-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="p-4 border-b border-gray-300 bg-white animate-pulse"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div>...</div>
      </div>
    </div>
  );
}
