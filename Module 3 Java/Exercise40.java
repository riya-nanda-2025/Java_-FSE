public class Exercise40 {
    public static void main(String[] args) throws InterruptedException {
        final int THREADS = 100_000;

        Thread[] threads = new Thread[THREADS];

        for (int i = 0; i < THREADS; i++) {
            threads[i] = Thread.startVirtualThread(() -> {
                System.out.println("Hello from virtual thread " + Thread.currentThread());
            });
        }

        for (Thread t : threads) {
            t.join();
        }

        System.out.println("All virtual threads finished.");
    }
}
