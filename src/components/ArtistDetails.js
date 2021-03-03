import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import history from "../history";

// name
// rank
// image.small/medium/large/extralarge/mega.#text/size
// mbid
// streamable
// url


function Artist(props){
    const [toggle, setToggle] = useState(false);
    const { artistData, artistTracksListeners } = props;
    // console.log(artistData)
// onClick={() => props.history.push(`/artist/${artistData.mbid}`)}
    return(
        <StyledCardContainer>
            <Card onClick={() => history.push(`artist/${artistData.name}`)}>

            </Card>
        </StyledCardContainer>
    )
}

export default Artist;

const StyledCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    img {
        width: 80%;
        display:block;
        margin:auto;
        padding-top: 5%;
    }
`;

