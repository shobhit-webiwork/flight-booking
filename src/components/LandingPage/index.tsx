import Link from 'next/link';
import Image from 'next/image';

import banner from '../../assets/images/flightbanner.png';

const LandingPage = () => {
  return (
    <div>
      <main>
        <div>
          <div>
            <div>
              <div className='w-full  h-screen  shadow-2xl overflow-hidden relative'>
                <Image
                  className='absolute inset-0 h-full w-full object-cover'
                  src={banner}
                  alt=''
                />
                <div className='absolute inset-0 bg-gray-900 bg-opacity-75'></div>
                <div className='flex h-full items-center justify-center relative gap-3'>
                  <div>
                    <Link href='/searchflight'>
                      <button
                        type='button'
                        className=' xs:w-full md:w-48 xs:justify-center xs:text-center text-black bg-white font-black rounded-lg text-lg inline-flex items-center px-5 py-3 text-center '
                      >
                        Search Flight
                      </button>
                    </Link>
                  </div>
                  <div>
                    <Link href='/findbooking'>
                      <button
                        type='button'
                        className=' xs:w-full md:w-48 xs:justify-center xs:text-center text-black bg-white font-black rounded-lg text-lg inline-flex items-center px-5 py-3 text-center '
                      >
                        Find Booking
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
