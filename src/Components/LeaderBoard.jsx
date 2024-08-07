import React, { useEffect, useState } from 'react';
import service from '../Appwrite/service';
import Cards from './Cards';
import Loader from './Loader';
import Header from './Header';

function LeaderBoard() {
  const [userdata, setuserdata] = useState();
  const [loading, setloading] = useState(false);

  // Uncomment this useEffect to fetch profiles
  useEffect(() => {
    setloading(true);
    service.getProfiles()
      .then((x) => {
        // console.log(x);
        setuserdata(x);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <Loader />
      </div>
    );
  } else {
    return (
      <div className='bg-gradient-to-r from-blue-500 to-purple-600 min-w-screen min-h-screen relative overflow-hidden'>
        <Header />
        <h3 className='text-2xl font-bold text-center p-2 text-white'>Leaderboard</h3>
        <div className='cards-container'>
          {userdata && userdata.documents.map((val) => (
            <div className='' key={val.userid}>
              <Cards {...val} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default LeaderBoard;

