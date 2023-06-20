import moment from 'moment';
import Image from 'next/image';
import { useState } from 'react';
import { AnyAction } from 'redux';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RootState } from '@/src/redux/store';
import { getDate } from '../ReviewTrip/GetDate';
import { loader } from '@/src/redux/reducer/Loader';
import PassengerCount from '../Modal/PassengerCount';
import booking from '../../assets/images/booking.png';
import CodesInCurve from '../ReviewTrip/CodesInCurve';
import SearchFlightLoader from '../Loader/SearchFlight';
import FlightSchedule from '../ReviewTrip/FlightSchedule';
import PriceBreakDown from '../ReviewTrip/PriceBreakDown';
import CancelBookingLoader from '../Loader/CancelBooking';
import banner from '../../assets/images/desktopbanner.png';
import PaymentGatewayLoader from '../Loader/PaymentGateway';
import ModifyBookingModal from '../Modal/ModifyBookingModal';
import FeaturedAddOns from '../ModifyBooking/FeaturedAddOns';
import DepartReturnDateModal from '../Modal/DepartReturnDateModal';
import ModifyBookingDetailsModal from '../Modal/ModifyBookingDetailsModal';
import { postPrepareCancelFlight } from '@/src/redux/action/SearchFlights';
import ModifyPassengerSeatFareFamily from '../ReviewTrip/ModifyPassengerSeatFareFamily';

