import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rashmisharma",
  database: "test",
});

// this line allows us to send any json file using a client
// without this i was getting error when sending data from postman to create new entry
app.use(express.json());

// this line is allowing me to see all books in clg of inspect.
// console.log(res) inside fetchAllBooks
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is the backend.");
});

// i ran this command in workbench and then i could see all rows in local host /books
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rashmisharma';

app.get("/books", (req, res) => {
  const q = "select * from books";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);

    return res.json("Book has been inserted successfully.");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);

    return res.json("Book has been deleted successfully.");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);

    return res.json("Book has been updated successfully.");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
