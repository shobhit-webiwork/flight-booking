import Image from 'next/image';
import { useState } from 'react';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import alertred from '../../assets/images/alertred.png';
import alertblue from '../../assets/images/alertblue.png';
import banner from '../../assets/images/desktopbanner.png';
import EmergencyContactUser from './Tabs/EmergenCycontactUser';

const EmergencyContactDetails = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <main>
      <div className='relative'>
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
        <div>
          <div className='bg-cadetgray  xl:rounded-none rounded-lg xs:shadow-2xl xl:shadow-none inherit xs:absolute  xl:top-4  xs:top-0 xs:w-full xs:px-3  xl:w-3/4 xl:py-10 index-style '>
            <div className='xl:not-sr-only	xs:sr-only'>
              <div className=''>
                <div className='flex justify-center  xl:pt-5 xs:py-0 w-full'>
                  <div>
                    <div className='flex justify-between gap-8'>
                      <div className='flex gap-2 '>
                        <p className='bg-Silvergray rounded-full h-5 w-5 text-white flex items-center justify-center text-xs'>
                          1
                        </p>
                        <p className='text-sm'>Fill in passenger details</p>
                      </div>
                      <div className='flex gap-2'>
                        <p className='bg-Silvergray rounded-full h-5 w-5 text-white flex items-center justify-center text-xs'>
                          2
                        </p>
                        <p className='text-sm text-slategray'>
                          Choose your seats
                        </p>
                      </div>
                      <div className='flex gap-2'>
                        <p className='bg-orange rounded-full h-5 w-5 text-white flex items-center justify-center text-xs'>
                          3
                        </p>
                        <p className='text-sm text-slategray'>
                          Emergency Contact
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='xl:w-2/4 xl:m-auto'>
              <div className='my-2 xs:my-3   '>
                <div className='flex justify-between items-center'>
                  <div className=' xl:pb-3 xs:py-1'>
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
                  <div>
                    <h1 className='text-2xl font-black  text-black'>
                      Emergency Contact Details{' '}
                    </h1>
                  </div>
                  <div className='py-1'>
                    <p className='font-medium text-sm text-pearlgray'>
                      Please provide emergency contact details. This can’t be
                      any of the passengers travelling with you.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className='rounded-lg bg-gray-50 dark:bg-gray-800'>
                  <div>
                    <div className='my-4'>
                      <ul className='flex flex-wrap -mb-px text-sm font-medium text-center gap-2 '>
                        <li role='presentation' onClick={() => setTabIndex(0)}>
                          <button
                            className={`xl:w-full xs:w-full inline-block p-4  ${
                              tabIndex === 0
                                ? ' inline-block py-2 px-5 bg-lightsky rounded-2xl border-aqua border text-aqua font-black'
                                : 'borbgder-transparent p-4 inline-block py-2 px-5  rounded-2xl font-medium bg-white'
                            } `}
                            type='button'
                            onClick={() => setTabIndex(0)}
                          >
                            <div className='flex gap-2 items-center'>
                              {' '}
                              <Image
                                className='h-4 w-4 object-cover'
                                src={alertblue}
                                alt=''
                              />
                              John (You)
                            </div>
                          </button>
                        </li>
                        <li role='presentation' onClick={() => setTabIndex(1)}>
                          <button
                            className={`xl:w-full xs:w-full inline-block p-4  ${
                              tabIndex === 1
                                ? ' inline-block py-2 px-5 bg-lightsky rounded-2xl border-aqua border text-aqua font-black'
                                : 'borbgder-transparent p-4 inline-block py-2 px-5  rounded-2xl font-medium bg-white'
                            } `}
                            type='button'
                            onClick={() => setTabIndex(1)}
                          >
                            <div className='flex gap-2 items-center'>
                              <Image
                                className='h-4 w-4 object-cover'
                                src={alertred}
                                alt=''
                              />
                              Eve
                            </div>
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div>
                      {tabIndex === 0 && (
                        <div>
                          <EmergencyContactUser />
                        </div>
                      )}
                      {tabIndex === 1 && (
                        <div>
                          <EmergencyContactUser />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EmergencyContactDetails;
