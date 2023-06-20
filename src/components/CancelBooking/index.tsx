import Image from 'next/image';
import { useState } from 'react';
import { AnyAction } from 'redux';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RootState } from '@/src/redux/store';
import { loader } from '@/src/redux/reducer/Loader';
import FlightSchedule from '../ReviewTrip/FlightSchedule';
import CancelBookingLoader from '../Loader/CancelBooking';
import banner from '../../assets/images/desktopbanner.png';
import CancelBookingModal from '../Modal/CancelBookingModal';
import { postCancelFlight } from '@/src/redux/action/SearchFlights';

const CancelBooking = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const findBookingInfo = useSelector(
    (state: RootState) => state?.flightDetails?.findBooking
  );
  const flightInfo = useSelector(
    (state: RootState) => state?.flightDetails?.selectedFlight
  );
  const cancelBookingInfo = useSelector(
    (state: RootState) => state?.flightDetails?.prepareCancelFlight
  );
  const load = useSelector((state: RootState) => state?.loader?.loader);

  const [showModal, setShowModal] = useState(false);

  return (
    <main
      onClick={() => {
        const modalCancelBooking = document.getElementById(
          'modal-cancel-booking'
        );
        window.onclick = function (event) {
          if (event.target === modalCancelBooking) {
            setShowModal(false);
          }
        };
      }}
    >
      {!load?.show ? (
        <div>
          <div>
            <CancelBookingModal
              id='modal-cancel-booking'
              showModal={showModal}
              setShowModal={setShowModal}
              cancelBooking={() => {
                dispatch(
                  loader({
                    show: true,
                    name: 'cancel',
                  })
                );
                dispatch(
                  postCancelFlight(
                    {
                      PnrCode: findBookingInfo?.ID,
                      PassengerName: findBookingInfo?.PassengerName,
                    },
                    router
                  ) as unknown as AnyAction
                );
              }}
            />
          </div>
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
                <div className='fixed top-16 right-3.5  xl:m-auto price-modal '>
                  <div className='mt-6'>
                    <div className='bg-white p-3 rounded-lg'>
                      <div className='flex justify-between my-1'>
                        <p className='text-slategray text-base font-medium'>
                          Number of Passengers
                        </p>
                        <p className='font-black text-base text-black'>
                          {cancelBookingInfo?.Passengers?.Adult +
                            (cancelBookingInfo?.Passengers?.Children
                              ? cancelBookingInfo?.Passengers?.Children
                              : 0)}
                        </p>
                      </div>
                      <div className='flex justify-between my-1'>
                        <p className='text-slategray text-base font-medium'>
                          Taxes
                        </p>
                        <p className='font-black text-base text-black'>
                          {cancelBookingInfo?.Amount?.TaxAmount}
                        </p>
                      </div>
                      <div className='flex justify-between my-1'>
                        <p className='text-slategray text-base font-medium'>
                          Total Refund Price
                        </p>
                        <p className='font-black text-base text-black'>
                          {cancelBookingInfo?.Amount?.TotalAmount}
                        </p>
                      </div>
                      <CancelBookingModal
                        id='modal-cancel-booking'
                        showModal={showModal}
                        setShowModal={setShowModal}
                        cancelBooking={() => {
                          dispatch(
                            loader({
                              show: true,
                              name: 'cancel',
                            })
                          );
                          dispatch(
                            postCancelFlight(
                              {
                                PnrCode: findBookingInfo?.ID,
                                PassengerName: findBookingInfo?.PassengerName,
                              },
                              router
                            ) as unknown as AnyAction
                          );
                        }}
                      />
                      <div className='flex flex-wrap -mb-px text-sm font-medium text-center  text-black '>
                        <div className='flex md:flex block h-full items-center justify-center relative gap-3 py-3 xs:w-full  '>
                          <button
                            type='button'
                            className='xs:justify-center  xs:text-center text-aqua border border-aqua bg-white  font-black rounded-lg text-lg inline-flex items-center py-2 text-center button-style xl:w-1/12 '
                            onClick={() => {
                              router.back();
                            }}
                          >
                            Go Back
                          </button>
                          <button
                            type='button'
                            className='xs:justify-center  xs:text-center text-white bg-red  font-black rounded-lg text-lg inline-flex items-center py-2 text-center button-style xl:w-1/12'
                            onClick={() => setShowModal(true)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative px-3 xl:bg-cadetgray width-auto  xl:w-3/4 xs:w-full xl:py-10 mt-3 '>
              <div className='xl:w-2/4 xl:m-auto xs:w-full xl:py-5 xs:py-0 '>
                <div
                  className='flex justify-between items-center cursor-pointer'
                  onClick={() => {
                    router.back();
                  }}
                >
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
                <div className='pt-3'>
                  <h1 className='text-2xl font-black text-black'>
                    Cancel your booking
                  </h1>
                  <div className='py-1'>
                    <p className='font-medium text-base text-pearlgray'>
                      We’ll refund you the amount to the same payment method you
                      used to book the flight.
                    </p>
                  </div>
                </div>
                <div>
                  <div className=' xs:block gap-2 py-3'>
                    <div className='bg-white  xl:w-full mb-1 rounded-2xl'>
                      <div className='p-4'>
                        {cancelBookingInfo?.OriginDestination?.map(
                          (item: bookingDetails, index: number) => {
                            return (
                              <div key={index}>
                                <FlightSchedule
                                  index={index}
                                  seats={true}
                                  loungeAccess={true}
                                  luxuryPickup={true}
                                  originCode={item?.OriginCode}
                                  arrivalDate={item?.ArrivalDate}
                                  bagAllowances={item.BagAllowances}
                                  departureDate={item?.DepartureDate}
                                  destinationCode={item?.DestinationCode}
                                  departureTime={item?.OrginDepartureTime}
                                  arrivalTime={item?.DestinationArrivalTime}
                                  originAirportName={
                                    flightInfo?.details?.FaireFamilies[index]
                                      ?.originName
                                  }
                                  destinationAirportName={
                                    flightInfo?.details?.FaireFamilies[index]
                                      ?.destinationName
                                  }
                                />
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='xs:not-sr-only	xl:sr-only'>
                <div className='mt-6'>
                  <div className='bg-white p-3 rounded-lg'>
                    <div className='flex justify-between my-1'>
                      <p className='text-slategray text-base font-medium'>
                        Number of Passengers
                      </p>
                      <p className='font-black text-base text-black'>
                        {cancelBookingInfo?.Passengers?.Adult +
                          (cancelBookingInfo?.Passengers?.Children
                            ? cancelBookingInfo?.Passengers?.Children
                            : 0)}
                      </p>
                    </div>
                    <div className='flex justify-between my-1'>
                      <p className='text-slategray text-base font-medium'>
                        Taxes
                      </p>
                      <p className='font-black text-base text-black'>
                        {cancelBookingInfo?.Amount?.TaxAmount}
                      </p>
                    </div>
                    <div className='flex justify-between my-1'>
                      <p className='text-slategray text-base font-medium'>
                        Total Refund Price
                      </p>
                      <p className='font-black text-base text-black'>
                        {cancelBookingInfo?.Amount?.TotalAmount}
                      </p>
                    </div>

                    <div className='flex flex-wrap -mb-px text-sm font-medium text-center  text-black '>
                      <div className='flex md:flex block h-full items-center justify-center relative gap-3 py-3 xs:w-full  '>
                        <button
                          type='button'
                          className='xs:justify-center  xs:text-center text-aqua border border-aqua bg-white  font-black rounded-lg text-lg inline-flex items-center py-2 text-center button-style xl:w-1/12 '
                          onClick={() => {
                            router.back();
                          }}
                        >
                          Go Back
                        </button>
                        <button
                          type='button'
                          className='xs:justify-center  xs:text-center text-white bg-red  font-black rounded-lg text-lg inline-flex items-center py-2 text-center button-style xl:w-1/12'
                          onClick={() => setShowModal(true)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
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

export default CancelBooking;
