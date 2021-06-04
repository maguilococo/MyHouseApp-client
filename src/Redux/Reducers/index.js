// actipon types
import {
  AVAILABLE_PROPERTIES,
  GET_AVAILABLE_FILTERED_PROPERTIES,
  GET_SEARCHED_POST,
  GET_ADMIN_DATA,
  GET_USER_DATA,
  GET_PANEL_FILTERED_PROPERTIES,
  ORDER_BY,
  EDIT_USER,
  DELETE_USER,
  GET_POST,
  EDIT_POST,
  DELETE_POST,
  GET_BOOKING,
  EDIT_BOOKING,
  DELETE_BOOKING,
  GET_ADMIN_USERS_DATA,
  CHANGE_URL,
  USER_SESSION,
  ADD_LOCATION,
  FILTERS,
} from '../Actions/types';

const initialState = {
  panelAdmin: { render: { posts: [], visitDates: [] } },
  panelUser: { render: { posts: [], visitDates: [] } },
  url: '',
  principal: [],
  count: '',
  searched: '',
  orderProp: '',
  orderType: '',
  currentPage: '',
  selfEndpoint: '',
  message: '',
  detail: {},
  session: {},
  location: {},
  filters: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
  case USER_SESSION:
    return {
      ...state,
      session: action.payload
    }
  case AVAILABLE_PROPERTIES:
    return {
      ...state,
      principal: action.payload.posts,
      count: action.payload.count,
      currentPage: action.payload.currentPage,
      selfEndpoint: action.payload.selfEndpoint,
    };
  case GET_AVAILABLE_FILTERED_PROPERTIES:
    return {
      ...state,
      principal: action.payload.posts,
      count: action.payload.count,
      currentPage: action.payload.currentPage,
      selfEndpoint: action.payload.selfEndpoint,
    };
  case GET_SEARCHED_POST:
    return {
      ...state,
      searched: action.payload,
    };
  case ORDER_BY:
    return {
      ...state,
      orderProp: action.payload.prop,
      orderType: action.payload.type,
    };
  case GET_ADMIN_DATA:
    return {
      ...state,
      panelAdmin: {
        ...state.panelAdmin,
        render: action.payload,
        count: action.payload.count,
        currentPage: action.payload.currentPage,
        selfEndpoint: action.payload.selfEndpoint,
      },
    };
  case GET_ADMIN_USERS_DATA:
    return {
      ...state,
      panelAdmin: {
        ...state.panelAdmin,
        render: action.payload,
        count: action.payload.count,
        currentPage: action.payload.currentPage,
        selfEndpoint: action.payload.selfEndpoint,
      },
    };
  case GET_USER_DATA:
    return {
      ...state,
      panelUser: {
        ...state.panelUser,
        render: action.payload,
        count: action.payload.count,
        currentPage: action.payload.currentPage,
        selfEndpoint: action.payload.selfEndpoint,
      },
    };
  case GET_PANEL_FILTERED_PROPERTIES:
    return {
      ...state,
      renderPanel: {
        ...state.panelAdmin,
        render: action.payload.posts,
        count: action.payload.count,
        currentPage: action.payload.currentPage,
        selfEndpoint: action.payload.selfEndpoint,
      },
    };
  case GET_POST:
    return {
      ...state,
      detail: action.payload,
    };
  case EDIT_POST:
    return {
      ...state,
      message: action.payload,
    };
  case DELETE_POST:
    return {
      ...state,
      message: action.payload,
    };
  case EDIT_USER:
    return {
      ...state,
      message: action.payload,
    };
  case DELETE_USER:
    return {
      ...state,
      message: action.payload,
    };
  case GET_BOOKING:
    return {
      ...state,
      detail: action.payload,
    };
  case EDIT_BOOKING:
    return {
      ...state,
      message: action.payload,
    };
  case DELETE_BOOKING:
    return {
      ...state,
      message: action.payload,
    };
  case CHANGE_URL:
    return {
      ...state,
      url: action.payload,
    };
  case ADD_LOCATION:
    return {
      ...state,
      location: action.payload
    }
  case FILTERS:
    return {
      ...state,
      filters: action.payload
    }
  default:
    return state;
  }
}
