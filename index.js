import express from "express";
import mysql from "mysql";

const app = express();
app.use(express.json());
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs",
});

connection.connect((error) => {
  if (error) {
    console.log("databse not connected");
  } else {
    console.log("database connected");
  }
});

app.get("/", (req, res) => {
  let sql = "SELECT * FROM user";
  connection.query(sql, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

app.get("/user/:id", (req, res) => {
  let sql = `SELECT * FROM user WHERE id = ${req.params.id}`;
  connection.query(sql, (error, data) => {
    if (error) {
      console.log(error);
    } else {
     
      res.send(data);
    }
  });
});

app.get("/search", (req, res) => {
  let sql = `SELECT * FROM user WHERE name LIKE '%${req.query.name}%'`;
    connection.query(sql, (error, data) => {
    if (error) {
     console.log(error);
      res.send(error)
    } else {
     
      res.send(data);
    }
  });
});

app.delete("/:id", (req, res) => {
  let sql = `DELETE  FROM user WHERE id = ${req.params.id}`;
  connection.query(sql, (error) => {
    if (error) {
      console.log(error);
    } else {
      res.send("delete");
    }
  });
});

app.put("/:id", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  let sql = `UPDATE user SET name="${name}" , email="${email}", password="${password}" WHERE id = ${req.params.id}`;
  connection.query(sql, (error) => {
    if (error) {
      res.send(error);
      console.log(error);
    } else {
      res.send("update");
    }
  });
});

app.post("/", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  let post = {
    name: name,
    email: email,
    password: password,
  };
  let sql = "INSERT INTO user SET ?";
  connection.query(sql, post, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("result");
    }
  });
});

app.listen(1000);
