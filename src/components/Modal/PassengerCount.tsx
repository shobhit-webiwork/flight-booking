import Image from 'next/image';
import { AnyAction } from 'redux';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  postSearchFlights,
  postSearchExchangeFlights,
} from '@/src/redux/action/SearchFlights';
import { RootState } from '@/src/redux/store';
import group from '../../assets/images/group.png';
import { loader } from '@/src/redux/reducer/Loader';
import { setReviewFlightData } from '@/src/redux/reducer/FlightDetails';
import { setPassengerDetails } from '@/src/redux/reducer/PassengerDetails';

const PassengerCount = (props: modalType) => {
  const {
    id,
    name,
    adult,
    navigate,
    childrens,
    showModal,
    closeModal,
    modifyBooking,
    flightDetails,
    setFlightDetails,
  } = props;

  const router = useRouter();
  const dispatch = useDispatch();

  const findBookingInfo = useSelector(
    (state: RootState) => state?.flightDetails?.findBooking
  );
  const selectedDetailsForFlight = useSelector(
    (state: RootState) => state?.flightDetails?.reviewFlight
  );
  const modifyBookingInfo = useSelector(
    (state: RootState) => state?.flightDetails?.modifyBooking
  );
  const passengerData = useSelector(
    (state: RootState) => state?.flightDetails?.selectedFlightCodesWithDate
  );

  const handleIncrement = (type: string) => {
    if (type === 'adult') {
      setFlightDetails({
        ...flightDetails,
        adult:
          ((
            flightDetails as {
              adult: number;
              children: number;
            }
          )?.adult as number) + 1,
      });
    } else if (type === 'children') {
      setFlightDetails({
        ...flightDetails,
        children:
          ((
            flightDetails as {
              adult: number;
              children: number;
            }
          )?.children as number) + 1,
      });
    }
  };

  const handleDecrement = (type: string) => {
    if (type === 'adult') {
      setFlightDetails({
        ...flightDetails,
        adult:
          ((
            flightDetails as {
              adult: number;
              children: number;
            }
          )?.adult as number) - 1,
      });
    } else if (type === 'children') {
      setFlightDetails({
        ...flightDetails,
        children:
          ((
            flightDetails as {
              adult: number;
              children: number;
            }
          )?.children as number) - 1,
      });
    }
  };

  const searchFlight = () => {
    if (modifyBooking) {
      const dataToPost = {
        PnrCode: modifyBookingInfo?.PnrInformation?.PnrCode,
        RefETTicketFare: modifyBookingInfo?.RefETTicketFare,
        PassangerLastname: findBookingInfo?.PassengerName,
        Passengers:
          flightDetails && (childrens as number) > 0
            ? [
                {
                  Ref: 'P1',
                  RefClient: '',
                  PassengerQuantity: adult as number,
                  PassengerTypeCode: 'AD',
                },
                {
                  Ref: 'P2',
                  RefClient: '',
                  PassengerQuantity: childrens as number,
                  PassengerTypeCode: 'CHD',
                },
              ]
            : [
                {
                  Ref: 'P1',
                  RefClient: '',
                  PassengerQuantity: adult as number,
                  PassengerTypeCode: 'AD',
                },
              ],
        OriginDestinations: modifyBookingInfo?.OriginDestination?.map(
          (item: {
            TargetDate: Date;
            OriginCode: string;
            DepartureDate: string;
            DestinationCode: string;
          }) => {
            return {
              OriginCode: item?.OriginCode,
              Extensions: null,
              DestinationCode: item?.DestinationCode,
              TargetDate: item?.DepartureDate,
            };
          }
        ),
      };
      dispatch(
        loader({
          show: true,
          name: 'search',
        })
      );
      dispatch(
        postSearchExchangeFlights(
          dataToPost,
          router,
          true
        ) as unknown as AnyAction
      );
    } else {
      const searchFlightData = {
        DateFlexible: selectedDetailsForFlight?.DateFlexible,
        Passengers:
          flightDetails && (childrens as number) > 0
            ? [
                {
                  Ref: 'P1',
                  RefClient: '',
                  PassengerQuantity: adult as number,
                  PassengerTypeCode: 'AD',
                },
                {
                  Ref: 'P2',
                  RefClient: '',
                  PassengerQuantity: childrens as number,
                  PassengerTypeCode: 'CHD',
                },
              ]
            : [
                {
                  Ref: 'P1',
                  RefClient: '',
                  PassengerQuantity: adult as number,
                  PassengerTypeCode: 'AD',
                },
              ],
        OriginDestinations: selectedDetailsForFlight?.OriginDestinations,
      };
      dispatch(
        loader({
          show: true,
          name: 'search',
        })
      );
      dispatch(setPassengerDetails([]));
      dispatch(setReviewFlightData(searchFlightData));
      dispatch(
        postSearchFlights(
          searchFlightData,
          navigate as boolean,
          router
        ) as unknown as AnyAction
      );
    }
  };

  return (
    <div>
      {showModal && (
        <div
          id={id}
          style={{
            // display: 'revert',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
          className='linear h-screen fixed top-0 left-0 right-0 z-50 hidden xl:p-4 sm:p-0 overflow-x-hidden overflow-y-auto md:inset-0 xl:h-[calc(100% 1rem)] max-h-full xl:flex justify-center items-center'
        >
          <div className='relative w-full max-w-md max-h-full bg-white m-auto rounded-3xl'>
            <div className='relative bg-white rounded-lg shadow dark:bg-gray-700 calendar-modal'>
              <div className='p-5 text-center'>
                <FontAwesomeIcon
                  icon={faXmark}
                  aria-hidden='true'
                  className='arrow-modal cursor-pointer text-black'
                  onClick={() => {
                    closeModal();
                    if (name === 'flightAvailability') {
                      setFlightDetails({
                        ...flightDetails,
                        adult: modifyBooking
                          ? modifyBookingInfo?.Passengers?.Adult
                            ? modifyBookingInfo?.Passengers?.Adult
                            : 1
                          : passengerData?.adult
                          ? passengerData?.adult
                          : 1,
                        children: modifyBooking
                          ? modifyBookingInfo?.Passengers?.Children
                            ? modifyBookingInfo?.Passengers?.Children
                            : 0
                          : passengerData?.children
                          ? passengerData?.children
                          : 0,
                      });
                    }
                  }}
                />
                <div>
                  <h3 className='mb-0 text-xl text-black font-black'>
                    Select Passengers
                  </h3>
                  <p className='text-sm text-pearlgray opacity-50 xs:mb-3'>
                    Please note that we don’t allow children under 5
                  </p>
                  <div className='text-left py-3'>
                    <div className='flex'>
                      <div className='flex justify-between w-full'>
                        <div className='flex gap-3 w-6/12'>
                          <div className='flex justify-center flex-col'>
                            <p className='text-lg text-black font-black'>
                              Adults
                            </p>
                            <p className='text-sm font-normal text-black'>
                              {' '}
                              Aged 12 and over
                            </p>
                          </div>
                        </div>
                        <div className='w-5/12 xs:flex xs:justify-end'>
                          <div className='custom-number-input h-10 w-32'>
                            <div className='flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1'>
                              <button
                                onClick={() => handleDecrement('adult')}
                                disabled={
                                  flightDetails && (adult as number) < 2
                                }
                                data-action='decrement'
                                className={`bg-lightblue text-gray-600 rounded-sm  hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l ${
                                  flightDetails && (adult as number) < 2
                                    ? 'cursor-not-allowed'
                                    : 'cursor-pointer'
                                } outline-none`}
                              >
                                <span className='m-auto text-2xl font-thin text-aqua '>
                                  −
                                </span>
                              </button>
                              <input
                                type='text'
                                className='  text-center w-full  font-semibold text-md   md:text-basecursor-default flex items-center text-black  outline-none'
                                name='custom-input-number'
                                disabled
                                value={flightDetails ? adult : 0}
                              ></input>
                              <button
                                onClick={() => handleIncrement('adult')}
                                data-action='increment'
                                disabled={
                                  flightDetails &&
                                  (childrens as number) + (adult as number) > 8
                                }
                                className={`bg-lightblue text-gray-600 rounded-sm  hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r ${
                                  flightDetails &&
                                  (childrens as number) + (adult as number) > 8
                                    ? 'cursor-not-allowed'
                                    : 'cursor-pointer'
                                }`}
                              >
                                <span className='m-auto text-2xl font-thin text-aqua '>
                                  +
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='text-left py-3'>
                    <div className='flex'>
                      <div className='flex justify-between w-full'>
                        <div className='flex gap-3 w-6/12'>
                          <div className='flex justify-center flex-col'>
                            <p className='text-lg font-black text-black '>
                              {' '}
                              Children
                            </p>
                            <p className='text-sm font-normal text-black'>
                              {' '}
                              Aged 5-11
                            </p>
                          </div>
                        </div>
                        <div className='w-5/12 xs:flex xs:justify-end'>
                          <div className='custom-number-input h-10 w-32'>
                            <div className='flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1'>
                              <button
                                onClick={() => handleDecrement('children')}
                                disabled={(childrens as number) === 0}
                                data-action='decrement'
                                className={`bg-lightblue  text-gray-600 rounded-sm  h-full w-20 rounded-l ${
                                  flightDetails && (childrens as number) < 1
                                    ? 'cursor-not-allowed'
                                    : 'cursor-pointer'
                                } outline-none`}
                              >
                                <span className='m-auto text-2xl font-thin text-aqua'>
                                  −
                                </span>
                              </button>
                              <input
                                type='text'
                                className=' text-center rounded-sm w-full  font-semibold text-md   md:text-basecursor-default flex items-center text-black outline-none'
                                name='custom-input-number'
                                disabled
                                value={childrens}
                              ></input>
                              <button
                                onClick={() => handleIncrement('children')}
                                data-action='increment'
                                disabled={
                                  flightDetails &&
                                  (childrens as number) + (adult as number) > 8
                                }
                                className={`bg-lightblue h-full w-20 rounded-r ${
                                  flightDetails &&
                                  (childrens as number) + (adult as number) > 8
                                    ? 'cursor-not-allowed'
                                    : 'cursor-pointer'
                                }`}
                              >
                                <span className='m-auto text-2xl font-thin text-aqua'>
                                  +
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='my-6'>
                    <div className='flex gap-3 '>
                      <div className='flex justify-center items-center'>
                        <Image
                          className='h-5 w-5 object-cover'
                          src={group}
                          alt=''
                        />
                      </div>
                      <div className='flex flex-col text-left'>
                        <p className='text-sm  text-black font-black'>
                          {' '}
                          Group Booking
                        </p>
                        <p className='text-xs font-black text-pearlgray'>
                          Are you a group of 10 or more? Contact us directly{' '}
                          <br></br> for the best deal
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-7 flex justify-center'>
                  <button
                    type='button'
                    className='xl:w-full md:w-48 xs:w-full  xs:justify-center xs:items-center  xs:flex text-white bg-aqua focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-black rounded-lg text-lg inline-flex items-center px-5 py-2 text-center'
                    onClick={() => {
                      closeModal();
                      if (name === 'flightAvailability') {
                        searchFlight();
                      }
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerCount;
