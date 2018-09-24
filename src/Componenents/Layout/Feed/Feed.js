import {withStyles} from "@material-ui/core";
import Chip from "@material-ui/core/Chip/Chip";
import Collapse from "@material-ui/core/Collapse/Collapse";
import Fade from "@material-ui/core/Fade/Fade";
import Grid from "@material-ui/core/Grid/Grid";
import Grow from "@material-ui/core/Grow/Grow";
import Paper from "@material-ui/core/Paper/Paper";
import Slide from "@material-ui/core/Slide/Slide";
import Typography from "@material-ui/core/Typography/Typography";
import React, {Component} from 'react'

const styles = theme => ({
    paper: {
        cursor: 'pointer',
        margin: ".3rem",
        padding: '1rem',
        borderRadius: '0 !important'
    },
    skill: {
        margin: '.14rem .3rem'
    },
    skillsContainer: {
        margin: '.3rem 0'
    },
    skillChip: {
        fontSize: '.65rem',
        minHeight: 'unset',
        height: 'auto',
        padding: '.1rem',

    }
})

class FeedItem extends Component {
    state = {
        extended: false
    }

    goto = (link) => {
        window.open(link);
    }
    extend = (extended) => {
        if (this.state.extended === extended) return;
        this.setState({extended})

    }


    render() {
        const {
            title,
            link,
            classes,
            pubDate,
            content,
        } = this.props;

        const budgetText = content.split('<b>Budget</b>:')[1];
        const countryText = content.split('<b>Country</b>:')[1];
        const SkillsText = content.split('<b>Skills</b>:')[1];

        // const budget =
        const paymentShadow = budgetText ? budgetText.substr(0, budgetText.indexOf('<br')) : 'hourly';
        const country = countryText ? countryText.substr(0, countryText.indexOf('<br')) : 'unknown';
        const skills = SkillsText ? SkillsText.substr(0, SkillsText.indexOf('<br')).split(',') : [];
        const _pubdate = new Date(pubDate);
        const dateAgo = ((new Date().getTime() - _pubdate.getTime()) / (60 * 1000)) - 60 - _pubdate.getTimezoneOffset();
        const DateToPrint = dateAgo > 120 ? `${(dateAgo / 60).toFixed(2)} H ago` : `${dateAgo.toFixed(0)}Min ago`;
        return (

            <Paper onClick={() => this.goto(link)} className={classes.paper} onMouseOver={() => this.extend(true)} onMouseLeave={() => this.extend(false)}>
                <Grid container>
                    <Grid item container justify="space-between">
                        <Grid item xs={10}><Typography variant="subheading" component="h3" className={classes.title}>{title}</Typography></Grid>
                        <Grid item xs>{DateToPrint}</Grid>
                        <Grid xs={12}/>
                        <Grid item xs><Typography variant="body2" component="span"> <b>{paymentShadow}</b> || <i><b>{country}</b></i>
                            <Grid item xs container justify="flex-start" className={classes.skillsContainer}>
                                {skills && skills.map(skill => <Grid key={skill} className={classes.skill}>
                                    <Chip className={classes.skillChip} key={skill} label={skill} color="primary"/>
                                </Grid>)}
                            </Grid>
                            <Collapse timeout={200} in={this.state.extended} mountOnEnter unmountOnExit>
                                <Fade style={{transitionDelay: this.state.extended ? 150 : 0}} timeout={350} in={this.state.extended} mountOnEnter>
                                    <Typography variant="body1" component="article">
                                        <div dangerouslySetInnerHTML={{__html: content}}/>
                                    </Typography>
                                </Fade>
                            </Collapse>
                        </Typography></Grid>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(FeedItem)