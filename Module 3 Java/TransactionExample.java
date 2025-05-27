import java.sql.*;

public class TransactionExample {

    public static void transferMoney(Connection conn, int fromAccountId, int toAccountId, double amount) throws SQLException {
        try {
            conn.setAutoCommit(false); // start transaction

            String debitSQL = "UPDATE accounts SET balance = balance - ? WHERE id = ?";
            String creditSQL = "UPDATE accounts SET balance = balance + ? WHERE id = ?";

            try (PreparedStatement debitStmt = conn.prepareStatement(debitSQL);
                 PreparedStatement creditStmt = conn.prepareStatement(creditSQL)) {

                debitStmt.setDouble(1, amount);
                debitStmt.setInt(2, fromAccountId);
                debitStmt.executeUpdate();

                creditStmt.setDouble(1, amount);
                creditStmt.setInt(2, toAccountId);
                creditStmt.executeUpdate();

                conn.commit();
                System.out.println("Transfer successful.");
            } catch (SQLException e) {
                conn.rollback();
                System.out.println("Transfer failed. Rolled back.");
                throw e;
            }
        } finally {
            conn.setAutoCommit(true); // restore default
        }
    }
}
