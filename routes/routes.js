const movies = require("../controllers/movies");
module.exports = [
    {
        path: '/movies',
        method: 'GET',
        config: {
            handler: movies.list,
            auth: false
        }
    },
    {
        path: '/movies/{id}',
        method: 'GET',
        config: {
            handler: movies.get,
            auth: false
        }
    }
];