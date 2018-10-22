<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: multipart/form-data');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, boundary, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    include_once '../config/Database.php';
    include_once '../models/Banner.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate Banner obj
    $banner = new Banner($db);

    $success = $banner->createBanner();
    if($success) {
        // We now have access to the route to use from the createBanner method
        mkdir("../uploads/".$banner->id);
        $path = "../uploads/".$banner->id."/";
        foreach($_FILES as $file){
            move_uploaded_file($file['tmp_name'], $path.$file['name']);
        }
        echo json_encode(
            array('id' => $banner->id, 'path' => $banner->route, 'message' => 'Banner Created.' )
        );
    } else {
        echo json_encode(
            array( 'id' => false, 'path' => null, 'message' => 'An error occured creating the banner.')
        );
    }