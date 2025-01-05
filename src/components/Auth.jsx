import React, { useState } from 'react'
import { registerUser, loginUser } from '../api';
import './Auth.css'

const Auth = ({setAuth}) => {
    
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({name:'', email:'', password:'',});
    const toggleForm = () => setIsLogin(!isLogin);

    const handleChange = (e) => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            if(isLogin){
                const response = await loginUser(formData);
                localStorage.setItem('token', response.data.token);
                setAuth(true);
            }else{
                await registerUser(formData);
                alert('Registration Successful');
                setIsLogin(true);
            }
            
        }catch(error){
            alert(error.response?.data?.message || 'Error Occured');
        }
    };

    return (
        <div className='auth-container'>
            <div className={`auth-form ${isLogin ? 'fade-left' : 'fade-right'}`}>
            
            <h2 className='auth-heading'>{isLogin ? 'LOGIN' : 'SIGN UP'}</h2>

            <form onSubmit={handleSubmit}>

                {!isLogin && (
                    <input type='text' name='name' placeholder='Name' value={formData.name} onChange={handleChange}/>
                )}
                
                <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange}/>
                <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange}/>

                <button type='Submit'>{isLogin ? 'LOGIN' : 'REGISTER'}</button>
            </form>

            <p className='toggle-link' onClick={toggleForm}>
                {isLogin ? "Don't have an account ? SIGN-UP" : "Already have an Account ? LOGIN"}
            </p>

            </div>
        </div>
    )
}

export default Auth