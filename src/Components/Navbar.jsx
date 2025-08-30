import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../../utils/userSlice';
import axios from 'axios';


const Navbar = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((store) => store?.user);

    const handleLogin = async () => {
        try {
            await axios.post(
                `${BASE_URL}/logout`,
                {},
                {
                    withCredentials: true
                }
            );
        dispatch(removeUser())
        navigate('/login')

        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    Kalash-DevTinder
                </Link>
            </div>
            {userInfo && (
                <div className="flex gap-2">
                    <p>Welcome , {userInfo?.firstName}</p>
                    <div className="dropdown dropdown-end mx-5">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={userInfo?.photoUrl} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li>
                                <a>Settings</a>
                            </li>
                            <li>
                                <a onClick={handleLogin}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
