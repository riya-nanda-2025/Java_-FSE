// Car class definition
class Car {
    // Attributes
    String make;
    String model;
    int year;

    // Constructor to initialize attributes
    public Car(String make, String model, int year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    // Method to display car details
    public void displayDetails() {
        System.out.println("Car Make: " + make);
        System.out.println("Car Model: " + model);
        System.out.println("Year: " + year);
        System.out.println("--------------------");
    }
}

public class Exercise17 {
    public static void main(String[] args) {
        // Create Car objects
        Car car1 = new Car("Toyota", "Corolla", 2020);
        Car car2 = new Car("Honda", "Civic", 2018);

        // Call displayDetails method on each object
        car1.displayDetails();
        car2.displayDetails();
    }
}
