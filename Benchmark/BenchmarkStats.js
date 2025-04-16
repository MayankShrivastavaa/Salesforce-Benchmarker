class BenchmarkStats {
    constructor() {
        this.totalRuns = 0;
        this.successCount = 0;
        this.failureCount = 0;
        this.minTime = Number.MAX_SAFE_INTEGER;
        this.maxTime = 0;
        this.totalTime = 0;
        this.averageTime;
    }

    addResult(timeTakenMs, status) {
        this.totalRuns++;
        this.minTime = Math.min(this.minTime, timeTakenMs);
        this.maxTime = Math.max(this.maxTime, timeTakenMs);
        this.totalTime += timeTakenMs;
        if (status === 'Success') {
            this.successCount++;
        }
        else {
            this.failureCount++;
        }
    }

    get averageTime() {
        return this.successCount ? (this.totalTime / this.successCount).toFixed(2) : 0;
    }

    getSummary() {

        const summary = {
            totalRuns: this.totalRuns,
            successCount: this.successCount,
            failureCount: this.failureCount,
            minTime: this.minTime,
            maxTime: this.maxTime,
            totalTime: this.totalTime,
            averageTime: this.successCount ? (this.totalTime / this.successCount) : 0
        };
    
        console.table(summary);
    }
}

module.exports = new BenchmarkStats();
