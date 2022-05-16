import React, {useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {

    const [ state, setState] = useState({
        username:'',
        password:''
    })

    const handleInputs = (event)=>{
        const {name, value} = event.target;
        setState((preVal)=>{
          return{
            ...preVal,
            [name]:value,
          }
        })
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();

        const config = {
            headers: {
              "Content-Type": "Application/json",
            },
        };

        const data = await axios.post(
            "http://127.0.0.1:5000/login",
            state,
            config
        );

        console.log(data);
    }

  return (
    <>
        <ToastContainer />
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white py-6 rounded-md px-10 max-w-lg shadow-md">
                <h1 className="text-center text-2xl font-bold text-blue-600">Log In</h1>
            <div className="space-y-4 mt-6">
                <div className="w-full">
                    <input type="text" name="username" placeholder="username" className="rounded-lg px-4 py-4 my-1 focus:outline-blue-600 bg-gray-50" value={state.username} onChange={handleInputs} />
                </div>
                <div className="w-full">
                    <input type="password" name="password" placeholder="password" className="rounded-lg px-4 py-4 my-1 focus:outline-blue-600 bg-gray-50" value={state.password} onChange={handleInputs} />
                </div>
            </div>
                <button className="w-full mt-5 bg-blue-600 text-white py-2 rounded-md font-semibold tracking-tight" onClick={handleSubmit}>Register</button>
            </div>
        </div>
    </>
  );
}

export default Login;
