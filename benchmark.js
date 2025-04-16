const BenchmarkService = require('./Benchmark/BenchmarkService');
const stats = require('./Benchmark/BenchmarkStats');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'Benchmark/config.json');
exports.configPath = configPath;

function readConfig() {
    const rawData = fs.readFileSync(configPath);
    return JSON.parse(rawData);
}

const config = readConfig();

const TOTAL_REQUESTS = config.TOTAL_REQUESTS;
const BATCH_SIZE = config.BATCH_SIZE;

async function runBenchmarks() {
    const benchmark = new BenchmarkService();
    await benchmark.initialize();

    let activeRequests = 0;
    let completed = 0;
    let currentId = 0;

    return new Promise((resolve) => {
        const launchNext = () => {
            while (activeRequests < BATCH_SIZE && currentId < TOTAL_REQUESTS) {
                const requestId = ++currentId;
                console.log(`Request #${requestId} sent`);
                activeRequests++;

                benchmark.callBenchmark(requestId)
                    .then(() => {
                        console.log(`Response received for Request #${requestId}`);
                    })
                    .catch(err => {
                        console.error(`Request #${requestId} failed:`, err);
                    })
                    .finally(() => {
                        activeRequests--;
                        completed++;

                        if (completed === TOTAL_REQUESTS) {
                            return resolve();
                        }

                        // Trigger next request immediately when one finishes
                        launchNext();
                    });
            }
        };

        launchNext(); // Initial trigger to start requests
    });
}

runBenchmarks().then(() => {
    stats.getSummary();
});
