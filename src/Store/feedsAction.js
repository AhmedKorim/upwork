import RSSParser from 'rss-parser';
import {ADD_NEW_FEED} from "./ActionType";

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
export const getFeed = (urlArr, index = 0) => {
    return (dispatch, getState) => {
        const stateFeeds = getState().feedsData;
        const parser = new RSSParser();
        const url = urlArr[index];
        console.log(urlArr[index], index);
        parser.parseURL(CORS_PROXY + url.link, (err, feed) => {
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
                    if (!(urlArr.length === index + 1) && urlArr.length >= index) {

                        getFeed(urlArr, index + 1)
                    }
                }
            }
        })
    }
}
export const addFeed = (url) => {
    return (dispatch, getState) => {
        const stateFeeds = getState().feedsData;
        const parser = new RSSParser();
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
                    const allFeeds = stateFeeds.feeds.concat(feed).reduce((acc, {title}) => [...acc, {link: url, title}], []);
                    localStorage.setItem('feeds', JSON.stringify(allFeeds))
                }
            }

        })

    }

}

