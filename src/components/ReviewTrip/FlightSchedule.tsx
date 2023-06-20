import Image from 'next/image';

import { getDate } from './GetDate';
import wine from '../../assets/images/wine.png';
import chair from '../../assets/images/chair.png';
import carblue from '../../assets/images/carblue.png';
import utensils from '../../assets/images/utensils.png';
import briefcase from '../../assets/images/briefcase.png';
import planetakeoff from '../../assets/images/planetakeoff.png';

const FlightSchedule = (props: flightSchedule) => {
  const {
    index,
    seats,
    originCode,
    arrivalDate,
    arrivalTime,
    loungeAccess,
    luxuryPickup,
    bagAllowances,
    departureDate,
    departureTime,
    destinationCode,
    originAirportName,
    destinationAirportName,
    seatsOriginToDestination,
    seatsDestinationToOrigin,
  } = props;

  return (
    <div>
      <div>
        <div className='flex gap-4 relative'>
          <div
            className={`${
              index === 0 ? 'bg-orange' : 'bg-black'
            } h-10 w-12 flex justify-center items-center rounded-full z-10`}
          >
            <Image
              className='h-4 w-4 object-contain '
              src={planetakeoff}
              alt=''
            />
          </div>
          <div className='absolute h-full top-4 left-5 border-dashed border-Silvergray border '></div>
          <div className='w-full'>
            <div className='flex justify-between w-full'>
              <div className=''>
                <p className='font-extrabold text-2xl text-black'>
                  {originCode}
                </p>
                <p className='font-normal text-xs text-pearlgray'>
                  {originAirportName}
                </p>
              </div>
              <div className=''>
                <p className='font-black text-2xl text-black text-end'>
                  {departureTime?.replace(':00', '')}
                </p>
                <p className='font-normal text-xs text-pearlgray text-end'>
                  {getDate(departureDate)}
                </p>
              </div>
            </div>
            <div className='p-3 my-2 xl:w-full rounded-lg border border-cadetgray'>
              <div>
                {luxuryPickup && (
                  <div className='flex gap-3 items-center my-1'>
                    <Image
                      className='h-5 w-5 object-contain'
                      src={carblue}
                      alt=''
                    />
                    <p className='font-black text-sm text-black'>
                      Luxury Pick-up
                    </p>
                  </div>
                )}
                {loungeAccess && (
                  <div className='flex gap-3 py-2'>
                    <Image
                      className='h-5 w-5 object-contain'
                      src={wine}
                      alt=''
                    />
                    <p className='font-black text-sm text-black'>
                      Lounge Access
                    </p>
                  </div>
                )}
                {seats && (
                  <div className='flex gap-3 py-2'>
                    <Image
                      className='h-5 w-5 object-contain'
                      src={chair}
                      alt=''
                    />
                    <div>
                      <p className='font-black text-sm text-black'>Seats</p>
                      <p className='font-medium text-xs text-slategray'>
                        {index === 0
                          ? seatsOriginToDestination &&
                            seatsOriginToDestination?.length > 0
                            ? seatsOriginToDestination?.map((item, index) =>
                                index === seatsOriginToDestination?.length - 1
                                  ? item?.Text
                                  : item?.Text + ' , '
                              )
                            : '6D, 6F, 7D, 7F'
                          : seatsDestinationToOrigin &&
                            seatsDestinationToOrigin?.length > 0
                          ? seatsDestinationToOrigin?.map((item, index) =>
                              index === seatsDestinationToOrigin?.length - 1
                                ? item?.Text
                                : item?.Text + ' , '
                            )
                          : '6D, 6F, 7D, 7F'}
                      </p>
                    </div>
                  </div>
                )}
                <div className='flex gap-3 py-2'>
                  <Image
                    className='h-5 w-5 object-contain'
                    src={briefcase}
                    alt=''
                  />
                  <div>
                    <p className='font-black text-sm text-black'>
                      Baggage{' '}
                      {Array.isArray(bagAllowances)
                        ? bagAllowances?.map((dt) =>
                            dt?.Quantity
                              ? dt?.Quantity +
                                'x' +
                                dt?.Weight +
                                dt?.WeightMeasureQualifier?.toLowerCase()
                              : ''
                          )
                        : bagAllowances?.Quantity
                        ? bagAllowances?.Quantity +
                          'x' +
                          bagAllowances?.Weight +
                          bagAllowances?.WeightMeasureQualifier?.toLowerCase()
                        : ''}
                    </p>
                    <p className='font-medium text-xs text-slategray'>
                      Cabin Baggage 7kg
                    </p>
                  </div>
                </div>
                <div className='flex gap-3 py-2'>
                  <Image
                    className='h-5 w-5 object-contain'
                    src={utensils}
                    alt=''
                  />
                  <p className='font-black text-sm text-black'>
                    In-flight luxury dining
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-4 mb-6'>
        <div
          className={`${
            index === 0 ? 'bg-orange' : 'bg-black'
          } h-10 w-12 flex justify-center items-center rounded-full z-40`}
        >
          <Image
            className='h-4 w-4 object-contain '
            src={planetakeoff}
            alt=''
          />
        </div>
        <div className='w-full'>
          <div className='flex justify-between w-full'>
            <div className=''>
              <p className='font-extrabold text-2xl text-black'>
                {destinationCode}
              </p>
              <p className='font-normal text-xs text-pearlgray'>
                {destinationAirportName}
              </p>
            </div>
            <div className=''>
              <p className='font-black text-2xl text-black text-end'>
                {arrivalTime?.replace(':00', '')}
              </p>
              <p className='font-normal text-xs text-pearlgray text-end'>
                {getDate(arrivalDate)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSchedule;
