import React from 'react'
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/quizlogo.svg";


const Login = () => {
  const navigate = useNavigate();
  const handleGoogleSignIn = async () =>
  {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("User info:", user);
      alert('Welcome & {user. displayName}!');
      navigate ("/dashboard");
    } catch (error) {
      console.error("Google signin error:", error);
    }
  };

  return (
  <div className="min-h-screen w-full bg-gradient-to-b from-[#3B82F6] to-[#999999] flex flex-col items-center justify-center">
      <div class="flex justify-center items-center md:shrink"> 
        <img
        style={{marginTop: 20 + 'px'}}
        class="h-18 " 
         src={logo} alt="" />
      </div>
   
        <h1 class="text-center font-[Open_Sans] font-extrabold text-3xl text-white mt-3">QUIZBUDDY</h1>
        <h2 class="text-center font-[Open_Sans] font-bold text-white">"Where curiousity meets knowledge"</h2>
   
        <div class="text-center">
        <button 
        onClick={handleGoogleSignIn}
        class="bg-gradient-to-br from-[#434799] to-[#747AF5] text-white px-8 py-1 rounded-4xl mt-80 mb-20 font-[Open_Sans] font-bold"  >Signup with Google</button>
        <p class="text-white font-[Open_Sans] font-bold">Already have an account? Login</p>
    </div>
  </div>
  )
}

export default Login 