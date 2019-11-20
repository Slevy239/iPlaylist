


var Spotify = require('./node_modules/node-spotify-api');



var spotify = new Spotify(Keys.spotify);


spotify 

        .search({ type: 'track', query: searchStrSpotify })
        
        .then(function(response) {

            var artistName = response.tracks.items[0].artists[0].name;
            var songName = response.tracks.items[0].name;
            var songLink = response.tracks.items[0].external_urls.spotify;
            var albumLink = response.tracks.items[0].album.external_urls.spotify;

            console.log('\n');
            console.log('-------------------------------------------------');
            console.log(' Artist: ' + artistName.toUpperCase());
            console.log('-------------------------------------------------');
            console.log('  Song: ' + songName);
            console.log('  Link to song: ' + songLink);
            console.log('  Link to album: ' + albumLink);
            console.log('\n');

            
        })