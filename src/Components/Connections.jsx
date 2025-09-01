/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../../utils/connectionSlice';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store?.connections);
     const fetchConnections = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/connections`, {
                withCredentials: true
            });
            dispatch(addConnections(res?.data?.data));
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return;
    if (connections.length === 0) return <h1 className="text-2xl text-white">No Connections Found</h1>;

    return (
        <div className="flex flex-col justify-center my-10">
            <h1 className="text-3xl text-white text-center my-8">Connections</h1>
            {connections.map((connection) => {
                const { firstName, lastName, photoUrl, age, gender, about } = connection;

                return (
                    <div className="m-4 p-4 flex bg-base-300 rounded-lg w-1/2 mx-auto">
                        <div>
                            <img className="w-20 h-20 rounded-full" src={photoUrl} alt="photo" />
                        </div>

                        <div className="text-left mx-4">
                            <h2 className="font-bold text-xl">{firstName + ' ' + lastName}</h2>
                            {age && gender && <p>{age + ',' + gender}</p>}
                            <p>{about}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Connections;
