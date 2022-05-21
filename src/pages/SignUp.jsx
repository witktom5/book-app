import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { email, password, username } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: username,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      toast.success('Succesfully made a new account');
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong with registration...');
    }
  };

  return (
    <>
      <header>
        <h1 className='text-4xl text-center'>Sign Up</h1>
      </header>
      <form className='flex pt-10' onSubmit={onSubmit}>
        <div className='mx-auto flex flex-col gap-2 w-full max-w-sm'>
          <input
            type='text'
            className='input input-bordered'
            placeholder='Username'
            id='name'
            value={username}
            onChange={onChange}
          />

          <input
            type='email'
            className='input input-bordered'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />
          <input
            type='password'
            placeholder='Password'
            className='input input-bordered w-full max-w-md'
            id='password'
            value={password}
            onChange={onChange}
          />
          <div className='flex w-full max-w-sm items-center justify-between mt-3'>
            <button className='btn btn-primary'>Sign Up</button>
            <div className='flex flex-col items-end'>
              <Link className='text-slate-500' to='/sign-in'>
                Sign In Instead
              </Link>
              <Link className='text-slate-500' to='/forgot-password'>
                Forgot Password
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
export default SignUp;
