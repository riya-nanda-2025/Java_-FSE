// Base class
class Animal {
    public void makeSound() {
        System.out.println("Animal makes a sound");
    }
}

// Subclass
class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Bark");
    }
}

public class Exercise18 {
    public static void main(String[] args) {
        // Instantiate Animal and call makeSound
        Animal genericAnimal = new Animal();
        genericAnimal.makeSound();  // Output: Animal makes a sound

        // Instantiate Dog and call makeSound
        Dog dog = new Dog();
        dog.makeSound();  // Output: Bark
    }
}
