/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest} from '../../utils/requestSlice';
import { useEffect } from 'react';

const Request = () => {
    const dispatch = useDispatch();

    const request = useSelector((store) => store?.request);

    const fetchRequest = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/requests/received`, {
                withCredentials: true
            });

    

            dispatch(addRequest(res?.data?.data));
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchRequest();
    }, []);

    const reviewRequest = async (status, id) => {
        try {
            const res = await axios.post(
                `${BASE_URL}/request/review/${status}/${id}`,
                {},
                {
                    withCredentials: true
                }
            );

            console.log('check30', res);
            dispatch(removeRequest(id))
        } catch (err) {
            console.error(err);
        }
    };

    if (!request) return;
    if (request.length === 0) return <h1 className='text-center text-2xl test-white my-10'>No Request Found</h1>;
    return (
        <div className="flex flex-col justify-center my-10 ">
            <h1 className="text-3xl text-white text-center my-8">Connection Requests</h1>
            {request.map((r) => {
                const { firstName, lastName, photoUrl, age, gender, about } = r.fromUserId;

                return (
                    <div
                        key={r._id}
                        className="m-4 p-4 flex bg-base-300 rounded-lg w-1/2 mx-auto justify-between items-center">
                        <div>
                            <img className="w-20 h-20 rounded-full" src={photoUrl} alt="photo" />
                        </div>

                        <div className="text-left mx-4">
                            <h2 className="font-bold text-xl">{firstName + ' ' + lastName}</h2>
                            {age && gender && <p>{age + ',' + gender}</p>}
                            <p>{about}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => reviewRequest('rejected', r._id)}
                                className="btn btn-primary mx-2">
                                Reject
                            </button>
                            <button
                                onClick={() => reviewRequest('accepted', r._id)}
                                className="btn btn-secondary mx-2">
                                Accept
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Request;
