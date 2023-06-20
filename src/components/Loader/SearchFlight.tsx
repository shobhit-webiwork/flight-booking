import Image from 'next/image';
import Lottie from 'react-lottie';

import * as animationData from './plane-window .json';
import dreambanner from '../../assets/images/dreambanner.png';
import desktoploader from '../../assets/images/desktoploader.png';

const SearchFlightLoader = (props: { open: boolean }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div>
      {props?.open && (
        <main className='mx-0 px-0 bg-black'>
          <div className=''>
            <div className=' flex flex-col justify-center items-center align-center h-screen'>
              <Lottie
                options={defaultOptions}
                height={200}
                width={200}
                isStopped={props?.open}
                isPaused={props?.open}
              />
              <div className='mt-10'>
                <h1 className='text-xl font-black text-white text-center'>
                  Searching for your dream flight
                </h1>
              </div>
            </div>
          </div>
          <div className='xs:not-sr-only	xl:sr-only	'>
            <div className='relative'>
              <div className='w-full h-44 overflow-hidden absolute bottom-0'>
                <Image
                  src={dreambanner}
                  className='absolute inset-0 h-full w-full object-contant'
                  alt=''
                />
              </div>
            </div>
          </div>
          <div className='xl:not-sr-only	xs:sr-only	'>
            <div className='relative'>
              <div className='w-full h-44 overflow-hidden absolute bottom-0'>
                <Image
                  src={desktoploader}
                  className='absolute inset-0 h-full w-full object-contant'
                  alt=''
                />
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default SearchFlightLoader;
