const MailReducer = (state, action) => {
  switch (action.type) {
    case "GET_MAILS_START":
      return {
        mails: [],
        isFetching: true,
        error: false,
      };
    case "GET_MAILS_SUCCESS":
      return {
        mails: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_MAILS_FAILURE":
      return {
        mails: [],
        isFetching: false,
        error: true,
      };
    case "GET_MAIL_START":
      return {
        mails: [],
        isFetching: true,
        error: false,
      };
    case "GET_MAIL_SUCCESS":
      return {
        mails: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_MAIL_FAILURE":
      return {
        mails: [],
        isFetching: false,
        error: true,
      };
    case "DELETE_MAIL_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_MAIL_SUCCESS":
      return {
        mails: state.mails.filter((mail) => mail._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_MAIL_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default MailReducer;
