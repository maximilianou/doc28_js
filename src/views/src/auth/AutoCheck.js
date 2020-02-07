import React, { useEffect, useContext } from 'react';
import History from 'History';
import Context from 'Context';

import axios from 'axios';

const AuthCheck = () => {
  const context = useContext(Context);

  useEffect( () => {
    if( context.authObj.isAuthenticated()){
      const profile = context.authObj.userProfile;
      context.handleUserLogin();
      context.handleUserAddProfile();
      axios.post('/api/userprofiledb', profile
      ).then( axios.get('/api/userporfoliodb', {params: { email: profile.profile.email}})
      ).then( res => context.handleUserAddProfile( res.data )
      ).then( History.replace('/')
      );
    }else{
      context.handleUserLogout();
      context.handleUserRemoveProfile();
      context.handleUserRemoveProfile();
      history.replace('/');
    }
  }, [context.authObj.userProfile, context]);

    return(<div></div>);

}

export default AuthoCheck;
