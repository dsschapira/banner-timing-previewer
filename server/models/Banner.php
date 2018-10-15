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
    }