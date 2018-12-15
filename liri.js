
// This code reads and sets any environment variables with the dotenv package
require('dotenv').config();

// Include these modules 
var util = require('util');
var fs = require('fs');
var request = require('request');
var moment = require('moment');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');

// Process arguments passed from the command line 
var inquiryType = process.argv[2]; 
var itemName = process.argv[3];


// START PROGRAM

processParams(inquiryType, itemName);

// FUNCTIONS
      
      function processParams(cmd, arg) {   

          switch (cmd){

                case "concert-this":
                      bandsInTown(arg);
                break;

                case "spotify-this-song":
                      spotifyFind(arg);
                break;

                case "movie-this":
                      omdbFind(arg);
                break;
                
                case "do-what-it-says":
                      randomRead();
                break;

                default:
                      logOutput('Missing or invalid arguments.')
          }
      }    


      function bandsInTown (arg) {
        
          var artist = arg;
          var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
        
          request(queryURL, function (error, response, body) {
              logOutput("\n--- Response from Bands In Town API ---\n");
              if (error) {
                  logOutput('error:', error);                                        // Print the error if one occurred
                  return logOutput('statusCode:', response && response.statusCode);  // Print the response status code if a response was received
              }
              var parsed = JSON.parse(body);
              logOutput(artist);
              for (var i=0; i < parsed.length; i++) {
                  logOutput('\nVenue Name: ' + parsed[i].venue.name);
                  logOutput('Venue Location: ' + parsed[i].venue.city + ", " + parsed[i].venue.region + ", " + parsed[i].venue.country);
                  logOutput('Date of Event: ' + moment(parsed[i].datetime).format('MM/DD/YYYY')  );
              };  
              logOutput("-----------------------------------\r\n");
          });
      }
        

      function spotifyFind (arg) {

          var song = arg;
          var spotify = new Spotify(keys.spotify);
          if(song) {
              var queryURL = {type: 'track', query: song, limit:1 };
          } else {
              var queryURL = {type: 'track', query: 'Ace+of+Base', limit:1 };  // default to "The Sign" by Ace of Base if no song title entered
          }  
            
          spotify
            .search(queryURL)
            .then(function(response) {
            //logOutput(util.inspect(response, false, null));
              logOutput("\n--- Response from Spotify API ---\n");
              logOutput("Artist:  " + response.tracks.items[0].artists[0].name);
              logOutput("Song:    " + response.tracks.items[0].name);
              logOutput("Album:   " + response.tracks.items[0].album.name);
              logOutput("Preview: " + response.tracks.items[0].artists[0].external_urls.spotify);
              logOutput("-----------------------------------\r\n");
            })
            .catch(function(err) {
              logOutput("spotify error: " + err);
            });
      }


      function omdbFind (arg) {

          var movie = arg;
          if (movie) {
              var queryURL = "http://www.omdbapi.com/?t=" + movie + "&plot=short&apikey=trilogy";  
          } else {
              var queryURL = "http://www.omdbapi.com/?t=Mr. Nobody&plot=short&apikey=trilogy";      // default to 'Mr. Nobody' if no movie title entered
          }
          
          request(queryURL, function (error, response, body) {
            
            logOutput("\n--- Response from OMDB API ---\n");
            
            if (error) {
            logOutput('error:', error);                                        // Print the error if one occurred
            return logOutput('statusCode:', response && response.statusCode);  // Print the response status code if a response was received
            }

            var parsed = JSON.parse(body);
            logOutput('Title: ' + parsed.Title);
            logOutput('Year: ' + parsed.Year);
            logOutput('IMDB Rating: ' + parsed.Ratings[0].Value);
            logOutput('Rotten Tomatoes Rating: ' + parsed.Ratings[1].Value);
            logOutput('Country:' + parsed.Country);
            logOutput('Language: ' + parsed.Language);
            logOutput('Plot: ' + parsed.Plot);
            logOutput('Actors: ' + parsed.Actors);
            logOutput("-----------------------------------\r\n");
          });
      }


      function randomRead () { 
          
          fs.readFile("random.txt", "utf8", function(err, data) {
          if (err) {
            return logOutput(err);
          }
          logOutput("\n=   Using random.txt   =\n");
          data = data.split(",");
          
         for (var i=0; i < data.length; i = i + 2) {
              inquiryType = data[i];
              itemName = data[i+1];
              processParams(inquiryType, itemName); 
          }    
      }); 
    }

    function logOutput(description) {
      console.log(description);
      appendFile(description + '\r\n');
    }
    
    
    function appendFile(arg) {
      fs.appendFile('log.txt', arg, function(err) {
        if (err) {
          logOutput(err);
        } else {}
      });
    }