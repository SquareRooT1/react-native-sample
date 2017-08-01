import { combineReducers } from 'redux';
import RouteReducer from './RouteReducer';
import SelectionReducer from './SelectionReducer';
import EndTimeReducer from './EndTimeReducer';
import TripListReducer from './TripListReducer';

export default combineReducers({
  routeList : RouteReducer,
  selectedRoute : SelectionReducer,
  endTime : EndTimeReducer,
  tripList : TripListReducer
});
