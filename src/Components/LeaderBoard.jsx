import React, { useState } from 'react'
import service from '../Appwrite/service'
import Cards from './Cards';
import Loader from './Loader';
import { Flag } from 'appwrite';

function LeaderBoard() {
  const [userdata, setuserdata] = useState();
  const [loading, setloading] = useState(true);
  service.getProfiles()
    .then((x) => {
      console.log(x);
      setuserdata(x);
      setloading(false)
    })
    .catch((err) => {
      console.log(err)
      setloading(false)
    })
  if (loading)
    return <Loader />
  else
    return (
      <div>
        {
          userdata && userdata.documents.map((val) => <Cards props={val} />)
        }
      </div>
    )
}

export default LeaderBoard
