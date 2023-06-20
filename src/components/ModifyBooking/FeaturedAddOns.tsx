import Image from 'next/image';

import cake from '../../assets/images/cake.png';
import couple from '../../assets/images/couple.png';
import champagne from '../../assets/images/champagne.png';

const FeaturedAddOns = () => {
  return (
    <div className='xs:mb-40 xl:mb-0'>
      <div>
        <h1 className='font-black text-xl text-black'>Featured Add-ons</h1>
      </div>
      <div className='bg-white  xl:w-full mt-3 rounded-lg'>
        <div className='flex p-3 justify-between items-center'>
          <div>
            <h1 className='text-base font-black text-black'>Champagne</h1>
            <p className='text-xs font-normal text-pearlgray'>
              Enjoy unlimited champagne throughout the entire duration of the
              flight
            </p>
            <p className='font-black text-sm text-aqua'>$150 Per Person</p>
          </div>
          <div>
            <Image
              className='h-28 w-44 object-contain rounded-md'
              src={champagne}
              alt=''
            />
          </div>
        </div>
      </div>
      <div className='bg-white  xl:w-full mt-3 rounded-lg'>
        <div className='flex p-3 justify-between items-center '>
          <div>
            <h1 className='text-base font-black text-black'>
              Celebration Cake
            </h1>
            <p className='text-xs font-normal text-pearlgray'>
              Unlimited cake to celebrate your special occasion
            </p>
            <p className='font-black text-sm text-aqua'>$100 Per Person</p>
          </div>
          <div>
            <Image
              className='h-32 w-32 object-contain rounded-md'
              src={cake}
              alt=''
            />
          </div>
        </div>
      </div>
      <div className='bg-white  xl:w-full mt-3 rounded-lg'>
        <div className='flex p-3 justify-between items-center'>
          <div>
            <h1 className='text-base font-black text-black'>
              Honeymoon Package
            </h1>
            <p className='text-xs font-normal text-pearlgray'>
              Enjoy unlimited champagne and caviar onboard the flight
            </p>
            <p className='font-black text-sm text-aqua'>$250 Per Person</p>
          </div>
          <div>
            <Image className='h-36 w-36 object-contain ' src={couple} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedAddOns;
