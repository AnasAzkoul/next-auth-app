/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Layout from '@/layout/Layout';
import Link from 'next/link';
import styles from '../styles/form.module.css';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import { signIn } from 'next-auth/react';
import {useRouter} from 'next/router';
import useValidateForm from '@/hooks/useValidateForm';



const LogIn = () => {
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const router = useRouter();
  const {touched, error, onBlur} = useValidateForm(); 
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const status = await signIn('credentials', {
      callbackUrl: 'http://localhost:3000',
      redirect: false,
      email: userInfo.email,
      password: userInfo.password,
    });

    if (status?.ok) {
      router.push(status?.url!);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: 'http://localhost:3000' });
  };
  const handleGithubSignIn = async () => {
    signIn('github', { callbackUrl: 'http://localhost:3000' });
  };

  return (
    <>
      <Head>
        <title>Log in</title>
      </Head>
      <Layout>
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
          <div className='title'>
            <h1 className='text-gray-800 text-4xl font-bold py-4'>Explore</h1>
            <p className='w-3/4 mx-auto text-gray-400'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
              distinctio.
            </p>
          </div>
          {/* Form */}
          <form
            className='flex flex-col gap-5'
            onSubmit={handleCredentialsSignIn}
          >
            <div className={styles.input_group}>
              <input
                type='email'
                name='email'
                placeholder='email'
                className={`${styles.input_text} ${
                  error?.email && touched?.email ? styles.input_error : ''
                }`}
                onChange={(e) => handleInputChange(e)}
                value={userInfo.email}
                onBlur={(e) => onBlur(e)}
              />
              <span className='icon flex items-center px-4'>
                <HiAtSymbol size={25} />
              </span>
            </div>
            {error?.email && touched?.email ? <span className='text-rose-400 text-start px-4'>{error.email}</span> : null}
            <div className={styles.input_group}>
              <input
                type={show ? 'text' : 'password'}
                name='password'
                placeholder='password'
                className={`${styles.input_text} ${
                  error?.password && touched?.password ? styles.input_error : ''
                }`}
                onChange={(e) => handleInputChange(e)}
                value={userInfo.password}
                onBlur={(e) => onBlur(e)}
              />
              <span
                className='icon flex items-center px-4'
                onClick={() => setShow(!show)}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>
            {error?.password && touched?.password ? <span className='text-rose-400 text-start px-4'>{error.password}</span> : null}
            {/* Login buttons */}
            <div className='input-button'>
              <button type='submit' className={styles.button}>
                Login
              </button>
            </div>
            <div className='input-button'>
              <button
                type='button'
                className={styles.button__custom}
                onClick={handleGoogleSignIn}
              >
                Sign in with Google
                <Image
                  src='/assets/google.svg'
                  width={20}
                  height={20}
                  alt='google logo'
                />
              </button>
            </div>
            <div className='input-button'>
              <button
                type='button'
                className={styles.button__custom}
                onClick={handleGithubSignIn}
              >
                Sign in with Github
                <Image
                  src='/assets/github.svg'
                  width={25}
                  height={25}
                  alt='github logo'
                />
              </button>
            </div>
          </form>
          {/* Bottom */}
          <p className='text=-center text-gray-400'>
            don't have an account yet?{' '}
            <Link href='/register' className='text-blue-700'>
              Sign up
            </Link>
          </p>
        </section>
      </Layout>
    </>
  );
};

export default LogIn;
