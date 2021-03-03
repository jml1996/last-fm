import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";

const NavBar = (props) => {

    return(
        <AppBar className="nav-bar" display="flex" position="static">
            <Toolbar>
                <Grid justify="space-around" container spacing={24}>
                    <Grid item style={{width: "12%"}}>
                        <Link style={{color: "white", textDecoration: "None"}} to="/artists" color="inherit">
                            Home
                        </Link>
                    </Grid>
                    <Grid item style={{width: "12%"}}>
                        <a 
                            href="https://www.last.fm/api#getting-started" 
                            target="_blank"
                            rel="noreferrer" 
                            style={{color: "white", textDecoration: "None"}}
                        >
                            About
                        </a>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;
