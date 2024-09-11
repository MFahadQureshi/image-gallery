import { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up Now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="email" 
                className="input input-bordered" 
                required 
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="password" 
                className="input input-bordered" 
                required 
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Signup</button>
            </div>
            <div className="text-center mt-4">
              <p>Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
