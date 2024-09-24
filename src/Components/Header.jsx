

// import React, { useEffect, useState, useCallback } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import authentication from '../Appwrite/auth';
// import { useDispatch, useSelector } from 'react-redux';
// import { userout } from '../store/authslice';

// function Header() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const userData = useSelector((state) => state.auth.userData)

//     const handlelogout = useCallback(async () => {
//         try {
//             const res = await authentication.logout();
//             console.log(res);
//             navigate('/');
//             dispatch(userout());
//         } catch (err) {
//             console.log(err);
//             navigate('/home');
//         }
//     }, [navigate, dispatch]);

//     return (
//         <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 shadow-lg opacity-90 w-full top-0">
//             <ul className="flex justify-around items-center">
//                 <li>
//                     <NavLink
//                         to="/home"
//                         className={({ isActive }) =>
//                             `text-2xl font-bold hover:text-yellow-300 transition duration-300 ${isActive ? 'text-orange-600' : 'text-gray-200'}`
//                         }
//                     >
//                         Home
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink
//                         to="/services"
//                         className={({ isActive }) =>
//                             `text-2xl font-bold hover:text-yellow-300 transition duration-300 ${isActive ? 'text-orange-600' : 'text-gray-200'}`
//                         }
//                     >
//                         Services
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink
//                         to="/leaderboard"
//                         className={({ isActive }) =>
//                             `text-2xl font-bold hover:text-yellow-300 transition duration-300 ${isActive ? 'text-orange-600' : 'text-gray-200'}`
//                         }
//                     >
//                         LeaderBoard
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink
//                         to={`/user/${userData?.email}`}
//                         className={({ isActive }) =>
//                             `text-2xl font-bold hover:text-yellow-300 transition duration-300 ${isActive ? 'text-orange-600' : 'text-gray-200'}`
//                         }
//                     >
//                         User
//                     </NavLink>
//                 </li>
//                 <li>
//                     <button className='text-2xl font-bold hover:text-yellow-300 transition duration-300 text-red-700' onClick={handlelogout}>
//                         Logout
//                     </button>
//                 </li>
//             </ul>
//         </div>
//     );
// }

// export default Header;

import React, { useEffect, useState, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import authentication from '../Appwrite/auth';
import { useDispatch, useSelector } from 'react-redux';
import { userout } from '../store/authslice';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'; // Import icons for the hamburger menu

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);

    const [menuOpen, setMenuOpen] = useState(false); // State for toggling the hamburger menu

    const handlelogout = useCallback(async () => {
        try {
            const res = await authentication.logout();
            console.log(res);
            navigate('/');
            dispatch(userout());
        } catch (err) {
            console.log(err);
            navigate('/home');
        }
    }, [navigate, dispatch]);

    // Toggle menu function
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 shadow-lg opacity-90 w-full top-0">
            <div className="flex justify-between items-center">
                <div className="text-3xl font-bold text-white">GameMaster</div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white text-3xl focus:outline-none">
                        {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                    </button>
                </div>
            </div>
            <ul
                className={`md:flex justify-around items-center ${
                    menuOpen ? 'block' : 'hidden'
                } md:block`}
            >
                <li className="md:mt-0 mt-4">
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            `text-xl md:text-2xl font-bold hover:text-yellow-300 transition duration-300 ${isActive ? 'text-orange-600' : 'text-gray-200'}`
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li className="md:mt-0 mt-4">
                    <NavLink
                        to="/services"
                        className={({ isActive }) =>
                            `text-xl md:text-2xl font-bold hover:text-yellow-300 transition duration-300 ${isActive ? 'text-orange-600' : 'text-gray-200'}`
                        }
                    >
                        Services
                    </NavLink>
                </li>
                <li className="md:mt-0 mt-4">
                    <NavLink
                        to="/leaderboard"
                        className={({ isActive }) =>
                            `text-xl md:text-2xl font-bold hover:text-yellow-300 transition duration-300 ${isActive ? 'text-orange-600' : 'text-gray-200'}`
                        }
                    >
                        LeaderBoard
                    </NavLink>
                </li>
                <li className="md:mt-0 mt-4">
                    <NavLink
                        to={`/user/${userData?.email}`}
                        className={({ isActive }) =>
                            `text-xl md:text-2xl font-bold hover:text-yellow-300 transition duration-300 ${isActive ? 'text-orange-600' : 'text-gray-200'}`
                        }
                    >
                        User
                    </NavLink>
                </li>
                <li className="md:mt-0 mt-4">
                    <button
                        className="text-xl md:text-2xl font-bold hover:text-yellow-300 transition duration-300 text-red-700"
                        onClick={handlelogout}
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Header;
