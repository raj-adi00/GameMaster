import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import authentication from '../Appwrite/auth';
import { useNavigate } from 'react-router';
import service from '../Appwrite/service';
import Loader from './Loader';
const ProfileCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState({})
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState()
  const [profileImage, setProfileImage] = useState()
  if (id === null) {
    console.log(id)
    authentication.logout()
      .then(() => {
        navigate("/")
      })
      .catch(() => { })
    return (
      <div>404 USER NOT FOUND!!!! PLEASE LOGOUT AND LOGIN AGAIN</div>
    )
  }
  // service.getProfile(id)
  //   .then((res) => {
  //     usedoc(res.documents[0])
  //     console.log(res)
  //   })
  //   .catch((err) => {
  //     console.log("error at getting profile", err);
  //   })
  const getProfile = useCallback(() => {
    seterror("");
    setloading(true)
    service.getProfile(id)
      .then((res) => {
        setDoc(res.documents[0])
        const link = service.getfilePreview(res.documents[0]?.profilephoto)
        setProfileImage(link)
        setloading(false)
      })
      .catch((err) => {
        console.log("Error getting profile:", err);
        seterror(err.message)
        setloading(false)
      });
  }, [id]); // Dependency array with id as a dependency

  useEffect(() => {
    if (!id) {
      console.log(id);
      authentication.logout()
        .then(() => {
          navigate("/");
        })
        .catch((err) => { seterror(err.message) });
    } else {
      getProfile(); // Call getProfile when id changes or on initial render
    }
  }, [id, navigate, getProfile]);

  if (!id) {
    return (
      <div>404 USER NOT FOUND!!!! PLEASE LOGOUT AND LOGIN AGAIN</div>
    );
  }
  if (loading)
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader />
      </div>
    )
  else
    return (
      <div>
        {error && <div className='text-red-700 text-center bg-yellow-300 mx-auto'>{error}</div>}
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-500 to-purple-600">
          <div className="bg-black/40 text-white min-w-[30%] p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <div className="text-center">
              <div className="relative rounded-full overflow-hidden w-1/2 mx-auto mb-4">
                <img
                  className="h-full w-full max-h-44 max-w-44 object-contain rounded-full bg-gray-600"
                  src={profileImage}
                  alt="Profile"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 bg-white/70">{doc?.name}</h2>
              <p className="text-sm font-semibold">Rating:{doc?.rating}</p>
              <p className="text-sm font-semibold">Level: {doc?.level}</p>
              <p className="text-sm">Email: {doc?.email}</p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProfileCard;