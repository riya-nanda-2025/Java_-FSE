import java.util.List;

public class Exercise29 {
    // Define record
    public record Person(String name, int age) {}

    public static void main(String[] args) {
        Person p1 = new Person("Alice", 23);
        Person p2 = new Person("Bob", 17);
        Person p3 = new Person("Charlie", 30);

        System.out.println(p1);
        System.out.println(p2);
        System.out.println(p3);

        List<Person> people = List.of(p1, p2, p3);

        // Filter adults (age >= 18)
        List<Person> adults = people.stream()
                                    .filter(person -> person.age() >= 18)
                                    .toList();

        System.out.println("Adults: " + adults);
    }
}
