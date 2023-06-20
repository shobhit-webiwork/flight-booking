import Image from 'next/image';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RootState } from '@/src/redux/store';
import SavingDataLoader from '../Loader/SavingData';
import { loader } from '@/src/redux/reducer/Loader';
import SearchSeatLoader from '../Loader/SearchSeat';
import FlightSchedule from '../ReviewTrip/FlightSchedule';
import banner from '../../assets/images/desktopbanner.png';

const ReviewChange = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const modifySeat = useSelector(
    (state: RootState) => state?.flightDetails?.modifySeat
  );
  const paymentForm = useSelector(
    (state: RootState) => state?.flightDetails?.paymentForm
  );
  const chooseSeats = useSelector(
    (state: RootState) => state?.flightDetails?.chooseSeats
  );
  const passengerDetails = useSelector(
    (state: RootState) =>
      state?.flightDetails?.prepareExchangeFlight?.Passengers
  );
  const selectedFlight = useSelector(
    (state: RootState) => state?.flightDetails?.selectedFlight
  );
  const modifyBookingSeats = useSelector(
    (state: RootState) => state?.flightDetails?.modifyBookingSeats
  );
  const createExchangeBookingInfo = useSelector(
    (state: RootState) => state?.flightDetails?.exchangeCreateBooking
  );
  const load = useSelector((state: RootState) => state?.loader?.loader);

  const cityCodes = modifyBookingSeats?.OriginDestination?.find(
    (item: { OriginCode: string; DestinationCode: string }) =>
      item &&
      item?.OriginCode !== undefined &&
      item?.DestinationCode !== undefined
  );

  const TotalPrice = () => {
    return (
      <div className='mt-6'>
        <div className='bg-white p-3 rounded-lg'>
          <div className='flex justify-between my-1'>
            <p className='text-slategray text-base font-medium'>
              Number of Passengers
            </p>
            <p className='font-black text-base text-black'>
              {modifySeat
                ? (modifyBookingSeats?.Passengers?.Adult
                    ? modifyBookingSeats?.Passengers?.Adult
                    : 1) +
                  (modifyBookingSeats?.Passengers?.Children
                    ? modifyBookingSeats?.Passengers?.Children
                    : 0)
                : passengerDetails?.length}
            </p>
          </div>
          <div className='flex justify-between my-1'>
            <p className='text-slategray text-base font-medium'>Total Price</p>
            <p className='font-black text-base text-black'>
              {(selectedFlight?.details?.currency
                ? selectedFlight?.details?.currency
                : '') +
                ' ' +
                (modifySeat
                  ? modifyBookingSeats?.Amount?.TotalAmount
                  : selectedFlight?.details?.TotalAmount)}
            </p>
          </div>
          {chooseSeats?.length === 0 ? (
            <div className='flex flex-wrap -mb-px text-sm font-medium text-center  text-black '>
              <div className='flex md:flex block h-full items-center justify-center relative gap-3 py-3 xs:w-full  '>
                <button
                  type='button'
                  className='xs:justify-center  xs:text-center text-aqua border border-aqua bg-white  font-black rounded-lg text-lg inline-flex items-center py-2 text-center button-style xl:w-1/12 '
                >
                  Edit Dates
                </button>
                <button
                  type='button'
                  className='xs:justify-center  xs:text-center text-white bg-aqua  font-black rounded-lg text-lg inline-flex items-center py-2 text-center button-style xl:w-1/12'
                  onClick={() => {
                    dispatch(
                      loader({
                        name: 'seats',
                        show: true,
                      })
                    );
                    router.push('/chooseseats');
                    setTimeout(() => {
                      dispatch(
                        loader({
                          name: '',
                          show: false,
                        })
                      );
                    }, 1000);
                  }}
                >
                  Choose Seats
                </button>
              </div>
            </div>
          ) : (
            <div className='py-3 lg:flex md:flex block h-full items-center justify-center relative gap-3 w-full   m-auto'>
              <button
                type='submit'
                form='hpp'
                disabled={
                  (modifySeat ? modifyBookingSeats : createExchangeBookingInfo)
                    ?.Amount?.TotalAmount === undefined
                }
                className={`w-full xs:justify-center  xs:text-center text-white bg-aqua focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-black rounded-lg text-lg inline-flex items-center px-5 py-2 text-center ${
                  (modifySeat ? modifyBookingSeats : createExchangeBookingInfo)
                    ?.Amount?.TotalAmount === undefined
                    ? 'opacity-40'
                    : ''
                }`}
              >
                Confirm & Pay
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
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
                <TotalPrice />
              </div>
            </div>
          </div>
          <div className=' px-3 xl:bg-cadetgray width-auto  xl:w-3/4 xs:w-full xl:py-10 mt-3 '>
            <div className='xl:w-2/4 xl:m-auto xs:w-full xl:py-5 xs:py-0 '>
              <div className='flex justify-between items-center'>
                <div
                  onClick={() => {
                    router.back();
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

              <div className='pt-3'>
                <h1 className='text-2xl font-black text-black'>
                  Review changes
                </h1>
              </div>
              <div>
                <div className=' xs:block gap-2 py-3'>
                  {(modifySeat
                    ? modifyBookingSeats?.OriginDestination
                    : selectedFlight?.details?.FaireFamilies
                  )?.map((item: selectedFareFamily, index: number) => {
                    return (
                      <div
                        className='bg-white p-4  xl:w-full rounded-lg '
                        key={index}
                      >
                        <FlightSchedule
                          index={index}
                          seats={false}
                          loungeAccess={true}
                          luxuryPickup={true}
                          bagAllowances={item.BagAllowances}
                          originAirportName={item?.originName}
                          originCode={
                            index === 0
                              ? modifySeat
                                ? cityCodes?.OriginCode
                                : selectedFlight?.details?.OriginCode
                              : modifySeat
                              ? cityCodes?.DestinationCode
                              : selectedFlight?.details?.DestinationCode
                          }
                          destinationCode={
                            index === 0
                              ? modifySeat
                                ? cityCodes?.DestinationCode
                                : selectedFlight?.details?.DestinationCode
                              : modifySeat
                              ? cityCodes?.OriginCode
                              : selectedFlight?.details?.OriginCode
                          }
                          departureDate={item?.orginDepartureDate}
                          departureTime={item?.orginDepartureTime}
                          arrivalDate={item?.destinationArrivalDate}
                          arrivalTime={item?.destinationArrivalTime}
                          destinationAirportName={item?.destinationName}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className='xs:not-sr-only	xl:sr-only'>
              <div className='fixed w-full left-0 bottom-0 z-50'>
                <TotalPrice />
                <div className='hidden'>
                  {paymentForm !== undefined && paymentForm?.length > 0
                    ? parse(paymentForm)
                    : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : load?.name === 'seats' ? (
        <SearchSeatLoader open={load?.show} />
      ) : (
        load?.name === 'save' && <SavingDataLoader open={load?.show} />
      )}
    </>
  );
};

export default ReviewChange;
