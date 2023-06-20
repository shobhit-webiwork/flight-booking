import Image from 'next/image';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import cake from '../../assets/images/cake.png';
import trash from '../../assets/images/trash.png';
import couple from '../../assets/images/couple.png';
import banner from '../../assets/images/desktopbanner.png';

const YourCart = () => {
  const ModifyBooking = () => {
    return (
      <div className='mt-6'>
        <div className='bg-white p-3 rounded-lg'>
          <div className='bg-white  xl:w-full mt-3 rounded-lg border border-cadetgray'>
            <div className='flex p-3 justify-between items-center'>
              <div>
                <h1 className='text-base font-black text-black'>Champagne</h1>
                <div className='my-1'>
                  <p className='text-xs font-normal text-pearlgray'>
                    Enjoy unlimited champagne throughout the entire duration of
                    the flight
                  </p>
                </div>
                <p className='font-black text-sm text-aqua'>$150 Per Person</p>
              </div>
              <div>
                <div className=' xs:flex xs:justify-end'>
                  <div className='custom-number-input h-7 w-20'>
                    <div className='flex flex-row h-7 w-full rounded-lg relative bg-transparent mt-1'>
                      <button
                        className={`bg-lightblue text-gray-600 rounded-sm  h-full w-16 rounded-l  `}
                      >
                        <span className='m-auto text-xl font-thin text-aqua '>
                          <Image
                            className='text-red text-sm font-black h-5 w-5 pl-1'
                            src={trash}
                            alt=''
                          />
                        </span>
                      </button>
                      <input
                        type='text'
                        className='text-center w-full font-semibold text-md flex items-center text-black'
                        name='custom-input-number'
                        placeholder='2'
                      ></input>
                      <button
                        className={`bg-lightblue text-gray-600 rounded-sm hover:bg-gray-400 h-full w-16 rounded-r `}
                      >
                        <span className='m-auto text-xl font-thin text-aqua '>
                          +
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-white  xl:w-full mt-3 rounded-lg border border-cadetgray'>
            <div className='flex p-3 justify-between items-center'>
              <div>
                <h1 className='text-base font-black text-black'>
                  Celebration Cake
                </h1>
                <div className='my-1'>
                  <p className='text-xs font-normal text-pearlgray'>
                    Unlimited cake to celebrate your special occasion
                  </p>
                </div>
                <p className='font-black text-sm text-aqua'>$100 Per Person</p>
              </div>
              <div>
                <div className=' xs:flex xs:justify-end'>
                  <div className='custom-number-input h-7 w-20'>
                    <div className='flex flex-row h-7 w-full rounded-lg relative bg-transparent mt-1'>
                      <button
                        className={`bg-lightblue text-gray-600 rounded-sm  h-full w-16 rounded-l  `}
                      >
                        <span className='m-auto text-xl font-thin text-aqua '>
                          <Image
                            className='text-red text-sm font-black h-5 w-5 pl-1'
                            src={trash}
                            alt=''
                          />
                        </span>
                      </button>
                      <input
                        type='text'
                        className='text-center w-full font-semibold text-md flex items-center text-black'
                        name='custom-input-number'
                        placeholder='2'
                      ></input>
                      <button
                        className={`bg-lightblue text-gray-600 rounded-sm hover:bg-gray-400 h-full w-16 rounded-r `}
                      >
                        <span className='m-auto text-xl font-thin text-aqua '>
                          +
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-5'>
            <div className='flex justify-between my-1'>
              <p className='text-slategray text-base font-medium'>
                Celebration Cake x1
              </p>
              <p className='font-black text-base black '>$100</p>
            </div>
            <div className='flex justify-between my-1'>
              <p className='text-slategray text-base font-medium'>
                Champagne x1
              </p>
              <p className='font-black text-base black '>$150</p>
            </div>

            <div className='flex justify-between my-1'>
              <p className='text-slategray text-base font-medium'>
                Total Price
              </p>
              <p className='font-black text-base black'>$150</p>
            </div>
          </div>
          <div className='py-3 lg:flex md:flex block h-full items-center justify-center relative gap-3 w-full  m-auto'>
            <button
              data-modal-hide='popup-modal-calendar'
              type='button'
              className='w-full xs:justify-center  xs:text-center text-white bg-aqua focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-black rounded-lg text-lg inline-flex items-center px-5 py-2 text-center '
            >
              Confirm & Pay
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='relative'>
      <div className='xl:not-sr-only	xs:sr-only'>
        <div className='w-full h-52 xl:h-screen  xl:w-1/4 overflow-hidden xs:relative xl:fixed right-0'>
          <Image
            src={banner}
            className='xs:absolute  inset-0 h-full w-full object-cover'
            alt=''
          />
        </div>
        <div className='xl:not-sr-only	xs:sr-only'>
          <div className='fixed top-16 right-3.5  xl:m-auto price-modal'>
            <ModifyBooking />
          </div>
        </div>
      </div>
      <div className='px-3 xl:bg-cadetgray width-auto  xl:w-3/4 xs:w-full xl:py-10 mt-3 '>
        <div className='xl:w-2/4 xl:m-auto xs:w-full xl:py-5 xs:py-0'>
          <div>
            <div className='flex justify-between items-center'>
              <div className='mt-2'>
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  aria-hidden='true'
                  className='text-black text-sm font-black h-4 w-4'
                />
                <span className='px-2 text-black text-sm font-black'>Back</span>
              </div>
            </div>
            <div className='pt-2'>
              <h1 className='text-2xl font-black text-black'>
                You might also like
              </h1>
            </div>
          </div>
          <div className=' xs:block gap-2 py-3'>
            <div>
              <div className='bg-white  xl:w-full mt-3 rounded-lg'>
                <div className='flex p-3 justify-between items-center '>
                  <div>
                    <h1 className='text-base font-black text-black'>
                      Celebration Cake
                    </h1>
                    <div className='my-1'>
                      <p className='text-xs font-normal text-pearlgray'>
                        Unlimited cake to celebrate your special occasion
                      </p>
                    </div>
                    <p className='font-black text-sm text-aqua'>
                      $100 Per Person
                    </p>
                  </div>
                  <div>
                    <Image
                      className='h-32 w-32 object-contain rounded-md'
                      src={cake}
                      alt=''
                    />
                  </div>
                </div>
              </div>
              <div className='bg-white  xl:w-full mt-3 rounded-lg'>
                <div className='flex p-3 justify-between items-center'>
                  <div>
                    <h1 className='text-base font-black text-black'>
                      Honeymoon Package
                    </h1>
                    <div className='my-1'>
                      <p className='text-xs font-normal text-pearlgray'>
                        Enjoy unlimited champagne and caviar onboard the flight
                      </p>
                    </div>
                    <p className='font-black text-sm text-aqua'>
                      $250 Per Person
                    </p>
                  </div>
                  <div>
                    <Image
                      className='h-36 w-36 object-contain '
                      src={couple}
                      alt=''
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='xs:not-sr-only	xl:sr-only'>
            <ModifyBooking />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourCart;
