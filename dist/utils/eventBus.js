"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const eventBus = new events_1.EventEmitter();
eventBus.setMaxListeners(20);
exports.default = eventBus;
