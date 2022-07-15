"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const read = (stream) => new Promise((p, f) => {
    let data = '';
    stream.on('end', () => p(data));
    stream.on('error', (err) => f(err));
    stream.on('data', (chunk) => {
        data += chunk.toString();
    });
});
const wait = (event, stream) => new Promise((p) => {
    stream.on(event, (data) => p(data));
});
exports.default = { read, wait };
//# sourceMappingURL=helpers.js.map