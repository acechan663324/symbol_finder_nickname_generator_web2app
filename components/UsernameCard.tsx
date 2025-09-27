
import React from 'react';

interface UsernameCardProps {
  username: string;
  onCopy: () => void;
  isCopied: boolean;
}

const CopyIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);


const UsernameCard: React.FC<UsernameCardProps> = ({ username, onCopy, isCopied }) => {
  return (
    <div className="bg-gray-800/70 p-4 rounded-lg flex items-center justify-between gap-4 border border-gray-700 shadow-md hover:bg-gray-700/80 transition-colors duration-300">
      <p className="font-mono text-lg text-indigo-300 break-all">{username}</p>
      <button
        onClick={onCopy}
        className={`flex-shrink-0 p-2 rounded-md transition-colors duration-300 ${
          isCopied
            ? 'bg-green-500 text-white'
            : 'bg-gray-700 hover:bg-indigo-600 text-gray-300 hover:text-white'
        }`}
        aria-label="Copy username"
      >
        {isCopied ? <CheckIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default UsernameCard;
