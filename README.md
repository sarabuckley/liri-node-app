# liri-node-app

LIRI is a simple app that allows the user to get information on movies, songs or bands. The name is a riff on SIRI and while it is not quite up there with the Apple product, it is a good way to play around with node.js, javascript, npm and various APIs.

LIRI accepts four commands and will output the resulting data both to the screen and to a log.txt file.

The expected commands are as follows:

<ol>
<li> node liri.js concert-this (artist/band name here)</li>
</ol>
<ul>
<li>This will search the Bands in Town Artist Events API for an artist and give the following information about each event to the terminal.
<ul>
    <li>   Name of the venue
    <li>   Venue location
    <li>   Date of the Event (use moment to format this as "MM/DD/YYYY")
</ul>
</li>
</ul>
2.  node liri.js spotify-this-song (song name here)

-   This will show the following information about the song in your terminal/bash window
    
    -   Artist(s)
    -   The song's name
    -   The album that the song is from
    - A preview link of the song from Spotify
-   If no song is provided then your program will default to "The Sign" by Ace of Base.
    

3.  node liri.js movie-this <movie/name/here>
    
    -   Title of the movie.
    -   Year the movie came out.
    -   IMDB Rating of the movie.
    -   Rotten Tomatoes Rating of the movie.
    -   Country where the movie was produced.
    -   Language of the movie.
    -   Plot of the movie.
    -   Actors in the movie.

-   This will output the following information to your terminal/bash window:
-   If no movie title is provided, the program will output data for the movie 'Mr. Nobody.'


4.  node liri.js do-what-it-says

-   Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call LIRI's commands.
-   It will run spotify-this-song for "I Want it That Way," as well as one movie and one band.
-   Feel free to change the text in that document to produce different results.