const BookingComplete = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const modifyData = useSelector(
    (state: RootState) => state?.flightDetails?.modifyData
  );
  const findBookingInfo = useSelector(
    (state: RootState) => state?.flightDetails?.findBooking
  );
  const bookingCompleteInfo = useSelector(
    (state: RootState) => state?.flightDetails?.modifyBooking
  );
  const flightInfo = useSelector(
    (state: RootState) => state?.flightDetails?.selectedFlight
  );
  const storedPassengerData = useSelector(
    (state: RootState) => state?.passenger?.passengersData?.details
  );
  const load = useSelector((state: RootState) => state?.loader?.loader);
  const selectedDetailsForFlight = useSelector(
    (state: RootState) => state?.flightDetails?.selectedFlightCodesWithDate
  );

  const flightData = bookingCompleteInfo?.OriginDestination?.find(
    (item: object) => item !== undefined
  );

  const { departDate, returnDate } = selectedDetailsForFlight;

  const [showModal, setShowModal] = useState({
    depart: false,
    return: false,
    passenger: false,
    modifyBookingDetails: false,
  });
  const [copyText, setCopyText] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    departure: '',
    returnDate: '',
  });
  const [flightDetails, setFlightDetails] = useState({
    departDate: new Date(moment(departDate).format('LL')),
    returnDate: new Date(moment(returnDate).format('LL')),
    dateFlexible: false,
  });
  const [passengerCount, setPassengerCount] = useState({
    adult: bookingCompleteInfo?.Passengers?.Adult
      ? bookingCompleteInfo?.Passengers?.Adult
      : 1,
    children: bookingCompleteInfo?.Passengers?.Children
      ? bookingCompleteInfo?.Passengers?.Children
      : 0,
  });
  const [passengerModify, setPassengerModify] = useState(false);

  const seatsOriginToDestination = bookingCompleteInfo?.PassengersDetails?.map(
    (item: { fields: { Code: string }[] }) =>
      item?.fields
        .filter((item: { Code: string }) => item?.Code === 'SEAT')
        ?.find((item, index) => item?.Code !== undefined && index === 0)
  );

  const seatsDestinationToOrigin = bookingCompleteInfo?.PassengersDetails?.map(
    (item: { fields: { Code: string }[] }) =>
      item?.fields
        .filter((item: { Code: string }) => item?.Code === 'SEAT')
        ?.find((item, index) => item?.Code !== undefined && index === 1)
  );

  const allSeats = bookingCompleteInfo?.PassengersDetails?.map(
    (item: { fields: { Code: string }[] }) =>
      item?.fields
        ?.filter((item: { Code: string }) => item?.Code === 'SEAT')
        ?.map((item) => item)
  );

  return (
    <main
      onClick={() => {
        const modalModifyBookingDetails = document.getElementById(
          'modify-booking-details'
        );
        const modalDepart = document.getElementById('modal-depart');
        const modalReturn = document.getElementById('modal-return');
        const modalPassenger = document.getElementById('modal-passenger');

        window.onclick = function (event) {
          if (
            event.target === modalDepart ||
            event.target === modalReturn ||
            event.target === modalPassenger ||
            event.target === modalModifyBookingDetails
          ) {
            setShowModal({
              depart: false,
              return: false,
              passenger: false,
              modifyBookingDetails: false,
            });
            passengerModify && setPassengerModify(false);
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
                <ModifyBookingModal
                  openModal={() => {
                    setShowModal({
                      depart: false,
                      return: false,
                      passenger: false,
                      modifyBookingDetails: true,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className='px-3 xl:bg-cadetgray width-auto  xl:w-3/4 xs:w-full xl:py-10 mt-3 '>
            <div className='xl:w-2/4 xl:m-auto xs:w-full xl:py-5 xs:py-0'>
              <div className='flex justify-between items-center'>
                <div
                  className='mt-2 cursor-pointer'
                  onClick={() => {
                    !modifyData
                      ? router.push('/reviewtrip')
                      : router.push('/reviewchange');
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
                  {!modifyData ? 'Booking Complete!' : 'Payment Successful'}
                </h1>
              </div>
              <div className='py-1'>
                <p className='font-medium text-base text-pearlgray'>
                  {!modifyData
                    ? 'We’ve sent a booking confirmation email to your email address'
                    : 'Your dates have been updated successfully'}
                </p>
              </div>
              <div className='py-2 xl:w-2/4 md:w-6/12 xs:w-64 '>
                <div className='text-aqua text-sm font-normal p-2 border-aqua border bg-tabsky rounded-lg flex gap-2 items-center'>
                  <div className='text-aqua text-base font-black'>
                    Booking Ref: {bookingCompleteInfo?.PnrInformation?.PnrCode}
                  </div>
                  <div
                    className='cursor-pointer'
                    onClick={() => {
                      navigator.clipboard.writeText(
                        bookingCompleteInfo?.PnrInformation?.PnrCode
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
              <div>
                <div className=' xs:block gap-2 py-3'>
                  <div className='bg-white  xl:w-full mb-1 rounded-2xl'>
                    <CodesInCurve
                      originCity={flightData?.OriginCity}
                      originCode={flightData?.OriginCode}
                      destinationCity={flightData?.DestinationCity}
                      destinationCode={flightData?.DestinationCode}
                      oneway={
                        bookingCompleteInfo?.OriginDestination?.length < 2
                      }
                    />
                    <div className='p-4'>
                      {bookingCompleteInfo?.OriginDestination?.map(
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
                        modifyBooking={true}
                        name='flightAvailability'
                        closeModal={() => {
                          setShowModal({
                            depart: false,
                            return: false,
                            passenger: false,
                            modifyBookingDetails: passengerModify
                              ? false
                              : true,
                          });
                          passengerModify && setPassengerModify(false);
                        }}
                        adult={passengerCount?.adult}
                        flightDetails={passengerCount}
                        showModal={showModal?.passenger}
                        childrens={passengerCount?.children}
                        setFlightDetails={setPassengerCount}
                      />
                      <DepartReturnDateModal
                        editDate={true}
                        closeModal={() => {
                          setShowModal({
                            depart: false,
                            return: false,
                            passenger: false,
                            modifyBookingDetails: true,
                          });
                        }}
                        modifyBooking={true}
                        setShowModal={setShowModal}
                        errorMessage={errorMessage}
                        flightDetails={flightDetails}
                        fareFamilyName={flightInfo?.name}
                        setErrorMessage={setErrorMessage}
                        setFlightDetails={setFlightDetails}
                        setOldDates={() => {
                          setFlightDetails({
                            departDate: new Date(departDate),
                            returnDate: new Date(returnDate),
                            dateFlexible: true,
                          });
                        }}
                        returnDate={flightDetails.returnDate}
                        departDate={flightDetails.departDate}
                        dateFlexible={flightDetails?.dateFlexible}
                        name={showModal?.depart ? 'Departure' : 'Return'}
                        oneway={
                          bookingCompleteInfo?.OriginDestination?.length === 1
                            ? true
                            : false
                        }
                        id={showModal?.depart ? 'modal-depart' : 'modal-return'}
                        showModal={
                          showModal?.depart
                            ? showModal?.depart
                            : showModal?.return
                        }
                        originCode={
                          showModal?.depart
                            ? flightData?.OriginCode
                            : flightData?.DestinationCode
                        }
                        destinationCode={
                          showModal?.depart
                            ? flightData?.DestinationCode
                            : flightData?.OriginCode
                        }
                      />
                      <ModifyPassengerSeatFareFamily
                        passengerModify={() => {
                          setShowModal({
                            depart: false,
                            return: false,
                            passenger: true,
                            modifyBookingDetails: false,
                          });
                          setPassengerModify(true);
                        }}
                        seatsLabel={
                          allSeats && allSeats?.length > 0 && allSeats[0]
                            ? allSeats[0]
                            : []
                        }
                        adult={passengerCount?.adult}
                        fareFamilyName={flightInfo?.name}
                        childrens={passengerCount?.children}
                        seatsModify={() => console.log('modify')}
                      />
                    </div>
                    <PriceBreakDown
                      currency={flightInfo?.details?.currency}
                      passengerCount={storedPassengerData?.length}
                      taxAmount={bookingCompleteInfo?.Amount?.TaxAmount}
                      baseAmount={bookingCompleteInfo?.Amount?.BaseAmount}
                      totalAmount={bookingCompleteInfo?.Amount?.TotalAmount}
                    />
                  </div>
                  <FeaturedAddOns />
                </div>
              </div>
              <ModifyBookingDetailsModal
                id='modify-booking-details'
                closeModal={() => {
                  setShowModal({
                    depart: false,
                    return: false,
                    passenger: false,
                    modifyBookingDetails: false,
                  });
                }}
                seatsLabel={
                  allSeats && allSeats?.length > 0 && allSeats[0]
                    ? allSeats[0]
                    : []
                }
                passengerModify={() => {
                  setShowModal({
                    depart: false,
                    return: false,
                    passenger: true,
                    modifyBookingDetails: false,
                  });
                }}
                datesModify={() => {
                  setShowModal({
                    depart: true,
                    return: false,
                    passenger: false,
                    modifyBookingDetails: false,
                  });
                }}
                seatsModify={() => console.log('modify')}
                cancelBooking={() => {
                  dispatch(
                    loader({
                      show: true,
                      name: 'cancel',
                    })
                  );
                  dispatch(
                    postPrepareCancelFlight(
                      {
                        PnrCode: findBookingInfo?.ID,
                        PassengerName: findBookingInfo?.PassengerName,
                      },
                      router
                    ) as unknown as AnyAction
                  );
                }}
                adult={passengerCount?.adult}
                fareFamilyName={flightInfo?.name}
                childrens={passengerCount?.children}
                showModal={showModal?.modifyBookingDetails}
                returnDate={getDate(flightDetails?.returnDate?.toJSON())}
                departDate={getDate(flightDetails?.departDate?.toJSON())}
              />
              <div className='xs:not-sr-only	xl:sr-only'>
                <div
                  className={`fixed w-full left-0 bottom-0 ${
                    showModal?.depart ||
                    showModal?.return ||
                    showModal?.modifyBookingDetails ||
                    showModal?.passenger
                      ? ''
                      : 'z-50'
                  }`}
                >
                  <ModifyBookingModal
                    openModal={() => {
                      setShowModal({
                        depart: false,
                        return: false,
                        passenger: false,
                        modifyBookingDetails: true,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : load?.name === 'search' ? (
        <SearchFlightLoader open={load?.show} />
      ) : load?.name === 'cancel' ? (
        <CancelBookingLoader open={load?.show} />
      ) : (
        load?.name === 'payment' && <PaymentGatewayLoader open={load?.show} />
      )}
    </main>
  );
};

export default BookingComplete;
