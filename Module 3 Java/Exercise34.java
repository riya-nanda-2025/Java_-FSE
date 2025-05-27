/*Module structure example:

com.utils module:

com.utils/module-info.java

java
Copy code
module com.utils {
    exports com.utils;
}
com.utils/com/utils/Utility.java

java
Copy code
package com.utils;

public class Utility {
    public static void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }
}
com.greetings module:

com.greetings/module-info.java

java
Copy code
module com.greetings {
    requires com.utils;
}
com.greetings/com/greetings/Main.java

java
Copy code
package com.greetings;

import com.utils.Utility;

public class Main {
    public static void main(String[] args) {
        Utility.greet("World");
    }
}
Compile and run:

bash
Copy code
# Compile utils module
javac -d mods/com.utils com.utils/module-info.java com.utils/com/utils/Utility.java

# Compile greetings module, referencing utils
javac --module-path mods -d mods/com.greetings com.greetings/module-info.java com.greetings/com/greetings/Main.java

# Run greetings module
java --module-path mods -m com.greetings/com.greetings.Main
 */