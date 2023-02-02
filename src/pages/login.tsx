import React from 'react';
import Head from 'next/head';
import Layout from '@/layout/Layout';

type Props = {};

const LogIn = (props: Props) => {
  return (
    <>
      <Head>
        <title>Log in</title>
      </Head>
      <Layout>
        <h1>Login</h1>
      </Layout>
    </>
  );
};

export default LogIn;
