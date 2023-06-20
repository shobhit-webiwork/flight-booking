import { combineReducers } from '@reduxjs/toolkit';

import loaderSlice from './Loader/index';
import passengerSlice from './PassengerDetails/index';
import flightDetailsSlice from './FlightDetails/index';
import airportDetailsSlice from './AirportDetails/index';

export const rootReducer = combineReducers({
  loader: loaderSlice,
  passenger: passengerSlice,
  flightDetails: flightDetailsSlice,
  airportDetails: airportDetailsSlice,
});
