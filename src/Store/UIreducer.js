import {TOGGLE_DIALOG} from "./ActionType";

const initialState = {
    dialog: {open: false}
};
const UIreducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_DIALOG :
            return {
                ...state,
                dialog: {
                    ...state.dialog,
                    open: action.payload.open
                }
            }
        default:
            return state;

    }
};


export default UIreducer;