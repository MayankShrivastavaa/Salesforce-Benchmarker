@RestResource(urlMapping='/benchmark')
global with sharing class BenchmarkExecutor {
	
    Global class BenchmarkResponse {
        public String key;
        public Long timeTakenMs;
        public String status;
        public Integer requestId;
    }        
    
    @HttpPost
    global Static BenchmarkResponse executeBenchmark(){

        Map<String, Object> requestData = (Map<String, Object>)JSON.deserializeUntyped(RestContext.request.requestBody.toString());
        BenchmarkResponse benchmark = new BenchmarkResponse();
        try{
            benchmark = BenchmarkResource.benchmark(requestData);
            return benchmark;
        } catch(Exception e){
            return benchmark;
        }
    }
}