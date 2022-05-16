import React, {useState, useEffect} from 'react';
import { postRegister } from "../../store/asyncMethods/AuthMethods"
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {

    const {registerErrors, user, loading} = useSelector((state)=> state.AuthReducer);

    const dispatch=useDispatch();

    const [ state, setState] = useState({
        email:'',
        username:'',
        password:'',
        name:''
    })

    useEffect(()=>{
        if(registerErrors.length > 0){
            registerErrors.map(error => {
                toast.warn(error.msg);
            })
        } 
        if(user){
            toast(`Welcome ${user.username}`);
        }
    },[registerErrors, user])

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
        dispatch(postRegister(state));
    }

    return (
      <>
        <ToastContainer />
          <div className="flex items-center justify-center h-screen bg-gray-100">
              <div className="bg-white py-6 rounded-md px-10 max-w-lg shadow-md">
                  <h1 className="text-center text-2xl font-bold text-blue-600">Sign Up</h1>
              <div className="space-y-4 mt-6">
                <div className="w-full">
                      <input type="text" placeholder="name" name="name" className="rounded-lg px-4 py-4 my-1 focus:outline-blue-600 bg-gray-50" value={state.name} onChange={handleInputs} />
                  </div>
                  <div className="w-full">
                      <input type="text" placeholder="username" name="username" className="rounded-lg px-4 py-4 my-1 focus:outline-blue-600 bg-gray-50" value={state.username} onChange={handleInputs} />
                  </div>
                  <div className="w-full">
                      <input type="email" placeholder="email" name="email" className="rounded-lg px-4 py-4 my-1 focus:outline-blue-600 bg-gray-50" value={state.email} onChange={handleInputs} />
                  </div>
                  <div className="w-full">
                      <input type="password" placeholder="password" name="password" className="rounded-lg px-4 py-4 my-1 focus:outline-blue-600 bg-gray-50" value={state.password} onChange={handleInputs} />
                  </div>
              </div>
                  <button className="w-full mt-5 bg-blue-600 text-white py-2 rounded-md font-semibold tracking-tight" onClick={handleSubmit}>Register</button>
              </div>
          </div>
      </>
    );
  }
  
  export default SignUp;
  