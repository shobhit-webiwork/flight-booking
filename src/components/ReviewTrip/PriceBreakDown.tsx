const PriceBreakDown = (props: {
  baseAmount: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  passengerCount: number;
}) => {
  const { currency, baseAmount, taxAmount, totalAmount, passengerCount } =
    props;
  return (
    <div>
      <div className='bg-purpal p-4 rounded-bl-2xl rounded-br-2xl'>
        <h1 className='font-black text-base black text-black'>
          Price Breakdown
        </h1>
        <div className='flex justify-between py-1'>
          <p className='font-medium text-xs text-pearlgray'>
            Bliss Ticket x{passengerCount}
          </p>
          <p className='font-medium text-xs text-pearlgray'>
            {(currency ? currency : '') + ' ' + (baseAmount ? baseAmount : '')}
          </p>
        </div>
        <div className='flex justify-between py-1'>
          <p className='font-medium text-xs text-pearlgray'>
            Seat Upgrade x{passengerCount}
          </p>
          <p className='font-medium text-xs text-pearlgray'>0</p>
        </div>
        <div className='flex justify-between py-1'>
          <p className='font-medium text-xs text-pearlgray'>Taxes & Charges</p>
          <p className='font-medium text-xs text-pearlgray'>
            {(currency ? currency : '') + ' ' + (taxAmount ? taxAmount : '')}
          </p>
        </div>
        <div className='flex justify-between py-1'>
          <p className='font-black text-sm text-black'>Total Price</p>
          <p className='font-black text-sm text-black'>
            {(currency ? currency : '') +
              ' ' +
              (totalAmount ? totalAmount : '')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakDown;
