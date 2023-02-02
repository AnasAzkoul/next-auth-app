/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '@/layout/Layout';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/form.module.css';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi';

type Props = {};

const Register = (props: Props) => {
  const [show, setShow] = useState({password: false, cPassword: false});
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
          <form className='flex flex-col gap-5'>
            <div className={styles.input_group}>
              <input
                type='text'
                name='username'
                placeholder='username'
                className={styles.input_text}
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
              />
              <span
                className='icon flex items-center px-4'
                onClick={() => setShow((prev) => ({...prev, password: !show.password}))}
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
              />
              <span
                className='icon flex items-center px-4'
                onClick={() => setShow((prev) => ({...prev, cPassword: !show.cPassword}))}
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
