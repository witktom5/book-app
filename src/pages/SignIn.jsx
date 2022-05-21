import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
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
      <div>
        <header>
          <p>Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type='email'
              placeholder='Email'
              id='email'
              value={email}
              onChange={onChange}
            />

            <div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                id='password'
                value={password}
                onChange={onChange}
              />
            </div>
            <Link to='/forgot-password'>Forgot Password</Link>

            <div>
              <p>Sign In</p>
              <button>Go</button>
            </div>
          </form>

          <Link to='/sign-up'>Sign Up Instead</Link>
        </main>
      </div>
    </>
  );
}
export default SignIn;
