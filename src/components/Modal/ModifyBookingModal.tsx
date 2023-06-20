const ModifyBookingModal = (props: { openModal: () => void }) => {
  const { openModal } = props;
  return (
    <>
      {
        <div className='mt-6   '>
          <div className='bg-white p-3 rounded-lg'>
            <div className='pt-3 lg:flex md:flex block h-full items-center justify-center relative gap-3 w-full  m-auto'>
              <button
                onClick={() => openModal()}
                type='button'
                className='w-full xs:justify-center  xs:text-center text-aqua border border-aqua bg-white focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-black rounded-lg text-lg inline-flex items-center px-5 py-2 text-center '
              >
                Modify Booking
              </button>
            </div>
            <div className='py-3 lg:flex md:flex block h-full items-center justify-center relative gap-3 w-full  m-auto'>
              <button
                type='button'
                className='w-full xs:justify-center  xs:text-center text-white bg-aqua  font-black rounded-lg text-lg inline-flex items-center px-5 py-2 text-center '
              >
                Add Passenger Details
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default ModifyBookingModal;
