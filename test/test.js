"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const ava_1 = __importDefault(require("ava"));
const __1 = __importDefault(require(".."));
const helpers_1 = __importDefault(require("./helpers/helpers"));
const { read, wait } = helpers_1.default;
const input = (0, path_1.join)(__dirname, 'fixtures/batman.js');
const output = { format: 'cjs', exports: 'auto' };
(0, ava_1.default)('exports', async (t) => {
    t.truthy(__1.default);
    t.is(typeof __1.default, 'function');
});
(0, ava_1.default)('return Readable', async (t) => {
    const stream = (0, __1.default)({}).on('error', () => { });
    t.is(stream.constructor.name, 'Readable');
});
(0, ava_1.default)('pass rollup errors', async (t) => {
    const stream = (0, __1.default)({});
    const result = await wait('error', stream);
    t.truthy(result);
    t.truthy(result instanceof Error);
    t.snapshot(result);
});
(0, ava_1.default)('bundle event', async (t) => {
    const stream = (0, __1.default)({ input, output });
    const bundle = (await wait('bundle', stream));
    t.truthy(bundle);
    const cache = bundle.cache;
    t.snapshot(cache.modules[0].ast);
    t.snapshot(cache.modules[0].code);
});
(0, ava_1.default)('read content', async (t) => {
    const stream = (0, __1.default)({ input, output });
    const result = await read(stream);
    t.truthy(result);
    t.snapshot(result);
});
(0, ava_1.default)('plugin build no warnings', async (t) => {
    let noWarnings = true;
    const testPlugin = {
        name: 'test-plugin',
        buildStart: () => { }
    };
    const plugins = [testPlugin];
    const stream = (0, __1.default)({
        input,
        output,
        plugins,
        onwarn: () => {
            noWarnings = false;
        }
    });
    const result = await read(stream);
    t.truthy(result);
    t.truthy(noWarnings);
    t.snapshot(noWarnings);
});
//# sourceMappingURL=test.js.map