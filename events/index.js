const { EventEmitter } = require('events');

const birthdayEventListener = (name) => {
  console.log(`Happy birthday ${name}!`);
};

myEmitter = new EventEmitter();

myEmitter.on('birthday', birthdayEventListener);
myEmitter.emit('birthday', 'Alice');
