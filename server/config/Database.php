<?php

    class Database{
        // DB Params
        private $host = 'localhost';
        private $port = '3306';
        private $db_name = 'banner_data';
        private $username = 'server_acct';
        private $password = 'EyEoUwXPZBOTfz8j';
        private $conn;

        // DB Connect
        public function connect(){
            $this->conn = null;

            try{ 
                $this->conn = new PDO('mysql:host=' . $this->host . ';port=' . $this->port . ';dbname=' . $this->db_name, $this->username, $this->password);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch(PDOException $e) {
                echo 'Connection Error: ' . $e->getMessage();
            }

            return $this->conn;
        }
    }