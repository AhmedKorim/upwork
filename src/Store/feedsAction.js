import RSSParser from 'rss-parser';
import {ADD_NEW_FEED} from "./ActionType";

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
export const getFeed = (url) => {

    return (dispatch, getState) => {
        const stateFeeds = getState().feedsData;
        const parser = new RSSParser();
        parser.parseURL(CORS_PROXY + url, (err, feed) => {
            if (err) {
                // dispatch() error
            } else {
                const isFeedExitsts = stateFeeds.feeds.find(({title}) => {
                    return title === feed.title;
                });
                if (!!isFeedExitsts) {
                    // feed is already added check updates
                } else {
                    dispatch({type: ADD_NEW_FEED, payload: {feed}});
                }
            }
        })
    }
}
export const addFeed = (url) => {
    return (dispatch, getState) => {
        const stateFeeds = getState().feedsData;
        const parser = new RSSParser();
        const localStrorageFeeds = JSON.parse(localStorage.getItem('feeds')) || [];
        parser.parseURL(CORS_PROXY + url, (err, feed) => {
            if (err) {
                // dispatch() error
            } else {
                console.log(feed);
                const isFeedExitsts = stateFeeds.feeds.find(({link}) => link === url);
                if (!!isFeedExitsts) {
                    // feed is already added alert
                    alert()
                } else {
                    dispatch({type: ADD_NEW_FEED, payload: {feed}});
                    localStorage.removeItem('feeds');
                    const allFeeds = localStrorageFeeds
                        .concat({title: feed.title, link: url})
                    console.log(allFeeds);
                    localStorage.setItem('feeds', JSON.stringify(allFeeds))
                }
            }

        })

    }

}

