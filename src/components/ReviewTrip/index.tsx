import Image from 'next/image';
import { useState } from 'react';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CodesInCurve from './CodesInCurve';
import PriceBreakDown from './PriceBreakDown';
import { RootState } from '@/src/redux/store';
import FlightSchedule from './FlightSchedule';
import StepsInfo from '../SearchFlight/StepsInfo';
import SavingDataLoader from '../Loader/SavingData';
import SearchSeatLoader from '../Loader/SearchSeat';
import PassengerCount from '../Modal/PassengerCount';
import bookseat from '../../assets/images/bookseat.png';
import SearchFlightLoader from '../Loader/SearchFlight';
import banner from '../../assets/images/desktopbanner.png';
import PaymentGatewayLoader from '../Loader/PaymentGateway';
import ModifyPassengerSeatFareFamily from './ModifyPassengerSeatFareFamily';

const ReviewTrip = () => {
  const router = useRouter();

  const paymentForm = useSelector(
    (state: RootState) => state?.flightDetails?.paymentForm
  );
  const createBookingInfo = useSelector(
    (state: RootState) => state?.flightDetails?.createBooking
  );
  const flightInfo = useSelector(
    (state: RootState) => state?.flightDetails?.selectedFlight
  );
  const storedPassengerData = useSelector(
    (state: RootState) => state?.passenger?.passengersData?.details
  );

  const load = useSelector((state: RootState) => state?.loader?.loader);

  const [showModal, setShowModal] = useState({
    passenger: false,
  });
  const [passengerCount, setPassengerCount] = useState({
    adult: createBookingInfo?.Passengers?.Adult
      ? createBookingInfo?.Passengers?.Adult
      : 1,
    children: createBookingInfo?.Passengers?.Children
      ? createBookingInfo?.Passengers?.Children
      : 0,
  });

  const flightData = createBookingInfo?.OriginDestination?.find(
    (item: object) => item !== undefined
  );

  const seatsOriginToDestination = createBookingInfo?.PassengersDetails?.map(
    (item: { fields: { Code: string }[] }) =>
      item?.fields
        .filter((item: { Code: string }) => item?.Code === 'SEAT')
        ?.find((item, index) => item?.Code !== undefined && index === 0)
  );

  const seatsDestinationToOrigin = createBookingInfo?.PassengersDetails?.map(
    (item: { fields: { Code: string }[] }) =>
      item?.fields
        .filter((item: { Code: string }) => item?.Code === 'SEAT')
        ?.find((item, index) => item?.Code !== undefined && index === 1)
  );

  const allSeats = createBookingInfo?.PassengersDetails?.map(
    (item: { fields: { Code: string }[] }) =>
      item?.fields
        ?.filter((item: { Code: string }) => item?.Code === 'SEAT')
        ?.map((item) => item)
  );

  const TotalPricing = () => {
    return (
      <div className='mt-6'>
        <div className='bg-white p-3 rounded-lg'>
          <div className='flex justify-between my-1'>
            <p className='text-slategray text-base font-medium'>Flight Price</p>
            <p className='font-black text-base black'>
              {(flightInfo?.details?.currency
                ? flightInfo?.details?.currency
                : '') +
                ' ' +
                (createBookingInfo?.Amount?.TotalAmount
                  ? createBookingInfo?.Amount?.TotalAmount
                  : '')}
            </p>
          </div>
          <div className='flex justify-between my-1'>
            <p className='text-slategray text-base font-medium'>Add-ons</p>
            <p className='font-black text-base black'>0</p>
          </div>
          <div className='flex justify-between my-1'>
            <p className='text-slategray text-base font-medium'>Total Price</p>
            <p className='font-black text-base black'>
              {(flightInfo?.details?.currency
                ? flightInfo?.details?.currency
                : '') +
                ' ' +
                (createBookingInfo?.Amount?.TotalAmount
                  ? createBookingInfo?.Amount?.TotalAmount
                  : '')}
            </p>
          </div>
          <div className='py-3 lg:flex md:flex block h-full items-center justify-center relative gap-3 w-full   m-auto'>
            <button
              type='submit'
              form='hpp'
              disabled={createBookingInfo?.Amount?.TotalAmount === undefined}
              className={`w-full xs:justify-center  xs:text-center text-white bg-aqua focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-black rounded-lg text-lg inline-flex items-center px-5 py-2 text-center ${
                createBookingInfo?.Amount?.TotalAmount === undefined
                  ? 'opacity-40'
                  : ''
              }`}
            >
              Confirm & Pay
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main
      onClick={() => {
        const modalPassenger = document.getElementById('modal-passenger');
        window.onclick = function (event) {
          if (event.target === modalPassenger) {
            setShowModal({
              passenger: false,
            });
          }
        };
      }}
    >
      {!load?.show ? (
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
                <TotalPricing />
              </div>
            </div>
          </div>

          <div className='px-3 xl:bg-cadetgray width-auto  xl:w-3/4 xs:w-full xl:py-10 mt-3 '>
            <div className='xl:not-sr-only	xs:sr-only'>
              <StepsInfo selected={3} />
            </div>
            <div className='xl:w-2/4 xl:m-auto xs:w-full xl:py-5 xs:py-0'>
              <div>
                <div className='flex justify-between items-center'>
                  <div
                    className='px-0 py-3 cursor-pointer'
                    onClick={() => {
                      router.push('/chooseseats');
                    }}
                  >
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
                <div className='pt-2'>
                  <h1 className='text-2xl font-black text-black'>
                    Review your trip
                  </h1>
                </div>
                <div className='py-1'>
                  <p className='font-medium text-base text-pearlgray'>
                    Please review and confirm all your trip details
                  </p>
                </div>
              </div>
              <div>
                <div className=' xs:block gap-2 py-3'>
                  <div className='bg-white  xl:w-full mb-1 rounded-2xl'>
                    <CodesInCurve
                      originCity={flightData?.OriginCity}
                      originCode={flightData?.OriginCode}
                      destinationCity={flightData?.DestinationCity}
                      destinationCode={flightData?.DestinationCode}
                      oneway={createBookingInfo?.OriginDestination?.length < 1}
                    />
                    <div className='p-4'>
                      {createBookingInfo?.OriginDestination?.map(
                        (item: bookingDetails, index: number) => {
                          return (
                            <div key={index}>
                              <FlightSchedule
                                index={index}
                                seats={true}
                                loungeAccess={true}
                                luxuryPickup={true}
                                seatsDestinationToOrigin={
                                  seatsDestinationToOrigin
                                }
                                seatsOriginToDestination={
                                  seatsOriginToDestination
                                }
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
                      <PassengerCount
                        navigate={true}
                        id='modal-passenger'
                        name='flightAvailability'
                        closeModal={() => {
                          setShowModal({
                            passenger: false,
                          });
                        }}
                        adult={passengerCount?.adult}
                        flightDetails={passengerCount}
                        showModal={showModal?.passenger}
                        childrens={passengerCount?.children}
                        setFlightDetails={setPassengerCount}
                      />
                      <ModifyPassengerSeatFareFamily
                        passengerModify={() => {
                          setShowModal({
                            passenger: true,
                          });
                        }}
                        adult={passengerCount?.adult}
                        fareFamilyName={flightInfo?.name}
                        childrens={passengerCount?.children}
                        seatsModify={() => console.log('modify')}
                        seatsLabel={
                          allSeats && allSeats?.length > 0 ? allSeats[0] : []
                        }
                      />
                    </div>
                    <PriceBreakDown
                      currency={flightInfo?.details?.currency}
                      passengerCount={storedPassengerData?.length}
                      taxAmount={createBookingInfo?.Amount?.TaxAmount}
                      baseAmount={createBookingInfo?.Amount?.BaseAmount}
                      totalAmount={createBookingInfo?.Amount?.TotalAmount}
                    />
                  </div>
                </div>
                <div className='xl:mb-0 xs:mb-48'>
                  <div className='bg-white  xl:w-full mt-3 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl'>
                    <Image
                      className='h-full w-full object-containt  rounded-tl-2xl rounded-tr-2xl'
                      src={bookseat}
                      alt=''
                    />
                    <div className='p-4'>
                      <h1 className='text-lg font-black text-black'>
                        rounded-tl-2xl rounded-tr-2xl
                      </h1>
                      <p className='text-sm text-medium text-slategray'>
                        We’re committed to giving you the best flying experience
                        with us.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='xs:not-sr-only	xl:sr-only'>
            <div className='fixed w-full left-0 bottom-0 z-50'>
              <TotalPricing />
              <div className='hidden'>
                {paymentForm !== undefined && paymentForm?.length > 0
                  ? parse(paymentForm)
                  : ''}
              </div>
            </div>
          </div>
        </div>
      ) : load?.name === 'search' ? (
        <SearchFlightLoader open={load?.show} />
      ) : load?.name === 'createBooking' ? (
        <SearchSeatLoader open={load?.show} />
      ) : load?.name === 'payment' ? (
        <PaymentGatewayLoader open={load?.show} />
      ) : (
        load?.name === 'save' && <SavingDataLoader open={load?.show} />
      )}
    </main>
  );
};

export default ReviewTrip;
