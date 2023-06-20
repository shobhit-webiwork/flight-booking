import Image from 'next/image';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import banner from '../../assets/images/desktopbanner.png';

const TermsConditions = () => {
  return (
    <main>
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
              <div className='flex justify-between items-center'>
                <div>
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    aria-hidden='true'
                    className='text-black text-sm font-black h-4 w-4'
                  />
                  <span className='px-2 text-black text-sm font-black'>
                    Back
                  </span>
                </div>
              </div>
              <div>
                <div className='pt-3'>
                  <h1 className='text-2xl font-black  text-black'>
                    Terms & Conditions
                  </h1>
                </div>
                <div className='py-1'>
                  <p className='font-medium text-sm text-pearlgray'>
                    Please read and accept the terms and conditions
                  </p>
                </div>
              </div>
            </div>
            <div className='bg-white px-3 py-2 rounded-lg mb-2'>
              <div className='mb-4'>
                <div className='my-2'>
                  <h1 className='text-lg font-black text-black'>Heading</h1>
                </div>
                <p className='font-normal text-xs text-pearlgray'>
                  These General Conditions of Carriage (the “Conditions”) are
                  applicable to all flights, or portions of flights, for which
                  Beond appears in the carrier box of the ticket or of the
                  corresponding Flight Coupon as well as those other situations
                  specified herein below.<br></br> <br></br>Please note that
                  depending on your residency and/or destination, additional
                  and/or different rules may apply. It is therefore essential
                  that the Passengers consult the “Special Conditions” section
                  available on the Website to ensure that they are familiar
                  both, with these Conditions and with the Special Conditions
                  applicable to them. Special Conditions form an integral part
                  of these Conditions.
                </p>
              </div>
              <div className='mb-4'>
                <div className='my-2'>
                  <h1 className='text-lg font-black text-black'>Heading</h1>
                </div>
                <p className='font-normal text-xs text-pearlgray'>
                  These General Conditions of Carriage (the “Conditions”) are
                  applicable to all flights, or portions of flights, for which
                  Beond appears in the carrier box of the ticket or of the
                  corresponding Flight Coupon as well as those other situations
                  specified herein below.<br></br> <br></br>Please note that
                  depending on your residency and/or destination, additional
                  and/or different rules may apply. It is therefore essential
                  that the Passengers consult the “Special Conditions” section
                  available on the Website to ensure that they are familiar
                  both, with these Conditions and with the Special Conditions
                  applicable to them. Special Conditions form an integral part
                  of these Conditions.
                </p>
              </div>
              <div className='mb-4'>
                <div className='my-2'>
                  <h1 className='text-lg font-black text-black'>Heading</h1>
                </div>
                <p className='font-normal text-xs text-pearlgray'>
                  These General Conditions of Carriage (the “Conditions”) are
                  applicable to all flights, or portions of flights, for which
                  Beond appears in the carrier box of the ticket or of the
                  corresponding Flight Coupon as well as those other situations
                  specified herein below.<br></br> <br></br>Please note that
                  depending on your residency and/or destination, additional
                  and/or different rules may apply. It is therefore essential
                  that the Passengers consult the “Special Conditions” section
                  available on the Website to ensure that they are familiar
                  both, with these Conditions and with the Special Conditions
                  applicable to them. Special Conditions form an integral part
                  of these Conditions.
                </p>
              </div>
            </div>
            <div>
              <div className='lg:flex md:flex block h-full items-center justify-center relative gap-3  py-3 m-auto '>
                <button
                  type='button'
                  className='w-full xs:justify-center  xs:text-center text-white bg-aqua focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-black rounded-lg text-lg inline-flex items-center px-5 py-2 text-center '
                >
                  Agree & Check-in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsConditions;
