import Image from 'next/image';

import group from '../../assets/images/group.png';
import flower from '../../assets/images/flower.png';
import orangechair from '../../assets/images/orangechair.png';

const ModifyPassengerSeatFareFamily = (props: {
  adult: number;
  childrens: number;
  fareFamilyName: string;
  seatsModify: () => void;
  passengerModify: () => void;
  seatsLabel?: { Text: string }[];
}) => {
  const {
    adult,
    childrens,
    seatsLabel,
    seatsModify,
    fareFamilyName,
    passengerModify,
  } = props;
  return (
    <div>
      <div>
        <div className='flex items-center justify-between  w-full px-2  font-medium text-left text-gray-500 my-3'>
          <div className='flex gap-3'>
            <div className='flex justify-center items-center'>
              <Image className='h-5 w-5 object-containt' src={group} alt='' />
            </div>
            <div>
              <p className='text-black font-medium text-lg'>Passengers</p>
              <p className='text-sm font-medium text-pearlgray'>
                {`${adult} Adults ${
                  childrens > 0 ? ', ' + childrens + ' Children' : ''
                }`}
              </p>
            </div>
          </div>
          <div
            className='mt-2 cursor-pointer'
            onClick={() => {
              passengerModify();
            }}
          >
            <p className='font-black text-sm text-aqua'>Modify</p>
          </div>
        </div>
        <div className='flex items-center justify-between  w-full px-2  font-medium text-left text-gray-500 my-3'>
          <div className='flex gap-3'>
            <div className='flex justify-center items-center'>
              <Image
                className='h-5 w-5 object-containt'
                src={orangechair}
                alt=''
              />
            </div>
            <div>
              <p className='text-black font-medium text-lg'>Seat Selection</p>
              <p className='text-sm font-medium text-pearlgray'>
                {seatsLabel && seatsLabel?.length > 0
                  ? seatsLabel?.map((item, index) =>
                      index === seatsLabel?.length - 1
                        ? item?.Text
                        : item?.Text + ' , '
                    )
                  : 'Change your seats'}
              </p>
            </div>
          </div>
          <div className='mt-2 cursor-pointer' onClick={() => seatsModify()}>
            <p className='font-black text-sm text-aqua'>Modify</p>
          </div>
        </div>
        <div className='flex items-center justify-between  w-full px-2  font-medium text-left text-gray-500 my-3'>
          <div className='flex gap-3'>
            <div className='flex justify-center items-center'>
              <Image className='h-5 w-5 object-containt' src={flower} alt='' />
            </div>
            <div>
              <p className='text-sm font-medium text-pearlgray'>Fare Family</p>
              <p className='text-black font-medium text-lg '>
                {fareFamilyName?.charAt(0)?.toUpperCase() +
                  fareFamilyName?.slice(1)?.trim()}
              </p>
            </div>
          </div>
          <div className='mt-2 cursor-pointer'>
            <p className='font-black text-sm text-aqua'>Modify</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyPassengerSeatFareFamily;
