<?php
/*
 * example :
 *
 * $mW = new mysqli_wrapper('localhost', 'root', '', 'example');
 * $mW->query('INSERT INTO users (name, password) VALUES(?, ?)', array('fingu', '12345'));
 *
 * $allUsersQuery = $mW->query('SELECT * FROM users');
 *
 * $rows = $allUsersQuery->fetch_all(1);
 *
 * foreach($allD as $row){
 *      echo $row['name'];
 * }
 */

/*
 * the mysqlnd driver needs to be available
 */

class mysqli_wrapper{
    private mysqli $connection;

    public function __construct($host, $username, $password, $db_name) {
        $this->connection = new mysqli($host, $username, $password, $db_name);

        if(!$this->connection)
            throw new Exception($this->connection->connect_error);
    }

    public function __destruct() {
        $this->connection->close();
    }

    public function query(string $query, array $args = [], string $types = null) {
        if($types === null && $args !== [])
            $types = str_repeat('s', count($args)); // by default string

        $stmt = $this->connection->prepare($query);

        if(!$stmt)
            throw new Exception($stmt->error);

        if (strpos($query, '?') !== false)
            $stmt->bind_param($types, ...$args);

        $stmt->execute();

        $result = $stmt->get_result();

        $stmt->close();

        return $result;
    }

    public function get_connection(){
        return $this->connection;
    }

}
