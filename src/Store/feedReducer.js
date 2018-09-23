import {ADD_NEW_FEED} from "./ActionType";

const reFetchInterval = 30
const initialState = {
    feeds: [
     /*   {
            title: "",
            link: "",
            reFetch: reFetchInterval,
            pubDate: "",
            image: {
                title: "",
                url: "",
                link: ""
            },
            items: [],

        },*/
    ]
};
const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_FEED:
            return {
                ...state,
                feeds: [...state.feeds, action.payload.feed]
            };
        default:
            return state;

    }
};

export default feedReducer;