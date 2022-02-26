"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const tslog_1 = require("tslog");
exports.log = new tslog_1.Logger({ name: "alten" });
/*
log.silly("I am a silly log.");
log.trace("I am a trace log with a stack trace.");
log.debug("I am a debug log.");
log.info("I am an info log.");
log.warn("I am a warn log with a json object:", { foo: "bar" });
log.error("I am an error log.");
log.fatal(new Error("I am a pretty Error with a stacktrace."));
Documentation here: https://tslog.js.org/#/
*/
//# sourceMappingURL=logger.js.map