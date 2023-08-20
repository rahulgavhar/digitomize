import { useNavigation, Form, redirect, useActionData } from 'react-router-dom'

import { signupUser, isLoggedIn } from '../../api'

export function loader(){
    if (isLoggedIn()) {
        return redirect("/user/dashboard/personal")
    }
    return null
}

export async function action({ request }){
    const formData = await request.formData()
    const username = formData.get("username")
    const firstName = formData.get("firstName")
    const email = formData.get("email")
    const password = formData.get("password")
    try {
        const data = await signupUser({ username,firstName, email, password })
        return null
    }
    catch(err) {
        const errorMessage = err.response.data.error
        return errorMessage
    } 
}

export default function Signup() {
    const errorMessage = useActionData()
    console.log(errorMessage)
    const navigation = useNavigation()
    return (
        <div className="outer-login-div">
            <div className="login-container">
                <h1 className='text-4xl'>Sign up your account</h1>
                {errorMessage && <h3 className="red">{errorMessage}</h3>}
                <Form 
                    method="post" 
                    className="w-full h-full max-w-lg mt-8"
                    replace
                >
                    {/* new form  */}
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                First Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" name='firstName' required/>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Username
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" name='username' type="text" placeholder="Doe" required/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-email">
                                Email
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="Email" name='email' required/>
                        </div>
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
                                Password
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" name='password' placeholder="******************" required/>
                        </div>
                    </div>
                    <div className="md:flex md:items-center items-center">
                        <div className="md:w-2/3 ">
                            <button disabled={navigation.state === "submitting"} className="shadow gradient-custom drop-shadow-2xl focus:shadow-outline focus:outline-none font-light text-white py-2 px-12 rounded">
                                {navigation.state === "submitting" ? "Signing up..." : "Sign up"}
                            </button>
                        </div>
                    </div>

                </Form>
            </div>
        </div>
    )
}
