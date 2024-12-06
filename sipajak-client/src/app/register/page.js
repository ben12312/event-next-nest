"use client";
import fetchData from "@/fetch/fetch";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failLoginMsg, setFailLoginMsg] = useState('');
    const router = useRouter();
    
  useEffect(() => {

  }, []);

  const signUpButton = async (params) => {
    if (name == '' || email == '' || username == '' || password == '') return setFailLoginMsg('Name or Email or Username or Password can not be empty!')
    let response = await fetchData('/users/signup', "POST", { name, email, username, password });
    const data = await response.json();
    if (data.code == 200) {
      router.push('/login');
    } else {
      setFailLoginMsg(data.msg || data.message)
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
                <h3 className="font-semibold text-2xl text-gray-800">Sign Up{" "}</h3>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Name
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="text"
                    placeholder="Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Email
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="text"
                    placeholder="Email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Username
                  </label>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="text"
                    placeholder="username"
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
                <div>
                  <button
                    type="button"
                    onClick={signUpButton}
                    className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Sign up
                  </button>
                </div>
                <p style={{ color: 'black' }}>Already have account, Login here<a onClick={() => router.push('/login')} className="text-green-400 hover:text-green-500"> Login</a></p>
              </div>

              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>
                  Copyright © 2021-2022
                  <a
                    href="https://codepen.io/uidesignhub"
                    rel=""
                    target="_blank"
                    title="Ajimon"
                    className="text-green hover:text-green-500 "
                  >
                    {" "}
                    Ben
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
