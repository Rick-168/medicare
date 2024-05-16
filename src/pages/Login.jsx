import { useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {

  const submit = () =>{
    alert('Sucessfully Logged in')
  }


  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

 

  const handleInputChange =e=>{
    setFormData({...formData, [e.target.name]:e.target.value});
  }

  return <section>
    <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10'>
      <h3 className="text-slate-800 text-[22px] leading-9 font-bold
      mb-10">Hello Welcome Back 👍</h3>

      <form className="py-4 md:py-0">
        <div className="mb-5">
          <input type="email" placeholder="Enter Your Email" name="email" value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-b border-solid border-[#0066ff61]
          focus:outline-none focus:border-b-blue-600 text-[16px] leading-7 text-black
          placeholder: text-slate-500 rounded-md cursor-pointer"
          required
          />
        </div>

        <div className="mb-5">
          <input type="password" placeholder="Password" name="password" value={formData.password}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-b border-solid border-[#0066ff61]
          focus:outline-none focus:border-b-blue-600 text-[16px] leading-7 text-black
          placeholder: text-slate-500 rounded-md cursor-pointer"
          required
          />
        </div>

        <div className="mt-7">
          <button
            type="submit"
            className="w-full bg-green-600 text-white text-[18px] leading-[30px] rounded-lg
            px-4 py-3"
            onClick={submit}
          >
            Login
          </button>
        </div>

        <p className="mt-5 text-slate-400 text-center">
          Dont have an account? <Link to= '/register' className="text-lime-600 font-medium
          ml-1">Register</Link>
        </p>

      </form>
    </div>
  </section>
}

export default Login
