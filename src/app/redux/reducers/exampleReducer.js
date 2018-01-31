import actionTypes from '../actions/actionTypes';

const DEFAULT_STATE = {
    token: false,
};

const authReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case actionTypes.EXAMPLE_ACTION_SUCCESS: {
            return {
                ...state,
                token: action.payload,
            };
        }
        case actionTypes.EXAMPLE_ACTION_FAILED: {
            return {
                ...state,
                token: false,
            };
        }
        default: {
            return state;
        }
    }
};

export default authReducer;
