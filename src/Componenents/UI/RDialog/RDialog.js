import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Icon from "@material-ui/core/Icon/Icon";
import Slide from "@material-ui/core/Slide/Slide";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import React from 'react';
import './dialog.scss';
import {connect} from "react-redux";
import {TOGGLE_DIALOG} from "../../../Store/ActionType";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class RDialog extends React.Component {
    handleClose = () => {
        this.props.close();
    }

    render() {
        const {
            props: {
                open
            }
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
        close: () => dispatch({type: TOGGLE_DIALOG, payload: {open: false}})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RDialog);