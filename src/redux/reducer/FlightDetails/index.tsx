import { createSlice } from '@reduxjs/toolkit';

const initalState = {
  findBooking: [],
  chooseSeats: [],
  searchFlight: [],
  paymentForm: '',
  reviewFlight: [],
  cancelFlight: [],
  prepareFlight: [],
  createBooking: [],
  modifyBooking: [],
  paymentStatus: '',
  modifyData: false,
  modifySeat: false,
  selectedFlight: [],
  prepareFlightRef: [],
  modifyBookingSeats: [],
  prepareCancelFlight: [],
  exchangeCreateBooking: [],
  prepareExchangeFlight: [],
  originToDestinationDates: [],
  destinationToOriginDates: [],
  prepareBookingModification: [],
  selectedFlightCodesWithDate: [],
};

const flightDetailsSlice = createSlice({
  name: 'flightDetails',
  initialState: initalState,
  reducers: {
    setModifySeat: (state, action) => {
      state.modifySeat = action.payload;
    },
    setModifyData: (state, action) => {
      state.modifyData = action.payload;
    },
    setChooseSeatData: (state, action) => {
      state.chooseSeats = action.payload;
    },
    setPaymentFormData: (state, action) => {
      state.paymentForm = action.payload;
    },
    setFindBookingData: (state, action) => {
      state.findBooking = action.payload;
    },
    setCancelFlightData: (state, action) => {
      state.cancelFlight = action.payload;
    },
    setSearchFlightData: (state, action) => {
      state.searchFlight = action.payload;
    },
    setPrepareFlightRef: (state, action) => {
      state.prepareFlightRef = action.payload;
    },
    setReviewFlightData: (state, action) => {
      state.reviewFlight = action.payload;
    },
    setPaymentStatusData: (state, action) => {
      state.paymentStatus = action.payload;
    },
    setModifyBookingData: (state, action) => {
      state.modifyBooking = action.payload;
    },
    setPrepareFlightData: (state, action) => {
      state.prepareFlight = action.payload;
    },
    setCreateBookingData: (state, action) => {
      state.createBooking = action.payload;
    },
    setSelectedFlightData: (state, action) => {
      state.selectedFlight = action.payload;
    },
    setModifyBookingSeatsData: (state, action) => {
      state.modifyBookingSeats = action.payload;
    },
    setPrepareCancelFlightData: (state, action) => {
      state.prepareCancelFlight = action.payload;
    },
    setOriginToDestinationDates: (state, action) => {
      state.originToDestinationDates = action.payload;
    },
    setDestinationToOriginDates: (state, action) => {
      state.destinationToOriginDates = action.payload;
    },
    setExchangeCreateBookingData: (state, action) => {
      state.exchangeCreateBooking = action.payload;
    },
    setPrepareExchangeFlightData: (state, action) => {
      state.prepareExchangeFlight = action.payload;
    },
    setSelectedFlightCodesWithDate: (state, action) => {
      state.selectedFlightCodesWithDate = action.payload;
    },
    setPrepareBookingModificationData: (state, action) => {
      state.prepareBookingModification = action.payload;
    },
  },
});

export const {
  setModifyData,
  setModifySeat,
  setChooseSeatData,
  setPaymentFormData,
  setFindBookingData,
  setSearchFlightData,
  setCancelFlightData,
  setReviewFlightData,
  setPrepareFlightRef,
  setPaymentStatusData,
  setPrepareFlightData,
  setCreateBookingData,
  setModifyBookingData,
  setSelectedFlightData,
  setModifyBookingSeatsData,
  setPrepareCancelFlightData,
  setOriginToDestinationDates,
  setDestinationToOriginDates,
  setPrepareExchangeFlightData,
  setExchangeCreateBookingData,
  setSelectedFlightCodesWithDate,
  setPrepareBookingModificationData,
} = flightDetailsSlice.actions;
export default flightDetailsSlice.reducer;
