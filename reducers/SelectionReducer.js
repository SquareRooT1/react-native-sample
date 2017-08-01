
export default (state = [] ,action) => {
    switch (action.type) {
      case 'select_route':  
        return action.payload;
        break;
      default:
      return state;
    }
};
