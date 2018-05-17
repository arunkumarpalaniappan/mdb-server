var elasticsearch=require('elasticsearch');

var client = new elasticsearch.Client( {  
  hosts:'http://connect.arunkumarpalaniappan.me:3457/'
});

module.exports = client; 