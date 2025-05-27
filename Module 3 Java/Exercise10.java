import java.util.Random;
import java.util.Scanner;

public class Exercise10 {
    public static void main(String[] args) {
        // Create objects for input and random number generation
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();

        // Generate a random number between 1 and 100
        int secretNumber = random.nextInt(100) + 1;
        int guess;
        boolean guessedCorrectly = false;

        System.out.println("Guess the number between 1 and 100!");

        // Loop until the user guesses correctly
        while (!guessedCorrectly) {
            System.out.print("Enter your guess: ");
            guess = scanner.nextInt();

            if (guess < secretNumber) {
                System.out.println("Too low! Try again.");
            } else if (guess > secretNumber) {
                System.out.println("Too high! Try again.");
            } else {
                System.out.println("Congratulations! You guessed the number: " + secretNumber);
                guessedCorrectly = true;
            }
        }

        // Close the scanner
        scanner.close();
    }
}
