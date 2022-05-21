import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

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

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        toast.success('You are now logged in');
        navigate('/');
      }
    } catch (error) {
      toast.error('Incorrect username or password');
    }
  };

  return (
    <>
      <header>
        <h1 className='text-4xl text-center'>Sign In</h1>
      </header>
      <form className='flex pt-10' onSubmit={onSubmit}>
        <div className='mx-auto flex flex-col gap-2 w-full max-w-sm'>
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
            <button className='btn btn-primary'>Sign In</button>
            <div className='flex flex-col items-end'>
              <Link className='text-slate-500' to='/sign-up'>
                Sign Up Instead
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
export default SignIn;
