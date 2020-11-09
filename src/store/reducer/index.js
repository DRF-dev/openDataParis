const initState = {
  message: 'Search a service',
  data: {},
};

const reducer = (state = initState, action) => {
  let nextState;
  switch (action.type) {
    case 'data':
      nextState = {
        message: action.data.message,
        data: action.data.data,
      };
      return nextState;
    default:
      return state;
  }
};

export default reducer;
