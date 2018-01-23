const express = require('express');
const request = require('request');
const crypto = require('crypto');

const app = express();

const serviceId = 'wellogy';
const serviceSecret = 'qe9XErbBkWjUh9dNKuzN18wJiwcBSUXC5toYNHJX74bOq3ima4aYaQFheWOO68O697O4d0fZzih26SQGyP7ZQmG3DQOqmfWhPQ8k';

app.use('/dist', express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/layouts/index.html');
});

app.get('/video', function (req, res) {
    res.sendFile(__dirname + '/layouts/video.html');
});

app.get('/home', function (req, res) {
    res.sendFile(__dirname + '/layouts/home.html');
});

app.get('/exercices', function (req, res) {
    res.sendFile(__dirname + '/layouts/exercices.html');
});

app.get('/article', function (req, res) {
    res.sendFile(__dirname + '/layouts/article.html');
});

app.get('/partage', function (req, res) {
    res.sendFile(__dirname + '/layouts/partage.html');
});

app.get('/service_token', function (req, response) {
    // the time needs to be in seconds
    var now = parseInt(new Date().getTime() / 1000);
    const signature = crypto.createHmac('sha256', serviceSecret).update(serviceId + String(now)).digest('base64');
    request({
        uri: 'https://api.workwell.io/1.0/developer/service/token',
        method: 'GET',
        headers: {
            'ww-service-signature': signature,
            'ww-timestamp': '' + now,
            'ww-service-id': serviceId
        }
    }, function (error, res, body) {
        response.send(JSON.parse(body));
    });
});

app.listen(process.env.PORT || 3030);