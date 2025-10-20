"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function SignUp(){
  const router=useRouter();
  const [form,setForm]=useState({name:"",email:"",password:""});
  const handleChange=e=>setForm({...form,[e.target.name]:e.target.value});
  const handleSubmit=e=>{
    e.preventDefault();
    if(form.name&&form.email&&form.password){
      alert("Account created successfully!");
      router.push("/signin");
    }else alert("Please fill all fields");
  };
  return(
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-purple-100 to-orange-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign Up</h2>
        <input name="name" onChange={handleChange} placeholder="Full Name" className="w-full mb-4 p-3 border rounded-md"/>
        <input name="email" type="email" onChange={handleChange} placeholder="Email" className="w-full mb-4 p-3 border rounded-md"/>
        <input name="password" type="password" onChange={handleChange} placeholder="Password" className="w-full mb-4 p-3 border rounded-md"/>
        <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 transition">Sign Up</button>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account? <a href="/signin" className="text-orange-500 font-semibold hover:underline">Sign In</a>
        </p>
      </form>
    </div>
  );
}
