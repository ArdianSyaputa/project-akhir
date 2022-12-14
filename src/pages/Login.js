import axios from 'axios';
import React, { useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();
    
    const login = async (e) => {
      history.push("/")
        e.preventDefault();
        axios.get("http://localhost:8000/akun").then(({data}) => {
            const login = data.find(
                (x) => x.username === username && x.password === password
            );
            if (login) {
                Swal.fire(
                    'Login Berhasil!',
                    'Selamat Datang !' ,
                    'success'
                  )
                localStorage.setItem("id", login.id)
                localStorage.setItem("role", login.role)
                history.push("/");
                setTimeout(() => {
                    window.location.reload();
                  }, 1500);
            } else {
                Swal.fire(
                    'Gagal Melakukan Login!!',
                    'You clicked the button!',
                    'error'
                  )
            }
        });
    };
  return (
<div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-lg ">
    <h1 class="text-center text-2xl font-bold text-indigo-100 sm:text-3xl">
      Login
    </h1>

    <p className=" text-white" class="mx-auto mt-4 max-w-md text-center text-gray-500">
     Silahkan Masuk Dengan menggunakan akun, anda dapat Membeli!!
    </p>

    <form onSubmit={login} method="POST" action="" class="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">
      <p class="text-lg font-medium" className=" text-white">Masuk ke akun anda!</p>

      <div >
        <Form.Label className='text-white'>
            <strong>UserName</strong>
        </Form.Label>

        <div class="relative mt-1">
        <InputGroup className='d-flex gap-3'>
            <Form.Control
            placeholder='username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}/>
        </InputGroup>

          <span class="absolute inset-y-0 right-4 inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
      </div>

      <div>
        <Form.Label className='text-white'>
            <strong classNtext-white>Password</strong>
        </Form.Label>

        <div class="relative mt-1">
        <InputGroup className='d-flex gap-3'>
            <Form.Control
            placeholder='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        </InputGroup>

          <span class="absolute inset-y-0 right-4 inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
      </div>

      <button
        type="submit"
        class="block w-full rounded-lg bg-blue-700 px-5 py-3 text-sm font-medium text-white"
      >
        Sign in
      </button>

      <p class="text-center text-sm text-gray-500">
        Belum Mempunyai Akun?
        <a class="underline" href="/register">Register</a>
      </p>
    </form>
  </div>
</div>

  )
}
