
import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (password: string) => void;
  error: string | null;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, error }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };
  
  const backgroundImageUrl = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop';

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-fixed flex items-center justify-center p-4" 
      style={{backgroundImage: `url(${backgroundImageUrl})`}}
    >
      <div className="w-full min-h-screen bg-black/40 flex items-center justify-center font-sans text-gray-900">
        <div className="w-full max-w-sm">
          <form 
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur-lg rounded-xl p-8 border border-white/50 shadow-2xl text-center"
          >
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-teal-700 drop-shadow-sm uppercase">
              APP BÁO GIÁ THIẾT KẾ
            </h1>
            <p className="text-lg text-gray-600 font-bold drop-shadow-sm mt-2 mb-8">CÁT NGHI INTERIOR</p>
            
            <div className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition text-gray-900 placeholder-gray-400 text-center font-bold text-lg"
                aria-label="Password"
              />
              {error && <p className="text-red-500 font-bold text-sm mt-2">{error}</p>}
              <button 
                type="submit"
                className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors disabled:bg-gray-400 shadow-md"
              >
                Vào App
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
