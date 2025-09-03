import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../../utils/feedSlice';

const UserCard = ({ user }) => {

    const dispatch = useDispatch();
    const handleSendRequest = async (status, userId) => {
        try {
             await axios.post(
                `${BASE_URL}/request/send/${status}/${userId}`,
                {},
                {
                    withCredentials: true
                }
            );
            dispatch(removeUserFromFeed(userId))
        } catch (error) {
            console.log(error);
        }
    };

    const { firstName, lastName, age, gender, photoUrl, about, _id } = user;

    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img className="mt-4 rounded-lg shadow-lg" src={photoUrl} alt="photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + ' ' + lastName}</h2>
                {age && gender && <p>{age + ' ' + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => handleSendRequest('ignored', _id)} className="btn btn-primary">
                        Ignore
                    </button>
                    <button onClick={() => handleSendRequest('interested', _id)} className="btn btn-secondary">
                        Interested
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
