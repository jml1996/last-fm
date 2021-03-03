import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import axios from "axios";
import TopAlbums from "./TopAlbums";
import lastFmBase from "../links";
import lastFmApiKey from "../keys";
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

function createMarkup(data) {
    return { __html: data };
}
  

function ArtistDetails(props){
    const [artist, setArtist] = useState({});
    const [artistImage, setArtistImage] = useState("");
    const [topAlbums, setTopAlbums] = useState([]);
    const artistName = props.match.params.id

    useEffect(() => {
        const artistInfoUrl =  `${lastFmBase}?method=artist.getinfo&artist=${artistName}&api_key=${lastFmApiKey}&format=json`
        axios
            .get(artistInfoUrl)
            .then(res => {
                const artistInfo = res.data.artist
                setArtist(artistInfo);
            })
            .catch(err => {
                console.log(err)
            })

        const artistTopAlbums = `${lastFmBase}?method=artist.gettopalbums&artist=${artistName}&api_key=${lastFmApiKey}&format=json`
        axios
            .get(artistTopAlbums)
            .then(res => {
                const topAlbumsArr = res.data.topalbums.album
                setTopAlbums(topAlbumsArr);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    
    useEffect(() => {
        console.log(artist.mbid)
        const url = `https://musicbrainz.org/ws/2/artist/${artist.mbid}?inc=url-rels&fmt=json`;
        axios
            .get(url)
            .then(res => {
                const relations = res.data.relations; 
                // see https://stackoverflow.com/questions/55978243/last-fm-api-returns-same-white-star-image-for-all-artists
                // and https://github.com/hugovk/now-playing-radiator/commit/e6de980db9da6846edc5aa2d2f7057b8f3b21bc8
                for (let i = 0; i < relations.length; i++) {
                    if (relations[i].type === 'image') {
                        let image_url = relations[i].url.resource;
                        if (image_url.startsWith('https://commons.wikimedia.org/wiki/File:')) {
                            const filename = image_url.substring(image_url.lastIndexOf('/') + 1);
                            image_url = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/' + filename;
                        }
                        setArtistImage(image_url);
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [artist])

    return(
        <StyledCardContainer>
            <Card>
                <h1 style={{textAlign: "center"}}>{artist.name}</h1>
                {
                    artistImage ?
                    <CardMedia 
                        component="img"
                        src={`${artistImage}`}
                        alt="artist image"
                    /> :
                    null
                }
                {
                    artist.bio ?
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: "left"}}>
                            <h2>Bio:</h2>
                            <p dangerouslySetInnerHTML={createMarkup(artist.bio.content)}></p>
                            {
                                topAlbums ?
                                topAlbums.map((album, i) => {
                                    return <TopAlbums
                                            index={i} 
                                            albumData={album} 
                                            artistName={artist.name} 
                                            />
                                })
                                : null
                            }
                            <b>Similar artists:<br /></b>{artist.similar.artist.slice(0, 3).map((similar, i) => {
                                return <a 
                                        href={similar.url} 
                                        rel="noreferrer" 
                                        target="_blank" 
                                        key={i}
                                        >{similar.name}<br />
                                        </a>
                            })}
                        </Typography>
                    </CardContent>
                    : null
                }
            </Card>
        </StyledCardContainer>
    )
}

export default ArtistDetails;

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
