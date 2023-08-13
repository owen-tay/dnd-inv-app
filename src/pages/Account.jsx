import React from 'react';
import { UserAuth } from '../context/AuthContext';
import CreateCharacter from '../components/CreateCharacter';
import ViewCharacter from '../components/ViewCharacter';
import { getDatabase, ref, set, onValue } from "firebase/database";





export const Account = () => {
  const { logOut, user } = UserAuth();


  function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
  }

  setCookie('userUID', user.uid, 7);




  
  ;




  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
      
    }
  };



  return (
    <div className='w-[300px] m-auto'>
      <h1 className='text-center text-2xl font-bold pt-12'>Account</h1>
      <div>
        <p>Welcome, {user?.displayName + " " + user?.uid}</p>
      </div>
      <button onClick={handleSignOut} className='border py-2 px-5 mt-10'>
        Logout
      </button>
      <CreateCharacter></CreateCharacter>
      <ViewCharacter></ViewCharacter>
    </div>
  );
};

export default Account;