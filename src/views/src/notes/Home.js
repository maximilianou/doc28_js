import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Home = props => {

  const [state, setState] = useState('');
  const [check, setCheck] = useState('');

  useEffect( () =>{
      axios.get('/api/hello')
      .then( res => setState( JSON.stringify(res.data) ) );
  }, []);

  useEffect( () => {
      axios.get('/check/time')
      .then( res => setCheck( JSON.stringify(res.data) ));
  }, []);


  return(
    <div>
      Home
      <p>{state}</p>
      <p>{check}</p>
    </div>
 )
};

export default Home;
