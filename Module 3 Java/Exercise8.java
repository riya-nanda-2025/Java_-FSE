public class Exercise8 {
    public static void main(String[] args) {
        // Expression 1
        int result1 = 10 + 5 * 2;
        System.out.println("Result of 10 + 5 * 2 = " + result1);
        // Explanation: 5 * 2 = 10; then 10 + 10 = 20

        // Expression 2
        int result2 = (10 + 5) * 2;
        System.out.println("Result of (10 + 5) * 2 = " + result2);
        // Explanation: 10 + 5 = 15; then 15 * 2 = 30

        // Expression 3
        int result3 = 100 / 5 + 3 * 4 - 8;
        System.out.println("Result of 100 / 5 + 3 * 4 - 8 = " + result3);
        // Explanation: 100 / 5 = 20, 3 * 4 = 12; 20 + 12 = 32; 32 - 8 = 24

        // Expression 4
        int result4 = 5 + 10 % 3 * 2;
        System.out.println("Result of 5 + 10 % 3 * 2 = " + result4);
        // Explanation: 10 % 3 = 1; 1 * 2 = 2; 5 + 2 = 7
    }
}
