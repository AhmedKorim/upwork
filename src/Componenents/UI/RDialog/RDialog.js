import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Grid from "@material-ui/core/Grid/Grid";
import Icon from "@material-ui/core/Icon/Icon";
import Slide from "@material-ui/core/Slide/Slide";
import TextField from "@material-ui/core/TextField/TextField";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import React from 'react';
import './dialog.scss';
import {connect} from "react-redux";
import {TOGGLE_DIALOG} from "../../../Store/ActionType";
import {addFeed} from "../../../Store/feedsAction";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class RDialog extends React.Component {
    state = {
        value: ''
    }
    handleClose = () => {
        this.props.close();
    }
    onChange = ({target: {value}}) => {
        console.log(value);
        this.setState({value});
    }


    render() {
        const {
            props: {
                open,
                addFeed
            },
            state: {
                value
            },
            onChange
        } = this;
        return (
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                fullWidth={true}
                maxWidth={false}
                className="dialog"
                PaperProps={{
                    classes: {
                        root: 'paperViable'
                    }
                }}
            >
                <div className="dialogWrapper">
                    <Tooltip title='close dialog'>
                        <Button variant="fab" color="secondary" className="dialogFloatButton" onClick={this.handleClose}>
                            <Icon>close</Icon>
                        </Button>
                    </Tooltip>
                    <div className="dialogContent">
                        <Grid alignItems="center" container className="feedInputContainer">
                            <TextField
                                onChange={onChange}
                                className="input"
                                name="feed-url"
                                type="text"
                                placeholder="Enter Feed URL here"
                                label="feed URL"
                            />
                            <Button mini className="feedButton"
                                    onClick={() => addFeed(value)}
                                    variant="raised" color="primary">
                                <Icon>rss_feed</Icon>
                            </Button>
                        </Grid>
                    </div>
                </div>
            </Dialog>

        )
    }
}

const mapStateToProps = state => {
    return {
        open: state.UI.dialog.open,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        close: () => dispatch({type: TOGGLE_DIALOG, payload: {open: false}}),
        addFeed: (url) => dispatch(addFeed(url))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RDialog);