const version = '1.0.0-rc.15';
// do not use isUndefined
const isBrowser = typeof window !== 'undefined';
// do not use isUndefined
const globalThis = (typeof global !== 'undefined')
    ? global
    : ((typeof window !== 'undefined')
        ? window
        : ((typeof self !== 'undefined') ? self : Function('return this')()));
const noopFalse = () => false;
// Array.isArray
const isArray = Array.isArray;
// Object.assign
const assign = Object.assign;
// Object prototype methods
const rawDefineProperty = Object.defineProperty;
const rawDefineProperties = Object.defineProperties;
const rawToString = Object.prototype.toString;
const rawHasOwnProperty = Object.prototype.hasOwnProperty;
const toTypeString = (value) => rawToString.call(value);
// is Undefined
function isUndefined(target) {
    return target === undefined;
}
// is Null
function isNull(target) {
    return target === null;
}
// is String
function isString(target) {
    return typeof target === 'string';
}
// is Boolean
function isBoolean(target) {
    return typeof target === 'boolean';
}
// is Number
function isNumber(target) {
    return typeof target === 'number';
}
// is function
function isFunction(target) {
    return typeof target === 'function';
}
// is PlainObject
function isPlainObject(target) {
    return toTypeString(target) === '[object Object]';
}
// is Object
function isObject(target) {
    return !isNull(target) && typeof target === 'object';
}
// is Promise
function isPromise(target) {
    return toTypeString(target) === '[object Promise]';
}
// is bind function
function isBoundFunction(target) {
    var _a;
    return isFunction(target) && ((_a = target.name) === null || _a === void 0 ? void 0 : _a.indexOf('bound ')) === 0 && !target.hasOwnProperty('prototype');
}
// is constructor function
function isConstructor(target) {
    var _a;
    if (isFunction(target)) {
        const targetStr = target.toString();
        return (((_a = target.prototype) === null || _a === void 0 ? void 0 : _a.constructor) === target &&
            Object.getOwnPropertyNames(target.prototype).length > 1) ||
            /^function\s+[A-Z]/.test(targetStr) ||
            /^class\s+/.test(targetStr);
    }
    return false;
}
// is ShadowRoot
function isShadowRoot(target) {
    return typeof ShadowRoot !== 'undefined' && target instanceof ShadowRoot;
}
function isURL(target) {
    var _a;
    return target instanceof URL || !!((_a = target) === null || _a === void 0 ? void 0 : _a.href);
}
// iframe element not instanceof base app Element, use tagName instead
function isElement(target) {
    var _a;
    return target instanceof Element || isString((_a = target) === null || _a === void 0 ? void 0 : _a.tagName);
}
// iframe node not instanceof base app Node, use nodeType instead
function isNode(target) {
    var _a;
    return target instanceof Node || isNumber((_a = target) === null || _a === void 0 ? void 0 : _a.nodeType);
}
function isAnchorElement(target) {
    return toTypeString(target) === '[object HTMLAnchorElement]';
}
function isAudioElement(target) {
    return toTypeString(target) === '[object HTMLAudioElement]';
}
function isVideoElement(target) {
    return toTypeString(target) === '[object HTMLVideoElement]';
}
function isLinkElement(target) {
    return toTypeString(target) === '[object HTMLLinkElement]';
}
function isStyleElement(target) {
    return toTypeString(target) === '[object HTMLStyleElement]';
}
function isScriptElement(target) {
    return toTypeString(target) === '[object HTMLScriptElement]';
}
function isIFrameElement(target) {
    return toTypeString(target) === '[object HTMLIFrameElement]';
}
function isDivElement(target) {
    return toTypeString(target) === '[object HTMLDivElement]';
}
function isImageElement(target) {
    return toTypeString(target) === '[object HTMLImageElement]';
}
function isBaseElement(target) {
    return toTypeString(target) === '[object HTMLBaseElement]';
}
function isDocumentFragment(target) {
    return toTypeString(target) === '[object DocumentFragment]';
}
function isDocumentShadowRoot(target) {
    return toTypeString(target) === '[object ShadowRoot]';
}
function isMicroAppBody(target) {
    return isElement(target) && target.tagName.toUpperCase() === 'MICRO-APP-BODY';
}
function isMicroAppHead(target) {
    return isElement(target) && target.tagName.toUpperCase() === 'MICRO-APP-HEAD';
}
function isWebComponentElement(target) {
    let result = toTypeString(target) === '[object HTMLElement]';
    if (result) {
        const tagName = target.tagName.toUpperCase();
        result = result && !tagName.startsWith('MICRO-APP');
    }
    return result;
}
// is ProxyDocument
function isProxyDocument(target) {
    return toTypeString(target) === '[object ProxyDocument]';
}
function isTargetExtension(path, suffix) {
    try {
        return createURL(path).pathname.split('.').pop() === suffix;
    }
    catch (_a) {
        return false;
    }
}
function includes(target, searchElement, fromIndex) {
    if (target == null) {
        throw new TypeError('includes target is null or undefined');
    }
    const O = Object(target);
    const len = parseInt(O.length, 10) || 0;
    if (len === 0)
        return false;
    // @ts-ignore
    fromIndex = parseInt(fromIndex, 10) || 0;
    let i = Math.max(fromIndex >= 0 ? fromIndex : len + fromIndex, 0);
    while (i < len) {
        // NaN !== NaN
        if (searchElement === O[i] || (searchElement !== searchElement && O[i] !== O[i])) {
            return true;
        }
        i++;
    }
    return false;
}
/**
 * format error log
 * @param msg message
 * @param appName app name, default is null
 */
function logError(msg, appName = null, ...rest) {
    const appNameTip = appName && isString(appName) ? ` app ${appName}:` : '';
    if (isString(msg)) {
        console.error(`[micro-app]${appNameTip} ${msg}`, ...rest);
    }
    else {
        console.error(`[micro-app]${appNameTip}`, msg, ...rest);
    }
}
/**
 * format warn log
 * @param msg message
 * @param appName app name, default is null
 */
function logWarn(msg, appName = null, ...rest) {
    const appNameTip = appName && isString(appName) ? ` app ${appName}:` : '';
    if (isString(msg)) {
        console.warn(`[micro-app]${appNameTip} ${msg}`, ...rest);
    }
    else {
        console.warn(`[micro-app]${appNameTip}`, msg, ...rest);
    }
}
/**
 * async execution
 * @param fn callback
 * @param args params
 */
function defer(fn, ...args) {
    Promise.resolve().then(fn.bind(null, ...args));
}
/**
 * async execution with macro task
 * @param fn callback
 * @param args params
 */
function macro(fn, delay = 0, ...args) {
    setTimeout(fn.bind(null, ...args), delay);
}
/**
 * create URL as MicroLocation
 */
const createURL = (function () {
    class Location extends URL {
    }
    return (path, base) => {
        return (base ? new Location('' + path, base) : new Location('' + path));
    };
})();
/**
 * Add address protocol
 * @param url address
 */
function addProtocol(url) {
    return url.startsWith('//') ? `${globalThis.location.protocol}${url}` : url;
}
/**
 * format URL address
 * note the scenes:
 * 1. micro-app -> attributeChangedCallback
 * 2. preFetch
 */
function formatAppURL(url, appName = null) {
    if (!isString(url) || !url)
        return '';
    try {
        const { origin, pathname, search } = createURL(addProtocol(url), (window.rawWindow || window).location.href);
        /**
         * keep the original url unchanged, such as .html .node .php .net .etc, search, except hash
         * BUG FIX: Never using '/' to complete url, refer to https://github.com/micro-zoe/micro-app/issues/1147
         */
        const fullPath = `${origin}${pathname}${search}`;
        return /^https?:\/\//.test(fullPath) ? fullPath : '';
    }
    catch (e) {
        logError(e, appName);
        return '';
    }
}
/**
 * format name
 * note the scenes:
 * 1. micro-app -> attributeChangedCallback
 * 2. event_center -> EventCenterForMicroApp -> constructor
 * 3. event_center -> EventCenterForBaseApp -> all methods
 * 4. preFetch
 * 5. plugins
 * 6. router api (push, replace)
 */
function formatAppName(name) {
    if (!isString(name) || !name)
        return '';
    return name.replace(/(^\d+)|([^\w\d-_])/gi, '');
}
/**
 * Get valid address, such as
 *  1. https://domain/xx/xx.html to https://domain/xx/
 *  2. https://domain/xx to https://domain/xx/
 * @param url app.url
 */
function getEffectivePath(url) {
    const { origin, pathname } = createURL(url);
    if (/\.(\w+)$/.test(pathname)) {
        const pathArr = `${origin}${pathname}`.split('/');
        pathArr.pop();
        return pathArr.join('/') + '/';
    }
    return `${origin}${pathname}/`.replace(/\/\/$/, '/');
}
/**
 * Complete address
 * @param path address
 * @param baseURI base url(app.url)
 */
function CompletionPath(path, baseURI) {
    if (!path ||
        /^((((ht|f)tps?)|file):)?\/\//.test(path) ||
        /^(data|blob):/.test(path))
        return path;
    return createURL(path, getEffectivePath(addProtocol(baseURI))).toString();
}
/**
 * Get the folder where the link resource is located,
 * which is used to complete the relative address in the css
 * @param linkPath full link address
 */
function getLinkFileDir(linkPath) {
    const pathArr = linkPath.split('/');
    pathArr.pop();
    return addProtocol(pathArr.join('/') + '/');
}
/**
 * promise stream
 * @param promiseList promise list
 * @param successCb success callback
 * @param errorCb failed callback
 * @param finallyCb finally callback
 */
function promiseStream(promiseList, successCb, errorCb, finallyCb) {
    let finishedNum = 0;
    function isFinished() {
        if (++finishedNum === promiseList.length && finallyCb)
            finallyCb();
    }
    promiseList.forEach((p, i) => {
        if (isPromise(p)) {
            p.then((res) => {
                successCb({ data: res, index: i });
                isFinished();
            }).catch((err) => {
                errorCb({ error: err, index: i });
                isFinished();
            });
        }
        else {
            successCb({ data: p, index: i });
            isFinished();
        }
    });
}
// Check whether the browser supports module script
function isSupportModuleScript() {
    const s = document.createElement('script');
    return 'noModule' in s;
}
// Create a random symbol string
function createNonceSrc() {
    return 'inline-' + Math.random().toString(36).substr(2, 15);
}
// Array deduplication
function unique(array) {
    return array.filter(function (item) {
        return item in this ? false : (this[item] = true);
    }, Object.create(null));
}
// requestIdleCallback polyfill
const requestIdleCallback = globalThis.requestIdleCallback ||
    function (fn) {
        const lastTime = Date.now();
        return setTimeout(function () {
            fn({
                didTimeout: false,
                timeRemaining() {
                    return Math.max(0, 50 - (Date.now() - lastTime));
                },
            });
        }, 1);
    };
/**
 * Wrap requestIdleCallback with promise
 * Exec callback when browser idle
 */
function promiseRequestIdle(callback) {
    return new Promise((resolve) => {
        requestIdleCallback(() => {
            callback(resolve);
        });
    });
}
/**
 * Record the currently running app.name
 */
let currentAppName = null;
function setCurrentAppName(appName) {
    currentAppName = appName;
}
// get the currently running app.name
function getCurrentAppName() {
    return currentAppName;
}
function throttleDeferForSetAppName(appName) {
    if (currentAppName !== appName && !getPreventSetState()) {
        setCurrentAppName(appName);
        defer(() => {
            setCurrentAppName(null);
        });
    }
}
// only for iframe document.body(head).querySelector(querySelectorAll)
let iframeCurrentAppName = null;
function setIframeCurrentAppName(appName) {
    iframeCurrentAppName = appName;
}
function getIframeCurrentAppName() {
    return iframeCurrentAppName;
}
function throttleDeferForIframeAppName(appName) {
    if (iframeCurrentAppName !== appName && !getPreventSetState()) {
        setIframeCurrentAppName(appName);
        defer(() => {
            setIframeCurrentAppName(null);
        });
    }
}
// prevent set app name
let preventSetState = false;
function getPreventSetState() {
    return preventSetState;
}
/**
 * prevent set appName
 * usage:
 * removeDomScope(true)
 * -----> element scope point to base app <-----
 * removeDomScope(false)
 */
function removeDomScope(force) {
    if (force !== false) {
        setCurrentAppName(null);
        setIframeCurrentAppName(null);
        if (force && !preventSetState) {
            preventSetState = true;
            defer(() => {
                preventSetState = false;
            });
        }
    }
    else {
        preventSetState = false;
    }
}
/**
 * Create pure elements
 */
function pureCreateElement(tagName, options) {
    const element = (window.rawDocument || document).createElement(tagName, options);
    if (element.__MICRO_APP_NAME__)
        delete element.__MICRO_APP_NAME__;
    element.__PURE_ELEMENT__ = true;
    return element;
}
// is invalid key of querySelector
function isInvalidQuerySelectorKey(key) {
    return !key || /(^\d)|([^\w\d-_\u4e00-\u9fa5])/gi.test(key);
}
// unique element
function isUniqueElement(key) {
    return (/^body$/i.test(key) ||
        /^head$/i.test(key) ||
        /^html$/i.test(key) ||
        /^title$/i.test(key) ||
        /^:root$/i.test(key));
}
/**
 * get micro-app element
 * @param target app container
 */
function getRootContainer(target) {
    return (isShadowRoot(target) ? target.host : target);
}
/**
 * trim start & end
 */
function trim(str) {
    return str ? str.replace(/^\s+|\s+$/g, '') : '';
}
function isFireFox() {
    return navigator.userAgent.indexOf('Firefox') > -1;
}
/**
 * Transforms a queryString into object.
 * @param search - search string to parse
 * @returns a query object
 */
function parseQuery(search) {
    const result = {};
    const queryList = search.split('&');
    // we will not decode the key/value to ensure that the values are consistent when update URL
    for (const queryItem of queryList) {
        const eqPos = queryItem.indexOf('=');
        const key = eqPos < 0 ? queryItem : queryItem.slice(0, eqPos);
        const value = eqPos < 0 ? null : queryItem.slice(eqPos + 1);
        if (key in result) {
            let currentValue = result[key];
            if (!isArray(currentValue)) {
                currentValue = result[key] = [currentValue];
            }
            currentValue.push(value);
        }
        else {
            result[key] = value;
        }
    }
    return result;
}
/**
 * Transforms an object to query string
 * @param queryObject - query object to stringify
 * @returns query string without the leading `?`
 */
function stringifyQuery(queryObject) {
    let result = '';
    for (const key in queryObject) {
        const value = queryObject[key];
        if (isNull(value)) {
            result += (result.length ? '&' : '') + key;
        }
        else {
            const valueList = isArray(value) ? value : [value];
            valueList.forEach(value => {
                if (!isUndefined(value)) {
                    result += (result.length ? '&' : '') + key;
                    if (!isNull(value))
                        result += '=' + value;
                }
            });
        }
    }
    return result;
}
/**
 * Register or unregister callback/guard with Set
 */
function useSetRecord() {
    const handlers = new Set();
    function add(handler) {
        handlers.add(handler);
        return () => {
            if (handlers.has(handler))
                return handlers.delete(handler);
            return false;
        };
    }
    return {
        add,
        list: () => handlers,
    };
}
/**
 * record data with Map
 */
function useMapRecord() {
    const data = new Map();
    function add(key, value) {
        data.set(key, value);
        return () => {
            if (data.has(key))
                return data.delete(key);
            return false;
        };
    }
    return {
        add,
        get: (key) => data.get(key),
        delete: (key) => {
            if (data.has(key))
                return data.delete(key);
            return false;
        }
    };
}
function getAttributes(element) {
    const attr = element.attributes;
    const attrMap = new Map();
    for (let i = 0; i < attr.length; i++) {
        attrMap.set(attr[i].name, attr[i].value);
    }
    return attrMap;
}
/**
 * if fiberTasks exist, wrap callback with promiseRequestIdle
 * if not, execute callback
 * @param fiberTasks fiber task list
 * @param callback action callback
 */
function injectFiberTask(fiberTasks, callback) {
    if (fiberTasks) {
        fiberTasks.push(() => promiseRequestIdle((resolve) => {
            callback();
            resolve();
        }));
    }
    else {
        callback();
    }
}
/**
 * serial exec fiber task of link, style, script
 * @param tasks task array or null
 */
function serialExecFiberTasks(tasks) {
    return (tasks === null || tasks === void 0 ? void 0 : tasks.reduce((pre, next) => pre.then(next), Promise.resolve())) || null;
}
/**
 * inline script start with inline-xxx
 * @param address source address
 */
function isInlineScript(address) {
    return address.startsWith('inline-');
}
/**
 * call function with try catch
 * @param fn target function
 * @param appName app.name
 * @param args arguments
 */
function execMicroAppGlobalHook(fn, appName, hookName, ...args) {
    try {
        isFunction(fn) && fn(...args);
    }
    catch (e) {
        logError(`An error occurred in app ${appName} window.${hookName} \n`, null, e);
    }
}
/**
 * remove all childNode from target node
 * @param $dom target node
 */
function clearDOM($dom) {
    while ($dom === null || $dom === void 0 ? void 0 : $dom.firstChild) {
        $dom.removeChild($dom.firstChild);
    }
}
function instanceOf(instance, constructor) {
    if (instance === null || instance === undefined) {
        return false;
    }
    else if (!isFunction(constructor)) {
        throw new TypeError("Right-hand side of 'instanceof' is not callable");
    }
    let proto = Object.getPrototypeOf(instance);
    while (proto) {
        if (proto === constructor.prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}
/**
 * Format event name
 * In with sandbox, child event and lifeCycles bind to microAppElement, there are two events with same name - mounted unmount, it should be handled specifically to prevent conflicts
 * Issue: https://github.com/micro-zoe/micro-app/issues/1161
 * @param type event name
 * @param appName app name
 */
const formatEventList = ['mounted', 'unmount'];
function formatEventType(type, appName) {
    return formatEventList.includes(type) ? `${type}-${appName}` : type;
}
/**
 * Is the object empty
 * target maybe number, string, array ...
 */
function isEmptyObject(target) {
    return isPlainObject(target) ? !Object.keys(target).length : true;
}

function formatEventInfo(event, element) {
    Object.defineProperties(event, {
        currentTarget: {
            get() {
                return element;
            }
        },
        target: {
            get() {
                return element;
            }
        },
    });
}
/**
 * dispatch lifeCycles event to base app
 * created, beforemount, mounted, unmount, error
 * @param element container
 * @param appName app.name
 * @param lifecycleName lifeCycle name
 * @param error param from error hook
 */
function dispatchLifecyclesEvent(element, appName, lifecycleName, error) {
    var _a;
    if (!element) {
        return logWarn(`element does not exist in lifecycle ${lifecycleName}`, appName);
    }
    element = getRootContainer(element);
    // clear dom scope before dispatch lifeCycles event to base app, especially mounted & unmount
    removeDomScope();
    const detail = assign({
        name: appName,
        container: element,
    }, error && {
        error
    });
    const event = new CustomEvent(lifecycleName, {
        detail,
    });
    formatEventInfo(event, element);
    // global hooks
    if (isFunction((_a = microApp.options.lifeCycles) === null || _a === void 0 ? void 0 : _a[lifecycleName])) {
        microApp.options.lifeCycles[lifecycleName](event, appName);
    }
    element.dispatchEvent(event);
}
/**
 * Dispatch custom event to micro app
 * @param app app
 * @param eventName event name ['mounted', 'unmount', 'appstate-change', 'statechange']
 * @param detail event detail
 */
function dispatchCustomEventToMicroApp(app, eventName, detail = {}) {
    var _a;
    const event = new CustomEvent(formatEventType(eventName, app.name), {
        detail,
    });
    (_a = app.sandBox) === null || _a === void 0 ? void 0 : _a.microAppWindow.dispatchEvent(event);
}

/**
 * fetch source of html, js, css
 * @param url source path
 * @param appName app name
 * @param config fetch options
 */
function fetchSource(url, appName = null, options = {}) {
    /**
     * When child navigate to new async page, click event will scope dom to child and then fetch new source
     * this may cause error when fetch rewrite by baseApp
     * e.g.
     * baseApp: <script crossorigin src="https://sgm-static.jd.com/sgm-2.8.0.js" name="SGMH5" sid="6f88a6e4ba4b4ae5acef2ec22c075085" appKey="jdb-adminb2b-pc"></script>
     */
    removeDomScope();
    if (isFunction(microApp.options.fetch)) {
        return microApp.options.fetch(url, options, appName);
    }
    // Don’t use globalEnv.rawWindow.fetch, will cause sgm-2.8.0.js throw error in nest app
    return window.fetch(url, options).then((res) => {
        return res.text();
    });
}

class HTMLLoader {
    static getInstance() {
        if (!this.instance) {
            this.instance = new HTMLLoader();
        }
        return this.instance;
    }
    /**
     * run logic of load and format html
     * @param successCb success callback
     * @param errorCb error callback, type: (err: Error, meetFetchErr: boolean) => void
     */
    run(app, successCb) {
        const appName = app.name;
        const htmlUrl = app.ssrUrl || app.url;
        const isJsResource = isTargetExtension(htmlUrl, 'js');
        const htmlPromise = isJsResource
            ? Promise.resolve(`<micro-app-head><script src='${htmlUrl}'></script></micro-app-head><micro-app-body></micro-app-body>`)
            : fetchSource(htmlUrl, appName, { cache: 'no-cache' });
        htmlPromise.then((htmlStr) => {
            if (!htmlStr) {
                const msg = 'html is empty, please check in detail';
                app.onerror(new Error(msg));
                return logError(msg, appName);
            }
            htmlStr = this.formatHTML(htmlUrl, htmlStr, appName);
            successCb(htmlStr, app);
        }).catch((e) => {
            logError(`Failed to fetch data from ${app.url}, micro-app stop rendering`, appName, e);
            app.onLoadError(e);
        });
    }
    formatHTML(htmlUrl, htmlStr, appName) {
        return this.processHtml(htmlUrl, htmlStr, appName, microApp.options.plugins)
            .replace(/<head[^>]*>[\s\S]*?<\/head>/i, (match) => {
            return match
                .replace(/<head/i, '<micro-app-head')
                .replace(/<\/head>/i, '</micro-app-head>');
        })
            .replace(/<body[^>]*>[\s\S]*?<\/body>/i, (match) => {
            return match
                .replace(/<body/i, '<micro-app-body')
                .replace(/<\/body>/i, '</micro-app-body>');
        });
    }
    processHtml(url, code, appName, plugins) {
        var _a;
        if (!plugins)
            return code;
        const mergedPlugins = [];
        plugins.global && mergedPlugins.push(...plugins.global);
        ((_a = plugins.modules) === null || _a === void 0 ? void 0 : _a[appName]) && mergedPlugins.push(...plugins.modules[appName]);
        if (mergedPlugins.length > 0) {
            return mergedPlugins.reduce((preCode, plugin) => {
                if (isPlainObject(plugin) && isFunction(plugin.processHtml)) {
                    return plugin.processHtml(preCode, url);
                }
                return preCode;
            }, code);
        }
        return code;
    }
}

// common reg
const rootSelectorREG = /(^|\s+)(html|:root)(?=[\s>~[.#:]+|$)/;
const bodySelectorREG = /(^|\s+)((html[\s>~]+body)|body)(?=[\s>~[.#:]+|$)/;
function parseError(msg, linkPath) {
    msg = linkPath ? `${linkPath} ${msg}` : msg;
    const err = new Error(msg);
    err.reason = msg;
    if (linkPath) {
        err.filename = linkPath;
    }
    throw err;
}
/**
 * Reference https://github.com/reworkcss/css
 * CSSParser mainly deals with 3 scenes: styleRule, @, and comment
 * And scopecss deals with 2 scenes: selector & url
 * And can also disable scopecss with inline comments
 */
class CSSParser {
    constructor() {
        this.cssText = ''; // css content
        this.prefix = ''; // prefix as micro-app[name=xxx]
        this.baseURI = ''; // domain name
        this.linkPath = ''; // link resource address, if it is the style converted from link, it will have linkPath
        this.result = ''; // parsed cssText
        this.scopecssDisable = false; // use block comments /* scopecss-disable */ to disable scopecss in your file, and use /* scopecss-enable */ to enable scopecss
        this.scopecssDisableSelectors = []; // disable or enable scopecss for specific selectors
        this.scopecssDisableNextLine = false; // use block comments /* scopecss-disable-next-line */ to disable scopecss on a specific line
        // https://developer.mozilla.org/en-US/docs/Web/API/CSSMediaRule
        this.mediaRule = this.createMatcherForRuleWithChildRule(/^@media *([^{]+)/, '@media');
        // https://developer.mozilla.org/en-US/docs/Web/API/CSSSupportsRule
        this.supportsRule = this.createMatcherForRuleWithChildRule(/^@supports *([^{]+)/, '@supports');
        this.documentRule = this.createMatcherForRuleWithChildRule(/^@([-\w]+)?document *([^{]+)/, '@document');
        this.hostRule = this.createMatcherForRuleWithChildRule(/^@host\s*/, '@host');
        // :global is CSS Modules rule, it will be converted to normal syntax
        // private globalRule = this.createMatcherForRuleWithChildRule(/^:global([^{]*)/, ':global')
        // https://developer.mozilla.org/en-US/docs/Web/API/CSSImportRule
        this.importRule = this.createMatcherForNoneBraceAtRule('import');
        // Removed in most browsers
        this.charsetRule = this.createMatcherForNoneBraceAtRule('charset');
        // https://developer.mozilla.org/en-US/docs/Web/API/CSSNamespaceRule
        this.namespaceRule = this.createMatcherForNoneBraceAtRule('namespace');
        // https://developer.mozilla.org/en-US/docs/Web/CSS/@container
        this.containerRule = this.createMatcherForRuleWithChildRule(/^@container *([^{]+)/, '@container');
    }
    exec(cssText, prefix, baseURI, linkPath) {
        this.cssText = cssText;
        this.prefix = prefix;
        this.baseURI = baseURI;
        this.linkPath = linkPath || '';
        this.matchRules();
        return isFireFox() ? decodeURIComponent(this.result) : this.result;
    }
    reset() {
        this.cssText = this.prefix = this.baseURI = this.linkPath = this.result = '';
        this.scopecssDisable = this.scopecssDisableNextLine = false;
        this.scopecssDisableSelectors = [];
    }
    // core action for match rules
    matchRules() {
        this.matchLeadingSpaces();
        this.matchComments();
        while (this.cssText.length &&
            this.cssText.charAt(0) !== '}' &&
            (this.matchAtRule() || this.matchStyleRule())) {
            this.matchComments();
        }
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleRule
    matchStyleRule() {
        const selectors = this.formatSelector(true);
        // reset scopecssDisableNextLine
        this.scopecssDisableNextLine = false;
        if (!selectors)
            return this.printError('selector missing', this.linkPath);
        this.recordResult(selectors);
        this.matchComments();
        this.styleDeclarations();
        this.matchLeadingSpaces();
        return true;
    }
    formatSelector(skip) {
        const m = this.commonMatch(/^[^{]+/, skip);
        if (!m)
            return false;
        /**
         * NOTE:
         *  1. :is(h1, h2, h3):has(+ h2, + h3, + h4) {}
         *    should be ==> micro-app[name=xxx] :is(h1, h2, h3):has(+ h2, + h3, + h4) {}
         *  2. :dir(ltr) {}
         *    should be ==> micro-app[name=xxx] :dir(ltr) {}
         *  3. body :not(div, .fancy) {}
         *    should be ==> micro-app[name=xxx] micro-app-body :not(div, .fancy) {}
         *  4. .a, .b, li:nth-child(3)
         *    should be ==> micro-app[name=xxx] .a, micro-app[name=xxx] .b, micro-app[name=xxx] li:nth-child(3)
         *  5. :is(.a, .b, .c) a {}
         *    should be ==> micro-app[name=xxx] :is(.a, .b, .c) a {}
         *  6. :where(.a, .b, .c) a {}
         *    should be ==> micro-app[name=xxx] :where(.a, .b, .c) a {}
         */
        return m[0].replace(/(^|,[\n\s]*)([^,]+)/g, (_, separator, selector) => {
            selector = trim(selector);
            if (selector && !(this.scopecssDisableNextLine ||
                (this.scopecssDisable && (!this.scopecssDisableSelectors.length ||
                    this.scopecssDisableSelectors.includes(selector))) ||
                rootSelectorREG.test(selector))) {
                if (bodySelectorREG.test(selector)) {
                    selector = selector.replace(bodySelectorREG, this.prefix + ' micro-app-body');
                }
                else {
                    selector = this.prefix + ' ' + selector;
                }
            }
            return separator + selector;
        });
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration
    styleDeclarations() {
        if (!this.matchOpenBrace())
            return this.printError("Declaration missing '{'", this.linkPath);
        this.matchAllDeclarations();
        if (!this.matchCloseBrace())
            return this.printError("Declaration missing '}'", this.linkPath);
        return true;
    }
    matchAllDeclarations(nesting = 0) {
        let cssValue = this.commonMatch(/^(?:url\(["']?(?:[^)"'}]+)["']?\)|[^{}/])*/, true)[0];
        if (cssValue) {
            if (!this.scopecssDisableNextLine &&
                (!this.scopecssDisable || this.scopecssDisableSelectors.length)) {
                cssValue = cssValue.replace(/url\(["']?([^)"']+)["']?\)/gm, (all, $1) => {
                    if (/^((data|blob):|#|%23)/.test($1) || /^(https?:)?\/\//.test($1)) {
                        return all;
                    }
                    // ./a/b.png  ../a/b.png  a/b.png
                    if (/^((\.\.?\/)|[^/])/.test($1) && this.linkPath) {
                        this.baseURI = getLinkFileDir(this.linkPath);
                    }
                    return `url("${CompletionPath($1, this.baseURI)}")`;
                });
            }
            this.recordResult(cssValue);
        }
        // reset scopecssDisableNextLine
        this.scopecssDisableNextLine = false;
        if (!this.cssText.length)
            return;
        // extract comments in declarations
        if (this.cssText.charAt(0) === '/') {
            if (this.cssText.charAt(1) === '*') {
                this.matchComments();
            }
            else {
                this.commonMatch(/\/+/);
            }
        }
        else if (this.cssText.charAt(0) === '{') {
            this.matchOpenBrace();
            nesting++;
        }
        else if (this.cssText.charAt(0) === '}') {
            if (nesting < 1)
                return;
            this.matchCloseBrace();
            nesting--;
        }
        return this.matchAllDeclarations(nesting);
    }
    matchAtRule() {
        if (this.cssText[0] !== '@')
            return false;
        // reset scopecssDisableNextLine
        this.scopecssDisableNextLine = false;
        return this.keyframesRule() ||
            this.mediaRule() ||
            this.customMediaRule() ||
            this.supportsRule() ||
            this.importRule() ||
            this.charsetRule() ||
            this.namespaceRule() ||
            this.containerRule() ||
            this.documentRule() ||
            this.pageRule() ||
            this.hostRule() ||
            this.fontFaceRule() ||
            this.layerRule();
    }
    // :global is CSS Modules rule, it will be converted to normal syntax
    // private matchGlobalRule (): boolean | void {
    //   if (this.cssText[0] !== ':') return false
    //   // reset scopecssDisableNextLine
    //   this.scopecssDisableNextLine = false
    //   return this.globalRule()
    // }
    // https://developer.mozilla.org/en-US/docs/Web/API/CSSKeyframesRule
    keyframesRule() {
        if (!this.commonMatch(/^@([-\w]+)?keyframes\s*/))
            return false;
        if (!this.commonMatch(/^[^{]+/))
            return this.printError('@keyframes missing name', this.linkPath);
        this.matchComments();
        if (!this.matchOpenBrace())
            return this.printError("@keyframes missing '{'", this.linkPath);
        this.matchComments();
        while (this.keyframeRule()) {
            this.matchComments();
        }
        if (!this.matchCloseBrace())
            return this.printError("@keyframes missing '}'", this.linkPath);
        this.matchLeadingSpaces();
        return true;
    }
    keyframeRule() {
        let r;
        const valList = [];
        while (r = this.commonMatch(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)) {
            valList.push(r[1]);
            this.commonMatch(/^,\s*/);
        }
        if (!valList.length)
            return false;
        this.styleDeclarations();
        this.matchLeadingSpaces();
        return true;
    }
    // https://github.com/postcss/postcss-custom-media
    customMediaRule() {
        if (!this.commonMatch(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/))
            return false;
        this.matchLeadingSpaces();
        return true;
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/CSSPageRule
    pageRule() {
        if (!this.commonMatch(/^@page */))
            return false;
        this.formatSelector(false);
        // reset scopecssDisableNextLine
        this.scopecssDisableNextLine = false;
        return this.commonHandlerForAtRuleWithSelfRule('page');
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/CSSFontFaceRule
    fontFaceRule() {
        if (!this.commonMatch(/^@font-face\s*/))
            return false;
        return this.commonHandlerForAtRuleWithSelfRule('font-face');
    }
    // https://developer.mozilla.org/en-US/docs/Web/CSS/@layer
    layerRule() {
        if (!this.commonMatch(/^@layer\s*([^{;]+)/))
            return false;
        if (!this.matchOpenBrace())
            return !!this.commonMatch(/^[;]+/);
        this.matchComments();
        this.matchRules();
        if (!this.matchCloseBrace())
            return this.printError('@layer missing \'}\'', this.linkPath);
        this.matchLeadingSpaces();
        return true;
    }
    // common matcher for @media, @supports, @document, @host, :global, @container
    createMatcherForRuleWithChildRule(reg, name) {
        return () => {
            if (!this.commonMatch(reg))
                return false;
            if (!this.matchOpenBrace())
                return this.printError(`${name} missing '{'`, this.linkPath);
            this.matchComments();
            this.matchRules();
            if (!this.matchCloseBrace())
                return this.printError(`${name} missing '}'`, this.linkPath);
            this.matchLeadingSpaces();
            return true;
        };
    }
    // common matcher for @import, @charset, @namespace
    createMatcherForNoneBraceAtRule(name) {
        const reg = new RegExp('^@' + name + '\\s*([^;]+);');
        return () => {
            if (!this.commonMatch(reg))
                return false;
            this.matchLeadingSpaces();
            return true;
        };
    }
    // common handler for @font-face, @page
    commonHandlerForAtRuleWithSelfRule(name) {
        if (!this.matchOpenBrace())
            return this.printError(`@${name} missing '{'`, this.linkPath);
        this.matchAllDeclarations();
        if (!this.matchCloseBrace())
            return this.printError(`@${name} missing '}'`, this.linkPath);
        this.matchLeadingSpaces();
        return true;
    }
    // match and slice comments
    matchComments() {
        while (this.matchComment())
            ;
    }
    // css comment
    matchComment() {
        if (this.cssText.charAt(0) !== '/' || this.cssText.charAt(1) !== '*')
            return false;
        // reset scopecssDisableNextLine
        this.scopecssDisableNextLine = false;
        let i = 2;
        while (this.cssText.charAt(i) !== '' && (this.cssText.charAt(i) !== '*' || this.cssText.charAt(i + 1) !== '/'))
            ++i;
        i += 2;
        if (this.cssText.charAt(i - 1) === '') {
            return this.printError('End of comment missing', this.linkPath);
        }
        // get comment content
        let commentText = this.cssText.slice(2, i - 2);
        this.recordResult(`/*${commentText}*/`);
        commentText = trim(commentText.replace(/^\s*!/, ''));
        // set ignore config
        if (commentText === 'scopecss-disable-next-line') {
            this.scopecssDisableNextLine = true;
        }
        else if (/^scopecss-disable/.test(commentText)) {
            if (commentText === 'scopecss-disable') {
                this.scopecssDisable = true;
            }
            else {
                this.scopecssDisable = true;
                const ignoreRules = commentText.replace('scopecss-disable', '').split(',');
                ignoreRules.forEach((rule) => {
                    this.scopecssDisableSelectors.push(trim(rule));
                });
            }
        }
        else if (commentText === 'scopecss-enable') {
            this.scopecssDisable = false;
            this.scopecssDisableSelectors = [];
        }
        this.cssText = this.cssText.slice(i);
        this.matchLeadingSpaces();
        return true;
    }
    commonMatch(reg, skip = false) {
        const matchArray = reg.exec(this.cssText);
        if (!matchArray)
            return;
        const matchStr = matchArray[0];
        this.cssText = this.cssText.slice(matchStr.length);
        if (!skip)
            this.recordResult(matchStr);
        return matchArray;
    }
    matchOpenBrace() {
        return this.commonMatch(/^{\s*/);
    }
    matchCloseBrace() {
        return this.commonMatch(/^}\s*/);
    }
    // match and slice the leading spaces
    matchLeadingSpaces() {
        this.commonMatch(/^\s*/);
    }
    // splice string
    recordResult(strFragment) {
        // Firefox performance degradation when string contain special characters, see https://github.com/micro-zoe/micro-app/issues/256
        if (isFireFox()) {
            this.result += encodeURIComponent(strFragment);
        }
        else {
            this.result += strFragment;
        }
    }
    printError(msg, linkPath) {
        if (this.cssText.length) {
            parseError(msg, linkPath);
        }
    }
}
/**
 * common method of bind CSS
 */
function commonAction(styleElement, appName, prefix, baseURI, linkPath) {
    if (!styleElement.__MICRO_APP_HAS_SCOPED__) {
        styleElement.__MICRO_APP_HAS_SCOPED__ = true;
        let result = null;
        try {
            result = parser.exec(styleElement.textContent, prefix, baseURI, linkPath);
            parser.reset();
        }
        catch (e) {
            parser.reset();
            logError('An error occurred while parsing CSS:\n', appName, e);
        }
        if (result)
            styleElement.textContent = result;
    }
}
let parser;
/**
 * scopedCSS
 * @param styleElement target style element
 * @param appName app name
 */
function scopedCSS(styleElement, app, linkPath) {
    if (app.scopecss) {
        const prefix = createPrefix(app.name);
        if (!parser)
            parser = new CSSParser();
        if (styleElement.textContent) {
            commonAction(styleElement, app.name, prefix, app.url, linkPath);
        }
        else {
            const observer = new MutationObserver(function () {
                observer.disconnect();
                // styled-component will be ignore
                if (styleElement.textContent && !styleElement.hasAttribute('data-styled')) {
                    commonAction(styleElement, app.name, prefix, app.url, linkPath);
                }
            });
            observer.observe(styleElement, { childList: true });
        }
    }
    return styleElement;
}
function createPrefix(appName, reg = false) {
    const regCharacter = reg ? '\\' : '';
    return `${microApp.tagName}${regCharacter}[name=${appName}${regCharacter}]`;
}

function eventHandler(event, element) {
    Object.defineProperties(event, {
        currentTarget: {
            get() {
                return element;
            }
        },
        srcElement: {
            get() {
                return element;
            }
        },
        target: {
            get() {
                return element;
            }
        },
    });
}
function dispatchOnLoadEvent(element) {
    const event = new CustomEvent('load');
    eventHandler(event, element);
    if (isFunction(element.onload)) {
        element.onload(event);
    }
    else {
        element.dispatchEvent(event);
    }
}
function dispatchOnErrorEvent(element) {
    const event = new CustomEvent('error');
    eventHandler(event, element);
    if (isFunction(element.onerror)) {
        element.onerror(event);
    }
    else {
        element.dispatchEvent(event);
    }
}

/**
 * SourceCenter is a resource management center
 * All html, js, css will be recorded and processed here
 * NOTE:
 * 1. All resources are global and shared between apps
 * 2. Pay attention to the case of html with parameters
 * 3. The resource is first processed by the plugin
 */
function createSourceCenter() {
    const linkList = new Map();
    const scriptList = new Map();
    function createSourceHandler(targetList) {
        return {
            setInfo(address, info) {
                targetList.set(address, info);
            },
            getInfo(address) {
                var _a;
                return (_a = targetList.get(address)) !== null && _a !== void 0 ? _a : null;
            },
            hasInfo(address) {
                return targetList.has(address);
            },
            deleteInfo(address) {
                return targetList.delete(address);
            }
        };
    }
    return {
        link: createSourceHandler(linkList),
        script: Object.assign(Object.assign({}, createSourceHandler(scriptList)), { deleteInlineInfo(addressList) {
                addressList.forEach((address) => {
                    if (isInlineScript(address)) {
                        scriptList.delete(address);
                    }
                });
            } }),
    };
}
var sourceCenter = createSourceCenter();

/**
 *
 * @param appName app.name
 * @param linkInfo linkInfo of current address
 */
function getExistParseCode(appName, prefix, linkInfo) {
    const appSpace = linkInfo.appSpace;
    for (const item in appSpace) {
        if (item !== appName) {
            const appSpaceData = appSpace[item];
            if (appSpaceData.parsedCode) {
                return appSpaceData.parsedCode.replace(new RegExp(createPrefix(item, true), 'g'), prefix);
            }
        }
    }
}
// transfer the attributes on the link to convertStyle
function setConvertStyleAttr(convertStyle, attrs) {
    attrs.forEach((value, key) => {
        if (key === 'rel')
            return;
        if (key === 'href')
            key = 'data-origin-href';
        globalEnv.rawSetAttribute.call(convertStyle, key, value);
    });
}
/**
 * Extract link elements
 * @param link link element
 * @param parent parent element of link
 * @param app app
 * @param microAppHead micro-app-head element
 * @param isDynamic dynamic insert
 */
function extractLinkFromHtml(link, parent, app, isDynamic = false) {
    const rel = link.getAttribute('rel');
    let href = link.getAttribute('href');
    let replaceComment = null;
    if (rel === 'stylesheet' && href) {
        href = CompletionPath(href, app.url);
        let linkInfo = sourceCenter.link.getInfo(href);
        const appSpaceData = {
            attrs: getAttributes(link),
        };
        if (!linkInfo) {
            linkInfo = {
                code: '',
                appSpace: {
                    [app.name]: appSpaceData,
                }
            };
        }
        else {
            linkInfo.appSpace[app.name] = linkInfo.appSpace[app.name] || appSpaceData;
        }
        sourceCenter.link.setInfo(href, linkInfo);
        if (!isDynamic) {
            app.source.links.add(href);
            replaceComment = document.createComment(`link element with href=${href} move to micro-app-head as style element`);
            linkInfo.appSpace[app.name].placeholder = replaceComment;
        }
        else {
            return { address: href, linkInfo };
        }
    }
    else if (rel && ['prefetch', 'preload', 'prerender', 'modulepreload', 'icon'].includes(rel)) {
        // preload prefetch prerender ....
        if (isDynamic) {
            replaceComment = document.createComment(`link element with rel=${rel}${href ? ' & href=' + href : ''} removed by micro-app`);
        }
        else {
            parent === null || parent === void 0 ? void 0 : parent.removeChild(link);
        }
    }
    else if (href) {
        // dns-prefetch preconnect modulepreload search ....
        globalEnv.rawSetAttribute.call(link, 'href', CompletionPath(href, app.url));
    }
    if (isDynamic) {
        return { replaceComment };
    }
    else if (replaceComment) {
        return parent === null || parent === void 0 ? void 0 : parent.replaceChild(replaceComment, link);
    }
}
/**
 * Get link remote resources
 * @param wrapElement htmlDom
 * @param app app
 * @param microAppHead micro-app-head
 */
function fetchLinksFromHtml(wrapElement, app, microAppHead, fiberStyleResult) {
    const styleList = Array.from(app.source.links);
    const fetchLinkPromise = styleList.map((address) => {
        const linkInfo = sourceCenter.link.getInfo(address);
        return linkInfo.code ? linkInfo.code : fetchSource(address, app.name);
    });
    const fiberLinkTasks = fiberStyleResult ? [] : null;
    promiseStream(fetchLinkPromise, (res) => {
        injectFiberTask(fiberLinkTasks, () => fetchLinkSuccess(styleList[res.index], res.data, microAppHead, app));
    }, (err) => {
        logError(err, app.name);
    }, () => {
        /**
         * 1. If fiberStyleResult exist, fiberLinkTasks must exist
         * 2. Download link source while processing style
         * 3. Process style first, and then process link
         */
        if (fiberStyleResult) {
            fiberStyleResult.then(() => {
                fiberLinkTasks.push(() => Promise.resolve(app.onLoad({ html: wrapElement })));
                serialExecFiberTasks(fiberLinkTasks);
            });
        }
        else {
            app.onLoad({ html: wrapElement });
        }
    });
}
/**
 * Fetch link succeeded, replace placeholder with style tag
 * NOTE:
 * 1. Only exec when init, no longer exec when remount
 * 2. Only handler html link element, not dynamic link or style
 * 3. The same prefix can reuse parsedCode
 * 4. Async exec with requestIdleCallback in prefetch or fiber
 * 5. appSpace[app.name].placeholder/attrs must exist
 * @param address resource address
 * @param code link source code
 * @param microAppHead micro-app-head
 * @param app app instance
 */
function fetchLinkSuccess(address, code, microAppHead, app) {
    /**
     * linkInfo must exist, but linkInfo.code not
     * so we set code to linkInfo.code
     */
    const linkInfo = sourceCenter.link.getInfo(address);
    linkInfo.code = code;
    const appSpaceData = linkInfo.appSpace[app.name];
    const placeholder = appSpaceData.placeholder;
    /**
     * When prefetch app is replaced by a new app in the processing phase, since the linkInfo is common, when the linkInfo of the prefetch app is processed, it may have already been processed.
     * This causes placeholder to be possibly null
     * e.g.
     * 1. prefetch app.url different from <micro-app></micro-app>
     * 2. prefetch param different from <micro-app></micro-app>
     */
    if (placeholder) {
        const convertStyle = pureCreateElement('style');
        handleConvertStyle(app, address, convertStyle, linkInfo, appSpaceData.attrs);
        if (placeholder.parentNode) {
            placeholder.parentNode.replaceChild(convertStyle, placeholder);
        }
        else {
            microAppHead.appendChild(convertStyle);
        }
        // clear placeholder
        appSpaceData.placeholder = null;
    }
}
/**
 * Get parsedCode, update convertStyle
 * Actions:
 * 1. get scope css (through scopedCSS or oldData)
 * 2. record parsedCode
 * 3. set parsedCode to convertStyle if need
 * @param app app instance
 * @param address resource address
 * @param convertStyle converted style
 * @param linkInfo linkInfo in sourceCenter
 * @param attrs attrs of link
 */
function handleConvertStyle(app, address, convertStyle, linkInfo, attrs) {
    if (app.scopecss) {
        const appSpaceData = linkInfo.appSpace[app.name];
        appSpaceData.prefix = appSpaceData.prefix || createPrefix(app.name);
        if (!appSpaceData.parsedCode) {
            const existParsedCode = getExistParseCode(app.name, appSpaceData.prefix, linkInfo);
            if (!existParsedCode) {
                convertStyle.textContent = linkInfo.code;
                scopedCSS(convertStyle, app, address);
            }
            else {
                convertStyle.textContent = existParsedCode;
            }
            appSpaceData.parsedCode = convertStyle.textContent;
        }
        else {
            convertStyle.textContent = appSpaceData.parsedCode;
        }
    }
    else {
        convertStyle.textContent = linkInfo.code;
    }
    setConvertStyleAttr(convertStyle, attrs);
}
/**
 * Handle css of dynamic link
 * @param address link address
 * @param app app
 * @param linkInfo linkInfo
 * @param originLink origin link element
 */
function formatDynamicLink(address, app, linkInfo, originLink) {
    const convertStyle = pureCreateElement('style');
    const handleDynamicLink = () => {
        handleConvertStyle(app, address, convertStyle, linkInfo, linkInfo.appSpace[app.name].attrs);
        dispatchOnLoadEvent(originLink);
    };
    if (linkInfo.code) {
        defer(handleDynamicLink);
    }
    else {
        fetchSource(address, app.name).then((data) => {
            linkInfo.code = data;
            handleDynamicLink();
        }).catch((err) => {
            logError(err, app.name);
            dispatchOnErrorEvent(originLink);
        });
    }
    return convertStyle;
}

var ObservedAttrName;
(function (ObservedAttrName) {
    ObservedAttrName["NAME"] = "name";
    ObservedAttrName["URL"] = "url";
})(ObservedAttrName || (ObservedAttrName = {}));
// app status
var appStates;
(function (appStates) {
    appStates["CREATED"] = "created";
    appStates["LOADING"] = "loading";
    appStates["LOAD_FAILED"] = "load_failed";
    appStates["BEFORE_MOUNT"] = "before_mount";
    appStates["MOUNTING"] = "mounting";
    appStates["MOUNTED"] = "mounted";
    appStates["UNMOUNT"] = "unmount";
})(appStates || (appStates = {}));
// lifecycles
var lifeCycles;
(function (lifeCycles) {
    lifeCycles["CREATED"] = "created";
    lifeCycles["BEFOREMOUNT"] = "beforemount";
    lifeCycles["MOUNTED"] = "mounted";
    lifeCycles["UNMOUNT"] = "unmount";
    lifeCycles["ERROR"] = "error";
    // 👇 keep-alive only
    lifeCycles["BEFORESHOW"] = "beforeshow";
    lifeCycles["AFTERSHOW"] = "aftershow";
    lifeCycles["AFTERHIDDEN"] = "afterhidden";
})(lifeCycles || (lifeCycles = {}));
// global event of child app
var microGlobalEvent;
(function (microGlobalEvent) {
    microGlobalEvent["ONMOUNT"] = "onmount";
    microGlobalEvent["ONUNMOUNT"] = "onunmount";
})(microGlobalEvent || (microGlobalEvent = {}));
// keep-alive status
var keepAliveStates;
(function (keepAliveStates) {
    keepAliveStates["KEEP_ALIVE_SHOW"] = "keep_alive_show";
    keepAliveStates["KEEP_ALIVE_HIDDEN"] = "keep_alive_hidden";
})(keepAliveStates || (keepAliveStates = {}));
// micro-app config
var MicroAppConfig;
(function (MicroAppConfig) {
    MicroAppConfig["DESTROY"] = "destroy";
    MicroAppConfig["DESTORY"] = "destory";
    MicroAppConfig["INLINE"] = "inline";
    MicroAppConfig["DISABLESCOPECSS"] = "disableScopecss";
    MicroAppConfig["DISABLESANDBOX"] = "disableSandbox";
    MicroAppConfig["DISABLE_SCOPECSS"] = "disable-scopecss";
    MicroAppConfig["DISABLE_SANDBOX"] = "disable-sandbox";
    MicroAppConfig["DISABLE_MEMORY_ROUTER"] = "disable-memory-router";
    MicroAppConfig["DISABLE_PATCH_REQUEST"] = "disable-patch-request";
    MicroAppConfig["KEEP_ROUTER_STATE"] = "keep-router-state";
    MicroAppConfig["KEEP_ALIVE"] = "keep-alive";
    MicroAppConfig["CLEAR_DATA"] = "clear-data";
    MicroAppConfig["SSR"] = "ssr";
    MicroAppConfig["FIBER"] = "fiber";
})(MicroAppConfig || (MicroAppConfig = {}));
/**
 * global key must be static key, they can not rewrite
 * e.g.
 * window.Promise = newValue
 * new Promise ==> still get old value, not newValue, because they are cached by top function
 * NOTE:
 * 1. Do not add fetch, XMLHttpRequest, EventSource
 */
const GLOBAL_CACHED_KEY = 'window,self,globalThis,document,Document,Array,Object,String,Boolean,Math,Number,Symbol,Date,Function,Proxy,WeakMap,WeakSet,Set,Map,Reflect,Element,Node,RegExp,Error,TypeError,JSON,isNaN,parseFloat,parseInt,performance,console,decodeURI,encodeURI,decodeURIComponent,encodeURIComponent,navigator,undefined,location,history';
// prefetch level
const PREFETCH_LEVEL = [1, 2, 3];
/**
 * memory router modes
 * NOTE:
 *  1. The only difference between native and native-scope is location.origin, in native-scope mode location.origin point to child app
 *  2. native mode equal to disable-memory-router
*/
// 临时注释，1.0版本放开，默认模式切换为state
// // default mode, sync child app router info to history.state
// export const DEFAULT_ROUTER_MODE = 'state'
// // sync child app router info to browser url as search
// export const ROUTER_MODE_SEARCH = 'search'
// 临时放开，1.0版本去除
const ROUTER_MODE_STATE = 'state';
const DEFAULT_ROUTER_MODE = 'search';
// render base on browser url, and location.origin location.href point to base app
const ROUTER_MODE_NATIVE = 'native';
// render base on browser url, but location.origin location.href point to child app
const ROUTER_MODE_NATIVE_SCOPE = 'native-scope';
// search mode, but child router info will not sync to browser url
const ROUTER_MODE_PURE = 'pure';
const ROUTER_MODE_LIST = [
    DEFAULT_ROUTER_MODE,
    ROUTER_MODE_STATE,
    ROUTER_MODE_NATIVE,
    ROUTER_MODE_NATIVE_SCOPE,
    ROUTER_MODE_PURE,
];
// event bound to child app window
const BASE_SCOPE_WINDOW_EVENT = [
    'popstate',
    'hashchange',
    'load',
    'unload',
    'unmount',
    'appstate-change',
    'statechange',
    'mounted',
];
// bind event of with sandbox
const SCOPE_WINDOW_EVENT_OF_WITH = BASE_SCOPE_WINDOW_EVENT;
// bind event of iframe sandbox
const SCOPE_WINDOW_EVENT_OF_IFRAME = BASE_SCOPE_WINDOW_EVENT.concat([
    'unhandledrejection',
    'message'
]);
// on event bound to child app window
// TODO: with和iframe处理方式不同，需修改
const BASE_SCOPE_WINDOW_ON_EVENT = [
    'onpopstate',
    'onhashchange',
    'onload',
    'onunload',
    'onerror'
    // 'onbeforeunload', // remove at 2024.5.30 by cangdu
];
// bind on event of with sandbox
const SCOPE_WINDOW_ON_EVENT_OF_WITH = BASE_SCOPE_WINDOW_ON_EVENT;
// bind on event of iframe sandbox
const SCOPE_WINDOW_ON_EVENT_OF_IFRAME = BASE_SCOPE_WINDOW_ON_EVENT.concat([
    'onunhandledrejection',
]);
// event bound to child app document
const SCOPE_DOCUMENT_EVENT = [
    'DOMContentLoaded',
    'readystatechange',
];
// on event bound to child app document
const SCOPE_DOCUMENT_ON_EVENT = [
    'onreadystatechange',
];
// global key point to window
const GLOBAL_KEY_TO_WINDOW = [
    'window',
    'self',
    'globalThis',
];
const RAW_GLOBAL_TARGET = ['rawWindow', 'rawDocument'];
const HIJACK_LOCATION_KEYS = [
    'host',
    'hostname',
    'port',
    'protocol',
    'origin',
];

const scriptTypes = ['text/javascript', 'text/ecmascript', 'application/javascript', 'application/ecmascript', 'module', 'systemjs-module', 'systemjs-importmap'];
// whether use type='module' script
function isTypeModule(app, scriptInfo) {
    return scriptInfo.appSpace[app.name].module && (!app.useSandbox || app.iframe);
}
// special script element
function isSpecialScript(app, scriptInfo) {
    const attrs = scriptInfo.appSpace[app.name].attrs;
    return attrs.has('id');
}
/**
 * whether to run js in inline mode
 * scene:
 * 1. inline config for app
 * 2. inline attr in script element
 * 3. module script
 * 4. script with special attr
 */
function isInlineMode(app, scriptInfo) {
    return (app.inline ||
        scriptInfo.appSpace[app.name].inline ||
        isTypeModule(app, scriptInfo) ||
        isSpecialScript(app, scriptInfo));
}
// TODO: iframe重新插入window前后不一致，通过iframe Function创建的函数无法复用
function getEffectWindow(app) {
    return app.iframe ? app.sandBox.microAppWindow : globalEnv.rawWindow;
}
// Convert string code to function
function code2Function(app, code) {
    const targetWindow = getEffectWindow(app);
    return new targetWindow.Function(code);
}
/**
 * If the appSpace of the current js address has other app, try to reuse parsedFunction of other app
 * @param appName app.name
 * @param scriptInfo scriptInfo of current address
 * @param currentCode pure code of current address
 */
function getExistParseResult(app, scriptInfo, currentCode) {
    const appSpace = scriptInfo.appSpace;
    for (const item in appSpace) {
        if (item !== app.name) {
            const appSpaceData = appSpace[item];
            if (appSpaceData.parsedCode === currentCode && appSpaceData.parsedFunction) {
                return appSpaceData.parsedFunction;
            }
        }
    }
}
/**
 * get parsedFunction from exist data or parsedCode
 * @returns parsedFunction
 */
function getParsedFunction(app, scriptInfo, parsedCode) {
    return getExistParseResult(app, scriptInfo, parsedCode) || code2Function(app, parsedCode);
}
// Prevent randomly created strings from repeating
function getUniqueNonceSrc() {
    const nonceStr = createNonceSrc();
    if (sourceCenter.script.hasInfo(nonceStr)) {
        return getUniqueNonceSrc();
    }
    return nonceStr;
}
// transfer the attributes on the script to convertScript
function setConvertScriptAttr(convertScript, attrs) {
    attrs.forEach((value, key) => {
        if ((key === 'type' && value === 'module') || key === 'defer' || key === 'async')
            return;
        if (key === 'src')
            key = 'data-origin-src';
        globalEnv.rawSetAttribute.call(convertScript, key, value);
    });
}
// wrap code in sandbox
function isWrapInSandBox(app, scriptInfo) {
    return app.useSandbox && !isTypeModule(app, scriptInfo);
}
function getSandboxType(app, scriptInfo) {
    return isWrapInSandBox(app, scriptInfo) ? app.iframe ? 'iframe' : 'with' : 'disable';
}
/**
 * Extract script elements
 * @param script script element
 * @param parent parent element of script
 * @param app app
 * @param isDynamic dynamic insert
 */
function extractScriptElement(script, parent, app, isDynamic = false) {
    var _a;
    let replaceComment = null;
    let src = script.getAttribute('src');
    if (src)
        src = CompletionPath(src, app.url);
    if (script.hasAttribute('exclude') || checkExcludeUrl(src, app.name)) {
        replaceComment = document.createComment('script element with exclude attribute removed by micro-app');
    }
    else if ((script.type &&
        !scriptTypes.includes(script.type)) ||
        script.hasAttribute('ignore') ||
        checkIgnoreUrl(src, app.name)) {
        // 配置为忽略的脚本，清空 rawDocument.currentScript，避免被忽略的脚本内获取 currentScript 出错
        if ((_a = globalEnv.rawDocument) === null || _a === void 0 ? void 0 : _a.currentScript) {
            delete globalEnv.rawDocument.currentScript;
        }
        return null;
    }
    else if ((globalEnv.supportModuleScript && script.noModule) ||
        (!globalEnv.supportModuleScript && script.type === 'module')) {
        replaceComment = document.createComment(`${script.noModule ? 'noModule' : 'module'} script ignored by micro-app`);
    }
    else if (src) { // remote script
        let scriptInfo = sourceCenter.script.getInfo(src);
        const appSpaceData = {
            async: script.hasAttribute('async'),
            defer: script.defer || script.type === 'module',
            module: script.type === 'module',
            inline: script.hasAttribute('inline'),
            pure: script.hasAttribute('pure'),
            attrs: getAttributes(script),
        };
        if (!scriptInfo) {
            scriptInfo = {
                code: '',
                isExternal: true,
                appSpace: {
                    [app.name]: appSpaceData,
                }
            };
        }
        else {
            /**
             * Reuse when appSpace exists
             * NOTE:
             * 1. The same static script, appSpace must be the same (in fact, it may be different when url change)
             * 2. The same dynamic script, appSpace may be the same, but we still reuse appSpace, which should pay attention
             */
            scriptInfo.appSpace[app.name] = scriptInfo.appSpace[app.name] || appSpaceData;
        }
        sourceCenter.script.setInfo(src, scriptInfo);
        if (!isDynamic) {
            app.source.scripts.add(src);
            replaceComment = document.createComment(`script with src='${src}' extract by micro-app`);
        }
        else {
            return { address: src, scriptInfo };
        }
    }
    else if (script.textContent) { // inline script
        /**
         * NOTE:
         * 1. Each inline script is unique
         * 2. Every dynamic created inline script will be re-executed
         * ACTION:
         * 1. Delete dynamic inline script info after exec
         * 2. Delete static inline script info when destroy
         */
        const nonceStr = getUniqueNonceSrc();
        const scriptInfo = {
            code: script.textContent,
            isExternal: false,
            appSpace: {
                [app.name]: {
                    async: false,
                    defer: script.type === 'module',
                    module: script.type === 'module',
                    inline: script.hasAttribute('inline'),
                    pure: script.hasAttribute('pure'),
                    attrs: getAttributes(script),
                }
            }
        };
        if (!isDynamic) {
            app.source.scripts.add(nonceStr);
            sourceCenter.script.setInfo(nonceStr, scriptInfo);
            replaceComment = document.createComment('inline script extract by micro-app');
        }
        else {
            // Because each dynamic script is unique, it is not put into sourceCenter
            return { address: nonceStr, scriptInfo };
        }
    }
    else if (!isDynamic) {
        /**
         * script with empty src or empty script.textContent remove in static html
         * & not removed if it created by dynamic
         */
        replaceComment = document.createComment('script element removed by micro-app');
    }
    if (isDynamic) {
        return { replaceComment };
    }
    else {
        return parent === null || parent === void 0 ? void 0 : parent.replaceChild(replaceComment, script);
    }
}
/**
 * get assets plugins
 * @param appName app name
 */
function getAssetsPlugins(appName) {
    var _a, _b, _c;
    const globalPlugins = ((_a = microApp.options.plugins) === null || _a === void 0 ? void 0 : _a.global) || [];
    const modulePlugins = ((_c = (_b = microApp.options.plugins) === null || _b === void 0 ? void 0 : _b.modules) === null || _c === void 0 ? void 0 : _c[appName]) || [];
    return [...globalPlugins, ...modulePlugins];
}
/**
 * whether the address needs to be excluded
 * @param address css or js link
 * @param plugins microApp plugins
 */
function checkExcludeUrl(address, appName) {
    if (!address)
        return false;
    const plugins = getAssetsPlugins(appName) || [];
    return plugins.some(plugin => {
        if (!plugin.excludeChecker)
            return false;
        return plugin.excludeChecker(address);
    });
}
/**
 * whether the address needs to be ignore
 * @param address css or js link
 * @param plugins microApp plugins
 */
function checkIgnoreUrl(address, appName) {
    if (!address)
        return false;
    const plugins = getAssetsPlugins(appName) || [];
    return plugins.some(plugin => {
        if (!plugin.ignoreChecker)
            return false;
        return plugin.ignoreChecker(address);
    });
}
/**
 *  Get remote resources of script
 * @param wrapElement htmlDom
 * @param app app
 */
function fetchScriptsFromHtml(wrapElement, app) {
    const scriptList = Array.from(app.source.scripts);
    const fetchScriptPromise = [];
    const fetchScriptPromiseInfo = [];
    for (const address of scriptList) {
        const scriptInfo = sourceCenter.script.getInfo(address);
        const appSpaceData = scriptInfo.appSpace[app.name];
        if ((!appSpaceData.defer && !appSpaceData.async) || (app.isPrefetch && !app.isPrerender)) {
            fetchScriptPromise.push(scriptInfo.code ? scriptInfo.code : fetchSource(address, app.name));
            fetchScriptPromiseInfo.push([address, scriptInfo]);
        }
    }
    const fiberScriptTasks = app.isPrefetch || app.fiber ? [] : null;
    if (fetchScriptPromise.length) {
        promiseStream(fetchScriptPromise, (res) => {
            injectFiberTask(fiberScriptTasks, () => fetchScriptSuccess(fetchScriptPromiseInfo[res.index][0], fetchScriptPromiseInfo[res.index][1], res.data, app));
        }, (err) => {
            logError(err, app.name);
        }, () => {
            if (fiberScriptTasks) {
                fiberScriptTasks.push(() => Promise.resolve(app.onLoad({ html: wrapElement })));
                serialExecFiberTasks(fiberScriptTasks);
            }
            else {
                app.onLoad({ html: wrapElement });
            }
        });
    }
    else {
        app.onLoad({ html: wrapElement });
    }
}
/**
 * fetch js succeeded, record the code value
 * @param address script address
 * @param scriptInfo resource script info
 * @param data code
 */
function fetchScriptSuccess(address, scriptInfo, code, app) {
    // reset scriptInfo.code
    scriptInfo.code = code;
    /**
     * Pre parse script for prefetch, improve rendering performance
     * NOTE:
     * 1. if global parseResult exist, skip this step
     * 2. if app is inline or script is esmodule, skip this step
     * 3. if global parseResult not exist, the current script occupies the position, when js is reused, parseResult is reference
     */
    if (app.isPrefetch && app.prefetchLevel === 2) {
        const appSpaceData = scriptInfo.appSpace[app.name];
        /**
         * When prefetch app is replaced by a new app in the processing phase, since the scriptInfo is common, when the scriptInfo of the prefetch app is processed, it may have already been processed.
         * This causes parsedCode to already exist when preloading ends
         * e.g.
         * 1. prefetch app.url different from <micro-app></micro-app>
         * 2. prefetch param different from <micro-app></micro-app>
         */
        if (!appSpaceData.parsedCode) {
            appSpaceData.parsedCode = bindScope(address, app, code, scriptInfo);
            appSpaceData.sandboxType = getSandboxType(app, scriptInfo);
            if (!isInlineMode(app, scriptInfo)) {
                try {
                    appSpaceData.parsedFunction = getParsedFunction(app, scriptInfo, appSpaceData.parsedCode);
                }
                catch (err) {
                    logError('Something went wrong while handling preloaded resources', app.name, '\n', err);
                }
            }
        }
    }
}
/**
 * Execute js in the mount lifecycle
 * @param app app
 * @param initHook callback for umd mode
 */
function execScripts(app, initHook) {
    const fiberScriptTasks = app.fiber ? [] : null;
    const scriptList = Array.from(app.source.scripts);
    const deferScriptPromise = [];
    const deferScriptInfo = [];
    for (const address of scriptList) {
        const scriptInfo = sourceCenter.script.getInfo(address);
        const appSpaceData = scriptInfo.appSpace[app.name];
        // Notice the second render
        if (appSpaceData.defer || appSpaceData.async) {
            // TODO: defer和module彻底分开，不要混在一起
            if (scriptInfo.isExternal && !scriptInfo.code && !isTypeModule(app, scriptInfo)) {
                deferScriptPromise.push(fetchSource(address, app.name));
            }
            else {
                deferScriptPromise.push(scriptInfo.code);
            }
            deferScriptInfo.push([address, scriptInfo]);
            isTypeModule(app, scriptInfo) && (initHook.moduleCount = initHook.moduleCount ? ++initHook.moduleCount : 1);
        }
        else {
            injectFiberTask(fiberScriptTasks, () => {
                runScript(address, app, scriptInfo);
                initHook(false);
            });
        }
    }
    if (deferScriptPromise.length) {
        promiseStream(deferScriptPromise, (res) => {
            const scriptInfo = deferScriptInfo[res.index][1];
            scriptInfo.code = scriptInfo.code || res.data;
        }, (err) => {
            initHook.errorCount = initHook.errorCount ? ++initHook.errorCount : 1;
            logError(err, app.name);
        }, () => {
            deferScriptInfo.forEach(([address, scriptInfo]) => {
                if (isString(scriptInfo.code)) {
                    injectFiberTask(fiberScriptTasks, () => {
                        runScript(address, app, scriptInfo, initHook);
                        !isTypeModule(app, scriptInfo) && initHook(false);
                    });
                }
            });
            /**
             * Fiber wraps js in requestIdleCallback and executes it in sequence
             * NOTE:
             * 1. In order to ensure the execution order, wait for all js loaded and then execute
             * 2. If js create a dynamic script, it may be errors in the execution order, because the subsequent js is wrapped in requestIdleCallback, even putting dynamic script in requestIdleCallback doesn't solve it
             *
             * BUG: NOTE.2 - execution order problem
             */
            if (fiberScriptTasks) {
                fiberScriptTasks.push(() => Promise.resolve(initHook(isUndefined(initHook.moduleCount) ||
                    initHook.errorCount === deferScriptPromise.length)));
                serialExecFiberTasks(fiberScriptTasks);
            }
            else {
                initHook(isUndefined(initHook.moduleCount) ||
                    initHook.errorCount === deferScriptPromise.length);
            }
        });
    }
    else {
        if (fiberScriptTasks) {
            fiberScriptTasks.push(() => Promise.resolve(initHook(true)));
            serialExecFiberTasks(fiberScriptTasks);
        }
        else {
            initHook(true);
        }
    }
}
/**
 * run code
 * @param address script address
 * @param app app
 * @param scriptInfo script info
 * @param callback callback of module script
 */
function runScript(address, app, scriptInfo, callback, replaceElement) {
    var _a;
    try {
        actionsBeforeRunScript(app);
        const appSpaceData = scriptInfo.appSpace[app.name];
        const sandboxType = getSandboxType(app, scriptInfo);
        /**
         * NOTE:
         * 1. plugins and wrapCode will only be executed once
         * 2. if parsedCode not exist, parsedFunction is not exist
         * 3. if parsedCode exist, parsedFunction does not necessarily exist
         */
        if (!appSpaceData.parsedCode || appSpaceData.sandboxType !== sandboxType) {
            appSpaceData.parsedCode = bindScope(address, app, scriptInfo.code, scriptInfo);
            appSpaceData.sandboxType = sandboxType;
            appSpaceData.parsedFunction = null;
        }
        /**
         * TODO: 优化逻辑
         * 是否是内联模式应该由外部传入，这样自外而内更加统一，逻辑更加清晰
         */
        if (isInlineMode(app, scriptInfo)) {
            const scriptElement = replaceElement || pureCreateElement('script');
            runCode2InlineScript(address, appSpaceData.parsedCode, isTypeModule(app, scriptInfo), scriptElement, appSpaceData.attrs, callback);
            /**
             * TODO: 优化逻辑
             * replaceElement不存在说明是初始化执行，需要主动插入script
             * 但这里的逻辑不清晰，应该明确声明是什么环境下才需要主动插入，而不是用replaceElement间接判断
             * replaceElement还有可能是注释类型(一定是在后台执行)，这里的判断都是间接判断，不够直观
             */
            if (!replaceElement) {
                // TEST IGNORE
                const parent = app.iframe ? (_a = app.sandBox) === null || _a === void 0 ? void 0 : _a.microBody : app.querySelector('micro-app-body');
                parent === null || parent === void 0 ? void 0 : parent.appendChild(scriptElement);
            }
        }
        else {
            runParsedFunction(app, scriptInfo);
        }
    }
    catch (e) {
        console.error(`[micro-app from ${replaceElement ? 'runDynamicScript' : 'runScript'}] app ${app.name}: `, e, address);
        // throw error in with sandbox to parent app
        throw e;
    }
}
/**
 * Get dynamically created remote script
 * @param address script address
 * @param app app instance
 * @param scriptInfo scriptInfo
 * @param originScript origin script element
 */
function runDynamicRemoteScript(address, app, scriptInfo, originScript) {
    const replaceElement = isInlineMode(app, scriptInfo) ? pureCreateElement('script') : document.createComment(`dynamic script with src='${address}' extract by micro-app`);
    const dispatchScriptOnLoadEvent = () => dispatchOnLoadEvent(originScript);
    const runDynamicScript = () => {
        const descriptor = Object.getOwnPropertyDescriptor(globalEnv.rawDocument, 'currentScript');
        if (!descriptor || descriptor.configurable) {
            Object.defineProperty(globalEnv.rawDocument, 'currentScript', {
                value: originScript,
                configurable: true,
            });
        }
        runScript(address, app, scriptInfo, dispatchScriptOnLoadEvent, replaceElement);
        !isTypeModule(app, scriptInfo) && dispatchScriptOnLoadEvent();
    };
    if (scriptInfo.code || isTypeModule(app, scriptInfo)) {
        defer(runDynamicScript);
    }
    else {
        fetchSource(address, app.name).then((code) => {
            scriptInfo.code = code;
            runDynamicScript();
        }).catch((err) => {
            logError(err, app.name);
            dispatchOnErrorEvent(originScript);
        });
    }
    return replaceElement;
}
/**
 * Get dynamically created inline script
 * @param address script address
 * @param app app instance
 * @param scriptInfo scriptInfo
 */
function runDynamicInlineScript(address, app, scriptInfo) {
    const replaceElement = isInlineMode(app, scriptInfo) ? pureCreateElement('script') : document.createComment('dynamic inline script extract by micro-app');
    runScript(address, app, scriptInfo, void 0, replaceElement);
    return replaceElement;
}
/**
 * common handle for inline script
 * @param address script address
 * @param code bound code
 * @param module type='module' of script
 * @param scriptElement target script element
 * @param attrs attributes of script element
 * @param callback callback of module script
 */
function runCode2InlineScript(address, code, module, scriptElement, attrs, callback) {
    if (module) {
        globalEnv.rawSetAttribute.call(scriptElement, 'type', 'module');
        if (isInlineScript(address)) {
            /**
             * inline module script cannot convert to blob mode
             * Issue: https://github.com/micro-zoe/micro-app/issues/805
             */
            scriptElement.textContent = code;
        }
        else {
            scriptElement.src = address;
        }
        if (callback) {
            const onloadHandler = () => {
                callback.moduleCount && callback.moduleCount--;
                callback(callback.moduleCount === 0);
            };
            /**
             * NOTE:
             *  1. module script will execute onload method only after it insert to document/iframe
             *  2. we can't know when the inline module script onload, and we use defer to simulate, this maybe cause some problems
             */
            if (isInlineScript(address)) {
                defer(onloadHandler);
            }
            else {
                scriptElement.onload = onloadHandler;
            }
        }
    }
    else {
        scriptElement.textContent = code;
    }
    setConvertScriptAttr(scriptElement, attrs);
}
// init & run code2Function
function runParsedFunction(app, scriptInfo) {
    const appSpaceData = scriptInfo.appSpace[app.name];
    if (!appSpaceData.parsedFunction) {
        appSpaceData.parsedFunction = getParsedFunction(app, scriptInfo, appSpaceData.parsedCode);
    }
    appSpaceData.parsedFunction.call(getEffectWindow(app));
}
/**
 * bind js scope
 * @param app app
 * @param code code
 * @param scriptInfo source script info
 */
function bindScope(address, app, code, scriptInfo) {
    // TODO: 1、cache 2、esm code is null
    if (isPlainObject(microApp.options.plugins)) {
        code = usePlugins(address, code, app.name, microApp.options.plugins);
    }
    if (isWrapInSandBox(app, scriptInfo)) {
        return app.iframe ? `(function(window,self,global,location){;${code}\n${isInlineScript(address) ? '' : `//# sourceURL=${address}\n`}}).call(window.__MICRO_APP_SANDBOX__.proxyWindow,window.__MICRO_APP_SANDBOX__.proxyWindow,window.__MICRO_APP_SANDBOX__.proxyWindow,window.__MICRO_APP_SANDBOX__.proxyWindow,window.__MICRO_APP_SANDBOX__.proxyLocation);` : `;(function(proxyWindow){with(proxyWindow.__MICRO_APP_WINDOW__){(function(${GLOBAL_CACHED_KEY}){;${code}\n${isInlineScript(address) ? '' : `//# sourceURL=${address}\n`}}).call(proxyWindow,${GLOBAL_CACHED_KEY})}})(window.__MICRO_APP_PROXY_WINDOW__);`;
    }
    return code;
}
/**
 * actions before run script
 */
function actionsBeforeRunScript(app) {
    setActiveProxyWindow(app);
}
/**
 * set active sandBox.proxyWindow to window.__MICRO_APP_PROXY_WINDOW__
 */
function setActiveProxyWindow(app) {
    if (app.sandBox) {
        globalEnv.rawWindow.__MICRO_APP_PROXY_WINDOW__ = app.sandBox.proxyWindow;
    }
}
/**
 * Call the plugin to process the file
 * @param address script address
 * @param code code
 * @param appName app name
 * @param plugins plugin list
 */
function usePlugins(address, code, appName, plugins) {
    var _a;
    const newCode = processCode(plugins.global, code, address);
    return processCode((_a = plugins.modules) === null || _a === void 0 ? void 0 : _a[appName], newCode, address);
}
function processCode(configs, code, address) {
    if (!isArray(configs)) {
        return code;
    }
    return configs.reduce((preCode, config) => {
        if (isPlainObject(config) && isFunction(config.loader)) {
            return config.loader(preCode, address);
        }
        return preCode;
    }, code);
}

/**
 * Recursively process each child element
 * @param parent parent element
 * @param app app
 * @param microAppHead micro-app-head element
 */
function flatChildren(parent, app, microAppHead, fiberStyleTasks) {
    const children = Array.from(parent.children);
    children.length && children.forEach((child) => {
        flatChildren(child, app, microAppHead, fiberStyleTasks);
    });
    for (const dom of children) {
        if (isLinkElement(dom)) {
            if (dom.hasAttribute('exclude') || checkExcludeUrl(dom.getAttribute('href'), app.name)) {
                parent.replaceChild(document.createComment('link element with exclude attribute ignored by micro-app'), dom);
            }
            else if (!(dom.hasAttribute('ignore') || checkIgnoreUrl(dom.getAttribute('href'), app.name))) {
                extractLinkFromHtml(dom, parent, app);
            }
            else if (dom.hasAttribute('href')) {
                globalEnv.rawSetAttribute.call(dom, 'href', CompletionPath(dom.getAttribute('href'), app.url));
            }
        }
        else if (isStyleElement(dom)) {
            if (dom.hasAttribute('exclude')) {
                parent.replaceChild(document.createComment('style element with exclude attribute ignored by micro-app'), dom);
            }
            else if (app.scopecss && !dom.hasAttribute('ignore')) {
                injectFiberTask(fiberStyleTasks, () => scopedCSS(dom, app));
            }
        }
        else if (isScriptElement(dom)) {
            extractScriptElement(dom, parent, app);
        }
        else if (isImageElement(dom) && dom.hasAttribute('src')) {
            globalEnv.rawSetAttribute.call(dom, 'src', CompletionPath(dom.getAttribute('src'), app.url));
        }
        /**
         * Don't remove meta and title, they have some special scenes
         * e.g.
         * document.querySelector('meta[name="viewport"]') // for flexible
         * document.querySelector('meta[name="baseurl"]').baseurl // for api request
         *
         * Title point to main app title, child app title used to be compatible with some special scenes
         */
        // else if (dom instanceof HTMLMetaElement || dom instanceof HTMLTitleElement) {
        //   parent.removeChild(dom)
        // }
    }
}
/**
 * Extract link and script, bind style scope
 * @param htmlStr html string
 * @param app app
 */
function extractSourceDom(htmlStr, app) {
    const wrapElement = app.parseHtmlString(htmlStr);
    const microAppHead = globalEnv.rawElementQuerySelector.call(wrapElement, 'micro-app-head');
    const microAppBody = globalEnv.rawElementQuerySelector.call(wrapElement, 'micro-app-body');
    if (!microAppHead || !microAppBody) {
        const msg = `element ${microAppHead ? 'body' : 'head'} is missing`;
        app.onerror(new Error(msg));
        return logError(msg, app.name);
    }
    const fiberStyleTasks = app.isPrefetch || app.fiber ? [] : null;
    flatChildren(wrapElement, app, microAppHead, fiberStyleTasks);
    /**
     * Style and link are parallel, as it takes a lot of time for link to request resources. During this period, style processing can be performed to improve efficiency.
     */
    const fiberStyleResult = serialExecFiberTasks(fiberStyleTasks);
    if (app.source.links.size) {
        fetchLinksFromHtml(wrapElement, app, microAppHead, fiberStyleResult);
    }
    else if (fiberStyleResult) {
        fiberStyleResult.then(() => app.onLoad({ html: wrapElement }));
    }
    else {
        app.onLoad({ html: wrapElement });
    }
    if (app.source.scripts.size) {
        fetchScriptsFromHtml(wrapElement, app);
    }
    else {
        app.onLoad({ html: wrapElement });
    }
}

class EventCenter {
    constructor() {
        this.eventList = new Map();
        this.queue = [];
        this.recordStep = {};
        // run task
        this.process = () => {
            var _a, _b;
            let name;
            const temRecordStep = this.recordStep;
            const queue = this.queue;
            this.recordStep = {};
            this.queue = [];
            while (name = queue.shift()) {
                const eventInfo = this.eventList.get(name);
                // clear tempData, force before exec nextStep
                const tempData = eventInfo.tempData;
                const force = eventInfo.force;
                eventInfo.tempData = null;
                eventInfo.force = false;
                let resArr;
                if (force || !this.isEqual(eventInfo.data, tempData)) {
                    eventInfo.data = tempData || eventInfo.data;
                    for (const f of eventInfo.callbacks) {
                        const res = f(eventInfo.data);
                        res && (resArr !== null && resArr !== void 0 ? resArr : (resArr = [])).push(res);
                    }
                    (_b = (_a = temRecordStep[name]).dispatchDataEvent) === null || _b === void 0 ? void 0 : _b.call(_a);
                    /**
                     * WARING:
                     * If data of other app is sent in nextStep, it may cause confusion of tempData and force
                     */
                    temRecordStep[name].nextStepList.forEach((nextStep) => nextStep(resArr));
                }
            }
        };
    }
    // whether the name is legal
    isLegalName(name) {
        if (!name) {
            logError('event-center: Invalid name');
            return false;
        }
        return true;
    }
    // add appName to queue
    enqueue(name, nextStep, dispatchDataEvent) {
        // this.nextStepList.push(nextStep)
        if (this.recordStep[name]) {
            this.recordStep[name].nextStepList.push(nextStep);
            dispatchDataEvent && (this.recordStep[name].dispatchDataEvent = dispatchDataEvent);
        }
        else {
            this.recordStep[name] = {
                nextStepList: [nextStep],
                dispatchDataEvent,
            };
        }
        /**
         * The micro task is executed async when the second render of child.
         * We should ensure that the data changes are executed before binding the listening function
         */
        (!this.queue.includes(name) && this.queue.push(name) === 1) && defer(this.process);
    }
    /**
     * In react, each setState will trigger setData, so we need a filter operation to avoid repeated trigger
     */
    isEqual(oldData, newData) {
        if (!newData || Object.keys(oldData).length !== Object.keys(newData).length)
            return false;
        for (const key in oldData) {
            if (Object.prototype.hasOwnProperty.call(oldData, key)) {
                if (oldData[key] !== newData[key])
                    return false;
            }
        }
        return true;
    }
    /**
     * add listener
     * @param name event name
     * @param f listener
     * @param autoTrigger If there is cached data when first bind listener, whether it needs to trigger, default is false
     */
    on(name, f, autoTrigger = false) {
        if (this.isLegalName(name)) {
            if (!isFunction(f)) {
                return logError('event-center: Invalid callback function');
            }
            let eventInfo = this.eventList.get(name);
            if (!eventInfo) {
                eventInfo = {
                    data: {},
                    callbacks: new Set(),
                };
                this.eventList.set(name, eventInfo);
            }
            else if (autoTrigger &&
                Object.keys(eventInfo.data).length &&
                (!this.queue.includes(name) ||
                    this.isEqual(eventInfo.data, eventInfo.tempData))) {
                // auto trigger when data not null
                f(eventInfo.data);
            }
            eventInfo.callbacks.add(f);
        }
    }
    // remove listener, but the data is not cleared
    off(name, f) {
        if (this.isLegalName(name)) {
            const eventInfo = this.eventList.get(name);
            if (eventInfo) {
                if (isFunction(f)) {
                    eventInfo.callbacks.delete(f);
                }
                else {
                    eventInfo.callbacks.clear();
                }
            }
        }
    }
    /**
     * clearData
     */
    clearData(name) {
        if (this.isLegalName(name)) {
            const eventInfo = this.eventList.get(name);
            if (eventInfo) {
                eventInfo.data = {};
            }
        }
    }
    // dispatch data
    dispatch(name, data, nextStep, force, dispatchDataEvent) {
        if (this.isLegalName(name)) {
            if (!isPlainObject(data)) {
                return logError('event-center: data must be object');
            }
            let eventInfo = this.eventList.get(name);
            if (eventInfo) {
                eventInfo.tempData = assign({}, eventInfo.tempData || eventInfo.data, data);
                !eventInfo.force && (eventInfo.force = !!force);
            }
            else {
                eventInfo = {
                    data: data,
                    callbacks: new Set(),
                };
                this.eventList.set(name, eventInfo);
                /**
                 * When sent data to parent, eventInfo probably does not exist, because parent may listen to datachange
                 */
                eventInfo.force = true;
            }
            // add to queue, event eventInfo is null
            this.enqueue(name, nextStep, dispatchDataEvent);
        }
    }
    // get data
    getData(name) {
        var _a;
        const eventInfo = this.eventList.get(name);
        return (_a = eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.data) !== null && _a !== void 0 ? _a : null;
    }
}

const eventCenter = new EventCenter();
/**
 * Format event name
 * @param appName app.name
 * @param fromBaseApp is from base app
 */
function createEventName(appName, fromBaseApp) {
    if (!isString(appName) || !appName)
        return '';
    return fromBaseApp ? `__${appName}_from_base_app__` : `__${appName}_from_micro_app__`;
}
// Global data
class EventCenterForGlobal {
    /**
     * add listener of global data
     * @param cb listener
     * @param autoTrigger If there is cached data when first bind listener, whether it needs to trigger, default is false
     */
    addGlobalDataListener(cb, autoTrigger) {
        const appName = this.appName;
        // if appName exists, this is in sub app
        if (appName) {
            cb.__APP_NAME__ = appName;
            cb.__AUTO_TRIGGER__ = autoTrigger;
        }
        eventCenter.on('global', cb, autoTrigger);
    }
    /**
     * remove listener of global data
     * @param cb listener
     */
    removeGlobalDataListener(cb) {
        isFunction(cb) && eventCenter.off('global', cb);
    }
    /**
     * dispatch global data
     * @param data data
     */
    setGlobalData(data, nextStep, force) {
        // clear dom scope before dispatch global data, apply to micro app
        removeDomScope();
        eventCenter.dispatch('global', data, (resArr) => isFunction(nextStep) && nextStep(resArr), force);
    }
    forceSetGlobalData(data, nextStep) {
        this.setGlobalData(data, nextStep, true);
    }
    /**
     * get global data
     */
    getGlobalData() {
        return eventCenter.getData('global');
    }
    /**
     * clear global data
     */
    clearGlobalData() {
        eventCenter.clearData('global');
    }
    /**
     * clear all listener of global data
     * if appName exists, only the specified functions is cleared
     * if appName not exists, only clear the base app functions
     */
    clearGlobalDataListener() {
        const appName = this.appName;
        const eventInfo = eventCenter.eventList.get('global');
        if (eventInfo) {
            for (const cb of eventInfo.callbacks) {
                if ((appName && appName === cb.__APP_NAME__) ||
                    !(appName || cb.__APP_NAME__)) {
                    eventInfo.callbacks.delete(cb);
                }
            }
        }
    }
}
// Event center for base app
class EventCenterForBaseApp extends EventCenterForGlobal {
    /**
     * add listener
     * @param appName app.name
     * @param cb listener
     * @param autoTrigger If there is cached data when first bind listener, whether it needs to trigger, default is false
     */
    addDataListener(appName, cb, autoTrigger) {
        eventCenter.on(createEventName(formatAppName(appName), false), cb, autoTrigger);
    }
    /**
     * remove listener
     * @param appName app.name
     * @param cb listener
     */
    removeDataListener(appName, cb) {
        isFunction(cb) && eventCenter.off(createEventName(formatAppName(appName), false), cb);
    }
    /**
     * get data from micro app or base app
     * @param appName app.name
     * @param fromBaseApp whether get data from base app, default is false
     */
    getData(appName, fromBaseApp = false) {
        return eventCenter.getData(createEventName(formatAppName(appName), fromBaseApp));
    }
    /**
     * Dispatch data to the specified micro app
     * @param appName app.name
     * @param data data
     */
    setData(appName, data, nextStep, force) {
        eventCenter.dispatch(createEventName(formatAppName(appName), true), data, (resArr) => isFunction(nextStep) && nextStep(resArr), force);
    }
    forceSetData(appName, data, nextStep) {
        this.setData(appName, data, nextStep, true);
    }
    /**
     * clear data from base app
     * @param appName app.name
     * @param fromBaseApp whether clear data from child app, default is true
     */
    clearData(appName, fromBaseApp = true) {
        eventCenter.clearData(createEventName(formatAppName(appName), fromBaseApp));
    }
    /**
     * clear all listener for specified micro app
     * @param appName app.name
     */
    clearDataListener(appName) {
        eventCenter.off(createEventName(formatAppName(appName), false));
    }
}
// Event center for sub app
class EventCenterForMicroApp extends EventCenterForGlobal {
    constructor(appName) {
        super();
        this.appName = formatAppName(appName);
        !this.appName && logError(`Invalid appName ${appName}`);
    }
    /**
     * add listener, monitor the data sent by the base app
     * @param cb listener
     * @param autoTrigger If there is cached data when first bind listener, whether it needs to trigger, default is false
     */
    addDataListener(cb, autoTrigger) {
        cb.__AUTO_TRIGGER__ = autoTrigger;
        eventCenter.on(createEventName(this.appName, true), cb, autoTrigger);
    }
    /**
     * remove listener
     * @param cb listener
     */
    removeDataListener(cb) {
        isFunction(cb) && eventCenter.off(createEventName(this.appName, true), cb);
    }
    /**
     * get data from base app
     */
    getData(fromBaseApp = true) {
        return eventCenter.getData(createEventName(this.appName, fromBaseApp));
    }
    /**
     * dispatch data to base app
     * @param data data
     */
    dispatch(data, nextStep, force) {
        removeDomScope();
        eventCenter.dispatch(createEventName(this.appName, false), data, (resArr) => isFunction(nextStep) && nextStep(resArr), force, () => {
            const app = appInstanceMap.get(this.appName);
            if ((app === null || app === void 0 ? void 0 : app.container) && isPlainObject(data)) {
                const event = new CustomEvent('datachange', {
                    detail: {
                        data: eventCenter.getData(createEventName(this.appName, false))
                    }
                });
                getRootContainer(app.container).dispatchEvent(event);
            }
        });
    }
    forceDispatch(data, nextStep) {
        this.dispatch(data, nextStep, true);
    }
    /**
     * clear data from child app
     * @param fromBaseApp whether clear data from base app, default is false
     */
    clearData(fromBaseApp = false) {
        eventCenter.clearData(createEventName(this.appName, fromBaseApp));
    }
    /**
     * clear all listeners
     */
    clearDataListener() {
        eventCenter.off(createEventName(this.appName, true));
    }
}
/**
 * Record UMD function before exec umdHookMount
 * NOTE: record maybe call twice when unmount prerender, keep-alive app manually with umd mode
 * @param microAppEventCenter instance of EventCenterForMicroApp
 */
function recordDataCenterSnapshot(microAppEventCenter) {
    var _a, _b;
    if (microAppEventCenter) {
        microAppEventCenter.umdDataListeners = {
            global: new Set((_a = microAppEventCenter.umdDataListeners) === null || _a === void 0 ? void 0 : _a.global),
            normal: new Set((_b = microAppEventCenter.umdDataListeners) === null || _b === void 0 ? void 0 : _b.normal),
        };
        const globalEventInfo = eventCenter.eventList.get('global');
        if (globalEventInfo) {
            for (const cb of globalEventInfo.callbacks) {
                if (microAppEventCenter.appName === cb.__APP_NAME__) {
                    microAppEventCenter.umdDataListeners.global.add(cb);
                }
            }
        }
        const subAppEventInfo = eventCenter.eventList.get(createEventName(microAppEventCenter.appName, true));
        if (subAppEventInfo) {
            for (const cb of subAppEventInfo.callbacks) {
                microAppEventCenter.umdDataListeners.normal.add(cb);
            }
        }
    }
}
/**
 * Rebind the UMD function of the record before remount
 * @param microAppEventCenter instance of EventCenterForMicroApp
 */
function rebuildDataCenterSnapshot(microAppEventCenter) {
    // in withSandbox preRender mode with module script, umdDataListeners maybe undefined
    if (microAppEventCenter === null || microAppEventCenter === void 0 ? void 0 : microAppEventCenter.umdDataListeners) {
        for (const cb of microAppEventCenter.umdDataListeners.global) {
            microAppEventCenter.addGlobalDataListener(cb, cb.__AUTO_TRIGGER__);
        }
        for (const cb of microAppEventCenter.umdDataListeners.normal) {
            microAppEventCenter.addDataListener(cb, cb.__AUTO_TRIGGER__);
        }
        resetDataCenterSnapshot(microAppEventCenter);
    }
}
/**
 * delete umdDataListeners from microAppEventCenter
 * @param microAppEventCenter instance of EventCenterForMicroApp
 */
function resetDataCenterSnapshot(microAppEventCenter) {
    microAppEventCenter === null || microAppEventCenter === void 0 ? true : delete microAppEventCenter.umdDataListeners;
}

// 管理 app 的单例
class AppManager {
    constructor() {
        // TODO: appInstanceMap 由 AppManager 来创建，不再由 create_app 管理
        this.appInstanceMap = appInstanceMap;
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new AppManager();
        }
        return this.instance;
    }
    get(appName) {
        return this.appInstanceMap.get(appName);
    }
    set(appName, app) {
        this.appInstanceMap.set(appName, app);
    }
    getAll() {
        return Array.from(this.appInstanceMap.values());
    }
    clear() {
        this.appInstanceMap.clear();
    }
}

function unmountNestedApp() {
    releaseUnmountOfNestedApp();
    AppManager.getInstance().getAll().forEach(app => {
        // @ts-ignore
        app.container && getRootContainer(app.container).disconnectedCallback();
    });
    !window.__MICRO_APP_UMD_MODE__ && AppManager.getInstance().clear();
}
// release listener
function releaseUnmountOfNestedApp() {
    if (window.__MICRO_APP_ENVIRONMENT__) {
        window.removeEventListener('unmount', unmountNestedApp, false);
    }
}
// if micro-app run in micro application, delete all next generation application when unmount event received
// unmount event will auto release by sandbox
function initEnvOfNestedApp() {
    if (window.__MICRO_APP_ENVIRONMENT__) {
        releaseUnmountOfNestedApp();
        window.addEventListener('unmount', unmountNestedApp, false);
    }
}

/* eslint-disable no-return-assign */
function isBoundedFunction(value) {
    if (isBoolean(value.__MICRO_APP_IS_BOUND_FUNCTION__))
        return value.__MICRO_APP_IS_BOUND_FUNCTION__;
    return value.__MICRO_APP_IS_BOUND_FUNCTION__ = isBoundFunction(value);
}
function isConstructorFunction(value) {
    if (isBoolean(value.__MICRO_APP_IS_CONSTRUCTOR__))
        return value.__MICRO_APP_IS_CONSTRUCTOR__;
    return value.__MICRO_APP_IS_CONSTRUCTOR__ = isConstructor(value);
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function bindFunctionToRawTarget(value, rawTarget, key = 'WINDOW') {
    /**
     * In safari, nest app like: A -> B -> C
     * if B is iframe sandbox, and C is with sandbox, same property of document in C is abnormal
     * e.g:
     *  document.all:
     *    - typeof document.all ==> 'function'
     *    - document.all.bind ==> undefined
     */
    if (isFunction(value) && !isConstructorFunction(value) && !isBoundedFunction(value) && value.bind) {
        const cacheKey = `__MICRO_APP_BOUND_${key}_FUNCTION__`;
        if (value[cacheKey])
            return value[cacheKey];
        const bindRawObjectValue = value.bind(rawTarget);
        for (const key in value) {
            bindRawObjectValue[key] = value[key];
        }
        if (value.hasOwnProperty('prototype')) {
            rawDefineProperty(bindRawObjectValue, 'prototype', {
                value: value.prototype,
                configurable: true,
                enumerable: false,
                writable: true,
            });
        }
        return value[cacheKey] = bindRawObjectValue;
    }
    return value;
}

class BaseSandbox {
    constructor(appName, url) {
        // keys that can only assigned to rawWindow
        this.rawWindowScopeKeyList = [
            'location',
        ];
        // keys that can escape to rawWindow
        this.staticEscapeProperties = [
            'System',
            '__cjsWrapper',
        ];
        // keys that scoped in child app
        this.staticScopeProperties = [
            'webpackJsonp',
            'webpackHotUpdate',
            'Vue',
            // TODO: 是否可以和constants/SCOPE_WINDOW_ON_EVENT合并
            'onpopstate',
            'onhashchange',
        ];
        // Properties that can only get and set in microAppWindow, will not escape to rawWindow
        this.scopeProperties = Array.from(this.staticScopeProperties);
        // Properties that can be escape to rawWindow
        this.escapeProperties = [];
        // Properties newly added to microAppWindow
        this.injectedKeys = new Set();
        // Properties escape to rawWindow, cleared when unmount
        this.escapeKeys = new Set();
        this.appName = appName;
        this.url = url;
        this.injectReactHMRProperty();
    }
    // adapter for react
    injectReactHMRProperty() {
        if ((true)) {
            // react child in non-react env
            this.staticEscapeProperties.push('__REACT_ERROR_OVERLAY_GLOBAL_HOOK__');
            // in react parent
            if (globalEnv.rawWindow.__REACT_ERROR_OVERLAY_GLOBAL_HOOK__) {
                this.staticScopeProperties = this.staticScopeProperties.concat([
                    '__REACT_ERROR_OVERLAY_GLOBAL_HOOK__',
                    '__reactRefreshInjected',
                ]);
            }
        }
    }
}
/**
 * TODO:
 *  1、将class Adapter去掉，改为CustomWindow，或者让CustomWindow继承Adapter
 *  2、with沙箱中的常量放入CustomWindow，虽然和iframe沙箱不一致，但更合理
 * 修改时机：在iframe沙箱支持插件后再修改
 */
class CustomWindow {
}
// Fix conflict of babel-polyfill@6.x
function fixBabelPolyfill6() {
    if (globalEnv.rawWindow._babelPolyfill)
        globalEnv.rawWindow._babelPolyfill = false;
}
/**
 * update dom tree of target dom
 * @param container target dom
 * @param appName app name
 */
function patchElementTree(container, appName) {
    const children = Array.from(container.childNodes);
    children.length && children.forEach((child) => {
        patchElementTree(child, appName);
    });
    updateElementInfo(container, appName);
}
/**
 * rewrite baseURI, ownerDocument, __MICRO_APP_NAME__ of target node
 * @param node target node
 * @param appName app name
 * @returns target node
 */
function updateElementInfo(node, appName) {
    var _a, _b;
    if (appName &&
        isNode(node) &&
        node.__MICRO_APP_NAME__ !== appName &&
        !node.__PURE_ELEMENT__ &&
        !getPreventSetState()) {
        /**
         * TODO:
         *  1. 测试baseURI和ownerDocument在with沙箱中是否正确
         *    经过验证with沙箱不能重写ownerDocument，否则react点击事件会触发两次
        */
        const props = {
            __MICRO_APP_NAME__: {
                configurable: true,
                enumerable: true,
                writable: true,
                value: appName,
            },
        };
        if (isAnchorElement(node)) {
            // a 标签
            const microApp = AppManager.getInstance().get(appName);
            if (microApp) {
                props.href = {
                    get() {
                        return this.getAttribute('href');
                    },
                    set(value) {
                        if (value === undefined) {
                            return;
                        }
                        this.setAttribute('href', value);
                    },
                };
            }
        }
        rawDefineProperties(node, props);
        /**
         * In FireFox, iframe Node.prototype will point to native Node.prototype after insert to document
         *
         * Performance:
         *  iframe element.__proto__ === browser HTMLElement.prototype // Chrome: false, FireFox: true
         *  iframe element.__proto__ === iframe HTMLElement.prototype // Chrome: true, FireFox: false
         *
         * NOTE:
         *  1. Node.prototype.baseURI
         *  2. Node.prototype.ownerDocument
         *  3. Node.prototype.parentNode
         *  4. Node.prototype.getRootNode
         *  5. Node.prototype.cloneNode
         *  6. Element.prototype.innerHTML
         *  7. Image
         */
        if (isIframeSandbox(appName)) {
            const proxyWindow = (_b = (_a = appInstanceMap.get(appName)) === null || _a === void 0 ? void 0 : _a.sandBox) === null || _b === void 0 ? void 0 : _b.proxyWindow;
            if (proxyWindow) {
                rawDefineProperties(node, {
                    baseURI: {
                        configurable: true,
                        enumerable: true,
                        get: () => proxyWindow.location.href,
                    },
                    ownerDocument: {
                        configurable: true,
                        enumerable: true,
                        get: () => node !== proxyWindow.document ? proxyWindow.document : null,
                    },
                    parentNode: getIframeParentNodeDesc(appName, globalEnv.rawParentNodeDesc),
                    getRootNode: {
                        configurable: true,
                        enumerable: true,
                        writable: true,
                        value: function getRootNode() {
                            return proxyWindow.document;
                        }
                    },
                });
            }
        }
    }
    return node;
}
/**
 * get Descriptor of Node.prototype.parentNode for iframe
 * @param appName app name
 * @param parentNode parentNode Descriptor of iframe or browser
 */
function getIframeParentNodeDesc(appName, parentNodeDesc) {
    return {
        configurable: true,
        enumerable: true,
        get() {
            var _a, _b, _c, _d;
            throttleDeferForIframeAppName(appName);
            const result = (_a = parentNodeDesc.get) === null || _a === void 0 ? void 0 : _a.call(this);
            /**
             * If parentNode is <micro-app-body>, return rawDocument.body
             * Scenes:
             *  1. element-ui@2/lib/utils/vue-popper.js
             *    if (this.popperElm.parentNode === document.body) ...
             * e.g.:
             *  1. element-ui@2.x el-dropdown
             * WARNING:
             *  Will it cause other problems ?
             *  e.g. target.parentNode.remove(target)
             */
            if (isMicroAppBody(result) && ((_b = appInstanceMap.get(appName)) === null || _b === void 0 ? void 0 : _b.container)) {
                return ((_d = (_c = microApp.options).getRootElementParentNode) === null || _d === void 0 ? void 0 : _d.call(_c, this, appName)) || globalEnv.rawDocument.body;
            }
            return result;
        }
    };
}

/**
 * create proxyDocument and MicroDocument, rewrite document of child app
 * @param appName app name
 * @param microAppWindow Proxy target
 * @returns EffectHook
 */
function patchDocument(appName, microAppWindow, sandbox) {
    const { proxyDocument, documentEffect } = createProxyDocument(appName, sandbox);
    const MicroDocument = createMicroDocument(appName, proxyDocument);
    rawDefineProperties(microAppWindow, {
        document: {
            configurable: false,
            enumerable: true,
            get() {
                // return globalEnv.rawDocument
                return proxyDocument;
            },
        },
        Document: {
            configurable: false,
            enumerable: false,
            get() {
                // return globalEnv.rawRootDocument
                return MicroDocument;
            },
        }
    });
    return documentEffect;
}
/**
 * Create new document and Document
 */
function createProxyDocument(appName, sandbox) {
    const eventListenerMap = new Map();
    const sstEventListenerMap = new Map();
    let onClickHandler = null;
    let sstOnClickHandler = null;
    const { rawDocument, rawCreateElement, rawCreateElementNS, rawAddEventListener, rawRemoveEventListener, } = globalEnv;
    function createElement(tagName, options) {
        const element = rawCreateElement.call(rawDocument, tagName, options);
        return updateElementInfo(element, appName);
    }
    function createElementNS(namespaceURI, name, options) {
        const element = rawCreateElementNS.call(rawDocument, namespaceURI, name, options);
        return updateElementInfo(element, appName);
    }
    /**
     * TODO:
     *  1. listener 是否需要绑定proxyDocument，否则函数中的this指向原生window
     *  2. 相似代码提取为公共方法(with, iframe)
     *  3. 如果this不指向proxyDocument 和 rawDocument，则需要特殊处理
     */
    function addEventListener(type, listener, options) {
        const listenerList = eventListenerMap.get(type);
        if (listenerList) {
            listenerList.add(listener);
        }
        else {
            eventListenerMap.set(type, new Set([listener]));
        }
        listener && (listener.__MICRO_APP_MARK_OPTIONS__ = options);
        rawAddEventListener.call(rawDocument, type, listener, options);
    }
    function removeEventListener(type, listener, options) {
        const listenerList = eventListenerMap.get(type);
        if ((listenerList === null || listenerList === void 0 ? void 0 : listenerList.size) && listenerList.has(listener)) {
            listenerList.delete(listener);
        }
        rawRemoveEventListener.call(rawDocument, type, listener, options);
    }
    // reset snapshot data
    const reset = () => {
        sstEventListenerMap.clear();
        sstOnClickHandler = null;
    };
    /**
     * NOTE:
     *  1. about timer(events & properties should record & rebuild at all modes, exclude default mode)
     *  2. record maybe call twice when unmount prerender, keep-alive app manually with umd mode
     * 4 modes: default-mode、umd-mode、prerender、keep-alive
     * Solution:
     *  1. default-mode(normal): clear events & timers, not record & rebuild anything
     *  2. umd-mode(normal): not clear timers, record & rebuild events
     *  3. prerender/keep-alive(default, umd): not clear timers, record & rebuild events
     */
    const record = () => {
        /**
         * record onclick handler
         * onClickHandler maybe set again after prerender/keep-alive app hidden
         */
        sstOnClickHandler = onClickHandler || sstOnClickHandler;
        // record document event
        eventListenerMap.forEach((listenerList, type) => {
            if (listenerList.size) {
                const cacheList = sstEventListenerMap.get(type) || [];
                sstEventListenerMap.set(type, new Set([...cacheList, ...listenerList]));
            }
        });
    };
    // rebuild event and timer before remount app
    const rebuild = () => {
        // rebuild onclick event
        if (sstOnClickHandler && !onClickHandler)
            proxyDocument.onclick = sstOnClickHandler;
        // rebuild document event
        sstEventListenerMap.forEach((listenerList, type) => {
            for (const listener of listenerList) {
                proxyDocument.addEventListener(type, listener, listener === null || listener === void 0 ? void 0 : listener.__MICRO_APP_MARK_OPTIONS__);
            }
        });
        reset();
    };
    // release all event listener & interval & timeout when unmount app
    const release = () => {
        // Clear the function bound by micro app through document.onclick
        if (isFunction(onClickHandler)) {
            rawRemoveEventListener.call(rawDocument, 'click', onClickHandler);
        }
        onClickHandler = null;
        // Clear document binding event
        if (eventListenerMap.size) {
            eventListenerMap.forEach((listenerList, type) => {
                for (const listener of listenerList) {
                    rawRemoveEventListener.call(rawDocument, type, listener);
                }
            });
            eventListenerMap.clear();
        }
    };
    const genProxyDocumentProps = () => {
        var _a;
        // microApp framework built-in Proxy
        const builtInProxyProps = new Map([
            ['onclick', (value) => {
                    if (isFunction(onClickHandler)) {
                        rawRemoveEventListener.call(rawDocument, 'click', onClickHandler, false);
                    }
                    // TODO: listener 是否需要绑定proxyDocument，否则函数中的this指向原生window
                    if (isFunction(value)) {
                        rawAddEventListener.call(rawDocument, 'click', value, false);
                    }
                    onClickHandler = value;
                }]
        ]);
        // external custom proxy
        const customProxyDocumentProps = ((_a = microApp.options) === null || _a === void 0 ? void 0 : _a.customProxyDocumentProps) || new Map();
        // External has higher priority than built-in
        const mergedProxyDocumentProps = new Map([
            ...builtInProxyProps,
            ...customProxyDocumentProps,
        ]);
        return mergedProxyDocumentProps;
    };
    const mergedProxyDocumentProps = genProxyDocumentProps();
    const proxyDocument = new Proxy(rawDocument, {
        get: (target, key) => {
            var _a;
            throttleDeferForSetAppName(appName);
            // TODO: 转换成数据形式，类似iframe的方式
            if (key === 'createElement')
                return createElement;
            if (key === 'createElementNS')
                return createElementNS;
            if (key === Symbol.toStringTag)
                return 'ProxyDocument';
            if (key === 'defaultView')
                return sandbox.proxyWindow;
            if (key === 'onclick')
                return onClickHandler;
            if (key === 'addEventListener')
                return addEventListener;
            if (key === 'removeEventListener')
                return removeEventListener;
            if (key === 'microAppElement')
                return (_a = appInstanceMap.get(appName)) === null || _a === void 0 ? void 0 : _a.container;
            if (key === '__MICRO_APP_NAME__')
                return appName;
            return bindFunctionToRawTarget(Reflect.get(target, key), rawDocument, 'DOCUMENT');
        },
        set: (target, key, value) => {
            if (mergedProxyDocumentProps.has(key)) {
                const proxyCallback = mergedProxyDocumentProps.get(key);
                proxyCallback(value);
            }
            else if (key !== 'microAppElement') {
                /**
                 * 1. Fix TypeError: Illegal invocation when set document.title
                 * 2. If the set method returns false, and the assignment happened in strict-mode code, a TypeError will be thrown.
                 */
                Reflect.set(target, key, value);
            }
            return true;
        }
    });
    return {
        proxyDocument,
        documentEffect: {
            reset,
            record,
            rebuild,
            release,
        }
    };
}
/**
 * create proto Document
 * @param appName app name
 * @param proxyDocument proxy(document)
 * @returns Document
 */
function createMicroDocument(appName, proxyDocument) {
    const { rawDocument, rawRootDocument } = globalEnv;
    class MicroDocument {
        static [Symbol.hasInstance](target) {
            let proto = target;
            while (proto) {
                proto = Object.getPrototypeOf(proto);
                if (proto === MicroDocument.prototype) {
                    return true;
                }
            }
            return (target === proxyDocument ||
                target instanceof rawRootDocument);
        }
    }
    /**
     * TIP:
     * 1. child class __proto__, which represents the inherit of the constructor, always points to the parent class
     * 2. child class prototype.__proto__, which represents the inherit of methods, always points to parent class prototype
     * e.g.
     * class B extends A {}
     * B.__proto__ === A // true
     * B.prototype.__proto__ === A.prototype // true
     */
    Object.setPrototypeOf(MicroDocument, rawRootDocument);
    // Object.create(rawRootDocument.prototype) will cause MicroDocument and proxyDocument methods not same when exec Document.prototype.xxx = xxx in child app
    Object.setPrototypeOf(MicroDocument.prototype, new Proxy(rawRootDocument.prototype, {
        get(target, key) {
            throttleDeferForSetAppName(appName);
            return bindFunctionToRawTarget(Reflect.get(target, key), rawDocument, 'DOCUMENT');
        },
        set(target, key, value) {
            Reflect.set(target, key, value);
            return true;
        }
    }));
    return MicroDocument;
}

/**
 * patch window of child app
 * @param appName app name
 * @param microAppWindow microWindow of child app
 * @param sandbox WithSandBox
 * @returns EffectHook
 */
function patchWindow(appName, microAppWindow, sandbox) {
    patchWindowProperty(microAppWindow);
    createProxyWindow(appName, microAppWindow, sandbox);
    return patchWindowEffect(microAppWindow, appName);
}
/**
 * rewrite special properties of window
 * @param appName app name
 * @param microAppWindow child app microWindow
 */
function patchWindowProperty(microAppWindow) {
    const rawWindow = globalEnv.rawWindow;
    Object.getOwnPropertyNames(rawWindow)
        .filter((key) => {
        return /^on/.test(key) && !SCOPE_WINDOW_ON_EVENT_OF_WITH.includes(key);
    })
        .forEach((eventName) => {
        const { enumerable, writable, set } = Object.getOwnPropertyDescriptor(rawWindow, eventName) || {
            enumerable: true,
            writable: true,
        };
        rawDefineProperty(microAppWindow, eventName, {
            enumerable,
            configurable: true,
            get: () => rawWindow[eventName],
            set: (writable !== null && writable !== void 0 ? writable : !!set) ? (value) => { rawWindow[eventName] = value; }
                : undefined,
        });
    });
}
/**
 * create proxyWindow with Proxy(microAppWindow)
 * @param appName app name
 * @param microAppWindow micro app window
 * @param sandbox WithSandBox
 */
function createProxyWindow(appName, microAppWindow, sandbox) {
    const rawWindow = globalEnv.rawWindow;
    const descriptorTargetMap = new Map();
    const proxyWindow = new Proxy(microAppWindow, {
        get: (target, key) => {
            throttleDeferForSetAppName(appName);
            if (Reflect.has(target, key) ||
                (isString(key) && /^__MICRO_APP_/.test(key)) ||
                includes(sandbox.scopeProperties, key)) {
                if (includes(RAW_GLOBAL_TARGET, key))
                    removeDomScope();
                return Reflect.get(target, key);
            }
            return bindFunctionToRawTarget(Reflect.get(rawWindow, key), rawWindow);
        },
        set: (target, key, value) => {
            if (includes(sandbox.rawWindowScopeKeyList, key)) {
                Reflect.set(rawWindow, key, value);
            }
            else if (
            // target.hasOwnProperty has been rewritten
            !rawHasOwnProperty.call(target, key) &&
                rawHasOwnProperty.call(rawWindow, key) &&
                !includes(sandbox.scopeProperties, key)) {
                const descriptor = Object.getOwnPropertyDescriptor(rawWindow, key);
                const { configurable, enumerable, writable, set } = descriptor;
                // set value because it can be set
                rawDefineProperty(target, key, {
                    value,
                    configurable,
                    enumerable,
                    writable: writable !== null && writable !== void 0 ? writable : !!set,
                });
                sandbox.injectedKeys.add(key);
            }
            else {
                // all scopeProperties will add to injectedKeys, use for key in window (Proxy.has)
                if (!Reflect.has(target, key) || includes(sandbox.scopeProperties, key)) {
                    sandbox.injectedKeys.add(key);
                }
                Reflect.set(target, key, value);
            }
            if ((includes(sandbox.escapeProperties, key) ||
                (
                // TODO: staticEscapeProperties 合并到 escapeProperties
                includes(sandbox.staticEscapeProperties, key) &&
                    !Reflect.has(rawWindow, key))) &&
                !includes(sandbox.scopeProperties, key)) {
                !Reflect.has(rawWindow, key) && sandbox.escapeKeys.add(key);
                Reflect.set(rawWindow, key, value);
            }
            return true;
        },
        has: (target, key) => {
            /**
             * Some keywords, such as Vue, need to meet two conditions at the same time:
             * 1. window.Vue --> undefined
             * 2. 'Vue' in window --> false
             * Issue https://github.com/micro-zoe/micro-app/issues/686
             */
            if (includes(sandbox.scopeProperties, key)) {
                if (sandbox.injectedKeys.has(key)) {
                    return Reflect.has(target, key); // true
                }
                return !!target[key]; // false
            }
            return Reflect.has(target, key) || Reflect.has(rawWindow, key);
        },
        // Object.getOwnPropertyDescriptor(window, key)
        getOwnPropertyDescriptor: (target, key) => {
            if (rawHasOwnProperty.call(target, key)) {
                descriptorTargetMap.set(key, 'target');
                return Object.getOwnPropertyDescriptor(target, key);
            }
            if (rawHasOwnProperty.call(rawWindow, key)) {
                descriptorTargetMap.set(key, 'rawWindow');
                const descriptor = Object.getOwnPropertyDescriptor(rawWindow, key);
                if (descriptor && !descriptor.configurable) {
                    descriptor.configurable = true;
                }
                return descriptor;
            }
            return undefined;
        },
        // Object.defineProperty(window, key, Descriptor)
        defineProperty: (target, key, value) => {
            const from = descriptorTargetMap.get(key);
            if (from === 'rawWindow') {
                return Reflect.defineProperty(rawWindow, key, value);
            }
            return Reflect.defineProperty(target, key, value);
        },
        // Object.getOwnPropertyNames(window)
        ownKeys: (target) => {
            return unique(Reflect.ownKeys(rawWindow).concat(Reflect.ownKeys(target)));
        },
        deleteProperty: (target, key) => {
            if (rawHasOwnProperty.call(target, key)) {
                sandbox.injectedKeys.has(key) && sandbox.injectedKeys.delete(key);
                sandbox.escapeKeys.has(key) && Reflect.deleteProperty(rawWindow, key);
                return Reflect.deleteProperty(target, key);
            }
            return true;
        },
    });
    sandbox.proxyWindow = proxyWindow;
}
/**
 * Rewrite side-effect events
 * @param microAppWindow micro window
 */
function patchWindowEffect(microAppWindow, appName) {
    const eventListenerMap = new Map();
    const sstEventListenerMap = new Map();
    const intervalIdMap = new Map();
    const timeoutIdMap = new Map();
    const { rawWindow, rawAddEventListener, rawRemoveEventListener, rawDispatchEvent, rawSetInterval, rawSetTimeout, rawClearInterval, rawClearTimeout, } = globalEnv;
    /**
     * All events will bind to microAppElement or rawWindow
     * Some special events, such as popstate、load、unmount、appstate-change、statechange..., bind to microAppElement, others bind to rawWindow
     * NOTE:
     *  1、At first, microAppWindow = new EventTarget(), but it can not compatible with iOS 14 or below, so microAppElement was used instead. (2024.1.22)
     * @param type event name
     * @returns microAppElement/rawWindow
     */
    function getEventTarget(type) {
        var _a;
        if (SCOPE_WINDOW_EVENT_OF_WITH.includes(type) && ((_a = appInstanceMap.get(appName)) === null || _a === void 0 ? void 0 : _a.container)) {
            return getRootContainer(appInstanceMap.get(appName).container);
        }
        return rawWindow;
    }
    /**
     * listener may be null, e.g test-passive
     * TODO:
     *  1. listener 是否需要绑定microAppWindow，否则函数中的this指向原生window
     *  2. 如果this不指向proxyWindow 或 microAppWindow，应该要做处理
     *  window.addEventListener.call(非window, type, listener, options)
     */
    microAppWindow.addEventListener = function (type, listener, options) {
        type = formatEventType(type, appName);
        const listenerList = eventListenerMap.get(type);
        if (listenerList) {
            listenerList.add(listener);
        }
        else {
            eventListenerMap.set(type, new Set([listener]));
        }
        listener && (listener.__MICRO_APP_MARK_OPTIONS__ = options);
        rawAddEventListener.call(getEventTarget(type), type, listener, options);
    };
    microAppWindow.removeEventListener = function (type, listener, options) {
        type = formatEventType(type, appName);
        const listenerList = eventListenerMap.get(type);
        if ((listenerList === null || listenerList === void 0 ? void 0 : listenerList.size) && listenerList.has(listener)) {
            listenerList.delete(listener);
        }
        rawRemoveEventListener.call(getEventTarget(type), type, listener, options);
    };
    microAppWindow.dispatchEvent = function (event) {
        return rawDispatchEvent.call(getEventTarget(event === null || event === void 0 ? void 0 : event.type), event);
    };
    microAppWindow.setInterval = function (handler, timeout, ...args) {
        const intervalId = rawSetInterval.call(rawWindow, handler, timeout, ...args);
        intervalIdMap.set(intervalId, { handler, timeout, args });
        return intervalId;
    };
    microAppWindow.setTimeout = function (handler, timeout, ...args) {
        const timeoutId = rawSetTimeout.call(rawWindow, handler, timeout, ...args);
        timeoutIdMap.set(timeoutId, { handler, timeout, args });
        return timeoutId;
    };
    microAppWindow.clearInterval = function (intervalId) {
        intervalIdMap.delete(intervalId);
        rawClearInterval.call(rawWindow, intervalId);
    };
    microAppWindow.clearTimeout = function (timeoutId) {
        timeoutIdMap.delete(timeoutId);
        rawClearTimeout.call(rawWindow, timeoutId);
    };
    // reset snapshot data
    const reset = () => {
        sstEventListenerMap.clear();
    };
    /**
     * NOTE:
     *  1. about timer(events & properties should record & rebuild at all modes, exclude default mode)
     *  2. record maybe call twice when unmount prerender, keep-alive app manually with umd mode
     * 4 modes: default-mode、umd-mode、prerender、keep-alive
     * Solution:
     *  1. default-mode(normal): clear events & timers, not record & rebuild anything
     *  2. umd-mode(normal): not clear timers, record & rebuild events
     *  3. prerender/keep-alive(default, umd): not clear timers, record & rebuild events
     */
    const record = () => {
        // record window event
        eventListenerMap.forEach((listenerList, type) => {
            if (listenerList.size) {
                const cacheList = sstEventListenerMap.get(type) || [];
                sstEventListenerMap.set(type, new Set([...cacheList, ...listenerList]));
            }
        });
    };
    // rebuild event and timer before remount app
    const rebuild = () => {
        // rebuild window event
        sstEventListenerMap.forEach((listenerList, type) => {
            for (const listener of listenerList) {
                microAppWindow.addEventListener(type, listener, listener === null || listener === void 0 ? void 0 : listener.__MICRO_APP_MARK_OPTIONS__);
            }
        });
        reset();
    };
    // release all event listener & interval & timeout when unmount app
    const release = (clearTimer) => {
        // Clear window binding events
        if (eventListenerMap.size) {
            eventListenerMap.forEach((listenerList, type) => {
                for (const listener of listenerList) {
                    rawRemoveEventListener.call(getEventTarget(type), type, listener);
                }
            });
            eventListenerMap.clear();
        }
        // default mode(not keep-alive or isPrerender)
        if (clearTimer) {
            intervalIdMap.forEach((_, intervalId) => {
                rawClearInterval.call(rawWindow, intervalId);
            });
            timeoutIdMap.forEach((_, timeoutId) => {
                rawClearTimeout.call(rawWindow, timeoutId);
            });
            intervalIdMap.clear();
            timeoutIdMap.clear();
        }
    };
    return {
        reset,
        record,
        rebuild,
        release,
    };
}

// set micro app state to origin state
function setMicroState(appName, microState, targetLocation) {
    // TODO: 验证native模式下修改state nextjs路由是否正常
    const rawState = globalEnv.rawWindow.history.state;
    const additionalState = {
        __MICRO_APP_STATE__: assign({}, rawState === null || rawState === void 0 ? void 0 : rawState.__MICRO_APP_STATE__, {
            [appName]: {
                fullPath: targetLocation ? targetLocation.pathname + targetLocation.search + targetLocation.hash : null,
                state: microState !== null && microState !== void 0 ? microState : null,
                mode: getRouterMode(appName),
            }
        }),
    };
    // create new state object
    return assign({}, rawState, additionalState);
}
// delete micro app state form origin state
function removeMicroState(appName, rawState) {
    if (isPlainObject(rawState === null || rawState === void 0 ? void 0 : rawState.__MICRO_APP_STATE__)) {
        if (!isUndefined(rawState.__MICRO_APP_STATE__[appName])) {
            delete rawState.__MICRO_APP_STATE__[appName];
        }
        if (!Object.keys(rawState.__MICRO_APP_STATE__).length) {
            delete rawState.__MICRO_APP_STATE__;
        }
    }
    return !isEmptyObject(rawState) ? assign({}, rawState) : null;
}
// get micro app state form origin state
function getMicroState(appName) {
    var _a, _b;
    const rawState = globalEnv.rawWindow.history.state;
    return ((_b = (_a = rawState === null || rawState === void 0 ? void 0 : rawState.__MICRO_APP_STATE__) === null || _a === void 0 ? void 0 : _a[appName]) === null || _b === void 0 ? void 0 : _b.state) || null;
}
// get micro app router info state form origin state
function getMicroRouterInfoState(appName) {
    var _a;
    const rawState = globalEnv.rawWindow.history.state;
    return ((_a = rawState === null || rawState === void 0 ? void 0 : rawState.__MICRO_APP_STATE__) === null || _a === void 0 ? void 0 : _a[appName]) || null;
}
const ENC_AD_RE = /&/g; // %M1
const ENC_EQ_RE = /=/g; // %M2
const DEC_AD_RE = /%M1/g; // &
const DEC_EQ_RE = /%M2/g; // =
// encode path with special symbol
function encodeMicroPath(path) {
    return encodeURIComponent(commonDecode(path).replace(ENC_AD_RE, '%M1').replace(ENC_EQ_RE, '%M2'));
}
// decode path
function decodeMicroPath(path) {
    return commonDecode(path).replace(DEC_AD_RE, '&').replace(DEC_EQ_RE, '=');
}
// Recursively resolve address
function commonDecode(path) {
    try {
        const decPath = decodeURIComponent(path);
        if (path === decPath || DEC_AD_RE.test(decPath) || DEC_EQ_RE.test(decPath))
            return decPath;
        return commonDecode(decPath);
    }
    catch (_a) {
        return path;
    }
}
// Format the query parameter key to prevent conflicts with the original parameters
function formatQueryAppName(appName) {
    // return `app-${appName}`
    return appName;
}
/**
 * Get app fullPath from browser url
 * @param appName app.name
 */
function getMicroPathFromURL(appName) {
    var _a, _b, _c, _d;
    const rawLocation = globalEnv.rawWindow.location;
    const rawState = globalEnv.rawWindow.history.state;
    if (isRouterModeSearch(appName)) {
        const queryObject = getQueryObjectFromURL(rawLocation.search, rawLocation.hash);
        const microPath = ((_a = queryObject.hashQuery) === null || _a === void 0 ? void 0 : _a[formatQueryAppName(appName)]) || ((_b = queryObject.searchQuery) === null || _b === void 0 ? void 0 : _b[formatQueryAppName(appName)]);
        return isString(microPath) ? decodeMicroPath(microPath) : null;
    }
    /**
     * Get fullPath from __MICRO_APP_STATE__
     * NOTE:
     *  1. state mode: all base on __MICRO_APP_STATE__
     *  2. pure mode: navigate by location.xxx may contain one-time information in __MICRO_APP_STATE__
     *  3. native mode: vue-router@4 will exec replaceState with history.state before pushState, like:
     *    history.replaceState(
     *      assign({}, history.state, {...}),
     *      title,
     *      history.state.current, <---
     *    )
     *    when base app jump to another page from child page, it will replace child path with base app path
     *   e.g: base-home --> child-home --> child-about(will replace with child-home before jump to base-home) --> base-home, when go back, it will back to child-home not child-about
     *   So we take the fullPath as standard
     */
    // 问题：1、同一个页面多个子应用，一个修改后... --- native模式不支持多个子应用同时渲染，多个子应用推荐使用其它模式
    // if (isRouterModeCustom(appName)) {
    //   return rawLocation.pathname + rawLocation.search + rawLocation.hash
    // }
    // return rawState?.__MICRO_APP_STATE__?.[appName]?.fullPath || null
    return ((_d = (_c = rawState === null || rawState === void 0 ? void 0 : rawState.__MICRO_APP_STATE__) === null || _c === void 0 ? void 0 : _c[appName]) === null || _d === void 0 ? void 0 : _d.fullPath) || (isRouterModeCustom(appName) ? rawLocation.pathname + rawLocation.search + rawLocation.hash : null);
}
/**
 * Attach child app fullPath to browser url
 * @param appName app.name
 * @param targetLocation location of child app or rawLocation of window
 */
function setMicroPathToURL(appName, targetLocation) {
    const rawLocation = globalEnv.rawWindow.location;
    let targetFullPath = targetLocation.pathname + targetLocation.search + targetLocation.hash;
    let isAttach2Hash = false;
    if (isRouterModeSearch(appName)) {
        let { pathname, search, hash } = rawLocation;
        const queryObject = getQueryObjectFromURL(search, hash);
        const encodedMicroPath = encodeMicroPath(targetFullPath);
        /**
         * Is parent is hash router
         * In fact, this is not true. It just means that the parameter is added to the hash
         */
        // If hash exists and search does not exist, it is considered as a hash route
        if (hash && !search) {
            isAttach2Hash = true;
            // TODO: 这里和下面的if判断可以简化一下
            if (queryObject.hashQuery) {
                queryObject.hashQuery[formatQueryAppName(appName)] = encodedMicroPath;
            }
            else {
                queryObject.hashQuery = {
                    [formatQueryAppName(appName)]: encodedMicroPath
                };
            }
            const baseHash = hash.includes('?') ? hash.slice(0, hash.indexOf('?') + 1) : hash + '?';
            hash = baseHash + stringifyQuery(queryObject.hashQuery);
        }
        else {
            if (queryObject.searchQuery) {
                queryObject.searchQuery[formatQueryAppName(appName)] = encodedMicroPath;
            }
            else {
                queryObject.searchQuery = {
                    [formatQueryAppName(appName)]: encodedMicroPath
                };
            }
            search = '?' + stringifyQuery(queryObject.searchQuery);
        }
        return {
            fullPath: pathname + search + hash,
            isAttach2Hash,
        };
    }
    if (isRouterModeState(appName) || isRouterModePure(appName)) {
        targetFullPath = rawLocation.pathname + rawLocation.search + rawLocation.hash;
    }
    return {
        fullPath: targetFullPath,
        isAttach2Hash,
    };
}
/**
 * Delete child app fullPath from browser url
 * @param appName app.name
 */
function removeMicroPathFromURL(appName) {
    var _a, _b, _c, _d;
    let { pathname, search, hash } = globalEnv.rawWindow.location;
    let isAttach2Hash = false;
    if (isRouterModeSearch(appName)) {
        const queryObject = getQueryObjectFromURL(search, hash);
        if ((_a = queryObject.hashQuery) === null || _a === void 0 ? void 0 : _a[formatQueryAppName(appName)]) {
            isAttach2Hash = true;
            (_b = queryObject.hashQuery) === null || _b === void 0 ? true : delete _b[formatQueryAppName(appName)];
            const hashQueryStr = stringifyQuery(queryObject.hashQuery);
            hash = hash.slice(0, hash.indexOf('?') + Number(Boolean(hashQueryStr))) + hashQueryStr;
        }
        else if ((_c = queryObject.searchQuery) === null || _c === void 0 ? void 0 : _c[formatQueryAppName(appName)]) {
            (_d = queryObject.searchQuery) === null || _d === void 0 ? true : delete _d[formatQueryAppName(appName)];
            const searchQueryStr = stringifyQuery(queryObject.searchQuery);
            search = searchQueryStr ? '?' + searchQueryStr : '';
        }
    }
    return {
        fullPath: pathname + search + hash,
        isAttach2Hash,
    };
}
/**
 * Format search, hash to object
 */
function getQueryObjectFromURL(search, hash) {
    const queryObject = {};
    if (search !== '' && search !== '?') {
        queryObject.searchQuery = parseQuery(search.slice(1));
    }
    if (hash.includes('?')) {
        queryObject.hashQuery = parseQuery(hash.slice(hash.indexOf('?') + 1));
    }
    return queryObject;
}
/**
 * get microApp path from browser URL without hash
 */
function getNoHashMicroPathFromURL(appName, baseUrl) {
    const microPath = getMicroPathFromURL(appName);
    if (!microPath)
        return '';
    const formatLocation = createURL(microPath, baseUrl);
    return formatLocation.origin + formatLocation.pathname + formatLocation.search;
}
/**
 * Effect app is an app that can perform route navigation
 * NOTE: Invalid app action
 * 1. prevent update browser url, dispatch popStateEvent, reload browser
 * 2. It can update path with pushState/replaceState
 * 3. Can not update path outside (with router api)
 * 3. Can not update path by location
 */
function isEffectiveApp(appName) {
    const app = appInstanceMap.get(appName);
    /**
     * !!(app && !app.isPrefetch && !app.isHidden())
     * NOTE: 隐藏的keep-alive应用暂时不作为无效应用，原因如下
     * 1、隐藏后才执行去除浏览器上的微应用的路由信息的操作，导致微应用的路由信息无法去除
     * 2、如果保持隐藏应用内部正常跳转，阻止同步路由信息到浏览器，这样理论上是好的，但是对于location跳转改如何处理？location跳转是基于修改浏览器地址后发送popstate事件实现的，所以应该是在隐藏后不支持通过location进行跳转
     */
    return !!(app && !app.isPrefetch);
}
/**
 * get router mode of app
 * NOTE: app maybe undefined
 */
function getRouterMode(appName) {
    var _a;
    return (_a = appInstanceMap.get(appName)) === null || _a === void 0 ? void 0 : _a.routerMode;
}
// router mode is search
function isRouterModeSearch(appName) {
    return getRouterMode(appName) === DEFAULT_ROUTER_MODE;
}
// router mode is state
function isRouterModeState(appName) {
    return getRouterMode(appName) === ROUTER_MODE_STATE;
}
// router mode is history
function isRouterModeNative(appName) {
    return getRouterMode(appName) === ROUTER_MODE_NATIVE;
}
// router mode is disable
function isRouterModeNativeScope(appName) {
    return getRouterMode(appName) === ROUTER_MODE_NATIVE_SCOPE;
}
// router mode is pure
function isRouterModePure(appName) {
    return getRouterMode(appName) === ROUTER_MODE_PURE;
}
/**
 * router mode is history or disable
 */
function isRouterModeCustom(appName) {
    return isRouterModeNative(appName) || isRouterModeNativeScope(appName);
}
/**
 * get memory router mode of child app
 * NOTE:
 *  1. if microAppElement exists, it means the app render by the micro-app element
 *  2. if microAppElement not exists, it means it is prerender app
 * @param mode native config
 * @param inlineDisableMemoryRouter disable-memory-router set by micro-app element or prerender
 * @returns router mode
 */
function initRouterMode(mode, inlineDisableMemoryRouter) {
    /**
     * compatible with disable-memory-router in older versions
     * if disable-memory-router is true, router-mode will be disable
     * Priority:
     *  inline disable-memory-router > inline router-mode > global disable-memory-router > global router-mode
     */
    const routerMode = ((inlineDisableMemoryRouter && ROUTER_MODE_NATIVE) ||
        mode ||
        (microApp.options['disable-memory-router'] && ROUTER_MODE_NATIVE) ||
        microApp.options['router-mode'] ||
        DEFAULT_ROUTER_MODE);
    return ROUTER_MODE_LIST.includes(routerMode) ? routerMode : DEFAULT_ROUTER_MODE;
}

/**
 * dispatch PopStateEvent & HashChangeEvent to child app
 * each child app will listen for popstate event when sandbox start
 * and release it when sandbox stop
 * @param appName app name
 * @returns release callback
 */
function addHistoryListener(appName) {
    const rawWindow = globalEnv.rawWindow;
    // handle popstate event and distribute to child app
    const popStateHandler = (e) => {
        var _a, _b, _c;
        /**
         * 1. unmount app & hidden keep-alive app will not receive popstate event
         * 2. filter out onlyForBrowser
         */
        if (getActiveApps({
            excludeHiddenApp: true,
            excludePreRender: true,
        }).includes(appName) &&
            !e.onlyForBrowser) {
            /**
             * base app may respond to popstateEvent async(lazy load page & browser back/forward), but child app will respond to popstateEvent immediately(vue2, react), this will cause some problems
             * 2 solutions:
             *  1. child app respond to popstateEvent async -- router-event-delay
             *  2. child app will not respond to popstateEvent in some scenarios (history.state===null || history.state?__MICRO_APP_STATE__[appName])
             * NOTE 1:
             *  1. browser back/forward
             *  2. location.hash/search/pathname = xxx
             *  3. <a href="/#/xxx">, <a href="/xxx">
             *  4. history.back/go/forward
             *  5. history.pushState/replaceState
             *
             * NOTE2:
             *  1、react16 hash mode navigate by location.hash = xxx, history.state is always null, but react16 respond to popstateEvent sync
             *  2、multiple child apps may has problems
             */
            if (!isRouterModeCustom(appName) ||
                !globalEnv.rawWindow.history.state ||
                getMicroRouterInfoState(appName)) {
                const container = (_a = appInstanceMap.get(appName)) === null || _a === void 0 ? void 0 : _a.container;
                macro(() => updateMicroLocationWithEvent(appName, getMicroPathFromURL(appName)), (_c = (_b = (container && getRootContainer(container))) === null || _b === void 0 ? void 0 : _b.getRouterEventDelay()) !== null && _c !== void 0 ? _c : 0);
            }
        }
    };
    rawWindow.addEventListener('popstate', popStateHandler);
    return () => {
        rawWindow.removeEventListener('popstate', popStateHandler);
    };
}
/**
 * Effect: use to trigger child app jump
 * Actions:
 *  1. update microLocation with target path
 *  2. dispatch popStateEvent & hashChangeEvent
 * @param appName app name
 * @param targetFullPath target path of child app
 */
function updateMicroLocationWithEvent(appName, targetFullPath) {
    const app = appInstanceMap.get(appName);
    if (app === null || app === void 0 ? void 0 : app.sandBox) {
        const proxyWindow = app.sandBox.proxyWindow;
        const microAppWindow = app.sandBox.microAppWindow;
        let isHashChange = false;
        // for hashChangeEvent
        const oldHref = proxyWindow.location.href;
        // Do not attach micro state to url when targetFullPath is empty
        if (targetFullPath) {
            const oldHash = proxyWindow.location.hash;
            updateMicroLocation(appName, targetFullPath, microAppWindow.location);
            isHashChange = proxyWindow.location.hash !== oldHash;
        }
        // dispatch formatted popStateEvent to child
        dispatchPopStateEventToMicroApp(appName, proxyWindow, microAppWindow);
        // dispatch formatted hashChangeEvent to child when hash change
        if (isHashChange)
            dispatchHashChangeEventToMicroApp(appName, proxyWindow, microAppWindow, oldHref);
        // clear element scope before trigger event of next app
        removeDomScope();
    }
}
/**
 * dispatch formatted popstate event to microApp
 * @param appName app name
 * @param proxyWindow sandbox window
 * @param eventState history.state
 */
function dispatchPopStateEventToMicroApp(appName, proxyWindow, microAppWindow) {
    /**
     * TODO: test
     * angular14 takes e.type as type judgment
     * when e.type is popstate-appName popstate event will be invalid
     * Object.defineProperty(newPopStateEvent, 'type', {
     *    value: 'popstate',
     *    writable: true,
     *    configurable: true,
     *    enumerable: true,
     * })
     */
    /**
     * create PopStateEvent named popstate-appName with sub app state
     * TODO: feeling like there's something wrong, check carefully
     *  In native mode, getMicroState(appName) return rawWindow.history.state when use microApp.router.push/replace or other scenes when state.__MICRO_APP_STATE__[appName] is null
     */
    const newPopStateEvent = new PopStateEvent('popstate', { state: getMicroState(appName) });
    microAppWindow.dispatchEvent(newPopStateEvent);
    if (!isIframeSandbox(appName)) {
        // call function window.onpopstate if it exists
        isFunction(proxyWindow.onpopstate) && proxyWindow.onpopstate(newPopStateEvent);
    }
}
/**
 * dispatch formatted hashchange event to microApp
 * @param appName app name
 * @param proxyWindow sandbox window
 * @param oldHref old href
 */
function dispatchHashChangeEventToMicroApp(appName, proxyWindow, microAppWindow, oldHref) {
    const newHashChangeEvent = new HashChangeEvent('hashchange', {
        newURL: proxyWindow.location.href,
        oldURL: oldHref,
    });
    microAppWindow.dispatchEvent(newHashChangeEvent);
    if (!isIframeSandbox(appName)) {
        // call function window.onhashchange if it exists
        isFunction(proxyWindow.onhashchange) && proxyWindow.onhashchange(newHashChangeEvent);
    }
}
/**
 * dispatch native PopStateEvent, simulate location behavior
 * @param onlyForBrowser only dispatch PopStateEvent to browser
 */
function dispatchNativePopStateEvent(onlyForBrowser) {
    const event = new PopStateEvent('popstate', { state: null });
    if (onlyForBrowser)
        event.onlyForBrowser = true;
    globalEnv.rawWindow.dispatchEvent(event);
}
/**
 * dispatch hashchange event to browser
 * @param oldHref old href of rawWindow.location
 */
function dispatchNativeHashChangeEvent(oldHref) {
    const newHashChangeEvent = new HashChangeEvent('hashchange', {
        newURL: globalEnv.rawWindow.location.href,
        oldURL: oldHref,
    });
    globalEnv.rawWindow.dispatchEvent(newHashChangeEvent);
}
/**
 * dispatch popstate & hashchange event to browser
 * @param appName app.name
 * @param onlyForBrowser only dispatch event to browser
 * @param oldHref old href of rawWindow.location
 */
function dispatchNativeEvent(appName, onlyForBrowser, oldHref) {
    // clear element scope before dispatch global event
    removeDomScope();
    if (isEffectiveApp(appName)) {
        dispatchNativePopStateEvent(onlyForBrowser);
        if (oldHref) {
            dispatchNativeHashChangeEvent(oldHref);
        }
    }
}

/**
 * create proxyHistory for microApp
 * MDN https://developer.mozilla.org/en-US/docs/Web/API/History
 * @param appName app name
 * @param microLocation microApp location(with: proxyLocation iframe: iframeWindow.location)
 */
function createMicroHistory(appName, microLocation) {
    const rawHistory = globalEnv.rawWindow.history;
    function getMicroHistoryMethod(methodName) {
        return function (...rests) {
            var _a, _b, _c;
            // TODO: 测试iframe的URL兼容isURL的情况
            rests[2] = isUndefined(rests[2]) || isNull(rests[2]) || ('' + rests[2] === '') ? microLocation.href : '' + rests[2];
            const targetLocation = createURL(rests[2], microLocation.href);
            const targetFullPath = targetLocation.pathname + targetLocation.search + targetLocation.hash;
            if (!isRouterModePure(appName)) {
                navigateWithNativeEvent(appName, methodName, setMicroPathToURL(appName, targetLocation), true, setMicroState(appName, rests[0], targetLocation), rests[1]);
            }
            if (targetFullPath !== microLocation.fullPath) {
                updateMicroLocation(appName, targetFullPath, microLocation);
            }
            (_c = (_a = appInstanceMap.get(appName)) === null || _a === void 0 ? void 0 : (_b = _a.sandBox).updateIframeBase) === null || _c === void 0 ? void 0 : _c.call(_b);
        };
    }
    const originalHistory = {
        pushState: getMicroHistoryMethod('pushState'),
        replaceState: getMicroHistoryMethod('replaceState'),
    };
    if (isIframeSandbox(appName)) {
        return assign({
            go(delta) {
                return rawHistory.go(delta);
            }
        }, originalHistory);
    }
    return new Proxy(rawHistory, {
        get(target, key) {
            if (key === 'pushState' || key === 'replaceState') {
                return originalHistory[key];
            }
            else if (key === 'state') {
                return getMicroState(appName);
            }
            return bindFunctionToRawTarget(Reflect.get(target, key), target, 'HISTORY');
        },
        set(target, key, value) {
            if (key === 'pushState' || key === 'replaceState') {
                originalHistory[key] = value;
            }
            else {
                Reflect.set(target, key, value);
            }
            /**
             * If the set() method returns false, and the assignment happened in strict-mode code, a TypeError will be thrown.
             * e.g. history.state = {}
             * TypeError: 'set' on proxy: trap returned false for property 'state'
             */
            return true;
        }
    });
}
/**
 * navigate to new path base on native method of history
 * @param appName app.name
 * @param methodName pushState/replaceState
 * @param fullPath full path
 * @param state history.state, default is null
 * @param title history.title, default is ''
 */
function nativeHistoryNavigate(appName, methodName, fullPath, state = null, title = '') {
    if (isEffectiveApp(appName)) {
        const method = methodName === 'pushState' ? globalEnv.rawPushState : globalEnv.rawReplaceState;
        method.call(globalEnv.rawWindow.history, state, title, fullPath);
    }
}
/**
 * Navigate to new path, and dispatch native popStateEvent/hashChangeEvent to browser
 * Use scenes:
 * 1. mount/unmount through attachRouteToBrowserURL with limited popstateEvent
 * 2. proxyHistory.pushState/replaceState with limited popstateEvent
 * 3. api microApp.router.push/replace
 * 4. proxyLocation.hash = xxx
 * NOTE:
 *  1. hidden keep-alive app can jump internally, but will not synchronize to browser
 * @param appName app.name
 * @param methodName pushState/replaceState
 * @param result result of add/remove microApp path on browser url
 * @param onlyForBrowser only dispatch event to browser
 * @param state history.state, not required
 * @param title history.title, not required
 */
function navigateWithNativeEvent(appName, methodName, result, onlyForBrowser, state, title) {
    if (isEffectiveApp(appName)) {
        const rawLocation = globalEnv.rawWindow.location;
        const oldFullPath = rawLocation.pathname + rawLocation.search + rawLocation.hash;
        // oldHref use for hashChangeEvent of base app
        const oldHref = result.isAttach2Hash && oldFullPath !== result.fullPath ? rawLocation.href : null;
        // navigate with native history method
        nativeHistoryNavigate(appName, methodName, result.fullPath, state, title);
        // just search mode will dispatch native event
        if (oldFullPath !== result.fullPath && isRouterModeSearch(appName)) {
            dispatchNativeEvent(appName, onlyForBrowser, oldHref);
        }
    }
}
/**
 * update browser url when mount/unmount/hidden/show/attachToURL/attachAllToURL
 * just attach microRoute info to browser, dispatch event to base app(exclude child)
 * @param appName app.name
 * @param result result of add/remove microApp path on browser url
 * @param state history.state
 */
function attachRouteToBrowserURL(appName, result, state) {
    navigateWithNativeEvent(appName, 'replaceState', result, true, state);
}
/**
 * When path is same, keep the __MICRO_APP_STATE__ in history.state
 * Fix bug of missing __MICRO_APP_STATE__ when base app is next.js or angular
 * @param method history.pushState/replaceState
 */
function reWriteHistoryMethod(method) {
    const rawWindow = globalEnv.rawWindow;
    return function (...rests) {
        var _a;
        if (((_a = rawWindow.history.state) === null || _a === void 0 ? void 0 : _a.__MICRO_APP_STATE__) &&
            (!isPlainObject(rests[0]) || !rests[0].__MICRO_APP_STATE__) &&
            (isString(rests[2]) || isURL(rests[2]))) {
            const currentHref = rawWindow.location.href;
            const targetLocation = createURL(rests[2], currentHref);
            if (targetLocation.href === currentHref) {
                rests[0] = assign({}, rests[0], {
                    __MICRO_APP_STATE__: rawWindow.history.state.__MICRO_APP_STATE__,
                });
            }
        }
        method.apply(rawWindow.history, rests);
        /**
         * Attach child router info to browser url when base app navigate with pushState/replaceState
         * NOTE:
         * 1. Exec after apply pushState/replaceState
         * 2. Unable to catch when base app navigate with location
         * 3. When in nest app, rawPushState/rawReplaceState has been modified by parent
         */
        getActiveApps({
            excludeHiddenApp: true,
            excludePreRender: true,
        }).forEach(appName => {
            if ((isRouterModeSearch(appName) || isRouterModeState(appName)) && !getMicroPathFromURL(appName)) {
                const app = appInstanceMap.get(appName);
                attachRouteToBrowserURL(appName, setMicroPathToURL(appName, app.sandBox.proxyWindow.location), setMicroState(appName, getMicroState(appName), app.sandBox.proxyWindow.location));
            }
            if (isRouterModeCustom(appName) && !getMicroRouterInfoState(appName)) {
                nativeHistoryNavigate(appName, 'replaceState', rawWindow.location.href, setMicroState(appName));
            }
            // if (isRouterModeCustom(appName) || isRouterModeSearch(appName)) {
            /**
               * history.pushState/replaceState后主动触发子应用响应
               * 问题：子应用的卸载可能是异步的，而跳转的地址不一定在基础路径中，太快响应pushState可能会导致url地址被子应用改变或者子应用404，Promise太快卸载时出问题、setTimeout太慢keep-alive二次渲染后出问题
               *  1、history.pushState/replaceState执行后，子应用以异步的形式被主应用卸载，Promise响应时子应用还在，导致子应用跳转404后者浏览器url被子应用修改，产生异常
               *  2、keep-alive应用二次渲染时，由于setTimeout响应过慢，子应用在渲染后才接受到popstate事件，响应新的url，从而导致状态丢失
               *  3、同一个页面多个子应用，修改地址响应
               *  4、vue3跳转前会执行一次replace，有没有影响？
               */
            // }
        });
        // fix bug for nest app
        removeDomScope();
    };
}
/**
 * rewrite history.pushState/replaceState
 * used to fix the problem that the __MICRO_APP_STATE__ maybe missing when mainApp navigate to same path
 * e.g: when nextjs, angular receive popstate event, they will use history.replaceState to update browser url with a new state object
 */
function patchHistory() {
    const rawWindow = globalEnv.rawWindow;
    rawWindow.history.pushState = reWriteHistoryMethod(globalEnv.rawPushState);
    rawWindow.history.replaceState = reWriteHistoryMethod(globalEnv.rawReplaceState);
}
function releasePatchHistory() {
    const rawWindow = globalEnv.rawWindow;
    rawWindow.history.pushState = globalEnv.rawPushState;
    rawWindow.history.replaceState = globalEnv.rawReplaceState;
}

function createRouterApi() {
    /**
     * common handler for router.push/router.replace method
     * @param appName app name
     * @param methodName replaceState/pushState
     * @param targetLocation target location
     * @param state to.state
     */
    function navigateWithRawHistory(appName, methodName, targetLocation, state) {
        navigateWithNativeEvent(appName, methodName, setMicroPathToURL(appName, targetLocation), false, setMicroState(appName, state !== null && state !== void 0 ? state : null, targetLocation));
        // clear element scope after navigate
        removeDomScope();
    }
    /**
     * navigation handler
     * @param appName app.name
     * @param app app instance
     * @param to router target options
     * @param replace use router.replace?
     */
    function handleNavigate(appName, app, to, replace) {
        const microLocation = app.sandBox.proxyWindow.location;
        const targetLocation = createURL(to.path, microLocation.href);
        // Only get path data, even if the origin is different from microApp
        const currentFullPath = microLocation.pathname + microLocation.search + microLocation.hash;
        const targetFullPath = targetLocation.pathname + targetLocation.search + targetLocation.hash;
        if (currentFullPath !== targetFullPath || getMicroPathFromURL(appName) !== targetFullPath) {
            // pure mode will not call history.pushState/replaceState
            if (!isRouterModePure(appName)) {
                const methodName = (replace && to.replace !== false) || to.replace === true ? 'replaceState' : 'pushState';
                navigateWithRawHistory(appName, methodName, targetLocation, to.state);
            }
            // only search mode will dispatch PopStateEvent to browser
            if (!isRouterModeSearch(appName)) {
                updateMicroLocationWithEvent(appName, targetFullPath);
            }
        }
    }
    /**
     * create method of router.push/replace
     * NOTE:
     * 1. The same fullPath will be blocked
     * 2. name & path is required
     * 3. path is fullPath except for the domain (the domain can be taken, but not valid)
     * @param replace use router.replace?
     */
    function createNavigationMethod(replace) {
        return function (to) {
            return new Promise((resolve, reject) => {
                const appName = formatAppName(to.name);
                if (appName && isString(to.path)) {
                    /**
                     * active apps, exclude prerender app or hidden keep-alive app
                     * NOTE:
                     *  1. prerender app or hidden keep-alive app clear and record popstate event, so we cannot control app jump through the API
                     *  2. disable memory-router
                     */
                    /**
                     * TODO:
                     *  1、子应用开始渲染但是还没渲染完成，调用跳转改如何处理
                     *  2、iframe的沙箱还没初始化时执行跳转报错，如何处理。。。
                     *  3、hidden app、预渲染 app 是否支持跳转 --- 支持（这里还涉及子应用内部跳转的支持）
                     */
                    if (getActiveApps({ excludeHiddenApp: true, excludePreRender: true }).includes(appName)) {
                        const app = appInstanceMap.get(appName);
                        resolve(app.sandBox.sandboxReady.then(() => handleNavigate(appName, app, to, replace)));
                    }
                    else {
                        reject(logError('导航失败，请确保子应用渲染后再调用此方法'));
                    }
                    // const rawLocation = globalEnv.rawWindow.location
                    // const targetLocation = createURL(to.path, rawLocation.origin)
                    // const targetFullPath = targetLocation.pathname + targetLocation.search + targetLocation.hash
                    // if (getMicroPathFromURL(appName) !== targetFullPath) {
                    //   navigateWithRawHistory(
                    //     appName,
                    //     to.replace === false ? 'pushState' : 'replaceState',
                    //     targetLocation,
                    //     to.state,
                    //   )
                    // }
                }
                else {
                    reject(logError(`navigation failed, name & path are required when use router.${replace ? 'replace' : 'push'}`));
                }
            });
        };
    }
    // create method of router.go/back/forward
    function createRawHistoryMethod(methodName) {
        return function (...rests) {
            return globalEnv.rawWindow.history[methodName](...rests);
        };
    }
    const beforeGuards = useSetRecord();
    const afterGuards = useSetRecord();
    /**
     * run all of beforeEach/afterEach guards
     * NOTE:
     * 1. Modify browser url first, and then run guards,
     *    consistent with the browser forward & back button
     * 2. Prevent the element binding
     * @param appName app name
     * @param to target location
     * @param from old location
     * @param guards guards list
     */
    function runGuards(appName, to, from, guards) {
        // clear element scope before execute function of parent
        removeDomScope();
        for (const guard of guards) {
            if (isFunction(guard)) {
                guard(to, from, appName);
            }
            else if (isPlainObject(guard) && isFunction(guard[appName])) {
                guard[appName](to, from);
            }
        }
    }
    /**
     * global hook for router
     * update router information base on microLocation
     * @param appName app name
     * @param microLocation location of microApp
     */
    function executeNavigationGuard(appName, to, from) {
        router.current.set(appName, to);
        runGuards(appName, to, from, beforeGuards.list());
        requestIdleCallback(() => {
            runGuards(appName, to, from, afterGuards.list());
        });
    }
    function clearRouterWhenUnmount(appName) {
        router.current.delete(appName);
    }
    /**
     * NOTE:
     * 1. app not exits
     * 2. sandbox is disabled
     * 3. router mode is custom
     */
    function commonHandlerForAttachToURL(appName) {
        if (isRouterModeSearch(appName) || isRouterModeState(appName)) {
            const app = appInstanceMap.get(appName);
            attachRouteToBrowserURL(appName, setMicroPathToURL(appName, app.sandBox.proxyWindow.location), setMicroState(appName, getMicroState(appName), app.sandBox.proxyWindow.location));
        }
    }
    /**
     * Attach specified active app router info to browser url
     * @param appName app name
     */
    function attachToURL(appName) {
        appName = formatAppName(appName);
        if (appName && getActiveApps().includes(appName)) {
            commonHandlerForAttachToURL(appName);
        }
    }
    /**
     * Attach all active app router info to browser url
     * @param includeHiddenApp include hidden keep-alive app
     * @param includePreRender include preRender app
     */
    function attachAllToURL({ includeHiddenApp = false, includePreRender = false, }) {
        getActiveApps({
            excludeHiddenApp: !includeHiddenApp,
            excludePreRender: !includePreRender,
        }).forEach(appName => commonHandlerForAttachToURL(appName));
    }
    function createDefaultPageApi() {
        // defaultPage data
        const defaultPageRecord = useMapRecord();
        /**
         * defaultPage only effect when mount, and has lower priority than query on browser url
         * SetDefaultPageOptions {
         *   @param name app name
         *   @param path page path
         * }
         */
        function setDefaultPage(options) {
            const appName = formatAppName(options.name);
            if (!appName || !options.path) {
                if ((true)) {
                    if (!appName) {
                        logWarn(`setDefaultPage: invalid appName "${appName}"`);
                    }
                    else {
                        logWarn('setDefaultPage: path is required');
                    }
                }
                return noopFalse;
            }
            return defaultPageRecord.add(appName, options.path);
        }
        function removeDefaultPage(appName) {
            appName = formatAppName(appName);
            if (!appName)
                return false;
            return defaultPageRecord.delete(appName);
        }
        return {
            setDefaultPage,
            removeDefaultPage,
            getDefaultPage: defaultPageRecord.get,
        };
    }
    function createBaseRouterApi() {
        /**
         * Record base app router, let child app control base app navigation
         */
        let baseRouterProxy = null;
        function setBaseAppRouter(baseRouter) {
            if (isObject(baseRouter)) {
                baseRouterProxy = new Proxy(baseRouter, {
                    get(target, key) {
                        removeDomScope();
                        return bindFunctionToRawTarget(Reflect.get(target, key), target, 'BASEROUTER');
                    },
                    set(target, key, value) {
                        Reflect.set(target, key, value);
                        return true;
                    }
                });
            }
            else if ((true)) {
                logWarn('setBaseAppRouter: Invalid base router');
            }
        }
        return {
            setBaseAppRouter,
            getBaseAppRouter: () => baseRouterProxy,
        };
    }
    // Router API for developer
    const router = Object.assign(Object.assign({ current: new Map(), encode: encodeMicroPath, decode: decodeMicroPath, push: createNavigationMethod(false), replace: createNavigationMethod(true), go: createRawHistoryMethod('go'), back: createRawHistoryMethod('back'), forward: createRawHistoryMethod('forward'), beforeEach: beforeGuards.add, afterEach: afterGuards.add, attachToURL,
        attachAllToURL }, createDefaultPageApi()), createBaseRouterApi());
    return {
        router,
        executeNavigationGuard,
        clearRouterWhenUnmount,
    };
}
const { router, executeNavigationGuard, clearRouterWhenUnmount, } = createRouterApi();

// origin is readonly, so we ignore when updateMicroLocation
const locationKeys = ['href', 'pathname', 'search', 'hash', 'host', 'hostname', 'port', 'protocol', 'search'];
// origin, fullPath is necessary for guardLocation
const guardLocationKeys = [...locationKeys, 'origin', 'fullPath'];
/**
 * Create location for microApp, each microApp has only one location object, it is a reference type
 * MDN https://developer.mozilla.org/en-US/docs/Web/API/Location
 * @param appName app name
 * @param url app url
 * @param microAppWindow iframeWindow, iframe only
 * @param childStaticLocation real child location info, iframe only
 * @param browserHost host of browser, iframe only
 * @param childHost host of child app, iframe only
 */
function createMicroLocation(appName, url, microAppWindow, childStaticLocation, browserHost, childHost) {
    const rawWindow = globalEnv.rawWindow;
    const rawLocation = rawWindow.location;
    const isIframe = !!microAppWindow;
    /**
     * withLocation is microLocation for with sandbox
     * it is globally unique for child app
     */
    const withLocation = createURL(url);
    /**
     * In iframe, jump through raw iframeLocation will cause microAppWindow.location reset
     * So we get location dynamically
     */
    function getTarget() {
        return isIframe ? microAppWindow.location : withLocation;
    }
    /**
     * Common handler for href, assign, replace
     * It is mainly used to deal with special scenes about hash
     * @param value target path
     * @param methodName pushState/replaceState
     * @returns origin value or formatted value
     */
    function commonHandler(value, methodName) {
        const targetLocation = createURL(value, proxyLocation.href);
        // Even if the origin is the same, developers still have the possibility of want to jump to a new page
        if (targetLocation.origin === proxyLocation.origin) {
            const setMicroPathResult = setMicroPathToURL(appName, targetLocation);
            // if disable memory-router, navigate directly through rawLocation
            if (!isRouterModeCustom(appName)) {
                methodName = isRouterModePure(appName) ? 'replaceState' : methodName;
                /**
                 * change hash with location.href will not trigger the browser reload
                 * so we use pushState & reload to imitate href behavior
                 * NOTE:
                 *    1. if child app only change hash, it will not reload browser
                 *    2. if address is same and has hash, it will not add route stack
                 */
                if (targetLocation.pathname === proxyLocation.pathname &&
                    targetLocation.search === proxyLocation.search) {
                    let oldHref = null;
                    // NOTE: if pathname & search is same, it should record router info to history.state in pure mode
                    if (targetLocation.hash !== proxyLocation.hash || isRouterModePure(appName)) {
                        // search mode only
                        if (setMicroPathResult.isAttach2Hash) {
                            oldHref = rawLocation.href;
                        }
                        // if router mode is pure and targetLocation.hash exist, it will not call nativeHistoryNavigate
                        if (!isRouterModePure(appName) || !targetLocation.hash) {
                            nativeHistoryNavigate(appName, methodName, setMicroPathResult.fullPath, !isRouterModeSearch(appName) ? setMicroState(appName, null, targetLocation) : null);
                        }
                    }
                    if (targetLocation.hash) {
                        if (isRouterModeSearch(appName)) {
                            dispatchNativeEvent(appName, false, oldHref);
                        }
                        else {
                            updateMicroLocationWithEvent(appName, targetLocation.pathname + targetLocation.search + targetLocation.hash);
                        }
                    }
                    else {
                        reload();
                    }
                    return void 0;
                }
                // when pathname or search change, simulate behavior of browser (reload) manually
                // TODO: state模式下pushState会带上上一个页面的state，会不会有问题，尤其是vue3，应不应该将主应用的state设置为null
                nativeHistoryNavigate(appName, methodName, setMicroPathResult.fullPath, !isRouterModeSearch(appName) ? setMicroState(appName, null, targetLocation) : null);
                reload();
                return void 0;
            }
            return setMicroPathResult.fullPath;
        }
        return value;
    }
    /**
     * common handler for location.pathname & location.search
     * @param targetPath target fullPath
     * @param key pathname/search
     */
    function handleForPathNameAndSearch(targetPath, key) {
        const targetLocation = createURL(targetPath, url);
        // When the browser url has a hash value, the same pathname/search will not refresh browser
        if (targetLocation[key] === proxyLocation[key] && proxyLocation.hash) {
            // The href has not changed, not need to dispatch hashchange event
            dispatchNativeEvent(appName, false);
        }
        else {
            /**
             * When the value is the same, no new route stack will be added
             * Special scenes such as:
             * pathname: /path ==> /path#hash, /path ==> /path?query
             * search: ?query ==> ?query#hash
             */
            nativeHistoryNavigate(appName, (targetLocation[key] === proxyLocation[key] || isRouterModePure(appName))
                ? 'replaceState'
                : 'pushState', setMicroPathToURL(appName, targetLocation).fullPath, !isRouterModeSearch(appName) ? setMicroState(appName, null, targetLocation) : null);
            reload();
        }
    }
    const createLocationMethod = (locationMethodName) => {
        return function (value) {
            if (isEffectiveApp(appName)) {
                const targetPath = commonHandler(value, locationMethodName === 'assign' ? 'pushState' : 'replaceState');
                if (targetPath) {
                    // Same as href, complete targetPath with browser origin in vite env
                    rawLocation[locationMethodName](createURL(targetPath, rawLocation.origin).href);
                }
            }
        };
    };
    const assign = createLocationMethod('assign');
    const replace = createLocationMethod('replace');
    const reload = (forcedReload) => rawLocation.reload(forcedReload);
    rawDefineProperty(getTarget(), 'fullPath', {
        enumerable: true,
        configurable: true,
        get: () => proxyLocation.pathname + proxyLocation.search + proxyLocation.hash,
    });
    /**
     * location.assign/replace is readonly, cannot be proxy, so we use empty object as proxy target
     */
    const proxyLocation = new Proxy({}, {
        get: (_, key) => {
            const target = getTarget();
            if (key === 'assign')
                return assign;
            if (key === 'replace')
                return replace;
            if (key === 'reload')
                return reload;
            if (key === 'self')
                return target;
            if (key === 'fullPath')
                return target.fullPath;
            /**
             * Special keys: host, hostname, port, protocol, origin, href
             * NOTE:
             *  1. In native mode this keys point to browser, in other mode this keys point to child app origin
             *  2. In iframe sandbox, iframe.src is base app address, so origin points to the browser by default, we need to replace it with child app origin
             *  3. In other modes, origin points to child app
             */
            if (HIJACK_LOCATION_KEYS.includes(key)) {
                if (isRouterModeNative(appName)) {
                    return rawLocation[key];
                }
                if (isIframe) {
                    return childStaticLocation[key];
                }
            }
            if (key === 'href') {
                if (isRouterModeNative(appName)) {
                    return target[key].replace(target.origin, rawLocation.origin);
                }
                if (isIframe) {
                    // target may be deleted
                    return target[key].replace(browserHost, childHost);
                }
            }
            return bindFunctionToRawTarget(Reflect.get(target, key), target, 'LOCATION');
        },
        set: (_, key, value) => {
            if (isEffectiveApp(appName)) {
                const target = getTarget();
                if (key === 'href') {
                    /**
                     * In vite, targetPath without origin will be completed with child origin
                     * So we use browser origin to complete targetPath to avoid this problem
                     * NOTE:
                     *  1. history mode & value is childOrigin + path ==> jump to browserOrigin + path
                     *  2. disable mode & value is childOrigin + path ==> jump to childOrigin + path
                     *  3. search mode & value is browserOrigin + path ==> jump to browserOrigin + path
                     */
                    const targetPath = commonHandler(value, 'pushState');
                    if (targetPath) {
                        rawLocation.href = createURL(targetPath, rawLocation.origin).href;
                    }
                }
                else if (key === 'pathname') {
                    if (isRouterModeCustom(appName)) {
                        rawLocation.pathname = value;
                    }
                    else {
                        const targetPath = ('/' + value).replace(/^\/+/, '/') + proxyLocation.search + proxyLocation.hash;
                        handleForPathNameAndSearch(targetPath, 'pathname');
                    }
                }
                else if (key === 'search') {
                    if (isRouterModeCustom(appName)) {
                        rawLocation.search = value;
                    }
                    else {
                        const targetPath = proxyLocation.pathname + ('?' + value).replace(/^\?+/, '?') + proxyLocation.hash;
                        handleForPathNameAndSearch(targetPath, 'search');
                    }
                }
                else if (key === 'hash') {
                    if (isRouterModeCustom(appName)) {
                        rawLocation.hash = value;
                    }
                    else {
                        const targetPath = proxyLocation.pathname + proxyLocation.search + ('#' + value).replace(/^#+/, '#');
                        const targetLocation = createURL(targetPath, url);
                        // The same hash will not trigger popStateEvent
                        if (targetLocation.hash !== proxyLocation.hash) {
                            if (!isRouterModePure(appName)) {
                                navigateWithNativeEvent(appName, 'pushState', setMicroPathToURL(appName, targetLocation), false, setMicroState(appName, null, targetLocation));
                            }
                            if (!isRouterModeSearch(appName)) {
                                updateMicroLocationWithEvent(appName, targetLocation.pathname + targetLocation.search + targetLocation.hash);
                            }
                        }
                    }
                }
                else {
                    Reflect.set(target, key, value);
                }
            }
            return true;
        },
    });
    return proxyLocation;
}
/**
 * create guardLocation by microLocation, used for router guard
 */
function createGuardLocation(appName, microLocation) {
    const guardLocation = assign({ name: appName }, microLocation);
    // The prototype values on the URL needs to be manually transferred
    for (const key of guardLocationKeys)
        guardLocation[key] = microLocation[key];
    return guardLocation;
}
// for updateBrowserURLWithLocation when initial
function autoTriggerNavigationGuard(appName, microLocation) {
    executeNavigationGuard(appName, createGuardLocation(appName, microLocation), createGuardLocation(appName, microLocation));
}
/**
 * The following scenes will trigger location update:
 * 1. pushState/replaceState
 * 2. popStateEvent
 * 3. query on browser url when init sub app
 * 4. set defaultPage when when init sub app
 * NOTE:
 * 1. update browser URL first, and then update microLocation
 * 2. the same fullPath will not trigger router guards
 * @param appName app name
 * @param path target path
 * @param base base url
 * @param microLocation micro app location
 * @param type auto prevent
 */
function updateMicroLocation(appName, targetFullPath, microLocation, type) {
    var _a;
    // record old values of microLocation to `from`
    const from = createGuardLocation(appName, microLocation);
    // if is iframeSandbox, microLocation muse be rawLocation of iframe, not proxyLocation
    const newLocation = createURL(targetFullPath, microLocation.href);
    if (isIframeSandbox(appName)) {
        const microAppWindow = appInstanceMap.get(appName).sandBox.microAppWindow;
        (_a = microAppWindow.rawReplaceState) === null || _a === void 0 ? void 0 : _a.call(microAppWindow.history, getMicroState(appName), '', newLocation.href);
    }
    else {
        let targetHref = newLocation.href;
        if (microLocation.self.origin !== newLocation.origin) {
            targetHref = targetHref.replace(newLocation.origin, microLocation.self.origin);
        }
        microLocation.self.href = targetHref;
    }
    /**
     * The native mode also base of history.state, and the modification of the browser url cannot be controlled. It is very likely that the browser url and __MICRO_APP_STATE__ are different.
     * Especially during init of child or forward and backward of browser, because vue-router@4 will actively modify the browser URL, the above situation often occurs
     * To solve this problem, after child app is initialized and responds to the popstateEvent, it is determined whether __MICRO_APP_STATE__ and the browser url are different. If they are different, the browser url will updated to the address of __MICRO_APP_STATE__
     * NOTE:
     *  1. If __MICRO_APP_STATE__ is different from the URL, then the operation of updating the URL is correct, otherwise there will be a problem of inconsistency between the URL and the rendered page
     *  2. When there are multiple child app in native mode, if one of them changes the URL address, the other one will not change __MICRO_APP_STATE__, and refresh browser will cause problems
     */
    const rawLocation = globalEnv.rawWindow.location;
    if (isRouterModeCustom(appName) &&
        (targetFullPath !== rawLocation.pathname + rawLocation.search + rawLocation.hash) &&
        type !== 'prevent') {
        nativeHistoryNavigate(appName, 'replaceState', targetFullPath, globalEnv.rawWindow.history.state);
    }
    // update latest values of microLocation to `to`
    const to = createGuardLocation(appName, microLocation);
    // The hook called only when fullPath changed
    if (type === 'auto' || (from.fullPath !== to.fullPath && type !== 'prevent')) {
        executeNavigationGuard(appName, to, from);
    }
}

/**
 * The router system has two operations: read and write
 * Read through location and write through history & location
 * @param appName app name
 * @param url app url
 * @returns MicroRouter
 */
function createMicroRouter(appName, url) {
    const microLocation = createMicroLocation(appName, url);
    return {
        microLocation,
        microHistory: createMicroHistory(appName, microLocation),
    };
}
/**
 * When the sandbox executes start, or the hidden keep-alive application is re-rendered, the location is updated according to the browser url or attach router info to browser url
 * @param appName app.name
 * @param microLocation MicroLocation for sandbox
 * @param defaultPage default page
 */
function initRouteStateWithURL(appName, microLocation, defaultPage) {
    const microPath = getMicroPathFromURL(appName);
    if (microPath) {
        updateMicroLocation(appName, microPath, microLocation, 'auto');
        if (isRouterModePure(appName)) {
            removePathFromBrowser(appName);
        }
    }
    else {
        updateBrowserURLWithLocation(appName, microLocation, defaultPage);
    }
}
/**
 * initialize browser information according to microLocation
 * Scenes:
 *  1. sandbox.start
 *  2. reshow of keep-alive app
 */
function updateBrowserURLWithLocation(appName, microLocation, defaultPage) {
    // update microLocation with defaultPage
    if (defaultPage)
        updateMicroLocation(appName, defaultPage, microLocation, 'prevent');
    if (!isRouterModePure(appName)) {
        // attach microApp route info to browser URL
        attachRouteToBrowserURL(appName, setMicroPathToURL(appName, microLocation), setMicroState(appName, null, microLocation));
    }
    // trigger guards after change browser URL
    autoTriggerNavigationGuard(appName, microLocation);
}
/**
 * In any case, microPath & microState will be removed from browser, but location will be initialized only when keep-router-state is false
 * @param appName app name
 * @param url app url
 * @param microLocation location of microApp
 * @param keepRouteState keep-router-state is only used to control whether to clear the location of microApp, default is false
 */
function clearRouteStateFromURL(appName, url, microLocation, keepRouteState) {
    // TODO: keep-router-state 功能太弱，是否可以增加优先级，或者去掉
    if (!keepRouteState && !isRouterModeCustom(appName)) {
        const { pathname, search, hash } = createURL(url);
        updateMicroLocation(appName, pathname + search + hash, microLocation, 'prevent');
    }
    if (!isRouterModePure(appName)) {
        removePathFromBrowser(appName);
    }
    clearRouterWhenUnmount(appName);
}
/**
 * remove microState from history.state and remove microPath from browserURL
 * called on sandbox.stop or hidden of keep-alive app
 */
function removePathFromBrowser(appName) {
    attachRouteToBrowserURL(appName, removeMicroPathFromURL(appName), removeMicroState(appName, globalEnv.rawWindow.history.state));
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch
 * Promise<Response> fetch(input[, init])
 * input: string/Request
 * init?: object
 * @param url app url
 * @param target proxy target
 */
function createMicroFetch(url, target) {
    const rawFetch = !isUndefined(target) ? target : globalEnv.rawWindow.fetch;
    if (!isFunction(rawFetch))
        return rawFetch;
    return function microFetch(input, init, ...rests) {
        if (isString(input) || isURL(input)) {
            input = createURL(input, url).toString();
        }
        /**
         * When fetch rewrite by baseApp, domScope still active when exec rawWindow.fetch
         * If baseApp operate dom in fetch, it will cause error
         * The same for XMLHttpRequest, EventSource
         */
        removeDomScope();
        return rawFetch.call(globalEnv.rawWindow, input, init, ...rests);
    };
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
 * @param url app url
 * @param target proxy target
 */
function createMicroXMLHttpRequest(url, target) {
    const rawXMLHttpRequest = !isUndefined(target) ? target : globalEnv.rawWindow.XMLHttpRequest;
    if (!isConstructor(rawXMLHttpRequest))
        return rawXMLHttpRequest;
    return class MicroXMLHttpRequest extends rawXMLHttpRequest {
        open(method, reqUrl, ...rests) {
            if ((isString(reqUrl) && !/^f(ile|tp):\/\//.test(reqUrl)) || isURL(reqUrl)) {
                reqUrl = createURL(reqUrl, url).toString();
            }
            removeDomScope();
            super.open(method, reqUrl, ...rests);
        }
    };
}
function useMicroEventSource() {
    let eventSourceMap;
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/EventSource
     * pc = new EventSource(url[, configuration])
     * url: string/Request
     * configuration?: object
     * @param url app url
     * @param target proxy target
     */
    function createMicroEventSource(appName, url, target) {
        const rawEventSource = !isUndefined(target) ? target : globalEnv.rawWindow.EventSource;
        if (!isConstructor(rawEventSource))
            return rawEventSource;
        return class MicroEventSource extends rawEventSource {
            constructor(eventSourceUrl, eventSourceInitDict, ...rests) {
                if (isString(eventSourceUrl) || isURL(eventSourceUrl)) {
                    eventSourceUrl = createURL(eventSourceUrl, url).toString();
                }
                removeDomScope();
                super(eventSourceUrl, eventSourceInitDict, ...rests);
                if (eventSourceMap) {
                    const eventSourceList = eventSourceMap.get(appName);
                    if (eventSourceList) {
                        eventSourceList.add(this);
                    }
                    else {
                        eventSourceMap.set(appName, new Set([this]));
                    }
                }
                else {
                    eventSourceMap = new Map([[appName, new Set([this])]]);
                }
            }
            close() {
                var _a;
                super.close();
                (_a = eventSourceMap.get(appName)) === null || _a === void 0 ? void 0 : _a.delete(this);
            }
        };
    }
    function clearMicroEventSource(appName) {
        const eventSourceList = eventSourceMap === null || eventSourceMap === void 0 ? void 0 : eventSourceMap.get(appName);
        if (eventSourceList === null || eventSourceList === void 0 ? void 0 : eventSourceList.size) {
            eventSourceList.forEach(item => {
                item.close();
            });
            eventSourceList.clear();
        }
    }
    return {
        createMicroEventSource,
        clearMicroEventSource,
    };
}

const { createMicroEventSource, clearMicroEventSource } = useMicroEventSource();
class WithSandBox extends BaseSandbox {
    constructor(appName, url) {
        super(appName, url);
        this.active = false;
        this.microAppWindow = new CustomWindow(); // Proxy target
        this.patchWith((resolve) => {
            // get scopeProperties and escapeProperties from plugins
            this.getSpecialProperties(appName);
            // create location, history for child app
            this.patchRouter(appName, url, this.microAppWindow);
            // patch window of child app
            this.windowEffect = patchWindow(appName, this.microAppWindow, this);
            // patch document of child app
            this.documentEffect = patchDocument(appName, this.microAppWindow, this);
            // properties associated with the native window
            this.setMappingPropertiesWithRawDescriptor(this.microAppWindow);
            // inject global properties
            this.initStaticGlobalKeys(appName, url, this.microAppWindow);
            resolve();
        });
    }
    /**
     * open sandbox and perform some initial actions
     * @param umdMode is umd mode
     * @param baseroute base route for child
     * @param defaultPage default page when mount child base on virtual router
     * @param disablePatchRequest prevent patchRequestApi
     */
    start({ umdMode, baseroute, defaultPage, disablePatchRequest, }) {
        if (this.active)
            return;
        this.active = true;
        /* --- memory router part --- start */
        // update microLocation, attach route info to browser url
        this.initRouteState(defaultPage);
        // unique listener of popstate event for sub app
        this.removeHistoryListener = addHistoryListener(this.microAppWindow.__MICRO_APP_NAME__);
        if (isRouterModeCustom(this.microAppWindow.__MICRO_APP_NAME__)) {
            this.microAppWindow.__MICRO_APP_BASE_ROUTE__ = this.microAppWindow.__MICRO_APP_BASE_URL__ = baseroute;
        }
        /* --- memory router part --- end */
        /**
         * Target: Ensure default mode action exactly same to first time when render again
         * 1. The following globalKey maybe modified when render, reset them when render again in default mode
         * 2. Umd mode will not delete any keys during sandBox.stop, ignore umd mode
         * 3. When sandbox.start called for the first time, it must be the default mode
         */
        if (!umdMode) {
            this.initGlobalKeysWhenStart(this.microAppWindow.__MICRO_APP_NAME__, this.microAppWindow.__MICRO_APP_URL__, this.microAppWindow, disablePatchRequest);
        }
        if (++globalEnv.activeSandbox === 1) {
            patchElementAndDocument();
            patchHistory();
        }
        if (++WithSandBox.activeCount === 1) {
            // effectDocumentEvent()
            initEnvOfNestedApp();
        }
        fixBabelPolyfill6();
    }
    /**
     * close sandbox and perform some clean up actions
     * @param umdMode is umd mode
     * @param keepRouteState prevent reset route
     * @param destroy completely destroy, delete cache resources
     * @param clearData clear data from base app
     */
    stop({ umdMode, keepRouteState, destroy, clearData, }) {
        var _a;
        if (!this.active)
            return;
        this.recordAndReleaseEffect({ umdMode, clearData, destroy }, !umdMode || destroy);
        /* --- memory router part --- start */
        // rest url and state of browser
        this.clearRouteState(keepRouteState);
        // release listener of popstate for child app
        (_a = this.removeHistoryListener) === null || _a === void 0 ? void 0 : _a.call(this);
        /* --- memory router part --- end */
        /**
         * NOTE:
         *  1. injectedKeys and escapeKeys must be placed at the back
         *  2. if key in initial microAppWindow, and then rewrite, this key will be delete from microAppWindow when stop, and lost when restart
         *  3. umd mode will not delete global keys
         *  4. mount & unmount hook should delete in default mode when stop
         */
        if (!umdMode || destroy) {
            clearMicroEventSource(this.microAppWindow.__MICRO_APP_NAME__);
            this.injectedKeys.forEach((key) => {
                Reflect.deleteProperty(this.microAppWindow, key);
            });
            this.injectedKeys.clear();
            this.escapeKeys.forEach((key) => {
                Reflect.deleteProperty(globalEnv.rawWindow, key);
            });
            this.escapeKeys.clear();
            this.clearHijackUmdHooks();
        }
        if (--globalEnv.activeSandbox === 0) {
            releasePatchElementAndDocument();
            releasePatchHistory();
        }
        if (--WithSandBox.activeCount === 0) ;
        this.active = false;
    }
    /**
     * inject global properties to microAppWindow
     * TODO: 设置为只读变量
     * @param appName app name
     * @param url app url
     * @param microAppWindow micro window
     */
    initStaticGlobalKeys(appName, url, microAppWindow) {
        microAppWindow.__MICRO_APP_ENVIRONMENT__ = true;
        microAppWindow.__MICRO_APP_NAME__ = appName;
        microAppWindow.__MICRO_APP_URL__ = url;
        microAppWindow.__MICRO_APP_PUBLIC_PATH__ = getEffectivePath(url);
        microAppWindow.__MICRO_APP_BASE_ROUTE__ = '';
        microAppWindow.__MICRO_APP_WINDOW__ = microAppWindow;
        microAppWindow.__MICRO_APP_PRE_RENDER__ = false;
        microAppWindow.__MICRO_APP_UMD_MODE__ = false;
        microAppWindow.__MICRO_APP_PROXY_WINDOW__ = this.proxyWindow;
        microAppWindow.__MICRO_APP_SANDBOX__ = this;
        microAppWindow.__MICRO_APP_SANDBOX_TYPE__ = 'with';
        microAppWindow.rawWindow = globalEnv.rawWindow;
        microAppWindow.rawDocument = globalEnv.rawDocument;
        microAppWindow.microApp = assign(new EventCenterForMicroApp(appName), {
            removeDomScope,
            pureCreateElement,
            location: microAppWindow.location,
            router,
        });
    }
    /**
     * Record global effect and then release (effect: global event, timeout, data listener)
     * Scenes:
     * 1. unmount of default/umd app
     * 2. hidden keep-alive app
     * 3. after init prerender app
     * @param options {
     *  @param clearData clear data from base app
     *  @param isPrerender is prerender app
     *  @param keepAlive is keep-alive app
     * }
     * @param preventRecord prevent record effect events
     */
    recordAndReleaseEffect(options, preventRecord = false) {
        if (preventRecord) {
            this.resetEffectSnapshot();
        }
        else {
            this.recordEffectSnapshot();
        }
        this.releaseGlobalEffect(options);
    }
    /**
     * reset effect snapshot data in default mode or destroy
     * Scenes:
     *  1. unmount hidden keep-alive app manually
     *  2. unmount prerender app manually
     */
    resetEffectSnapshot() {
        this.windowEffect.reset();
        this.documentEffect.reset();
        resetDataCenterSnapshot(this.microAppWindow.microApp);
    }
    /**
     * record umd snapshot before the first execution of umdHookMount
     * Scenes:
     * 1. exec umdMountHook in umd mode
     * 2. hidden keep-alive app
     * 3. after init prerender app
     */
    recordEffectSnapshot() {
        this.windowEffect.record();
        this.documentEffect.record();
        recordDataCenterSnapshot(this.microAppWindow.microApp);
    }
    // rebuild umd snapshot before remount umd app
    rebuildEffectSnapshot() {
        this.windowEffect.rebuild();
        this.documentEffect.rebuild();
        rebuildDataCenterSnapshot(this.microAppWindow.microApp);
    }
    /**
     * clear global event, timeout, data listener
     * Scenes:
     * 1. unmount of default/umd app
     * 2. hidden keep-alive app
     * 3. after init prerender app
     * @param umdMode is umd mode
     * @param clearData clear data from base app
     * @param isPrerender is prerender app
     * @param keepAlive is keep-alive app
     * @param destroy completely destroy
     */
    releaseGlobalEffect({ umdMode = false, clearData = false, isPrerender = false, keepAlive = false, destroy = false, }) {
        var _a, _b, _c;
        // default mode(not keep-alive or isPrerender)
        this.windowEffect.release((!umdMode && !keepAlive && !isPrerender) || destroy);
        this.documentEffect.release();
        (_a = this.microAppWindow.microApp) === null || _a === void 0 ? void 0 : _a.clearDataListener();
        (_b = this.microAppWindow.microApp) === null || _b === void 0 ? void 0 : _b.clearGlobalDataListener();
        if (clearData) {
            microApp.clearData(this.microAppWindow.__MICRO_APP_NAME__);
            (_c = this.microAppWindow.microApp) === null || _c === void 0 ? void 0 : _c.clearData();
        }
    }
    /**
     * get scopeProperties and escapeProperties from plugins & adapter
     * @param appName app name
     */
    getSpecialProperties(appName) {
        var _a;
        if (isPlainObject(microApp.options.plugins)) {
            this.commonActionForSpecialProperties(microApp.options.plugins.global);
            this.commonActionForSpecialProperties((_a = microApp.options.plugins.modules) === null || _a === void 0 ? void 0 : _a[appName]);
        }
    }
    // common action for global plugins and module plugins
    commonActionForSpecialProperties(plugins) {
        if (isArray(plugins)) {
            for (const plugin of plugins) {
                if (isPlainObject(plugin)) {
                    if (isArray(plugin.scopeProperties)) {
                        this.scopeProperties = this.scopeProperties.concat(plugin.scopeProperties);
                    }
                    if (isArray(plugin.escapeProperties)) {
                        this.escapeProperties = this.escapeProperties.concat(plugin.escapeProperties);
                    }
                }
            }
        }
    }
    // set __MICRO_APP_PRE_RENDER__ state
    setPreRenderState(state) {
        this.microAppWindow.__MICRO_APP_PRE_RENDER__ = state;
    }
    markUmdMode(state) {
        this.microAppWindow.__MICRO_APP_UMD_MODE__ = state;
    }
    patchWith(cb) {
        this.sandboxReady = new Promise((resolve) => cb(resolve));
    }
    // properties associated with the native window
    setMappingPropertiesWithRawDescriptor(microAppWindow) {
        let topValue, parentValue;
        const rawWindow = globalEnv.rawWindow;
        if (rawWindow === rawWindow.parent) { // not in iframe
            topValue = parentValue = this.proxyWindow;
        }
        else { // in iframe
            topValue = rawWindow.top;
            parentValue = rawWindow.parent;
        }
        rawDefineProperties(microAppWindow, {
            top: this.createDescriptorForMicroAppWindow('top', topValue),
            parent: this.createDescriptorForMicroAppWindow('parent', parentValue),
        });
        GLOBAL_KEY_TO_WINDOW.forEach((key) => {
            rawDefineProperty(microAppWindow, key, this.createDescriptorForMicroAppWindow(key, this.proxyWindow));
        });
    }
    createDescriptorForMicroAppWindow(key, value) {
        const { configurable = true, enumerable = true, writable, set } = Object.getOwnPropertyDescriptor(globalEnv.rawWindow, key) || { writable: true };
        const descriptor = {
            value,
            configurable,
            enumerable,
            writable: writable !== null && writable !== void 0 ? writable : !!set
        };
        return descriptor;
    }
    /**
     * init global properties of microAppWindow when exec sandBox.start
     * @param microAppWindow micro window
     * @param appName app name
     * @param url app url
     * @param disablePatchRequest prevent rewrite request method of child app
     */
    initGlobalKeysWhenStart(appName, url, microAppWindow, disablePatchRequest) {
        microAppWindow.hasOwnProperty = (key) => rawHasOwnProperty.call(microAppWindow, key) || rawHasOwnProperty.call(globalEnv.rawWindow, key);
        this.setHijackProperty(appName, microAppWindow);
        if (!disablePatchRequest)
            this.patchRequestApi(appName, url, microAppWindow);
        this.setScopeProperties(microAppWindow);
    }
    // set hijack Properties to microAppWindow
    setHijackProperty(appName, microAppWindow) {
        let modifiedEval, modifiedImage;
        rawDefineProperties(microAppWindow, {
            eval: {
                configurable: true,
                enumerable: false,
                get() {
                    throttleDeferForSetAppName(appName);
                    return modifiedEval || globalEnv.rawWindow.eval;
                },
                set: (value) => {
                    modifiedEval = value;
                },
            },
            Image: {
                configurable: true,
                enumerable: false,
                get() {
                    throttleDeferForSetAppName(appName);
                    return modifiedImage || globalEnv.ImageProxy;
                },
                set: (value) => {
                    modifiedImage = value;
                },
            },
        });
    }
    // rewrite fetch, XMLHttpRequest, EventSource
    patchRequestApi(appName, url, microAppWindow) {
        let microFetch = createMicroFetch(url);
        let microXMLHttpRequest = createMicroXMLHttpRequest(url);
        let microEventSource = createMicroEventSource(appName, url);
        rawDefineProperties(microAppWindow, {
            fetch: {
                configurable: true,
                enumerable: true,
                get() {
                    return microFetch;
                },
                set(value) {
                    microFetch = createMicroFetch(url, value);
                },
            },
            XMLHttpRequest: {
                configurable: true,
                enumerable: true,
                get() {
                    return microXMLHttpRequest;
                },
                set(value) {
                    microXMLHttpRequest = createMicroXMLHttpRequest(url, value);
                },
            },
            EventSource: {
                configurable: true,
                enumerable: true,
                get() {
                    return microEventSource;
                },
                set(value) {
                    microEventSource = createMicroEventSource(appName, url, value);
                },
            },
        });
    }
    /**
     * Init scope keys to microAppWindow, prevent fall to rawWindow from with(microAppWindow)
     * like: if (!xxx) {}
     * NOTE:
     * 1. Symbol.unscopables cannot affect undefined keys
     * 2. Doesn't use for window.xxx because it fall to proxyWindow
     */
    setScopeProperties(microAppWindow) {
        this.scopeProperties.forEach((key) => {
            Reflect.set(microAppWindow, key, microAppWindow[key]);
        });
    }
    // set location & history for memory router
    patchRouter(appName, url, microAppWindow) {
        const { microLocation, microHistory } = createMicroRouter(appName, url);
        rawDefineProperties(microAppWindow, {
            location: {
                configurable: false,
                enumerable: true,
                get() {
                    return microLocation;
                },
                set: (value) => {
                    globalEnv.rawWindow.location = value;
                },
            },
            history: {
                configurable: true,
                enumerable: true,
                get() {
                    return microHistory;
                },
            },
        });
    }
    initRouteState(defaultPage) {
        initRouteStateWithURL(this.microAppWindow.__MICRO_APP_NAME__, this.microAppWindow.location, defaultPage);
    }
    clearRouteState(keepRouteState) {
        clearRouteStateFromURL(this.microAppWindow.__MICRO_APP_NAME__, this.microAppWindow.__MICRO_APP_URL__, this.microAppWindow.location, keepRouteState);
    }
    setRouteInfoForKeepAliveApp() {
        updateBrowserURLWithLocation(this.microAppWindow.__MICRO_APP_NAME__, this.microAppWindow.location);
    }
    removeRouteInfoForKeepAliveApp() {
        removePathFromBrowser(this.microAppWindow.__MICRO_APP_NAME__);
    }
    /**
     * Format all html elements when init
     * @param container micro app container
     */
    patchStaticElement(container) {
        patchElementTree(container, this.microAppWindow.__MICRO_APP_NAME__);
    }
    /**
     * action before exec scripts when mount
     * Actions:
     * 1. patch static elements from html
     * 2. hijack umd hooks -- mount, unmount, micro-app-appName
     * @param container micro app container
     */
    actionsBeforeExecScripts(container, handleUmdHooks) {
        this.patchStaticElement(container);
        this.clearHijackUmdHooks = this.hijackUmdHooks(this.appName, this.microAppWindow, handleUmdHooks);
    }
    // hijack mount, unmount, micro-app-appName hook to microAppWindow
    hijackUmdHooks(appName, microAppWindow, handleUmdHooks) {
        let mount, unmount, microAppLibrary;
        rawDefineProperties(microAppWindow, {
            mount: {
                configurable: true,
                get: () => mount,
                set: (value) => {
                    if (this.active && isFunction(value) && !mount) {
                        handleUmdHooks(mount = value, unmount);
                    }
                }
            },
            unmount: {
                configurable: true,
                get: () => unmount,
                set: (value) => {
                    if (this.active && isFunction(value) && !unmount) {
                        handleUmdHooks(mount, unmount = value);
                    }
                }
            },
            [`micro-app-${appName}`]: {
                configurable: true,
                get: () => microAppLibrary,
                set: (value) => {
                    if (this.active && isPlainObject(value) && !microAppLibrary) {
                        microAppLibrary = value;
                        handleUmdHooks(microAppLibrary.mount, microAppLibrary.unmount);
                    }
                }
            }
        });
        return () => {
            mount = unmount = microAppLibrary = null;
        };
    }
    setStaticAppState(state) {
        this.microAppWindow.__MICRO_APP_STATE__ = state;
    }
}
WithSandBox.activeCount = 0; // number of active sandbox

function patchRouter(appName, url, microAppWindow, browserHost) {
    const rawHistory = globalEnv.rawWindow.history;
    const childStaticLocation = createURL(url);
    const childHost = childStaticLocation.protocol + '//' + childStaticLocation.host;
    const childFullPath = childStaticLocation.pathname + childStaticLocation.search + childStaticLocation.hash;
    // rewrite microAppWindow.history
    const microHistory = microAppWindow.history;
    // save history.replaceState, it will be used in updateMicroLocation
    microAppWindow.rawReplaceState = microHistory.replaceState;
    // rewrite microAppWindow.history
    assign(microHistory, createMicroHistory(appName, microAppWindow.location));
    // scrollRestoration proxy to rawHistory
    rawDefineProperties(microHistory, {
        scrollRestoration: {
            configurable: true,
            enumerable: true,
            get() {
                return rawHistory.scrollRestoration;
            },
            set(value) {
                rawHistory.scrollRestoration = value;
            }
        }
    });
    /**
     * Init microLocation before exec sandbox.start
     * NOTE:
     *  1. exec updateMicroLocation after patch microHistory
     *  2. sandbox.start will sync microLocation info to browser url
     */
    updateMicroLocation(appName, childFullPath, microAppWindow.location, 'prevent');
    // create proxyLocation
    return createMicroLocation(appName, url, microAppWindow, childStaticLocation, browserHost, childHost);
}

const UN_PROXY_INSTANCEOF_KEYS = [
    'Array'
];
const escape2RawWindowKeys = [
    'getComputedStyle',
    // FIX ISSUE: https://github.com/micro-zoe/micro-app/issues/1292
    'DOMParser',
    'visualViewport',
    'matchMedia',
    'ResizeObserver',
    'IntersectionObserver',
];
const escape2RawWindowRegExpKeys = [
    /animationFrame$/i,
    /mutationObserver$/i,
    /height$|width$/i,
    /offset$/i,
    /selection$/i,
    /^range/i,
    /^screen/i,
    /^scroll/i,
    /X$|Y$/,
];
const uniqueDocumentElement = [
    'body',
    'head',
    'html',
    'title',
];
// proxy to shadowRoot or rawDocument (property)
const proxy2RawDocOrShadowKeys = [
    'childElementCount',
    'children',
    'firstElementChild',
    'firstChild',
    'lastElementChild',
    'activeElement',
    'fullscreenElement',
    'pictureInPictureElement',
    'pointerLockElement',
    'styleSheets',
];
// proxy to shadowRoot or rawDocument (method)
const proxy2RawDocOrShadowMethods = [
    'append',
    'contains',
    'replaceChildren',
    'createRange',
    'getSelection',
    'elementFromPoint',
    'elementsFromPoint',
    'getAnimations',
];
// proxy to rawDocument (property)
const proxy2RawDocumentKeys = [
    'characterSet',
    'compatMode',
    'contentType',
    'designMode',
    'dir',
    'doctype',
    'embeds',
    'fullscreenEnabled',
    'hidden',
    'implementation',
    'lastModified',
    'pictureInPictureEnabled',
    'plugins',
    'readyState',
    'referrer',
    'visibilityState',
    'fonts',
];
// proxy to rawDocument (method)
const proxy2RawDocumentMethods = [
    'execCommand',
    'createRange',
    'exitFullscreen',
    'exitPictureInPicture',
    'getElementsByTagNameNS',
    'hasFocus',
    'prepend',
];

// 重写 Worker 构造函数的类型
const originalWorker = window.Worker;
function isSameOrigin(url) {
    if (url instanceof URL && url.protocol === 'blob:') {
        // 如果 url 是 Blob URL，直接返回 true
        return true;
    }
    // 检查 URL 是否与当前页面在同一个源
    try {
        const parsedUrl = new URL(url);
        return (parsedUrl.protocol === window.location.protocol &&
            parsedUrl.hostname === window.location.hostname &&
            parsedUrl.port === window.location.port);
    }
    catch (error) {
        return false;
    }
}
function urlFromScript(script) {
    let blob;
    try {
        blob = new Blob([script], {
            type: 'application/javascript'
        });
    }
    catch (e) {
        const BlobBuilder = 
        // @ts-ignore
        window.BlobBuilder ||
            // @ts-ignore
            window.WebKitBlobBuilder ||
            // @ts-ignore
            window.MozBlobBuilder ||
            // @ts-ignore
            window.MSBlobBuilder;
        const blobBuilder = new BlobBuilder();
        blobBuilder.append(script);
        blob = blobBuilder.getBlob('application/javascript');
    }
    const URL = window.URL || window.webkitURL;
    return URL.createObjectURL(blob);
}
// @ts-ignore
const WorkerProxy = new Proxy(originalWorker, {
    construct(Target, args) {
        let [scriptURL, options] = args;
        options = options || {};
        const appName = getCurrentAppName();
        let url = scriptURL;
        if (appName) {
            const app = appInstanceMap.get(appName);
            url = CompletionPath(scriptURL, app.url);
        }
        if (url && !isSameOrigin(url)) {
            // 如果 scriptURL 是跨域的，使用 Blob URL 加载并执行 worker
            const script = `import "${scriptURL}";`;
            const workerPath = urlFromScript(script);
            options.type = 'module';
            return new Target(workerPath, options);
        }
        else {
            // 如果 scriptURL 是同源的，直接使用原生的 Worker 构造函数
            return new Target(scriptURL, options);
        }
    },
});

/**
 * patch window of child app
 * @param appName app name
 * @param microAppWindow microWindow of child app
 * @param sandbox WithSandBox
 * @returns EffectHook
 */
function patchWindow$1(appName, microAppWindow, sandbox) {
    patchWindowProperty$1(appName, microAppWindow, sandbox);
    createProxyWindow$1(microAppWindow, sandbox);
    return patchWindowEffect$1(microAppWindow);
}
/**
 * rewrite special properties of window
 * @param appName app name
 * @param microAppWindow child app microWindow
 */
function patchWindowProperty$1(appName, microAppWindow, sandbox) {
    const rawWindow = globalEnv.rawWindow;
    escape2RawWindowKeys.forEach((key) => {
        microAppWindow[key] = bindFunctionToRawTarget(rawWindow[key], rawWindow);
    });
    Object.getOwnPropertyNames(microAppWindow)
        .filter((key) => {
        escape2RawWindowRegExpKeys.some((reg) => {
            if (reg.test(key) && key in microAppWindow.parent) {
                if (isFunction(rawWindow[key])) {
                    microAppWindow[key] = bindFunctionToRawTarget(rawWindow[key], rawWindow);
                }
                else {
                    const { configurable, enumerable } = Object.getOwnPropertyDescriptor(microAppWindow, key) || {
                        configurable: true,
                        enumerable: true,
                    };
                    if (configurable) {
                        rawDefineProperty(microAppWindow, key, {
                            configurable,
                            enumerable,
                            get: () => rawWindow[key],
                            set: (value) => { rawWindow[key] = value; },
                        });
                    }
                }
                return true;
            }
            return false;
        });
        /**
         * In FireFox, iframe Element.prototype will point to native Element.prototype after insert to document
         * Rewrite all constructor's Symbol.hasInstance of iframeWindow
         * NOTE:
         *  1. native event instanceof iframe window.Event
         *  2. native node instanceof iframe window.Node
         *  3. native element instanceof iframe window.Element
         *  4. native url instanceof iframe window.URL
         *  ...
         */
        if (isConstructor(microAppWindow[key]) && key in rawWindow && !UN_PROXY_INSTANCEOF_KEYS.includes(key)) {
            rawDefineProperty(microAppWindow[key], Symbol.hasInstance, {
                configurable: true,
                enumerable: false,
                value(target) {
                    return instanceOf(target, rawWindow[key]) || instanceOf(target, microAppWindow[key]);
                },
            });
        }
        return /^on/.test(key) && !SCOPE_WINDOW_ON_EVENT_OF_IFRAME.includes(key);
    })
        .forEach((eventName) => {
        const { enumerable, writable, set } = Object.getOwnPropertyDescriptor(microAppWindow, eventName) || {
            enumerable: true,
            writable: true,
        };
        try {
            rawDefineProperty(microAppWindow, eventName, {
                enumerable,
                configurable: true,
                get: () => rawWindow[eventName],
                set: (writable !== null && writable !== void 0 ? writable : !!set) ? (value) => { rawWindow[eventName] = isFunction(value) ? value.bind(microAppWindow) : value; }
                    : undefined,
            });
        }
        catch (e) {
            logWarn(e, appName);
        }
    });
    /**
     * In esmodule(vite) proxyWindow will not take effect,
     * escapeProperties should define to microAppWindow
     */
    sandbox.escapeProperties.forEach((key) => {
        let rawValue = microAppWindow[key];
        rawDefineProperty(microAppWindow, key, {
            enumerable: true,
            configurable: true,
            get() {
                return rawValue !== null && rawValue !== void 0 ? rawValue : bindFunctionToRawTarget(rawWindow[key], rawWindow);
            },
            set(value) {
                rawValue = value;
            }
        });
    });
}
/**
 * create proxyWindow with Proxy(microAppWindow)
 * @param microAppWindow micro app window
 * @param sandbox IframeSandbox
 */
function createProxyWindow$1(microAppWindow, sandbox) {
    const rawWindow = globalEnv.rawWindow;
    const customProperties = new Set();
    Object.defineProperty(microAppWindow, 'Worker', {
        value: WorkerProxy,
        configurable: true,
        writable: true,
    });
    /**
     * proxyWindow will only take effect in certain scenes, such as window.key
     * e.g:
     *  1. window.key in normal app --> fall into proxyWindow
     *  2. window.key in module app(vite), fall into microAppWindow(iframeWindow)
     *  3. if (key)... --> fall into microAppWindow(iframeWindow)
     */
    const proxyWindow = new Proxy(microAppWindow, {
        get: (target, key) => {
            if (key === 'Worker') {
                return WorkerProxy;
            }
            if (key === 'location') {
                return sandbox.proxyLocation;
            }
            if (includes(GLOBAL_KEY_TO_WINDOW, key)) {
                return proxyWindow;
            }
            if (customProperties.has(key)) {
                return Reflect.get(target, key);
            }
            /**
             * Same as proxyWindow, escapeProperties will only take effect in certain scenes
             * e.g:
             *  1. window.key in normal app --> fall into proxyWindow, escapeProperties will effect
             *  2. window.key in module app(vite), fall into microAppWindow(iframeWindow), escapeProperties will not take effect
             *  3. if (key)... --> fall into microAppWindow(iframeWindow), escapeProperties will not take effect
             */
            if (includes(sandbox.escapeProperties, key) && !Reflect.get(target, key)) {
                return bindFunctionToRawTarget(Reflect.get(rawWindow, key), rawWindow);
            }
            return bindFunctionToRawTarget(Reflect.get(target, key), target);
        },
        set: (target, key, value) => {
            if (key === 'location') {
                return Reflect.set(rawWindow, key, value);
            }
            if (!Reflect.has(target, key)) {
                customProperties.add(key);
            }
            // sandbox.escapeProperties will not set to rawWindow from rc.9
            Reflect.set(target, key, value);
            return true;
        },
        has: (target, key) => key in target,
        deleteProperty: (target, key) => {
            if (Reflect.has(target, key)) {
                return Reflect.deleteProperty(target, key);
            }
            return true;
        },
    });
    sandbox.proxyWindow = proxyWindow;
}
function patchWindowEffect$1(microAppWindow) {
    const { rawWindow, rawAddEventListener, rawRemoveEventListener, rawDispatchEvent } = globalEnv;
    const eventListenerMap = new Map();
    const sstEventListenerMap = new Map();
    function getEventTarget(type) {
        /**
         * TODO: SCOPE_WINDOW_EVENT_OF_IFRAME的事件非常少，有可能导致问题
         *  1、一些未知的需要绑定到iframe的事件被错误的绑定到原生window上
         */
        return SCOPE_WINDOW_EVENT_OF_IFRAME.includes(type) ? microAppWindow : rawWindow;
    }
    // TODO: listener 是否需要绑定microAppWindow，否则函数中的this指向原生window
    microAppWindow.addEventListener = function (type, listener, options) {
        const listenerList = eventListenerMap.get(type);
        if (listenerList) {
            listenerList.add(listener);
        }
        else {
            eventListenerMap.set(type, new Set([listener]));
        }
        listener && (listener.__MICRO_APP_MARK_OPTIONS__ = options);
        rawAddEventListener.call(getEventTarget(type), type, listener, options);
    };
    microAppWindow.removeEventListener = function (type, listener, options) {
        const listenerList = eventListenerMap.get(type);
        if ((listenerList === null || listenerList === void 0 ? void 0 : listenerList.size) && listenerList.has(listener)) {
            listenerList.delete(listener);
        }
        rawRemoveEventListener.call(getEventTarget(type), type, listener, options);
    };
    microAppWindow.dispatchEvent = function (event) {
        return rawDispatchEvent.call(getEventTarget(event === null || event === void 0 ? void 0 : event.type), event);
    };
    const reset = () => {
        sstEventListenerMap.clear();
    };
    /**
     * NOTE:
     *  1. about timer(events & properties should record & rebuild at all modes, exclude default mode)
     *  2. record maybe call twice when unmount prerender, keep-alive app manually with umd mode
     * 4 modes: default-mode、umd-mode、prerender、keep-alive
     * Solution:
     *  1. default-mode(normal): clear events & timers, not record & rebuild anything
     *  2. umd-mode(normal): not clear timers, record & rebuild events
     *  3. prerender/keep-alive(default, umd): not clear timers, record & rebuild events
     *
     * TODO: 现在的 清除、记录和恢复操作分散的太零散，sandbox、create_app中都有分散，将代码再优化一下，集中处理
     */
    const record = () => {
        // record window event
        eventListenerMap.forEach((listenerList, type) => {
            if (listenerList.size) {
                const cacheList = sstEventListenerMap.get(type) || [];
                sstEventListenerMap.set(type, new Set([...cacheList, ...listenerList]));
            }
        });
    };
    // rebuild event and timer before remount app
    const rebuild = () => {
        // rebuild window event
        sstEventListenerMap.forEach((listenerList, type) => {
            for (const listener of listenerList) {
                microAppWindow.addEventListener(type, listener, listener === null || listener === void 0 ? void 0 : listener.__MICRO_APP_MARK_OPTIONS__);
            }
        });
        reset();
    };
    const release = () => {
        // Clear window binding events
        if (eventListenerMap.size) {
            eventListenerMap.forEach((listenerList, type) => {
                for (const listener of listenerList) {
                    rawRemoveEventListener.call(getEventTarget(type), type, listener);
                }
            });
            eventListenerMap.clear();
        }
    };
    return {
        reset,
        record,
        rebuild,
        release,
    };
}

/**
 * TODO: 1、shadowDOM 2、结构优化
 *
 * patch document of child app
 * @param appName app name
 * @param microAppWindow microWindow of child app
 * @param sandbox IframeSandbox
 * @returns EffectHook
 */
function patchDocument$1(appName, microAppWindow, sandbox) {
    patchDocumentPrototype(appName, microAppWindow);
    patchDocumentProperty(appName, microAppWindow, sandbox);
    return patchDocumentEffect(appName, microAppWindow);
}
function patchDocumentPrototype(appName, microAppWindow) {
    const rawDocument = globalEnv.rawDocument;
    const microRootDocument = microAppWindow.Document;
    const microDocument = microAppWindow.document;
    const rawMicroCreateElement = microRootDocument.prototype.createElement;
    const rawMicroCreateElementNS = microRootDocument.prototype.createElementNS;
    const rawMicroCreateTextNode = microRootDocument.prototype.createTextNode;
    const rawMicroCreateDocumentFragment = microRootDocument.prototype.createDocumentFragment;
    const rawMicroCreateComment = microRootDocument.prototype.createComment;
    const rawMicroQuerySelector = microRootDocument.prototype.querySelector;
    const rawMicroQuerySelectorAll = microRootDocument.prototype.querySelectorAll;
    const rawMicroGetElementById = microRootDocument.prototype.getElementById;
    const rawMicroGetElementsByClassName = microRootDocument.prototype.getElementsByClassName;
    const rawMicroGetElementsByTagName = microRootDocument.prototype.getElementsByTagName;
    const rawMicroGetElementsByName = microRootDocument.prototype.getElementsByName;
    const rawMicroElementFromPoint = microRootDocument.prototype.elementFromPoint;
    const rawMicroCaretRangeFromPoint = microRootDocument.prototype.caretRangeFromPoint;
    microRootDocument.prototype.caretRangeFromPoint = function caretRangeFromPoint(x, y) {
        // 这里this指向document才可以获取到子应用的document实例，range才可以被成功生成
        const element = rawMicroElementFromPoint.call(rawDocument, x, y);
        const range = rawMicroCaretRangeFromPoint.call(rawDocument, x, y);
        updateElementInfo(element, appName);
        return range;
    };
    microRootDocument.prototype.createElement = function createElement(tagName, options) {
        let element = rawMicroCreateElement.call(this, tagName, options);
        if (isWebComponentElement(element)) {
            element = rawMicroCreateElement.call(rawDocument, tagName, options);
        }
        return updateElementInfo(element, appName);
    };
    microRootDocument.prototype.createElementNS = function createElementNS(namespaceURI, name, options) {
        const element = rawMicroCreateElementNS.call(this, namespaceURI, name, options);
        return updateElementInfo(element, appName);
    };
    microRootDocument.prototype.createTextNode = function createTextNode(data) {
        const element = rawMicroCreateTextNode.call(this, data);
        return updateElementInfo(element, appName);
    };
    microRootDocument.prototype.createDocumentFragment = function createDocumentFragment() {
        const element = rawMicroCreateDocumentFragment.call(this);
        return updateElementInfo(element, appName);
    };
    microRootDocument.prototype.createComment = function createComment(data) {
        const element = rawMicroCreateComment.call(this, data);
        return updateElementInfo(element, appName);
    };
    function getBindTarget(target) {
        /**
         * handler for:
         *  1. document.getElementsByTagName('head')[0].querySelector('script')
         *  2. document.querySelector('body').querySelectorAll('script')
         *  ...
         */
        throttleDeferForIframeAppName(appName);
        // DOMParser.document !== microDocument
        return microDocument === target ? rawDocument : target;
    }
    // query element👇
    function querySelector(selectors) {
        var _a;
        const _this = getBindTarget(this);
        if (!selectors ||
            isUniqueElement(selectors) ||
            rawDocument !== _this) {
            return rawMicroQuerySelector.call(_this, selectors);
        }
        /**
         * The child app cannot query the base element inside iframe
         * Same for querySelectorAll
         *
         * Scenes:
         *  1. vue-router@4.x --> createWebHistory(base?: string)
         *    const baseEl = document.querySelector('base')
         *    base = (baseEl && baseEl.getAttribute('href')) || '/'
         *
         * Issue: https://github.com/micro-zoe/micro-app/issues/1335
         */
        const result = (_a = appInstanceMap.get(appName)) === null || _a === void 0 ? void 0 : _a.querySelector(selectors);
        return result || selectors === 'base' ? result : rawMicroQuerySelector.call(microDocument, selectors);
    }
    function querySelectorAll(selectors) {
        var _a, _b;
        const _this = getBindTarget(this);
        if (!selectors ||
            isUniqueElement(selectors) ||
            rawDocument !== _this) {
            return rawMicroQuerySelectorAll.call(_this, selectors);
        }
        const result = (_b = (_a = appInstanceMap.get(appName)) === null || _a === void 0 ? void 0 : _a.querySelectorAll(selectors)) !== null && _b !== void 0 ? _b : [];
        return result.length || selectors === 'base' ? result : rawMicroQuerySelectorAll.call(microDocument, selectors);
    }
    microRootDocument.prototype.querySelector = querySelector;
    microRootDocument.prototype.querySelectorAll = querySelectorAll;
    microRootDocument.prototype.getElementById = function getElementById(key) {
        const _this = getBindTarget(this);
        if (isInvalidQuerySelectorKey(key)) {
            return rawMicroGetElementById.call(_this, key);
        }
        try {
            return querySelector.call(this, `#${key}`);
        }
        catch (_a) {
            return rawMicroGetElementById.call(_this, key);
        }
    };
    microRootDocument.prototype.getElementsByClassName = function getElementsByClassName(key) {
        const _this = getBindTarget(this);
        if (isInvalidQuerySelectorKey(key)) {
            return rawMicroGetElementsByClassName.call(_this, key);
        }
        try {
            return querySelectorAll.call(this, `.${key}`);
        }
        catch (_a) {
            return rawMicroGetElementsByClassName.call(_this, key);
        }
    };
    microRootDocument.prototype.getElementsByTagName = function getElementsByTagName(key) {
        const _this = getBindTarget(this);
        if (isUniqueElement(key) ||
            isInvalidQuerySelectorKey(key)) {
            return rawMicroGetElementsByTagName.call(_this, key);
            // just script, not base
        }
        else if (/^script$/i.test(key)) {
            return rawMicroGetElementsByTagName.call(microDocument, key);
        }
        try {
            return querySelectorAll.call(this, key);
        }
        catch (_a) {
            return rawMicroGetElementsByTagName.call(_this, key);
        }
    };
    microRootDocument.prototype.getElementsByName = function getElementsByName(key) {
        const _this = getBindTarget(this);
        if (isInvalidQuerySelectorKey(key)) {
            return rawMicroGetElementsByName.call(_this, key);
        }
        try {
            return querySelectorAll.call(this, `[name=${key}]`);
        }
        catch (_a) {
            return rawMicroGetElementsByName.call(_this, key);
        }
    };
}
function patchDocumentProperty(appName, microAppWindow, sandbox) {
    const rawDocument = globalEnv.rawDocument;
    const microRootDocument = microAppWindow.Document;
    const microDocument = microAppWindow.document;
    const getCommonDescriptor = (key, getter) => {
        const { enumerable } = Object.getOwnPropertyDescriptor(microRootDocument.prototype, key) || {
            enumerable: true,
        };
        return {
            configurable: true,
            enumerable,
            get: getter,
        };
    };
    const createDescriptors = () => {
        const result = {};
        const descList = [
            // if disable-memory-router or router-mode='disable', href point to base app
            ['documentURI', () => sandbox.proxyLocation.href],
            ['URL', () => sandbox.proxyLocation.href],
            ['documentElement', () => rawDocument.documentElement],
            ['scrollingElement', () => rawDocument.scrollingElement],
            ['forms', () => microRootDocument.prototype.querySelectorAll.call(microDocument, 'form')],
            ['images', () => microRootDocument.prototype.querySelectorAll.call(microDocument, 'img')],
            ['links', () => microRootDocument.prototype.querySelectorAll.call(microDocument, 'a')],
            // unique keys of micro-app
            ['microAppElement', () => { var _a; return (_a = appInstanceMap.get(appName)) === null || _a === void 0 ? void 0 : _a.container; }],
            ['__MICRO_APP_NAME__', () => appName],
        ];
        descList.forEach((desc) => {
            result[desc[0]] = getCommonDescriptor(desc[0], desc[1]);
        });
        // TODO: shadowDOM
        proxy2RawDocOrShadowKeys.forEach((key) => {
            result[key] = getCommonDescriptor(key, () => rawDocument[key]);
        });
        // TODO: shadowDOM
        proxy2RawDocOrShadowMethods.forEach((key) => {
            result[key] = getCommonDescriptor(key, () => bindFunctionToRawTarget(rawDocument[key], rawDocument, 'DOCUMENT'));
        });
        proxy2RawDocumentKeys.forEach((key) => {
            result[key] = getCommonDescriptor(key, () => rawDocument[key]);
        });
        proxy2RawDocumentMethods.forEach((key) => {
            result[key] = getCommonDescriptor(key, () => bindFunctionToRawTarget(rawDocument[key], rawDocument, 'DOCUMENT'));
        });
        return result;
    };
    rawDefineProperties(microRootDocument.prototype, createDescriptors());
    // head, body, html, title
    uniqueDocumentElement.forEach((tagName) => {
        rawDefineProperty(microDocument, tagName, {
            enumerable: true,
            configurable: true,
            get: () => {
                throttleDeferForIframeAppName(appName);
                return rawDocument[tagName];
            },
            set: (value) => { rawDocument[tagName] = value; },
        });
    });
}
function patchDocumentEffect(appName, microAppWindow) {
    const { rawDocument, rawAddEventListener, rawRemoveEventListener, rawDispatchEvent } = globalEnv;
    const eventListenerMap = new Map();
    const sstEventListenerMap = new Map();
    let onClickHandler = null;
    let sstOnClickHandler = null;
    const microRootDocument = microAppWindow.Document;
    const microDocument = microAppWindow.document;
    function getEventTarget(type, bindTarget) {
        return SCOPE_DOCUMENT_EVENT.includes(type) ? bindTarget : rawDocument;
    }
    microRootDocument.prototype.addEventListener = function (type, listener, options) {
        const handler = isFunction(listener) ? (listener.__MICRO_APP_BOUND_FUNCTION__ = listener.__MICRO_APP_BOUND_FUNCTION__ || listener.bind(this)) : listener;
        const listenerList = eventListenerMap.get(type);
        if (listenerList) {
            listenerList.add(listener);
        }
        else {
            eventListenerMap.set(type, new Set([listener]));
        }
        listener && (listener.__MICRO_APP_MARK_OPTIONS__ = options);
        rawAddEventListener.call(getEventTarget(type, this), type, handler, options);
    };
    microRootDocument.prototype.removeEventListener = function (type, listener, options) {
        const listenerList = eventListenerMap.get(type);
        if ((listenerList === null || listenerList === void 0 ? void 0 : listenerList.size) && listenerList.has(listener)) {
            listenerList.delete(listener);
        }
        const handler = (listener === null || listener === void 0 ? void 0 : listener.__MICRO_APP_BOUND_FUNCTION__) || listener;
        rawRemoveEventListener.call(getEventTarget(type, this), type, handler, options);
    };
    microRootDocument.prototype.dispatchEvent = function (event) {
        return rawDispatchEvent.call(getEventTarget(event === null || event === void 0 ? void 0 : event.type, this), event);
    };
    // 重新定义microRootDocument.prototype 上的on开头方法
    function createSetterHandler(eventName) {
        if (eventName === 'onclick') {
            return (value) => {
                if (isFunction(onClickHandler)) {
                    rawRemoveEventListener.call(rawDocument, 'click', onClickHandler, false);
                }
                if (isFunction(value)) {
                    onClickHandler = value.bind(microDocument);
                    rawAddEventListener.call(rawDocument, 'click', onClickHandler, false);
                }
                else {
                    onClickHandler = value;
                }
            };
        }
        return (value) => { rawDocument[eventName] = isFunction(value) ? value.bind(microDocument) : value; };
    }
    /**
     * TODO:
     * 1、直接代理到原生document是否正确
     * 2、shadowDOM
     */
    Object.getOwnPropertyNames(microRootDocument.prototype)
        .filter((key) => /^on/.test(key) && !SCOPE_DOCUMENT_ON_EVENT.includes(key))
        .forEach((eventName) => {
        const { enumerable, writable, set } = Object.getOwnPropertyDescriptor(microRootDocument.prototype, eventName) || {
            enumerable: true,
            writable: true,
        };
        try {
            rawDefineProperty(microRootDocument.prototype, eventName, {
                enumerable,
                configurable: true,
                get: () => {
                    if (eventName === 'onclick')
                        return onClickHandler;
                    return rawDocument[eventName];
                },
                set: (writable !== null && writable !== void 0 ? writable : !!set) ? createSetterHandler(eventName) : undefined,
            });
        }
        catch (e) {
            logWarn(e, appName);
        }
    });
    const reset = () => {
        sstEventListenerMap.clear();
        sstOnClickHandler = null;
    };
    /**
     * record event
     * NOTE:
     *  1.record maybe call twice when unmount prerender, keep-alive app manually with umd mode
     * Scenes:
     *  1. exec umdMountHook in umd mode
     *  2. hidden keep-alive app
     *  3. after init prerender app
     */
    const record = () => {
        /**
         * record onclick handler
         * onClickHandler maybe set again after prerender/keep-alive app hidden
         */
        sstOnClickHandler = onClickHandler || sstOnClickHandler;
        // record document event
        eventListenerMap.forEach((listenerList, type) => {
            if (listenerList.size) {
                const cacheList = sstEventListenerMap.get(type) || [];
                sstEventListenerMap.set(type, new Set([...cacheList, ...listenerList]));
            }
        });
    };
    // rebuild event and timer before remount app
    const rebuild = () => {
        // rebuild onclick event
        if (sstOnClickHandler && !onClickHandler)
            microDocument.onclick = sstOnClickHandler;
        sstEventListenerMap.forEach((listenerList, type) => {
            for (const listener of listenerList) {
                microDocument.addEventListener(type, listener, listener === null || listener === void 0 ? void 0 : listener.__MICRO_APP_MARK_OPTIONS__);
            }
        });
        reset();
    };
    const release = () => {
        // Clear the function bound by micro app through document.onclick
        if (isFunction(onClickHandler)) {
            rawRemoveEventListener.call(rawDocument, 'click', onClickHandler);
        }
        onClickHandler = null;
        // Clear document binding event
        if (eventListenerMap.size) {
            eventListenerMap.forEach((listenerList, type) => {
                for (const listener of listenerList) {
                    rawRemoveEventListener.call(getEventTarget(type, microDocument), type, (listener === null || listener === void 0 ? void 0 : listener.__MICRO_APP_BOUND_FUNCTION__) || listener);
                }
            });
            eventListenerMap.clear();
        }
    };
    return {
        reset,
        record,
        rebuild,
        release,
    };
}

/**
 * patch Element & Node of child app
 * @param appName app name
 * @param url app url
 * @param microAppWindow microWindow of child app
 * @param sandbox IframeSandbox
 */
function patchElement(appName, url, microAppWindow, sandbox) {
    patchIframeNode(appName, microAppWindow, sandbox);
    patchIframeAttribute(url, microAppWindow);
}
/**
 * patch iframe Node/Element
 *
 */
function patchIframeNode(appName, microAppWindow, sandbox) {
    const rawRootElement = globalEnv.rawRootElement; // native root Element
    const rawRootNode = globalEnv.rawRootNode;
    const rawDocument = globalEnv.rawDocument;
    const microDocument = microAppWindow.document;
    const microRootNode = microAppWindow.Node;
    const microRootElement = microAppWindow.Element;
    const microDocumentFragment = microAppWindow.DocumentFragment;
    // const rawMicroGetRootNode = microRootNode.prototype.getRootNode
    const rawMicroAppendChild = microRootNode.prototype.appendChild;
    const rawMicroInsertBefore = microRootNode.prototype.insertBefore;
    const rawMicroReplaceChild = microRootNode.prototype.replaceChild;
    const rawMicroRemoveChild = microRootNode.prototype.removeChild;
    const rawMicroAppend = microRootElement.prototype.append;
    const rawMicroPrepend = microRootElement.prototype.prepend;
    const rawMicroFragmentAppend = microDocumentFragment.prototype.append;
    const rawMicroFragmentPrepend = microDocumentFragment.prototype.prepend;
    const rawMicroInsertAdjacentElement = microRootElement.prototype.insertAdjacentElement;
    const rawMicroCloneNode = microRootNode.prototype.cloneNode;
    const rawInnerHTMLDesc = Object.getOwnPropertyDescriptor(microRootElement.prototype, 'innerHTML');
    const rawParentNodeDesc = Object.getOwnPropertyDescriptor(microRootNode.prototype, 'parentNode');
    const rawOwnerDocumentDesc = Object.getOwnPropertyDescriptor(microRootNode.prototype, 'ownerDocument');
    const isPureNode = (target) => {
        return (isScriptElement(target) || isBaseElement(target)) && target.__PURE_ELEMENT__;
    };
    const getRawTarget = (parent) => {
        if (parent === sandbox.microHead) {
            return rawDocument.head;
        }
        else if (parent === sandbox.microBody) {
            return rawDocument.body;
        }
        return parent;
    };
    microRootNode.prototype.appendChild = function appendChild(node) {
        updateElementInfo(node, appName);
        if (isPureNode(node)) {
            return rawMicroAppendChild.call(this, node);
        }
        return rawRootNode.prototype.appendChild.call(getRawTarget(this), node);
    };
    microRootNode.prototype.insertBefore = function insertBefore(node, child) {
        updateElementInfo(node, appName);
        if (isPureNode(node)) {
            return rawMicroInsertBefore.call(this, node, child);
        }
        return rawRootNode.prototype.insertBefore.call(getRawTarget(this), node, child);
    };
    microRootNode.prototype.replaceChild = function replaceChild(node, child) {
        updateElementInfo(node, appName);
        if (isPureNode(node)) {
            return rawMicroReplaceChild.call(this, node, child);
        }
        return rawRootNode.prototype.replaceChild.call(getRawTarget(this), node, child);
    };
    microRootNode.prototype.removeChild = function removeChild(oldChild) {
        if (isPureNode(oldChild) || this.contains(oldChild)) {
            return rawMicroRemoveChild.call(this, oldChild);
        }
        return rawRootNode.prototype.removeChild.call(getRawTarget(this), oldChild);
    };
    microDocumentFragment.prototype.append = microRootElement.prototype.append = function append(...nodes) {
        let i = 0;
        let hasPureNode = false;
        while (i < nodes.length) {
            nodes[i] = isNode(nodes[i]) ? nodes[i] : microDocument.createTextNode(nodes[i]);
            if (isPureNode(nodes[i]))
                hasPureNode = true;
            i++;
        }
        if (hasPureNode) {
            return (isDocumentFragment(this) ? rawMicroFragmentAppend : rawMicroAppend).call(this, ...nodes);
        }
        return rawRootElement.prototype.append.call(getRawTarget(this), ...nodes);
    };
    microDocumentFragment.prototype.prepend = microRootElement.prototype.prepend = function prepend(...nodes) {
        let i = 0;
        let hasPureNode = false;
        while (i < nodes.length) {
            nodes[i] = isNode(nodes[i]) ? nodes[i] : microDocument.createTextNode(nodes[i]);
            if (isPureNode(nodes[i]))
                hasPureNode = true;
            i++;
        }
        if (hasPureNode) {
            return (isDocumentFragment(this) ? rawMicroFragmentPrepend : rawMicroPrepend).call(this, ...nodes);
        }
        return rawRootElement.prototype.prepend.call(getRawTarget(this), ...nodes);
    };
    /**
     * The insertAdjacentElement method of the Element interface inserts a given element node at a given position relative to the element it is invoked upon.
     * Scenes:
     *  1. vite4 development env for style
     */
    microRootElement.prototype.insertAdjacentElement = function insertAdjacentElement(where, element) {
        updateElementInfo(element, appName);
        if (isPureNode(element)) {
            return rawMicroInsertAdjacentElement.call(this, where, element);
        }
        return rawRootElement.prototype.insertAdjacentElement.call(getRawTarget(this), where, element);
    };
    /**
     * Specific prototype properties:
     * 1. baseURI
     * 2. ownerDocument
     * 3. parentNode
     * 4. innerHTML
     */
    rawDefineProperty(microRootNode.prototype, 'baseURI', {
        configurable: true,
        enumerable: true,
        get() {
            return sandbox.proxyWindow.location.href;
        },
    });
    rawDefineProperty(microRootNode.prototype, 'ownerDocument', {
        configurable: true,
        enumerable: true,
        get() {
            var _a;
            return this.__PURE_ELEMENT__ || this === microDocument
                ? (_a = rawOwnerDocumentDesc.get) === null || _a === void 0 ? void 0 : _a.call(this) : microDocument;
        },
    });
    // patch parentNode
    rawDefineProperty(microRootNode.prototype, 'parentNode', getIframeParentNodeDesc(appName, rawParentNodeDesc));
    microRootNode.prototype.getRootNode = function getRootNode() {
        return microDocument;
        // TODO: any case return document?
        // const rootNode = rawMicroGetRootNode.call(this, options)
        // if (rootNode === appInstanceMap.get(appName)?.container) return microDocument
        // return rootNode
    };
    // patch cloneNode
    microRootNode.prototype.cloneNode = function cloneNode(deep) {
        const clonedNode = rawMicroCloneNode.call(this, deep);
        return updateElementInfo(clonedNode, appName);
    };
    rawDefineProperty(microRootElement.prototype, 'innerHTML', {
        configurable: true,
        enumerable: true,
        get() {
            var _a;
            return (_a = rawInnerHTMLDesc.get) === null || _a === void 0 ? void 0 : _a.call(this);
        },
        set(code) {
            var _a;
            (_a = rawInnerHTMLDesc.set) === null || _a === void 0 ? void 0 : _a.call(this, code);
            Array.from(this.children).forEach((child) => {
                if (isElement(child)) {
                    updateElementInfo(child, appName);
                }
            });
        }
    });
    // Adapt to new image(...) scene
    const ImageProxy = new Proxy(microAppWindow.Image, {
        construct(Target, args) {
            const elementImage = new Target(...args);
            updateElementInfo(elementImage, appName);
            return elementImage;
        },
    });
    rawDefineProperty(microAppWindow, 'Image', {
        configurable: true,
        writable: true,
        value: ImageProxy,
    });
}
function patchIframeAttribute(url, microAppWindow) {
    const microRootElement = microAppWindow.Element;
    const rawMicroSetAttribute = microRootElement.prototype.setAttribute;
    microRootElement.prototype.setAttribute = function setAttribute(key, value) {
        if (/^micro-app(-\S+)?/i.test(this.tagName) &&
            key === 'data' &&
            this.setAttribute !== microRootElement.prototype.setAttribute) {
            this.setAttribute(key, value);
        }
        else {
            if (((key === 'src' || key === 'srcset') && /^(img|script|video|audio|source|embed)$/i.test(this.tagName)) ||
                (key === 'href' && /^(link|image)$/i.test(this.tagName)) ||
                // If it is the anchor tag,eg. <a href="#xxx"/>, the path will not be completed
                (key === 'href' && /^(a)$/i.test(this.tagName) && !/^#/.test(value))) {
                let _url = url;
                if (isBrowser && key === 'href' && /^a$/i.test(this.tagName) && isFunction(microApp.options.excludeAssetFilter) && microApp.options.excludeAssetFilter(value)) {
                    _url = document.baseURI;
                }
                value = CompletionPath(value, _url);
            }
            rawMicroSetAttribute.call(this, key, value);
        }
    };
    const protoAttrList = [
        [microAppWindow.HTMLImageElement.prototype, 'src'],
        [microAppWindow.HTMLScriptElement.prototype, 'src'],
        [microAppWindow.HTMLLinkElement.prototype, 'href'],
        [microAppWindow.SVGImageElement.prototype, 'href'],
    ];
    /**
     * element.setAttribute does not trigger this actions:
     *  1. img.src = xxx
     *  2. script.src = xxx
     *  3. link.href = xxx
     */
    protoAttrList.forEach(([target, attr]) => {
        const { enumerable, configurable, get, set } = Object.getOwnPropertyDescriptor(target, attr) || {
            enumerable: true,
            configurable: true,
        };
        rawDefineProperty(target, attr, {
            enumerable,
            configurable,
            get: function () {
                return get === null || get === void 0 ? void 0 : get.call(this);
            },
            set: function (value) {
                set === null || set === void 0 ? void 0 : set.call(this, CompletionPath(value, url));
            },
        });
    });
}

class IframeSandbox {
    constructor(appName, url) {
        this.active = false;
        // Properties that can be escape to rawWindow
        this.escapeProperties = [];
        // Update the base.href when initial and each redirect
        this.updateIframeBase = () => {
            var _a;
            // origin must be child app origin
            (_a = this.baseElement) === null || _a === void 0 ? void 0 : _a.setAttribute('href', createURL(this.url).origin + this.proxyLocation.pathname);
        };
        this.appName = appName;
        this.url = url;
        const rawLocation = globalEnv.rawWindow.location;
        const browserHost = rawLocation.protocol + '//' + rawLocation.host;
        this.deleteIframeElement = this.createIframeElement(appName, browserHost + rawLocation.pathname);
        this.microAppWindow = this.iframe.contentWindow;
        this.patchIframe(this.microAppWindow, (resolve) => {
            // create new html to iframe
            this.createIframeTemplate(this.microAppWindow);
            // get escapeProperties from plugins
            this.getSpecialProperties(appName);
            // patch location & history of child app
            this.proxyLocation = patchRouter(appName, url, this.microAppWindow, browserHost);
            // patch window of child app
            this.windowEffect = patchWindow$1(appName, this.microAppWindow, this);
            // patch document of child app
            this.documentEffect = patchDocument$1(appName, this.microAppWindow, this);
            // patch Node & Element of child app
            patchElement(appName, url, this.microAppWindow, this);
            /**
             * create static properties
             * NOTE:
             *  1. execute as early as possible
             *  2. run after patchRouter & createProxyWindow
             */
            this.initStaticGlobalKeys(appName, url, this.microAppWindow);
            resolve();
        });
    }
    /**
     * create iframe for sandbox
     * @param appName app name
     * @param browserPath browser origin
     * @returns release callback
     */
    createIframeElement(appName, browserPath) {
        this.iframe = pureCreateElement('iframe');
        const iframeAttrs = {
            id: appName,
            src: microApp.options.iframeSrc || browserPath,
            style: 'display: none',
            'powered-by': 'micro-app',
        };
        Object.keys(iframeAttrs).forEach((key) => this.iframe.setAttribute(key, iframeAttrs[key]));
        // effect action during construct
        globalEnv.rawDocument.body.appendChild(this.iframe);
        /**
         * If dom operated async when unmount, premature deletion of iframe will cause unexpected problems
         * e.g.
         *  1. antd: notification.destroy()
         * WARNING:
         *  If async operation time is too long, defer cannot avoid the problem
         * TODO: more test
         */
        return () => defer(() => {
            var _a, _b;
            // default mode or destroy, iframe will be deleted when unmount
            (_b = (_a = this.iframe) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(this.iframe);
            this.iframe = null;
        });
    }
    start({ baseroute, defaultPage, disablePatchRequest, }) {
        if (this.active)
            return;
        this.active = true;
        /* --- memory router part --- start */
        /**
         * Sync router info to iframe when exec sandbox.start with disable or enable memory-router
         * e.g.:
         *  vue-router@4.x get target path by remove the base section from rawLocation.pathname
         *  code: window.location.pathname.slice(base.length) || '/'; (base is baseroute)
         * NOTE:
         *  1. iframe router and browser router are separated, we should update iframe router manually
         *  2. withSandbox location is browser location when disable memory-router, so no need to do anything
         */
        this.initRouteState(defaultPage);
        // unique listener of popstate event for child app
        this.removeHistoryListener = addHistoryListener(this.microAppWindow.__MICRO_APP_NAME__);
        if (isRouterModeCustom(this.microAppWindow.__MICRO_APP_NAME__)) {
            this.microAppWindow.__MICRO_APP_BASE_ROUTE__ = this.microAppWindow.__MICRO_APP_BASE_URL__ = baseroute;
        }
        /* --- memory router part --- end */
        /**
         * create base element to iframe
         * WARNING: This will also affect a, image, link and script
         */
        if (!disablePatchRequest) {
            this.createIframeBase();
        }
        if (++globalEnv.activeSandbox === 1) {
            patchElementAndDocument();
            patchHistory();
        }
        if (++IframeSandbox.activeCount === 1) ;
    }
    stop({ umdMode, keepRouteState, destroy, clearData, }) {
        var _a;
        // sandbox.stop may exec before sandbox.start, e.g: iframe sandbox + default mode + remount
        if (!this.active)
            return;
        this.recordAndReleaseEffect({ clearData }, !umdMode || destroy);
        /* --- memory router part --- start */
        // if keep-route-state is true, preserve microLocation state
        this.clearRouteState(keepRouteState);
        // release listener of popstate for child app
        (_a = this.removeHistoryListener) === null || _a === void 0 ? void 0 : _a.call(this);
        /* --- memory router part --- end */
        if (!umdMode || destroy) {
            this.deleteIframeElement();
            this.clearHijackUmdHooks();
        }
        if (--globalEnv.activeSandbox === 0) {
            releasePatchElementAndDocument();
            releasePatchHistory();
        }
        if (--IframeSandbox.activeCount === 0) ;
        this.active = false;
    }
    /**
     * create static properties
     * NOTE:
     *  1. execute as early as possible
     *  2. run after patchRouter & createProxyWindow
     * TODO: 设置为只读变量
     */
    initStaticGlobalKeys(appName, url, microAppWindow) {
        microAppWindow.__MICRO_APP_ENVIRONMENT__ = true;
        microAppWindow.__MICRO_APP_NAME__ = appName;
        microAppWindow.__MICRO_APP_URL__ = url;
        microAppWindow.__MICRO_APP_PUBLIC_PATH__ = getEffectivePath(url);
        microAppWindow.__MICRO_APP_BASE_ROUTE__ = '';
        microAppWindow.__MICRO_APP_WINDOW__ = microAppWindow;
        microAppWindow.__MICRO_APP_PRE_RENDER__ = false;
        microAppWindow.__MICRO_APP_UMD_MODE__ = false;
        microAppWindow.__MICRO_APP_PROXY_WINDOW__ = this.proxyWindow;
        microAppWindow.__MICRO_APP_SANDBOX__ = this;
        microAppWindow.__MICRO_APP_SANDBOX_TYPE__ = 'iframe';
        microAppWindow.rawWindow = globalEnv.rawWindow;
        microAppWindow.rawDocument = globalEnv.rawDocument;
        microAppWindow.microApp = assign(new EventCenterForMicroApp(appName), {
            removeDomScope,
            pureCreateElement,
            location: this.proxyLocation,
            router,
        });
    }
    /**
     * Record global effect and then release (effect: global event, timeout, data listener)
     * Scenes:
     * 1. unmount of default/umd app
     * 2. hidden keep-alive app
     * 3. after init prerender app
     * @param options {
     *  @param clearData clear data from base app
     *  @param isPrerender is prerender app
     *  @param keepAlive is keep-alive app
     * }
     * @param preventRecord prevent record effect events (default or destroy)
     */
    recordAndReleaseEffect(options, preventRecord = false) {
        if (preventRecord) {
            this.resetEffectSnapshot();
        }
        else {
            this.recordEffectSnapshot();
        }
        this.releaseGlobalEffect(options);
    }
    /**
     * reset effect snapshot data in default mode or destroy
     * Scenes:
     *  1. unmount hidden keep-alive app manually
     *  2. unmount prerender app manually
     */
    resetEffectSnapshot() {
        var _a, _b;
        (_a = this.windowEffect) === null || _a === void 0 ? void 0 : _a.reset();
        (_b = this.documentEffect) === null || _b === void 0 ? void 0 : _b.reset();
        resetDataCenterSnapshot(this.microAppWindow.microApp);
    }
    /**
     * record umd snapshot before the first execution of umdHookMount
     * Scenes:
     * 1. exec umdMountHook in umd mode
     * 2. hidden keep-alive app
     * 3. after init prerender app
     */
    recordEffectSnapshot() {
        var _a, _b;
        (_a = this.windowEffect) === null || _a === void 0 ? void 0 : _a.record();
        (_b = this.documentEffect) === null || _b === void 0 ? void 0 : _b.record();
        recordDataCenterSnapshot(this.microAppWindow.microApp);
    }
    // rebuild umd snapshot before remount umd app
    rebuildEffectSnapshot() {
        var _a, _b;
        (_a = this.windowEffect) === null || _a === void 0 ? void 0 : _a.rebuild();
        (_b = this.documentEffect) === null || _b === void 0 ? void 0 : _b.rebuild();
        rebuildDataCenterSnapshot(this.microAppWindow.microApp);
    }
    /**
     * clear global event, timeout, data listener
     * Scenes:
     * 1. unmount of normal/umd app
     * 2. hidden keep-alive app
     * 3. after init prerender app
     * @param clearData clear data from base app
     * @param isPrerender is prerender app
     * @param keepAlive is keep-alive app
     */
    releaseGlobalEffect({ clearData = false }) {
        var _a, _b, _c, _d, _e;
        (_a = this.windowEffect) === null || _a === void 0 ? void 0 : _a.release();
        (_b = this.documentEffect) === null || _b === void 0 ? void 0 : _b.release();
        (_c = this.microAppWindow.microApp) === null || _c === void 0 ? void 0 : _c.clearDataListener();
        (_d = this.microAppWindow.microApp) === null || _d === void 0 ? void 0 : _d.clearGlobalDataListener();
        if (clearData) {
            microApp.clearData(this.microAppWindow.__MICRO_APP_NAME__);
            (_e = this.microAppWindow.microApp) === null || _e === void 0 ? void 0 : _e.clearData();
        }
    }
    // set __MICRO_APP_PRE_RENDER__ state
    setPreRenderState(state) {
        this.microAppWindow.__MICRO_APP_PRE_RENDER__ = state;
    }
    // record umdMode
    markUmdMode(state) {
        this.microAppWindow.__MICRO_APP_UMD_MODE__ = state;
    }
    // TODO: RESTRUCTURE
    patchIframe(microAppWindow, cb) {
        const oldMicroDocument = microAppWindow.document;
        this.sandboxReady = new Promise((resolve) => {
            (function iframeLocationReady() {
                setTimeout(() => {
                    try {
                        /**
                         * NOTE:
                         *  1. In browser, iframe document will be recreated after iframe initial
                         *  2. In jest, iframe document is always the same
                         */
                        if (microAppWindow.document === oldMicroDocument && !false) {
                            iframeLocationReady();
                        }
                        else {
                            /**
                             * NOTE:
                             *  1. microAppWindow will not be recreated
                             *  2. the properties of microAppWindow may be recreated, such as document
                             *  3. the variables added to microAppWindow may be cleared
                             */
                            microAppWindow.stop();
                            cb(resolve);
                        }
                    }
                    catch (e) {
                        iframeLocationReady();
                    }
                }, 0);
            })();
        });
    }
    // TODO: RESTRUCTURE
    createIframeTemplate(microAppWindow) {
        const microDocument = microAppWindow.document;
        clearDOM(microDocument);
        const html = microDocument.createElement('html');
        html.innerHTML = '<head></head><body></body>';
        microDocument.appendChild(html);
        // 记录iframe原生body
        this.microBody = microDocument.body;
        this.microHead = microDocument.head;
    }
    /**
     * baseElement will complete the relative address of element according to the URL
     * e.g: a image link script fetch ajax EventSource
     */
    createIframeBase() {
        this.baseElement = pureCreateElement('base');
        this.updateIframeBase();
        this.microHead.appendChild(this.baseElement);
    }
    /**
     * get escapeProperties from plugins & adapter
     * @param appName app name
     */
    getSpecialProperties(appName) {
        var _a;
        if (isPlainObject(microApp.options.plugins)) {
            this.commonActionForSpecialProperties(microApp.options.plugins.global);
            this.commonActionForSpecialProperties((_a = microApp.options.plugins.modules) === null || _a === void 0 ? void 0 : _a[appName]);
        }
    }
    // common action for global plugins and module plugins
    commonActionForSpecialProperties(plugins) {
        if (isArray(plugins)) {
            for (const plugin of plugins) {
                if (isPlainObject(plugin)) {
                    if (isArray(plugin.escapeProperties)) {
                        this.escapeProperties = this.escapeProperties.concat(plugin.escapeProperties);
                    }
                }
            }
        }
    }
    initRouteState(defaultPage) {
        initRouteStateWithURL(this.microAppWindow.__MICRO_APP_NAME__, this.microAppWindow.location, defaultPage);
    }
    clearRouteState(keepRouteState) {
        clearRouteStateFromURL(this.microAppWindow.__MICRO_APP_NAME__, this.microAppWindow.__MICRO_APP_URL__, this.microAppWindow.location, keepRouteState);
    }
    setRouteInfoForKeepAliveApp() {
        updateBrowserURLWithLocation(this.microAppWindow.__MICRO_APP_NAME__, this.microAppWindow.location);
    }
    removeRouteInfoForKeepAliveApp() {
        removePathFromBrowser(this.microAppWindow.__MICRO_APP_NAME__);
    }
    /**
     * Format all html elements when init
     * @param container micro app container
     */
    patchStaticElement(container) {
        patchElementTree(container, this.microAppWindow.__MICRO_APP_NAME__);
    }
    /**
     * action before exec scripts when mount
     * Actions:
     * 1. patch static elements from html
     * 2. hijack umd hooks -- mount, unmount, micro-app-appName
     * @param container micro app container
     */
    actionsBeforeExecScripts(container, handleUmdHooks) {
        this.patchStaticElement(container);
        this.clearHijackUmdHooks = this.hijackUmdHooks(this.appName, this.microAppWindow, handleUmdHooks);
    }
    // hijack mount, unmount, micro-app-appName hook to microAppWindow
    hijackUmdHooks(appName, microAppWindow, handleUmdHooks) {
        let mount, unmount, microAppLibrary;
        rawDefineProperties(microAppWindow, {
            mount: {
                configurable: true,
                get: () => mount,
                set: (value) => {
                    if (this.active && isFunction(value) && !mount) {
                        handleUmdHooks(mount = value, unmount);
                    }
                }
            },
            unmount: {
                configurable: true,
                get: () => unmount,
                set: (value) => {
                    if (this.active && isFunction(value) && !unmount) {
                        handleUmdHooks(mount, unmount = value);
                    }
                }
            },
            [`micro-app-${appName}`]: {
                configurable: true,
                get: () => microAppLibrary,
                set: (value) => {
                    if (this.active && isPlainObject(value) && !microAppLibrary) {
                        microAppLibrary = value;
                        handleUmdHooks(microAppLibrary.mount, microAppLibrary.unmount);
                    }
                }
            }
        });
        return () => {
            mount = unmount = microAppLibrary = null;
        };
    }
    setStaticAppState(state) {
        this.microAppWindow.__MICRO_APP_STATE__ = state;
    }
}
IframeSandbox.activeCount = 0; // number of active sandbox

// micro app instances
const appInstanceMap = new Map();
class CreateApp {
    constructor({ name, url, container, scopecss, useSandbox, inline, iframe, ssrUrl, isPrefetch, prefetchLevel, routerMode, }) {
        this.state = appStates.CREATED;
        this.keepAliveState = null;
        this.loadSourceLevel = 0;
        this.umdHookMount = null;
        this.umdHookUnmount = null;
        this.umdMode = false;
        // TODO: 类型优化，加上iframe沙箱
        this.sandBox = null;
        this.fiber = false;
        appInstanceMap.set(name, this);
        // init actions
        this.name = name;
        this.url = url;
        this.useSandbox = useSandbox;
        this.scopecss = this.useSandbox && scopecss;
        // exec before getInlineModeState
        this.iframe = iframe !== null && iframe !== void 0 ? iframe : false;
        this.inline = this.getInlineModeState(inline);
        /**
         * NOTE:
         *  1. Navigate after micro-app created, before mount
         */
        this.routerMode = routerMode || DEFAULT_ROUTER_MODE;
        // not exist when prefetch 👇
        this.container = container !== null && container !== void 0 ? container : null;
        this.ssrUrl = ssrUrl !== null && ssrUrl !== void 0 ? ssrUrl : '';
        // exist only prefetch 👇
        this.isPrefetch = isPrefetch !== null && isPrefetch !== void 0 ? isPrefetch : false;
        this.isPrerender = prefetchLevel === 3;
        this.prefetchLevel = prefetchLevel;
        this.source = { html: null, links: new Set(), scripts: new Set() };
        this.loadSourceCode();
        this.createSandbox();
    }
    // Load resources
    loadSourceCode() {
        this.setAppState(appStates.LOADING);
        HTMLLoader.getInstance().run(this, extractSourceDom);
    }
    /**
     * When resource is loaded, mount app if it is not prefetch or unmount
     * defaultPage disablePatchRequest routerMode baseroute is only for prerender app
     */
    onLoad({ html, 
    // below params is only for prerender app
    defaultPage, routerMode, baseroute, disablePatchRequest, }) {
        var _a;
        if (++this.loadSourceLevel === 2) {
            this.source.html = html;
            if (this.isUnmounted())
                return;
            if (!this.isPrefetch) {
                getRootContainer(this.container).mount(this);
            }
            else if (this.isPrerender) {
                /**
                 * PreRender is an option of prefetch, it will render app during prefetch
                 * Limit:
                 * 1. fiber forced on
                 * 2. only virtual router support
                 *
                 * NOTE: (Don't update browser url, dispatch popstateEvent, reload window, dispatch lifecycle event)
                 * 1. pushState/replaceState in child can update microLocation, but will not attach router info to browser url
                 * 2. prevent dispatch popstate/hashchange event to browser
                 * 3. all navigation actions of location are invalid (In the future, we can consider update microLocation without trigger browser reload)
                 * 4. lifecycle event will not trigger when prerender
                 *
                 * Special scenes
                 * 1. unmount prerender app when loading
                 * 2. unmount prerender app when exec js
                 * 2. unmount prerender app after exec js
                 */
                const container = pureCreateElement('div');
                container.setAttribute('prerender', 'true');
                (_a = this.sandBox) === null || _a === void 0 ? void 0 : _a.setPreRenderState(true);
                this.mount({
                    container,
                    inline: this.inline,
                    fiber: true,
                    defaultPage: defaultPage || '',
                    disablePatchRequest: disablePatchRequest !== null && disablePatchRequest !== void 0 ? disablePatchRequest : false,
                    routerMode: routerMode,
                    baseroute: baseroute || '',
                });
            }
        }
    }
    /**
     * Error loading HTML
     * @param e Error
     */
    onLoadError(e) {
        this.loadSourceLevel = -1;
        if (!this.isUnmounted()) {
            this.onerror(e);
            this.setAppState(appStates.LOAD_FAILED);
        }
    }
    /**
     * mount app
     * @param container app container
     * @param inline run js in inline mode
     * @param routerMode virtual router mode
     * @param defaultPage default page of virtual router
     * @param baseroute route prefix, default is ''
     * @param disablePatchRequest prevent rewrite request method of child app
     * @param fiber run js in fiber mode
     */
    mount({ container, inline, routerMode, defaultPage, baseroute, disablePatchRequest, fiber, }) {
        if (this.loadSourceLevel !== 2) {
            /**
             * container cannot be null when load end
             * NOTE:
             *  1. render prefetch app before load end
             *  2. unmount prefetch app and mount again before load end
             */
            this.container = container;
            // mount before prerender exec mount (loading source), set isPrerender to false
            this.isPrerender = false;
            // dispatch state event to micro app
            // TODO: statechange 还是 state-change，保持一致
            dispatchCustomEventToMicroApp(this, 'statechange', {
                appState: appStates.LOADING
            });
            // reset app state to LOADING
            return this.setAppState(appStates.LOADING);
        }
        this.createSandbox();
        // place outside of nextAction, as nextAction may execute async
        this.setAppState(appStates.BEFORE_MOUNT);
        const nextAction = () => {
            var _a, _b, _c, _d, _e, _f, _g;
            /**
             * Special scenes:
             * 1. mount before prerender exec mount (loading source)
             * 2. mount when prerender js executing
             * 3. mount after prerender js exec end
             * 4. mount after prerender unmounted
             *
             * TODO: test shadowDOM
             */
            if (this.isPrerender &&
                isDivElement(this.container) &&
                this.container.hasAttribute('prerender')) {
                /**
                 * current this.container is <div prerender='true'></div>
                 * set this.container to <micro-app></micro-app>
                 * NOTE:
                 *  1. must exec before this.sandBox.rebuildEffectSnapshot
                 *  2. must exec before this.preRenderEvents?.forEach((cb) => cb())
                 */
                this.container = this.cloneContainer(container, this.container, false);
                /**
                 * rebuild effect event of window, document, data center
                 * explain:
                 * 1. rebuild before exec mount, do nothing
                 * 2. rebuild when js executing, recovery recorded effect event, because prerender fiber mode
                 * 3. rebuild after js exec end, normal recovery effect event
                 */
                (_a = this.sandBox) === null || _a === void 0 ? void 0 : _a.rebuildEffectSnapshot();
                (_b = this.preRenderEvents) === null || _b === void 0 ? void 0 : _b.forEach((cb) => cb());
                // reset isPrerender config
                this.isPrerender = false;
                this.preRenderEvents = null;
                // attach router info to browser url
                router.attachToURL(this.name);
                (_c = this.sandBox) === null || _c === void 0 ? void 0 : _c.setPreRenderState(false);
            }
            else {
                this.container = container;
                this.inline = this.getInlineModeState(inline);
                this.fiber = fiber;
                this.routerMode = routerMode;
                const dispatchBeforeMount = () => {
                    dispatchLifecyclesEvent(this.container, this.name, lifeCycles.BEFOREMOUNT);
                };
                if (this.isPrerender) {
                    ((_d = this.preRenderEvents) !== null && _d !== void 0 ? _d : (this.preRenderEvents = [])).push(dispatchBeforeMount);
                }
                else {
                    dispatchBeforeMount();
                }
                this.setAppState(appStates.MOUNTING);
                // dispatch state event to micro app
                dispatchCustomEventToMicroApp(this, 'statechange', {
                    appState: appStates.MOUNTING
                });
                // TODO: 兼容shadowRoot的场景
                this.cloneContainer(this.container, this.source.html, !this.umdMode);
                (_e = this.sandBox) === null || _e === void 0 ? void 0 : _e.start({
                    umdMode: this.umdMode,
                    baseroute,
                    defaultPage,
                    disablePatchRequest,
                });
                if (!this.umdMode) {
                    // patch element info of html
                    (_f = this.sandBox) === null || _f === void 0 ? void 0 : _f.actionsBeforeExecScripts(this.container, (mount, unmount) => {
                        var _a;
                        if (!this.umdMode && !this.isUnmounted()) {
                            this.umdHookMount = isFunction(mount) ? mount : null;
                            // umdHookUnmount can works in default mode, register by window.unmount
                            this.umdHookUnmount = isFunction(unmount) ? unmount : null;
                            // if mount & unmount is function, the sub app is umd mode
                            if (isFunction(this.umdHookMount) && isFunction(this.umdHookUnmount)) {
                                (_a = this.sandBox) === null || _a === void 0 ? void 0 : _a.markUmdMode(this.umdMode = true);
                                try {
                                    // if appState is mounted, it means that isFinished is true and this.handleMounted has already been executed, just exec this.umdHookMount
                                    if (this.getAppState() === appStates.MOUNTED) {
                                        this.umdHookMount(microApp.getData(this.name, true));
                                    }
                                    else {
                                        this.handleMounted(this.umdHookMount(microApp.getData(this.name, true)));
                                    }
                                }
                                catch (e) {
                                    logError('An error occurred when mount \n', this.name, e);
                                }
                            }
                        }
                    });
                    // if all js are executed, param isFinished will be true
                    execScripts(this, (isFinished) => {
                        if (!this.umdMode && isFinished === true) {
                            this.handleMounted();
                        }
                    });
                }
                else {
                    (_g = this.sandBox) === null || _g === void 0 ? void 0 : _g.rebuildEffectSnapshot();
                    try {
                        this.handleMounted(this.umdHookMount(microApp.getData(this.name, true)));
                    }
                    catch (e) {
                        logError('An error occurred when mount \n', this.name, e);
                    }
                }
            }
        };
        /**
         * Initialization of sandbox is async, especially iframe sandbox are macro tasks
         * when child apps switch quickly, we need to pay attention to the following points:
         * NOTE:
         *  1. unmount app before exec nextAction (especially: iframe sandbox + default mode + remount)
         *     this.container is null, this.sandBox will not start
         *  2. remount app of note 1
         *  3. unmount app during exec js
         */
        // TODO: 可优化？
        this.sandBox ? this.sandBox.sandboxReady.then(() => !this.isUnmounted() && nextAction()) : nextAction();
    }
    /**
     * handle for promise umdHookMount
     * @param umdHookMountResult result of umdHookMount
     */
    handleMounted(umdHookMountResult) {
        var _a, _b;
        const dispatchAction = () => {
            const nextAction = () => this.actionsAfterMounted();
            if (isPromise(umdHookMountResult)) {
                umdHookMountResult
                    .then(nextAction)
                    .catch((e) => {
                    logError('An error occurred in window.mount \n', this.name, e);
                    nextAction();
                });
            }
            else {
                nextAction();
            }
        };
        if (this.isPrerender) {
            (_a = this.preRenderEvents) === null || _a === void 0 ? void 0 : _a.push(dispatchAction);
            (_b = this.sandBox) === null || _b === void 0 ? void 0 : _b.recordAndReleaseEffect({ isPrerender: true });
        }
        else {
            dispatchAction();
        }
    }
    /**
     * dispatch mounted event when app run finished
     */
    actionsAfterMounted() {
        var _a;
        if (!this.isUnmounted()) {
            this.setAppState(appStates.MOUNTED);
            // call window.onmount of child app
            execMicroAppGlobalHook(this.getMicroAppGlobalHook(microGlobalEvent.ONMOUNT), this.name, microGlobalEvent.ONMOUNT, microApp.getData(this.name, true));
            // dispatch state event to micro app
            dispatchCustomEventToMicroApp(this, 'statechange', {
                appState: appStates.MOUNTED
            });
            // dispatch mounted event to micro app
            dispatchCustomEventToMicroApp(this, 'mounted');
            // dispatch event mounted to parent
            dispatchLifecyclesEvent(this.container, this.name, lifeCycles.MOUNTED);
            /**
             * Hidden Keep-alive app during resource loading, render normally to ensure their liveliness (running in the background) characteristics.
             * Actions:
             *  1. Record & release all global events after mount
             */
            if (this.isHidden()) {
                (_a = this.sandBox) === null || _a === void 0 ? void 0 : _a.recordAndReleaseEffect({ keepAlive: true });
            }
        }
        /**
         * TODO: 这里增加一个处理，如果渲染完成时已经卸载，则进行一些操作
         * 如果是默认模式：删除所有事件和定时器
         * 如果是umd模式：重新记录和清空事件
         * 补充：非必需，优先级低
         */
    }
    /**
     * unmount app
     * NOTE:
     *  1. do not add any params on account of unmountApp
     *  2. this.container maybe null: Initialization of sandbox is async, child app may unmount before exec nextAction of mount
     *  3. unmount app when loading files (this.container is not null)
     * @param destroy completely destroy, delete cache resources
     * @param clearData clear data of dateCenter
     * @param keepRouteState keep route state when unmount, default is false
     * @param unmountcb callback of unmount
     */
    unmount({ destroy, clearData, keepRouteState, unmountcb, }) {
        var _a;
        destroy = destroy || this.state === appStates.LOAD_FAILED;
        this.setAppState(appStates.UNMOUNT);
        try {
            this.handleUnmounted(destroy, clearData, keepRouteState, unmountcb, (_a = this.umdHookUnmount) === null || _a === void 0 ? void 0 : _a.call(this, microApp.getData(this.name, true)));
        }
        catch (e) {
            logError('An error occurred when unmount \n', this.name, e);
        }
    }
    /**
     * handle for promise umdHookUnmount
     * @param destroy completely destroy, delete cache resources
     * @param clearData clear data of dateCenter
     * @param keepRouteState keep route state when unmount, default is false
     * @param unmountcb callback of unmount
     * @param umdHookUnmountResult result of umdHookUnmount
     */
    handleUnmounted(destroy, clearData, keepRouteState, unmountcb, umdHookUnmountResult) {
        // dispatch state event to micro app
        dispatchCustomEventToMicroApp(this, 'statechange', {
            appState: appStates.UNMOUNT
        });
        // dispatch unmount event to micro app
        dispatchCustomEventToMicroApp(this, 'unmount');
        // call window.onunmount of child app
        execMicroAppGlobalHook(this.getMicroAppGlobalHook(microGlobalEvent.ONUNMOUNT), this.name, microGlobalEvent.ONUNMOUNT);
        const nextAction = () => this.actionsAfterUnmounted({
            destroy,
            clearData,
            keepRouteState,
            unmountcb,
        });
        if (isPromise(umdHookUnmountResult)) {
            // async window.unmount will cause appName bind error in nest app
            removeDomScope();
            umdHookUnmountResult
                .then(nextAction)
                .catch((e) => {
                logError('An error occurred in window.unmount \n', this.name, e);
                nextAction();
            });
        }
        else {
            nextAction();
        }
    }
    /**
     * actions for unmount app
     * @param destroy completely destroy, delete cache resources
     * @param clearData clear data of dateCenter
     * @param keepRouteState keep route state when unmount, default is false
     * @param unmountcb callback of unmount
     */
    actionsAfterUnmounted({ destroy, clearData, keepRouteState, unmountcb, }) {
        var _a;
        if (this.umdMode && this.container && !destroy) {
            this.cloneContainer(this.source.html, this.container, false);
        }
        /**
         * this.container maybe contains micro-app element, stop sandbox should exec after cloneContainer
         * NOTE:
         * 1. if destroy is true, clear route state
         * 2. umd mode and keep-alive will not clear EventSource
         */
        (_a = this.sandBox) === null || _a === void 0 ? void 0 : _a.stop({
            umdMode: this.umdMode,
            keepRouteState: keepRouteState && !destroy,
            destroy,
            clearData: clearData || destroy,
        });
        // dispatch unmount event to base app
        dispatchLifecyclesEvent(this.container, this.name, lifeCycles.UNMOUNT);
        this.clearOptions(destroy);
        unmountcb === null || unmountcb === void 0 ? void 0 : unmountcb();
    }
    clearOptions(destroy) {
        var _a, _b;
        this.isPrerender = false;
        this.preRenderEvents = null;
        this.setKeepAliveState(null);
        if (this.container) {
            this.container.innerHTML = '';
            this.container = null;
        }
        else if (!this.umdMode) {
            /**
             * this.container is null means sandBox.start has not exec, so sandBox.stop won't exec either
             * we should remove iframeElement in default mode manually
             */
            (_b = (_a = this.sandBox) === null || _a === void 0 ? void 0 : _a.deleteIframeElement) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        // in iframe sandbox & default mode, delete the sandbox & iframeElement
        /**
         * TODO:
         *  1. with沙箱与iframe沙箱保持一致：with沙箱默认模式下删除 或者 iframe沙箱umd模式下保留
         *  2. 接1.0，this.sandBox置空，还需要注意后续app.sandBox相关操作，比如 scripts.ts --> app.iframe ? app.sandBox!.microBody : app.querySelector('micro-app-body')，如果是fiber或者预加载，会存在卸载后js还在处理的情况
         */
        if (this.iframe && !this.umdMode)
            this.sandBox = null;
        if (destroy)
            this.actionsForCompletelyDestroy();
        removeDomScope();
    }
    // actions for completely destroy
    actionsForCompletelyDestroy() {
        var _a, _b;
        (_b = (_a = this.sandBox) === null || _a === void 0 ? void 0 : _a.deleteIframeElement) === null || _b === void 0 ? void 0 : _b.call(_a);
        sourceCenter.script.deleteInlineInfo(this.source.scripts);
        appInstanceMap.delete(this.name);
    }
    // hidden app when disconnectedCallback called with keep-alive
    hiddenKeepAliveApp(callback) {
        var _a, _b;
        this.setKeepAliveState(keepAliveStates.KEEP_ALIVE_HIDDEN);
        /**
         * afterhidden事件需要提前发送，原因如下：
         *  1. 此时发送this.container还指向micro-app元素，而不是临时div元素
         *  2. 沙箱执行recordAndReleaseEffect后会将appstate-change方法也清空，之后再发送子应用也接受不到了
         *  3. 对于this.loadSourceLevel !== 2的情况，unmount是同步执行的，所以也会出现2的问题
         * TODO: 有可能导致的问题
         *  1. 在基座接受到afterhidden方法后立即执行unmount，彻底destroy应用时，因为unmount时同步执行，所以this.container为null后才执行cloneContainer
         */
        dispatchCustomEventToMicroApp(this, 'appstate-change', {
            appState: 'afterhidden',
        });
        // dispatch afterHidden event to base app
        dispatchLifecyclesEvent(this.container, this.name, lifeCycles.AFTERHIDDEN);
        if (isRouterModeSearch(this.name)) {
            // called after lifeCyclesEvent
            (_a = this.sandBox) === null || _a === void 0 ? void 0 : _a.removeRouteInfoForKeepAliveApp();
        }
        /**
         * Hidden app before the resources are loaded, then unmount the app
         */
        if (this.loadSourceLevel !== 2) {
            getRootContainer(this.container).unmount();
        }
        else {
            this.container = this.cloneContainer(pureCreateElement('div'), this.container, false);
            (_b = this.sandBox) === null || _b === void 0 ? void 0 : _b.recordAndReleaseEffect({ keepAlive: true });
        }
        callback === null || callback === void 0 ? void 0 : callback();
    }
    // show app when connectedCallback called with keep-alive
    showKeepAliveApp(container) {
        var _a, _b;
        /**
         * NOTE:
         *  1. this.container must set to container(micro-app element) before exec rebuildEffectSnapshot
         *    ISSUE: https://github.com/micro-zoe/micro-app/issues/1115
         *  2. rebuildEffectSnapshot must exec before dispatch beforeshow event
         */
        const oldContainer = this.container;
        this.container = container;
        (_a = this.sandBox) === null || _a === void 0 ? void 0 : _a.rebuildEffectSnapshot();
        // dispatch beforeShow event to micro-app
        dispatchCustomEventToMicroApp(this, 'appstate-change', {
            appState: 'beforeshow',
        });
        // dispatch beforeShow event to base app
        dispatchLifecyclesEvent(container, this.name, lifeCycles.BEFORESHOW);
        this.setKeepAliveState(keepAliveStates.KEEP_ALIVE_SHOW);
        this.cloneContainer(this.container, oldContainer, false);
        /**
         * TODO:
         *  问题：当路由模式为custom时，keep-alive应用在重新展示，是否需要根据子应用location信息更新浏览器地址？
         *  暂时不这么做，因为无法确定二次展示时新旧地址是否相同，是否带有特殊信息
         */
        if (isRouterModeSearch(this.name)) {
            // called before lifeCyclesEvent
            (_b = this.sandBox) === null || _b === void 0 ? void 0 : _b.setRouteInfoForKeepAliveApp();
        }
        // dispatch afterShow event to micro-app
        dispatchCustomEventToMicroApp(this, 'appstate-change', {
            appState: 'aftershow',
        });
        // dispatch afterShow event to base app
        dispatchLifecyclesEvent(this.container, this.name, lifeCycles.AFTERSHOW);
    }
    /**
     * app rendering error
     * @param e Error
     */
    onerror(e) {
        // dispatch state event to micro app
        dispatchCustomEventToMicroApp(this, 'statechange', {
            appState: appStates.LOAD_FAILED
        });
        dispatchLifecyclesEvent(this.container, this.name, lifeCycles.ERROR, e);
    }
    /**
     * Parse htmlString to DOM
     * NOTE: iframe sandbox will use DOMParser of iframeWindow, with sandbox will use DOMParser of base app
     * @param htmlString DOMString
     * @returns parsed DOM
     */
    parseHtmlString(htmlString) {
        var _a;
        const DOMParser = ((_a = this.sandBox) === null || _a === void 0 ? void 0 : _a.proxyWindow) ? this.sandBox.proxyWindow.DOMParser
            : globalEnv.rawWindow.DOMParser;
        return (new DOMParser()).parseFromString(htmlString, 'text/html').body;
    }
    /**
     * clone origin elements to target
     * @param target Accept cloned elements
     * @param origin Cloned element
     * @param deep deep clone or transfer dom
     */
    cloneContainer(target, origin, deep) {
        // 在基座接受到afterhidden方法后立即执行unmount，彻底destroy应用时，因为unmount时同步执行，所以this.container为null后才执行cloneContainer
        if (origin && target) {
            target.innerHTML = '';
            Array.from(deep ? this.parseHtmlString(origin.innerHTML).childNodes : origin.childNodes).forEach((node) => {
                target.appendChild(node);
            });
        }
        return target;
    }
    /**
     * Scene:
     *  1. create app
     *  2. remount of default mode with iframe sandbox
     *    In default mode with iframe sandbox, unmount app will delete iframeElement & sandBox, and create sandBox when mount again, used to solve the problem that module script cannot be execute when append it again
     */
    createSandbox() {
        if (this.useSandbox && !this.sandBox) {
            this.sandBox = this.iframe ? new IframeSandbox(this.name, this.url) : new WithSandBox(this.name, this.url);
        }
    }
    // set app state
    setAppState(state) {
        var _a;
        this.state = state;
        // set window.__MICRO_APP_STATE__
        (_a = this.sandBox) === null || _a === void 0 ? void 0 : _a.setStaticAppState(state);
    }
    // get app state
    getAppState() {
        return this.state;
    }
    // set keep-alive state
    setKeepAliveState(state) {
        this.keepAliveState = state;
    }
    // get keep-alive state
    getKeepAliveState() {
        return this.keepAliveState;
    }
    // is app unmounted
    isUnmounted() {
        return appStates.UNMOUNT === this.state;
    }
    // is app already hidden
    isHidden() {
        return keepAliveStates.KEEP_ALIVE_HIDDEN === this.keepAliveState;
    }
    getMicroAppGlobalHook(eventName) {
        var _a, _b;
        const listener = (_b = (_a = this.sandBox) === null || _a === void 0 ? void 0 : _a.proxyWindow) === null || _b === void 0 ? void 0 : _b[eventName];
        return isFunction(listener) ? listener : null;
    }
    querySelector(selectors) {
        return this.container ? globalEnv.rawElementQuerySelector.call(this.container, selectors) : null;
    }
    querySelectorAll(selectors) {
        return this.container ? globalEnv.rawElementQuerySelectorAll.call(this.container, selectors) : [];
    }
    /**
     * NOTE:
     * 1. If the iframe sandbox no longer enforces the use of inline mode in the future, the way getElementsByTagName retrieves the script from the iframe by default needs to be changed, because in non inline mode, the script in the iframe may be empty
     * @param inline inline mode config
     */
    getInlineModeState(inline) {
        var _a;
        return (_a = (this.iframe || inline)) !== null && _a !== void 0 ? _a : false;
    }
}
// iframe route mode
function isIframeSandbox(appName) {
    var _a, _b;
    return (_b = (_a = appInstanceMap.get(appName)) === null || _a === void 0 ? void 0 : _a.iframe) !== null && _b !== void 0 ? _b : false;
}

// Record element and map element
const dynamicElementInMicroAppMap = new WeakMap();
// Get the map element
function getMappingNode(node) {
    var _a;
    return (_a = dynamicElementInMicroAppMap.get(node)) !== null && _a !== void 0 ? _a : node;
}
/**
 * Process the new node and format the style, link and script element
 * @param child new node
 * @param app app
 */
function handleNewNode(child, app) {
    if (dynamicElementInMicroAppMap.has(child)) {
        return dynamicElementInMicroAppMap.get(child);
    }
    else if (isStyleElement(child)) {
        if (child.hasAttribute('exclude')) {
            const replaceComment = document.createComment('style element with exclude attribute ignored by micro-app');
            dynamicElementInMicroAppMap.set(child, replaceComment);
            return replaceComment;
        }
        else if (app.scopecss && !child.hasAttribute('ignore')) {
            return scopedCSS(child, app);
        }
        return child;
    }
    else if (isLinkElement(child)) {
        if (child.hasAttribute('exclude') || checkExcludeUrl(child.getAttribute('href'), app.name)) {
            const linkReplaceComment = document.createComment('link element with exclude attribute ignored by micro-app');
            dynamicElementInMicroAppMap.set(child, linkReplaceComment);
            return linkReplaceComment;
        }
        else if (child.hasAttribute('ignore') ||
            checkIgnoreUrl(child.getAttribute('href'), app.name) ||
            (child.href &&
                isFunction(microApp.options.excludeAssetFilter) &&
                microApp.options.excludeAssetFilter(child.href))) {
            return child;
        }
        const { address, linkInfo, replaceComment } = extractLinkFromHtml(child, null, app, true);
        if (address && linkInfo) {
            const replaceStyle = formatDynamicLink(address, app, linkInfo, child);
            dynamicElementInMicroAppMap.set(child, replaceStyle);
            return replaceStyle;
        }
        else if (replaceComment) {
            dynamicElementInMicroAppMap.set(child, replaceComment);
            return replaceComment;
        }
        return child;
    }
    else if (isScriptElement(child)) {
        if (child.src &&
            isFunction(microApp.options.excludeAssetFilter) &&
            microApp.options.excludeAssetFilter(child.src)) {
            return child;
        }
        const { replaceComment, address, scriptInfo } = extractScriptElement(child, null, app, true) || {};
        if (address && scriptInfo) {
            // remote script or inline script
            const replaceElement = scriptInfo.isExternal ? runDynamicRemoteScript(address, app, scriptInfo, child) : runDynamicInlineScript(address, app, scriptInfo);
            dynamicElementInMicroAppMap.set(child, replaceElement);
            return replaceElement;
        }
        else if (replaceComment) {
            dynamicElementInMicroAppMap.set(child, replaceComment);
            return replaceComment;
        }
        return child;
    }
    return child;
}
/**
 * Handle the elements inserted into head and body, and execute normally in other cases
 * @param app app
 * @param method raw method
 * @param parent parent node
 * @param targetNode target node
 * @param passiveNode second param of insertBefore and replaceChild
 */
function invokePrototypeMethod(app, rawMethod, parent, targetNode, passiveNode) {
    const hijackParent = getHijackParent(parent, targetNode, app);
    if (hijackParent) {
        /**
         * If parentNode is <micro-app-body>, return rawDocument.body
         * Scenes:
         *  1. element-ui@2/lib/utils/vue-popper.js
         *    if (this.popperElm.parentNode === document.body) ...
         * WARNING:
         *  1. When operate child from parentNode async, may have been unmount
         *    e.g. target.parentNode.remove(target)
         * ISSUE:
         *  1. https://github.com/micro-zoe/micro-app/issues/739
         *    Solution: Return the true value when node not in document
         */
        if (!isIframeSandbox(app.name) &&
            isMicroAppBody(hijackParent) &&
            rawMethod !== globalEnv.rawRemoveChild) {
            const descriptor = Object.getOwnPropertyDescriptor(targetNode, 'parentNode');
            if ((!descriptor || descriptor.configurable) && !targetNode.__MICRO_APP_HAS_DPN__) {
                rawDefineProperties(targetNode, {
                    parentNode: {
                        configurable: true,
                        get() {
                            var _a, _b;
                            const result = globalEnv.rawParentNodeDesc.get.call(this);
                            if (isMicroAppBody(result) && app.container) {
                                // TODO: remove getRootElementParentNode
                                return ((_b = (_a = microApp.options).getRootElementParentNode) === null || _b === void 0 ? void 0 : _b.call(_a, this, app.name)) || document.body;
                            }
                            return result;
                        },
                    },
                    __MICRO_APP_HAS_DPN__: {
                        configurable: true,
                        get: () => true,
                    }
                });
            }
        }
        if ((true) &&
            isIFrameElement(targetNode) &&
            rawMethod === globalEnv.rawAppendChild) {
        }
        /**
         * 1. If passiveNode exists, it must be insertBefore or replaceChild
         * 2. When removeChild, targetNode may not be in microAppHead or head
         * NOTE:
         *  1. If passiveNode not in hijackParent, insertBefore replaceChild will be degraded to appendChild
         *    E.g: document.head.replaceChild(targetNode, document.scripts[0])
         *  2. If passiveNode not in hijackParent but in parent and method is insertBefore, try insert it into the position corresponding to hijackParent
         *    E.g: document.head.insertBefore(targetNode, document.head.childNodes[0])
         *    ISSUE: https://github.com/micro-zoe/micro-app/issues/1071
         */
        if (passiveNode && !hijackParent.contains(passiveNode)) {
            if (rawMethod === globalEnv.rawInsertBefore && parent.contains(passiveNode)) {
                const indexOfParent = Array.from(parent.childNodes).indexOf(passiveNode);
                if (hijackParent.childNodes[indexOfParent]) {
                    return invokeRawMethod(rawMethod, hijackParent, targetNode, hijackParent.childNodes[indexOfParent], app);
                }
            }
            return globalEnv.rawAppendChild.call(hijackParent, targetNode);
        }
        else if (rawMethod === globalEnv.rawRemoveChild && !hijackParent.contains(targetNode)) {
            if (parent.contains(targetNode)) {
                return rawMethod.call(targetNode.parentElement, targetNode);
            }
            return targetNode;
        }
        return invokeRawMethod(rawMethod, hijackParent, targetNode, passiveNode, app);
    }
    return invokeRawMethod(rawMethod, parent, targetNode, passiveNode, app);
}
// head/body map to micro-app-head/micro-app-body
function getHijackParent(parent, targetNode, app) {
    if (app) {
        if (parent === document.head) {
            if (app.iframe && isScriptElement(targetNode)) {
                return app.sandBox.microHead;
            }
            return app.querySelector('micro-app-head');
        }
        if (parent === document.body || parent === document.body.parentNode) {
            if (app.iframe && isScriptElement(targetNode)) {
                return app.sandBox.microBody;
            }
            return app.querySelector('micro-app-body');
        }
        if (app.iframe && isScriptElement(targetNode)) {
            return app.sandBox.microBody;
        }
    }
    return null;
}
function invokeRawMethod(rawMethod, parent, targetNode, passiveNode, app) {
    if (isPendMethod(rawMethod)) {
        /**
         * In iframe sandbox, script will pend to iframe.body, so we should reset rawMethod, because:
         * Element.prototype.append === DocumentFragment.prototype.append ==> false
         * Element.prototype.prepend === DocumentFragment.prototype.prepend ==> false
         */
        if ((app === null || app === void 0 ? void 0 : app.iframe) && isScriptElement(targetNode)) {
            if (rawMethod === globalEnv.rawFragmentAppend) {
                rawMethod = globalEnv.rawAppend;
            }
            else if (rawMethod === globalEnv.rawFragmentPrepend) {
                rawMethod = globalEnv.rawPrepend;
            }
        }
        return rawMethod.call(parent, targetNode);
    }
    return rawMethod.call(parent, targetNode, passiveNode);
}
function isPendMethod(method) {
    return (method === globalEnv.rawAppend ||
        method === globalEnv.rawPrepend ||
        method === globalEnv.rawFragmentAppend ||
        method === globalEnv.rawFragmentPrepend);
}
/**
 * Attempt to complete the static resource address again before insert the node
 * @param app app instance
 * @param newChild target node
 */
function completePathDynamic(app, newChild) {
    if (isElement(newChild)) {
        if (/^(img|script)$/i.test(newChild.tagName)) {
            if (newChild.hasAttribute('src')) {
                globalEnv.rawSetAttribute.call(newChild, 'src', CompletionPath(newChild.getAttribute('src'), app.url));
            }
            if (newChild.hasAttribute('srcset')) {
                globalEnv.rawSetAttribute.call(newChild, 'srcset', CompletionPath(newChild.getAttribute('srcset'), app.url));
            }
        }
        else if ((/^(link|image)$/i.test(newChild.tagName) && newChild.hasAttribute('href')) ||
            // If it is the anchor tag,eg. <a href="#xxx"/>, the path will not be completed
            (/^(a)$/i.test(newChild.tagName) && newChild.hasAttribute('href') && !/^#/.test(newChild.getAttribute('href') || ''))) {
            globalEnv.rawSetAttribute.call(newChild, 'href', CompletionPath(newChild.getAttribute('href'), app.url));
        }
    }
}
/**
 * method of handle new node
 * @param parent parent node
 * @param newChild new node
 * @param passiveNode passive node
 * @param rawMethod method
 */
function commonElementHandler(parent, newChild, passiveNode, rawMethod) {
    const currentAppName = getCurrentAppName();
    if (isNode(newChild) &&
        !newChild.__PURE_ELEMENT__ &&
        (newChild.__MICRO_APP_NAME__ ||
            currentAppName)) {
        updateElementInfo(newChild, newChild.__MICRO_APP_NAME__ || currentAppName);
        const app = appInstanceMap.get(newChild.__MICRO_APP_NAME__);
        if (app === null || app === void 0 ? void 0 : app.container) {
            if (isStyleElement(newChild)) {
                parent.getRootNode() instanceof ShadowRoot && newChild.setAttribute('ignore', 'true');
            }
            completePathDynamic(app, newChild);
            return invokePrototypeMethod(app, rawMethod, parent, handleNewNode(newChild, app), passiveNode && getMappingNode(passiveNode));
        }
    }
    return invokeRawMethod(rawMethod, parent, newChild, passiveNode);
}
/**
 * Rewrite element prototype method
 */
function patchElementAndDocument() {
    patchDocument$2();
    const rawRootElement = globalEnv.rawRootElement;
    const rawRootNode = globalEnv.rawRootNode;
    const rawDocumentFragment = globalEnv.rawDocumentFragment;
    // prototype methods of add element👇
    rawRootNode.prototype.appendChild = function appendChild(newChild) {
        return commonElementHandler(this, newChild, null, globalEnv.rawAppendChild);
    };
    rawRootNode.prototype.insertBefore = function insertBefore(newChild, refChild) {
        return commonElementHandler(this, newChild, refChild, globalEnv.rawInsertBefore);
    };
    rawRootNode.prototype.replaceChild = function replaceChild(newChild, oldChild) {
        return commonElementHandler(this, newChild, oldChild, globalEnv.rawReplaceChild);
    };
    // prototype methods of delete element👇
    rawRootNode.prototype.removeChild = function removeChild(oldChild) {
        if (oldChild === null || oldChild === void 0 ? void 0 : oldChild.__MICRO_APP_NAME__) {
            const app = appInstanceMap.get(oldChild.__MICRO_APP_NAME__);
            if (app === null || app === void 0 ? void 0 : app.container) {
                return invokePrototypeMethod(app, globalEnv.rawRemoveChild, this, getMappingNode(oldChild));
            }
            try {
                return globalEnv.rawRemoveChild.call(this, oldChild);
            }
            catch (_a) {
                return ((oldChild === null || oldChild === void 0 ? void 0 : oldChild.parentNode) && globalEnv.rawRemoveChild.call(oldChild.parentNode, oldChild));
            }
        }
        return globalEnv.rawRemoveChild.call(this, oldChild);
    };
    rawDocumentFragment.prototype.append = rawRootElement.prototype.append = function append(...nodes) {
        let i = 0;
        while (i < nodes.length) {
            let node = nodes[i];
            node = isNode(node) ? node : globalEnv.rawCreateTextNode.call(globalEnv.rawDocument, node);
            commonElementHandler(this, markElement(node), null, isDocumentFragment(this) ? globalEnv.rawFragmentAppend : globalEnv.rawAppend);
            i++;
        }
    };
    rawDocumentFragment.prototype.prepend = rawRootElement.prototype.prepend = function prepend(...nodes) {
        let i = nodes.length;
        let target = globalEnv.rawPrepend;
        if (isDocumentFragment(this) || isDocumentShadowRoot(this)) {
            target = globalEnv.rawFragmentPrepend;
        }
        while (i > 0) {
            let node = nodes[i - 1];
            node = isNode(node) ? node : globalEnv.rawCreateTextNode.call(globalEnv.rawDocument, node);
            commonElementHandler(this, markElement(node), null, target);
            i--;
        }
    };
    /**
     * The insertAdjacentElement method of the Element interface inserts a given element node at a given position relative to the element it is invoked upon.
     * NOTE:
     *  1. parameter 2 of insertAdjacentElement must type 'Element'
     */
    rawRootElement.prototype.insertAdjacentElement = function (where, element) {
        var _a;
        if ((element === null || element === void 0 ? void 0 : element.__MICRO_APP_NAME__) && isElement(element)) {
            const app = appInstanceMap.get(element.__MICRO_APP_NAME__);
            if (app === null || app === void 0 ? void 0 : app.container) {
                const processedEle = handleNewNode(element, app);
                if (!isElement(processedEle))
                    return element;
                const realParent = (_a = getHijackParent(this, processedEle, app)) !== null && _a !== void 0 ? _a : this;
                return globalEnv.rawInsertAdjacentElement.call(realParent, where, processedEle);
            }
        }
        return globalEnv.rawInsertAdjacentElement.call(this, where, element);
    };
    /**
     * document.body(head).querySelector(querySelectorAll) hijack to microAppBody(microAppHead).querySelector(querySelectorAll)
     * NOTE:
     *  1. May cause some problems!
     *  2. Add config options?
     */
    function getElementQueryTarget(targetNode) {
        const currentAppName = getIframeCurrentAppName() || getCurrentAppName();
        if ((targetNode === document.body || targetNode === document.head) && currentAppName) {
            const app = appInstanceMap.get(currentAppName);
            if (app === null || app === void 0 ? void 0 : app.container) {
                if (targetNode === document.body) {
                    return app.querySelector('micro-app-body');
                }
                else if (targetNode === document.head) {
                    return app.querySelector('micro-app-head');
                }
            }
        }
        return targetNode;
    }
    /**
     * In iframe sandbox, script will render to iframe instead of micro-app-body
     * So when query elements, we need to search both micro-app and iframe
     * @param isEmpty get empty result
     * @param targetNode targetNode element
     * @param result origin result
     * @param selectors selectors
     * @param methodName querySelector or querySelectorAll
     */
    function getElementQueryResult(isEmpty, targetNode, result, selectors, methodName) {
        if (isEmpty) {
            const currentAppName = getIframeCurrentAppName() || getCurrentAppName();
            if (currentAppName && isIframeSandbox(currentAppName)) {
                const app = appInstanceMap.get(currentAppName);
                if (isMicroAppHead(targetNode)) {
                    return app.sandBox.microHead[methodName](selectors);
                }
                if (isMicroAppBody(targetNode)) {
                    return app.sandBox.microBody[methodName](selectors);
                }
            }
        }
        return result;
    }
    rawRootElement.prototype.querySelector = function querySelector(selectors) {
        var _a;
        const _this = (_a = getElementQueryTarget(this)) !== null && _a !== void 0 ? _a : this;
        const result = globalEnv.rawElementQuerySelector.call(_this, selectors);
        return getElementQueryResult(isNull(result) && _this !== this, _this, result, selectors, 'querySelector');
    };
    rawRootElement.prototype.querySelectorAll = function querySelectorAll(selectors) {
        var _a;
        const _this = (_a = getElementQueryTarget(this)) !== null && _a !== void 0 ? _a : this;
        const result = globalEnv.rawElementQuerySelectorAll.call(_this, selectors);
        return getElementQueryResult(!result.length && _this !== this, _this, result, selectors, 'querySelectorAll');
    };
    // rewrite setAttribute, complete resource address
    rawRootElement.prototype.setAttribute = function setAttribute(key, value) {
        var _a;
        if (/^micro-app(-\S+)?/i.test(this.tagName) &&
            key === 'data' &&
            this.setAttribute !== rawRootElement.prototype.setAttribute) {
            this.setAttribute(key, value);
        }
        else {
            const appName = this.__MICRO_APP_NAME__ || getCurrentAppName();
            if (appName &&
                appInstanceMap.has(appName) &&
                (((key === 'src' || key === 'srcset') && /^(img|script|video|audio|source|embed)$/i.test(this.tagName)) ||
                    (key === 'href' && /^(link|image)$/i.test(this.tagName)) ||
                    // If it is the anchor tag,eg. <a href="#xxx"/>, the path will not be completed
                    (key === 'href' && /^(a)$/i.test(this.tagName) && !/^#/.test(value)))) {
                const app = appInstanceMap.get(appName);
                value = CompletionPath(value, app.url);
            }
            globalEnv.rawSetAttribute.call(this, key, value);
            if (isImageElement(this) || isVideoElement(this) || isAudioElement(this)) {
                let includeCrossOrigin = false;
                if (((_a = microApp === null || microApp === void 0 ? void 0 : microApp.options) === null || _a === void 0 ? void 0 : _a.includeCrossOrigin) && isFunction(microApp.options.includeCrossOrigin)) {
                    includeCrossOrigin = microApp.options.includeCrossOrigin(value);
                }
                // @ts-ignore
                includeCrossOrigin && (node.crossOrigin = 'anonymous');
            }
        }
    };
    /**
     * TODO: 兼容直接通过img.src等操作设置的资源
     * NOTE:
     *  1. 卸载时恢复原始值
     *  2. 循环嵌套的情况
     *  3. 放在global_env中统一处理
     *  4. 是否和completePathDynamic的作用重复？
     */
    // const protoAttrList: Array<[HTMLElement, string]> = [
    //   [HTMLImageElement.prototype, 'src'],
    //   [HTMLScriptElement.prototype, 'src'],
    //   [HTMLLinkElement.prototype, 'href'],
    // ]
    // protoAttrList.forEach(([target, attr]) => {
    //   const { enumerable, configurable, get, set } = Object.getOwnPropertyDescriptor(target, attr) || {
    //     enumerable: true,
    //     configurable: true,
    //   }
    //   rawDefineProperty(target, attr, {
    //     enumerable,
    //     configurable,
    //     get: function () {
    //       return get?.call(this)
    //     },
    //     set: function (value) {
    //       const currentAppName = this.__MICRO_APP_NAME__ || getCurrentAppName()
    //       if (currentAppName && appInstanceMap.has(currentAppName)) {
    //         const app = appInstanceMap.get(currentAppName)
    //         value = CompletionPath(value, app!.url)
    //       }
    //       set?.call(this, value)
    //     },
    //   })
    // })
    rawDefineProperty(rawRootNode.prototype, 'parentNode', {
        configurable: true,
        enumerable: true,
        get() {
            var _a, _b, _c;
            /**
             * hijack parentNode of html for with sandbox
             * Scenes:
             *  1. element-ui@2/lib/utils/popper.js
             *    // root is child app window, so root.document is proxyDocument or microDocument
             *    if (element.parentNode === root.document) ...
            */
            const currentAppName = getIframeCurrentAppName() || getCurrentAppName();
            if (currentAppName && this === globalEnv.rawDocument.firstElementChild) {
                const microDocument = (_c = (_b = (_a = appInstanceMap.get(currentAppName)) === null || _a === void 0 ? void 0 : _a.sandBox) === null || _b === void 0 ? void 0 : _b.proxyWindow) === null || _c === void 0 ? void 0 : _c.document;
                if (microDocument)
                    return microDocument;
            }
            // NOTE: run after hijack html.parentNode
            const result = globalEnv.rawParentNodeDesc.get.call(this);
            /**
             * If parentNode is <micro-app-body>, return rawDocument.body
             * Scenes:
             *  1. element-ui@2/lib/utils/vue-popper.js
             *    if (this.popperElm.parentNode === document.body) ...
             * WARNING:
             *  Will it cause other problems ?
             *  e.g. target.parentNode.remove(target)
             * BUG:
             *  1. vue2 umdMode, throw error when render again (<div id='app'></div> will be deleted when render again ) -- Abandon this way at 2023.2.28 before v1.0.0-beta.0, it will cause vue2 throw error when render again
             */
            // if (isMicroAppBody(result) && appInstanceMap.get(this.__MICRO_APP_NAME__)?.container) {
            //   return document.body
            // }
            return result;
        },
    });
    rawDefineProperty(rawRootElement.prototype, 'innerHTML', {
        configurable: true,
        enumerable: true,
        get() {
            return globalEnv.rawInnerHTMLDesc.get.call(this);
        },
        set(code) {
            globalEnv.rawInnerHTMLDesc.set.call(this, code);
            const currentAppName = this.__MICRO_APP_NAME__ || getIframeCurrentAppName() || getCurrentAppName();
            Array.from(this.children).forEach((child) => {
                if (isElement(child) && currentAppName) {
                    updateElementInfo(child, currentAppName);
                }
            });
        }
    });
    // patch cloneNode
    rawRootNode.prototype.cloneNode = function cloneNode(deep) {
        const clonedNode = globalEnv.rawCloneNode.call(this, deep);
        return updateElementInfo(clonedNode, this.__MICRO_APP_NAME__);
    };
}
/**
 * Mark the newly created element in the micro application
 * @param element new element
 */
function markElement(element) {
    return updateElementInfo(element, getCurrentAppName());
}
// methods of document
function patchDocument$2() {
    const rawDocument = globalEnv.rawDocument;
    const rawRootDocument = globalEnv.rawRootDocument;
    function getBindTarget(target) {
        return isProxyDocument(target) ? rawDocument : target;
    }
    // create element 👇
    rawRootDocument.prototype.createElement = function createElement(tagName, options) {
        const element = globalEnv.rawCreateElement.call(getBindTarget(this), tagName, options);
        return markElement(element);
    };
    rawRootDocument.prototype.createElementNS = function createElementNS(namespaceURI, name, options) {
        const element = globalEnv.rawCreateElementNS.call(getBindTarget(this), namespaceURI, name, options);
        return markElement(element);
    };
    // TODO: 放开
    // rawRootDocument.prototype.createTextNode = function createTextNode (data: string): Text {
    //   const element = globalEnv.rawCreateTextNode.call(getBindTarget(this), data)
    //   return markElement(element)
    // }
    rawRootDocument.prototype.createDocumentFragment = function createDocumentFragment() {
        const element = globalEnv.rawCreateDocumentFragment.call(getBindTarget(this));
        return markElement(element);
    };
    rawRootDocument.prototype.createComment = function createComment(data) {
        const element = globalEnv.rawCreateComment.call(getBindTarget(this), data);
        return markElement(element);
    };
    // query element👇
    function querySelector(selectors) {
        var _a, _b;
        const _this = getBindTarget(this);
        const currentAppName = getCurrentAppName();
        if (!currentAppName ||
            !selectors ||
            isUniqueElement(selectors) ||
            // ISSUE: https://github.com/micro-zoe/micro-app/issues/56
            rawDocument !== _this) {
            return globalEnv.rawQuerySelector.call(_this, selectors);
        }
        return (_b = (_a = appInstanceMap.get(currentAppName)) === null || _a === void 0 ? void 0 : _a.querySelector(selectors)) !== null && _b !== void 0 ? _b : null;
    }
    function querySelectorAll(selectors) {
        var _a, _b;
        const _this = getBindTarget(this);
        const currentAppName = getCurrentAppName();
        if (!currentAppName ||
            !selectors ||
            isUniqueElement(selectors) ||
            rawDocument !== _this) {
            return globalEnv.rawQuerySelectorAll.call(_this, selectors);
        }
        return (_b = (_a = appInstanceMap.get(currentAppName)) === null || _a === void 0 ? void 0 : _a.querySelectorAll(selectors)) !== null && _b !== void 0 ? _b : [];
    }
    rawRootDocument.prototype.querySelector = querySelector;
    rawRootDocument.prototype.querySelectorAll = querySelectorAll;
    rawRootDocument.prototype.getElementById = function getElementById(key) {
        const _this = getBindTarget(this);
        if (!getCurrentAppName() || isInvalidQuerySelectorKey(key)) {
            return globalEnv.rawGetElementById.call(_this, key);
        }
        try {
            return querySelector.call(_this, `#${key}`);
        }
        catch (_a) {
            return globalEnv.rawGetElementById.call(_this, key);
        }
    };
    rawRootDocument.prototype.getElementsByClassName = function getElementsByClassName(key) {
        const _this = getBindTarget(this);
        if (!getCurrentAppName() || isInvalidQuerySelectorKey(key)) {
            return globalEnv.rawGetElementsByClassName.call(_this, key);
        }
        try {
            return querySelectorAll.call(_this, `.${key}`);
        }
        catch (_a) {
            return globalEnv.rawGetElementsByClassName.call(_this, key);
        }
    };
    rawRootDocument.prototype.getElementsByTagName = function getElementsByTagName(key) {
        var _a;
        const _this = getBindTarget(this);
        const currentAppName = getCurrentAppName();
        if (!currentAppName ||
            isUniqueElement(key) ||
            isInvalidQuerySelectorKey(key) ||
            (!((_a = appInstanceMap.get(currentAppName)) === null || _a === void 0 ? void 0 : _a.inline) && /^script$/i.test(key))) {
            return globalEnv.rawGetElementsByTagName.call(_this, key);
        }
        try {
            return querySelectorAll.call(_this, key);
        }
        catch (_b) {
            return globalEnv.rawGetElementsByTagName.call(_this, key);
        }
    };
    rawRootDocument.prototype.getElementsByName = function getElementsByName(key) {
        const _this = getBindTarget(this);
        if (!getCurrentAppName() || isInvalidQuerySelectorKey(key)) {
            return globalEnv.rawGetElementsByName.call(_this, key);
        }
        try {
            return querySelectorAll.call(_this, `[name=${key}]`);
        }
        catch (_a) {
            return globalEnv.rawGetElementsByName.call(_this, key);
        }
    };
}
function releasePatchDocument() {
    const rawRootDocument = globalEnv.rawRootDocument;
    rawRootDocument.prototype.createElement = globalEnv.rawCreateElement;
    rawRootDocument.prototype.createElementNS = globalEnv.rawCreateElementNS;
    rawRootDocument.prototype.createDocumentFragment = globalEnv.rawCreateDocumentFragment;
    rawRootDocument.prototype.querySelector = globalEnv.rawQuerySelector;
    rawRootDocument.prototype.querySelectorAll = globalEnv.rawQuerySelectorAll;
    rawRootDocument.prototype.getElementById = globalEnv.rawGetElementById;
    rawRootDocument.prototype.getElementsByClassName = globalEnv.rawGetElementsByClassName;
    rawRootDocument.prototype.getElementsByTagName = globalEnv.rawGetElementsByTagName;
    rawRootDocument.prototype.getElementsByName = globalEnv.rawGetElementsByName;
}
// release patch
function releasePatchElementAndDocument() {
    removeDomScope();
    releasePatchDocument();
    const rawRootElement = globalEnv.rawRootElement;
    const rawRootNode = globalEnv.rawRootNode;
    rawRootNode.prototype.appendChild = globalEnv.rawAppendChild;
    rawRootNode.prototype.insertBefore = globalEnv.rawInsertBefore;
    rawRootNode.prototype.replaceChild = globalEnv.rawReplaceChild;
    rawRootNode.prototype.removeChild = globalEnv.rawRemoveChild;
    rawRootNode.prototype.cloneNode = globalEnv.rawCloneNode;
    rawRootElement.prototype.append = globalEnv.rawAppend;
    rawRootElement.prototype.prepend = globalEnv.rawPrepend;
    rawRootElement.prototype.querySelector = globalEnv.rawElementQuerySelector;
    rawRootElement.prototype.querySelectorAll = globalEnv.rawElementQuerySelectorAll;
    rawRootElement.prototype.setAttribute = globalEnv.rawSetAttribute;
    rawDefineProperty(rawRootNode.prototype, 'parentNode', globalEnv.rawParentNodeDesc);
    rawDefineProperty(rawRootElement.prototype, 'innerHTML', globalEnv.rawInnerHTMLDesc);
}
// Set the style of micro-app-head and micro-app-body
let hasRejectMicroAppStyle = false;
function rejectMicroAppStyle() {
    if (!hasRejectMicroAppStyle) {
        hasRejectMicroAppStyle = true;
        const style = pureCreateElement('style');
        globalEnv.rawSetAttribute.call(style, 'type', 'text/css');
        style.textContent = `\n${microApp.tagName}, micro-app-body { display: block; } \nmicro-app-head { display: none; }`;
        globalEnv.rawDocument.head.appendChild(style);
    }
}

const globalEnv = {
    // active sandbox count
    activeSandbox: 0,
};
/**
 * Note loop nesting
 * Only prototype or unique values can be put here
 */
function initGlobalEnv() {
    if (isBrowser) {
        const rawWindow = window.rawWindow || Function('return window')();
        const rawDocument = window.rawDocument || Function('return document')();
        const rawRootDocument = rawWindow.Document || Function('return Document')();
        const rawRootElement = rawWindow.Element;
        const rawRootNode = rawWindow.Node;
        const rawRootEventTarget = rawWindow.EventTarget;
        const rawDocumentFragment = rawWindow.DocumentFragment;
        // save patch raw methods, pay attention to this binding
        const rawAppendChild = rawRootNode.prototype.appendChild;
        const rawInsertBefore = rawRootNode.prototype.insertBefore;
        const rawReplaceChild = rawRootNode.prototype.replaceChild;
        const rawRemoveChild = rawRootNode.prototype.removeChild;
        const rawSetAttribute = rawRootElement.prototype.setAttribute;
        const rawAppend = rawRootElement.prototype.append;
        const rawPrepend = rawRootElement.prototype.prepend;
        const rawFragmentAppend = rawDocumentFragment.prototype.append;
        const rawFragmentPrepend = rawDocumentFragment.prototype.prepend;
        const rawCloneNode = rawRootNode.prototype.cloneNode;
        const rawElementQuerySelector = rawRootElement.prototype.querySelector;
        const rawElementQuerySelectorAll = rawRootElement.prototype.querySelectorAll;
        const rawInsertAdjacentElement = rawRootElement.prototype.insertAdjacentElement;
        const rawInnerHTMLDesc = Object.getOwnPropertyDescriptor(rawRootElement.prototype, 'innerHTML');
        const rawParentNodeDesc = Object.getOwnPropertyDescriptor(rawRootNode.prototype, 'parentNode');
        // Document proto methods
        const rawCreateElement = rawRootDocument.prototype.createElement;
        const rawCreateElementNS = rawRootDocument.prototype.createElementNS;
        const rawCreateTextNode = rawRootDocument.prototype.createTextNode;
        const rawCreateDocumentFragment = rawRootDocument.prototype.createDocumentFragment;
        const rawCreateComment = rawRootDocument.prototype.createComment;
        const rawQuerySelector = rawRootDocument.prototype.querySelector;
        const rawQuerySelectorAll = rawRootDocument.prototype.querySelectorAll;
        const rawGetElementById = rawRootDocument.prototype.getElementById;
        const rawGetElementsByClassName = rawRootDocument.prototype.getElementsByClassName;
        const rawGetElementsByTagName = rawRootDocument.prototype.getElementsByTagName;
        const rawGetElementsByName = rawRootDocument.prototype.getElementsByName;
        // TODO: 将ImageProxy移出去
        const ImageProxy = new Proxy(rawWindow.Image, {
            construct(Target, args) {
                return updateElementInfo(new Target(...args), getCurrentAppName());
            },
        });
        /**
         * save effect raw methods
         * pay attention to this binding, especially setInterval, setTimeout, clearInterval, clearTimeout
         */
        const rawSetInterval = rawWindow.setInterval;
        const rawSetTimeout = rawWindow.setTimeout;
        const rawClearInterval = rawWindow.clearInterval;
        const rawClearTimeout = rawWindow.clearTimeout;
        const rawPushState = rawWindow.history.pushState;
        const rawReplaceState = rawWindow.history.replaceState;
        const rawAddEventListener = rawRootEventTarget.prototype.addEventListener;
        const rawRemoveEventListener = rawRootEventTarget.prototype.removeEventListener;
        const rawDispatchEvent = rawRootEventTarget.prototype.dispatchEvent;
        // mark current application as base application
        window.__MICRO_APP_BASE_APPLICATION__ = true;
        assign(globalEnv, {
            supportModuleScript: isSupportModuleScript(),
            // common global vars
            rawWindow,
            rawDocument,
            rawRootDocument,
            rawRootElement,
            rawRootNode,
            rawDocumentFragment,
            // source/patch
            rawSetAttribute,
            rawAppendChild,
            rawInsertBefore,
            rawReplaceChild,
            rawRemoveChild,
            rawAppend,
            rawPrepend,
            rawFragmentAppend,
            rawFragmentPrepend,
            rawCloneNode,
            rawElementQuerySelector,
            rawElementQuerySelectorAll,
            rawInsertAdjacentElement,
            rawInnerHTMLDesc,
            rawParentNodeDesc,
            rawCreateElement,
            rawCreateElementNS,
            rawCreateDocumentFragment,
            rawCreateTextNode,
            rawCreateComment,
            rawQuerySelector,
            rawQuerySelectorAll,
            rawGetElementById,
            rawGetElementsByClassName,
            rawGetElementsByTagName,
            rawGetElementsByName,
            ImageProxy,
            // sandbox/effect
            rawSetInterval,
            rawSetTimeout,
            rawClearInterval,
            rawClearTimeout,
            rawPushState,
            rawReplaceState,
            rawAddEventListener,
            rawRemoveEventListener,
            rawDispatchEvent,
        });
        // global effect
        rejectMicroAppStyle();
    }
}

/**
 * define element
 * @param tagName element name
*/
function defineElement(tagName) {
    class MicroAppElement extends HTMLElement {
        constructor() {
            super(...arguments);
            this.isWaiting = false;
            this.cacheData = null;
            this.connectedCount = 0;
            this.connectStateMap = new Map();
            this.appName = ''; // app name
            this.appUrl = ''; // app url
            this.ssrUrl = ''; // html path in ssr mode
            this.version = version;
            /**
             * handle for change of name an url after element init
             */
            this.handleAttributeUpdate = () => {
                this.isWaiting = false;
                const formatAttrName = formatAppName(this.getAttribute('name'));
                const formatAttrUrl = formatAppURL(this.getAttribute('url'), this.appName);
                if (this.legalAttribute('name', formatAttrName) && this.legalAttribute('url', formatAttrUrl)) {
                    const oldApp = appInstanceMap.get(formatAttrName);
                    /**
                     * If oldApp exist & appName is different, determine whether oldApp is running
                     */
                    if (formatAttrName !== this.appName && oldApp) {
                        if (!oldApp.isUnmounted() && !oldApp.isHidden() && !oldApp.isPrefetch) {
                            this.setAttribute('name', this.appName);
                            return logError(`app name conflict, an app named ${formatAttrName} is running`);
                        }
                    }
                    if (formatAttrName !== this.appName || formatAttrUrl !== this.appUrl) {
                        if (formatAttrName === this.appName) {
                            this.unmount(true, () => {
                                this.actionsForAttributeChange(formatAttrName, formatAttrUrl, oldApp);
                            });
                        }
                        else if (this.getKeepAliveModeResult()) {
                            this.handleHiddenKeepAliveApp();
                            this.actionsForAttributeChange(formatAttrName, formatAttrUrl, oldApp);
                        }
                        else {
                            this.unmount(false, () => {
                                this.actionsForAttributeChange(formatAttrName, formatAttrUrl, oldApp);
                            });
                        }
                    }
                }
                else if (formatAttrName !== this.appName) {
                    this.setAttribute('name', this.appName);
                }
            };
        }
        static get observedAttributes() {
            return ['name', 'url'];
        }
        // 👇 Configuration
        // name: app name
        // url: html address
        // shadowDom: use shadowDOM, default is false
        // destroy: whether delete cache resources when unmount, default is false
        // inline: whether js runs in inline script mode, default is false
        // disableScopecss: whether disable css scoped, default is false
        // disableSandbox: whether disable sandbox, default is false
        // baseRoute: route prefix, default is ''
        // keep-alive: open keep-alive mode
        connectedCallback() {
            /**
             * In FireFox, iframe Node.prototype will point to native Node.prototype after insert to document
             * If <micro-app>.prototype is not MicroAppElement.prototype, we should reset it
             */
            if (Object.getPrototypeOf(this) !== MicroAppElement.prototype) {
                Object.setPrototypeOf(this, MicroAppElement.prototype);
            }
            const cacheCount = ++this.connectedCount;
            this.connectStateMap.set(cacheCount, true);
            /**
             * In some special scenes, such as vue's keep-alive, the micro-app will be inserted and deleted twice in an instant
             * So we execute the mount method async and record connectState to prevent repeated rendering
             */
            const effectiveApp = this.appName && this.appUrl;
            defer(() => {
                if (this.connectStateMap.get(cacheCount)) {
                    dispatchLifecyclesEvent(this, this.appName, lifeCycles.CREATED);
                    /**
                     * If insert micro-app element without name or url, and set them in next action like angular,
                     * handleConnected will be executed twice, causing the app render repeatedly,
                     * so we only execute handleConnected() if url and name exist when connectedCallback
                     */
                    effectiveApp && this.handleConnected();
                }
            });
        }
        disconnectedCallback() {
            this.connectStateMap.set(this.connectedCount, false);
            this.handleDisconnected();
        }
        /**
         * Re render app from the command line
         * MicroAppElement.reload(destroy)
         */
        reload(destroy) {
            return new Promise((resolve) => {
                const handleAfterReload = () => {
                    this.removeEventListener(lifeCycles.MOUNTED, handleAfterReload);
                    this.removeEventListener(lifeCycles.AFTERSHOW, handleAfterReload);
                    resolve(true);
                };
                this.addEventListener(lifeCycles.MOUNTED, handleAfterReload);
                this.addEventListener(lifeCycles.AFTERSHOW, handleAfterReload);
                this.handleDisconnected(destroy, () => {
                    this.handleConnected();
                });
            });
        }
        /**
         * common action for unmount
         * @param destroy reload param
         */
        handleDisconnected(destroy = false, callback) {
            const app = appInstanceMap.get(this.appName);
            if (app && !app.isUnmounted() && !app.isHidden()) {
                // keep-alive
                if (this.getKeepAliveModeResult() && !destroy) {
                    this.handleHiddenKeepAliveApp(callback);
                }
                else {
                    this.unmount(destroy, callback);
                }
            }
        }
        attributeChangedCallback(attr, _oldVal, newVal) {
            if (this.legalAttribute(attr, newVal) &&
                this[attr === ObservedAttrName.NAME ? 'appName' : 'appUrl'] !== newVal) {
                if (attr === ObservedAttrName.URL && (!this.appUrl ||
                    !this.connectStateMap.get(this.connectedCount))) {
                    newVal = formatAppURL(newVal, this.appName);
                    if (!newVal) {
                        return logError(`Invalid attribute url ${newVal}`, this.appName);
                    }
                    this.appUrl = newVal;
                    this.handleInitialNameAndUrl();
                }
                else if (attr === ObservedAttrName.NAME && (!this.appName ||
                    !this.connectStateMap.get(this.connectedCount))) {
                    const formatNewName = formatAppName(newVal);
                    if (!formatNewName) {
                        return logError(`Invalid attribute name ${newVal}`, this.appName);
                    }
                    if (this.cacheData) {
                        microApp.setData(formatNewName, this.cacheData);
                        this.cacheData = null;
                    }
                    this.appName = formatNewName;
                    if (formatNewName !== newVal) {
                        this.setAttribute('name', this.appName);
                    }
                    this.handleInitialNameAndUrl();
                }
                else if (!this.isWaiting) {
                    this.isWaiting = true;
                    defer(this.handleAttributeUpdate);
                }
            }
        }
        // handle for connectedCallback run before attributeChangedCallback
        handleInitialNameAndUrl() {
            this.connectStateMap.get(this.connectedCount) && this.handleConnected();
        }
        /**
         * first mount of this app
         */
        handleConnected() {
            if (!this.appName || !this.appUrl)
                return;
            if (this.getDisposeResult('shadowDOM') && !this.shadowRoot && isFunction(this.attachShadow)) {
                this.attachShadow({ mode: 'open' });
            }
            this.updateSsrUrl(this.appUrl);
            if (appInstanceMap.has(this.appName)) {
                const oldApp = appInstanceMap.get(this.appName);
                const oldAppUrl = oldApp.ssrUrl || oldApp.url;
                const targetUrl = this.ssrUrl || this.appUrl;
                /**
                 * NOTE:
                 * 1. keep-alive don't care about ssrUrl
                 * 2. Even if the keep-alive app is pushed into the background, it is still active and cannot be replaced. Otherwise, it is difficult for developers to troubleshoot in case of conflict and  will leave developers at a loss
                 * 3. When scopecss, useSandbox of prefetch app different from target app, delete prefetch app and create new one
                 */
                if (oldApp.isHidden() &&
                    oldApp.url === this.appUrl) {
                    this.handleShowKeepAliveApp(oldApp);
                }
                else if (oldAppUrl === targetUrl && (oldApp.isUnmounted() ||
                    (oldApp.isPrefetch &&
                        this.sameCoreOptions(oldApp)))) {
                    this.handleMount(oldApp);
                }
                else if (oldApp.isPrefetch || oldApp.isUnmounted()) {
                    if ((true) && this.sameCoreOptions(oldApp)) {
                        /**
                         * url is different & old app is unmounted or prefetch, create new app to replace old one
                         */
                        logWarn(`the ${oldApp.isPrefetch ? 'prefetch' : 'unmounted'} app with url ${oldAppUrl} replaced by a new app with url ${targetUrl}`, this.appName);
                    }
                    this.handleCreateApp();
                }
                else {
                    logError(`app name conflict, an app named ${this.appName} with url ${oldAppUrl} is running`);
                }
            }
            else {
                this.handleCreateApp();
            }
        }
        // remount app or create app if attribute url or name change
        actionsForAttributeChange(formatAttrName, formatAttrUrl, oldApp) {
            var _a;
            /**
             * do not add judgment of formatAttrUrl === this.appUrl
             */
            this.updateSsrUrl(formatAttrUrl);
            this.appName = formatAttrName;
            this.appUrl = formatAttrUrl;
            ((_a = this.shadowRoot) !== null && _a !== void 0 ? _a : this).innerHTML = '';
            if (formatAttrName !== this.getAttribute('name')) {
                this.setAttribute('name', this.appName);
            }
            /**
             * when oldApp not null: this.appName === oldApp.name
             * scene1: if formatAttrName and this.appName are equal: exitApp is the current app, the url must be different, oldApp has been unmounted
             * scene2: if formatAttrName and this.appName are different: oldApp must be prefetch or unmounted, if url is equal, then just mount, if url is different, then create new app to replace oldApp
             * scene3: url is different but ssrUrl is equal
             * scene4: url is equal but ssrUrl is different, if url is equal, name must different
             * scene5: if oldApp is KEEP_ALIVE_HIDDEN, name must different
             */
            if (oldApp) {
                if (oldApp.isHidden()) {
                    if (oldApp.url === this.appUrl) {
                        this.handleShowKeepAliveApp(oldApp);
                    }
                    else {
                        // the hidden keep-alive app is still active
                        logError(`app name conflict, an app named ${this.appName} is running`);
                    }
                    /**
                     * TODO:
                     *  1. oldApp必是unmountApp或preFetchApp，这里还应该考虑沙箱、iframe、样式隔离不一致的情况
                     *  2. unmountApp要不要判断样式隔离、沙箱、iframe，然后彻底删除并再次渲染？(包括handleConnected里的处理，先不改？)
                     * 推荐：if (
                     *  oldApp.url === this.appUrl &&
                     *  oldApp.ssrUrl === this.ssrUrl && (
                     *    oldApp.isUnmounted() ||
                     *    (oldApp.isPrefetch && this.sameCoreOptions(oldApp))
                     *  )
                     * )
                     */
                }
                else if (oldApp.url === this.appUrl && oldApp.ssrUrl === this.ssrUrl) {
                    // mount app
                    this.handleMount(oldApp);
                }
                else {
                    this.handleCreateApp();
                }
            }
            else {
                this.handleCreateApp();
            }
        }
        /**
         * judge the attribute is legal
         * @param name attribute name
         * @param val attribute value
         */
        legalAttribute(name, val) {
            if (!isString(val) || !val) {
                logError(`unexpected attribute ${name}, please check again`, this.appName);
                return false;
            }
            return true;
        }
        // create app instance
        handleCreateApp() {
            const createAppInstance = () => {
                var _a;
                return new CreateApp({
                    name: this.appName,
                    url: this.appUrl,
                    container: (_a = this.shadowRoot) !== null && _a !== void 0 ? _a : this,
                    scopecss: this.useScopecss(),
                    useSandbox: this.useSandbox(),
                    inline: this.getDisposeResult('inline'),
                    iframe: this.getDisposeResult('iframe'),
                    ssrUrl: this.ssrUrl,
                    routerMode: this.getMemoryRouterMode(),
                });
            };
            /**
             * Actions for destroy old app
             * If oldApp exist, it must be 3 scenes:
             *  1. oldApp is unmounted app (url is is different)
             *  2. oldApp is prefetch, not prerender (url, scopecss, useSandbox, iframe is different)
             *  3. oldApp is prerender (url, scopecss, useSandbox, iframe is different)
             */
            const oldApp = appInstanceMap.get(this.appName);
            if (oldApp) {
                if (oldApp.isPrerender) {
                    this.unmount(true, createAppInstance);
                }
                else {
                    oldApp.actionsForCompletelyDestroy();
                    createAppInstance();
                }
            }
            else {
                createAppInstance();
            }
        }
        /**
         * mount app
         * some serious note before mount:
         * 1. is prefetch ?
         * 2. is remount in another container ?
         * 3. is remount with change properties of the container ?
         */
        handleMount(app) {
            app.isPrefetch = false;
            /**
             * Fix error when navigate before app.mount by microApp.router.push(...)
             * Issue: https://github.com/micro-zoe/micro-app/issues/908
             */
            app.setAppState(appStates.BEFORE_MOUNT);
            // exec mount async, simulate the first render scene
            defer(() => this.mount(app));
        }
        /**
         * public mount action for micro_app_element & create_app
         */
        mount(app) {
            var _a;
            app.mount({
                container: (_a = this.shadowRoot) !== null && _a !== void 0 ? _a : this,
                inline: this.getDisposeResult('inline'),
                routerMode: this.getMemoryRouterMode(),
                baseroute: this.getBaseRouteCompatible(),
                defaultPage: this.getDefaultPage(),
                disablePatchRequest: this.getDisposeResult('disable-patch-request'),
                fiber: this.getDisposeResult('fiber'),
            });
        }
        /**
         * unmount app
         * @param destroy delete cache resources when unmount
         * @param unmountcb callback
         */
        unmount(destroy, unmountcb) {
            const app = appInstanceMap.get(this.appName);
            if (app && !app.isUnmounted()) {
                app.unmount({
                    destroy: destroy || this.getDestroyCompatibleResult(),
                    clearData: this.getDisposeResult('clear-data'),
                    keepRouteState: this.getDisposeResult('keep-router-state'),
                    unmountcb,
                });
            }
        }
        // hidden app when disconnectedCallback called with keep-alive
        handleHiddenKeepAliveApp(callback) {
            const app = appInstanceMap.get(this.appName);
            if (app && !app.isUnmounted() && !app.isHidden()) {
                app.hiddenKeepAliveApp(callback);
            }
        }
        // show app when connectedCallback called with keep-alive
        handleShowKeepAliveApp(app) {
            // must be async
            defer(() => { var _a; return app.showKeepAliveApp((_a = this.shadowRoot) !== null && _a !== void 0 ? _a : this); });
        }
        /**
         * Get configuration
         * Global setting is lowest priority
         * @param name Configuration item name
         */
        getDisposeResult(name) {
            return (this.compatibleProperties(name) || !!microApp.options[name]) && this.compatibleDisableProperties(name);
        }
        // compatible of disableScopecss & disableSandbox
        compatibleProperties(name) {
            if (name === 'disable-scopecss') {
                return this.hasAttribute('disable-scopecss') || this.hasAttribute('disableScopecss');
            }
            else if (name === 'disable-sandbox') {
                return this.hasAttribute('disable-sandbox') || this.hasAttribute('disableSandbox');
            }
            return this.hasAttribute(name);
        }
        // compatible of disableScopecss & disableSandbox
        compatibleDisableProperties(name) {
            if (name === 'disable-scopecss') {
                return this.getAttribute('disable-scopecss') !== 'false' && this.getAttribute('disableScopecss') !== 'false';
            }
            else if (name === 'disable-sandbox') {
                return this.getAttribute('disable-sandbox') !== 'false' && this.getAttribute('disableSandbox') !== 'false';
            }
            return this.getAttribute(name) !== 'false';
        }
        useScopecss() {
            return !(this.getDisposeResult('disable-scopecss') || this.getDisposeResult('shadowDOM'));
        }
        useSandbox() {
            return !this.getDisposeResult('disable-sandbox');
        }
        /**
         * Determine whether the core options of the existApp is consistent with the new one
         */
        sameCoreOptions(app) {
            return (app.scopecss === this.useScopecss() &&
                app.useSandbox === this.useSandbox() &&
                app.iframe === this.getDisposeResult('iframe'));
        }
        /**
         * 2021-09-08
         * get baseRoute
         * getAttribute('baseurl') is compatible writing of versions below 0.3.1
         */
        getBaseRouteCompatible() {
            var _a, _b;
            return (_b = (_a = this.getAttribute('baseroute')) !== null && _a !== void 0 ? _a : this.getAttribute('baseurl')) !== null && _b !== void 0 ? _b : '';
        }
        // compatible of destroy
        getDestroyCompatibleResult() {
            return this.getDisposeResult('destroy') || this.getDisposeResult('destory');
        }
        /**
         * destroy has priority over destroy keep-alive
         */
        getKeepAliveModeResult() {
            return this.getDisposeResult('keep-alive') && !this.getDestroyCompatibleResult();
        }
        /**
         * change ssrUrl in ssr mode
         */
        updateSsrUrl(baseUrl) {
            if (this.getDisposeResult('ssr')) {
                // TODO: disable-memory-router不存在了，这里需要更新一下
                if (this.getDisposeResult('disable-memory-router') || this.getDisposeResult('disableSandbox')) {
                    const rawLocation = globalEnv.rawWindow.location;
                    this.ssrUrl = CompletionPath(rawLocation.pathname + rawLocation.search, baseUrl);
                }
                else {
                    // get path from browser URL
                    // TODO: 新版本路由系统要重新兼容ssr
                    let targetPath = getNoHashMicroPathFromURL(this.appName, baseUrl);
                    const defaultPagePath = this.getDefaultPage();
                    if (!targetPath && defaultPagePath) {
                        const targetLocation = createURL(defaultPagePath, baseUrl);
                        targetPath = targetLocation.origin + targetLocation.pathname + targetLocation.search;
                    }
                    this.ssrUrl = targetPath;
                }
            }
            else if (this.ssrUrl) {
                this.ssrUrl = '';
            }
        }
        /**
         * get config of default page
         */
        getDefaultPage() {
            return (router.getDefaultPage(this.appName) ||
                this.getAttribute('default-page') ||
                this.getAttribute('defaultPage') ||
                '');
        }
        /**
         * get config of router-mode
         * @returns router-mode
         */
        getMemoryRouterMode() {
            return initRouterMode(this.getAttribute('router-mode'), 
            // is micro-app element set disable-memory-router, like <micro-app disable-memory-router></micro-app>
            // or <micro-app disable-memory-router='false'></micro-app>
            this.compatibleProperties('disable-memory-router') && this.compatibleDisableProperties('disable-memory-router'));
        }
        /**
         * rewrite micro-app.setAttribute, process attr data
         * @param key attr name
         * @param value attr value
         */
        setAttribute(key, value) {
            if (key === 'data') {
                if (isPlainObject(value)) {
                    const cloneValue = {};
                    Object.getOwnPropertyNames(value).forEach((ownKey) => {
                        if (!(isString(ownKey) && ownKey.indexOf('__') === 0)) {
                            cloneValue[ownKey] = value[ownKey];
                        }
                    });
                    this.data = cloneValue;
                }
                else if (value !== '[object Object]') {
                    logWarn('property data must be an object', this.appName);
                }
            }
            else {
                globalEnv.rawSetAttribute.call(this, key, value);
            }
        }
        /**
         * get delay time of router event
         * @returns delay time
         */
        getRouterEventDelay() {
            let delay = parseInt(this.getAttribute('router-event-delay'));
            if (isNaN(delay)) {
                delay = parseInt((isFunction(microApp.options['router-event-delay']) ? microApp.options['router-event-delay'](this.appName) : microApp.options['router-event-delay']));
            }
            return !isNaN(delay) ? delay : 0;
        }
        /**
         * Data from the base application
         */
        set data(value) {
            if (this.appName) {
                microApp.setData(this.appName, value);
            }
            else {
                this.cacheData = value;
            }
        }
        /**
         * get data only used in jsx-custom-event once
         */
        get data() {
            if (this.appName) {
                return microApp.getData(this.appName, true);
            }
            else if (this.cacheData) {
                return this.cacheData;
            }
            return null;
        }
        /**
         * get publicPath from a valid address,it can used in micro-app-devtools
         */
        get publicPath() {
            return getEffectivePath(this.appUrl);
        }
        /**
         * get baseRoute from attribute,it can used in micro-app-devtools
         */
        get baseRoute() {
            return this.getBaseRouteCompatible();
        }
    }
    window.customElements.define(tagName, MicroAppElement);
}

/**
 * preFetch([
 *  {
 *    name: string,
 *    url: string,
 *    iframe: boolean,
 *    inline: boolean,
 *    'disable-scopecss': boolean,
 *    'disable-sandbox': boolean,
 *    level: number,
 *    'default-page': string,
 *    'disable-patch-request': boolean,
 *  },
 *  ...
 * ])
 * Note:
 *  1: preFetch is async and is performed only when the browser is idle
 *  2: options of prefetch preferably match the config of the micro-app element, although this is not required
 * @param apps micro app options
 * @param delay delay time
 */
function preFetch(apps, delay) {
    if (!isBrowser) {
        return logError('preFetch is only supported in browser environment');
    }
    requestIdleCallback(() => {
        const delayTime = isNumber(delay) ? delay : microApp.options.prefetchDelay;
        /**
         * TODO: remove setTimeout
         * 如果要保留setTimeout，则需要考虑清空定时器的情况
         */
        setTimeout(() => {
            // releasePrefetchEffect()
            preFetchInSerial(apps);
        }, isNumber(delayTime) ? delayTime : 3000);
    });
    // const handleOnLoad = (): void => {
    //   releasePrefetchEffect()
    //   requestIdleCallback(() => {
    //     preFetchInSerial(apps)
    //   })
    // }
    // const releasePrefetchEffect = (): void => {
    //   window.removeEventListener('load', handleOnLoad)
    //   clearTimeout(preFetchTime)
    // }
    // window.addEventListener('load', handleOnLoad)
}
function preFetchInSerial(apps) {
    isFunction(apps) && (apps = apps());
    if (isArray(apps)) {
        apps.reduce((pre, next) => pre.then(() => preFetchAction(next)), Promise.resolve());
    }
}
// sequential preload app
function preFetchAction(options) {
    return promiseRequestIdle((resolve) => {
        var _a, _b, _c, _d, _e, _f;
        if (isPlainObject(options) && navigator.onLine) {
            options.name = formatAppName(options.name);
            options.url = formatAppURL(options.url, options.name);
            if (options.name && options.url && !appInstanceMap.has(options.name)) {
                const app = new CreateApp({
                    name: options.name,
                    url: options.url,
                    isPrefetch: true,
                    scopecss: !((_b = (_a = options['disable-scopecss']) !== null && _a !== void 0 ? _a : options.disableScopecss) !== null && _b !== void 0 ? _b : microApp.options['disable-scopecss']),
                    useSandbox: !((_d = (_c = options['disable-sandbox']) !== null && _c !== void 0 ? _c : options.disableSandbox) !== null && _d !== void 0 ? _d : microApp.options['disable-sandbox']),
                    inline: (_e = options.inline) !== null && _e !== void 0 ? _e : microApp.options.inline,
                    iframe: (_f = options.iframe) !== null && _f !== void 0 ? _f : microApp.options.iframe,
                    prefetchLevel: options.level && PREFETCH_LEVEL.includes(options.level) ? options.level : microApp.options.prefetchLevel && PREFETCH_LEVEL.includes(microApp.options.prefetchLevel) ? microApp.options.prefetchLevel : 2,
                });
                const oldOnload = app.onLoad;
                const oldOnLoadError = app.onLoadError;
                app.onLoad = (onLoadParam) => {
                    if (app.isPrerender) {
                        assign(onLoadParam, {
                            defaultPage: options['default-page'],
                            /**
                             * TODO: 预渲染支持disable-memory-router，默认渲染首页即可，文档中也要保留
                             * 问题：
                             *  1、如何确保子应用进行跳转时不影响到浏览器地址？？pure？？
                             */
                            routerMode: initRouterMode(options['router-mode']),
                            baseroute: options.baseroute,
                            disablePatchRequest: options['disable-patch-request'],
                        });
                    }
                    resolve();
                    oldOnload.call(app, onLoadParam);
                };
                app.onLoadError = (...rests) => {
                    resolve();
                    oldOnLoadError.call(app, ...rests);
                };
            }
            else {
                resolve();
            }
        }
        else {
            resolve();
        }
    });
}
/**
 * load global assets into cache
 * @param assets global assets of js, css
 */
function getGlobalAssets(assets) {
    if (isPlainObject(assets)) {
        requestIdleCallback(() => {
            fetchGlobalResources(assets.js, 'js', sourceCenter.script);
            fetchGlobalResources(assets.css, 'css', sourceCenter.link);
        });
    }
}
// TODO: requestIdleCallback for every file
function fetchGlobalResources(resources, suffix, sourceHandler) {
    if (isArray(resources)) {
        const effectiveResource = resources.filter((path) => isString(path) && isTargetExtension(path, suffix) && !sourceHandler.hasInfo(path));
        const fetchResourcePromise = effectiveResource.map((path) => fetchSource(path));
        // fetch resource with stream
        promiseStream(fetchResourcePromise, (res) => {
            const path = effectiveResource[res.index];
            if (suffix === 'js') {
                if (!sourceHandler.hasInfo(path)) {
                    sourceHandler.setInfo(path, {
                        code: res.data,
                        isExternal: false,
                        appSpace: {},
                    });
                }
            }
            else {
                if (!sourceHandler.hasInfo(path)) {
                    sourceHandler.setInfo(path, {
                        code: res.data,
                        appSpace: {}
                    });
                }
            }
        }, (err) => {
            logError(err);
        });
    }
}

/**
 * if app not prefetch & not unmount, then app is active
 * @param excludeHiddenApp exclude hidden keep-alive app, default is false
 * @param excludePreRender exclude pre render app
 * @returns active apps
 */
function getActiveApps({ excludeHiddenApp = false, excludePreRender = false, } = {}) {
    const activeApps = [];
    appInstanceMap.forEach((app, appName) => {
        if (!app.isUnmounted() &&
            (!app.isPrefetch || (app.isPrerender && !excludePreRender)) &&
            (!excludeHiddenApp ||
                !app.isHidden())) {
            activeApps.push(appName);
        }
    });
    return activeApps;
}
// get all registered apps
function getAllApps() {
    return Array.from(appInstanceMap.keys());
}
/**
 * unmount app by appName
 * @param appName
 * @param options unmountAppOptions
 * @returns Promise<void>
 */
function unmountApp(appName, options) {
    const app = appInstanceMap.get(formatAppName(appName));
    return new Promise((resolve) => {
        if (app) {
            if (app.isUnmounted() || app.isPrefetch) {
                if (app.isPrerender) {
                    app.unmount({
                        destroy: !!(options === null || options === void 0 ? void 0 : options.destroy),
                        clearData: !!(options === null || options === void 0 ? void 0 : options.clearData),
                        keepRouteState: false,
                        unmountcb: resolve.bind(null, true)
                    });
                }
                else {
                    if (options === null || options === void 0 ? void 0 : options.destroy)
                        app.actionsForCompletelyDestroy();
                    resolve(true);
                }
            }
            else if (app.isHidden()) {
                if (options === null || options === void 0 ? void 0 : options.destroy) {
                    app.unmount({
                        destroy: true,
                        clearData: true,
                        keepRouteState: true,
                        unmountcb: resolve.bind(null, true)
                    });
                }
                else if (options === null || options === void 0 ? void 0 : options.clearAliveState) {
                    app.unmount({
                        destroy: false,
                        clearData: !!options.clearData,
                        keepRouteState: true,
                        unmountcb: resolve.bind(null, true)
                    });
                }
                else {
                    resolve(true);
                }
            }
            else {
                const container = getRootContainer(app.container);
                const unmountHandler = () => {
                    container.removeEventListener(lifeCycles.UNMOUNT, unmountHandler);
                    container.removeEventListener(lifeCycles.AFTERHIDDEN, afterhiddenHandler);
                    resolve(true);
                };
                const afterhiddenHandler = () => {
                    container.removeEventListener(lifeCycles.UNMOUNT, unmountHandler);
                    container.removeEventListener(lifeCycles.AFTERHIDDEN, afterhiddenHandler);
                    resolve(true);
                };
                container.addEventListener(lifeCycles.UNMOUNT, unmountHandler);
                container.addEventListener(lifeCycles.AFTERHIDDEN, afterhiddenHandler);
                if (options === null || options === void 0 ? void 0 : options.destroy) {
                    let destroyAttrValue, destoryAttrValue;
                    container.hasAttribute('destroy') && (destroyAttrValue = container.getAttribute('destroy'));
                    container.hasAttribute('destory') && (destoryAttrValue = container.getAttribute('destory'));
                    container.setAttribute('destroy', 'true');
                    container.parentNode.removeChild(container);
                    container.removeAttribute('destroy');
                    isString(destroyAttrValue) && container.setAttribute('destroy', destroyAttrValue);
                    isString(destoryAttrValue) && container.setAttribute('destory', destoryAttrValue);
                }
                else if ((options === null || options === void 0 ? void 0 : options.clearAliveState) && container.hasAttribute('keep-alive')) {
                    const keepAliveAttrValue = container.getAttribute('keep-alive');
                    container.removeAttribute('keep-alive');
                    let clearDataAttrValue = null;
                    if (options.clearData) {
                        clearDataAttrValue = container.getAttribute('clear-data');
                        container.setAttribute('clear-data', 'true');
                    }
                    container.parentNode.removeChild(container);
                    container.setAttribute('keep-alive', keepAliveAttrValue);
                    isString(clearDataAttrValue) && container.setAttribute('clear-data', clearDataAttrValue);
                }
                else {
                    let clearDataAttrValue = null;
                    if (options === null || options === void 0 ? void 0 : options.clearData) {
                        clearDataAttrValue = container.getAttribute('clear-data');
                        container.setAttribute('clear-data', 'true');
                    }
                    container.parentNode.removeChild(container);
                    isString(clearDataAttrValue) && container.setAttribute('clear-data', clearDataAttrValue);
                }
            }
        }
        else {
            logWarn(`app ${appName} does not exist when unmountApp`);
            resolve(false);
        }
    });
}
// unmount all apps in turn
function unmountAllApps(options) {
    return Array.from(appInstanceMap.keys()).reduce((pre, next) => pre.then(() => unmountApp(next, options)), Promise.resolve(true));
}
/**
 * Re render app from the command line
 * microApp.reload(destroy)
 * @param appName app.name
 * @param destroy unmount app with destroy mode
 * @returns Promise<boolean>
 */
function reload(appName, destroy) {
    return new Promise((resolve) => {
        const app = appInstanceMap.get(formatAppName(appName));
        if (app) {
            const rootContainer = app.container && getRootContainer(app.container);
            if (rootContainer) {
                resolve(rootContainer.reload(destroy));
            }
            else {
                logWarn(`app ${appName} is not rendered, cannot use reload`);
                resolve(false);
            }
        }
        else {
            logWarn(`app ${appName} does not exist when reload app`);
            resolve(false);
        }
    });
}
/**
 * Manually render app
 * @param options RenderAppOptions
 * @returns Promise<boolean>
 */
function renderApp(options) {
    return new Promise((resolve) => {
        if (!isPlainObject(options))
            return logError('renderApp options must be an object');
        const container = isElement(options.container) ? options.container : isString(options.container) ? document.querySelector(options.container) : null;
        if (!isElement(container))
            return logError('Target container is not a DOM element.');
        const microAppElement = pureCreateElement(microApp.tagName);
        for (const attr in options) {
            if (attr === 'onDataChange') {
                if (isFunction(options[attr])) {
                    microAppElement.addEventListener('datachange', options[attr]);
                }
            }
            else if (attr === 'lifeCycles') {
                const lifeCycleConfig = options[attr];
                if (isPlainObject(lifeCycleConfig)) {
                    for (const lifeName in lifeCycleConfig) {
                        if (lifeName.toUpperCase() in lifeCycles && isFunction(lifeCycleConfig[lifeName])) {
                            microAppElement.addEventListener(lifeName.toLowerCase(), lifeCycleConfig[lifeName]);
                        }
                    }
                }
            }
            else if (attr !== 'container') {
                microAppElement.setAttribute(attr, options[attr]);
            }
        }
        const handleMount = () => {
            releaseListener();
            resolve(true);
        };
        const handleError = () => {
            releaseListener();
            resolve(false);
        };
        const releaseListener = () => {
            microAppElement.removeEventListener(lifeCycles.MOUNTED, handleMount);
            microAppElement.removeEventListener(lifeCycles.ERROR, handleError);
        };
        microAppElement.addEventListener(lifeCycles.MOUNTED, handleMount);
        microAppElement.addEventListener(lifeCycles.ERROR, handleError);
        container.appendChild(microAppElement);
    });
}
class MicroApp extends EventCenterForBaseApp {
    constructor() {
        super(...arguments);
        this.tagName = 'micro-app';
        this.hasInit = false;
        this.options = {};
        this.router = router;
        this.preFetch = preFetch;
        this.unmountApp = unmountApp;
        this.unmountAllApps = unmountAllApps;
        this.getActiveApps = getActiveApps;
        this.getAllApps = getAllApps;
        this.reload = reload;
        this.renderApp = renderApp;
    }
    start(options) {
        var _a, _b;
        if (!isBrowser || !window.customElements) {
            return logError('micro-app is not supported in this environment');
        }
        /**
         * TODO: 优化代码和逻辑
         *  1、同一个基座中initGlobalEnv不能被多次执行，否则会导致死循环
         *  2、判断逻辑是否放在initGlobalEnv中合适？--- 不合适
         */
        if (this.hasInit) {
            return logError('microApp.start executed repeatedly');
        }
        this.hasInit = true;
        if (options === null || options === void 0 ? void 0 : options.tagName) {
            if (/^micro-app(-\S+)?/.test(options.tagName)) {
                this.tagName = options.tagName;
            }
            else {
                return logError(`${options.tagName} is invalid tagName`);
            }
        }
        initGlobalEnv();
        if (window.customElements.get(this.tagName)) {
            return logWarn(`element ${this.tagName} is already defined`);
        }
        if (isPlainObject(options)) {
            this.options = options;
            options['disable-scopecss'] = (_a = options['disable-scopecss']) !== null && _a !== void 0 ? _a : options.disableScopecss;
            options['disable-sandbox'] = (_b = options['disable-sandbox']) !== null && _b !== void 0 ? _b : options.disableSandbox;
            // load app assets when browser is idle
            options.preFetchApps && preFetch(options.preFetchApps);
            // load global assets when browser is idle
            options.globalAssets && getGlobalAssets(options.globalAssets);
            if (isPlainObject(options.plugins)) {
                const modules = options.plugins.modules;
                if (isPlainObject(modules)) {
                    for (const appName in modules) {
                        const formattedAppName = formatAppName(appName);
                        if (formattedAppName && appName !== formattedAppName) {
                            modules[formattedAppName] = modules[appName];
                            delete modules[appName];
                        }
                    }
                }
            }
        }
        // define customElement after init
        defineElement(this.tagName);
    }
}
const microApp = new MicroApp();

export default microApp;
export { EventCenterForMicroApp, MicroApp, getActiveApps, getAllApps, preFetch, pureCreateElement, reload, removeDomScope, renderApp, unmountAllApps, unmountApp, version };
//# sourceMappingURL=index.esm.js.map
