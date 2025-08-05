import "./App.css";
import React from "react";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-300 mb-4">
        Welcome to React + Tailwind
      </h1>
      <p className="text-gray-700 text-lg max-w-xl">
        You’ve successfully set up Tailwind CSS in your React + TypeScript
        project. Start building awesome UIs with utility-first styling.
      </p>
      <a
        href="https://tailwindcss.com/docs"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block bg-blue-200 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-200"
      >
        Learn Tailwind
      </a>
    </div>
  );
};

export default App;
