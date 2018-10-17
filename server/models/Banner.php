<?php

    class Banner {
        // DB Properties
        private $conn;
        private $table = 'banners';

        // Banner Properties
        public $id;
        public $data;

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
                    data = "hello world"';
            
            // Prepare statement
            $stmt = $this->conn->prepare($query);

            //Execute query
            if($stmt->execute()) {
                $id_query = 'SELECT LAST_INSERT_ID()';
                $id_stmt = $this->conn->prepare($id_query);
                $id_stmt->execute();

                $row = $id_stmt->fetch(PDO::FETCH_ASSOC);
                $keys = array_keys($row);
                $this->id = $row[$keys[0]]; //Gets the ID of the banner row we just created

                return true;
            }

            // Print error if something goes wrong
            printf("Error: %s. \n", $stmt->error);
            return false;
        }
    }