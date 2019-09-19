import { DELETE_USER, USER_ERROR } from "../Types";

export default (state, action) => {
  switch (action.type) {
    case DELETE_USER:
      return {
        ...state,
        user: state.contacts.filter(contact => contact._id !== action.payload),
        loading: false
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
