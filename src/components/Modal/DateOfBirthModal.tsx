import moment from 'moment';
import enGb from 'date-fns/locale/en-GB';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDatePicker, { registerLocale } from 'react-datepicker';

registerLocale('en-gb', enGb);

const DateOfBirthModal = (props: DateOfBirthModal) => {
  const {
    id,
    name,
    index,
    showModal,
    closeModal,
    selectedDate,
    setFieldValue,
  } = props;

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
          <div className='relative w-full max-w-md max-h-full bg-white m-auto mt-28'>
            <div className='relative bg-white rounded-lg shadow dark:bg-gray-700 calendar-modal'>
              <div className='p-6 text-center calendarstyle '>
                <FontAwesomeIcon
                  icon={faXmark}
                  aria-hidden='true'
                  className='arrow-modal cursor-pointer text-black'
                  onClick={() => {
                    closeModal();
                  }}
                />
                <h3 className='mb-0 text-xl text-black font-black'>
                  Select Date Of Birth
                </h3>

                <div>
                  <ReactDatePicker
                    inline
                    selectsRange
                    peekNextMonth
                    locale='en-gb'
                    showYearDropdown
                    showMonthDropdown
                    maxDate={
                      name === 'Adult'
                        ? new Date(
                            moment(new Date())
                              .subtract(12, 'year')
                              .format('YYYY-MM-DD')
                          )
                        : new Date()
                    }
                    dropdownMode='select'
                    scrollableYearDropdown
                    onChange={(date) => {
                      setFieldValue(
                        `details[${index}].Dob`,
                        String(date[0]?.toJSON())
                      );
                    }}
                    selected={
                      selectedDate?.length ? new Date(selectedDate) : null
                    }
                  />
                </div>
                <div className='xl:w-auto px-3'>
                  <button
                    onClick={() => {
                      props.closeModal();
                    }}
                    type='button'
                    className='xl:w-48 md:w-48 xs:w-full xs:justify-center  text-white bg-aqua focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-black text-lg rounded-lg  inline-flex items-center px-5 py-2 text-center '
                  >
                    Choose Date
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

export default DateOfBirthModal;
