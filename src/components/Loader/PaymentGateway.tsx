import Image from 'next/image';

import loading from '../../assets/images/loading.png';

const PaymentGatewayLoader = (props: { open: boolean }) => {
  return (
    <div>
      {props?.open && (
        <main className='mx-0 px-3 bg-black  '>
          <div className=''>
            <div className=' flex flex-col justify-center items-center align-center h-screen'>
              <Image
                className='h-auto w-10 object-cover'
                src={loading}
                alt=''
              />
              <div className='mt-10'>
                <h1 className='text-2xl font-black text-white text-center'>
                  Payment gateway
                </h1>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default PaymentGatewayLoader;
