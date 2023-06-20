import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const YoungAgeModal = (props: youngAdultAgeModal) => {
  const { id, showModal, closeModal, passengerName } = props;
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
            <div className='relative w-full max-w-md max-h-full bg-white m-auto '>
              <div className='relative bg-white rounded-lg shadow dark:bg-gray-700 calendar-modal'>
                <div className='p-4 text-center'>
                  <FontAwesomeIcon
                    icon={faXmark}
                    aria-hidden='true'
                    className='arrow-modal cursor-pointer text-black'
                    onClick={closeModal}
                  />
                  <div className='my-8'>
                    <h1 className='font-black text-xl text-black'>
                      Looks like {passengerName} is too young to fly with us
                    </h1>
                    <p className='pt-3 text-slategray text-sm font-normal '>
                      Our policy at Beond prohibits children below 5 flying with
                      us. We apologise for the inconvenience
                    </p>
                  </div>
                  <div className='py-3 lg:flex md:flex block h-full items-center justify-center relative gap-3 w-full m-auto'>
                    <button
                      type='button'
                      onClick={props.closeModal}
                      className='xs:w-full xs:justify-center  xs:text-center text-white bg-aqua  font-black rounded-lg text-lg inline-flex items-center px-5 py-2 text-center '
                    >
                      I Understand
                    </button>
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

export default YoungAgeModal;
