import {
  START_LOADER,
  STOP_LOADER,
  QUERY_RESPONSE
  } from "../Constants";
  
  export default (state = { isloading: true }, action) => {
    switch (action.type) {
        case START_LOADER:
          return {
            ...state,
            isloading: true,
          };
        case STOP_LOADER:
          return {
            ...state,
            isloading: false,
          };      
      case QUERY_RESPONSE:
        return {
          ...state,
          query_response: action.payload,
        };      
      default:
        return state;
    }
  };
  