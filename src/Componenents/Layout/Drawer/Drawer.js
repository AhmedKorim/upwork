import {withStyles} from "@material-ui/core";
import Divider from "@material-ui/core/Divider/Divider";
import Drawer from "@material-ui/core/Drawer/Drawer";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Typography from "@material-ui/core/Typography/Typography";
import React from 'react'
import {connect} from "react-redux";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appFrame: {
        height: 440,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    'appBar-left': {
        marginLeft: drawerWidth,
    },
    'appBar-right': {
        marginRight: drawerWidth,
    },
    drawerPaper: {
        position: 'fixed',
        height: '100vh',
        border: 'none !important',
        boxShadow: theme.shadows[2],
        width: drawerWidth,
    },
    typography: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#ffe",
        textTransform: 'capitalize'
    },
    toolbar: {
        ...theme.mixins.toolbar,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});


const DrawerCom = props => {

    const {classes, showFeed} = props;
    const feeds = JSON.parse(localStorage.getItem('feeds')) || [];

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar}>
                <Typography className={classes.typography} component="h3" variant="subheading">
                    all job feeds
                </Typography></div>
            <Divider/>
            <List component="ul">
                {feeds.map((feed, index, {length}) => <div>
                    <ListItem key={feed.title} button onClick={() => showFeed(feed.title)} component="li">
                        {feed.title}
                    </ListItem>
                    {(index > 1 && index < length) && <Divider/>}
                </div>)}
            </List>
        </Drawer>
    )
}
const mapStateToPorps = state => {
    return {
        feeds: state.feedsData.feeds
    }
};
export default connect(mapStateToPorps)(withStyles(styles)(DrawerCom));