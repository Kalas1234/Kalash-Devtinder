import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmailId] = useState('kalashgangwal3030@gmail.com');
    const [password, setPassword] = useState('Kalash@1234');
    const [error, setError] = useState('');
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

    return (
        <div className="flex justify-center items-center my-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title">Login!</h2>
                    <div>
                        <form>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Email</span>
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
                        <button onClick={handleLogin} className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
