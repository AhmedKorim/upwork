import Button from "@material-ui/core/Button/Button";
import React, {Component} from 'react';
import './App.scss';
import {connect} from "react-redux";
import {addFeed} from "../Store/feedsAction";

class App extends Component {
    componentDidMount() {
        const url = 'https://www.upwork.com/ab/feed/jobs/rss?subcategory2=web_development&q=react&sort=renew_time_int+desc&paging=0%3B10&api_params=1&securityToken=11503c7214e9ef98508b7c6f541e6a47dccb65710b611d2aabada454ef5afcf2d06bc9ace12aba5b24f886283f8eced3642e6ba04f13758f9b6acadb56b4ccef&userUid=941272037999767552&orgUid=941272038024933377';

        this.props.getFeed(url);
    }

    render() {
        return (
            
        );
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        getFeed: (url) => dispatch(addFeed(url))
    })
}
export default connect(null, mapDispatchToProps)(App);
