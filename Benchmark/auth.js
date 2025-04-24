const https = require('https');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.json');
exports.configPath = configPath;
let cachedToken = null;

function readConfig() {
    const rawData = fs.readFileSync(configPath);
    return JSON.parse(rawData);
}

async function getAccessToken() {
    // Return cached token if available
    if (cachedToken) {
        return cachedToken;
    }

    const config = readConfig();

    const postData = querystring.stringify({
        grant_type: 'password',
        client_id: config.client_id,
        client_secret: config.client_secret,
        username: config.username,
        password: config.password
    });

    const options = {
        hostname: config.login_url.replace(/^https?:\/\//, ''),
        path: '/services/oauth2/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.access_token && parsed.instance_url) {
                        cachedToken = {
                            accessToken: parsed.access_token,
                            instanceUrl: parsed.instance_url
                        };
                        console.log('New token fetched!');
                        resolve(cachedToken);
                    } else {
                        reject('Missing token in response');
                    }
                } catch {
                    reject('Error parsing token response');
                }
            });
        });

        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

module.exports = { getAccessToken };
