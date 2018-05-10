## Movies DB - Node

### API

`/movies` - `GET` - `Authentication : false`

returns array of first 20 movies
##### Response Contains  `_id,original_title,poster_path,spoken_languages`
###### For next set, add ?p=2 and so on to the request URL
###### Eg: `/movies?p=3`

`/movies/{_id}` - `GET` - `Authentication : false`

return array contains movie details
##### Response Contains `_id,belongs_to_collection,budget,genres,homepage,imdb_id,original_language,original_title,overview,poster_path,production_companies,production_countries,release_date,revenue,runtime,spoken_languages,status,title,vote_average,vote_count`


### Database

Database Name: `movies`

Collection Name: `metadata`
## Movies DB - Node

### API

`/movies` - `GET` - `Authentication : false`

returns array of first 20 movies
##### Response Contains  `_id,original_title,poster_path,spoken_languages`
###### For next set, add ?p=2 and so on to the request URL
###### Eg: `/movies?p=3`

`/movies/{_id}` - `GET` - `Authentication : false`

return array contains movie details
##### Response Contains `_id,belongs_to_collection,budget,genres,homepage,imdb_id,original_language,original_title,overview,poster_path,production_companies,production_countries,release_date,revenue,runtime,spoken_languages,status,title,vote_average,vote_count`


### Database

Database Name: `movies`

Collection Name: `metadata`

### Dataset - IMDB Movies Collection from 2006 to 2016 with movies poster
