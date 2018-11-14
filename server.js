const express = require('express');
const request = require('request')
const hbs = require('hbs');
const weather = require('./weather.js');
const fetch = require('node-fetch')
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partial');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/img'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('getCurrentTime', () => {
	return new Date().toString();
})

hbs.registerHelper('getWeather', () => {
	var temp = fetch('https://jsonplaceholder.typicode.com/photos/1')
	    .then(response => response.json())
	    .then(json => console.log(json.url));
})

app.use((request, response, next) => {
	var time = new Date().toString();
	//console.log(`${time}: ${request.method} ${request.url}`);
	var log = `${time}: ${request.method} ${request.url}`;
	fs.appendFile('server.log', log + '\n', (error) => {
		if (error) {
			console.log('Unable to log message');
		}
	});
	response.render('maint.hbs', {
		title: 'Error'
	});
});

app.get('/', (request, response) => {
	response.render('home.hbs', {
		title: 'Home Page'
	});
});

app.get('/info', (request, response) => {
	response.render('about.hbs', {
		title: 'About Page'
	});
});


app.get('/weather', (request, response) => {
	response.render('weather.hbs', {
		title: 'Weather Page'
	});
});


app.get('/404', (request, response) => {
	response.send({
		error: 'Page not found'
	})
});

app.listen(8080, () => {
	console.log('Server is up on the port 8080');
});