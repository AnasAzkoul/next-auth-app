import React from 'react';
import styles from '../styles/Layout.module.css'; 

type Props = {
  children: React.ReactElement;
};

const Layout = ({ children }: Props) => {
  return (
    <div className='flex h-screen bg-blue-400'>
      <div className='m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2'>
        <div className={styles.imgStyle}>
          <div className={styles.cartoonImg}></div>
          <div className={styles.cloud__one}></div>
          <div className={styles.cloud__two}></div>
        </div>
        <div className='right flex flex-col justify-start'>
          <div className='text-center py-10'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
