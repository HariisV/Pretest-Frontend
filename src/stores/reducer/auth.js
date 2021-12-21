const initialState = {
  userLogin: {},
  isLoading: false,
  isError: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case "LOGIN_FULFILLED": {
      console.log("SUKSES =>>>>>>>>", action.payload);
      return {
        ...state,
        isLoading: false,
        isError: false,
        userLogin: action.payload.data.user,
      };
    }
    case "LOGIN_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default login;
