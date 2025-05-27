import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Exercise27 {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("John");
        names.add("Alice");
        names.add("Bob");
        names.add("Diana");

        // Sort using lambda expression
        Collections.sort(names, (a, b) -> a.compareToIgnoreCase(b));

        System.out.println("Sorted names: " + names);
    }
}
