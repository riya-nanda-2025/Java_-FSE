import java.util.Scanner;

public class Exercise9 {
    public static void main(String[] args) {
        // Create a Scanner object for user input
        Scanner scanner = new Scanner(System.in);

        // Prompt the user for marks
        System.out.print("Enter your marks (out of 100): ");
        int marks = scanner.nextInt();

        // Grade assignment using conditional statements
        if (marks >= 90 && marks <= 100) {
            System.out.println("Grade: A");
        } else if (marks >= 80 && marks <= 89) {
            System.out.println("Grade: B");
        } else if (marks >= 70 && marks <= 79) {
            System.out.println("Grade: C");
        } else if (marks >= 60 && marks <= 69) {
            System.out.println("Grade: D");
        } else if (marks >= 0 && marks < 60) {
            System.out.println("Grade: F");
        } else {
            System.out.println("Invalid input. Marks should be between 0 and 100.");
        }

        // Close the scanner
        scanner.close();
    }
}
