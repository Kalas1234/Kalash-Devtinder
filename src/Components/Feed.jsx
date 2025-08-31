import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { BASE_URL } from '../../utils/constants';
import axios from 'axios';
import { addFeed } from '../../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
    const dispatch = useDispatch();

    const feed = useSelector((store) => store?.feed);

    const getFeed = async () => {
        if (feed) return;

        try {
            const res = await axios.get(`${BASE_URL}/feed`, {
                withCredentials: true
            });
            dispatch(addFeed(res?.data?.data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    return <div className='flex my-10 justify-center'>

      {Array.isArray(feed) && feed.length > 0 && (
      <UserCard user={feed[0]} />
    )}
    </div>;
};

export default Feed;
