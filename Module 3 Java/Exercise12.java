public class Exercise12 {
    
    // Method to add two integers
    public static int add(int a, int b) {
        return a + b;
    }
    
    // Method to add two doubles
    public static double add(double a, double b) {
        return a + b;
    }
    
    // Method to add three integers
    public static int add(int a, int b, int c) {
        return a + b + c;
    }

    public static void main(String[] args) {
        // Call and display results of each overloaded method
        System.out.println("Sum of two integers (5 + 10): " + add(5, 10));
        System.out.println("Sum of two doubles (3.5 + 2.8): " + add(3.5, 2.8));
        System.out.println("Sum of three integers (1 + 2 + 3): " + add(1, 2, 3));
    }
}
