const client = require('./connection.js');

// client.cluster.health({}, function (err, resp, status) {
//     console.log(resp);
// });
// client.count({index: 'movies',type: 'cinema'},function(err,resp,status) {  
//     console.log(resp);
//   });
client.indices.delete({
    index: 'movies_tes'
}, function(err, res) {

    if (err) {
        console.error(err.message);
    } else {
        console.log('Indexes have been deleted!');
    }
});