import React from 'react'
import { GoogleLogin} from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useDispatch } from 'react-redux';
import { add } from '../redux/userSlice'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const ob = JSON.parse(jsonPayload)
        
        const obj = {
            name: ob.name,
            email: ob.email,
            picture: ob.picture
        }

        axios.post('http://localhost:8000/user', obj)
            .then((res) => { console.log(res) })
            .catch((err) => { console.log(err) })
        localStorage.setItem('dataKey', JSON.stringify(obj));
        dispatch(add(obj))
        navigate('/Chatbox')
        return JSON.parse(jsonPayload);
    };

    const responseFacebook = (response) => {
        // console.log(response);
        localStorage.setItem('dataKey', JSON.stringify(response));
    }

    return (
        <div className='flex items-center justify-center h-screen bg-indigo-700'>
            <section className=" dark:bg-gray-900 w-80 rounded-md   px-8 py-4">
                <div className='flex flex-col space-y-4 my-3'>
                    <div className='bg-my_color py-2 float-right rounded-xl'>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                console.log(">>>>>>>>>>>>>", parseJwt(credentialResponse.credential));
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div>
                    <div className='bg-my_color py-2 float-right rounded-xl'>
                        <FacebookLogin
                            appId="784170523224460"
                            autoLoad={true}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            cssClass="my-facebook-button-class"
                            className='bg-my_color py-2 float-right rounded-xl'
                            icon="fa-facebook"
                        /></div>

                    {/*<button className='bg-my_color py-2 float-right rounded-xl' > <span> <AiFillApple className='float-left mt-1 ml-6 text-xl' /></span> Signup with Apple</button>*/}

                    {/*<button className='bg-my_color py-2 float-right rounded-xl' > <span> <BsFacebook className='float-left mt-1 ml-6 text-xl' /></span> Signup with Facebook</button>*/}

                </div>
            </section >
        </div >
    )
}

export default Login