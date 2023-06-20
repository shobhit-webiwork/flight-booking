import { ReactNode } from 'react';

import Header from '../../components/Header/index';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>
        <>
          <div className='w-full'>
            <Header />
          </div>
        </>
        <div>
          <div
            className='
          layout-content'
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
export default Layout;
