import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

const styles = {
    menuIcon: {
        marginLeft: 20,
        marginRight: -12
    },
    title: {
        flexGrow: 1
    },
    list: {
        width: 250,
    }
};

class TopNavBar extends Component {

    state = {
        drawer: false
    };

    toggleDrawer = (open) => () => {
        this.setState({
            drawer: open
        });
    };

    render() {
        const { classes } = this.props;

        const navList = (
            <div className={classes.list}>
                <List>
                    <ListItem button key="scouting" component={Link} to="scouting" onClick={this.toggleDrawer(false)}>
                        <ListItemText primary="סקאוטינג" />
                    </ListItem>
                    <ListItem button key="pit" component={Link} to="pit" onClick={this.toggleDrawer(false)}>
                        <ListItemText primary="סקאוטינג פיט" />
                    </ListItem>
                    <ListItem button key="testers" component={Link} to="testers" onClick={this.toggleDrawer(false)}>
                        <ListItemText primary="סקאוטינג בוחנים" />
                    </ListItem>
                    <Divider />
                    <ListItem button key="summary" component={Link} to="summary" onClick={this.toggleDrawer(false)}>
                        <ListItemText primary="סיכום" />
                    </ListItem>
                    <ListItem button key="testersummary" component={Link} to="testersummary" onClick={this.toggleDrawer(false)}>
                        <ListItemText primary="סיכום בוחנים" />
                    </ListItem>
                    <ListItem button key="leaderboard" component={Link} to="leaderboard" onClick={this.toggleDrawer(false)}>
                        <ListItemText primary="טבלת הסקאוטרים" />
                    </ListItem>
                </List>
            </div>
        );

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuIcon} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.title}>
                            {this.props.barTitle}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Drawer open={this.state.drawer} onClose={this.toggleDrawer(false)}>
                    {navList}
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(TopNavBar);