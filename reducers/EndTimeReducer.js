export default (state = [] ,action) => {
    switch (action.type) {
      case 'set_endTime':
        return action.payload;
        break;
      default:
      return state;
    }
};
