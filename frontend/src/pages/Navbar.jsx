import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../store/slices/authSlice';
export default function PixelNavbar() {
  const [activeItem, setActiveItem] = useState('home');
  const login = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'play', label: 'PLAY' },
    { id: 'practice', label: 'PRACTICE' },
    { id: 'about', label: 'ABOUT US' }
  ];
  const log = ()=>{
    if(login){
        dispatch(setLogin({login:false,token:null}));
        localStorage.removeItem("token");
        redirect("/");
    }else{
        redirect("/login");
    }
  }
  return (
    <div className=" bg-green-200 p-8 m-0">
      {/* Navbar */}
      <nav className="bg-red-600 border-8 border-black shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between p-4">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-yellow-400 border-4 border-black flex items-center justify-center">
                <div className="w-4 h-4 bg-red-600 border-2 border-black"></div>
              </div>
              <span className="text-2xl font-bold text-white" style={{ 
                fontFamily: 'monospace',
                textShadow: '3px 3px 0px #000'
              }}>
                Bull n' Byte
              </span>
            </div>

            {/* Nav Items */}
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`px-6 py-3 border-4 border-black font-bold text-sm transition-all ${
                    activeItem === item.id
                      ? 'bg-yellow-400 text-black translate-y-1'
                      : 'bg-white text-black hover:bg-yellow-200 hover:translate-y-0.5'
                  }`}
                  style={{ 
                    fontFamily: 'monospace',
                    boxShadow: activeItem === item.id ? '2px 2px 0px #000' : '4px 4px 0px #000'
                  }}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Login/Signin Button */}
             <button
  className={`px-6 py-3 border-4 border-black font-bold text-sm transition-all hover:translate-y-0.5 ${
    login 
      ? 'bg-red-500 text-white hover:bg-blue-600' 
      : 'bg-blue-500 text-black hover:bg-yellow-200'
  }`}
  style={{ 
    fontFamily: 'monospace',
    boxShadow: '4px 4px 0px #000'
  }}
  onClick={()=>{log()}}
>
  {login ? 'LOGOUT' : 'LOGIN/SIGNIN'}
</button>
            </div>
          </div>
        </div>
      </nav>

   
    </div>
  );
}