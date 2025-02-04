import MapComponent from '../pages/MapComponent';
import React, { useState, useEffect } from 'react';

import "./nearby.css"

function Nearby ()  {
    const [data, setData] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5001/get_locations');
      const result = await response.json();
      console.log(result)
      setData(result['data']);
    } catch (err) {
      console.log(err)
    }
  };

  fetchData();
}, []);


    return ( data &&(
      <>
      <section className='Nearby'>
        <div className = "container">
          <div className='title'>
            <h1>Nearby Places to Stay</h1>
          </div>
              <div >
             <MapComponent coordinates={data} />
             </div>
        </div>
      </section>
      </>
    ) )
  } 
export default Nearby
