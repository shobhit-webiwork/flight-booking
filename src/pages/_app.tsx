import 'flowbite';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import 'react-intl-tel-input/dist/main.css';
import 'react-datepicker/dist/react-datepicker.css';

import '@/styles/globals.css';
import store from '@/src/redux/store';
import Layout from '@/src/components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <>
      {mount && (
        <Provider store={store}>
          <link
            rel='preload'
            href='/fonts/Avenir-Regular.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      )}
    </>
  );
}

export default MyApp;
