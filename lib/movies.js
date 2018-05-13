const mongodb = require("mongodb");
const config = require('config');
const Boom = require('boom');
const client = mongodb.MongoClient;
const url = `mongodb://${config.get('databaseConfig.host')}:${config.get('databaseConfig.port')}/`; //create mongo url
let db, collection;
client.connect(url, function (err, client) {
    if (err) throw err
    db = client.db("movies");
    collection = db.collection("metadata"); //store the collection to local variable
});
exports.list = function () {
    if (Object.is(undefined, this.p))//if its page is undefined, make it as 1
        this.p = 1;
    return new Promise((resolve, reject) => {
        const cursor = collection.find({}).project({ "_id": true, "original_title": true, "poster_path": true, "spoken_languages": true, "genres": true }).sort({ $natural: 1 }).skip((parseInt(this.p) - 1) * 20).limit(20); // sort,skip first n and get the response
        return cursor.toArray(function (err, result) {
            if (err) {
                reject(Boom.badData(err));
            }
            resolve(result);
        });
    })
}
exports.get = function () {
    return new Promise((resolve, reject) => {
        const ObjectId = new mongodb.ObjectID(this.id);
        const query = { '_id': ObjectId };
        const cursor = collection.find(query).project({"adult": false, "id": false, "popularity": false, "tagline": false, "video": false}); //find the movie and return
        return cursor.toArray(function (err, result) {
            if (err) {
                reject(Boom.badData(err));
            }
            resolve(result);
        });
    })
}
exports.search = function () {
    return new Promise((resolve,reject) => {
        console.log(this.q)
        const query = { $text: { $search: this.q } };
        const cursor = collection.find(query).project({"adult": false, "id": false, "popularity": false, "tagline": false, "video": false});
        return cursor.toArray(function (err,result) {
            if (err) {
                reject(Boom.badData(err));
            }
            resolve(result);
        })
    })
}