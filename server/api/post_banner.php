<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Acess-Control-Allow-Origin, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    include_once '../config/Database.php';
    include_once '../models/Banner.php';
    include_once '../models/BannerObject.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate Banner obj
    $banner = new Banner($db);

    // Get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    $success = $banner->createBanner();
    if($success) {
        echo json_encode(
            array('message' => 'Banner Created With ID '. $banner->id .'.')
        );
        foreach ($data as $banner_file){
            $banner_object = new BannerObject($db);
            $banner_object->banner_id = $banner->id;
            $banner_object->file = $banner_file;

            if($banner_object->createBannerObject()) {
                echo json_encode(
                    array('message' => 'Banner Obj Created.')
                );
            } else {
                echo json_encode(
                    array('message' => 'Banner Obj Not Created.')
                );
            }
        }
    } else {
        echo json_encode(
            array('message' => 'Banner Not Created.')
        );
    }