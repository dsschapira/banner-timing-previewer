<?php

    class BannerObject {
        // DB Properties
        private $conn;
        private $table = 'banner_objects';

        // Banner Properties
        public $id;
        public $banner_id;
        public $file;

        // Constructor with DB
        public function __construct($db){
            $this->conn = $db;
        }

        public function createBannerObject() {
            // Create query
            $query = 'INSERT INTO ' .
                $this->table . ' 
                SET
                    banner_id = :banner_id
                    file = :file';
            
            // Prepare statement
            $stmt = $this->conn->prepare($query);

            // Bind params
            $stmt->bindParam(':banner_id', $this->banner_id);
            $stmt->bindParam(':file', $this->file);

            // Execute query
            if($stmt->execute()) {
                return true;
            }

            // Print error if something goes wrong
            printf("Error: %s.\n", $stmt->error);
            return false;

        }

    }