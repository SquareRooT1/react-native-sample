import { REHYDRATE } from 'redux-persist/constants';


export default (state = [] ,action) => {
    switch (action.type) {
    case REHYDRATE:
     return action.payload.tripList || [];
      case 'add_OldTrip':
        return [action.payload, ...state];
        break;
      case 'remove_OldTrip':
        return [...state.slice(0,parseInt(action.payload)),
        ...state.slice(parseInt(action.payload)+1)];
        break;
      case 'remove_AllTrips':
        return [];
        break;
      default:
      return state;
    }
};
