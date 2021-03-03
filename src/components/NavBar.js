import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";

// import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const NavBar = (props) => {
    // const classes = useStyles();

    return(
        <AppBar className="nav-bar" display="flex" position="static">
            <Toolbar>
                <Grid justify="space-around" container spacing={24}>
                    <Grid item style={{width: "12%"}}>
                        <Link style={{color: "white", textDecoration: "None"}} to="/artists" color="inherit">
                            Artists
                        </Link>
                    </Grid>
                    <Grid item style={{width: "12%"}}>
                        <Link style={{color: "white", textDecoration: "None"}} to="/artists" color="inherit">
                            Artists
                        </Link>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;
