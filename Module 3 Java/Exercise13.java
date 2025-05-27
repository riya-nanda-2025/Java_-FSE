import java.util.Scanner;

public class Exercise13 {
    
    // Recursive method to calculate nth Fibonacci number
    public static int fibonacci(int n) {
        if (n == 0) {
            return 0;  // Base case: 0th Fibonacci number is 0
        } else if (n == 1) {
            return 1;  // Base case: 1st Fibonacci number is 1
        } else {
            return fibonacci(n - 1) + fibonacci(n - 2);  // Recursive call
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Prompt the user for a positive integer
        System.out.print("Enter a positive integer (n): ");
        int n = scanner.nextInt();

        if (n < 0) {
            System.out.println("Please enter a positive integer.");
        } else {
            // Calculate and display the nth Fibonacci number
            int result = fibonacci(n);
            System.out.println("Fibonacci number at position " + n + " is: " + result);
        }

        scanner.close();
    }
}
