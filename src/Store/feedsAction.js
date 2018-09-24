import axios from "axios";
import {ADD_NEW_FEED} from "./ActionType";

export const getFeed = (url) => {
    console.log(url);
    return (dispatch, getState) => {
        const stateFeeds = getState().feedsData;
        axios.post('https://upwork-jobs.herokuapp.com/', {link: url})
            .then(({data: {link, feed}}) => {
                const isFeedExitsts = stateFeeds.feeds.find(({title}) => {
                    return title === feed.title;
                })
                if (!!isFeedExitsts) {
                    // feed is already added check updates
                } else {
                    console.log(stateFeeds);
                    dispatch({type: ADD_NEW_FEED, payload: {feed}});
                }

            }).catch(erro => alert('arr'))
    }
}

export const addFeed = (url) => {
    return (dispatch, getState) => {
        const stateFeeds = getState().feedsData;
        const localStrorageFeeds = JSON.parse(localStorage.getItem('feeds')) || [];
        axios.post('https://upwork-jobs.herokuapp.com/', {link: url})
            .then(({data: {link, feed}}) => {
                const isFeedExitsts = stateFeeds.feeds.find(({link}) => link === url);
                if (!!isFeedExitsts) {
                    // feed is already added alert
                    alert()
                } else {

                    dispatch({type: ADD_NEW_FEED, payload: {feed}});
                    localStorage.removeItem('feeds');
                    const allFeeds = localStrorageFeeds
                        .concat({title: feed.title, link: url});
                    console.log(feed);
                    localStorage.setItem('feeds', JSON.stringify(allFeeds))
                }
            })
            .catch(error => console.log(error))


    }

}

