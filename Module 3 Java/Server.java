import java.io.*;
import java.net.*;

public class Server {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(12345);
        System.out.println("Server started. Waiting for client...");

        Socket clientSocket = serverSocket.accept();
        System.out.println("Client connected.");

        BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
        PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);

        BufferedReader userInput = new BufferedReader(new InputStreamReader(System.in));
        String clientMsg, serverMsg;

        while ((clientMsg = in.readLine()) != null) {
            System.out.println("Client: " + clientMsg);
            System.out.print("Server: ");
            serverMsg = userInput.readLine();
            out.println(serverMsg);
            if (serverMsg.equalsIgnoreCase("bye")) break;
        }

        clientSocket.close();
        serverSocket.close();
    }
}
