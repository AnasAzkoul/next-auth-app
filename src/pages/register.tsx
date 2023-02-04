/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '@/layout/Layout';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/form.module.css';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi';

const Register = () => {
  const [show, setShow] = useState({ password: false, cPassword: false });
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    cPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (userInfo.password === userInfo.cPassword) {
      try {
        const response = await fetch('/api/auth/signup', {
          method: "POST", 
          body: JSON.stringify({
            username: userInfo.username,
            email: userInfo.email,
            password: userInfo.password, 
          }), 
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        if (!response.ok) {
          setUserInfo({ username: '', email: '', password: '', cPassword: '' });
          throw new Error('Bad Response', {
            cause: response, 
          })
        }
        
        const newUser = await response.json(); 
        
        console.log(newUser); 
        
        setUserInfo({username: '', email: '', password: '', cPassword: ''})
      
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error)
        }
      }
    }

  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Layout>
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
          <div className='title'>
            <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
            <p className='w-3/4 mx-auto text-gray-400'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
              distinctio.
            </p>
          </div>
          {/* Form */}
          <form className='flex flex-col gap-5' onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.input_group}>
              <input
                type='text'
                name='username'
                placeholder='username'
                className={styles.input_text}
                value={userInfo.username}
                onChange={(e) => handleInputChange(e)}
              />
              <span className='icon flex items-center px-4'>
                <HiOutlineUser size={25} />
              </span>
            </div>
            <div className={styles.input_group}>
              <input
                type='email'
                name='email'
                placeholder='email'
                className={styles.input_text}
                onChange={(e) => handleInputChange(e)}
                value={userInfo.email}
              />
              <span className='icon flex items-center px-4'>
                <HiAtSymbol size={25} />
              </span>
            </div>
            <div className={styles.input_group}>
              <input
                type={show.password ? 'text' : 'password'}
                name='password'
                placeholder='password'
                className={styles.input_text}
                onChange={(e) => handleInputChange(e)}
                value={userInfo.password}
              />
              <span
                className='icon flex items-center px-4'
                onClick={() =>
                  setShow((prev) => ({ ...prev, password: !show.password }))
                }
              >
                <HiFingerPrint size={25} />
              </span>
            </div>
            <div className={styles.input_group}>
              <input
                type={show.cPassword ? 'text' : 'password'}
                name='cPassword'
                placeholder='confirm password'
                className={styles.input_text}
                onChange={(e) => handleInputChange(e)}
                value={userInfo.cPassword}
              />
              <span
                className='icon flex items-center px-4'
                onClick={() =>
                  setShow((prev) => ({ ...prev, cPassword: !show.cPassword }))
                }
              >
                <HiFingerPrint size={25} />
              </span>
            </div>
            {/* Login buttons */}
            <div className='input-button'>
              <button type='submit' className={styles.button}>
                Login
              </button>
            </div>
          </form>
          {/* Bottom */}
          <p className='text=-center text-gray-400'>
            Have an account?{' '}
            <Link href='/login' className='text-blue-700'>
              Sign in
            </Link>
          </p>
        </section>
      </Layout>
    </>
  );
};

export default Register;
