const fs = require('fs');

const path = './data';
if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
}

const contactsPath = './data/contacts.json';
if (!fs.existsSync(contactsPath)) {
  fs.writeFileSync(contactsPath, '[]', 'utf-8');
}

const loadContacts = () => {
  const fileBuffer = fs.readFileSync('./data/contacts.json', 'utf-8');
  const contacts = JSON.parse(fileBuffer);

  return contacts;
};

const detailContact = (nama) => {
  const contacts = loadContacts();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  return contact;
};

// menimpa file contacts.json dengan data baru
const saveContacts = (contact) => {
  fs.writeFileSync('./data/contacts.json', JSON.stringify(contact));
};

// menambahkan contact baru
const addContact = (contact) => {
  const contacts = loadContacts();
  contacts.push(contact);
  saveContacts(contacts);
};

const cekDuplikat = (nama) => {
  const contacts = loadContacts();
  return contacts.find((contact) => contact.nama === nama);
};

const deleteContact = (nama) => {
  const contacts = loadContacts();
  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );
  saveContacts(newContacts);
};

const editContact = (contactBaru) => {
  const contacts = loadContacts();
  const filteredContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== contactBaru.oldNama.toLowerCase()
  );
  delete contactBaru.oldNama;
  filteredContacts.push(contactBaru);
  saveContacts(filteredContacts);
};

module.exports = {
  loadContacts,
  detailContact,
  addContact,
  cekDuplikat,
  deleteContact,
  editContact,
};
