import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
function LoginPage(){
  const userField = useRef();
  const passwordField = useRef();
  const navigate=useNavigate();
  let token;
   const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [isLogedIn,setIsLogedIn] = useState(false);
  const postLog = ()=>{
        console.log(userField.current.value,passwordField.current.value);
   fetch("http://localhost:3000/login",{
    method:"POST",
    body:JSON.stringify({
        username:userField.current.value,password:passwordField.current.value
    }),
    headers:{
      "Content-Type":"application/json",
    }
   }).then((res)=>res=res.json())
     .then((data)=>
    {     if(data.message=="User Not Found"||data.message=="Incorrect password"){
          alert(data.message);
          return;
         }else{
         token=data.token;
         localStorage.setItem("token",token);
         console.log(data);
         dispatch(setLogin({login:true,token:token}));}
         navigate('/');
    })
  }
  return(
    <>
    <div className=" bg-green-200 flex items-center justify-center p-4 m-0">
     

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Main Login Box */}
        <div className="bg-red-600 border-8 border-black p-8" style={{ boxShadow: '12px 12px 0px #000' }}>
          
          {/* Header */}
          <div className="bg-violet-400 border-4 border-black p-4 mb-6" style={{ boxShadow: '4px 4px 0px #000' }}>
            <h1 className="text-3xl font-bold text-center" style={{ 
              fontFamily: 'monospace',
              color: '#000',
              textShadow: '2px 2px 0px rgba(255,255,255,0.5)'
            }}>
              PLAYER LOGIN
            </h1>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block text-white font-bold mb-2 text-sm" style={{ fontFamily: 'monospace' }}>
                ▶ USERNAME
              </label>
              <input 
                placeholder="ENTER NAME" 
                name="username" 
                ref={userField}
                className="w-full px-4 py-3 bg-amber-300 border-4 border-black font-bold text-black placeholder-gray-700 focus:outline-none focus:bg-yellow-200"
                style={{ 
                  fontFamily: 'monospace',
                  boxShadow: 'inset 3px 3px 0px rgba(0,0,0,0.3)'
                }}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white font-bold mb-2 text-sm" style={{ fontFamily: 'monospace' }}>
                ▶ PASSWORD
              </label>
              <input 
                placeholder="ENTER PASSWORD" 
                name="password" 
                type="password"
                ref={passwordField}
                className="w-full px-4 py-3 bg-white border-4 border-black font-bold text-black placeholder-gray-600 focus:outline-none focus:bg-gray-100"
                style={{ 
                  fontFamily: 'monospace',
                  boxShadow: 'inset 3px 3px 0px rgba(0,0,0,0.3)'
                }}
              />
            </div>

            {/* Submit Button */}
            <button 
              onClick={()=>postLog()}
              disabled={isLoading}
              className="w-full px-6 py-4 border-4 border-black font-bold text-lg bg-blue-500 text-white hover:bg-blue-600 transition-all hover:translate-y-1 active:translate-y-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              style={{ 
                fontFamily: 'monospace',
                boxShadow: '6px 6px 0px #000'
              }}
            >
              {isLoading ? '⏳ LOADING...' : '▶ START GAME'}
            </button>

            {/* Secondary Actions */}
            <div className="flex gap-2 mt-4">
              <button 
                className="flex-1 px-4 py-2 border-4 border-black font-bold text-sm bg-white text-black hover:bg-gray-200 transition-all hover:translate-y-0.5"
                style={{ 
                  fontFamily: 'monospace',
                  boxShadow: '4px 4px 0px #000'
                }}
                onClick={()=>{navigate('/signin')}}
              >
               REGISTER NEW PLAYER
              </button>
             
            </div>
          </div>

          {/* Footer Decoration */}
          <div className="mt-6 flex justify-center gap-2">
            <div className="w-6 h-6 bg-yellow-400 border-2 border-black"></div>
            <div className="w-6 h-6 bg-blue-400 border-2 border-black"></div>
            <div className="w-6 h-6 bg-red-400 border-2 border-black"></div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-6 text-center">
          <p className="text-black font-bold" style={{ 
            fontFamily: 'monospace',
            textShadow: '2px 2px 0px rgba(255,255,255,0.7)'
          }}>
            © 2025 PIXEL GAME • PRESS START
          </p>
        </div>
      </div>
    </div>
    </>)
}
export default LoginPage