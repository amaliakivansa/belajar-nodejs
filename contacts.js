const fs = require('fs');
const chalk = require('chalk');

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

const saveContact = (name, email, phone) => {
  const contact = { name, email, phone };
  const contacts = loadContacts();

  contacts.push(contact);

  fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));

  console.log(chalk.green.inverse.bold('Terima kasih sudah menginput data.'));
};

const listContacts = () => {
  const contacts = loadContacts();

  console.log(chalk.cyan.inverse.bold('Daftar Kontak : '));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.name} - ${contact.phone}`);
  });
};

module.exports = { saveContact, listContacts };
