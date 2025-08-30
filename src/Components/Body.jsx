import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../utils/userSlice';
import { useEffect } from 'react';
import { BASE_URL } from '../../utils/constants';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInfo = useSelector((store) => store.user.userInfo);

    const fetchUser = async () => {
        if (userInfo) return;

        try {
           const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      console.log('check10',res)

            dispatch(addUser(res?.data));
        } catch (error) {
            if(error?.status === 401){
               navigate('/login')
            }
            console.error(error?.response?.data || 'something went wrong');
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            <Navbar />
            <Outlet />

            {Footer()}
        </>
    );
};

export default Body;
