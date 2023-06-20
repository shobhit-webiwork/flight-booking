import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PromocodeModal = (props: promoCodeModal) => {
  const {
    id,
    promoCode,
    showModal,
    closeModal,
    flightDetails,
    setFlightDetails,
  } = props;

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
            <div className='relative w-full max-w-md max-h-full rounded-lg bg-white m-auto '>
              <div className='relative bg-white rounded-lg shadow dark:bg-gray-700 calendar-modal'>
                <div className='p-4'>
                  <FontAwesomeIcon
                    icon={faXmark}
                    aria-hidden='true'
                    className='arrow-modal cursor-pointer text-black'
                    onClick={closeModal}
                  />
                  <div className='my-2'>
                    <div className=' text-center'>
                      <p className=' text-xl font-black text-black'>
                        Enter Promo Code
                      </p>
                      <p className='text-slategray font-normal text-sm'>
                        Please note that we don’t allow children under 5
                      </p>
                    </div>
                    <div className='mt-4'>
                      <label
                        htmlFor='first_name'
                        className='block text-sm font-medium text-black'
                      >
                        Enter Promo Code
                      </label>
                      <input
                        type='text'
                        id='first_name'
                        className='bg-gray-50 border border-Silvergray text-sm rounded-lg text-black block w-full p-2.5  '
                        placeholder='Promo Code'
                        value={promoCode}
                        onChange={(e) => {
                          setFlightDetails({
                            ...flightDetails,
                            promoCode: e?.target?.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className='lg:flex md:flex block h-full items-center justify-center relative gap-3 sm:w-full xl:w-full py-3 m-auto '>
                    <button
                      type='button'
                      className={`w-full text-lg font-black xs:justify-center xs:text-center text-white bg-aqua  rounded-lg text-md inline-flex items-center px-5 py-2 text-center  ${
                        promoCode?.length > 0 ? '' : 'opacity-30'
                      }`}
                      onClick={closeModal}
                    >
                      Apply
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

export default PromocodeModal;
