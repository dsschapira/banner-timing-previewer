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

    /* TODOS:
    *   1. Get the files that were posted.
    *   2. Store the files in the server's uploads folder.
    *   3. Get the route to the new directory in the uploads folder.
    *   4. Set that route to $banner->route 
    *   5. Save banner info to DB.
    */

    $success = $banner->createBanner();
    if($success) {
        echo json_encode(
            array('message' => 'Banner Created With ID '. $banner->id .'.')
        );
    } else {
        echo json_encode(
            array('message' => 'Banner Not Created.')
        );
    }