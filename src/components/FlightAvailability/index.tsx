import Image from 'next/image';
import { AnyAction } from 'redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Bliss from './Tabs/Bliss';
import Delight from './Tabs/Delight';
import Opulence from './Tabs/Opulence';
import gem from '../../assets/images/gem.png';
import { RootState } from '@/src/redux/store';
import leaf from '../../assets/images/leaf.png';
import StepsInfo from '../SearchFlight/StepsInfo';
import flower from '../../assets/images/flower.png';
import { loader } from '@/src/redux/reducer/Loader';
import SearchFlightLoader from '../Loader/SearchFlight';
import CompareFareFamilies from '../CompareFareFamilies';
import banner from '../../assets/images/desktopbanner.png';
import { postPrepareFlights } from '@/src/redux/action/SearchFlights';
import { setSelectedFlightData } from '@/src/redux/reducer/FlightDetails';

const FlightAvailability = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const modifyData = useSelector(
    (state: RootState) => state?.flightDetails?.modifyData
  );
  const findBookingInfo = useSelector(
    (state: RootState) => state?.flightDetails?.findBooking
  );
  const modifyBookingInfo = useSelector(
    (state: RootState) => state?.flightDetails?.modifyBooking
  );
  const selectedFlight = useSelector(
    (state: RootState) => state?.flightDetails?.selectedFlight
  );
  const blissData = useSelector(
    (state: RootState) => state?.flightDetails?.searchFlight?.bliss
  );
  const delightData = useSelector(
    (state: RootState) => state?.flightDetails?.searchFlight?.delight
  );
  const oplenceData = useSelector(
    (state: RootState) => state?.flightDetails?.searchFlight?.opulence
  );
  const load = useSelector((state: RootState) => state?.loader?.loader);
  const passengerData = useSelector(
    (state: RootState) => state?.flightDetails?.selectedFlightCodesWithDate
  );

  const { adult, children, dateFlexible } = passengerData;

  const completeFlightDetails = {
    DepartureDate: '',
    ArrivalDate: '',
    OriginCode: '',
    Otr: '',
    Dtr: '',
    DestinationCode: '',
    TotalAmount: 0,
    BestPrice: '',
    BaseAmount: 0,
    TaxAmount: 0,
    Ref: '',
    RefItinerary: '',
    FaireFamilies: [
      {
        orginDepartureDate: '',
        orginDepartureTime: '',
        originName: '',
        luxuryPickup: true,
        loungeAccess: true,
        BagAllowances: [
          {
            Quantity: 0,
            WeightMeasureQualifier: '',
            Weight: 0,
          },
        ],
        destinationName: '',
        destinationArrivalDate: '',
        destinationArrivalTime: '',
      },
    ],
    cpd_code: '',
    symbol: '',
    currency: '',
  };

  const [tabIndex, setTabIndex] = useState(0);
  const [showModal, setShowModal] = useState({
    depart: false,
    return: false,
    passenger: false,
    compareFareFamily: false,
  });
  const [selectFlight, setSelectFlight] = useState({
    display: false,
    name: '',
    index: 0,
    details: completeFlightDetails,
  });

  const [passengerCount, setPassengerCount] = useState({
    adult: adult ? adult : 1,
    children: children ? children : 0,
  });
  const [showFlightInfo, setShowFlightInfo] = useState(false);

  useEffect(() => {
    if (
      !dateFlexible &&
      selectedFlight !== undefined &&
      selectedFlight?.details !== undefined
    ) {
      setShowFlightInfo(true);
      setSelectFlight(selectedFlight);
    }
  }, [dateFlexible, selectedFlight]);

  const tabClicked = (index: number, name: string) => {
    setTabIndex(index);
    const findFlightInfo = (
      name === 'delight'
        ? delightData
        : name === 'bliss'
        ? blissData
        : oplenceData
    )?.find(
      (item: { Dtr: string; Otr: string }) =>
        item?.Dtr === selectFlight?.details?.Dtr &&
        item?.Otr === selectFlight?.details?.Otr
    );
    if (selectFlight?.name !== name && showFlightInfo && findFlightInfo) {
      setSelectFlight({
        display: true,
        name: name,
        index: selectFlight?.index,
        details: findFlightInfo,
      });
      dispatch(
        setSelectedFlightData({
          display: true,
          name: name,
          index: selectFlight?.index,
          details: findFlightInfo,
        })
      );
    } else if (selectFlight?.name !== name) {
      setSelectFlight({
        display: false,
        name: '',
        index: 0,
        details: completeFlightDetails,
      });
      setShowFlightInfo(false);
    }
  };

  return (
    <main
      onClick={() => {
        const modalPassengerDelight = document.getElementById(
          'modal-passenger-delight'
        );
        const modalPassengerBliss = document.getElementById(
          'modal-passenger-bliss'
        );
        const modalPassengerOpulence = document.getElementById(
          'modal-passenger-opulence'
        );
        const modalDepart = document.getElementById('modal-depart');
        const modalReturn = document.getElementById('modal-return');
        const compareFareFamily = document.getElementById('compare-fare');

        window.onclick = function (event) {
          if (
            event.target == modalDepart ||
            event.target == modalReturn ||
            event.target == modalPassengerBliss ||
            event.target == modalPassengerOpulence ||
            event.target === modalPassengerDelight ||
            event.target === compareFareFamily
          ) {
            setShowModal({
              depart: false,
              return: false,
              passenger: false,
              compareFareFamily: false,
            });
          }
        };
      }}
    >
      {!load?.show ? (
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
                <div className='xl:not-sr-only	xs:sr-only'>
                  <div className='fixed top-16 right-3.5  xl:m-auto price-modal'>
                    <div className=''>
                      {showFlightInfo && (
                        <div className='mt-6'>
                          <div className='bg-white p-3 rounded-lg'>
                            <div className='flex justify-between my-1'>
                              <p className='text-slategray text-lg font-medium'>
                                Number of Passengers
                              </p>
                              <p className='font-black text-lg text-black'>
                                {passengerCount?.adult +
                                  passengerCount?.children}
                              </p>
                            </div>
                            <div className='flex justify-between my-1'>
                              <p className='text-slategray text-lg font-medium'>
                                Total Price
                              </p>
                              <p className='font-black text-lg text-black'>
                                {(selectFlight?.details?.currency
                                  ? selectFlight?.details?.currency
                                  : '') +
                                  ' ' +
                                  (selectFlight?.details?.TotalAmount
                                    ? selectFlight?.details?.TotalAmount
                                    : '')}
                              </p>
                            </div>
                            <div className='flex flex-wrap -mb-px text-sm font-medium text-center  text-black '>
                              <div className='flex md:flex block h-full items-center justify-center relative gap-3 py-3 xs:w-full  '>
                                <button
                                  type='button'
                                  className='xs:justify-center  xs:text-center text-aqua border border-aqua bg-white  font-black rounded-lg text-lg inline-flex items-center py-2 text-center button-style xl:w-1/12 '
                                  onClick={() => {
                                    setShowModal({
                                      depart: true,
                                      return: false,
                                      passenger: false,
                                      compareFareFamily: false,
                                    });
                                  }}
                                >
                                  Edit Dates
                                </button>
                                <button
                                  type='button'
                                  className='xs:justify-center  xs:text-center text-white bg-aqua  font-black rounded-lg text-lg inline-flex items-center py-2 text-center button-style xl:w-1/12'
                                  onClick={() => {
                                    dispatch(
                                      loader({
                                        show: true,
                                        name: 'search',
                                      })
                                    );
                                    dispatch(
                                      postPrepareFlights(
                                        {
                                          RefItinerary:
                                            selectFlight?.details?.RefItinerary,
                                          Ref: selectFlight?.details?.Ref,
                                          FareFamily: selectFlight?.name,
                                        },
                                        router
                                      ) as unknown as AnyAction
                                    );
                                  }}
                                >
                                  Confirm
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='xl:bg-cadetgray  xl:rounded-none rounded-lg inherit xs:absolute  xl:top-4  xs:top-0 w-full   xl:w-3/4 xl:py-10 index-style '>
            <div>
              <div className='xl:not-sr-only	xs:sr-only'>
                <StepsInfo selected={2} />
              </div>
            </div>
            <div className='xl:w-2/4 xl:m-auto xs:w-full  xl:py-5 xs:py-0'>
              <div className='xs:mt-0 xs:px-3 xl:px-0'>
                <div className='flex justify-between items-center'>
                  <div
                    className='py-3 cursor-pointer'
                    onClick={() => {
                      showFlightInfo && dateFlexible
                        ? setShowFlightInfo(false)
                        : modifyData
                        ? router.push('/modifybooking')
                        : router?.push('/searchflight');
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
                <div className='xl:my-2 xs:py-0'>
                  <h1 className='text-2xl font-black text-black'>
                    Flight availability
                  </h1>
                </div>
              </div>
              <div>
                <div className='border-gray-200 dark:border-gray-700 pt-3 xs:px-3 xl:px-0'>
                  <ul
                    className='flex flex-wrap gap-3 xs:w-full -mb-px text-sm  text-center font-semibold text-black '
                    id='myTab'
                    data-tabs-toggle='#myTabContent'
                    role='tablist'
                  >
                    <li
                      className=' xs:w-3/12 md:w-full bg-white xl:w-1/4 hover:bg-tabsky  rounded-lg tab-box'
                      role='presentation'
                    >
                      <button
                        className={`xl:w-full xs:w-full inline-block  p-2 border-2 
                  ${
                    tabIndex === 0
                      ? 'text-darkskyblue border-darkskyblue bg-tabsky '
                      : 'border-transparent '
                  }
                  hover:text-darkskyblue hover:border-darkskyblue  hover:bg-tabsky rounded-lg`}
                        onClick={() => {
                          tabClicked(0, 'delight');
                        }}
                      >
                        <Image
                          className='h-8 w-8 object-cover'
                          src={leaf}
                          alt=''
                        />
                        <div className='float-left pt-2'>
                          <p className='font-normal text-xs hover:text-darkskyblue flex flex-start'>
                            Best Price
                          </p>
                          <p className='font-black text-base hover:text-darkskyblue flex flex-start'>
                            Delight
                          </p>
                        </div>
                      </button>
                    </li>
                    <li
                      className=' xs:w-3/12 md:w-full bg-white xl:w-1/4 hover:bg-tabsky  rounded-lg tab-box'
                      role='presentation'
                    >
                      <button
                        className={`xl:w-full xs:w-full inline-block  p-2 border-2 
                  ${
                    tabIndex === 1
                      ? 'text-darkskyblue border-darkskyblue bg-tabsky '
                      : 'border-transparent '
                  }
                  hover:text-darkskyblue hover:border-darkskyblue hover:bg-tabsky rounded-lg`}
                        onClick={() => {
                          tabClicked(1, 'bliss');
                        }}
                        type='button'
                      >
                        <Image
                          className='h-8 w-8 object-cover'
                          src={flower}
                          alt=''
                        />
                        <div className='float-left pt-2 '>
                          <p className='font-normal text-xs hover:text-darkskyblue flex flex-start'>
                            Best Value
                          </p>
                          <p className='font-black text-base hover:text-darkskyblue flex flex-start'>
                            Bliss
                          </p>
                        </div>
                      </button>
                    </li>
                    <li
                      className='  xs:w-3/12 md:w-full bg-white xl:w-1/4 hover:bg-darkskyblue  rounded-lg tab-box'
                      role='presentation'
                    >
                      <button
                        className={`xl:w-full xs:w-full inline-block  p-2 border-2 
                  ${
                    tabIndex === 2
                      ? 'text-darkskyblue border-darkskyblue bg-tabsky '
                      : 'border-transparent '
                  }
                  hover:text-darkskyblue hover:border-darkskyblue  hover:bg-tabsky rounded-lg`}
                        onClick={() => {
                          tabClicked(2, 'opulence');
                        }}
                        type='button'
                      >
                        <Image
                          className='h-8 w-8 object-cover'
                          src={gem}
                          alt=''
                        />
                        <div className='text-start pt-2 '>
                          <p className='font-normal text-xs hover:text-darkskyblue flex flex-start'>
                            Best Experience
                          </p>
                          <p className='font-black text-base hover:text-darkskyblue flex flex-start'>
                            Opulence
                          </p>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
                <h1
                  className='text-base font-black text-aqua text-center py-3 cursor-pointer'
                  onClick={() => {
                    setShowModal({
                      depart: false,
                      return: false,
                      passenger: false,
                      compareFareFamily: true,
                    });
                  }}
                >
                  Compare Fare Families
                </h1>
                <CompareFareFamilies
                  id='compare-fare'
                  setShowModal={setShowModal}
                  showModal={showModal?.compareFareFamily}
                />
                <div>
                  {tabIndex === 0 && (
                    <Delight
                      router={router}
                      showModal={showModal}
                      modifyData={modifyData}
                      setShowModal={setShowModal}
                      selectFlight={selectFlight}
                      passengerCount={passengerCount}
                      showFlightInfo={showFlightInfo}
                      setSelectFlight={setSelectFlight}
                      setShowFlightInfo={setShowFlightInfo}
                      setPassengerCount={setPassengerCount}
                      PassangerLastname={findBookingInfo?.PassengerName}
                      PnrCode={modifyBookingInfo?.PnrInformation?.PnrCode}
                    />
                  )}
                  {tabIndex === 1 && (
                    <Bliss
                      router={router}
                      showModal={showModal}
                      modifyData={modifyData}
                      setShowModal={setShowModal}
                      selectFlight={selectFlight}
                      passengerCount={passengerCount}
                      showFlightInfo={showFlightInfo}
                      setSelectFlight={setSelectFlight}
                      setShowFlightInfo={setShowFlightInfo}
                      setPassengerCount={setPassengerCount}
                      PassangerLastname={findBookingInfo?.PassengerName}
                      PnrCode={modifyBookingInfo?.PnrInformation?.PnrCode}
                    />
                  )}
                  {tabIndex === 2 && (
                    <Opulence
                      router={router}
                      showModal={showModal}
                      modifyData={modifyData}
                      setShowModal={setShowModal}
                      selectFlight={selectFlight}
                      passengerCount={passengerCount}
                      showFlightInfo={showFlightInfo}
                      setSelectFlight={setSelectFlight}
                      setShowFlightInfo={setShowFlightInfo}
                      setPassengerCount={setPassengerCount}
                      PassangerLastname={findBookingInfo?.PassengerName}
                      PnrCode={modifyBookingInfo?.PnrInformation?.PnrCode}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SearchFlightLoader open={load?.show} />
      )}
    </main>
  );
};

export default FlightAvailability;
