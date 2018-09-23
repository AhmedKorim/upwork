import AppBar from "@material-ui/core/AppBar/AppBar";
import Button from "@material-ui/core/Button/Button";
import Icon from "@material-ui/core/Icon/Icon";
import RootRef from "@material-ui/core/RootRef/RootRef";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography/Typography";
import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import EnhancedTabs from "../Componenents/UI/EnhancedTabs/EnhancedTabs";
import {getFeed} from "../Store/feedsAction";
import DrawerCom from '../Componenents/Layout/Drawer/Drawer';
import './App.scss';

class App extends Component {
    componentDidMount() {
        const url = 'https://www.upwork.com/ab/feed/jobs/rss?subcategory2=web_development&q=react&sort=renew_time_int+desc&paging=0%3B10&api_params=1&securityToken=11503c7214e9ef98508b7c6f541e6a47dccb65710b611d2aabada454ef5afcf2d06bc9ace12aba5b24f886283f8eced3642e6ba04f13758f9b6acadb56b4ccef&userUid=941272037999767552&orgUid=941272038024933377';
        this.props.getFeed(url);
        if (!this.header) return;
        this.headerHeight = window.getComputedStyle(this.header).height;
    }

    render() {
        return (
            <Fragment>
                <RootRef rootRef={(node) => this.header = node}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="display3" component="h1"
                                        className="mainHeader">{"upwork job tracker"}</Typography>
                        </Toolbar>
                    </AppBar>
                </RootRef>
                <div style={{height: `calc(100vh - ${this.headerHeight ? this.headerHeight : 120}px)`}}>
                    <aside>
                        <DrawerCom/>
                    </aside>
                    <main>
                        <div>
                            <EnhancedTabs
                                disableRouting
                                paddges={[{label: 'all jobs', count: 5, icon: 'compared'},
                                    {label: 'all unread', count: 6, icon: 'favourite'},
                                ]}
                            >
                                <div>all</div>
                                <div>read</div>
                            </EnhancedTabs>
                        </div>
                    </main>
                </div>
                <div className="FloatActionButtonWrapper">
                    <Tooltip title="add new job feed">
                        <Button variant="fab" color="primary" onClick={void 0} className="newReviewFap"><Icon>add</Icon></Button>
                    </Tooltip>
                </div>
                <RDialog/>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        getFeed: (url) => dispatch(getFeed(url))
    });
};
export default connect(null, mapDispatchToProps)(App);
