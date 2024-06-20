import React, { useState } from 'react';
import axios from 'axios';
import './styleLogin.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { auth, provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';


const SignInUpForm = ({setIsLogin}) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //SIGN IN WITH GOOGLE
    const signinwithgoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            dispatch(loginStart());
            const res = await axios.post("https://scholary-tube-server.vercel.app/api/auth/google", {
                name: result.user.displayName,
                email: result.user.email,
                img: result.user.photoURL
            }, { withCredentials: true }); // Enable credentials
            dispatch(loginSuccess(res.data));
            navigate("/");
        } catch (err) {
            console.log(err);
            dispatch(loginFailure());
        }
    }
    //API BUTTONS
    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const resu = await axios.post("https://scholary-tube-server.vercel.app/api/auth/signin", { email, password }, { withCredentials: true }).then((res)=>{
                console.log('Successfully logged in');
                setIsLogin(true);
                dispatch(loginSuccess(res.data));
                navigate("/");
            });
            
        } catch (err) {
            alert(err.response.data.message);
            dispatch(loginFailure());
        }
    }

    const handleSignup = async () => {
        try {
            await axios.post("https://scholary-tube-server.vercel.app/api/auth/signup", { name, email, password }, { withCredentials: true }).then((res)=>{
                setIsSignUp(false);
                console.log('Successfully signed up');
            });
            
        } catch (err) {
            console.log(err);
        }
    }
    

    //GHOST BUTTONS
    const handleSignUpClick = () => {
            setIsSignUp(true);
    };

    const handleSignInClick = () => {
        setIsSignUp(false);
    };


    


    return (
        <>
        <div className='flex items-center h-screen w-full'>
            <div className={`container ${isSignUp ? 'right-panel-active' : ''} m-auto`} id="container">
                                    
                {/* SIGN UP FUNCTION */}
                <div className="form-container sign-up-container">
                    <div className='form'>
                        <h1 id='h1'>Create Account</h1>
                        <div className="social-container">
                            <div className="border border-red-500 rounded-3xl p-2 px-4 flex flex-row cursor-pointer" onClick={signinwithgoogle}>
                            <img style={{height: "20px", marginRight: "10px", marginTop: "3px"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="goggleicon" srcSet="" />
                                <span>Sign up with Google</span> 
                            </div>    
                        </div>
                        <span id='span'>or use your email for registration</span>
                        <input id='input' type="text" placeholder="Name" onChange={(e)=>{setName(e.target.value)}} />
                        <input id='input' type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} />
                        <input id='input' type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
                        <button id='btn' onClick={handleSignup}>Sign Up</button>
                    </div>
                </div>

                {/* SIGN IN FUNCTION */}
                <div className="form-container sign-in-container">
                    <div className='form'>
                        <h1 id='h1'>Sign in</h1>
                        <div className="social-container">
                            <div className="border border-red-500 rounded-3xl p-2 px-4 flex flex-row cursor-pointer" onClick={signinwithgoogle}>
                            <img style={{height: "20px", marginRight: "10px", marginTop: "3px"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="goggleicon" srcSet="" />
                                <span>Sign in with Google</span> 
                            </div>    
                        </div>
                        <span id='span'>or use your account</span>
                        <input id='input' value={email} type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} />
                        <input id='input' type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
                        <button id='btn' onClick={handleLogin}>Log In</button>
                    </div>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 id='h1'>Welcome Back!</h1>
                            <p id='p'> To keep connected with us please login with your personal info</p>
                            <button id='btn' className="ghost" onClick={handleSignInClick}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 id='h1'>Hello, Friend!</h1>
                            <p id='p' >Enter your personal details and start journey with us</p>
                            <button id='btn' className="ghost" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default SignInUpForm;
