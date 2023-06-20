import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { RootState } from '@/src/redux/store';
import booking from '../../assets/images/booking.png';
import bookseat from '../../assets/images/bookseat.png';
import CancelBookingLoader from '../Loader/CancelBooking';
import banner from '../../assets/images/desktopbanner.png';

const CancelSuccess = () => {
  const router = useRouter();

  const cancelBookingInfo = useSelector(
    (state: RootState) => state?.flightDetails?.cancelFlight
  );
  const load = useSelector((state: RootState) => state?.loader?.loader);

  const [copyText, setCopyText] = useState(false);

  return (
    <main className='mx-0 px-3'>
      {!load?.show ? (
        <div className='relative'>
          <div className='px-3 py-3 bg-cadetgray  xl:rounded-none rounded-lg xs:shadow-2xl xl:shadow-none inherit xs:absolute  xl:top-4  xs:top-0 w-full  xl:w-3/4 xl:py-10 index-style '>
            <div className='xl:not-sr-only	xs:sr-only'>
              <div className='xl:w-1/4 xs:w-full'>
                <div>
                  <div className='w-full h-52 xl:h-screen  xl:w-1/4 overflow-hidden xs:relative xl:fixed right-0'>
                    <Image
                      src={banner}
                      className='xs:absolute  inset-0 h-full w-full object-cover'
                      alt=''
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='xl:w-2/4 xl:m-auto xl:py-5 xs:py-0'>
              <div>
                <div className='mt-5'>
                  <h1 className='text-2xl font-black text-black '>
                    Your booking has been cancelled
                  </h1>
                  <p className='text-base font-medium text-pearlgray my-1'>
                    The refund amount will be credited in 3-5 working days.
                  </p>
                  <div className='py-2 xl:w-7/12 md:w-6/12 xs:w-64 '>
                    <div className='text-aqua text-sm font-normal p-2 border-aqua border bg-tabsky rounded-lg flex gap-2 items-center'>
                      <div className='text-aqua text-base font-black'>
                        Booking Ref:
                        {cancelBookingInfo?.PnrInformation?.PnrCode}
                      </div>
                      <div
                        className='cursor-pointer'
                        onClick={() => {
                          navigator.clipboard.writeText(
                            cancelBookingInfo?.PnrInformation?.PnrCode
                          );
                          setCopyText(true);
                          setTimeout(() => {
                            setCopyText(false);
                          }, 1000);
                        }}
                      >
                        <Image
                          className='h-6 w-6 object-cover'
                          src={booking}
                          alt=''
                        />
                      </div>
                    </div>
                    {copyText && <div>Copied</div>}
                  </div>
                  <div className='bg-white  xl:w-full mt-3 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg'>
                    <Image
                      className='h-full w-full object-containt  rounded-tl-lg rounded-tr-lg'
                      src={bookseat}
                      alt=''
                    />
                    <div className='p-4'>
                      <h1 className='text-lg font-black text-black'>
                        Fly in luxury with Beond
                      </h1>
                      <p className='text-sm text-medium text-slategray'>
                        We’re committed to giving you the best flying experience
                        with us.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className='lg:flex md:flex block h-full items-center justify-center relative gap-3 w-full  py-3 m-auto xs:mt-20 xl:mt-0 '>
                  <button
                    type='button'
                    className='w-full xs:justify-center  xs:text-center text-white bg-aqua font-black rounded-lg text-lg inline-flex items-center px-5 py-2 text-center '
                    onClick={() => {
                      router.push('/');
                    }}
                  >
                    Back to Homepage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CancelBookingLoader open={load?.show} />
      )}
    </main>
  );
};

export default CancelSuccess;
