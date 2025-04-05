<?php
phpinfo();
?>
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["csvFile"])) {
    $targetDir = "uploads/";
    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0777, true);
    }

    $fileName = basename($_FILES["csvFile"]["name"]);
    $targetFilePath = $targetDir . $fileName;
    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

    if ($fileType == "csv") {
        if (move_uploaded_file($_FILES["csvFile"]["tmp_name"], $targetFilePath)) {
            echo "File uploaded successfully: " . htmlspecialchars($fileName);
        } else {
            echo "Error uploading the file.";
        }
    } else {
        echo "Only CSV files are allowed.";
    }
} else {
    echo "Invalid file upload.";
}
?>
