<?php

    class Banner {
        // DB Properties
        private $conn;
        private $table = 'banners';

        // Banner Properties
        public $id;
        public $route;

        // Constructor with DB
        public function __construct($db){
            $this->conn = $db;
        }

        public function getBanner(){
            // Create query
            $query = 'SELECT
                        *
                      FROM 
                        '. $this->table .' 
                      WHERE
                        id = :id
                      LIMIT 0,1';
            
            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(':id', $this->id);
            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // Set properties
            $this->data = $row['data'];
        }

        public function createBanner() {
            // Create query
            $query = 'INSERT INTO ' .
                $this->table . ' 
                SET
                    route = "http://localhost:8080/banner-timing-previewer/server/uploads"';
            
            // Prepare statement
            $stmt = $this->conn->prepare($query);

            //Execute query
            if($stmt->execute()) {
                $recent_query = 'SELECT LAST_INSERT_ID()';
                $recent_stmt = $this->conn->prepare($recent_query);
                $recent_stmt->execute();

                $row = $recent_stmt->fetch(PDO::FETCH_ASSOC);
                $keys = array_keys($row);
                $this->id = $row[$keys[0]]; // Gets the ID of the banner row we just created
                $this->route = $row[$keys[1]]; // Get route of the banner we just created

                return true;
            }

            // Print error if something goes wrong
            printf("Error: %s. \n", $stmt->error);
            return false;
        }
    }