import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/src/redux/store';
import { setPaymentStatusData } from '@/src/redux/reducer/FlightDetails';

const PaymentCancel = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const paymentStatus = useSelector(
    (state: RootState) => state?.flightDetails?.paymentStatus
  );

  useEffect(() => {
    if (router.query.status !== undefined) {
      dispatch(setPaymentStatusData(String(router.query.status)));
      router.replace(router.pathname);
    }
  }, [dispatch, router]);

  const PaymentFailed = ({ code }: { code: number }) => {
    return (
      <Fragment>
        <div className='flex justify-center items-center h-screen'>
          <div>
            <div className='text-xl text-orange flex justify-center mb-5 ml-5 mr-2'>
              {code === 1014 ? (
                <div>Payment Pending</div>
              ) : code === 2002 ? (
                <div>The payment was cancelled.</div>
              ) : code === 2010 ? (
                <div>The payment was rejected by the PSP or Acquirer.</div>
              ) : code === 2011 ? (
                <div>
                  The payment was declined by PSP / Acquirer while performing
                  capture.
                </div>
              ) : code === 2016 ? (
                <div>3D Verification Failed</div>
              ) : code === 2017 ? (
                <div>
                  Authorization not attempted after successful 3D verification
                  due to rule matched.
                </div>
              ) : code === 3010 ? (
                <div>Pre-Fraud Check Initiated.</div>
              ) : code === 3011 ? (
                <div>
                  The pre-auth fraud check was “accepted” and no further fraud
                  screening will be done.
                </div>
              ) : code === 3012 ? (
                <div>System error from fraud check service.</div>
              ) : code === 3013 ? (
                <div>An unknown error.</div>
              ) : code === 3014 ? (
                <div>The fraud check was REVIEW.</div>
              ) : code === 3015 ? (
                <div>
                  The pre-auth fraud check service was in REJECTED and no
                  further payment processing will be done.
                </div>
              ) : code === 3016 ? (
                <div>Pre-screening connection failed rejected.</div>
              ) : code === 3100 ? (
                <div>Post fraud check required.</div>
              ) : code === 3111 ? (
                <div>The post-auth fraud check was ACCEPTED.</div>
              ) : code === 3112 ? (
                <div>
                  System error from fraud check service and therefore, manual
                  review will be required.
                </div>
              ) : code === 3113 ? (
                <div>This state indicates an unknown error.</div>
              ) : code === 3114 ? (
                <div>
                  The fraud check was REVIEW and hence manual Review will be
                  required.
                </div>
              ) : code === 3115 ? (
                <div>
                  The fraud check was REJECTED. The payment will be refunded or
                  cancelled.
                </div>
              ) : code === 3116 ? (
                <div>
                  Velocity could not connect to fraud check service and
                  therefore, manual review will be required. The payment will
                  not be refunded or cancelled.
                </div>
              ) : code === 5000 ? (
                <div>The validation failed.</div>
              ) : (
                <div>Something went wrong please try again.</div>
              )}
            </div>
            {code !== 1041 && (
              <div className='flex justify-center'>
                <button
                  className='xl:w-full xs:justify-center text-white bg-aqua focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-black text-lg rounded-lg  inline-flex items-center px-5 py-2 text-center '
                  onClick={() => router.push('/reviewtrip')}
                >
                  Review Trip and Pay Again
                </button>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <div>
      <PaymentFailed code={Number(paymentStatus)} />
    </div>
  );
};

export default PaymentCancel;
