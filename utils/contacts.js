const fs = require('fs');
// const chalk = require('chalk');

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

module.exports = { loadContacts };
