<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Banner.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate Banner obj
    $banner = new Banner($db);

    // Get ID
    $banner->id = isset($_GET['id']) ? $_GET['id'] : die();

    // Get Banner
    $banner->getBanner();

    // Create Array
    $banner_arr = array(
        'data'  => $banner->data
    );

    // Make JSON
    print_r(json_encode($banner_arr));