import java.lang.reflect.*;

public class Exercise39 {
    public static void main(String[] args) throws Exception {
        Class<?> clazz = Class.forName("java.lang.String");
        
        Method[] methods = clazz.getDeclaredMethods();
        System.out.println("Methods of java.lang.String:");
        for (Method m : methods) {
            System.out.println(m.getName() + " with " + m.getParameterCount() + " parameters");
        }

        // Example: dynamically invoke substring method on a string
        Method substring = clazz.getMethod("substring", int.class, int.class);
        String str = "Hello Reflection!";
        String result = (String) substring.invoke(str, 6, 16);
        System.out.println("Invoked substring: " + result);
    }
}
