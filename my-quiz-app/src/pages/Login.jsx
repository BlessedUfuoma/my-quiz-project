import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/quizlogo.svg";


const Login = () => {
  return (
  <div class="h-screen w-full bg-gradient-to-b from-[#3B82F6] to-[#999999]">
      <div class="flex justify-center items-center md:shrink"> 
        <img
        class="h-18 " 
         src={logo} alt="" />
      </div>
   
        <h1 class="text-center font-[Open_Sans] font-extrabold text-3xl text-white mt-3">QUIZBUDDY</h1>
        <h2 class="text-center font-[Open_Sans] font-bold text-white">"Where curiousity meets knowledge"</h2>
   
        <div class="text-center">
        <button class="bg-gradient-to-br from-[#434799] to-[#747AF5] text-white px-8 py-1 rounded-4xl mt-80 mb-20 font-[Open_Sans] font-bold"  >Signup with Google</button>
        <p class="text-white font-[Open_Sans] font-bold">Already have an account? Login</p>
    </div>
  </div>
  )
}

export default Login 