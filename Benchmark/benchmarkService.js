const https = require('https');
const { getAccessToken } = require('./auth');
const stats = require('./BenchmarkStats');
const fs = require('fs');
const path = require('path');

const payloadPath = path.join(__dirname, 'payload.json');
exports.payloadPath = payloadPath;

function readPayload() {
    const rawData = fs.readFileSync(payloadPath);
    return JSON.parse(rawData);
}

const payload = readPayload();

class BenchmarkService {
    constructor() {
        this.accessToken = null;
        this.instanceUrl = null;
    }

    async initialize() {
        const { accessToken, instanceUrl } = await getAccessToken();
        this.accessToken = accessToken;
        this.instanceUrl = instanceUrl;
    }

    async callBenchmark(requestId = '') {
        payload['requestId'] = requestId;
        const data = JSON.stringify( payload );
        console.log(data);
        const options = {
            hostname: this.instanceUrl.replace(/^https?:\/\//, ''),
            path: '/services/apexrest/benchmark',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        return new Promise((resolve, reject) => {
            const req = https.request(options, res => {
                let responseBody = '';
                res.on('data', chunk => responseBody += chunk);
                res.on('end', () => {
                    try {
                        const result = JSON.parse(responseBody);
                        console.log(`Benchmark response for Request #${requestId}:`, result);
                        stats.addResult(result.timeTakenMs, result.status);
                        resolve(result);
                    } catch (err) {
                        console.error(`Failed to parse response for Request #${requestId}:`, responseBody);
                        reject(err);
                    }
                });
            });

            req.on('error', err => {
                console.error(`Benchmark API call failed for Request #${requestId}:`, err);
                reject(err);
            });

            req.write(data);
            req.end();
        });
    }
}

module.exports = BenchmarkService;
