#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var inquirer = __importStar(require("inquirer"));
var build_1 = require("./build");
var ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
function getNetworkId(network) {
    switch (network) {
        case 'mainnet':
            return 1;
        case 'kovan':
            return 42;
        case 'ropsten':
            return 3;
        case 'custom':
            return 50;
    }
}
function getRpcUrl(network) {
    switch (network) {
        case 'mainnet':
            return 'https://mainnet.infura.io/';
        case 'kovan':
            return 'https://kovan.infura.io/';
        case 'ropsten':
            return 'https://ropsten.infura.io/';
        case 'custom':
            return 'http://localhost:8545/';
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var networkChoices, answers, networkId, options, dockerComposeYml;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    networkChoices = [
                        {
                            name: 'Mainnet',
                            value: 'mainnet',
                        },
                        {
                            name: 'Kovan',
                            value: 'kovan',
                        },
                        {
                            name: 'Ropsten',
                            value: 'ropsten',
                        },
                        {
                            name: 'Local / Custom',
                            value: 'custom',
                        },
                    ];
                    return [4 /*yield*/, inquirer.prompt([
                            {
                                type: 'list',
                                name: 'tokenType',
                                message: 'Select the kind of token you want to support on your exchange',
                                choices: ['ERC20', 'ERC721'],
                            },
                            {
                                type: 'list',
                                name: 'network',
                                message: 'Select the network you want to use',
                                choices: networkChoices,
                            },
                            {
                                type: 'input',
                                name: 'rpcUrl',
                                message: 'Select the RPC URL you want to use',
                                default: function (answers) {
                                    return getRpcUrl(answers.network);
                                },
                                validate: function (rpcUrl) {
                                    return /https?:\/\/.+/.test(rpcUrl) ? true : 'Please enter a valid URL';
                                },
                            },
                            {
                                type: 'input',
                                name: 'feeRecipient',
                                message: 'Enter the fee recipient:',
                                default: ZERO_ADDRESS,
                                validate: function (answer) {
                                    return /(0x)?[0-9a-fA-F]{40}/.test(answer) ? true : 'Please enter a valid address';
                                },
                            },
                            {
                                type: 'number',
                                name: 'makerFee',
                                message: 'Enter the maker fee:',
                                default: 0,
                                when: function (answers) { return answers.feeRecipient !== ZERO_ADDRESS; },
                            },
                            {
                                type: 'number',
                                name: 'takerFee',
                                message: 'Enter the taker fee:',
                                default: 0,
                                when: function (answers) { return answers.feeRecipient !== ZERO_ADDRESS; },
                            },
                            {
                                type: 'list',
                                name: 'theme',
                                message: 'Select the theme you want to use',
                                choices: [
                                    {
                                        name: 'Light',
                                        value: 'light',
                                    },
                                    {
                                        name: 'Dark',
                                        value: 'dark',
                                    },
                                ],
                            },
                            {
                                type: 'number',
                                name: 'port',
                                message: 'Enter the port for the server:',
                                default: 3001,
                                validate: function (port) {
                                    return 1 <= port && port <= 65535 ? true : 'Enter a port between 1 and 65535';
                                },
                            },
                        ])];
                case 1:
                    answers = _a.sent();
                    networkId = getNetworkId(answers.network);
                    options = {
                        tokenType: answers.tokenType,
                        networkId: networkId,
                        rpcUrl: answers.rpcUrl,
                        feeRecipient: answers.feeRecipient || ZERO_ADDRESS,
                        theme: answers.theme,
                        port: answers.port,
                        makerFee: answers.makerFee,
                        takerFee: answers.takerFee,
                    };
                    dockerComposeYml = build_1.buildDockerComposeYml(options);
                    fs.writeFileSync('docker-compose.yml', dockerComposeYml);
                    return [2 /*return*/];
            }
        });
    });
}
main();
