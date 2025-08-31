import { useState } from 'react';
import { useDispatch } from 'react-redux';
import UserCard from './UserCard';
import { BASE_URL } from '../../utils/constants';
import axios from 'axios';
import { addUser } from '../../utils/userSlice';
import Toast from './Toast';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [age, setAge] = useState(user?.age);
    const [gender, setGender] = useState(user?.gender);
    const [about, setAbout] = useState(user?.about);
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);

    const dispatch = useDispatch();

    const handleSaveProfile = async () => {
        setError('');
        try {
            const res = await axios.patch(
                `${BASE_URL}/profile/edit`,
                {
                    firstName,
                    lastName,
                    age,
                    about,
                    photoUrl,
                    gender
                },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (error) {
            setError(error?.response?.data);
        }
    };

    return (
        <>
            <div className="flex justify-center my-10">
                <div className="flex justify-center items-center mx-10">
                    <div className="card bg-base-300 w-96 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">Edit Profile</h2>
                            <div>
                                <form>
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
                                    <div class="form-control w-full max-w-xs my-2">
                                        <label class="label">
                                            <span class="label-text">Age</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            value={age}
                                            class="input input-bordered w-full max-w-xs"
                                            onChange={(e) => setAge(e.target.value)}
                                        />
                                    </div>
                                    <div class="form-control w-full max-w-xs my-2">
                                        <label class="label">
                                            <span class="label-text">Gender</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            value={gender}
                                            class="input input-bordered w-full max-w-xs"
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                    </div>
                                    <div class="form-control w-full max-w-xs my-2">
                                        <label class="label">
                                            <span class="label-text">Photo Url:</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            value={photoUrl}
                                            class="input input-bordered w-full max-w-xs"
                                            onChange={(e) => setPhotoUrl(e.target.value)}
                                        />
                                    </div>
                                    <div class="form-control w-full max-w-xs my-2">
                                        <label class="label">
                                            <span class="label-text">About</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            value={about}
                                            class="input input-bordered w-full max-w-xs"
                                            onChange={(e) => setAbout(e.target.value)}
                                        />
                                    </div>
                                </form>
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <div className="card-actions flex justify-center my-4 ">
                                <button onClick={handleSaveProfile} className="btn btn-primary">
                                    Save Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, photoUrl, gender, age, about }} />
            </div>
            {showToast && <Toast />}
        </>
    );
};

export default EditProfile;
