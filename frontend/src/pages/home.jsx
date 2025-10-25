import { useNavigate } from "react-router-dom";
function Home(){
    const navigate = useNavigate();
 return(
    <div>
  <div className="flex flex-col items-center justify-center  bg-transparent">
    <h1 className="text-4xl font-bold mb-4">Welcome to Bull-n-Byte</h1>
    <p className="text-lg text-gray-700">Your gateway to smart trading solutions.</p>
  </div>
  <div className="mt-10 flex justify-evenly">
   <div className="w-64 h-64 bg-yellow-400 border-8 border-black flex items-center justify-center shadow-lg"
   onClick={()=>navigate('/practice')}
   >
    
    <p className="text-2xl font-bold">
    <img src="../public/play.png" alt="Practice Icon" className="w-40 h-auto mb-2"/>

    PLAY MODE
    </p>
   </div>

    <div className="w-64 h-64 bg-violet-400 border-8 border-black flex flex-col  items-center justify-center shadow-lg"
   onClick={()=>navigate('/practice')}
   >
    <img src="../public/practice.png" alt="Practice Icon" className="w-40 h-auto mb-2"/>
    <p className="text-2xl font-bold">
    PRACTICE MODE
    </p>
   </div>
   
  </div>
  </div>
 );
}

export default Home;