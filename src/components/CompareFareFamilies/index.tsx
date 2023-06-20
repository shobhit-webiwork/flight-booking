import Image from 'next/image';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import gem from '../../assets/images/gem.png';
import leaf from '../../assets/images/leaf.png';
import flower from '../../assets/images/flower.png';
import cancelimg from '../../assets/images/cancel.png';
import checkright from '../../assets/images/checkright.png';

const CompareFareFamilies = (props: compareFareFamily) => {
  const { id, showModal, setShowModal } = props;
  return (
    <main className='mx-0 px-3'>
      {showModal == true && (
        <div id={id}>
          <div>
            <div className='linear fixed top-0 left-0 right-0 z-50  overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0rem)] max-h-full'>
              <div className='relative w-full max-w-md max-h-full m-auto mt-20'>
                <div className='relative bg-white rounded-lg shadow dark:bg-gray-700 calendar-modal'>
                  <FontAwesomeIcon
                    icon={faXmark}
                    aria-hidden='true'
                    className='arrow-modal cursor-pointer'
                    onClick={() => {
                      setShowModal({
                        depart: false,
                        return: false,
                        passenger: false,
                        compareFareFamily: false,
                      });
                    }}
                  />
                  <div className='px-3 pt-5 text-center'>
                    <p className='font-black text-xl text-black'>
                      Compare Fare Families
                    </p>
                    <div className='my-2'>
                      <p className='text-slategray font-normal text-sm'>
                        Here’s a detailed breakdown of each fare family
                      </p>
                    </div>
                    <div className='pt-4'>
                      <div className='relative overflow-x-auto shadow-md sm:rounded-lg modal-height'>
                        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                          <thead className='text-xs text-gray-700  dark:text-gray-400'>
                            <tr>
                              <th></th>
                              <th
                                scope='col'
                                className='px-2 py-4 font-semibold text-sx text-black items-center text-center'
                              >
                                <div className='flex flex-col  justify-center items-center'>
                                  <Image
                                    className='h-5 w-5 object-cover'
                                    src={leaf}
                                    alt=''
                                  />
                                  <div className='float-left pt-2'>
                                    <p className='font-semibold text-xs hover:text-darkskyblue flex flex-start'>
                                      Delight
                                    </p>
                                  </div>
                                </div>
                              </th>
                              <th
                                scope='col'
                                className='px-2 py-4 font-semibold text-sx text-black items-center text-center bg-gray-50 dark:bg-gray-800'
                              >
                                <div className='flex flex-col  justify-center items-center'>
                                  <Image
                                    className='h-5 w-5 object-cover'
                                    src={flower}
                                    alt=''
                                  />
                                  <div className='float-left pt-2'>
                                    <p className='font-semibold text-xs hover:text-darkskyblue flex flex-start'>
                                      Bliss
                                    </p>
                                  </div>
                                </div>
                              </th>
                              <th
                                scope='col'
                                className='px-2 py-4 font-semibold text-sx text-black items-center text-center'
                              >
                                <div className='flex flex-col  justify-center items-center'>
                                  <Image
                                    className='h-5 w-5 object-cover'
                                    src={gem}
                                    alt=''
                                  />
                                  <div className='float-left pt-2'>
                                    <p className='font-semibold text-xs hover:text-darkskyblue flex flex-start'>
                                      Opulence
                                    </p>
                                  </div>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className='bg-gray'>
                              <th
                                scope='row'
                                className='px-2 py-4 font-medium  text-slategeay'
                              >
                                Hold bags
                              </th>
                              <td className='px-2 py-4 font-semibold text-sx text-black items-center text-center'>
                                2
                              </td>
                              <td className='px-2 py-4 font-semibold text-sx text-black items-center text-center'>
                                2
                              </td>
                              <td className='px-2 py-4 font-semibold text-sx text-black items-center text-center'>
                                2
                              </td>
                            </tr>
                            <tr className='bg-white'>
                              <th
                                scope='row'
                                className='px-2 py-4 font-medium  text-slategeay'
                              >
                                Weight allowance
                              </th>
                              <td className='px-2 py-4 font-semibold text-sx text-black items-center text-center'>
                                46kg
                              </td>
                              <td className='px-2 py-4 font-semibold text-sx text-black items-center text-center'>
                                46kg
                              </td>
                              <td className='px-2 py-4 font-semibold text-sx text-black items-center text-center'>
                                46kg
                              </td>
                            </tr>
                            <tr className='bg-gray'>
                              <th
                                scope='row'
                                className='px-2 py-4 font-medium  text-slategeay'
                              >
                                Cabin baggage
                              </th>
                              <td className='px-2 py-4 font-semibold text-sx text-black items-center text-center'>
                                2
                              </td>
                              <td className='px-2 py-4 font-semibold text-sx text-black items-center text-center'>
                                2
                              </td>
                              <td className='px-2 py-4 font-semibold text-sx text-black items-center text-center'>
                                2
                              </td>
                            </tr>
                            <tr className='bg-white  dark:bg-gray-900 '>
                              <th
                                scope='row'
                                className='px-2 py-4 font-medium  text-slategeay '
                              >
                                Sports equipment
                              </th>
                              <td className='px-2 py-4 items-center text-center'>
                                <div className='flex justify-center '>
                                  <Image
                                    className='h-3 w-3 object-cover'
                                    src={cancelimg}
                                    alt=''
                                  />
                                </div>
                              </td>
                              <td className='px-2 py-4'>
                                <div className='flex justify-center '>
                                  <Image
                                    className='h-3 w-3 object-cover'
                                    src={cancelimg}
                                    alt=''
                                  />
                                </div>
                              </td>
                              <td className='px-2 py-4'>
                                <div className='flex justify-center '>
                                  <Image
                                    className='h-3 w-3 object-cover'
                                    src={checkright}
                                    alt=''
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr className='bg-gray'>
                              <th
                                scope='row'
                                className='px-2 py-4 font-medium  text-slategeay'
                              >
                                Advanced seat selection
                              </th>
                              <td className='px-2 py-4'>
                                <div className='flex justify-center '>
                                  <Image
                                    className='h-3 w-3 object-cover'
                                    src={cancelimg}
                                    alt=''
                                  />
                                </div>
                              </td>
                              <td className='px-2 py-4'>
                                <div className='flex justify-center '>
                                  <Image
                                    className='h-3 w-3 object-cover'
                                    src={checkright}
                                    alt=''
                                  />
                                </div>
                              </td>
                              <td className='px-2 py-4'>
                                <div className='flex justify-center '>
                                  <Image
                                    className='h-3 w-3 object-cover'
                                    src={checkright}
                                    alt=''
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr className=' bg-white  '>
                              <th
                                scope='row'
                                className='px-2 py-4 font-medium  text-slategeay'
                              >
                                Lounge access
                              </th>
                              <td className='px-2 py-4'>
                                <div className='flex justify-center '>
                                  <Image
                                    className='h-3 w-3 object-cover'
                                    src={cancelimg}
                                    alt=''
                                  />
                                </div>
                              </td>
                              <td className='px-2 py-4'>
                                <div className='flex justify-center '>
                                  <Image
                                    className='h-3 w-3 object-cover'
                                    src={checkright}
                                    alt=''
                                  />
                                </div>
                              </td>
                              <td className='px-2 py-4'>
                                <div className='flex justify-center '>
                                  <Image
                                    className='h-3 w-3 object-cover'
                                    src={checkright}
                                    alt=''
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr className='bg-gray'>
                              <th
                                scope='row'
                                className='px-2 py-4 font-medium  text-slategeay'
                              >
                                Home check-in and luxury transfer
                              </th>
                              <td className='px-2 py-4'>
                                <div className='flex justify-center '>
                                  <Image
                                    className='h-3 w-3 object-cover'
                                    src={cancelimg}
                                    alt=''
                                  />
                                </div>
                              </td>
                              <td className='px-2 py-4'>
                                <div className='flex justify-center '>
                                  <Image
                                    className='h-3 w-3 object-cover'
                                    src={checkright}
                                    alt=''
                                  />
                                </div>
                              </td>
                              <td className='px-2 py-4'>
                                <div className='flex justify-center '>
                                  <Image
                                    className='h-3 w-3 object-cover'
                                    src={checkright}
                                    alt=''
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr className=' bg-white'>
                              <th
                                scope='row'
                                className='px-2 py-4 font-medium  text-slategeay'
                              >
                                Changes to booking more than 30 days before
                                departure
                              </th>
                              <td className='px-2 py-4 tems-center text-center'>
                                <p className='font-black text-xs'> $100</p>

                                <p className='whitespace-nowrap text-black'>
                                  per change
                                </p>
                              </td>
                              <td className='px-2 py-4 tems-center text-center'>
                                <p className='font-black text-xs'> $50</p>
                                <p className='whitespace-nowrap text-black'>
                                  per change
                                </p>
                              </td>
                              <td className='px-2 py-4 tems-center text-center'>
                                <p className='font-black text-xs text-green'>
                                  Free
                                </p>
                              </td>
                            </tr>
                            <tr className='bg-gray'>
                              <th
                                scope='row'
                                className='px-2 py-4 font-medium  text-slategeay'
                              >
                                Changes to booking less than 30 days before
                                departure
                              </th>
                              <td className='px-2 py-4 tems-center text-center'>
                                <p className='font-black text-xs'> $300</p>

                                <p className='whitespace-nowrap text-black'>
                                  per change
                                </p>
                              </td>
                              <td className='px-2 py-4 tems-center text-center'>
                                <p className='font-black text-xs'> $200</p>
                                <p className='whitespace-nowrap text-black'>
                                  per change
                                </p>
                              </td>
                              <td className='px-2 py-4 tems-center text-center'>
                                <p className='font-black text-xs'> $75</p>
                                <p className='whitespace-nowrap text-black'>
                                  per change
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className=' lg:flex md:flex block h-full items-center justify-center relative gap-3 w-full  py-5 m-auto'>
                        <button
                          type='button'
                          className='w-full xs:justify-center xs:text-center text-white bg-aqua  font-black rounded-lg text-lg inline-flex items-center px-5 py-2 text-center '
                          onClick={() => {
                            setShowModal({
                              depart: false,
                              return: false,
                              passenger: false,
                              compareFareFamily: false,
                            });
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CompareFareFamilies;
