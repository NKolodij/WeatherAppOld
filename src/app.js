let path = require('path');
let express = require('express');
let hbs = require('hbs');

let app = express();

// website 
// will contain the following routes
// app.com - home page
// app.com/help - help page
// app.com/about - about page

// app takes two arguments
// 1. route
// 2. function for when the route is accessed
	// a. req - request - information about the incoming request to the server
	// b. res - response - information about the outgoing response from the server

let publicDirectory = path.join(__dirname, '../public');
let viewsDirectory = path.join(__dirname, '../templates/views');
let partialsDirectory = path.join(__dirname, '../templates/partials');

// implement hbs by using app.set()
app.set('view engine', 'hbs');
app.set('views', viewsDirectory); // sets the path of the custom directory (templates/views folder)
hbs.registerPartials(partialsDirectory); // sets the part of the partials for hbs to use


// points to the public directory where index.html currently lives
app.use(express.static(publicDirectory));

// home route - / or ''
app.get('', (req, res) => {
	// tell what happens when the route is accessed.
	res.render('index',
		{
			title: 'Home Page',
			name: 'Nick Kolodij',
			course: 'CSC 174'
		}
	); // renders the dynamic index template
});

// about route - /about
app.get('/about', (req, res) => {
	// tell what happens when the about route is accessed.
	res.render('about', 
	{
		title: 'About Page',
		name: 'Nick Kolodij',
		course: 'CSC 174'
	}
	);
});

// help route - /help
app.get('/help', (req, res) => {
	// tell what happens when the route help route is accessed.
	res.render('help', 
		{
			title: 'Help Page',
			helpText: 'This is some helpful text from the help page',
			name: 'Nick Kolodij',
			course: 'CSC 174'
		}
	);
});

// weather route - /weather
app.get('/weather', (req, res) => {
	// tell what happens when the weather route is accessed.
	res.send("You have reached the weather page");
});

app.get('/help/*', (req, res) => {
	res.render('4042', {
		error: 'Page not found',
		errorType: '404 Help Article Error',
		name: 'Nick Kolodij',
		course: 'CSC 174'
	});
});

app.get('*', (req, res) => {
	//res.send("404 Error Page");
	res.render('4041', {
		error: 'Page not found',
		errorType: '404 Error',
		name: 'Nick Kolodij',
		course: 'CSC 174'
	});
});

// use app.listen to start up the server
// takes at least one parameter - tells the port number where the application
// will be served. port 3000 is a common development port for local machines
//app.listen(3000);

// add a function as an argument which can tell what happens when
// the server is loaded
app.listen(3000, () =>{
	console.log('Server is live on port 3000. ');
	console.log('Open your web browser and go to the folling URL - localhost:3000');
	console.log('To exit, come back to Node.js command prompt and enter Ctrl+C');
	
});