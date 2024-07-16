<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(array('status' => 'error', 'message' => 'Método no permitido'));
  exit();
}

$serverName = "localhost";
$userName = "root";
$password = "";
$dbname = "users_register";

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || empty($data->nombre) || empty($data->apellido) || empty($data->email) || empty($data->password)) {
  echo json_encode(array('status' => 'error', 'message' => 'Todos los campos son requeridos'));
  exit();
}

$conn = new mysqli($serverName, $userName, $password, $dbname);


if ($conn->connect_error) {
  die(json_encode(array('status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error)));
}

if (json_last_error() !== JSON_ERROR_NONE) {
  echo json_encode(array('status' => 'error', 'message' => 'Datos JSON inválidos'));
  exit();
}

$nombre = $data["nombre"];
$apellido = $data["apellido"];
$email = $data["email"];
$password = password_hash($data["password"], PASSWORD_DEFAULT);

$sqlExistUser = "SELECT * FROM usuarios WHERE email = ?";
$stmtExistUser = $conn->prepare($sqlExistUser);
$stmtExistUser->bind_param("s", $email);
$stmtExistUser->execute();

$resultsUserExist = $stmtExistUser->get_result();
if ($resultsUserExist->num_rows > 0) {
  echo json_encode(array('status' => 'error', 'message' => 'Usuario ya Registrado'));
  $stmtExistUser->close();
  $conn->close();
  exit();
} else {

  $stmtExistUser->close();

  $sqlInsert = "INSERT INTO users (nombre, apellido, email, password) VALUES (?, ?, ?, ?)";
  $stmt = $conn->prepare($sqlInsert);
  $stmt->bind_param("ssss", $nombre, $apellido, $email, $password);

  if ($stmt->execute()) {
    echo json_encode(array('status' => 'success', 'message' => 'Usuario Registrado'));
  } else {
    echo json_encode(array('status' => 'error', 'message' => 'Fallo al Registrar Usuario'));
  }
  $stmt->close();
  $conn->close();
}
