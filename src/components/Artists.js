import React, { useState, useEffect } from "react";
import Artist from "./Artist";
import lastFmApiKey from "../keys";
import axios from 'axios';
import { TextField } from "@material-ui/core";

const lastFmBase = "http://ws.audioscrobbler.com/2.0/";

const initialFormValues = {
    searchVal: ""
}
const initialTags = []

function Artists() {
    const [artists, setArtists] = useState([]);
    const [artistsTracksListeners, setArtistsTracksListeners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [allTags, setAllTags] = useState(initialTags);
    const [searchTag, setSearchTag] = useState("");

    useEffect(() => {
        const getTopTags = `${lastFmBase}?method=tag.getTopTags&api_key=${lastFmApiKey}&format=json`
        axios
            .get(getTopTags)
            .then(res => {
                const topTagsArray = res.data.toptags.tag
                setAllTags(topTagsArray)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        setLoading(true)
        const artistsByTag = `${lastFmBase}?method=tag.gettopartists&tag=${searchTag}&api_key=${lastFmApiKey}&format=json`
        axios
            .get(artistsByTag)
            .then(res => {
                const topArtists = res.data.topartists.artist
                setArtists(topArtists)
            })
            .catch(err => {
                console.log(err)
            })
    }, [searchTag])

    useEffect(() => {
        Promise.all(artists.map((artist, index) => {
            const topTracks = `${lastFmBase}?method=artist.gettoptracks&artist=${artist.name}&api_key=${lastFmApiKey}&format=json`
            return axios
                .get(topTracks)
                .then(res => {
                    return res
                })
        }))
            .then(res => {
                const artistAndTracks = res.slice(0, 10).map((item, index) => {
                    let listenersCount = 0
                    const tracknames = item.data.toptracks.track.map((track, index) => {
                        listenersCount += parseInt(track.listeners)
                        return track.name
                    })
                    return {
                        artist: `${item.data.toptracks["@attr"].artist}`,
                        toptracks: tracknames,
                        listeners: listenersCount
                    }
                })
                setArtistsTracksListeners(artistAndTracks);
                setLoading(false);
            })
            .catch(e => {
                console.log(e)
            })
    }, [artists])

    const search = evt => {
        // evt.preventDefault()
        // setArtists([]);
        // setLoading(true)
        // const yelpApi = `https://api.yelp.com/v3/businesses/search?term=${"parking lot"}&location=${formValues.searchVal}`
        // const proxyUrl = "https://cors-anywhere.herokuapp.com/"

        // const options = {
        //     method: 'GET',
        //     headers: {
        //         "Authorization": `Bearer ${yelpApiKey}`,
        //         "Cookie": "__cfduid=db290300ecfe95ec1fe3bc92c388c3c991586618117",
        //         "Access-Control-Allow-Origin": "*"
        //     },
        //     redirect: 'follow'
        // };
        // fetch(proxyUrl + yelpApi, options)
        // .then(response => {
        //     return response.text()
        // })
        // .then(result => {
        //     setLoading(false)
        //     const res = JSON.parse(result)
        //     setArtists(res.businesses);
        // })
        // .catch(err => {
        //     setLoading(false)
        //     console.log(err)
        // });
    }

    const submit = () => {
        setLoading(true);
        const getTopTags = `http://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=${lastFmApiKey}&format=json`
        axios
            .get(getTopTags)
            .then(res => {
                setLoading(false)
                const topTagsArray = res.data.toptags.tag
                setAllTags(topTagsArray)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }
  
    const handleChange = (event) => {
        setSearchTag(event.target.value);
    };

    return (
        <div style={{ textAlign: "center", marginBottom:0 }}>
            <h2>Search Top Artists</h2>
            <form>
                <label> Filter by genre: {' '}
                    <select onChange={handleChange}>
                        <option value={null}>None</option>
                        {
                            allTags.map((x,y) => {
                                return <option key={y}>{x.name}</option>
                            })
                        }
                    </select>
                </label>
            </form>
            <br />
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    artists.map((artistData, id) => {
                        const thisArtist = artistsTracksListeners.find(v => v.artist === artistData.name)  
                        if (thisArtist) {  
                            return <Artist 
                                key={id} 
                                artistData={artistData}
                                artistTracksListeners={thisArtist}
                            />
                        }
                    })
                )
            }
        </div>
    );
}

export default Artists;