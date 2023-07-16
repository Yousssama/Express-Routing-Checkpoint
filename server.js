const express = require('express');
const app = express();

// Custom middleware to verify the time of the request
const workingHoursMiddleware = (req, res, next) => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // Sunday is 0, Monday is 1, etc.
    const hour = now.getHours();

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
        // Continue to the next middleware or route handler
        next();
    } else {
        // Return an error page or redirect to a closed page
        res.status(403).send('<h1>Sorry, the website is only available during working hours (Monday to Friday, 9 to 17).</h1>');
    }
};


// Apply the custom middleware to all routes
app.use(workingHoursMiddleware);

// Serve static files from the "public" folder
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views');

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
