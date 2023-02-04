import Head from 'next/head';
import Link from 'next/link';
import { getSession, useSession, signOut } from 'next-auth/react';
import {Session} from 'next-auth';
import {GetServerSideProps} from 'next';

type HomePagePropTypes = {
  session: Session
}

const Home = (props: HomePagePropTypes) => {
  const {data:session} = useSession(); 
  
  const handleSignOut = () => {
    signOut()
  }
  
  return (
    <>
      <Head>
        <title>Create Next Auth</title>
      </Head>
      {session ? <AuthorizedUser session={session} signOut={handleSignOut}/> : <Guest />}
    </>
  );
};

export default Home;

// Guest

function Guest() {
  return (
    <main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold'>Guest Homepage</h3>
      <div className='flex justify-center'>
        <Link
          href={`/login`}
          className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'
        >
          Sign in
        </Link>
      </div>
    </main>
  );
}

// Authorized user

type AuthorizedUserPropTypes = {
  session: Session,
  signOut: () => void
}

function AuthorizedUser({session, signOut}: AuthorizedUserPropTypes) {
  return (<main className='container mx-auto text-center py-20'>
    <h3 className='text-4xl font-bold'>Authorized User</h3>
    
    <div className='details'>
      <h5>{session.user?.name}</h5>
      <h5>{session.user?.email}</h5>
    </div>
    
    <div className='flex justify-center'>
      <button className='mt-5 px-10 rounded-sm bg-indigo-500 text-gray-50' onClick={signOut}>Sign out</button>
    </div>
    
    <div className='flex justify-center'>
      <Link
        href={`/profile`}
        className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'
      >
        Profile Page
      </Link>
    </div>
  </main>);
}


export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const session = await getSession({req}); 
    
  if (!session) {
    return {
      redirect: {
        destination: '/login', 
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}
