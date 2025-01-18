const express = require('express')
const router = express.Router()
const User = require('../models/User')
const dotenv = require('dotenv')
const axios = require('axios')
dotenv.config();
let accessToken = null;
let tokenExpiration = null;

const fetchSpotifyToken = async () => {
    const clientID = process.env.CLIENT_ID, clientSecret = process.env.CLIENT_SECRET;
    try {
        const authString = Buffer.from(`${clientID}:${clientSecret}`).toString('base64');
        const token = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
            grant_type: 'client_credentials'
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${authString}`
            }
        })
        accessToken = token.data.access_token;
        tokenExpiration = Date.now() + (token.data.expires_in * 1000);
    } catch (error) {
        console.error('error in retrieving access token', error)
    }
}
const getAccessToken = async () => {
    if(!accessToken || Date.now() >= tokenExpiration) {
        await fetchSpotifyToken();
    }
    return accessToken;
}
const getUserQuery = async (query) => {
    try {
        const usersFound = await User.find({username: { $regex: query, $options: 'i'}})
        if(usersFound){
            const filteredFound = usersFound.map((user) => ({username: user.username, id: user.userId}))
            return filteredFound
        }
        return usersFound;
    } catch (error) {
        console.log('error trying to search for users', error)
    }
}

router.get('/search', async (request, response) => {
    const type = request.query.type, query = request.query.query
    try {
        if(type == 'users'){
            const data = await getUserQuery(query);
            console.log(data)
            return response.status(200).send(data);
        }
        const token = await getAccessToken();
        const searchResponse = await axios.get('https://api.spotify.com/v1/search', {
            params: {
                q: query,
                type: 'album'
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = searchResponse.data.albums.items
        return response.status(200).send(data)
    } catch (error) {
        console.error('Error fetching albums', error)
        return response.status(500).send('Server Error')
    }
})
router.get('/albumdetails', async (request, response) => {
    const albumID = request.query.albumId
    
    const token = await getAccessToken();
    try {
        const searchResponse = await axios.get(`https://api.spotify.com/v1/albums/${albumID}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = searchResponse.data
        return response.status(200).send(data)
    }
    catch (error) {
        console.error('Error fetching album tracklist', error);
        return response.status(500).send('Server Error')
    }
})

router.post('/add', async (request, response) => {
    const username = request.body.username, id = request.body.albumId, rating = request.body.rating, date = request.body.date;
    try {
        console.log(username, id)
        if(rating !== null){
            console.log('rated', rating);
            const user = await User.findOneAndUpdate(
                {username: username},
                {$addToSet: { albums: {albumId: id, rating: rating, date: date}}},
                {new: true}
            )
            return response.status(200).send(user)
        }
        const user = await User.findOneAndUpdate(
            {username: username},
            {$addToSet: { albums: {albumId: id, date: date}}},
            {new: true}
        )
        return response.status(200).send(user)
    } catch (error) {
        console.error(error)
        return response.status(500).send('Server Error')
    }
})
router.get('/getAlbums', async (request, response) => {
    const username = request.query.username, id = request.query.id;
    try {
        const albumData = await User.findOne({userId: id })
        console.log(albumData);
        if(albumData){
            const albumId = albumData.albums;
            const albumNoRatings = []
            const albumWithRatings = []
            for(let album of albumId){
                if(album.rating === undefined){
                    albumNoRatings.push(album)
                }
                else{
                    albumWithRatings.push(album)
                }
            }
            const albumSorted = {unrated: albumNoRatings, rated: albumWithRatings};
            return response.status(200).send(albumSorted)
        }
    } catch (error) {
        console.error(error)
        return response.status(500).send('Server Error')
    }
})


module.exports = router