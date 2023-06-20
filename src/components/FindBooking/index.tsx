import * as Yup from 'yup';
import Image from 'next/image';
import { AnyAction } from 'redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik, ErrorMessage, Field } from 'formik';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RootState } from '@/src/redux/store';
import { loader } from '@/src/redux/reducer/Loader';
import banner from '../../assets/images/bookingbanner.png';
import FindYourBookingLoader from '../Loader/FindYourBooking';
import bottombanner from '../../assets/images/bottombanner.png';
import { postModifyBooking } from '@/src/redux/action/SearchFlights';
import { setChooseSeatData } from '@/src/redux/reducer/FlightDetails';

const FindBooking = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const load = useSelector((state: RootState) => state?.loader?.loader);

  useEffect(() => {
    dispatch(setChooseSeatData([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!load?.show ? (
        <div>
          <div>
            <div className='xl:flex '>
              <div>
                <div className=' xl:bg-cadetgray xs:bg-white xl:rounded-none rounded-lg xs:shadow-2xl xl:shadow-none xl:left-0 inherit xs:absolute xs:left-3  xl:top-4 xl:w-3/4 xl:py-10  xs:w-full '>
                  <div>
                    <div className='xl:relative xl:w-2/4 xl:m-auto  xl:top-18  xs:absolute xs:top-7 items-center justify-center  gap-3 h-0  z-50 '>
                      <div
                        className='xl:px-0 xs:px-2 cursor-pointer'
                        onClick={() => router.push('/')}
                      >
                        <FontAwesomeIcon
                          icon={faAngleLeft}
                          aria-hidden='true'
                          className='xl:text-black xs:text-white text-sm font-black h-4 w-4'
                        />
                        <span className='px-2 xl:text-black xs:text-white   text-sm font-black'>
                          Back
                        </span>
                      </div>
                      <div className='xs:px-3 xl:px-0 my-2 h-full items-center justify-center relative gap-3'>
                        <h1 className='text-4xl font-black xs:text-white   xl:text-black family-style "'>
                          Find your booking
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full h-52 xl:h-screen  xl:w-1/4 overflow-hidden xs:relative xl:fixed right-0'>
                <Image
                  src={banner}
                  className='xs:absolute  inset-0 h-full w-full object-cover'
                  alt=''
                />
              </div>
            </div>
            <div className='banner-fix xl:w-full '>
              <Formik
                initialValues={{
                  PnrCode: '',
                  PassengerName: '',
                }}
                validationSchema={Yup.object().shape({
                  PassengerName: Yup.string().required(
                    'This field is required'
                  ),
                  PnrCode: Yup.string().required('This field is required'),
                })}
                onSubmit={(values) => {
                  dispatch(
                    loader({
                      show: true,
                      name: 'findbooking',
                    })
                  );
                  dispatch(
                    postModifyBooking(
                      { ...values, ID: values?.PnrCode },
                      router
                    ) as unknown as AnyAction
                  );
                }}
              >
                {({ handleSubmit, values }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className='xl:bg-cadetgray xs:bg-white xl:rounded-none rounded-lg xs:shadow-2xl xl:shadow-none inherit xs:absolute  xl:top-4  xs:top-52 width-auto xl:w-3/4 xl:py-10 '>
                      <div className='px-2 my-2 '>
                        <div className='xl:w-2/4 xl:m-auto'>
                          <div className='py-4 xl:mt-32 text-sm font-medium   text-black bg-white p-3 rounded-lg '>
                            <div className='mb-2'>
                              <label className='block mb-2 text-sm font-medium text-black'>
                                Last Name
                              </label>
                              <Field
                                type='text'
                                name='PassengerName'
                                value={values?.PassengerName}
                                className='bg-white border border-graylight text-black text-sm rounded-md focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                placeholder='Last Name'
                                autoComplete='off'
                              />
                              <ErrorMessage
                                component='p'
                                name='PassengerName'
                                className='text-xs text-red'
                              />
                            </div>
                            <div>
                              <label className='block mb-2 text-sm font-medium text-black'>
                                Booking Reference Number
                              </label>
                              <Field
                                type='text'
                                name='PnrCode'
                                value={values?.PnrCode}
                                className='bg-white border border-graylight text-black text-sm rounded-md focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                placeholder='Booking Reference Number'
                                autoComplete='off'
                              />
                              <ErrorMessage
                                component='p'
                                name='PnrCode'
                                className='text-xs text-red'
                              />
                            </div>
                            <div className='py-3 lg:flex md:flex block h-full items-center justify-center relative gap-3 w-full   m-auto'>
                              <button
                                type='submit'
                                className={`w-full xs:justify-center text-white bg-aqua font-black rounded-lg text-lg  items-center px-5 py-2 text-center ${
                                  values?.PassengerName?.length > 0 &&
                                  values?.PnrCode?.length > 0
                                    ? ''
                                    : 'opacity-30 cursor-not-allowed'
                                }`}
                              >
                                Find Booking
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className='xs:not-sr-only	xl:sr-only'>
            <div className='w-full h-36 overflow-hidden absolute bottom-0'>
              <Image
                src={bottombanner}
                className='absolute inset-0 h-full w-full object-cover'
                alt=''
              />
              <div className='absolute inset-0 bg-gray-900 bg-opacity-75'></div>
            </div>
          </div>
        </div>
      ) : (
        load.name === 'findbooking' && (
          <FindYourBookingLoader open={load?.show} />
        )
      )}
    </>
  );
};

export default FindBooking;
