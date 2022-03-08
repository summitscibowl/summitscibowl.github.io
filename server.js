const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

app.use((req, res) => {
    // secure the backend code so it can't be accessed by the frontend
    if (req.url === '/server.js') {
        res.redirect('/');
    } else if (req.url === '/index') {
        res.redirect('/');
    } else if (req.url.substr(-3) === '.js') {
        res.sendFile(__dirname + '/static/' + req.url);
    } else if (req.url.substr(-4) === '.css') {
        res.sendFile(__dirname + '/static/' + req.url);
    } else if (req.url.substr(-4) === '.png' || req.url.substr(-4) === '.jpg') {
        res.sendFile(__dirname + '/static/images/' + req.url);
    } else if (req.url.substr(-5) !== '.html') { // remove '.html' from the end of the url
        res.sendFile(__dirname + '/static/' + req.url + '.html');
    } else if (!req.url.includes('?')) { 
        res.redirect(req.url.slice(0, -5));
    }
});

app.use((err, req, res, next) => {
    if (err.status === 404) {
        console.log('404: could not find ' + req.url);
        res.sendFile(__dirname + '/static/404.html');
    } else {
        next(err);
    }
});

server.listen(port, () => {
    console.log(`listening at port=${port}`);
});