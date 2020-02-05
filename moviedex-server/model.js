let mongoose = require('mongoose');
let uuid = require('uuid');

mongoose.Promise = global.Promise;

/* Tu código va aquí */
let Movie = mongoose.Schema({
    film_ID: {
        type: uuid()
    },
    film_title: {
        type: String
    },
    year: {
        type: Number
    },
    rating: {
        type: Number
    }
});

let movies = mongoose.model('moviedex', Movie);

let MovieList = {
    getAll: function () {
        return movies.find()
            .then((allMovies) => {
                return allMovies;
            })
            .catch((error) => {
                throw Error(error);
            });
    },
    addMovie: function (newMovie) {
        return movies.create(newMovie)
            .then((movieAdded) => {
                return movieAdded;
            })
            .catch((error) => {
                throw Error(error);
            });
    }
}



module.exports = {
    MovieList
};