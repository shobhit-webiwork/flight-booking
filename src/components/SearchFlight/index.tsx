import moment from 'moment';
import Image from 'next/image';
import { AnyAction } from 'redux';
import { useRouter } from 'next/router';
import {
  faAngleLeft,
  faArrowRight,
  faArrowsRotate,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import StepsInfo from './StepsInfo';
import OnewayTab from './Tabs/OnewayTab';
import ReturnTab from './Tabs/ReturnTab';
import {
  getEligibleDestinationsToOrigin,
  getEligibleOriginToDestinations,
} from '@/src/redux/action/SearchFlights';
import {
  setModifySeat,
  setChooseSeatData,
  setSelectedFlightData,
} from '@/src/redux/reducer/FlightDetails';
import { countryNames } from './CountryData';
import { RootState } from '@/src/redux/store';
import { debounce } from '../Debounce/Debounce';
import DropdownModal from '../Modal/DropdownModal';
import { loader } from '@/src/redux/reducer/Loader';
import SearchFlightLoader from '../Loader/SearchFlight';
import banner from '../../assets/images/desktopbanner.png';
import bottombanner from '../../assets/images/bottombanner.png';
import { getOriginDetails } from '@/src/redux/action/AirportDetails';
import { setPassengerDetails } from '@/src/redux/reducer/PassengerDetails';

const SearchFlight = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { originDetails } = useSelector(
    (state: RootState) => state?.airportDetails
  );
  const { destinationDetails } = useSelector(
    (state: RootState) => state?.airportDetails
  );
  const load = useSelector((state: RootState) => state?.loader?.loader);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState({
    depart: false,
    return: false,
    passenger: false,
    promoCode: false,
    destination: false,
  });
  const [tabName, setTabName] = useState('return');
  const [flightDetails, setFlightDetails] = useState({
    adult: 1,
    children: 0,
    promoCode: '',
    originCode: '',
    dateFlexible: false,
    destinationCode: 'MLE',
    departDate: new Date(),
    returnDate: new Date(),
  });
  const [getLocation, setGetLocation] = useState({
    display: false,
    name: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    departure: '',
    returnDate: '',
  });
  const [selectOptions, setSelectOptions] = useState<
    {
      label: string;
      value: string;
      country: string;
      code: string;
      Label: string;
    }[]
  >([]);

  useEffect(() => {
    fetchLocation();
    dispatch(
      loader({
        show: true,
        name: 'search',
      })
    );
    dispatch(setModifySeat(false));
    dispatch(setChooseSeatData([]));
    dispatch(setPassengerDetails([]));
    dispatch(setSelectedFlightData([]));
    dispatch(getOriginDetails() as unknown as AnyAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dropdownOptionOrigin = originDetails?.map(
    (item: { city: string; iata: string; country: string }) => {
      return {
        ...item,
        label: item?.city,
        value: item?.city,
        country: countryNames?.find((dt) => dt?.code === item?.country)?.name,
        code: item?.iata,
      };
    }
  );

  const dropdownOptionDestination = destinationDetails?.map(
    (item: { city: string; iata: string; country: string }) => {
      return {
        ...item,
        label: item?.city,
        value: item?.city,
        country: countryNames?.find((dt) => dt?.code === item?.country)?.name,
        code: item?.iata,
      };
    }
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchDataWithDelay = useCallback(
    debounce((value: string) => {
      if (value?.length) {
        const filterOptions = (
          showModal?.destination
            ? dropdownOptionDestination
            : dropdownOptionOrigin
        )?.filter(
          (item: { Label: string }) =>
            item !== undefined &&
            item.Label?.toLowerCase().includes(value?.toLowerCase()?.trim())
        ) as {
          label: string;
          value: string;
          country: string;
          code: string;
          Label: string;
        }[];
        setSelectOptions(filterOptions);
      } else {
        setSelectOptions(
          showModal?.destination
            ? dropdownOptionDestination
            : dropdownOptionOrigin
        );
      }
      setLoading(false);
    }, 1000),
    []
  );

  const getDate = (type: string) => {
    const formatDate = moment(
      type === 'depart' ? flightDetails?.departDate : flightDetails?.returnDate
    )
      .format('LL')
      ?.split(',')[0]
      ?.split(' ');
    const temp = formatDate[1];
    formatDate[1] = formatDate[0]?.slice(0, 3);
    formatDate[0] = temp;
    const finalDate =
      formatDate?.join(' ') +
      moment(
        type === 'depart'
          ? flightDetails?.departDate
          : flightDetails?.returnDate
      )
        .format('LL')
        ?.split(',')[1];
    return finalDate;
  };

  const fetchLocation = useCallback(async () => {
    if (!getLocation?.display) {
      const promiseThen = new Promise((resolve, reject) => {
        fetch(`https://ipapi.co/json`)
          .then((res) => resolve(res.json()))
          .catch((error) => {
            reject(error);
          });
      });
      const countryName = await promiseThen
        .then((res) => {
          return res;
        })
        .catch((error) => console.error(error));
      setGetLocation({
        display: true,
        name: (countryName as { country_name: string })?.country_name,
      });
      (countryName as { country_name: string })?.country_name !== 'Malvides'
        ? setFlightDetails({
            ...flightDetails,
            originCode: '',
            destinationCode: 'MLE',
          })
        : setFlightDetails({
            ...flightDetails,
            originCode: '',
            destinationCode: '',
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDestinationCityName = () => {
    const cityName = dropdownOptionDestination?.find(
      (item: { code: string }) => item?.code === flightDetails?.destinationCode
    );
    if (cityName) {
      return cityName?.label;
    } else if (flightDetails?.destinationCode?.length) {
      setFlightDetails({
        ...flightDetails,
        destinationCode: 'MLE',
      });
      if (flightDetails?.originCode?.length > 0) {
        dispatch(
          getEligibleOriginToDestinations(
            {
              OriginCode: flightDetails?.originCode,
              DestinationCode: 'MLE',
            },
            true,
            {
              ...flightDetails,
              destinationCode: 'MLE',
            },
            setFlightDetails
          ) as unknown as AnyAction
        );
        tabName === 'return' &&
          dispatch(
            getEligibleDestinationsToOrigin({
              DestinationCode: flightDetails?.originCode,
              OriginCode: 'MLE',
            }) as unknown as AnyAction
          );
      }
      return 'The Malvides';
    } else {
      return 'Choose Your City';
    }
  };

  return (
    <>
      {!load?.show ? (
        <main
          className='mx-0'
          onClick={() => {
            const modalPassengerOne = document.getElementById(
              'modal-passenger-one'
            );
            const modalDepart = document.getElementById('modal-depart');
            const modalReturn = document.getElementById('modal-return');
            const modalPassenger = document.getElementById('modal-passenger');
            const modalDepartOne = document.getElementById('modal-depart-one');
            const modalPromoCode = document.getElementById('modal-promo-code');

            window.onclick = function (event) {
              if (
                event.target === modalDepart ||
                event.target === modalReturn ||
                event.target === modalPassenger ||
                event.target === modalDepartOne ||
                event.target === modalPromoCode ||
                event.target === modalPassengerOne
              ) {
                setShowModal({
                  depart: false,
                  return: false,
                  passenger: false,
                  promoCode: false,
                  destination: false,
                });
              }
            };
          }}
        >
          <div>
            <div className='xl:flex'>
              <div>
                <div className='banner-fix xl:w-full '>
                  <div className='xl:bg-cadetgray xs:bg-white xl:rounded-none rounded-lg xs:shadow-2xl xl:shadow-none inherit xs:absolute  xl:top-4  xs:top-52 width-auto  xl:w-3/4 xl:py-10 index-style '>
                    <div>
                      <div className='xl:not-sr-only	xs:sr-only'>
                        <StepsInfo selected={1} />
                      </div>
                      <div className='xl:w-2/4 xl:m-auto xl:py-5 xs:py-0'>
                        <div>
                          <ul className='py-4 xl:mt-36 flex xs:justify-between flex-wrap text-sm font-medium text-center  text-black xs:px-2 xs:py-3 xl:px-0 xl:py-0 '>
                            <li className='lg:w-2/4 xs:w-1/2 button-style'>
                              <button
                                className={`xl:w-full xs:w-full  inline-block px-4 py-2.5 font-medium text-md rounded ' ${
                                  tabName === 'return'
                                    ? ' text-white bg-aqua rounded border-aqua border-2'
                                    : ' text-pearlgray border-white border-2 bg-white '
                                } rounded   font-medium text-md`}
                                type='button'
                                onClick={() => {
                                  setTabName('return');
                                  setErrorMessage({
                                    departure: '',
                                    returnDate: '',
                                  });
                                  flightDetails?.promoCode?.length &&
                                    setFlightDetails({
                                      ...flightDetails,
                                      promoCode: '',
                                    });
                                }}
                              >
                                <div className='flex items-center justify-center gap-2'>
                                  <div>
                                    <FontAwesomeIcon
                                      icon={faArrowsRotate}
                                      aria-hidden='true'
                                      className='h-4 w-4'
                                    />
                                  </div>
                                  <p className='font-medium text-sm'>Return</p>
                                </div>
                              </button>
                            </li>
                            <li className='lg:w-2/4 xs:w-1/2 button-style'>
                              <button
                                className={`xl:w-full xs:w-full  inline-blockpx-4 py-2.5 font-medium text-md rounded  ${
                                  tabName === 'oneway'
                                    ? 'text-white bg-aqua rounded border-aqua border-2'
                                    : 'text-pearlgray border-white border-2 bg-white'
                                } rounded  hover:blue  font-medium text-md`}
                                type='button'
                                onClick={() => {
                                  setTabName('oneway');
                                  setErrorMessage({
                                    departure: '',
                                    returnDate: '',
                                  });
                                  flightDetails?.promoCode?.length &&
                                    setFlightDetails({
                                      ...flightDetails,
                                      promoCode: '',
                                    });
                                }}
                              >
                                <div className='flex items-center justify-center gap-2'>
                                  <div>
                                    <FontAwesomeIcon
                                      icon={faArrowRight}
                                      aria-hidden='true'
                                      className='h-4 w-4 '
                                    />
                                  </div>
                                  <p className='font-medium text-sm'>One Way</p>
                                </div>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div>
                      {tabName === 'return' ? (
                        <ReturnTab
                          name='return'
                          tabName={tabName}
                          getDate={getDate}
                          loading={loading}
                          showModal={showModal}
                          setLoading={setLoading}
                          errorMessage={errorMessage}
                          setShowModal={setShowModal}
                          adult={flightDetails?.adult}
                          flightDetails={flightDetails}
                          selectOptions={selectOptions}
                          setErrorMessage={setErrorMessage}
                          childrens={flightDetails?.children}
                          setFlightDetails={setFlightDetails}
                          setSelectOptions={setSelectOptions}
                          promoCode={flightDetails?.promoCode}
                          departDate={flightDetails?.departDate}
                          returnDate={flightDetails?.returnDate}
                          originCode={flightDetails?.originCode}
                          dropdownOptions={dropdownOptionOrigin}
                          searchDataWithDelay={searchDataWithDelay}
                          dateFlexible={flightDetails?.dateFlexible}
                          destinationCode={flightDetails?.destinationCode}
                        />
                      ) : (
                        <OnewayTab
                          name='oneway'
                          tabName={tabName}
                          getDate={getDate}
                          loading={loading}
                          showModal={showModal}
                          setLoading={setLoading}
                          errorMessage={errorMessage}
                          setShowModal={setShowModal}
                          adult={flightDetails?.adult}
                          flightDetails={flightDetails}
                          selectOptions={selectOptions}
                          setErrorMessage={setErrorMessage}
                          childrens={flightDetails?.children}
                          setFlightDetails={setFlightDetails}
                          setSelectOptions={setSelectOptions}
                          promoCode={flightDetails?.promoCode}
                          departDate={flightDetails?.departDate}
                          originCode={flightDetails?.originCode}
                          dropdownOptions={dropdownOptionOrigin}
                          searchDataWithDelay={searchDataWithDelay}
                          dateFlexible={flightDetails?.dateFlexible}
                          destinationCode={flightDetails?.destinationCode}
                        />
                      )}
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
              <div className='xl:absolute  xl:city-text  xl:top-24 xs:absolute xs:top-16 items-center justify-center relative gap-3 h-0 left-percentage'>
                <div className='xl:mt-4 xs:mt-0'>
                  <div
                    className='px-1 xl:py-3 xs:py-1 cursor-pointer'
                    onClick={() => router.push('/')}
                  >
                    <FontAwesomeIcon
                      icon={faAngleLeft}
                      aria-hidden='true'
                      className='xs:text-white xl:text-black text-sm font-black h-4 w-4'
                    />
                    <span className='px-2  xs:text-white xl:text-black text-sm font-black'>
                      Back
                    </span>
                  </div>
                  <div className='px-2 w-full my-2 h-full items-center justify-center relative gap-3'>
                    <div>
                      <h6 className='text-lg font-medium  xs:text-white xl:text-black'>
                        Where do you want to travel?
                      </h6>
                    </div>

                    <div className='	'>
                      <h1
                        className='text-4xl font-black  xs:text-white xl:text-black family-style "'
                        onClick={() => {
                          if (flightDetails?.originCode?.length) {
                            setShowModal({
                              destination: true,
                              depart: false,
                              return: false,
                              passenger: false,
                              promoCode: false,
                            });
                            setSelectOptions(dropdownOptionDestination);
                          }
                        }}
                      >
                        {getLocation?.name !== 'Malvides' ||
                        flightDetails?.destinationCode?.length
                          ? flightDetails?.destinationCode === 'MLE'
                            ? 'Maldives'
                            : getDestinationCityName()
                          : 'Choose Your City'}
                      </h1>
                    </div>
                    {showModal?.destination && (
                      <DropdownModal
                        name='destination'
                        tabName={tabName}
                        loading={loading}
                        closeModal={() => {
                          setShowModal({
                            destination: false,
                            depart: false,
                            return: false,
                            passenger: false,
                            promoCode: false,
                          });
                        }}
                        setLoading={setLoading}
                        errorMessage={errorMessage}
                        selectOptions={selectOptions}
                        flightDetails={flightDetails}
                        setErrorMessage={setErrorMessage}
                        setSelectOptions={setSelectOptions}
                        setFlightDetails={setFlightDetails}
                        originCode={flightDetails?.originCode}
                        searchDataWithDelay={searchDataWithDelay}
                        dropdownOptions={dropdownOptionDestination}
                        destinationCode={flightDetails?.destinationCode}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='xs:not-sr-only	xl:sr-only	'>
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
        </main>
      ) : (
        <SearchFlightLoader open={load?.show} />
      )}
    </>
  );
};

export default SearchFlight;
