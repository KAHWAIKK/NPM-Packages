

const logEvents = require('./logEvents');

//common core module events

//we first define an eventemitter
const EventEmitter = require('events')

//next we define a class

class MyEventEmitter extends EventEmitter {};

//initialize the object we will create
const myEventEmitter = new MyEventEmitter();

//add a listener for the log event

myEventEmitter.on('log'/* type of event to listen to */,(msg) => logEvents(msg))


setTimeout(() => {
    //Emit event
    myEventEmitter.emit('log','Log event emitted!')
 }, 2000
 //after 2 seconds it returns 2024-02-2816:22:34      b2488977-ba59-4de7-ac37-9c89390f9252Log event emitted! 
)

/* This is how you listen for and emit events for many sorts of actions like when we create a webserver, we want to emit events for what requests came in and log all of those that that we have a detailed activity*/