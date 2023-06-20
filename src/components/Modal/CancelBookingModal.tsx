import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import cancelimg from '../../assets/images/cancelimg.png';

const CancelBookingModal = (props: {
  id: string;
  showModal: boolean;
  cancelBooking: () => void;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { id, showModal, cancelBooking, setShowModal } = props;

  return (
    <div>
      {showModal && (
        <div>
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
            <div className=' w-full max-w-md max-h-full  m-auto'>
              <div className=' bg-white rounded-lg shadow  calendar-modal'>
                <div className='p-4 text-center '>
                  <FontAwesomeIcon
                    icon={faXmark}
                    aria-hidden='true'
                    className='arrow-modal cursor-pointer'
                    onClick={() => {
                      setShowModal(false);
                    }}
                  />
                  <div className='flex justify-center'>
                    <Image
                      className='h-12 w-12 object-contain my-2 '
                      src={cancelimg}
                      alt=''
                    />
                  </div>
                  <div className='my-3'>
                    <p className='font-black text-xl text-black'>
                      Are you sure you want to cancel?
                    </p>
                  </div>
                  <div className='my-2'>
                    <p className='text-slategray font-normal text-sm mb-10'>
                      If you cancel your booking this action cannot be undone
                      and you’ll be refunded the amount into your payment method
                      you used to make the booking
                    </p>
                  </div>
                  <div className='flex flex-wrap -mb-px text-sm font-medium text-center  text-black '>
                    <div className='flex md:flex block h-full items-center justify-center relative gap-3 py-3 xs:w-full  '>
                      <button
                        type='button'
                        className='xs:justify-center  xs:text-center text-aqua border border-aqua bg-white  font-black rounded-lg text-lg inline-flex items-center py-2 text-center button-style xl:w-1/12 '
                        onClick={() => {
                          setShowModal(false);
                        }}
                      >
                        Go Back
                      </button>
                      <button
                        type='button'
                        className='xs:justify-center  xs:text-center text-white bg-red  font-black rounded-lg text-lg inline-flex items-center py-2 text-center button-style xl:w-1/12'
                        onClick={() => cancelBooking()}
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
      )}
    </div>
  );
};

export default CancelBookingModal;
