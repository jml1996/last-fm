import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import history from "../history";


function Artist(props){
    const [toggle, setToggle] = useState(false);
    const { artistData, artistTracksListeners  } = props;

    return(
        <StyledCardContainer>
            <Card>
                <CardActionArea>
                    {
                        artistData.image.large ?
                        <CardMedia 
                            component="img"
                            src={`${artistData.image.large['#text']}`}
                            alt="artist image"
                            style={{ maxWidth: 400 }}
                        /> :
                        null
                    }
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            <span onClick={() => history.push(`artistdetails/${artistData.name}`)}>
                                { artistData.name }
                            </span>
                            <span onClick={() => setToggle(!toggle)} style={{float: "right"}}>{!toggle ? String.fromCharCode(8964) : String.fromCharCode(8963)}</span> 
                        </Typography>
                        <Typography variant="body">Listeners: {artistTracksListeners.listeners}</Typography>
                        {
                            toggle ?
                            <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: "left"}}>
                                <h3>Top Songs</h3>
                                {
                                    artistTracksListeners.toptracks.map((v, i) => {
                                    return <p key={i}><b>{i+1}.</b>"{v}"</p>
                                    })
                                }
                            </Typography>
                            :
                            null
                        }
                    </CardContent>
                </CardActionArea>
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