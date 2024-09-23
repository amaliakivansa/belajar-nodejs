const yargs = require('yargs');
const contacts = require('./contacts');

yargs
  .command({
    command: 'add',
    describe: 'Menambahkan sebuah kontak',
    builder: {
      nama: {
        describe: 'Nama lengkap',
        demandOption: true,
        type: 'string',
      },
      email: {
        describe: 'Email',
        demandOption: false,
        type: 'string',
      },
      noHP: {
        describe: 'Nomor handphone',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      contacts.saveContact(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand();

yargs.command({
  command: 'list',
  describe: 'Menampilkan semua kontak',
  handler() {
    contacts.listContacts();
  },
});

yargs.command({
  command: 'detail',
  describe: 'Menampilkan detail sebuah kontak berdasarkan nama',
  handler(argv) {
    contacts.detailContact(argv.nama);
  },
});

yargs.command({
  command: 'delete',
  describe: 'Menghapus kontak berdasarkan nama',
  handler(argv) {
    contacts.deleteContact(argv.nama);
  },
});

yargs.parse();
