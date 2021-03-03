import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import axios from "axios";
import lastFmBase from "../links";
import lastFmApiKey from "../keys";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';


function TopAlbums(props){
    const [toggle, setToggle] = useState(false)
    const [albumInfo, setAlbumInfo] = useState({});
    const { albumData, index, artistName } = props

    useEffect(() => {
        
        const albumInfoUrl = `${lastFmBase}?method=album.getinfo&api_key=${lastFmApiKey}&artist=${artistName}&album=${albumData.name}&format=json`
        axios
            .get(albumInfoUrl)
            .then(res => {
                const albumMoreDetails = res.data.album
                setAlbumInfo(albumMoreDetails);
            })
            .catch(err => {
                console.log(err.message)
            })    
    }, [])

    return(
        <StyledCardContainer>
            <Card onClick={() => setToggle(!toggle)}>
                {
                    toggle ?
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: "left"}}>
                            <h4>{index + 1}.{' '} <em>{albumData.name}</em></h4>
                            <img src={albumInfo.image[2]['#text']} alt="album" />
                            <p><b>Play count:{' '}</b>{albumInfo.playcount}</p>
                            {
                                albumInfo.wiki ?
                                <p><b>Release date:{' '}</b>{albumInfo.wiki.published}</p>
                                : null
                            }
                            <p><b>Tags:</b></p>
                            {
                                albumInfo.tags ?
                                albumInfo.tags.tag.map((tag, i) => {
                                    return <p>{tag.name}</p>
                                })
                                : null
                            }
                        </Typography>
                    </CardContent>
                    :
                    <h4>{index + 1}.{' '} <em>{albumData.name}</em></h4>
                }
            </Card>
        </StyledCardContainer>
    )
}

export default TopAlbums;

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
