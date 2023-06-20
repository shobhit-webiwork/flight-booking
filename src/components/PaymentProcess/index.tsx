import { AnyAction } from 'redux';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/src/redux/store';
import { loader } from '@/src/redux/reducer/Loader';
import PaymentGatewayLoader from '../Loader/PaymentGateway';
import { postCreateTicket } from '@/src/redux/action/SearchFlights';
import { setPaymentStatusData } from '@/src/redux/reducer/FlightDetails';

const PaymentProcess = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const modifySeat = useSelector(
    (state: RootState) => state?.flightDetails?.modifySeat
  );
  const modifyData = useSelector(
    (state: RootState) => state?.flightDetails?.modifyData
  );
  const paymentStatus = useSelector(
    (state: RootState) => state?.flightDetails?.paymentStatus
  );
  const createBookingInfo = useSelector(
    (state: RootState) => state?.flightDetails?.createBooking
  );
  const modifyBookingSeats = useSelector(
    (state: RootState) => state?.flightDetails?.modifyBookingSeats
  );
  const storedPassengerData = useSelector(
    (state: RootState) => state?.passenger?.passengersData?.details
  );
  const createExchangeBookingInfo = useSelector(
    (state: RootState) => state?.flightDetails?.exchangeCreateBooking
  );
  const load = useSelector((state: RootState) => state?.loader?.loader);
  const passengerDetails = useSelector((state: RootState) =>
    modifySeat
      ? state?.flightDetails?.prepareBookingModification?.Passengers?.map(
          (item: { NameElement: { Firstname: string; Surname: string } }) => {
            return {
              ...item?.NameElement,
            };
          }
        )
      : state?.flightDetails?.prepareExchangeFlight?.Passengers?.map(
          (item: { NameElement: { Firstname: string; Surname: string } }) => {
            return {
              ...item?.NameElement,
            };
          }
        )
  );

  const [createTicket, setCreateTicket] = useState(true);

  useEffect(() => {
    if (router.query.status !== undefined) {
      dispatch(
        loader({
          show: true,
          name: 'payment',
        })
      );
      dispatch(setPaymentStatusData(String(router.query.status)));
      router.replace(router.pathname);
      setTimeout(() => {
        dispatch(
          loader({
            show: false,
            name: '',
          })
        );
      }, 5000);
    }
  }, [dispatch, router]);

  const PaymentSuccess = ({ code }: { code: number }) => {
    if (code === 2001 && createTicket) {
      dispatch(
        loader({
          show: true,
          name: 'payment',
        })
      );
      setCreateTicket(false);
      dispatch(
        postCreateTicket(
          {
            ID: modifySeat
              ? modifyBookingSeats?.PnrInformation?.PnrCode
              : !modifyData
              ? createBookingInfo?.PnrInformation?.PnrCode
              : createExchangeBookingInfo?.PnrInformation?.PnrCode,
            PassengerName: modifySeat
              ? passengerDetails &&
                passengerDetails?.length > 0 &&
                passengerDetails[0]
                ? passengerDetails[0]?.Surname
                : ''
              : !modifyData
              ? storedPassengerData &&
                storedPassengerData?.length > 0 &&
                storedPassengerData[0]
                ? storedPassengerData[0]?.Surname
                : ''
              : passengerDetails &&
                passengerDetails?.length > 0 &&
                passengerDetails[0]
              ? passengerDetails[0]?.Surname
              : '',
            Amount: modifySeat
              ? modifyBookingSeats?.Amount?.TotalAmount
              : !modifyData
              ? createBookingInfo?.Amount?.TotalAmount
              : createExchangeBookingInfo?.Amount?.TotalAmount,
          },
          router
        ) as unknown as AnyAction
      );
    }
    return (
      <Fragment>
        <div className='flex justify-center items-center h-screen '>
          <div className='text-2xl text-green ml-5 mr-3'>
            {code === 2001 ? (
              <div></div>
            ) : (
              <div>The payment has been successfully authorized.</div>
            )}
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <div>
      {!load?.show ? (
        <div>
          {paymentStatus?.length > 0 &&
            (paymentStatus === '2001' || paymentStatus === '2000') && (
              <PaymentSuccess code={Number(paymentStatus)} />
            )}
        </div>
      ) : (
        <PaymentGatewayLoader open={load?.show} />
      )}
    </div>
  );
};

export default PaymentProcess;
