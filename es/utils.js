const client = require('./connection.js');

// client.indices.create({
//     index: 'movies_tes'
// }, function (err, resp, status) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(resp);
//     }
// });

// client.index({  
//     index: 'movies_tes',
//     id: "5af3c86ac12f0832e1ec1a88",
//     type: 'cinema',
//     body: {
// "belongs_to_collection": "{'id': 10194, 'name': 'Toy Story Collection', 'poster_path': '/7G9915LfUQ2lVfwMEEhDsn3kT4B.jpg', 'backdrop_path': '/9FBwqcd9IRruEDUrTdcaafOMKUq.jpg'}",
// "budget": 30000000,
// "genres": "[{'id': 16, 'name': 'Animation'}, {'id': 35, 'name': 'Comedy'}, {'id': 10751, 'name': 'Family'}]",
// "homepage": "http://toystory.disney.com/toy-story",
// "imdb_id": "tt0114709",
// "original_language": "en",
// "original_title": "Toy Story",
// "overview": "Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences.",
// "poster_path": "/rhIRbceoE9lR4veEXuwCC2wARtG.jpg",
// "production_companies": "[{'name': 'Pixar Animation Studios', 'id': 3}]",
// "production_countries": "[{'iso_3166_1': 'US', 'name': 'United States of America'}]",
// "release_date": "1995-10-30",
// "revenue": 373554033,
// "runtime": 81,
// "spoken_languages": "[{'iso_639_1': 'en', 'name': 'English'}]",
// "status": "Released",
// "title": "Toy Story",
// "vote_average": 7.7,
// "vote_count": 5415
//     }
//   },function(err,resp,status) {
//       console.log(resp);
//   });

// client.delete({  
//     index: 'movies',
//         id: "5af3c86ac12f0832e1ec1a88",
//         type: 'cinema',
//   },function(err,resp,status) {
//       console.log(resp);
//   });
// client.indices.getMapping({  
//     index: 'movies',
//     type: 'cinema',
//   },
// function (error,response) {  
//     if (error){
//       console.log(error.message);
//     }
//     else {
//       console.log("Mappings:\n",response.movies.mappings.cinema.properties);
//     }
// });


// client.count({ index: 'movies', type: 'cinema' }, function (err, resp, status) {
//     console.log(resp);
// });


// client.indices.putMapping({
//     index: 'movies',
//     type: 'imdb',
//     body: {

//         "properties": {
//             "belongs_to_collection": {
//                 "type": "text",
//                 "fields": {
//                     "text": {
//                         "type": "text",
//                         "analyzer": "simple"
//                     }
//                 }
//             },
//             "genres": {
//                 "type": "text",
//                 "fields": {
//                     "text": {
//                         "type": "text",
//                         "analyzer": "simple"
//                     }
//                 }
//             },
//             "homepage": {
//                 "type": "text",
//                 "fields": {
//                     "text": {
//                         "type": "text",
//                         "analyzer": "simple"
//                     }
//                 }
//             },
//             "imdb_id": {
//                 "type": "text",
//                 "fields": {
//                     "text": {
//                         "type": "text",
//                         "analyzer": "simple"
//                     }
//                 }
//             },
//             "original_language": {
//                 "type": "text",
//                 "fields": {
//                     "text": {
//                         "type": "text",
//                         "analyzer": "simple"
//                     }
//                 }
//             },
//             "original_title": {
//                 "type": "text",
//                 "fields": {
//                     "text": {
//                         "type": "text",
//                         "analyzer": "simple"
//                     }
//                 }
//             },
//             "overview": {
//                 "type": "text",
//                 "fields": {
//                     "text": {
//                         "type": "text",
//                         "analyzer": "simple"
//                     }
//                 }
//             },
//             "production_companies": {
//                 "type": "text",
//                 "fields": {
//                     "text": {
//                         "type": "text",
//                         "analyzer": "simple"
//                     }
//                 }
//             },
//             "production_countries": {
//                 "type": "text",
//                 "fields": {
//                     "text": {
//                         "type": "text",
//                         "analyzer": "simple"
//                     }
//                 }
//             },
//             "release_date": {
//                 "type": "date"
//             },
//             "spoken_languages": {
//                 "type": "text",
//                 "fields": {
//                     "text": {
//                         "type": "text",
//                         "analyzer": "simple"
//                     }
//                 }
//             },
//             "title": {
//                 "type": "text",
//                 "fields": {
//                     "text": {
//                         "type": "text",
//                         "analyzer": "simple"
//                     }
//                 }
//             }
//         }

//     }
// }, function (err, resp, status) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(resp);
//     }
// });

const fs = require('fs');

let rawdata = fs.readFileSync('../db/movies.json');
let data = JSON.parse(rawdata);

var bulk = [];

for (movie in data) {
    var datetime = new Date();
    data[movie].tstamp = datetime;
    let response = data[movie];
    bulk.push(
        { index: { _index: 'movies', _type: 'imdb', _id: response._id.$oid } },
        {
            "belongs_to_collection": response.belongs_to_collection,
            "genres": response.genres,
            "homepage": response.homepage,
            "imdb_id": response.imdb_id,
            "original_language": response.original_language,
            "original_title": response.original_title,
            "overview": response.overview,
            "production_companies": response.production_companies,
            "production_countries": response.production_countries,
            "release_date": response.release_date,
            "spoken_languages": response.spoken_languages,
            "title": response.title
        }
    );
}

fs.writeFileSync('../db/es.json',JSON.stringify(bulk));

client.bulk({
    index: 'movies',
    type: 'imdb',
    body: bulk
  },function(err,resp){
    if (err) {
      console.log(err);
    }
    else {
      console.log('items',resp.items.length);
      setTimeout(function() { console.log('Indexed '+resp.items.length+' items'); }, 2000);
    }
  })