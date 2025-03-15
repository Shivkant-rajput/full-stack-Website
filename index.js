const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myDatabase'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});

// Routes
app.post('/users', (req, res) => {
  const user = { name: req.body.name, email: req.body.email };
  const sql = 'INSERT INTO users SET ?';
  db.query(sql, user, (err, result) => {
    if (err) throw err;
    res.send('User added');
  });
});

app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Start Server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));



// Ye function page load pe call hoga aur users laa ke list dikhayega
function loadUsers() {
  fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => {
      const list = document.getElementById('usersList');
      list.innerHTML = ''; // Clear previous list
      users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = <strong>${user.name}</strong> - ${ user.email };
        list.appendChild(li);
      });
    })
    .catch(err => console.error('Error:', err));
}

loadUsers(); // Page load pe run karega



app.post('/'(req, res) => {

  console.log(req.body);
  res.send('Form Submitted!');
}
);