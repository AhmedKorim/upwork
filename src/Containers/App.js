import AppBar from "@material-ui/core/AppBar/AppBar";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import Grow from "@material-ui/core/Grow/Grow";
import Icon from "@material-ui/core/Icon/Icon";
import RootRef from "@material-ui/core/RootRef/RootRef";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography/Typography";
import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import DrawerCom from '../Componenents/Layout/Drawer/Drawer';
import FeedItem from "../Componenents/Layout/Feed/Feed";
import EnhancedTabs from "../Componenents/UI/EnhancedTabs/EnhancedTabs";
import RDialog from "../Componenents/UI/RDialog/RDialog";
import {TOGGLE_DIALOG} from "../Store/ActionType";
import {getFeed} from "../Store/feedsAction";
import './App.scss';
import PerfectScrollbar from 'react-perfect-scrollbar';

class App extends Component {
    constructor(props) {
        super(props);
        console.log(props.feeds);
        this.state = {
            slide: 0,
            activeFeed: props.feeds.length > 0 ? props.feeds[0].title : null
        }
    }

    showFeed = activeFeed => {
        this.setState({activeFeed})
    }

    componentWillUpdate(nextProps) {
        if ((nextProps.feeds.length !== this.props.feeds.length) && !this.state.activeFeed) {
            this.setState({activeFeed: nextProps.feeds[0].title})
        }

    }

    componentDidMount() {
        const feeds = localStorage.getItem('feeds');
        if (feeds) {
            const feedJson = JSON.parse(feeds);
            console.log(feedJson);
            feedJson.forEach((feed) => {
                this.props.getFeed(feed.link)
            })

        }
        if (!this.header) return;
        this.headerHeight = window.getComputedStyle(this.header).height;
    }

    openAll = () => {
        if (this.props.feeds) {
            this.props.feeds[this.state.FeedIndex].items.forEach(({link}) => setTimeout(window.open(link), 100));
        }
    }

    getActiveSlide = (value) => {
        this.setState({slide: value})
    };


    render() {
        const activeFeed = this.props
            .feeds.find(feed => { return feed.title === this.state.activeFeed;});
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
                        <DrawerCom showFeed={this.showFeed}/>
                    </aside>
                    <main style={{height: '100%'}}>
                        <div>
                            <EnhancedTabs
                                toolbarClasses={['toolbarRelative']}
                                disableRouting
                                cast={this.getActiveSlide}
                                paddges={[{label: 'all unread', count: 6, icon: 'favourite'},
                                    {label: 'all jobs', count: 5, icon: 'compared'},

                                ]}
                            >
                                <PerfectScrollbar>
                                    <div style={{height: '80vh'}}>
                                        <Grid justify="center" container alignItems="center">
                                            {activeFeed && activeFeed.items.map(feed => <Grid item xs={11}>
                                                <FeedItem {...feed}/>
                                            </Grid>)}
                                        </Grid>
                                    </div>
                                </PerfectScrollbar>
                                <div>all</div>
                            </EnhancedTabs>
                        </div>
                    </main>
                </div>
                <div className="FloatActionButtonWrapper">
                    <Tooltip title="add new job feed">
                        <Button variant="fab" color="primary" onClick={this.props.openDialog} className="newReviewFap"><Icon>add</Icon></Button>
                    </Tooltip>
                </div>
                <Grow in={this.state.slide == 0} unmountOnExit mountOnEnter
                      timeout={500}>
                    <Button onClick={this.openAll} className="openAllFeeds" color="secondary" variant="raised">OPEN ALL
                        unread</Button>
                </Grow>
                <RDialog/>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        getFeed: (url) => dispatch(getFeed(url)),
        openDialog: () => dispatch({type: TOGGLE_DIALOG, payload: {open: true}})
    });
};
const mapStateToProps = state => ({
    feeds: state.feedsData.feeds
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
