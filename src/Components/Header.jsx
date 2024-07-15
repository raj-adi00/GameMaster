import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import authentication from '../Appwrite/auth';
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userout } from '../store/authslice';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function handlelogout() {
        try {
            const res = await authentication.logout()
            console.log(res)
            navigate('/');
            dispatch(userout())
        } catch (err) {
            console.log(err)
            navigate('/home')
        }
    }
    return (
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 shadow-lg opacity-90  w-full top-0">
            <ul className="flex justify-around items-center">
                <li>
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            `text-2xl font-bold hover:text-yellow-300 transition duration-300 ${isActive ? 'text-orange-600' : 'text-gray-200'}`
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/services"
                        className={({ isActive }) =>
                            `text-2xl font-bold hover:text-yellow-300 transition duration-300 ${isActive ? 'text-orange-600' : 'text-gray-200'}`
                        }
                    >
                        Services
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/leaderboard"
                        className={({ isActive }) =>
                            `text-2xl font-bold hover:text-yellow-300 transition duration-300 ${isActive ? 'text-orange-600' : 'text-gray-200'}`
                        }
                    >
                        LeaderBoard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/user"
                        className={({ isActive }) =>
                            `text-2xl font-bold hover:text-yellow-300 transition duration-300 ${isActive ? 'text-orange-600' : 'text-gray-200'}`
                        }
                    >
                        User
                    </NavLink>
                </li>
                <li>
                    <button className='text-2xl font-bold hover:text-yellow-300 transition duration-300 text-red-700' onClick={handlelogout}>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Header;
