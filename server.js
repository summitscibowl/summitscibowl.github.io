const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

app.use((req, res) => {
    console.log(req.url);

    // secure the backend code so it can't be accessed by the frontend
    if (req.url === '/server.js') {
        res.redirect('/');
    } else if (req.url.substr(-3) === '.js') {
        res.sendFile(__dirname + '/static/' + req.url);
    } else if (req.url.substr(-4) === '.css') {
        res.sendFile(__dirname + '/static/' + req.url);
    } else if (req.url.substr(-4) === '.png') {
        res.sendFile(__dirname + '/static/' + req.url);
    } else if (req.url.substr(-5) !== '.html') {
        res.sendFile(__dirname + '/static/' + req.url + '.html');
    } else {
        res.redirect(req.url.slice(0, -5));
    }
});

server.listen(port, () => {
    console.log(`listening at port=${port}`);
});