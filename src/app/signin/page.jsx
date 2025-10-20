"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function SignIn(){
  const router=useRouter();
  const [form,setForm]=useState({email:"",password:""});
  const handleChange=e=>setForm({...form,[e.target.name]:e.target.value});
  const handleSubmit=e=>{
    e.preventDefault();
    if(form.email&&form.password){
      alert("Signed in successfully!");
      router.push("/dashboard");
    }else alert("Please fill all fields");
  };
  return(
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-purple-100 to-orange-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign In</h2>
        <input name="email" type="email" onChange={handleChange} placeholder="Email" className="w-full mb-4 p-3 border rounded-md"/>
        <input name="password" type="password" onChange={handleChange} placeholder="Password" className="w-full mb-4 p-3 border rounded-md"/>
        <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 transition">Sign In</button>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account? <a href="/signup" className="text-orange-500 font-semibold hover:underline">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
