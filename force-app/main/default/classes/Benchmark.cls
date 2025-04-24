public class Benchmark {
    public static void getBenchmark(Map<String, Object> request){
        BenchmarkResource.startTime = System.now().getTime();
        
        // Get request data using (String)request.get('key With Value As String');
        // Put your benchmarking logic below // e.g., MyService.doSomething();
        
        List<Integer> delays = new List<Integer>{4000, 2000, 1000, 1000, 3000, 5000};
        Integer mod = Math.Mod(((integer) request.get('requestId')),6);
        Integer delay = delays[mod];
        Long start = DateTime.now().getTime();
        while(DateTime.now().getTime()-start<delay);
    }
}