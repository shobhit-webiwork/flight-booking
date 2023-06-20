import Image from 'next/image';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faXmark } from '@fortawesome/free-solid-svg-icons';

import { RootState } from '@/src/redux/store';
import group from '../../assets/images/group.png';
import flower from '../../assets/images/flower.png';
import xcircle from '../../assets/images/xcircle.png';
import orangechair from '../../assets/images/orangechair.png';
import calendardays from '../../assets/images/calendardays.png';

const ModifyBookingDetailsModal = (props: modifyBookingDetailsModal) => {
  const {
    id,
    adult,
    childrens,
    showModal,
    seatsLabel,
    departDate,
    returnDate,
    closeModal,
    seatsModify,
    datesModify,
    cancelBooking,
    fareFamilyName,
    passengerModify,
  } = props;

  const modifyBookingInfo = useSelector(
    (state: RootState) => state?.flightDetails?.modifyBooking?.OriginDestination
  );

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
          <div className='relative w-full max-w-md max-h-full bg-white m-auto  rounded-lg'>
            <div className='relative bg-white rounded-lg shadow dark:bg-gray-700 calendar-modal'>
              <div className='p-4 text-center'>
                <FontAwesomeIcon
                  icon={faXmark}
                  aria-hidden='true'
                  className='arrow-modal cursor-pointer'
                  onClick={() => {
                    closeModal();
                  }}
                />
                <div className='my-3'>
                  <p className='font-black text-xl text-black'>
                    Modify Your Booking
                  </p>
                </div>
                <div className='my-2'>
                  <div className='flex items-center justify-between  w-full px-2  font-medium text-left text-gray-500 my-3'>
                    <div className='flex gap-3'>
                      <div className='flex justify-center items-center'>
                        <Image
                          className='h-5 w-5 object-containt'
                          src={calendardays}
                          alt=''
                        />
                      </div>
                      <div>
                        <p className='text-black font-medium text-lg'>
                          Change Dates
                        </p>
                        <p className='text-sm font-medium text-pearlgray'>
                          {modifyBookingInfo?.length === 1
                            ? departDate
                            : departDate + ' - ' + returnDate}
                        </p>
                      </div>
                    </div>
                    <div
                      className='mt-2 flex items-center cursor-pointer'
                      onClick={() => datesModify()}
                    >
                      <p className='font-black text-xs text-aqua'> Modify</p>
                      <FontAwesomeIcon
                        icon={faAngleRight}
                        className='h-4 w-4 text-aqua'
                      />
                    </div>
                  </div>
                  <div className='flex items-center justify-between  w-full px-2  font-medium text-left text-gray-500 my-3'>
                    <div className='flex gap-3'>
                      <div className='flex justify-center items-center'>
                        <Image
                          className='h-5 w-5 object-containt'
                          src={group}
                          alt=''
                        />
                      </div>
                      <div>
                        <p className='text-black font-medium text-lg'>
                          Passengers
                        </p>
                        <p className='text-sm font-medium text-pearlgray'>
                          {`${adult} Adults ${
                            childrens > 0 ? ', ' + childrens + ' Children' : ''
                          }`}
                        </p>
                      </div>
                    </div>
                    <div
                      className='mt-2 flex items-center cursor-pointer'
                      onClick={() => passengerModify()}
                    >
                      <p className='font-black text-xs text-aqua'> Modify</p>
                      <FontAwesomeIcon
                        icon={faAngleRight}
                        className='h-4 w-4 text-aqua'
                      />
                    </div>
                  </div>
                  <div className='flex items-center justify-between  w-full px-2  font-medium text-left text-gray-500 my-3'>
                    <div className='flex gap-3'>
                      <div className='flex justify-center items-center'>
                        <Image
                          className='h-5 w-5 object-containt'
                          src={orangechair}
                          alt=''
                        />
                      </div>
                      <div>
                        <p className='text-black font-medium text-lg'>
                          Seat Selection
                        </p>
                        <p className='text-sm font-medium text-pearlgray'>
                          {seatsLabel && seatsLabel?.length > 0
                            ? seatsLabel?.map((item, index) =>
                                index === seatsLabel?.length - 1
                                  ? item?.Text
                                  : item?.Text + ' , '
                              )
                            : 'No seats selected yet'}
                        </p>
                      </div>
                    </div>
                    <div
                      className='mt-2 flex items-center cursor-pointer'
                      onClick={() => seatsModify()}
                    >
                      <p className='font-black text-xs text-aqua'>
                        {seatsLabel && seatsLabel?.length > 0
                          ? 'Modify'
                          : 'Choose'}
                      </p>
                      <FontAwesomeIcon
                        icon={faAngleRight}
                        className='h-4 w-4 text-aqua'
                      />
                    </div>
                  </div>
                  <div className='flex items-center justify-between  w-full px-2  font-medium text-left text-gray-500 my-3'>
                    <div className='flex gap-3'>
                      <div className='flex justify-center items-center'>
                        <Image
                          className='h-5 w-5 object-containt'
                          src={flower}
                          alt=''
                        />
                      </div>
                      <div>
                        <p className='text-sm font-medium text-pearlgray'>
                          Fare Family
                        </p>
                        <p className='text-black font-medium text-lg'>
                          {fareFamilyName?.charAt(0)?.toUpperCase() +
                            fareFamilyName?.slice(1)?.trim()}
                        </p>
                      </div>
                    </div>
                    <div className='mt-2 flex items-center cursor-pointer'>
                      <p className='font-black text-xs text-aqua'> Modify</p>
                      <FontAwesomeIcon
                        icon={faAngleRight}
                        className='h-4 w-4 text-aqua'
                      />
                    </div>
                  </div>
                  <div className='flex items-center justify-between  w-full px-2  font-medium text-left text-gray-500 my-3'>
                    <div className='flex gap-3'>
                      <div className='flex justify-center items-center'>
                        <Image
                          className='h-5 w-5 object-containt'
                          src={xcircle}
                          alt=''
                        />
                      </div>
                      <div>
                        <p className='text-black font-medium text-lg'>
                          Cancel Your Booking
                        </p>
                        <p className='text-sm font-medium text-pearlgray'>
                          Cancel your trip
                        </p>
                      </div>
                    </div>
                    <div
                      className='mt-2 flex items-center cursor-pointer'
                      onClick={() => cancelBooking()}
                    >
                      <p className='font-black text-xs text-aqua'> Cancel</p>
                      <FontAwesomeIcon
                        icon={faAngleRight}
                        className='h-4 w-4 text-aqua'
                      />
                    </div>
                  </div>
                </div>

                <div className='py-3 lg:flex md:flex block h-full items-center justify-center relative gap-3 w-full  m-auto'>
                  <button
                    onClick={() => {
                      closeModal();
                    }}
                    type='button'
                    className='w-full xs:justify-center  xs:text-center text-white bg-aqua  font-black rounded-lg text-lg inline-flex items-center px-5 py-2 text-center '
                  >
                    Close
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

export default ModifyBookingDetailsModal;
