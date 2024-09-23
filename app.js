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

yargs.parse();
