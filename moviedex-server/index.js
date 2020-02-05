let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let jsonParser = bodyParser.json();
let {
	DATABASE_URL,
	PORT
} = require('./config');

let app = express();
let {
	MovieList
} = require('./model');

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
	if (req.method === "OPTIONS") {
		return res.send(204);
	}
	next();
});

/* Tu código va aquí */
app.get('/api/moviedex', (req, res) => {
	return MovieList.getAll().then((allMovies) => {
		return res.status(200).json(allMovies);
	});
});

app.post('/api/moviedex', jsonParser, (req, res) => {
	let newMovie = req.body;
	if (isBlank(newMovie.film_title) || isBlank(newMovie.year) || isBlank(newMovie.rating)) {
		return res.status(406).send('Campos de pelicula vacios.');
	} else {
		MovieList.addMovie(newMovie)
			.then((newMovie) => {
				return res.status(201).json(newMovie);
			})
			.catch((error) => {
				return res.status(400).send('DB error: ' + error);
			});
	}
});

let server;

function runServer(port, databaseUrl) {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}, response => {
			if (response) {
				return reject(response);
			} else {
				server = app.listen(port, () => {
						console.log("App is running on port " + port);
						resolve();
					})
					.on('error', err => {
						mongoose.disconnect();
						return reject(err);
					})
			}
		});
	});
}

function closeServer() {
	return mongoose.disconnect()
		.then(() => {
			return new Promise((resolve, reject) => {
				console.log('Closing the server');
				server.close(err => {
					if (err) {
						return reject(err);
					} else {
						resolve();
					}
				});
			});
		});
}
runServer(PORT, DATABASE_URL);

module.exports = {
	app,
	runServer,
	closeServer
}

function isBlank(param) {
	if (param == null || param == undefined || param == '' || param == ' ') {
		return true;
	} else {
		return false;
	}
}