import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Exercise28 {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(5, 8, 12, 3, 9, 10, 20);

        List<Integer> evenNumbers = numbers.stream()
                                           .filter(n -> n % 2 == 0)
                                           .collect(Collectors.toList());

        System.out.println("Even numbers: " + evenNumbers);
    }
}
