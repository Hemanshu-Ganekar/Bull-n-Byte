import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin(){
  const userField = useRef();
  const passwordField = useRef();
  const EmailField = useRef();
    const [isLoading, setIsLoading] = useState(false);

  const navigate=useNavigate();
  const postSignin = ()=>{
        console.log(userField.current.value,passwordField.current.value);
   fetch("http://localhost:3000/signin",{
    method:"POST",
    body:JSON.stringify({
        username:userField.current.value,password:passwordField.current.value,Email:EmailField.current.value
    }),
    headers:{
      "Content-Type":"application/json",
    }
   }).then((res)=>res=res.json())
     .then((data)=>
    {   if(data.message=="New user registered"){
        navigate('/login');
        console.log(data);
      }else{
        alert("Username or Email might be already taken");
      }
    }).catch((err)=>{
      console.log(err);
        alert("Username or Email might be already taken");

    })
  }
  return(
    <>
    <div className=" bg-green-200 flex items-center justify-center p-4">
    

      {/* Sign In Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Main Sign In Box */}
        <div className="bg-purple-600 border-8 border-black p-8" style={{ boxShadow: '12px 12px 0px #000' }}>
          
          {/* Header */}
          <div className="bg-yellow-400 border-4 border-black p-4 mb-6" style={{ boxShadow: '4px 4px 0px #000' }}>
            <h1 className="text-3xl font-bold text-center" style={{ 
              fontFamily: 'monospace',
              color: '#000',
              textShadow: '2px 2px 0px rgba(255,255,255,0.5)'
            }}>
              NEW PLAYER
            </h1>
            <p className="text-center text-sm font-bold mt-1" style={{ fontFamily: 'monospace' }}>
              CREATE ACCOUNT
            </p>
          </div>

          {/* Sign In Form */}
          <div className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block text-white font-bold mb-2 text-sm" style={{ fontFamily: 'monospace' }}>
                ▶ USERNAME
              </label>
              <input 
                placeholder="CHOOSE NAME" 
                name="username" 
                ref={userField}
                className="w-full px-4 py-3 bg-amber-400 border-4 border-black font-bold text-black placeholder-gray-700 focus:outline-none focus:bg-amber-300"
                style={{ 
                  fontFamily: 'monospace',
                  boxShadow: 'inset 3px 3px 0px rgba(0,0,0,0.3)'
                }}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-white font-bold mb-2 text-sm" style={{ fontFamily: 'monospace' }}>
                ▶ EMAIL
              </label>
              <input 
                placeholder="ENTER EMAIL" 
                name="Email" 
                type="email"
                ref={EmailField}
                className="w-full px-4 py-3 bg-white border-4 border-black font-bold text-black placeholder-gray-600 focus:outline-none focus:bg-gray-100"
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
                placeholder="CREATE CODE" 
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
              onClick={()=>postSignin()}
              disabled={isLoading}
              className="w-full px-6 py-4 border-4 border-black font-bold text-lg bg-green-500 text-white hover:bg-green-600 transition-all hover:translate-y-1 active:translate-y-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              style={{ 
                fontFamily: 'monospace',
                boxShadow: '6px 6px 0px #000'
              }}
            >
              {isLoading ? '⏳ CREATING...' : '▶ CREATE ACCOUNT'}
            </button>

            {/* Already have account */}
            <div className="mt-6 text-center">
              <p className="text-white font-bold text-sm mb-2" style={{ fontFamily: 'monospace' }}>
                ALREADY A TRAINER?
              </p>
              <button 
                className="px-6 py-2 border-4 border-black font-bold text-sm bg-white text-black hover:bg-gray-200 transition-all hover:translate-y-0.5"
                style={{ 
                  fontFamily: 'monospace',
                  boxShadow: '4px 4px 0px #000'
                }}
                onClick={()=>{navigate('/login')}}
              >
                LOG IN HERE
              </button>
            </div>
          </div>

          {/* Footer Decoration */}
          <div className="mt-6 flex justify-center gap-2">
            <div className="w-6 h-6 bg-red-400 border-2 border-black"></div>
            <div className="w-6 h-6 bg-yellow-400 border-2 border-black"></div>
            <div className="w-6 h-6 bg-green-400 border-2 border-black"></div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-6 text-center">
          <p className="text-black font-bold" style={{ 
            fontFamily: 'monospace',
            textShadow: '2px 2px 0px rgba(255,255,255,0.7)'
          }}>
            © 2025 PIXEL GAME • BEGIN ADVENTURE
          </p>
        </div>
      </div>
    </div>
    </>)
}
export default Signin