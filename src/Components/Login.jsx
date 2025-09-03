import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const res = await axios.post(
                `${BASE_URL}/login`,
                {
                    emailId: email,
                    password
                },
                { withCredentials: true }
            ); //tells browser to send credentils/cookie in the response or attach the cookie in the request header

            dispatch(addUser(res?.data));
            navigate('/');
            setError('');
        } catch (err) {
            setError(err?.response?.data);
        }
    };
     const handleSignUp = async () => {
        try {
            const res = await axios.post(
                `${BASE_URL}/signup`,
                {
                    emailId: email,
                    password,
                    firstName,
                    lastName,
                },
                { withCredentials: true }
            ); //tells browser to send credentils/cookie in the response or attach the cookie in the request header
            
            console.log('check50',res)
            dispatch(addUser(res?.data?.data));
            navigate('/profile');
            setError('');
        } catch (err) {
            setError(err?.response?.data);
        }
    };
     
    return (
        <div className="flex justify-center items-center my-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title">{isLogin ? "Login" : "Sign Up"}</h2>
                    <div>
                        <form>
                            {!isLogin && 
                                <>
                                    {' '}
                                    <div class="form-control w-full max-w-xs">
                                        <label class="label">
                                            <span class="label-text">First Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            value={firstName}
                                            class="input input-bordered w-full max-w-xs"
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div class="form-control w-full max-w-xs my-2">
                                        <label class="label">
                                            <span class="label-text">Last Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            value={lastName}
                                            class="input input-bordered w-full max-w-xs"
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                    
                                </>
                            }

                            <div class="form-control w-full max-w-xs my-2">
                                <label class="label">
                                    <span class="label-text">Email Id</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    value={email}
                                    class="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setEmailId(e.target.value)}
                                />
                            </div>
                            <div class="form-control w-full max-w-xs my-2">
                                <label class="label">
                                    <span class="label-text">Password</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    value={password}
                                    class="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                    {error.length !== 0 && <p className="text-red-500">{error}</p>}
                    <div className="card-actions flex justify-center my-4 ">
                        <button onClick={isLogin ? handleLogin : handleSignUp} className="btn btn-primary">
                            {isLogin ? 'Login' :'Sign Up'}
                        </button>
                    </div>
                    <p className='m-auto cursor-pointer py-2' onClick={() => setIsLogin(prev => !prev)}>{isLogin ? "New User? Register Now": "Existing User? Login Here"} </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
