const StepsInfo = ({ selected }: { selected: number }) => {
  return (
    <div className='mt-6'>
      <div className='xl:w-3/5 xl:m-auto xl:pl-14'>
        <div className='flex justify-between'>
          <div className='flex gap-2 text-center  items-center justify-center '>
            <p
              className={`${
                selected === 1 ? 'bg-orange' : 'bg-Silvergray'
              } rounded-full h-5 w-5 text-white flex items-center justify-center text-xs`}
            >
              1
            </p>
            <p className='text-sm text-black'>Choose your date</p>
          </div>
          <div className='flex gap-2'>
            <p
              className={`${
                selected === 2 ? 'bg-orange' : 'bg-Silvergray'
              } rounded-full h-5 w-5 text-white flex items-center justify-center text-xs`}
            >
              2
            </p>
            <p className='text-sm text-slategray'>Pick your flights</p>
          </div>
          <div className='flex gap-2'>
            <p
              className={`${
                selected === 3 ? 'bg-orange' : 'bg-Silvergray'
              } rounded-full h-5 w-5 text-white flex items-center justify-center text-xs`}
            >
              3
            </p>
            <p className='text-sm text-slategray'>Review & pay</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsInfo;
