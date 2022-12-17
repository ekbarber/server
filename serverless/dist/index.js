"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const compression_1 = __importDefault(require("compression"));
const FileStore = require('session-file-store')(express_session_1.default);
const body_parser_1 = __importDefault(require("body-parser"));
const lodash_1 = __importDefault(require("lodash"));
const debug_1 = __importDefault(require("debug"));
const initialStates_json_1 = __importDefault(require("./config/initialStates.json"));
const UserController_1 = require("./lib/controller/UserController");
const debug = (0, debug_1.default)('nextcloud');
const app = (0, express_1.default)();
const userController = new UserController_1.UserController();
app.use((0, compression_1.default)());
app.use((0, express_session_1.default)({
    secret: 'nextcloud',
    store: new FileStore()
}));
app.use((req, res, next) => {
    var _a;
    req.templateProps = {
        title: 'Nextcloud Serverless',
        userId: 'eddie',
        userName: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.userName,
        initialStates: lodash_1.default.mapValues(initialStates_json_1.default, (stateType) => lodash_1.default.mapValues(stateType, (state) => Buffer.from(JSON.stringify(state)).toString('base64')))
    };
    next();
});
app.set('view engine', 'pug');
app.use(express_1.default.static('resources'));
app.use((req, res, next) => {
    req.url = req.url.replace('index.php/', '');
    next();
});
app.get('/', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }
    debug({ initialStates: initialStates_json_1.default });
    res.render('dashboard', req.templateProps);
});
app.get('/login', (req, res) => {
    const props = {
        bodyId: 'body-login'
    };
    res.render('login', lodash_1.default.merge(req.templateProps, props));
});
app.post('/login', body_parser_1.default.urlencoded({ extended: false }), (req, res) => {
    const user = userController.createUser({ userName: req.body.userName });
    req.session.user = user;
    res.redirect('/');
});
app.get('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/login');
});
app.get('/settings/user', (req, res) => {
    const props = lodash_1.default.merge(req.templateProps, {
        appId: 'settings'
    });
    res.render('settings-user', props);
    return;
});
app.listen(3000);
