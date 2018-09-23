import RSSParser from 'rss-parser';
import {ADD_NEW_FEED} from "./ActionType";

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
export const addFeed = (url) => {
    return (dispatch, getState) => {
        const stateFeeds = getState().feedsData;
        const parser = new RSSParser({});
        parser.parseURL(CORS_PROXY + url, (err, feed) => {
            if (err) {
                // dispatch() error
            } else {
                const isFeedExitsts = stateFeeds.feeds.find(({title}) => title === feed.title);
                if (!!isFeedExitsts) {
                    // feed is already added
                } else {
                    dispatch({type: ADD_NEW_FEED, payload: {feed}})
                }
            }
        })
    }
}