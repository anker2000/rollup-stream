"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const ava_1 = __importDefault(require("ava"));
const __1 = __importDefault(require(".."));
const helpers_1 = __importDefault(require("./helpers/helpers"));
const { read } = helpers_1.default;
const input = (0, path_1.join)(__dirname, 'fixtures/batman.js');
const output = { format: 'cjs', sourcemap: true, exports: 'auto' };
(0, ava_1.default)('sourcemap added', async (t) => {
    const stream = (0, __1.default)({ input, output });
    const result = await read(stream);
    t.snapshot(result);
});
(0, ava_1.default)('no sourcemap', async (t) => {
    const stream = (0, __1.default)({ input, output: { format: 'cjs', exports: 'auto' } });
    const result = await read(stream);
    t.snapshot(result);
});
//# sourceMappingURL=sourcemaps.js.map