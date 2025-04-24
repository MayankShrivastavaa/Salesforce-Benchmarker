# Salesforce Benchmarker

After creating [Feature Flagging Framework](https://github.com/MayankShrivastavaa/Feature-Flagging-Framework), i got multiple queries like: "What’s the performance overhead of adding this feature to our existing logic?" "Do you have any benchmarks to support its scalability?"  
That’s when I realized: claiming your code is “lightweight” or “efficient” isn't enough. You need to back it with real performance stats.  
But what is benchmarking? I honestly had no clue at first. I started digging — reading articles, experimenting, and pestering ChatGPT — until it finally clicked.  
Benchmarking is nothing but measuring performance — comparing “Before vs After” to understand the real impact of code changes.  
Just like unit and integration tests validate correctness, benchmarking validates performance. And yet, it's often ignored in the dev cycle. 

## Disclaimer: 
This utility is unpolished and purely for devs to benchmark in sandboxes during development and unit testing.  
Highly recommend **NOT using it in stable environments like production or pre-release sandboxes**.

## Intial Setup?
1️⃣ Pull the repo to your local.  
2️⃣ Deploy Apex classes and connected app to your Test Org.  
3️⃣ Grab the consumer key/secret from the connected app.  
4️⃣ Create a security token for the user you’re benchmarking for.  
5️⃣ Set values in Benchmark/config.json in VS Code or any editor.  

## How to use?

1️⃣ Add params/data in Benchmark/payload.json for your Apex logic.  
2️⃣ Open Benchmark.cls in Developer Console, add your logic or function call, and save.  
3️⃣ Run ```node benchmark.js``` in Terminal.  

## How it works?  

Uses a Facade Pattern to expose a single REST API while hiding all backend complexity.  
Connects locally to your org via config.json—no creds exposed online.  
Authorizes using config.json.  
Calls Apex framework via REST API in batches (per config.json).  
Benchmark.cls executes your logic as a single transaction, returns TAT.  
JS framework logs TAT, Success/Failure per run, then summarizes:  
| Field | Value |
| ------ | ------ |
| TotalRuns     | 100 |
| Success Count | 75 |
| Failure Count | 25 |
| minTime       | 1000 | 
| maxTime       | 5367 | 
| totalTime     | 33520 | 
| averageTime   | 3352 |   

## How It Helps
Real Stats: No more “feels fast”—get TAT, success rates, and failures.  
Find Issues: Spot slow runs or failures early.  
Optimize: Fix performance before prod.  
Community Tool: Open-source—use it, break it, improve it!

## Contributing
Bug? Better idea? Open an issue or PR—let’s make this a dev must-have!


