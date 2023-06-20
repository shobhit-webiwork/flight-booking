import Image from 'next/image';

import flightbanner from '../../assets/images/flightbanner.png';
import planetopcurve from '../../assets/images/planetopcurve.png';
import planebottomcurve from '../../assets/images/planebottomcurve.png';

const CodesInCurve = (props: codesInCurve) => {
  const { oneway, originCity, originCode, destinationCity, destinationCode } =
    props;

  return (
    <div>
      {' '}
      <div className='w-full overflow-hidden relative'>
        <Image
          src={flightbanner}
          className='absolute inset-0  w-full object-containt rounded-tl-2xl rounded-tr-2xl'
          alt=''
        />
        <div className='relative'>
          <div className='absolute inset-0 bg-gray-900 bg-opacity-75'></div>
          <div className='h-full items-center justify-center relative gap-3'>
            <div className=' my-2 items-center justify-center relative gap-3 px-6'>
              <div className='flex items-center justify-center'>
                <div className='mt-6'>
                  <Image
                    className='h-10 w-full object-contain'
                    src={planetopcurve}
                    alt=''
                  />
                </div>
              </div>
              <div className='flex item-center  justify-between items-center mt-5 mb-5 px-6 '>
                <div>
                  <h1 className='text-4xl font-extrabold  text-white '>
                    {originCode ? originCode : ''}
                  </h1>
                  <p className='font-medium text-base text-cadetgray'>
                    {originCity ? originCity : ''}
                  </p>
                </div>
                <div className='text-right'>
                  <h1 className='text-4xl font-extrabold  text-white "'>
                    {destinationCode ? destinationCode : ''}
                  </h1>
                  <p className='font-medium text-base text-cadetgray'>
                    {destinationCity ? destinationCity : ''}
                  </p>
                </div>
              </div>
              <div>
                <div className='flex items-center justify-center'>
                  <div className='mb-6'>
                    {!oneway && (
                      <Image
                        className='h-10 w-full object-containt'
                        src={planebottomcurve}
                        alt=''
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodesInCurve;
