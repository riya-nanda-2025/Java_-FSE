import java.util.HashMap;
import java.util.Scanner;

public class Exercise25 {
    public static void main(String[] args) {
        HashMap<Integer, String> studentMap = new HashMap<>();
        Scanner scanner = new Scanner(System.in);
        String input;
        int id;

        System.out.println("Add student entries (type 'done' to finish):");
        while (true) {
            System.out.print("Enter student ID: ");
            input = scanner.nextLine();
            if (input.equalsIgnoreCase("done")) break;

            try {
                id = Integer.parseInt(input);
            } catch (NumberFormatException e) {
                System.out.println("Invalid ID. Please enter a number.");
                continue;
            }

            System.out.print("Enter student name: ");
            String name = scanner.nextLine();
            studentMap.put(id, name);
        }

        System.out.print("Enter ID to retrieve name: ");
        int searchId = scanner.nextInt();
        String studentName = studentMap.get(searchId);

        if (studentName != null) {
            System.out.println("Student with ID " + searchId + " is " + studentName);
        } else {
            System.out.println("No student found with ID " + searchId);
        }

        scanner.close();
    }
}
