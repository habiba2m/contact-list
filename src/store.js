import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  isLoading: false,
  isError: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "setContacts":
      return {
        ...state,
        contacts: action.payload,
        isLoading: false,
        isError: false,
      };
    case "fetchingContacts":
      return {
        ...state,
        isLoading: true,
      };
    case "errorFetchingContacts":
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case "addContacts":
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case "editContacts":
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.login.uuid === action.payload.login.uuid
            ? action.payload
            : contact
        ),
      };

    default:
      return state;
  }
}

export function fetchContacts() {
  return async function (dispatch) {
    try {
      dispatch({
        type: "fetchingContacts",
      });
      const res = await fetch("https://randomuser.me/api/?results=50");
      const data = await res.json();
      dispatch({
        type: "setContacts",
        payload: data.results,
      });
    } catch (error) {
      dispatch({
        type: "errorFetchingContacts",
      });
    }
  };
}

export function addContact(contact) {
  return {
    type: "addContacts",
    payload: contact,
  };
}

export function editContact(contact) {
  return {
    type: "editContacts",
    payload: contact,
  };
}

const store = configureStore({
  reducer,
});
export default store;
