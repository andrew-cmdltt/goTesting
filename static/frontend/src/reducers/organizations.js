import {ADD_ORGANIZATION, DELETE_ORGANIZATION, GET_ORGANIZATIONS} from '../actions/types.js'
import {EDIT_ORGANIZATION, SEARCH_ORGANIZATIONS} from "../actions/types";
import {editState} from "../utils/editState";

const initialState = {
    organizations: [],
    addOrganizationErrors: {},
    updateOrganizationErrors: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ORGANIZATIONS:
            return {
                ...state,
                organizations: action.payload
            }
        case ADD_ORGANIZATION:
            if (!action.payload.nelementkey) {
                return {
                    ...state,
                    addOrganizationErrors: action.payload,
                }
            } else {
                return {
                    ...state,
                    organizations: [...state.organizations, action.payload],
                    addOrganizationErrors: {}
                }
            }

        case DELETE_ORGANIZATION:
            return {
                ...state,
                organizations: state.organizations.filter((organization) => organization.nelementkey !== action.payload)

            }
        case EDIT_ORGANIZATION:
            if (!action.payload.nelementkey) {
                return {
                    ...state,
                    updateOrganizationErrors: action.payload,
                }
            } else {
                editState(state.organizations, 'nelementkey', action.payload.nelementkey, action.payload)
                return {
                    ...state,
                    organizations: [...state.organizations],
                    updateOrganizationErrors: {},
                }
            }

        case SEARCH_ORGANIZATIONS:
            return {
                ...state,
                organizations: action.payload
            }
        default:
            return state;

    }
}