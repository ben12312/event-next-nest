"use client";
import fetchData from "@/fetch/fetch";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'next-client-cookies';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failLoginMsg, setFailLoginMsg] = useState('');
    const router = useRouter();
    const cookies = useCookies();
    
  useEffect(() => {

  }, []);

  const signInButton = async (params) => {
    if (username == '' || password == '') return setFailLoginMsg('Username or Password can not be empty!')
    let response = await fetchData('/users/signin', "POST", { username, password });
    const data = await response.json();
    if (data.code == 200) {
        cookies.set('token', data.data.token);
        router.push('/');
    } else {
        setFailLoginMsg(data.msg)
    }
  };

  return (
    <div>
      <div
        className="bg-no-repeat bg-cover bg-center relative"
        style={{
          backgroundImage:
            "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80",
        }}
      >
        <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
        <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div className="self-start hidden lg:flex flex-col  text-white">
              {/* <Image src="/next.svg" className="mb-3" width={180} height={38} alt="Next.js logo"/> */}
              <h1 className="mb-3 font-bold text-5xl">Management Event</h1>
              <p className="pr-3">Manage your event for better life</p>
            </div>
          </div>
          <div className="flex justify-center self-center  z-10">
            <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
              <div className="mb-4">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Sign In{" "}
                </h3>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Username
                  </label>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="text"
                    placeholder="Username"
                  />
                </div>
                <div className="space-y-2">
                  <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="password"
                    placeholder="Enter your password"
                  />
                  <h6 className="text-sm" style={{ color: 'red'}}>{failLoginMsg}</h6>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-800"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="text-green-400 hover:text-green-500">Forgot your password?</a>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={signInButton}
                    className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Sign in
                  </button>
                </div>
                <p style={{ color: 'black' }}>Dont have account? Register here <a onClick={() => router.push('/register')} className="text-green-400 hover:text-green-500"> Register</a></p>
              </div>

              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>
                  Copyright © 2021-2022
                  <a
                    href="https://www.sipajak.com/"
                    rel=""
                    target="_blank"
                    title="Ajimon"
                    className="text-green hover:text-green-500 "
                  >
                    {" "}
                    SiPajak
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
