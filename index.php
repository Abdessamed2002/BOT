<?php
session_start();
// Include the todos.php file to access the fetchExistingElements function
include_once 'todos.php';
// Call fetchExistingElements from the start to fetch existing elements on database if exists
$existingElements = fetchExistingElements($conn);
// Use existing elements of the session if available otherwise initialize it
$existingElements = isset($_SESSION['existingElements']) ? $_SESSION['existingElements'] : $existingElements;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/f7da13d0db.js" crossorigin="anonymous"></script>
    <title>ToDo App</title>
</head>
<body onload="checkExistingElements();">
    <h1>To Do App</h1>
    <div id="div-container">
        <form action="todos.php" method="post"> 
            <div id="div-newTodo">
                <input id="input" name="newTodo" type="text" placeholder="Add your new todo" required>
                <button id="btn" name="btnNew" type="submit" ><i id="plus" class="fa-solid fa-plus"></i></button>
            </div>
        </form>
        <div id="newElements">
            <!-- display existing elements -->
            <?php foreach ($existingElements as $element): ?> 
                <div class="div-todo" data-task-id="<?= $element['id'] ?>" data-task-checked="<?= $element['checked'] ?>" onmouseover="checkValues(this)">
                    <button class="check" onclick="clik(this);"><i class="fa-solid fa-check" style="display: none;"></i></button>
                    <input value="<?= htmlspecialchars($element['task']) ?>" readonly="true">
                    <button class="clear" data-task-id="<?= $element['id'] ?>" onclick="remove(this);"><i class="fa-solid fa-trash"></i></button>                                     
                </div>
            <?php endforeach; ?>
        </div>
        <div id="counter" class="div-todo2">
            <input id="inputCounter" type="text" value="You have <?= count($existingElements) ?> pending task(s)" readonly="true">
            <button name="delete" type="button" onclick="removeAllTasks()"><span>Clear All</span></button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>