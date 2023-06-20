import Image from 'next/image';

import destination from '../../assets/images/destination.png';

const NoOptionFound = () => {
  return (
    <div>
      <div className='py-28'>
        <div className='flex justify-center '>
          <Image className='w-20 w-20 object-cover' src={destination} alt='' />
        </div>
        <div className='py-5'>
          <h6 className='font-black text-xl text-black text-center'>
            Looks like we don’t fly to this city yet
          </h6>
          <p className='font-medium text-base text-pearlgray text-center'>
            We’re constantly adding new destinations
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoOptionFound;
