
import React, { useState, useCallback } from 'react';
import { generateUsernames } from './services/geminiService';
import Header from './components/Header';
import UsernameCard from './components/UsernameCard';
import Loader from './components/Loader';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>('');
  const [symbolTheme, setSymbolTheme] = useState<string>('');
  const [symbolCount, setSymbolCount] = useState<string>('2');
  const [usernames, setUsernames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedUsername, setCopiedUsername] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!theme.trim()) {
      setError('Please enter a main keyword or theme.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setUsernames([]);
    setCopiedUsername(null);

    try {
      const names = await generateUsernames(theme, symbolTheme, symbolCount);
      setUsernames(names);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [theme, symbolTheme, symbolCount]);
  
  const handleCopyToClipboard = useCallback((username: string) => {
    navigator.clipboard.writeText(username);
    setCopiedUsername(username);
    setTimeout(() => setCopiedUsername(null), 2000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 text-white font-sans flex flex-col p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
        <div className="w-full bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl">
          <p className="text-center text-indigo-300 mb-4">
            Enter keywords to inspire your new identity.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="Main theme (e.g., dragon, nebula...)"
              className="w-full bg-gray-900 focus:ring-2 focus:ring-indigo-500 rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-colors duration-300"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <input
                type="text"
                value={symbolTheme}
                onChange={(e) => setSymbolTheme(e.target.value)}
                placeholder="Symbol type (e.g., stars, tech)"
                className="w-full bg-gray-900 focus:ring-2 focus:ring-indigo-500 rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-colors duration-300"
                 onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
               <input
                type="number"
                value={symbolCount}
                min="1"
                max="5"
                onChange={(e) => setSymbolCount(e.target.value)}
                placeholder="Symbol count (1-5)"
                className="w-full bg-gray-900 focus:ring-2 focus:ring-indigo-500 rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-colors duration-300"
                 onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              {isLoading ? <Loader /> : 'Generate'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6 bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="w-full mt-8">
          {usernames.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {usernames.map((name) => (
                <UsernameCard
                  key={name}
                  username={name}
                  onCopy={() =>{
                        ///调用Android端的提供的接口，先判断是否已经得到vip权限
                        if (window.Android.isVip()) {
                           handleCopyToClipboard(name);
                        } 
                    }}
                  isCopied={copiedUsername === name}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
