const express = require('express');
const request = require('request');
const querystring = require('querystring');
const url = require('url');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/:type', (req, res, next) => {
    console.log(req.params)
    console.log('https://bbb.fs.ei.tum.de/bigbluebutton/api/' + req.url.slice(1).replace('/', ''))
    request(
        {url: 'https://bbb.fs.ei.tum.de/bigbluebutton/api/' + req.url.slice(1).replace('/', '')},
        (error, response, body) => {
            if(error || response.statusCode !==200) {
                console.log("shit...")
            }
            res.send(body)
        }
    )
})

const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));