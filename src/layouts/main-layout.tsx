import clsx from 'clsx';
import React from 'react';

import styles from './basic-layout.module.scss';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout = ({ children, className }: MainLayoutProps) => {
  return <div className={clsx(styles.container, className)}>{children}</div>;
};

export default MainLayout;
