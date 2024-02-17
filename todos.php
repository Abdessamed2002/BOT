<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start(); // start session
}
   
$host = "localhost";                             // or 127.0.0.1
$username = "root";                              // your_database_username
$password = "";                                  // your_database_password
$dbname = "to_do_app";                           // your_database_name

$conn = new mysqli($host, $username, $password, $dbname);
// always have to test if there is an error
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// create the table with the three columns
$sql = "CREATE TABLE IF NOT EXISTS todos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            task VARCHAR(255) NOT NULL,
            checked VARCHAR(20)
        )";
if ($conn->query($sql) === false) {
    die("Error creating table: " . $conn->error);
}

// Fetch existing elements from the database and store in session
$_SESSION['existingElements'] = fetchExistingElements($conn);

function fetchExistingElements($connection) {
    // Implement this function to fetch existing elements from the database
    $existingElements = array();
    $result = $connection->query("SELECT * FROM todos");
    while ($row = $result->fetch_assoc()) {
        $existingElements[] = $row;
    }
    // Updating the session with existing items
    $_SESSION['existingElements'] = $existingElements;
    return $existingElements;
}

// insert task
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["newTodo"])) {
    $task = $_POST["newTodo"]; // the user input

    // probleme valeur vide en server side : prcq le champ est initiallement ***disabled***
    $insertSql = "INSERT INTO todos (task, checked) VALUES ('$task', '0')"; // insert the task into the todos table
    if ($conn->query($insertSql) === false) {
        die("Error inserting todo: " . $conn->error);
    }
    // Update existing elements in the session after inserting a new one
    $_SESSION['existingElements'] = fetchExistingElements($conn);

    // Redirect back to index.php
    echo '<script>window.location.href = "index.php";</script>';
    exit();
}

// delete task "remove_one" action
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["taskId"])) {
    $taskId = $_POST["taskId"];
    if ($_GET["action"] === "remove_one") {
        // Remove the task from the database
        $deleteSql = "DELETE FROM todos WHERE id = $taskId";
        if ($conn->query($deleteSql) === false) {
            die("Error deleting task: " . $conn->error);
        }
    }
} else {
    http_response_code(400);
}
// "remove_all" action
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_GET["action"]) && $_GET["action"] === "remove_all") {
    $deleteAllSql = "DELETE FROM todos";
    if ($conn->query($deleteAllSql) === false) {
        die("Error deleting all tasks: " . $conn->error);
    }
    exit(); 
}
// checking the task
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["taskId"]) && isset($_POST["isChecked"])) {
    $taskId = $_POST["taskId"]; // get the id of the task
    $isChecked = $_POST["isChecked"]; // get the value "1"
    $updateSql = "UPDATE todos SET checked = $isChecked WHERE id = $taskId"; // updating the database sql request
    if ($conn->query($updateSql) === false) {
        die("Error updating task status: " . $conn->error);
    }
} else {
    http_response_code(400);
}
?>