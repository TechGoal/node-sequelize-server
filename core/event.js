const path = require('path');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const Mail = require(path.resolve('./services/mail'));
const listeners = {
    'mail': Mail.send_mail
}

class Event {
    constructor() { }

    static convert_message(message, emit = false) {
        if (emit) {
            if (typeof message === 'string') {
                return message;
            } else {
                return JSON.stringify(message);
            }
        } else {
            try {
                return JSON.parse(message);
            } catch (error) {
                return message;
            }
        }
    }

    static async emit(topic, message) {
        return eventEmitter.emit(topic, Event.convert_message(message, true));
    }   

    static async initiate() {
        for (const topic in listeners) {
            if (Object.hasOwnProperty.call(listeners, topic)) {
                eventEmitter.on(topic, async function (message) {
                    return listeners[topic](Event.convert_message(message));
                });
            }
        }
    }
}

module.exports = Event;