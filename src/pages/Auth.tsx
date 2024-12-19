import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AuthModal } from '../components/AuthModal';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    let errorMessage = '';

    try {
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          errorMessage = signInError.message === 'Invalid login credentials' 
            ? 'Неверный email или пароль'
            : 'Произошла ошибка при входе';
          throw new Error(errorMessage);
        }
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) {
          errorMessage = 'Ошибка при регистрации. Пожалуйста, проверьте данные и попробуйте снова';
          throw new Error(errorMessage);
        } else {
          setShowGiftModal(true);
          return;
        }
      }

      navigate('/program');
    } catch (err) {
      setError(err.message || 'Произошла ошибка. Пожалуйста, попробуйте позже');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-20">
      <div className="container mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="mr-2" size={20} />
          Вернуться на главную
        </Link>
        
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            {isLogin ? 'Вход' : 'Регистрация'}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                required
              />
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium mb-2">Пароль</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center bg-red-500/10 p-3 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition-colors"
            >
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>

            <p className="text-center text-gray-400">
              {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-red-500 hover:text-red-400"
              >
                {isLogin ? 'Зарегистрироваться' : 'Войти'}
              </button>
            </p>
          </form>
        </div>
      </div>
      <AuthModal 
        isOpen={showGiftModal} 
        onClose={() => setShowGiftModal(false)}
        showGift={true}
      />
    </div>
  );
};

export default Auth;