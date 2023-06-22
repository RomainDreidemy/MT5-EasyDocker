import {useContext, useEffect, useState} from "react";
import axios from "../../services/utils/axios";
import { object, string } from 'yup';
import Warning from "../molecules/Warning.molecule";
import Success from "../molecules/Success.molecule";
import Input from "../atoms/Input.atom";
import {UserContext} from "../../index";

const LoginPage = () => {

    const [form, setForm] = useState({email: '', password: ''});
    const [errors, setErrors] = useState([]);
    const {user, setUser} = useContext(UserContext)

    let userSchema = object({
        email: string().email().required(),
        password: string().nullable().required()
    });

    const validateSchema = async () => {
        const validationResult = await userSchema
            .validate(form, { abortEarly: false })
            .catch((err) => {
                return err;
            });

        return validationResult.inner ?? null
    }
    const processLogin = async () => {
        const validationErrors = (await validateSchema());
        setErrors(validationErrors)
        if (validationErrors !== null) return;

        axios.post('/auth/login', form).then(r => {
            setUser({...user, token: r.data.token})
        }).catch(e => {
            setErrors([{path: e.response.data.status, message: e.response.data.message}])
        })
    }

    useEffect(() => {
        if (user.token !== null && user.token !== undefined) {
            axios.get('/users/me').then(r => {
                console.log(r.data)
            }).catch(e => {
                console.log(e)
            })
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <h1 className="font-bold text-center text-2xl mb-5">
                    <img src={'/assets/logo.png'} alt="logo" className={"w-5/6 mx-auto"}/>
                </h1>
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                    <div className="px-5 py-7">

                        <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                        <Input
                            type="email"
                            onChange={(e) => setForm({...form, email: e.target.value})}
                            className={errors?.map((e) => e.path).includes('email') ? 'border-2 border-red-600' : ''}
                        />
                        <div className='text-red-500 mb-5 first-letter:uppercase'>{errors?.map(e => e.path === 'email' ? e.message : '')}</div>

                        <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                        <Input
                            type="password"
                            onChange={(e) => setForm({...form, password: e.target.value})}
                            onKeyDown={(e) => e.key === 'Enter' ? processLogin() : null}
                            className={errors?.map((e) => e.path).includes('password') ? 'border-2 border-red-600' : ''}
                        />
                        <div className='text-red-500 mb-5 first-letter:uppercase'>{errors?.map(e => e.path === 'password' ? e.message : '')}</div>

                        <button type="button" onClick={processLogin} className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                            <span className="inline-block mr-2">Login</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                            </svg>
                        </button>
                        {errors?.map((e, key) => e.path === 'fail' ? <Warning key={key} message={e.message} /> : '')}
                        { (user.token !== null && user.token !== undefined) ? <Success message={"Logged in successfully. Redirecting..."} /> : '' }
                    </div>
                    <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center sm:text-left whitespace-nowrap">
                                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block" style={{verticalAlign: "-2px"}}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                                    </svg>
                                    <span className="inline-block ml-1">Forgot password ?</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="text-center sm:text-left whitespace-nowrap">
                            <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block" style={{verticalAlign: "-3px"}}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                </svg>
                                <span className="inline-block ml-1">Back to home</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
