import {React, useState} from "react";
import signupImage from "../assets/images/signup.gif"

import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

import uploadImageToCloudinary from "../utils/uploadCloudinary"



const Signup = () => {

  const [selectedFile, setselectedFile] = useState(null) 
  const [previewURL, setpreviewURL] = useState("") 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: '',
    gender: '',
    role: 'patient'
  })

  const navigate = useNavigate();

  const [loading ,setLoading] = useState(false);

  const handleInputChange =e=>{
    setFormData({...formData, [e.target.name]:e.target.value});
  }

  const handleFileInputChange = async (event)=>{
    const file = event.target.files[0]
    const data = await uploadImageToCloudinary(file);
    setpreviewURL(data.url);
    setselectedFile(data.url);
    setFormData({...formData, photo: data.url})


  }



  const submitHandler = async event =>{
    event.preventDefault();
    setLoading(true)

    try{
      const res = await fetch(`${BASE_URL}/auth/register`,{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData)
    })
    const {message} =await res.json()
    if(!res.ok){
      throw new Error(message)
    }

    setLoading(false)
    toast.success(message)
    navigate('/login')

    }
    catch(err){
      toast.error(err.message)
      setLoading(false);
    }
  }

  




  return <section className="px-5 xl:px-0">
    <div className="max-w-[1170px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:block bg-blue-600 rounded-l-lg">
          <figure className="rounded-l-lg">
            <img src={signupImage} alt="303" className="w-full rounded-l-lg" />
          </figure>
        </div>

        <div className="rounded-l-lg lg:pl-16 py-10 ">
          <h3 className="text-slate-900 text-[22px] leading-9 font-bold mb-10">
            Create an <span className="text-green-600">account</span>
          </h3>

          <form onSubmit={submitHandler}>
          <div className="mb-5">
          <input
           type="text"
           placeholder="Enter Your Full Name"
           name="name"
           value={formData.name}
           onChange={handleInputChange}
           className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61]
           focus:outline-none focus:border-b-blue-600 text-[16px] leading-7 text-black
           placeholder: text-slate-500 rounded-md cursor-pointer"
           required
          />
        </div>

        <div className="mb-5">
          <input
           type="email"
           placeholder="Enter Your email"
           name="email"
           value={formData.email}
           onChange={handleInputChange}
           className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61]
           focus:outline-none focus:border-b-blue-600 text-[16px] leading-7 text-black
           placeholder: text-slate-500 rounded-md cursor-pointer"
           required
          />
        </div>


        <div className="mb-5">
          <input
           type="password"
           placeholder="Password"
           name="password"
           value={formData.password}
           onChange={handleInputChange}
           className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61]
           focus:outline-none focus:border-b-blue-600 text-[16px] leading-7 text-black
           placeholder: text-slate-500 rounded-md cursor-pointer"
           required
          />
        </div>

        <div className="mb-5 flex items-center justify-between">
          <label
            
            className="text-slate-600 font-bold text-[16px] leading-7"
          >
            Are you a:
            <select
              name="role"
              value={formData.role}
           onChange={handleInputChange}
              className="text-slate-500 font-semibold text-[15px] leading-7 px-4 py-3
              focus:outline-none"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </label>

          <label
            
            className="text-slate-600 font-bold text-[16px] leading-7"
          >
            Sex
            <select
              name="gender"
              value={formData.gender}
           onChange={handleInputChange}
              className="text-slate-500 font-semibold text-[15px] leading-7 px-4 py-3
              focus:outline-none"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
        
        <div className="mt-7">
          <button
          disabled={loading && true}
            type="submit"
            className="w-full bg-green-600 text-white text-[18px] leading-[30px] rounded-lg
            px-4 py-3"
          >
            {loading ? <HashLoader size={35} color="#ffffff" /> : 'Sign Up'}
          </button>
        </div>

        <p className="mt-5 text-slate-400 text-center">
          Already have an account? <Link to= '/login' className="text-lime-600 font-medium
          ml-1">Login</Link>
        </p>


          </form>
        </div>
      </div>
    </div>
  </section>
}

export default Signup
