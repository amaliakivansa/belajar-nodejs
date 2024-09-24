const express = require('express');

const app = express();
const expressLayouts = require('express-ejs-layouts');

const { loadContacts } = require('./utils/contacts');

const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.get('/', (req, res) => {
  const mahasiswa = [
    {
      nama: 'Amalia',
      email: 'amalia@gmail.com',
    },
    {
      nama: 'Budi',
      email: 'budi@gmail.com',
    },
    {
      nama: 'Charlie',
      email: 'charlie@gmail.com',
    },
  ];
  res.render('index', {
    title: 'Halaman Home',
    layout: 'layouts/main-layout',
    nama: 'Amalia',
    mahasiswa,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Halaman About',
    layout: 'layouts/main-layout',
  });
});

app.get('/contact', (req, res) => {
  const contacts = loadContacts();
  res.render('contact', {
    title: 'Halaman Contact',
    layout: 'layouts/main-layout',
    contacts,
  });
});

app.use((req, res) => {
  res.status(404);
  res.send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
