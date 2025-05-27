import java.util.*;
import java.util.concurrent.*;

public class Exercise41 {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(5);

        List<Callable<String>> tasks = List.of(
            () -> "Task 1 result",
            () -> "Task 2 result",
            () -> "Task 3 result"
        );

        List<Future<String>> futures = executor.invokeAll(tasks);

        for (Future<String> f : futures) {
            System.out.println("Result: " + f.get());
        }

        executor.shutdown();
    }
}
