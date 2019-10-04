const express = require('express')
const Axios = require('axios');
const bodyParser = require('body-parser');
const FORGE_CLIENT_ID = "iWwu6lnUIafa5dkp3hIzBnzA2giXg38U";
const FORGE_CLIENT_SECRET = "8tDQKES6A6XXAJKy";


const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
const port = 3000;

const querystring = require('querystring');
var access_token = '';
var scopes = 'data:read data:write data:create bucket:create bucket:read';

app.get('/oauth', function (req, res) {
    Axios({
        method: 'POST',
        url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        data: querystring.stringify({
            client_id: FORGE_CLIENT_ID,
            client_secret: FORGE_CLIENT_SECRET,
            grant_type: 'client_credentials',
            scope: scopes
        })
    })
        .then(function (response) {
            // Success
            access_token = response.data.access_token;
            res.send(response.data)
        })
        .catch(function (error) {
            // Failed
            console.log(error);
            res.send('Failed to authenticate');
        });
});


const bucketKey = FORGE_CLIENT_ID.toLowerCase() + '_tutorial_bucket'; // Prefix with your ID so the bucket key is unique across all buckets on all other accounts
const policyKey = 'transient'; // Expires in 24hr

app.listen(port, () => {
    console.log('Example app listening on port ' + port + '!')
});

