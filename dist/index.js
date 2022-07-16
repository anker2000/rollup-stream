"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const rollup_1 = require("rollup");
const build = async (options, stream) => {
    const bundle = await (0, rollup_1.rollup)(options);
    stream.emit('bundle', bundle);
    const { output } = await bundle.generate(options.output);
    for (const chunk of output) {
        console.log("chunk",chunk.type);
        if (chunk.type === 'asset') {
            stream.push(chunk.source);
        }
        else {
            stream.push(chunk.code);
            if (chunk.map) {
                stream.push(`\n//# sourceMappingURL=${chunk.map.toUrl()}`);
            }
        }
    }
    // signal end of write
    stream.push(null);
};
const stream = (options) => {
    const result = new stream_1.Readable({
        // stub _read() as it's not available on Readable stream, needed by gulp et al
        read: () => { }
    });
    build(options, result).catch((error) => {
        result.emit('error', error);
    });
    return result;
};
exports.default = stream;
//# sourceMappingURL=index.js.map