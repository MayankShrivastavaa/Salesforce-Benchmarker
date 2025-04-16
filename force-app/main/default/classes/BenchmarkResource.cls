public class BenchmarkResource {
    public Static Long startTime;
    public Static Long endTime;
    Static Map<String, Object> requestData;
    Static BenchmarkExecutor.BenchmarkResponse benchmarking = new BenchmarkExecutor.BenchmarkResponse();
    public static BenchmarkExecutor.BenchmarkResponse benchmark(Map<String, Object> request){
        try{
            Integer requestId = (Integer) request.get('requestId'); // Extract requestId
            benchmarking.requestId = requestId;
            Benchmark.getBenchmark(request);
            benchmarking.timeTakenms = System.now().getTime() - startTime;
            benchmarking.status = 'Success';
            return benchmarking;
        } catch(Exception e){
            benchmarking.timeTakenms = System.now().getTime() - startTime;
            benchmarking.status = 'Failed';
            return benchmarking;
        }
    }
}