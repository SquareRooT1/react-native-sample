export const selectRoute = (data) => {
    return {
      type : 'select_route',
      payload : data
    };
};

export const setEndTime = (data) => {
    return {
      type : 'set_endTime',
      payload : data
    };
};

export const addOldTrip = (data) => {
    return {
      type : 'add_OldTrip',
      payload : data
    }
}
export const removeOldTrip = (index) => {
    return {
      type: 'remove_OldTrip',
      payload: index
    }
}
