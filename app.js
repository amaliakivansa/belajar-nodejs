const express = require('express');

const app = express();
const expressLayouts = require('express-ejs-layouts');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

const {
  loadContacts,
  detailContact,
  addContact,
  cekDuplikat,
  deleteContact,
  editContact,
} = require('./utils/contacts');

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
    msg: req.flash('msg'),
  });
});

app.post(
  '/contact',
  [
    body('nama').custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error('Nama kontak sudah digunakan');
      }
      return true;
    }),
    check('email', 'Email tidak valid').isEmail(),
    check('noHP', 'No HP tidak valid').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('contact-add', {
        title: 'Halaman Tambah Contact',
        layout: 'layouts/main-layout',
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      // flash message
      req.flash('msg', 'Data contact berhasil ditambahkan!');
      res.redirect('/contact');
    }
  }
);

app.get('/contact/add', (req, res) => {
  res.render('contact-add', {
    title: 'Halaman Tambah Contact',
    layout: 'layouts/main-layout',
  });
});

app.get('/contact/delete/:nama', (req, res) => {
  const contact = detailContact(req.params.nama);

  if (!contact) {
    res.status(404);
    res.send('<h1>404</h1>');
  } else {
    deleteContact(req.params.nama);
    req.flash('msg', 'Data contact berhasil dihapus!');
    res.redirect('/contact');
  }
});

app.post(
  '/contact/update',
  [
    body('nama').custom((value, { req }) => {
      const duplikat = cekDuplikat(value);
      if (value !== req.body.oldNama && duplikat) {
        throw new Error('Nama kontak sudah digunakan');
      }
      return true;
    }),
    check('email', 'Email tidak valid').isEmail(),
    check('noHP', 'No HP tidak valid').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('contact-edit', {
        title: 'Form Ubah Contact',
        layout: 'layouts/main-layout',
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      editContact(req.body);
      // // flash message
      req.flash('msg', 'Data contact berhasil diubah!');
      res.redirect('/contact');
    }
  }
);

app.get('/contact/edit/:nama', (req, res) => {
  const contact = detailContact(req.params.nama);
  res.render('contact-edit', {
    title: 'Form Ubah Data Contact',
    layout: 'layouts/main-layout',
    contact,
  });
});

app.get('/contact/:nama', (req, res) => {
  const nama = req.params.nama;
  const contact = detailContact(nama);
  res.render('detail', {
    title: 'Halaman Detail',
    layout: 'layouts/main-layout',
    contact,
  });
});

app.use((req, res) => {
  res.status(404);
  res.send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
