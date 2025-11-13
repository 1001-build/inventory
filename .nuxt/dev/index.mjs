import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, setResponseStatus, setResponseHeader, send, setResponseHeaders, getRequestURL, getRequestHeader, getResponseHeader, getRequestHeaders, getResponseStatus, createError, useSession, getQuery as getQuery$1, appendResponseHeader, removeResponseHeader, getHeader, getRequestIP, setHeader, readBody, lazyEventHandler, useBase, createApp, createRouter as createRouter$1, toNodeListener, getRouterParam, getResponseStatusText } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/h3/dist/index.mjs';
import { Server } from 'node:http';
import { resolve, dirname, join } from 'node:path';
import crypto$1 from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { drizzle } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/drizzle-orm/d1/index.js';
import { Hash } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/@adonisjs/hash/build/index.js';
import { Scrypt } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/@adonisjs/hash/build/src/drivers/scrypt.js';
import { ZodError, z } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/zod/index.js';
import { SignJWT, jwtVerify } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/jose/dist/webapi/index.js';
import validator from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/validator/index.js';
import { relations, isNull, isNotNull, lte, lt, gte, gt, inArray, like, ne, eq, and, asc, desc, count } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/drizzle-orm/index.js';
import { integer, text, sqliteTable, index, unique } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/drizzle-orm/sqlite-core/index.js';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import destr, { destr as destr$1 } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/destr/dist/index.mjs';
import { createHooks } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/unstorage/drivers/fs.mjs';
import { digest, hash as hash$1 } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/klona/dist/index.mjs';
import defu, { defuFn, defu as defu$1 } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/scule/dist/index.mjs';
import { getContext } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/youch-core/build/index.js';
import { Youch } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/nitropack/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/nitropack/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { stringify, uneval } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/devalue/index.js';
import { captureRawStackTrace, parseRawStackTrace } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/errx/dist/index.js';
import { isVNode, toValue, isRef } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/vue/index.mjs';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1, basename, isAbsolute } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/pathe/dist/index.mjs';
import { getIcons } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/@iconify/utils/lib/index.mjs';
import { collections } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/.nuxt/nuxt-icon-server-bundle.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/unhead/dist/server.mjs';
import { renderToString } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/vue/server-renderer/index.mjs';
import { walkResolver } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/unhead/dist/utils.mjs';
import { ipxFSStorage, ipxHttpStorage, createIPX, createIPXH3Handler } from 'file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/node_modules/ipx/dist/index.mjs';

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/");
  }
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/") ? input : input + "/";
  }
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const serverAssets = [{"baseName":"server","dir":"/Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/server","watchOptions":{"ignored":[null]}}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
  "nuxt": {},
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "dashicons",
      "devicon",
      "devicon-plain",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fad",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "logos",
      "ls",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "pixelarticons",
      "prime",
      "ps",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "si-glyph",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "streamline",
      "streamline-emojis",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 1500
  }
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_fonts/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        },
        "cache": {
          "maxAge": 31536000
        }
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {
    "environment": "development",
    "debugMode": true,
    "apiUrl": "/api",
    "turnstileSiteKey": "overwrite-this-with-environment-in-production",
    "multitenancy": {
      "enabled": false
    },
    "piniaPluginPersistedstate": {},
    "auth": {
      "loadStrategy": "server-first"
    },
    "i18n": {
      "baseUrl": "",
      "defaultLocale": "en",
      "defaultDirection": "ltr",
      "strategy": "prefix_except_default",
      "lazy": false,
      "rootRedirect": "",
      "routesNameSeparator": "___",
      "defaultLocaleRouteNameSuffix": "default",
      "skipSettingLocaleOnNavigate": false,
      "differentDomains": false,
      "trailingSlash": false,
      "locales": [
        {
          "code": "en",
          "name": "English",
          "iso": "en-US",
          "files": []
        },
        {
          "code": "zh-CN",
          "name": "简体中文",
          "iso": "zh-CN",
          "files": []
        },
        {
          "code": "zh-TW",
          "name": "繁體中文",
          "iso": "zh-TW",
          "files": []
        }
      ],
      "detectBrowserLanguage": {
        "alwaysRedirect": false,
        "cookieCrossOrigin": false,
        "cookieDomain": "",
        "cookieKey": "i18n_redirected",
        "cookieSecure": false,
        "fallbackLocale": "",
        "redirectOn": "root",
        "useCookie": true
      },
      "experimental": {
        "localeDetector": "",
        "switchLocalePathLinkSSR": false,
        "autoImportTranslationFunctions": false,
        "typedPages": true,
        "typedOptionsAndMessages": false,
        "generatedLocaleFilePathFormat": "absolute",
        "alternateLinkCanonicalQueries": false,
        "hmr": true
      },
      "multiDomainLocales": false,
      "domainLocales": {
        "en": {
          "domain": ""
        },
        "zh-CN": {
          "domain": ""
        },
        "zh-TW": {
          "domain": ""
        }
      }
    }
  },
  "multitenancy": {
    "enabled": false
  },
  "rbac": {
    "enabled": true
  },
  "email": {
    "provider": "none",
    "apiKey": "",
    "from": "noreply@localhost"
  },
  "session": {
    "name": "nuxt-session",
    "password": "overwrite-this-with-environment-in-production",
    "cookie": {
      "sameSite": "lax",
      "secure": false,
      "httpOnly": true
    }
  },
  "jwtSecret": "overwrite-this-with-environment-in-production",
  "seedSecret": "overwrite-this-with-environment-in-production",
  "turnstileSecretKey": "overwrite-this-with-environment-in-production",
  "icon": {
    "serverKnownCssClasses": []
  },
  "hash": {
    "scrypt": {}
  },
  "webauthn": {
    "register": {},
    "authenticate": {}
  },
  "oauth": {
    "gitea": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": "",
      "baseURL": ""
    },
    "github": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "gitlab": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": "",
      "baseURL": "https://gitlab.com"
    },
    "spotify": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "google": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "twitch": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "auth0": {
      "clientId": "",
      "clientSecret": "",
      "domain": "",
      "audience": "",
      "redirectURL": ""
    },
    "workos": {
      "clientId": "",
      "clientSecret": "",
      "connectionId": "",
      "screenHint": "",
      "redirectURL": ""
    },
    "microsoft": {
      "clientId": "",
      "clientSecret": "",
      "tenant": "",
      "scope": [],
      "authorizationURL": "",
      "tokenURL": "",
      "userURL": "",
      "redirectURL": ""
    },
    "azureb2c": {
      "clientId": "",
      "policy": "",
      "tenant": "",
      "scope": [],
      "authorizationURL": "",
      "tokenURL": "",
      "userURL": "",
      "redirectURL": ""
    },
    "discord": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "battledotnet": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "bluesky": {
      "clientMetadataFilename": "",
      "clientName": "",
      "clientUri": "",
      "logoUri": "",
      "policyUri": "",
      "tosUri": "",
      "scope": [
        "atproto"
      ],
      "grantTypes": [
        "authorization_code"
      ],
      "responseTypes": [
        "code"
      ],
      "applicationType": "web",
      "redirectUris": "",
      "dpopBoundAccessTokens": true,
      "tokenEndpointAuthMethod": "none"
    },
    "keycloak": {
      "clientId": "",
      "clientSecret": "",
      "serverUrl": "",
      "serverUrlInternal": "",
      "realm": "",
      "redirectURL": ""
    },
    "linear": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "linkedin": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "cognito": {
      "clientId": "",
      "clientSecret": "",
      "region": "",
      "userPoolId": "",
      "redirectURL": ""
    },
    "facebook": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "instagram": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "paypal": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "steam": {
      "apiKey": "",
      "redirectURL": ""
    },
    "x": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "xsuaa": {
      "clientId": "",
      "clientSecret": "",
      "domain": "",
      "redirectURL": ""
    },
    "vk": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "yandex": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "tiktok": {
      "clientKey": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "dropbox": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "polar": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "zitadel": {
      "clientId": "",
      "clientSecret": "",
      "domain": "",
      "redirectURL": ""
    },
    "authentik": {
      "clientId": "",
      "clientSecret": "",
      "domain": "",
      "redirectURL": ""
    },
    "seznam": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "strava": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "hubspot": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "line": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "atlassian": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "apple": {
      "teamId": "",
      "keyId": "",
      "privateKey": "",
      "redirectURL": "",
      "clientId": ""
    },
    "kick": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "livechat": {
      "clientId": "",
      "clientSecret": ""
    },
    "salesforce": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": "",
      "baseURL": "",
      "scope": ""
    },
    "slack": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": "",
      "scope": ""
    },
    "heroku": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": "",
      "scope": ""
    },
    "roblox": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": "",
      "scope": ""
    },
    "okta": {
      "clientId": "",
      "clientSecret": "",
      "domain": "",
      "audience": "",
      "scope": [],
      "redirectURL": ""
    },
    "ory": {
      "clientId": "",
      "clientSecret": "",
      "sdkURL": "",
      "redirectURL": "",
      "scope": [],
      "authorizationURL": "",
      "tokenURL": "",
      "userURL": ""
    }
  },
  "wrangler": {
    "configPath": "./wrangler.staging.jsonc",
    "persistDir": "/Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/.wrangler/state/v3"
  },
  "ipx": {
    "baseURL": "/_ipx",
    "alias": {},
    "fs": {
      "dir": [
        "/Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/public"
      ]
    },
    "http": {
      "domains": []
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
const _sharedAppConfig = _deepFreeze(klona(appConfig));
function useAppConfig(event) {
  {
    return _sharedAppConfig;
  }
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function defineNitroErrorHandler(handler) {
  return handler;
}

const ERROR_CODES = {
  // ========================================
  // AUTHENTICATION (401)
  // ========================================
  AUTH_REQUIRED: "AUTH_REQUIRED",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  INVALID_TOKEN: "INVALID_TOKEN",
  INVALID_TOKEN_PURPOSE: "INVALID_TOKEN_PURPOSE",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  TENANT_MISMATCH: "TENANT_MISMATCH",
  ACCOUNT_INACTIVE: "ACCOUNT_INACTIVE",
  // ========================================
  // AUTHORIZATION (403)
  // ========================================
  FORBIDDEN: "FORBIDDEN",
  PERMISSION_DENIED: "PERMISSION_DENIED",
  // ========================================
  // VALIDATION (400)
  // ========================================
  VALIDATION_ERROR: "VALIDATION_ERROR",
  MISSING_FIELD: "MISSING_FIELD",
  PASSWORD_SAME_AS_OLD: "PASSWORD_SAME_AS_OLD",
  // ========================================
  // NOT FOUND (404)
  // ========================================
  NOT_FOUND: "NOT_FOUND",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  EMAIL_EXISTS: "EMAIL_EXISTS",
  // ========================================
  // SERVER ERRORS (500)
  // ========================================
  INTERNAL_ERROR: "INTERNAL_ERROR"};

var __defProp$4 = Object.defineProperty;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$4 = (obj, key, value) => __defNormalProp$4(obj, key + "" , value);
class AppError extends Error {
  constructor(message, statusCode = 500, code, details) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    __publicField$4(this, "traceId");
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
  toJSON() {
    return {
      traceId: this.traceId,
      code: this.code,
      ...this.details && { details: this.details }
    };
  }
}
class AuthenticationError extends AppError {
  constructor(message = "Authentication required", details) {
    super(message, 401, ERROR_CODES.AUTH_REQUIRED, details);
  }
}
class InvalidCredentialsError extends AppError {
  constructor(message = "Invalid email or password", details) {
    super(message, 401, ERROR_CODES.INVALID_CREDENTIALS, details);
  }
}
class InvalidTokenError extends AppError {
  constructor(message = "Invalid or expired token", details) {
    super(message, 401, ERROR_CODES.INVALID_TOKEN, details);
  }
}
class TokenExpiredError extends AppError {
  constructor(message = "Token has expired", details) {
    super(message, 401, ERROR_CODES.TOKEN_EXPIRED, details);
  }
}
class AccountInactiveError extends AppError {
  constructor(message = "Account is inactive", details) {
    super(message, 401, ERROR_CODES.ACCOUNT_INACTIVE, details);
  }
}
class TenantMismatchError extends AppError {
  constructor(message = "Session tenant mismatch. Please sign in again.", details) {
    super(message, 401, ERROR_CODES.TENANT_MISMATCH, details);
  }
}
class InvalidTokenPurposeError extends AppError {
  constructor(message = "Invalid token purpose", details) {
    super(message, 401, ERROR_CODES.INVALID_TOKEN_PURPOSE, details);
  }
}
class AuthorizationError extends AppError {
  constructor(message = "Insufficient permissions", details) {
    super(message, 403, ERROR_CODES.FORBIDDEN, details);
  }
}
class PermissionDeniedError extends AppError {
  constructor(message = "Permission denied", details) {
    super(message, 403, ERROR_CODES.PERMISSION_DENIED, details);
  }
}
class ValidationError extends AppError {
  constructor(message, details) {
    super(message, 400, ERROR_CODES.VALIDATION_ERROR, details);
  }
}
class MissingFieldError extends AppError {
  constructor(message, details) {
    super(message, 400, ERROR_CODES.MISSING_FIELD, details);
  }
}
class PasswordSameAsOldError extends AppError {
  constructor(message = "New password cannot be the same as your current password", details) {
    super(message, 400, ERROR_CODES.PASSWORD_SAME_AS_OLD, details);
  }
}
class NotFoundError extends AppError {
  constructor(message, details) {
    super(message, 404, ERROR_CODES.NOT_FOUND, details);
  }
}
class UserNotFoundError extends AppError {
  constructor(message = "User not found", details) {
    super(message, 404, ERROR_CODES.USER_NOT_FOUND, details);
  }
}
class EmailAlreadyExistsError extends AppError {
  constructor(message = "Email already exists", details) {
    super(message, 409, ERROR_CODES.EMAIL_EXISTS, details);
  }
}
class InternalServerError extends AppError {
  constructor(message = "Internal server error", details) {
    super(message, 500, ERROR_CODES.INTERNAL_ERROR, details);
  }
}
function logError(error, context) {
  const errorLog = {
    name: error.name,
    message: error.message,
    code: error.code,
    statusCode: error.statusCode,
    details: error.details,
    context,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (error.statusCode >= 500) {
    console.error("Server Error:", errorLog);
  } else if (error.statusCode >= 400) {
    console.warn("Client Error:", errorLog);
  } else {
    console.log("Error:", errorLog);
  }
}

const ENV = {
  DEVELOPMENT: "development",
  PRODUCTION: "production"
};
function isDevelopment(event) {
  const config = event ? useRuntimeConfig(event) : useRuntimeConfig();
  return config.public.environment === ENV.DEVELOPMENT;
}
function isProduction(event) {
  const config = event ? useRuntimeConfig(event) : useRuntimeConfig();
  return config.public.environment === ENV.PRODUCTION;
}

const errorHandler$0 = defineNitroErrorHandler((error, event) => {
  const isDev = isDevelopment(event);
  const originalError = error.cause;
  let appError;
  if (originalError instanceof ZodError) {
    const zodErrors = originalError.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message
    }));
    const firstError = originalError.errors[0];
    const errorMessage = firstError ? firstError.message : "Validation failed";
    appError = new ValidationError(errorMessage, zodErrors);
  } else if (originalError && typeof originalError === "object" && "code" in originalError && "statusCode" in originalError) {
    appError = originalError;
  } else {
    appError = error;
  }
  const traceId = event.context.requestId || crypto.randomUUID();
  appError.traceId = traceId;
  logError(appError, {
    traceId,
    url: event.path,
    method: event.method,
    ...error.stack && {
      stack: error.stack.split("\n").map((line) => line.trim())
    }
  });
  const statusCode = appError.statusCode || 500;
  const isClientError = statusCode >= 400 && statusCode < 500;
  const responsePayload = {
    message: "Error occurred",
    data: null,
    error: {
      traceId,
      code: appError.code,
      // Always send message for client errors, generic message for server errors in prod
      message: isClientError || isDev ? appError.message : "Internal server error",
      // Always send details for client errors, hide for server errors in prod
      ...(isClientError || isDev) && appError.details && { details: appError.details },
      // Debug info only in development
      ...isDev && {
        debug: {
          statusCode: appError.statusCode,
          url: event.path,
          method: event.method,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          ...error.stack && { stack: error.stack }
        }
      }
    }
  };
  setResponseStatus(event, statusCode);
  setResponseHeader(event, "Content-Type", "application/json");
  return send(event, JSON.stringify(responsePayload));
});

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json || !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _5oiYQsz7JxfzYMCbppsi5qNpo3nwinUo5tfsP9Wuzo = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "/Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template";

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"}],"link":[],"style":[],"script":[],"noscript":[]};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appSpaLoaderTag = "div";

const appSpaLoaderAttrs = {"id":"__nuxt-loader"};

const appId = "nuxt-app";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : void 0,
  URL: (data) => data instanceof URL ? data.toString() : void 0
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _qhB7TtNOwMUSmwzXqzSWK8V1GOJTLMHq7J35KcZYxw = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola$1.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola$1.wrapConsole();
}

const _X2yq_Ox8imq7YrZyLd6nezgHFGC39UmEARsJl4agWSw = defineNitroPlugin((nitroApp) => {
  if (process.env.NUXT_OAUTH_FACEBOOK_CLIENT_ID && process.env.NUXT_OAUTH_FACEBOOK_CLIENT_SECRET || process.env.NUXT_OAUTH_INSTAGRAM_CLIENT_ID && process.env.NUXT_OAUTH_INSTAGRAM_CLIENT_SECRET) {
    nitroApp.hooks.hook("render:html", (html) => {
      html.head.unshift(`
      <script>
        if (window.location.hash === "#_=_"){
          history.replaceState
              ? history.replaceState(null, null, window.location.href.split("#")[0])
              : window.location.hash = "";
        }
      <\/script>
    `);
    });
  }
});

function defineNitroPlugin(def) {
  return def;
}

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

let _hash;
function getHash() {
  if (!_hash) {
    const options = useRuntimeConfig().hash?.scrypt;
    const scrypt = new Scrypt(options);
    _hash = new Hash(scrypt);
  }
  return _hash;
}
async function hashPassword$1(password) {
  return await getHash().make(password);
}
async function verifyPassword(hashedPassword, plainPassword) {
  return await getHash().verify(hashedPassword, plainPassword);
}

const sessionHooks = createHooks();
async function getUserSession(event) {
  const session = await _useSession(event);
  return {
    ...session.data,
    id: session.id
  };
}
async function setUserSession(event, data, config) {
  const session = await _useSession(event, config);
  await session.update(defu$1(data, session.data));
  return session.data;
}
async function clearUserSession(event, config) {
  const session = await _useSession(event, config);
  await sessionHooks.callHookParallel("clear", session.data, event);
  await session.clear();
  return true;
}
let sessionConfig;
function _useSession(event, config = {}) {
  if (!sessionConfig) {
    const runtimeConfig = useRuntimeConfig(isEvent(event) ? event : void 0);
    const envSessionPassword = `${runtimeConfig.nitro?.envPrefix || "NUXT_"}SESSION_PASSWORD`;
    sessionConfig = defu$1({ password: process.env[envSessionPassword] }, runtimeConfig.session);
    if (!sessionConfig.password) {
      console.error(`[nuxt-auth-utils] ${envSessionPassword} environment variable or runtimeConfig.session.password was not set.`);
    }
  }
  const finalConfig = defu$1(config, sessionConfig);
  return useSession(event, finalConfig);
}

function calculatePagination(page, perPage, total) {
  if (perPage === -1) {
    return {
      page: 1,
      perPage: total,
      total,
      totalPages: 1,
      hasNext: false,
      hasPrevious: false
    };
  }
  const totalPages = Math.ceil(total / perPage);
  return {
    page,
    perPage,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1
  };
}
function buildPaginatedResponse(items, page, perPage, total) {
  return {
    items,
    pagination: calculatePagination(page, perPage, total)
  };
}
function calculateLimitOffset(page, perPage) {
  if (perPage === -1) {
    return { limit: -1, offset: 0 };
  }
  return {
    limit: perPage,
    offset: (page - 1) * perPage
  };
}

const MAX_PER_PAGE = 100;
const DEFAULT_PER_PAGE = 20;
const DEFAULT_PAGE = 1;

const HdrKeyTenantID = "X-Tenant-ID";

function parsePaginationParams(query) {
  const page = query.page ? Math.max(1, parseInt(query.page, 10)) : DEFAULT_PAGE;
  let perPage = query.perPage ? parseInt(query.perPage, 10) : DEFAULT_PER_PAGE;
  if (perPage !== -1) {
    perPage = Math.min(Math.max(1, perPage), MAX_PER_PAGE);
  }
  return { page, perPage };
}
function parseSortParams(query) {
  const sortBy = query.sortBy ? String(query.sortBy) : void 0;
  const sortOrder = query.sortOrder === "asc" || query.sortOrder === "desc" ? query.sortOrder : void 0;
  return { sortBy, sortOrder };
}
function parseFilterParams(query) {
  const filters = [];
  const filterPrefix = "filter[";
  Object.keys(query).forEach((key) => {
    if (!key.startsWith(filterPrefix)) {
      return;
    }
    const match = key.match(/^filter\[([^\]]+)\]\[([^\]]+)\]$/);
    if (!match) {
      return;
    }
    const [, field, operator] = match;
    const value = query[key];
    const validOperators = [
      "eq",
      "ne",
      "like",
      "contains",
      "startsWith",
      "endsWith",
      "in",
      "gt",
      "gte",
      "lt",
      "lte",
      "isNull",
      "notNull"
    ];
    if (!validOperators.includes(operator)) {
      return;
    }
    let parsedValue = value;
    if (operator === "in" && typeof value === "string") {
      parsedValue = value.split(",").map((v) => v.trim());
    } else if (operator === "isNull" || operator === "notNull") {
      parsedValue = null;
    }
    filters.push({
      field,
      operator,
      value: parsedValue
    });
  });
  return filters;
}
function parseListQuery(event) {
  const query = getQuery$1(event);
  const { page, perPage } = parsePaginationParams(query);
  const { sortBy, sortOrder } = parseSortParams(query);
  const filters = parseFilterParams(query);
  return {
    page,
    perPage,
    sortBy,
    sortOrder,
    filters
  };
}
function validateSortField(sortBy, allowedFields, defaultField) {
  if (!sortBy) {
    return defaultField;
  }
  if (!allowedFields.includes(sortBy)) {
    return defaultField;
  }
  return sortBy;
}
function validateFilters(filters, allowedFields) {
  return filters.filter((filter) => allowedFields.includes(filter.field));
}

const _proxy$1 = _getPlatformProxy$1().catch((error) => {
  console.error("Failed to initialize wrangler bindings proxy", error);
  return _createStubProxy$1();
}).then((proxy) => {
  globalThis.__env__ = proxy.env;
  return proxy;
});
globalThis.__env__ = _proxy$1.then((proxy) => proxy.env);
const _JvY7H9GFLeuoNTETpbtvuEg8X2Cl9dhOZepjUOt8Lmg = (function(nitroApp) {
  nitroApp.hooks.hook("request", async (event) => {
    const proxy = await _proxy$1;
    event.context.cf = proxy.cf;
    event.context.waitUntil = proxy.ctx.waitUntil.bind(proxy.ctx);
    const request = new Request(getRequestURL(event));
    request.cf = proxy.cf;
    event.context.cloudflare = {
      ...event.context.cloudflare,
      request,
      env: proxy.env,
      context: proxy.ctx
    };
    event.node.req.__unenv__ = {
      ...event.node.req.__unenv__,
      waitUntil: event.context.waitUntil
    };
  });
  nitroApp.hooks._hooks.request.unshift(nitroApp.hooks._hooks.request.pop());
  nitroApp.hooks.hook("close", () => {
    return _proxy$1?.then((proxy) => proxy.dispose);
  });
});
async function _getPlatformProxy$1() {
  const _pkg = "wrangler";
  const { getPlatformProxy } = await import(_pkg).catch(() => {
    throw new Error(
      "Package `wrangler` not found, please install it with: `npx nypm@latest add -D wrangler`"
    );
  });
  const runtimeConfig = useRuntimeConfig();
  const proxyOptions = {
    configPath: runtimeConfig.wrangler.configPath,
    persist: { path: runtimeConfig.wrangler.persistDir }
  };
  if (runtimeConfig.wrangler.environment) {
    proxyOptions.environment = runtimeConfig.wrangler.environment;
  }
  const proxy = await getPlatformProxy(proxyOptions);
  return proxy;
}
function _createStubProxy$1() {
  return {
    env: {},
    cf: {},
    ctx: {
      waitUntil() {
      },
      passThroughOnException() {
      }
    },
    caches: {
      open() {
        const result = Promise.resolve(new _CacheStub$1());
        return result;
      },
      get default() {
        return new _CacheStub$1();
      }
    },
    dispose: () => Promise.resolve()
  };
}
let _CacheStub$1 = class _CacheStub {
  delete() {
    const result = Promise.resolve(false);
    return result;
  }
  match() {
    const result = Promise.resolve(void 0);
    return result;
  }
  put() {
    const result = Promise.resolve();
    return result;
  }
};

const _proxy = _getPlatformProxy().catch((error) => {
  console.error("Failed to initialize wrangler bindings proxy", error);
  return _createStubProxy();
}).then((proxy) => {
  globalThis.__env__ = proxy.env;
  return proxy;
});
globalThis.__env__ = _proxy.then((proxy) => proxy.env);
const _7X8K9eutEHACOm1FYhNTY_nBXsmyF7nPkLxTbNPRTWk = (function(nitroApp) {
  nitroApp.hooks.hook("request", async (event) => {
    const proxy = await _proxy;
    event.context.cf = proxy.cf;
    event.context.waitUntil = proxy.ctx.waitUntil.bind(proxy.ctx);
    const request = new Request(getRequestURL(event));
    request.cf = proxy.cf;
    event.context.cloudflare = {
      ...event.context.cloudflare,
      request,
      env: proxy.env,
      context: proxy.ctx
    };
    event.node.req.__unenv__ = {
      ...event.node.req.__unenv__,
      waitUntil: event.context.waitUntil
    };
  });
  nitroApp.hooks._hooks.request.unshift(nitroApp.hooks._hooks.request.pop());
  nitroApp.hooks.hook("close", () => {
    return _proxy?.then((proxy) => proxy.dispose);
  });
});
async function _getPlatformProxy() {
  const _pkg = "wrangler";
  const { getPlatformProxy } = await import(_pkg).catch(() => {
    throw new Error(
      "Package `wrangler` not found, please install it with: `npx nypm@latest add -D wrangler`"
    );
  });
  const runtimeConfig = useRuntimeConfig();
  const proxyOptions = {
    configPath: runtimeConfig.wrangler.configPath,
    persist: { path: runtimeConfig.wrangler.persistDir }
  };
  if (runtimeConfig.wrangler.environment) {
    proxyOptions.environment = runtimeConfig.wrangler.environment;
  }
  const proxy = await getPlatformProxy(proxyOptions);
  return proxy;
}
function _createStubProxy() {
  return {
    env: {},
    cf: {},
    ctx: {
      waitUntil() {
      },
      passThroughOnException() {
      },
      props: {}
    },
    caches: {
      open() {
        const result = Promise.resolve(new _CacheStub());
        return result;
      },
      get default() {
        return new _CacheStub();
      }
    },
    dispose: () => Promise.resolve()
  };
}
class _CacheStub {
  delete() {
    const result = Promise.resolve(false);
    return result;
  }
  match() {
    const result = Promise.resolve(void 0);
    return result;
  }
  put() {
    const result = Promise.resolve();
    return result;
  }
}

const plugins = [
  _5oiYQsz7JxfzYMCbppsi5qNpo3nwinUo5tfsP9Wuzo,
_qhB7TtNOwMUSmwzXqzSWK8V1GOJTLMHq7J35KcZYxw,
_X2yq_Ox8imq7YrZyLd6nezgHFGC39UmEARsJl4agWSw,
_JvY7H9GFLeuoNTETpbtvuEg8X2Cl9dhOZepjUOt8Lmg,
_7X8K9eutEHACOm1FYhNTY_nBXsmyF7nPkLxTbNPRTWk
];

const assets = {};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_fonts/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _a1GIGv = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _4TykT4 = defineEventHandler((event) => {
  if (!event.path.startsWith("/api/")) {
    return;
  }
  const requestId = getHeader(event, "x-request-id") || crypto.randomUUID();
  event.context.requestId = requestId;
  event.context.ipAddress = getRequestIP(event);
  event.context.userAgent = getHeader(event, "user-agent") || "unknown";
  event.context.endpoint = event.path;
  event.context.method = event.method;
  setHeader(event, "X-Request-ID", requestId);
});

const _jjdv7U = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e;
  if (!event.path.startsWith("/api/")) {
    return;
  }
  if (isPublicRoute$1(event.path)) {
    return;
  }
  const config = useRuntimeConfig(event);
  const isMultitenancyEnabled = (_b = (_a = config.multitenancy) == null ? void 0 : _a.enabled) != null ? _b : false;
  if (!isMultitenancyEnabled) {
    const db2 = (_d = (_c = event.context.cloudflare) == null ? void 0 : _c.env) == null ? void 0 : _d.DB;
    if (!db2) {
      throw new InternalServerError(
        "Default database not found. Ensure DB binding exists."
      );
    }
    event.context.db = db2;
    event.context.tenantId = "default";
    return;
  }
  const host = getHeader(event, "host") || "";
  const hostWithoutPort = host.split(":")[0];
  const subdomain = hostWithoutPort.split(".")[0] || null;
  const isDev = isDevelopment(event);
  const tenantId = isDev ? getHeader(event, HdrKeyTenantID) || subdomain : subdomain;
  if (!tenantId) {
    throw new TenantMismatchError(
      "Tenant ID required. Use subdomain (e.g., acme.example.com)" + (isDev ? " or x-tenant-id header" : "")
    );
  }
  const dbBinding = `DB_${tenantId.toUpperCase().replace(/-/g, "_")}`;
  const cfEnv = (_e = event.context.cloudflare) == null ? void 0 : _e.env;
  const db = cfEnv == null ? void 0 : cfEnv[dbBinding];
  if (!db) {
    throw new TenantMismatchError(
      `Database for tenant "${tenantId}" not found. Expected binding: ${dbBinding}`
    );
  }
  event.context.db = db;
  event.context.tenantId = tenantId;
});
function isPublicRoute$1(path) {
  const publicRoutes = [
    "/api/health",
    "/api/_auth"
    // nuxt-auth-utils internal endpoints
  ];
  return publicRoutes.some((route) => path.startsWith(route));
}

const _lF2lZp = defineEventHandler(async (event) => {
  var _a;
  if (!event.path.startsWith("/api/")) {
    return;
  }
  if (isPublicRoute(event.path)) {
    return;
  }
  const session = await getUserSession(event);
  if (!session || !((_a = session.user) == null ? void 0 : _a.id)) {
    throw new AuthenticationError("Invalid or missing authentication session.");
  }
  if (session.tenantId !== event.context.tenantId) {
    throw new TenantMismatchError(
      "Tenant mismatch between session and request",
      {
        sessionTenantId: session.tenantId,
        currentTenantId: event.context.tenantId,
        userId: session.user.id
      }
    );
  }
  event.context.userId = session.user.id;
});
function isPublicRoute(path) {
  const publicRoutes = [
    "/api/health",
    "/api/reset-and-seed",
    "/api/test-db",
    "/api/v1/auth/signup",
    "/api/v1/auth/signin",
    "/api/v1/auth/email/confirm",
    "/api/v1/auth/password/reset/request",
    "/api/v1/auth/password/reset",
    "/api/_nuxt_icon/",
    // nuxt icon endpoint
    "/api/_auth/session"
    // nuxt-auth-utils session endpoint
  ];
  return publicRoutes.some((route) => path === route || path.startsWith(route));
}

const warnOnceSet = /* @__PURE__ */ new Set();
const DEFAULT_ENDPOINT = "https://api.iconify.design";
const _iiLzli = defineCachedEventHandler(async (event) => {
  const url = getRequestURL(event);
  if (!url)
    return createError({ status: 400, message: "Invalid icon request" });
  const options = useAppConfig().icon;
  const collectionName = event.context.params?.collection?.replace(/\.json$/, "");
  const collection = collectionName ? await collections[collectionName]?.() : null;
  const apiEndPoint = options.iconifyApiEndpoint || DEFAULT_ENDPOINT;
  const icons = url.searchParams.get("icons")?.split(",");
  if (collection) {
    if (icons?.length) {
      const data = getIcons(
        collection,
        icons
      );
      consola$1.debug(`[Icon] serving ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from bundled collection`);
      return data;
    }
  } else {
    if (collectionName && !warnOnceSet.has(collectionName) && apiEndPoint === DEFAULT_ENDPOINT) {
      consola$1.warn([
        `[Icon] Collection \`${collectionName}\` is not found locally`,
        `We suggest to install it via \`npm i -D @iconify-json/${collectionName}\` to provide the best end-user experience.`
      ].join("\n"));
      warnOnceSet.add(collectionName);
    }
  }
  if (options.fallbackToApi === true || options.fallbackToApi === "server-only") {
    const apiUrl = new URL("./" + basename(url.pathname) + url.search, apiEndPoint);
    consola$1.debug(`[Icon] fetching ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from iconify api`);
    if (apiUrl.host !== new URL(apiEndPoint).host) {
      return createError({ status: 400, message: "Invalid icon request" });
    }
    try {
      const data = await $fetch(apiUrl.href);
      return data;
    } catch (e) {
      consola$1.error(e);
      if (e.status === 404)
        return createError({ status: 404 });
      else
        return createError({ status: 500, message: "Failed to fetch fallback icon" });
    }
  }
  return createError({ status: 404 });
}, {
  group: "nuxt",
  name: "icon",
  getKey(event) {
    const collection = event.context.params?.collection?.replace(/\.json$/, "") || "unknown";
    const icons = String(getQuery$1(event).icons || "");
    return `${collection}_${icons.split(",")[0]}_${icons.length}_${hash$1(icons)}`;
  },
  swr: true,
  maxAge: 60 * 60 * 24 * 7
  // 1 week
});

const _K4lNUl = eventHandler(async (event) => {
  await clearUserSession(event);
  return { loggedOut: true };
});

const _5O1sve = eventHandler(async (event) => {
  const session = await getUserSession(event);
  if (Object.keys(session).length > 0) {
    await sessionHooks.callHookParallel("fetch", session, event);
  }
  const { secure, ...data } = session;
  return data;
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
};

function createSSRContext(event) {
  const ssrContext = {
    url: event.path,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || (false),
    head: createHead(unheadOptions),
    error: false,
    nuxt: void 0,
    /* NuxtApp */
    payload: {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set()
  };
  return ssrContext;
}
function setSSRError(ssrContext, error) {
  ssrContext.error = true;
  ssrContext.payload = { error };
  ssrContext.url = error.url;
}

const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const getServerEntry = () => import('file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/.nuxt/dist/server/server.mjs').then((r) => r.default || r);
const getClientManifest = () => import('file:///Users/alsey89/Documents/code/personal/fullstack-nuxt-cf-template/.nuxt/dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
    {
      const APP_SPA_LOADER_OPEN_TAG = `<${appSpaLoaderTag}${propsToString(appSpaLoaderAttrs)}>`;
      const APP_SPA_LOADER_CLOSE_TAG = `</${appSpaLoaderTag}>`;
      const appTemplate = APP_ROOT_OPEN_TAG + APP_ROOT_CLOSE_TAG;
      const loaderTemplate = r ? APP_SPA_LOADER_OPEN_TAG + r + APP_SPA_LOADER_CLOSE_TAG : "";
      return appTemplate + loaderTemplate;
    }
  });
  const options = {
    manifest,
    renderToString: () => spaTemplate,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules ||= /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function getRenderer(ssrContext) {
  return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
function getServerComponentHTML(body) {
  const match = body.match(ROOT_NODE_REGEX);
  return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return void 0;
  }
  const response = {};
  for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
    response[name] = {
      ...slot,
      fallback: ssrContext.teleports?.[`island-fallback=${name}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return void 0;
  }
  const response = {};
  for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
    const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...component,
      html,
      slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, id, slot] = match;
      if (!slot || clientUid !== id) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const ISLAND_SUFFIX_RE = /\.json(\?.*)?$/;
const _SxA8c9 = defineEventHandler(async (event) => {
  const nitroApp = useNitroApp();
  setResponseHeaders(event, {
    "content-type": "application/json;charset=utf-8",
    "x-powered-by": "Nuxt"
  });
  const islandContext = await getIslandContext(event);
  const ssrContext = {
    ...createSSRContext(event),
    islandContext,
    noSSR: false,
    url: islandContext.url
  };
  const renderer = await getSSRRenderer();
  const renderResult = await renderer.renderToString(ssrContext).catch(async (error) => {
    await ssrContext.nuxt?.hooks.callHook("app:error", error);
    throw error;
  });
  const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult });
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  {
    const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      ssrContext.head.push({ link }, { mode: "server" });
    }
  }
  const islandHead = {};
  for (const entry of ssrContext.head.entries.values()) {
    for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
      const currentValue = islandHead[key];
      if (Array.isArray(currentValue)) {
        currentValue.push(...value);
      }
      islandHead[key] = value;
    }
  }
  const islandResponse = {
    id: islandContext.id,
    head: islandHead,
    html: getServerComponentHTML(renderResult.html),
    components: getClientIslandResponse(ssrContext),
    slots: getSlotIslandResponse(ssrContext)
  };
  await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
  return islandResponse;
});
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr$1(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}

const _u2LLnR = lazyEventHandler(() => {
  const opts = useRuntimeConfig().ipx || {};
  const fsDir = opts?.fs?.dir ? (Array.isArray(opts.fs.dir) ? opts.fs.dir : [opts.fs.dir]).map((dir) => isAbsolute(dir) ? dir : fileURLToPath(new URL(dir, globalThis._importMeta_.url))) : void 0;
  const fsStorage = opts.fs?.dir ? ipxFSStorage({ ...opts.fs, dir: fsDir }) : void 0;
  const httpStorage = opts.http?.domains ? ipxHttpStorage({ ...opts.http }) : void 0;
  if (!fsStorage && !httpStorage) {
    throw new Error("IPX storage is not configured!");
  }
  const ipxOptions = {
    ...opts,
    storage: fsStorage || httpStorage,
    httpStorage
  };
  const ipx = createIPX(ipxOptions);
  const ipxHandler = createIPXH3Handler(ipx);
  return useBase(opts.baseURL, ipxHandler);
});

const _lazy_UiQiHv = () => Promise.resolve().then(function () { return health_get$1; });
const _lazy_e7QIhM = () => Promise.resolve().then(function () { return resetAndSeed_post$1; });
const _lazy_DC3pMj = () => Promise.resolve().then(function () { return confirm_post$1; });
const _lazy_ttUIMa = () => Promise.resolve().then(function () { return reset_put$1; });
const _lazy_C6cLkR = () => Promise.resolve().then(function () { return request_post$1; });
const _lazy__azIm0 = () => Promise.resolve().then(function () { return signin_post$1; });
const _lazy_PZhmo2 = () => Promise.resolve().then(function () { return signout_post$1; });
const _lazy_ZXyPDJ = () => Promise.resolve().then(function () { return signup_post$1; });
const _lazy_s8X541 = () => Promise.resolve().then(function () { return index_get$5; });
const _lazy_c0ulAp = () => Promise.resolve().then(function () { return _id__delete$1; });
const _lazy_IUsc7O = () => Promise.resolve().then(function () { return _id__get$3; });
const _lazy_5MODy5 = () => Promise.resolve().then(function () { return _id__put$1; });
const _lazy_t6HS9q = () => Promise.resolve().then(function () { return index_get$3; });
const _lazy_JXghd3 = () => Promise.resolve().then(function () { return index_post$1; });
const _lazy_3VzC2d = () => Promise.resolve().then(function () { return _id__get$1; });
const _lazy_ND9wnX = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy_36vCNq = () => Promise.resolve().then(function () { return profile_get$1; });
const _lazy_JgQlIp = () => Promise.resolve().then(function () { return profile_put$1; });
const _lazy_F22go1 = () => Promise.resolve().then(function () { return roles_get$1; });
const _lazy_eusg0m = () => Promise.resolve().then(function () { return roles_put$1; });
const _lazy_ooIOfY = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _a1GIGv, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _4TykT4, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _jjdv7U, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _lF2lZp, lazy: false, middleware: true, method: undefined },
  { route: '/api/health', handler: _lazy_UiQiHv, lazy: true, middleware: false, method: "get" },
  { route: '/api/reset-and-seed', handler: _lazy_e7QIhM, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/auth/email/confirm', handler: _lazy_DC3pMj, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/auth/password/reset', handler: _lazy_ttUIMa, lazy: true, middleware: false, method: "put" },
  { route: '/api/v1/auth/password/reset/request', handler: _lazy_C6cLkR, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/auth/signin', handler: _lazy__azIm0, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/auth/signout', handler: _lazy_PZhmo2, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/auth/signup', handler: _lazy_ZXyPDJ, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/permissions', handler: _lazy_s8X541, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/roles/:id', handler: _lazy_c0ulAp, lazy: true, middleware: false, method: "delete" },
  { route: '/api/v1/roles/:id', handler: _lazy_IUsc7O, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/roles/:id', handler: _lazy_5MODy5, lazy: true, middleware: false, method: "put" },
  { route: '/api/v1/roles', handler: _lazy_t6HS9q, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/roles', handler: _lazy_JXghd3, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/user/:id', handler: _lazy_3VzC2d, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/user', handler: _lazy_ND9wnX, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/user/profile', handler: _lazy_36vCNq, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/user/profile', handler: _lazy_JgQlIp, lazy: true, middleware: false, method: "put" },
  { route: '/api/v1/users/:userId/roles', handler: _lazy_F22go1, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/users/:userId/roles', handler: _lazy_eusg0m, lazy: true, middleware: false, method: "put" },
  { route: '/__nuxt_error', handler: _lazy_ooIOfY, lazy: true, middleware: false, method: undefined },
  { route: '/api/_nuxt_icon/:collection', handler: _iiLzli, lazy: false, middleware: false, method: undefined },
  { route: '/api/_auth/session', handler: _K4lNUl, lazy: false, middleware: false, method: "delete" },
  { route: '/api/_auth/session', handler: _5O1sve, lazy: false, middleware: false, method: "get" },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _u2LLnR, lazy: false, middleware: false, method: undefined },
  { route: '/_fonts/**', handler: _lazy_ooIOfY, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_ooIOfY, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(nodeHandler, aRequest);
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

if (!globalThis.crypto) {
  globalThis.crypto = crypto$1;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

function getDatabase(event) {
  const db = event.context.db;
  if (!db) {
    throw new Error(
      "Database not available in context. This usually means the tenant middleware didn't run or failed."
    );
  }
  return db;
}

const baseFields = {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" })
};
const globalBaseFields = baseFields;
const migrations = sqliteTable(
  "_migrations",
  {
    id: text("id").primaryKey(),
    // e.g., "0003_add_idempotency"
    hash: text("hash").notNull(),
    // SHA-256 of migration SQL
    appliedAt: integer("applied_at", { mode: "timestamp" }).notNull(),
    appliedBy: text("applied_by"),
    // "github-actions" or "developer@email.com"
    rolledBackAt: integer("rolled_back_at", { mode: "timestamp" }),
    timeravelBookmark: text("timetravel_bookmark"),
    // D1 bookmark before migration
    status: text("status", {
      enum: ["PENDING", "APPLIED", "FAILED", "ROLLED_BACK"]
    }).notNull(),
    errorMessage: text("error_message"),
    environment: text("environment", { enum: ["local", "staging", "production"] }).notNull()
  },
  (table) => ({
    statusIdx: index("migrations_status_idx").on(table.status),
    envIdx: index("migrations_env_idx").on(table.environment),
    appliedAtIdx: index("migrations_applied_at_idx").on(table.appliedAt)
  })
);

const users = sqliteTable(
  "users",
  {
    ...baseFields,
    // Authentication
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    isEmailVerified: integer("is_email_verified", { mode: "boolean" }).default(false).notNull(),
    // Personal Info
    firstName: text("first_name"),
    lastName: text("last_name"),
    dateOfBirth: integer("date_of_birth", { mode: "timestamp" }),
    // Contact Info
    phone: text("phone"),
    address: text("address"),
    city: text("city"),
    state: text("state"),
    country: text("country"),
    postalCode: text("postal_code"),
    // Basic role for simple RBAC (extend as needed)
    role: text("role").default("user").notNull(),
    // admin, manager, user, etc.
    // Status
    isActive: integer("is_active", { mode: "boolean" }).default(true).notNull()
  },
  (table) => ({
    // Unique: email per database (each database = one tenant)
    emailUnique: unique("users_email_unique").on(table.email),
    // Critical: email used for login
    emailIdx: index("users_email_idx").on(table.email),
    // Common query indexes
    roleIdx: index("users_role_idx").on(table.role),
    activeIdx: index("users_active_idx").on(table.isActive),
    deletedIdx: index("users_deleted_idx").on(table.deletedAt)
  })
);
const permissions = sqliteTable(
  "permissions",
  {
    code: text("code").primaryKey(),
    // e.g., "users:create", "posts:read"
    name: text("name").notNull(),
    description: text("description"),
    category: text("category").notNull(),
    // e.g., "users", "content", "admin"
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date()),
    deletedAt: integer("deleted_at", { mode: "timestamp" })
  },
  (table) => ({
    categoryIdx: index("permissions_category_idx").on(table.category),
    deletedIdx: index("permissions_deleted_idx").on(table.deletedAt)
  })
);
const roles = sqliteTable(
  "roles",
  {
    ...baseFields,
    name: text("name").notNull(),
    description: text("description"),
    // JSON array of permission codes for fast runtime access
    permissions: text("permissions", { mode: "json" }).$type().notNull().default([]),
    // System roles cannot be deleted (admin, manager, user)
    isSystem: integer("is_system", { mode: "boolean" }).default(false).notNull()
  },
  (table) => ({
    nameUnique: unique("roles_name_unique").on(table.name),
    systemIdx: index("roles_system_idx").on(table.isSystem),
    deletedIdx: index("roles_deleted_idx").on(table.deletedAt)
  })
);
const userRoles = sqliteTable(
  "user_roles",
  {
    ...baseFields,
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    roleId: text("role_id").notNull().references(() => roles.id, { onDelete: "cascade" })
  },
  (table) => ({
    // Unique: one role assignment per user-role pair
    userRoleUnique: unique("user_roles_unique").on(table.userId, table.roleId),
    userIdx: index("user_roles_user_idx").on(table.userId),
    roleIdx: index("user_roles_role_idx").on(table.roleId)
  })
);
const userSettings = sqliteTable(
  "user_settings",
  {
    ...baseFields,
    userId: text("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
    // Store as JSON text
    settings: text("settings", { mode: "json" }).$type().default({})
  },
  (table) => ({
    userIdx: index("user_settings_user_idx").on(table.userId)
  })
);
const auditLogs = sqliteTable(
  "audit_logs",
  {
    ...baseFields,
    // User who performed action (nullable - system actions have no user)
    userId: text("user_id").references(() => users.id, {
      onDelete: "set null"
    }),
    action: text("action").notNull(),
    // e.g., "USER_SIGNED_UP", "POST_PUBLISHED"
    // Entity affected
    entityType: text("entity_type"),
    // e.g., "User", "Post"
    entityId: text("entity_id"),
    // Request context (for tracking and debugging)
    requestId: text("request_id"),
    endpoint: text("endpoint"),
    method: text("method"),
    statusCode: integer("status_code"),
    // State tracking (before/after)
    stateBefore: text("state_before", { mode: "json" }).$type(),
    stateAfter: text("state_after", { mode: "json" }).$type(),
    // Additional metadata
    metadata: text("metadata", { mode: "json" }).$type(),
    // Network info
    ipAddress: text("ip_address"),
    userAgent: text("user_agent")
  },
  (table) => ({
    userIdx: index("audit_logs_user_idx").on(table.userId),
    actionIdx: index("audit_logs_action_idx").on(table.action),
    entityIdx: index("audit_logs_entity_idx").on(
      table.entityType,
      table.entityId
    ),
    requestIdx: index("audit_logs_request_idx").on(table.requestId),
    endpointIdx: index("audit_logs_endpoint_idx").on(table.endpoint),
    createdAtIdx: index("audit_logs_created_at_idx").on(table.createdAt)
  })
);
const usersRelations = relations(users, ({ one, many }) => ({
  roles: many(userRoles),
  settings: one(userSettings, {
    fields: [users.id],
    references: [userSettings.userId]
  }),
  auditLogs: many(auditLogs)
}));
const rolesRelations = relations(roles, ({ many }) => ({
  userRoles: many(userRoles)
}));
const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id]
  }),
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id]
  })
}));

const schema = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  auditLogs: auditLogs,
  baseFields: baseFields,
  globalBaseFields: globalBaseFields,
  migrations: migrations,
  permissions: permissions,
  roles: roles,
  rolesRelations: rolesRelations,
  userRoles: userRoles,
  userRolesRelations: userRolesRelations,
  userSettings: userSettings,
  users: users,
  usersRelations: usersRelations
}, Symbol.toStringTag, { value: 'Module' }));

const health_get = defineEventHandler(async (event) => {
  const d1 = getDatabase(event);
  const db = drizzle(d1, { schema });
  try {
    const userCount = await db.select().from(users).all();
    const roleCount = await db.select().from(roles).all();
    return {
      success: true,
      message: "API is healthy and DB connection works!",
      data: {
        users: userCount.length,
        roles: roleCount.length,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      stack: error.stack
    };
  }
});

const health_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: health_get
}, Symbol.toStringTag, { value: 'Module' }));

async function executeBatch(db, statements) {
  if (statements.length === 0) {
    return [];
  }
  if (statements.length > 100) {
    throw new Error(
      `D1 batch limit is 100 statements, got ${statements.length}`
    );
  }
  return db.batch(statements);
}
function createBatchInserts(db, table, records) {
  return records.map((record) => {
    const keys = Object.keys(record);
    const values = Object.values(record);
    const placeholders = keys.map(() => "?").join(", ");
    const sql = `INSERT INTO ${table} (${keys.join(
      ", "
    )}) VALUES (${placeholders})`;
    return db.prepare(sql).bind(...values);
  });
}

const scrypt = new Scrypt({
  cost: 16384,
  blockSize: 8,
  parallelization: 1,
  maxMemory: 33554432
});
const hashUtil = new Hash(scrypt);
async function hashPassword(password) {
  return await hashUtil.make(password);
}
async function seedDatabase(db, options) {
  var _a;
  const now = /* @__PURE__ */ new Date();
  const isMultitenancyEnabled = (_a = options == null ? void 0 : options.multitenancyEnabled) != null ? _a : true;
  console.log("\u{1F331} Starting template database seed (using atomic batch operations)...\n");
  console.log("\u{1F510} Creating permissions...");
  const permissionCodes = [
    // Users
    { code: "users:view", name: "View Users", category: "USERS" },
    { code: "users:create", name: "Create Users", category: "USERS" },
    { code: "users:update", name: "Update Users", category: "USERS" },
    { code: "users:delete", name: "Delete Users", category: "USERS" },
    { code: "users:*", name: "All User Permissions", category: "USERS" },
    // Roles
    { code: "roles:view", name: "View Roles", category: "ROLES" },
    { code: "roles:create", name: "Create Roles", category: "ROLES" },
    { code: "roles:update", name: "Update Roles", category: "ROLES" },
    { code: "roles:delete", name: "Delete Roles", category: "ROLES" },
    { code: "roles:*", name: "All Role Permissions", category: "ROLES" },
    // System
    { code: "*", name: "Super Admin (All Permissions)", category: "SYSTEM" }
  ];
  const permissionValues = permissionCodes.map((p) => ({
    code: p.code,
    name: p.name,
    description: p.name,
    category: p.category,
    created_at: now.getTime(),
    updated_at: now.getTime(),
    deleted_at: null
  }));
  const permissionStatements = createBatchInserts(db, "permissions", permissionValues);
  await executeBatch(db, permissionStatements);
  console.log(`\u2705 Created ${permissionCodes.length} permission definitions (atomic batch)
`);
  console.log("\u{1F465} Creating users...");
  const passwordHash = await hashPassword("testtesttest");
  const users = [
    {
      id: crypto.randomUUID(),
      email: "admin@test.com",
      // TODO: Update for your domain
      firstName: "Admin",
      lastName: "User",
      phone: "+1-555-234-5678",
      role: "admin"
    },
    {
      id: crypto.randomUUID(),
      email: "manager@test.com",
      // TODO: Update for your domain
      firstName: "Manager",
      lastName: "User",
      phone: "+1-555-345-6789",
      role: "manager"
    },
    {
      id: crypto.randomUUID(),
      email: "user@test.com",
      // TODO: Update for your domain
      firstName: "Regular",
      lastName: "User",
      phone: "+1-555-456-7890",
      role: "user"
    }
  ];
  const userValues = users.map((u) => ({
    id: u.id,
    email: u.email,
    password_hash: passwordHash,
    first_name: u.firstName,
    last_name: u.lastName,
    phone: u.phone,
    role: u.role,
    is_email_verified: 1,
    // SQLite uses 1/0 for boolean
    is_active: 1,
    created_at: now.getTime(),
    updated_at: now.getTime(),
    deleted_at: null
  }));
  const userStatements = createBatchInserts(db, "users", userValues);
  await executeBatch(db, userStatements);
  const createdUsers = users;
  users.forEach((u) => {
    console.log(`\u2705 Created user: ${u.email} (${u.role})`);
  });
  console.log(`   Password for all users: testtesttest
`);
  console.log("\u{1F3AD} Creating roles...");
  const roles = [
    {
      id: crypto.randomUUID(),
      name: "admin",
      description: "Full system access (super admin)",
      permissions: ["*"],
      // All permissions via wildcard
      isSystem: true
    },
    {
      id: crypto.randomUUID(),
      name: "manager",
      description: "User management access",
      permissions: ["users:view", "users:update"],
      isSystem: true
    },
    {
      id: crypto.randomUUID(),
      name: "user",
      description: "Basic user access (read-only)",
      permissions: ["users:view"],
      isSystem: true
    }
  ];
  const roleStatements = roles.map(
    (role) => db.prepare(
      `INSERT INTO roles (id, name, description, permissions, is_system, created_at, updated_at, deleted_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      role.id,
      role.name,
      role.description,
      JSON.stringify(role.permissions),
      // SQLite stores JSON as TEXT
      role.isSystem ? 1 : 0,
      now.getTime(),
      now.getTime(),
      null
    )
  );
  await executeBatch(db, roleStatements);
  const adminRole = roles[0];
  const managerRole = roles[1];
  const userRole = roles[2];
  roles.forEach((role) => {
    console.log(`\u2705 Created role: ${role.name} (${role.permissions.length} permissions)`);
  });
  console.log();
  console.log("\u{1F517} Assigning roles to users...");
  const roleAssignments = [
    {
      id: crypto.randomUUID(),
      userId: createdUsers[0].id,
      roleId: adminRole.id,
      roleName: adminRole.name,
      userEmail: createdUsers[0].email
    },
    {
      id: crypto.randomUUID(),
      userId: createdUsers[1].id,
      roleId: managerRole.id,
      roleName: managerRole.name,
      userEmail: createdUsers[1].email
    },
    {
      id: crypto.randomUUID(),
      userId: createdUsers[2].id,
      roleId: userRole.id,
      roleName: userRole.name,
      userEmail: createdUsers[2].email
    }
  ];
  const userRoleValues = roleAssignments.map((ra) => ({
    id: ra.id,
    user_id: ra.userId,
    role_id: ra.roleId,
    created_at: now.getTime(),
    updated_at: now.getTime(),
    deleted_at: null
  }));
  const userRoleStatements = createBatchInserts(db, "user_roles", userRoleValues);
  await executeBatch(db, userRoleStatements);
  roleAssignments.forEach((ra) => {
    console.log(`\u2705 Assigned "${ra.roleName}" role to ${ra.userEmail}`);
  });
  console.log();
  console.log("\u{1F389} Template seed completed successfully!\n");
  console.log("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
  console.log("\u{1F4CA} TEMPLATE SEED SUMMARY");
  console.log("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
  console.log(`Architecture: Per-tenant database`);
  console.log(`Mode: ${isMultitenancyEnabled ? "Multi-tenant" : "Single-tenant"}`);
  console.log(`Transaction: Atomic batch operations (D1 batch API)`);
  console.log(`Permissions: 11 permissions with wildcards`);
  console.log(`Roles: 3 system roles (admin, manager, user)`);
  console.log(`
Test Accounts:`);
  createdUsers.forEach((user) => {
    console.log(`
\u{1F464} ${user.firstName} ${user.lastName} (${user.role}):`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Password: testtesttest`);
  });
  console.log(`
\u{1F527} Usage:`);
  if (isMultitenancyEnabled) {
    console.log(`   # Multi-tenant mode: Include x-tenant-id header`);
    console.log(`   curl -X POST http://localhost:3000/api/v1/auth/signin \\`);
    console.log(`     -H "Content-Type: application/json" \\`);
    console.log(`     -H "x-tenant-id: your-tenant-id" \\`);
    console.log(`     -d '{"email":"admin@test.com","password":"testtesttest"}'`);
  } else {
    console.log(`   # Single-tenant mode: No tenant header needed`);
    console.log(`   curl -X POST http://localhost:3000/api/v1/auth/signin \\`);
    console.log(`     -H "Content-Type: application/json" \\`);
    console.log(`     -d '{"email":"admin@test.com","password":"testtesttest"}'`);
  }
  console.log("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n");
}
async function clearDatabase(db) {
  const drizzleDb = drizzle(db, { schema });
  console.log("\u{1F5D1}\uFE0F  Clearing database...\n");
  await db.exec("PRAGMA foreign_keys = OFF;");
  try {
    await drizzleDb.delete(userRoles);
    await drizzleDb.delete(roles);
    await drizzleDb.delete(userSettings);
    await drizzleDb.delete(users);
    await drizzleDb.delete(permissions);
    await drizzleDb.delete(auditLogs);
    console.log("\u2705 Database cleared\n");
  } finally {
    await db.exec("PRAGMA foreign_keys = ON;");
  }
}

function createSuccessResponse(message, data, pagination) {
  const response = {
    message,
    data: data !== void 0 ? data : null,
    error: null
  };
  if (pagination) {
    response.pagination = pagination;
  }
  return response;
}

const resetAndSeed_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const config = useRuntimeConfig(event);
  const env = (_a = event.context.cloudflare) == null ? void 0 : _a.env;
  const isProd = isProduction(event);
  const seedSecret = config.seedSecret;
  if (isProd) {
    const providedSecret = getHeader(event, "x-seed-secret");
    if (!seedSecret || providedSecret !== seedSecret) {
      throw new AuthorizationError("Invalid seed secret.");
    }
  }
  const db = env == null ? void 0 : env.DB;
  if (!db) {
    throw new Error("D1 database not available");
  }
  console.log("\u{1F5D1}\uFE0F  Clearing database...");
  await clearDatabase(db);
  console.log("\u{1F331} Seeding database...");
  const isMultitenancyEnabled = (_c = (_b = config.multitenancy) == null ? void 0 : _b.enabled) != null ? _c : true;
  await seedDatabase(db, { multitenancyEnabled: isMultitenancyEnabled });
  return createSuccessResponse("Database seeded successfully", {
    environment: isProd ? "production" : "development",
    multitenancy: isMultitenancyEnabled ? "enabled" : "disabled"
  });
});

const resetAndSeed_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: resetAndSeed_post
}, Symbol.toStringTag, { value: 'Module' }));

var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => __defNormalProp$3(obj, key + "" , value);
class BaseRepository {
  constructor(db) {
    this.db = db;
    __publicField$3(this, "drizzle");
    this.drizzle = drizzle(db, { schema });
  }
  /**
   * Helper to add soft delete filter to queries
   * Returns a SQL condition that checks if deletedAt is NULL
   *
   * @example
   * // Single condition
   * .where(this.notDeleted(schema.users))
   *
   * // Multiple conditions
   * .where(and(
   *   eq(schema.users.email, email),
   *   this.notDeleted(schema.users)
   * ))
   */
  notDeleted(table) {
    return isNull(table.deletedAt);
  }
  /**
   * Build a SQL filter condition from a Filter object
   */
  buildFilterCondition(table, filter) {
    const column = table[filter.field];
    if (!column) {
      return void 0;
    }
    switch (filter.operator) {
      case "eq":
        return eq(column, filter.value);
      case "ne":
        return ne(column, filter.value);
      case "like":
        return like(column, filter.value);
      case "contains":
        return like(column, `%${filter.value}%`);
      case "startsWith":
        return like(column, `${filter.value}%`);
      case "endsWith":
        return like(column, `%${filter.value}`);
      case "in":
        return inArray(column, Array.isArray(filter.value) ? filter.value : [filter.value]);
      case "gt":
        return gt(column, filter.value);
      case "gte":
        return gte(column, filter.value);
      case "lt":
        return lt(column, filter.value);
      case "lte":
        return lte(column, filter.value);
      case "isNull":
        return isNull(column);
      case "notNull":
        return isNotNull(column);
      default:
        return void 0;
    }
  }
  /**
   * Build multiple filter conditions and combine with AND
   */
  buildFilters(table, filters) {
    const conditions = filters.map((filter) => this.buildFilterCondition(table, filter)).filter((condition) => condition !== void 0);
    if (conditions.length === 0) {
      return void 0;
    }
    if (conditions.length === 1) {
      return conditions[0];
    }
    return and(...conditions);
  }
  /**
   * Build sorting for a query
   */
  buildSort(table, sortBy, sortOrder = "asc") {
    if (!sortBy) {
      return void 0;
    }
    const column = table[sortBy];
    if (!column) {
      return void 0;
    }
    return sortOrder === "asc" ? asc(column) : desc(column);
  }
  /**
   * Count records with optional filters
   */
  async countRecords(table, baseConditions, filters) {
    var _a;
    const conditions = [];
    if (baseConditions) {
      conditions.push(baseConditions);
    }
    if (filters && filters.length > 0) {
      const filterCondition = this.buildFilters(table, filters);
      if (filterCondition) {
        conditions.push(filterCondition);
      }
    }
    const whereClause = conditions.length > 0 ? and(...conditions) : void 0;
    const result = await this.drizzle.select({ count: count() }).from(table).where(whereClause);
    return ((_a = result[0]) == null ? void 0 : _a.count) || 0;
  }
}

class UserRepository extends BaseRepository {
  constructor(db) {
    super(db);
  }
  /**
   * Find user by email (database-scoped)
   */
  async findByEmail(email) {
    const result = await this.drizzle.select().from(users).where(
      and(
        eq(users.email, email.toLowerCase()),
        this.notDeleted(users)
      )
    ).limit(1);
    return result[0] || null;
  }
  /**
   * Find user by ID (database-scoped)
   */
  async findById(id) {
    const result = await this.drizzle.select().from(users).where(and(eq(users.id, id), this.notDeleted(users))).limit(1);
    return result[0] || null;
  }
  /**
   * Count users with optional filters
   */
  async count(filters) {
    return this.countRecords(
      users,
      this.notDeleted(users),
      filters
    );
  }
  /**
   * List users (database-scoped) with optional filters and sorting
   */
  async list(limit = 100, offset = 0, filters, sortBy, sortOrder) {
    const conditions = [this.notDeleted(users)];
    if (filters && filters.length > 0) {
      const filterCondition = this.buildFilters(users, filters);
      if (filterCondition) {
        conditions.push(filterCondition);
      }
    }
    let query = this.drizzle.select().from(users).where(and(...conditions));
    const sort = this.buildSort(
      users,
      sortBy || "createdAt",
      sortOrder || "desc"
    );
    if (sort) {
      query = query.orderBy(sort);
    }
    if (limit === -1) {
      return query;
    }
    return query.limit(limit).offset(offset);
  }
  /**
   * Create user
   */
  async create(data) {
    const normalizedData = {
      ...data,
      email: data.email.toLowerCase()
    };
    const [user] = await this.drizzle.insert(users).values(normalizedData).returning();
    return user;
  }
  /**
   * Update user
   */
  async update(id, data) {
    const [user] = await this.drizzle.update(users).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(and(eq(users.id, id), this.notDeleted(users))).returning();
    return user || null;
  }
  /**
   * Update password
   */
  async updatePassword(id, passwordHash) {
    return this.update(id, { passwordHash });
  }
  /**
   * Confirm email
   */
  async confirmEmail(id) {
    return this.update(id, { isEmailVerified: true });
  }
  /**
   * Soft delete user
   */
  async softDelete(id) {
    await this.drizzle.update(users).set({ deletedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id));
  }
}
class UserSettingsRepository extends BaseRepository {
  constructor(db) {
    super(db);
  }
  /**
   * Get user settings (database-scoped)
   */
  async getSettings(userId) {
    var _a;
    const result = await this.drizzle.select().from(userSettings).where(
      and(
        eq(userSettings.userId, userId),
        this.notDeleted(userSettings)
      )
    ).limit(1);
    return ((_a = result[0]) == null ? void 0 : _a.settings) || {};
  }
  /**
   * Update user settings
   */
  async updateSettings(userId, settings) {
    const [userSettings$1] = await this.drizzle.insert(userSettings).values({
      userId,
      settings
    }).onConflictDoUpdate({
      target: userSettings.userId,
      set: {
        settings,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return userSettings$1;
  }
}
class AuditLogRepository extends BaseRepository {
  constructor(db) {
    super(db);
  }
  /**
   * Log an action
   */
  async log(userId, action, entityType, entityId, context) {
    const [log] = await this.drizzle.insert(auditLogs).values({
      userId,
      action,
      entityType,
      entityId,
      requestId: context == null ? void 0 : context.requestId,
      endpoint: context == null ? void 0 : context.endpoint,
      method: context == null ? void 0 : context.method,
      statusCode: context == null ? void 0 : context.statusCode,
      ipAddress: context == null ? void 0 : context.ipAddress,
      userAgent: context == null ? void 0 : context.userAgent,
      metadata: context == null ? void 0 : context.metadata,
      stateBefore: context == null ? void 0 : context.stateBefore,
      stateAfter: context == null ? void 0 : context.stateAfter
    }).returning();
    return log;
  }
  /**
   * Get audit logs for entity (database-scoped)
   */
  async getLogsForEntity(entityType, entityId, limit = 50) {
    return this.drizzle.select().from(auditLogs).where(
      and(
        eq(auditLogs.entityType, entityType),
        eq(auditLogs.entityId, entityId)
      )
    ).orderBy(auditLogs.createdAt).limit(limit);
  }
  /**
   * Get recent audit logs (database-scoped)
   */
  async getRecentLogs(limit = 100) {
    return this.drizzle.select().from(auditLogs).orderBy(auditLogs.createdAt).limit(limit);
  }
}

const JWT_CONFIG = {
  EMAIL_CONFIRM_TOKEN_EXPIRES_IN: "24h",
  // 24 hours
  PASSWORD_RESET_TOKEN_EXPIRES_IN: "1h",
  // 1 hour
  ISSUER: "template",
  AUDIENCE: "template-api"
};
function getJWTSecret(event) {
  const config = event ? useRuntimeConfig(event) : useRuntimeConfig();
  const secret = config.jwtSecret;
  const isDev = isDevelopment(event);
  if (!secret || !isDev && secret === "overwrite-this-with-environment-in-production") {
    throw new Error(
      "JWT_SECRET is not configured. Set NUXT_JWT_SECRET environment variable."
    );
  }
  return new TextEncoder().encode(secret);
}
async function generateEmailConfirmToken(userId, email, tenantId, event) {
  const secret = getJWTSecret(event);
  const now = Math.floor(Date.now() / 1e3);
  const expiresIn = 24 * 60 * 60;
  return await new SignJWT({
    userId,
    email,
    tenantId,
    // Bind token to tenant
    purpose: "email-confirm"
  }).setProtectedHeader({ alg: "HS256" }).setIssuedAt(now).setExpirationTime(now + expiresIn).setIssuer(JWT_CONFIG.ISSUER).setAudience(JWT_CONFIG.AUDIENCE).sign(secret);
}
async function generatePasswordResetToken(userId, email, tenantId, event) {
  const secret = getJWTSecret(event);
  const now = Math.floor(Date.now() / 1e3);
  const expiresIn = 10 * 60;
  return await new SignJWT({
    userId,
    email,
    tenantId,
    // Bind token to tenant
    purpose: "password-reset"
  }).setProtectedHeader({ alg: "HS256" }).setIssuedAt(now).setExpirationTime(now + expiresIn).setIssuer(JWT_CONFIG.ISSUER).setAudience(JWT_CONFIG.AUDIENCE).sign(secret);
}
async function verifyEmailConfirmToken(token, currentTenantId, event) {
  try {
    const secret = getJWTSecret(event);
    const { payload } = await jwtVerify(token, secret, {
      issuer: JWT_CONFIG.ISSUER,
      audience: JWT_CONFIG.AUDIENCE
    });
    if (payload.purpose !== "email-confirm") {
      throw new InvalidTokenPurposeError(void 0, {
        expectedPurpose: "email-confirm",
        actualPurpose: payload.purpose
      });
    }
    if (payload.tenantId !== currentTenantId) {
      throw new InvalidTokenError("Token tenant mismatch", {
        tokenTenantId: payload.tenantId,
        currentTenantId
      });
    }
    return payload;
  } catch (error) {
    if (error.code === "ERR_JWT_EXPIRED") {
      throw new TokenExpiredError(void 0, {
        tokenPurpose: "email-confirm"
      });
    }
    throw new InvalidTokenError(void 0, {
      errorType: error.code || "unknown"
    });
  }
}
async function verifyPasswordResetToken(token, currentTenantId, event) {
  try {
    const secret = getJWTSecret(event);
    const { payload } = await jwtVerify(token, secret, {
      issuer: JWT_CONFIG.ISSUER,
      audience: JWT_CONFIG.AUDIENCE
    });
    if (payload.purpose !== "password-reset") {
      throw new InvalidTokenPurposeError(void 0, {
        expectedPurpose: "password-reset",
        actualPurpose: payload.purpose
      });
    }
    if (payload.tenantId !== currentTenantId) {
      throw new InvalidTokenError("Token tenant mismatch", {
        tokenTenantId: payload.tenantId,
        currentTenantId
      });
    }
    return payload;
  } catch (error) {
    if (error.code === "ERR_JWT_EXPIRED") {
      throw new TokenExpiredError(void 0, {
        tokenPurpose: "password-reset"
      });
    }
    throw new InvalidTokenError(void 0, {
      errorType: error.code || "unknown"
    });
  }
}

const PASSWORD_RULES = {
  minLength: 8,
  maxLength: 128};
function validatePasswordStrength(password) {
  const errors = [];
  if (password.length < PASSWORD_RULES.minLength) {
    errors.push(
      `Password must be at least ${PASSWORD_RULES.minLength} characters`
    );
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  return {
    valid: errors.length === 0,
    errors
  };
}
const passwordSchema = z.string().min(
  PASSWORD_RULES.minLength,
  `Password must be at least ${PASSWORD_RULES.minLength} characters`
).max(
  PASSWORD_RULES.maxLength,
  `Password must be less than ${PASSWORD_RULES.maxLength} characters`
).refine(
  (password) => validatePasswordStrength(password).valid,
  (password) => ({
    message: validatePasswordStrength(password).errors.join(", ")
  })
);

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
class IdentityService {
  constructor(event, userRepo, userSettingsRepo, auditLogRepo) {
    this.event = event;
    this.userRepo = userRepo;
    this.userSettingsRepo = userSettingsRepo;
    this.auditLogRepo = auditLogRepo;
    __publicField$2(this, "db");
    __publicField$2(this, "userId");
    this.db = getDatabase(event);
    this.userId = event.context.userId;
  }
  /**
   * Helper to log audit events with request context
   */
  async logAudit(userId, action, entityType, entityId, options) {
    return this.auditLogRepo.log(userId, action, entityType, entityId, {
      requestId: this.event.context.requestId,
      endpoint: this.event.context.endpoint,
      method: this.event.context.method,
      statusCode: (options == null ? void 0 : options.statusCode) || 200,
      ipAddress: this.event.context.ipAddress,
      userAgent: this.event.context.userAgent,
      metadata: options == null ? void 0 : options.metadata,
      stateBefore: options == null ? void 0 : options.stateBefore,
      stateAfter: options == null ? void 0 : options.stateAfter
    });
  }
  // ========================================
  // AUTHENTICATION
  // ========================================
  /**
   * Sign up a new user
   */
  async signUp(data) {
    const { email, password, firstName, lastName, role = "user" } = data;
    validatePasswordStrength(password);
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new EmailAlreadyExistsError(void 0, {
        field: "email",
        email,
        existingUserId: existingUser.id
      });
    }
    const passwordHash = await hashPassword$1(password);
    const user = await this.userRepo.create({
      email: email.toLowerCase(),
      passwordHash,
      firstName,
      lastName,
      role,
      isEmailVerified: false,
      // Require email confirmation
      isActive: true
    });
    await this.logAudit(user.id, "USER_SIGNED_UP", "User", user.id, {
      statusCode: 201,
      metadata: { email: user.email, role }
    });
    const tenantId = this.event.context.tenantId;
    if (!tenantId) {
      throw new InternalServerError("Tenant context not available");
    }
    const confirmToken = generateEmailConfirmToken(
      user.id,
      user.email,
      tenantId,
      this.event
    );
    return { user, confirmToken };
  }
  /**
   * Sign in a user
   */
  async signIn(email, password) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError(void 0, {
        email
      });
    }
    if (!user.isActive) {
      throw new AccountInactiveError(void 0, {
        userId: user.id,
        email: user.email
      });
    }
    const isValid = await verifyPassword(user.passwordHash, password);
    if (!isValid) {
      throw new InvalidCredentialsError(void 0, {
        userId: user.id,
        email
      });
    }
    const { passwordHash, ...userData } = user;
    await this.logAudit(user.id, "USER_SIGNED_IN", "User", user.id);
    return {
      user: userData
    };
  }
  /**
   * Confirm email address
   */
  async confirmEmail(token) {
    const tenantId = this.event.context.tenantId;
    if (!tenantId) {
      throw new InternalServerError("Tenant context not available");
    }
    const { userId, email } = await verifyEmailConfirmToken(
      token,
      tenantId,
      this.event
    );
    const user = await this.userRepo.findById(userId);
    if (!user || user.email !== email) {
      throw new ValidationError("Invalid confirmation token", {
        userId,
        email
      });
    }
    const updatedUser = await this.userRepo.confirmEmail(userId);
    if (!updatedUser) {
      throw new UserNotFoundError(void 0, {
        userId
      });
    }
    await this.logAudit(userId, "EMAIL_CONFIRMED", "User", userId);
    return updatedUser;
  }
  /**
   * Request password reset
   */
  async requestPasswordReset(email) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      return { resetToken: null };
    }
    const tenantId = this.event.context.tenantId;
    if (!tenantId) {
      throw new InternalServerError("Tenant context not available");
    }
    const resetToken = await generatePasswordResetToken(
      user.id,
      user.email,
      tenantId,
      this.event
    );
    await this.logAudit(user.id, "PASSWORD_RESET_REQUESTED", "User", user.id, {
      metadata: { email }
    });
    return { resetToken };
  }
  /**
   * Reset password with token
   */
  async resetPassword(token, newPassword) {
    const tenantId = this.event.context.tenantId;
    if (!tenantId) {
      throw new InternalServerError("Tenant context not available");
    }
    const { userId, email } = await verifyPasswordResetToken(
      token,
      tenantId,
      this.event
    );
    validatePasswordStrength(newPassword);
    const user = await this.userRepo.findById(userId);
    if (!user || user.email !== email) {
      throw new ValidationError("Invalid reset token", {
        userId,
        email
      });
    }
    const isSamePassword = await verifyPassword(user.passwordHash, newPassword);
    if (isSamePassword) {
      throw new PasswordSameAsOldError(void 0, {
        field: "password",
        userId
      });
    }
    const passwordHash = await hashPassword$1(newPassword);
    const updatedUser = await this.userRepo.updatePassword(
      userId,
      passwordHash
    );
    if (!updatedUser) {
      throw new UserNotFoundError();
    }
    await this.logAudit(userId, "PASSWORD_RESET", "User", userId);
    return updatedUser;
  }
  // ========================================
  // USER MANAGEMENT
  // ========================================
  /**
   * Get current authenticated user
   */
  async getCurrentUser() {
    if (!this.userId) {
      throw new AuthenticationError("User not authenticated");
    }
    const user = await this.userRepo.findById(this.userId);
    if (!user) {
      throw new UserNotFoundError();
    }
    const { passwordHash, ...userData } = user;
    return userData;
  }
  /**
   * Get user by ID
   */
  async getUser(userId) {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }
  /**
   * Update user profile
   */
  async updateUser(userId, data) {
    if (!this.userId) {
      throw new AuthenticationError("User not authenticated");
    }
    const { id, passwordHash, createdAt, updatedAt, deletedAt, ...updateData } = data;
    const user = await this.userRepo.update(userId, updateData);
    if (!user) {
      throw new UserNotFoundError();
    }
    await this.logAudit(this.userId, "USER_UPDATED", "User", userId, {
      metadata: { updates: updateData }
    });
    return user;
  }
  /**
   * List users with pagination, filtering, and sorting
   */
  async listUsers(limit, offset, filters, sortBy, sortOrder) {
    return this.userRepo.list(limit, offset, filters, sortBy, sortOrder);
  }
  /**
   * Count users with optional filters
   */
  async countUsers(filters) {
    return this.userRepo.count(filters);
  }
  // ========================================
  // RBAC / PERMISSIONS
  // ========================================
  /**
   * Get user permissions from RBAC system
   * Delegates to RBACService for permission resolution
   */
  async getUserPermissions(userId) {
    const { getRBACService } = await Promise.resolve().then(function () { return rbac; });
    const rbacService = getRBACService(this.event);
    if (!rbacService.isEnabled()) {
      return [];
    }
    return rbacService.getUserPermissions(userId);
  }
  /**
   * Get permission version for cache invalidation
   * Returns a timestamp representing when user's permissions last changed
   */
  async getPermissionVersion(userId) {
    const { getRBACService } = await Promise.resolve().then(function () { return rbac; });
    const rbacService = getRBACService(this.event);
    if (!rbacService.isEnabled()) {
      return 0;
    }
    return Date.now();
  }
  // ========================================
  // USER SETTINGS
  // ========================================
  /**
   * Get user settings
   */
  async getUserSettings(userId) {
    return this.userSettingsRepo.getSettings(userId);
  }
  /**
   * Update user settings
   */
  async updateUserSettings(userId, settings) {
    const updatedSettings = await this.userSettingsRepo.updateSettings(
      userId,
      settings
    );
    await this.logAudit(
      this.userId || userId,
      "USER_SETTINGS_UPDATED",
      "User",
      userId,
      {
        metadata: { settings }
      }
    );
    return updatedSettings;
  }
}
function createIdentityService(event) {
  const db = getDatabase(event);
  return new IdentityService(
    event,
    new UserRepository(db),
    new UserSettingsRepository(db),
    new AuditLogRepository(db)
  );
}

const signinSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format").max(255, "Email must be less than 255 characters"),
  password: z.string().min(1, "Password is required").max(128, "Password must be less than 128 characters"),
  turnstileToken: z.string().optional()
  // TODO: Turnstile - see docs/ROADMAP.md
});
const signupSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format").max(255, "Email must be less than 255 characters"),
  password: passwordSchema,
  passwordConfirmation: z.string().min(1, "Password confirmation is required"),
  firstName: z.string().min(1, "First name is required").max(100, "First name must be less than 100 characters"),
  lastName: z.string().min(1, "Last name is required").max(100, "Last name must be less than 100 characters"),
  turnstileToken: z.string().optional()
  // TODO: Turnstile - see docs/ROADMAP.md
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords must match",
  path: ["passwordConfirmation"]
});
const passwordResetRequestSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format").max(255, "Email must be less than 255 characters"),
  turnstileToken: z.string().optional()
  // TODO: Turnstile - see docs/ROADMAP.md
});
const passwordResetSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  newPassword: passwordSchema,
  newPasswordConfirmation: z.string().min(1, "Password confirmation is required")
}).refine((data) => data.newPassword === data.newPasswordConfirmation, {
  message: "Passwords must match",
  path: ["newPasswordConfirmation"]
});
const emailConfirmSchema = z.object({
  token: z.string().min(1, "Confirmation token is required")
});

const confirm_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validated = emailConfirmSchema.parse(body);
  const identityService = createIdentityService(event);
  await identityService.confirmEmail(validated.token);
  return createSuccessResponse("Email confirmed successfully");
});

const confirm_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: confirm_post
}, Symbol.toStringTag, { value: 'Module' }));

const reset_put = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validated = passwordResetSchema.parse(body);
  const identityService = createIdentityService(event);
  await identityService.resetPassword(validated.token, validated.newPassword);
  return createSuccessResponse("Password reset successfully");
});

const reset_put$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: reset_put
}, Symbol.toStringTag, { value: 'Module' }));

function sanitizeHtml(input) {
  if (!input) return "";
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "").replace(/<[^>]+>/g, "").replace(/&lt;/g, "").replace(/&gt;/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/").trim();
}
function sanitizeEmail(email) {
  if (!email) return "";
  const normalized = validator.normalizeEmail(email.trim(), {
    gmail_remove_dots: false,
    gmail_remove_subaddress: false,
    outlookdotcom_remove_subaddress: false,
    yahoo_remove_subaddress: false,
    icloud_remove_subaddress: false
  });
  return normalized || email.toLowerCase().trim();
}
function sanitizePhone(phone) {
  if (!phone) return "";
  return phone.replace(/[^0-9\s\-\(\)\+]/g, "").trim();
}
function sanitizePostalCode(postalCode) {
  if (!postalCode) return "";
  return postalCode.replace(/[^A-Za-z0-9\s\-]/g, "").trim();
}

const request_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validated = passwordResetRequestSchema.parse(body);
  const sanitizedEmail = sanitizeEmail(validated.email);
  const identityService = createIdentityService(event);
  const result = await identityService.requestPasswordReset(sanitizedEmail);
  return createSuccessResponse(
    "Password reset email will be sent if user exists",
    {
      //! TODO: Remove reset token from response in production
      token: result.resetToken
    }
  );
});

const request_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: request_post
}, Symbol.toStringTag, { value: 'Module' }));

const signin_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validated = signinSchema.parse(body);
  const sanitized = {
    email: sanitizeEmail(validated.email),
    password: validated.password
    // Never sanitize passwords - use as-is
  };
  const identityService = createIdentityService(event);
  const { user } = await identityService.signIn(
    sanitized.email,
    sanitized.password
  );
  const permissions = await identityService.getUserPermissions(user.id);
  const permissionVersion = await identityService.getPermissionVersion(user.id);
  if (permissions.length > 100) {
    console.warn(
      `[WARN] User ${user.id} has ${permissions.length} permissions (>100). Consider refactoring permission model.`
    );
  }
  await setUserSession(event, {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    },
    tenantId: event.context.tenantId,
    // Bind session to tenant (prevents cross-tenant session reuse)
    permissions,
    permissionVersion,
    loggedInAt: Date.now()
  });
  return createSuccessResponse("Signed in successfully", {
    user,
    permissions,
    permissionVersion
  });
});

const signin_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: signin_post
}, Symbol.toStringTag, { value: 'Module' }));

const signout_post = defineEventHandler(async (event) => {
  await clearUserSession(event);
  return createSuccessResponse("Signed out successfully");
});

const signout_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: signout_post
}, Symbol.toStringTag, { value: 'Module' }));

const signup_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validated = signupSchema.parse(body);
  const sanitized = {
    email: sanitizeEmail(validated.email),
    password: validated.password,
    // Never sanitize passwords - use as-is
    firstName: sanitizeHtml(validated.firstName),
    lastName: sanitizeHtml(validated.lastName)
  };
  const identityService = createIdentityService(event);
  await identityService.signUp({
    email: sanitized.email,
    password: sanitized.password,
    firstName: sanitized.firstName,
    lastName: sanitized.lastName
  });
  return createSuccessResponse(
    "Account created successfully. Please confirm your email."
  );
});

const signup_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: signup_post
}, Symbol.toStringTag, { value: 'Module' }));

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, key + "" , value);
class RoleRepository extends BaseRepository {
  /**
   * Create a new role
   */
  async createRole(data) {
    var _a;
    const now = /* @__PURE__ */ new Date();
    const [role] = await this.drizzle.insert(roles).values({
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      permissions: data.permissions,
      isSystem: (_a = data.isSystem) != null ? _a : false,
      createdAt: now,
      updatedAt: now,
      deletedAt: null
    }).returning();
    return role;
  }
  /**
   * Get role by ID
   */
  async getRoleById(roleId) {
    const [role] = await this.drizzle.select().from(roles).where(and(eq(roles.id, roleId), this.notDeleted(roles)));
    return role || null;
  }
  /**
   * Get role by name
   */
  async getRoleByName(name) {
    const [role] = await this.drizzle.select().from(roles).where(and(eq(roles.name, name), this.notDeleted(roles)));
    return role || null;
  }
  /**
   * Count roles with optional filters
   */
  async countRoles(filters, options) {
    const conditions = [this.notDeleted(roles)];
    if ((options == null ? void 0 : options.includeSystem) === false) {
      conditions.push(eq(roles.isSystem, false));
    }
    const baseConditions = and(...conditions);
    return this.countRecords(roles, baseConditions, filters);
  }
  /**
   * List all roles with optional filters and sorting
   */
  async listRoles(limit, offset, filters, sortBy, sortOrder, options) {
    const conditions = [this.notDeleted(roles)];
    if ((options == null ? void 0 : options.includeSystem) === false) {
      conditions.push(eq(roles.isSystem, false));
    }
    if (filters && filters.length > 0) {
      const filterCondition = this.buildFilters(roles, filters);
      if (filterCondition) {
        conditions.push(filterCondition);
      }
    }
    let query = this.drizzle.select().from(roles).where(and(...conditions));
    const sort = this.buildSort(
      roles,
      sortBy || "createdAt",
      sortOrder || "desc"
    );
    if (sort) {
      query = query.orderBy(sort);
    }
    if (limit !== void 0 && limit !== -1) {
      query = query.limit(limit);
      if (offset !== void 0) {
        query = query.offset(offset);
      }
    }
    return query;
  }
  /**
   * Update role
   */
  async updateRole(roleId, data) {
    const [role] = await this.drizzle.update(roles).set({
      ...data,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(eq(roles.id, roleId), this.notDeleted(roles))).returning();
    return role || null;
  }
  /**
   * Soft delete role (cannot delete system roles)
   */
  async deleteRole(roleId) {
    const role = await this.getRoleById(roleId);
    if (!role) {
      return false;
    }
    if (role.isSystem) {
      throw new Error("Cannot delete system role");
    }
    const [deleted] = await this.drizzle.update(roles).set({
      deletedAt: /* @__PURE__ */ new Date()
    }).where(and(eq(roles.id, roleId), this.notDeleted(roles))).returning();
    return !!deleted;
  }
  /**
   * Get all permissions for a role (resolves wildcards)
   */
  async getRolePermissions(roleId) {
    const role = await this.getRoleById(roleId);
    if (!role) {
      return [];
    }
    return role.permissions;
  }
  /**
   * Check if role has specific permission (handles wildcards)
   */
  hasPermission(rolePermissions, permission) {
    if (rolePermissions.includes("*")) {
      return true;
    }
    if (rolePermissions.includes(permission)) {
      return true;
    }
    const [category] = permission.split(":");
    const categoryWildcard = `${category}:*`;
    if (rolePermissions.includes(categoryWildcard)) {
      return true;
    }
    return false;
  }
}
class UserRoleRepository extends BaseRepository {
  constructor(database) {
    super(database);
    __publicField$1(this, "roleRepo");
    this.roleRepo = new RoleRepository(database);
  }
  /**
   * Assign role to user
   */
  async assignRoleToUser(userId, roleId) {
    const now = /* @__PURE__ */ new Date();
    const existing = await this.drizzle.select().from(userRoles).where(
      and(
        eq(userRoles.userId, userId),
        eq(userRoles.roleId, roleId),
        this.notDeleted(userRoles)
      )
    );
    if (existing.length > 0) {
      return existing[0];
    }
    const [assignment] = await this.drizzle.insert(userRoles).values({
      id: crypto.randomUUID(),
      userId,
      roleId,
      createdAt: now,
      updatedAt: now,
      deletedAt: null
    }).returning();
    return assignment;
  }
  /**
   * Remove role from user
   */
  async removeRoleFromUser(userId, roleId) {
    const [removed] = await this.drizzle.update(userRoles).set({
      deletedAt: /* @__PURE__ */ new Date()
    }).where(
      and(
        eq(userRoles.userId, userId),
        eq(userRoles.roleId, roleId),
        this.notDeleted(userRoles)
      )
    ).returning();
    return !!removed;
  }
  /**
   * Get all roles for a user
   */
  async getUserRoles(userId) {
    const userRoleAssignments = await this.drizzle.select({
      role: roles
    }).from(userRoles).innerJoin(
      roles,
      and(
        eq(userRoles.roleId, roles.id),
        this.notDeleted(roles)
      )
    ).where(and(eq(userRoles.userId, userId), this.notDeleted(userRoles)));
    return userRoleAssignments.map((ur) => ur.role);
  }
  /**
   * Get all permissions for a user (aggregated from all roles)
   */
  async getUserPermissions(userId) {
    const roles = await this.getUserRoles(userId);
    const allPermissions = /* @__PURE__ */ new Set();
    for (const role of roles) {
      for (const permission of role.permissions) {
        allPermissions.add(permission);
      }
    }
    return Array.from(allPermissions);
  }
  /**
   * Check if user has specific permission
   */
  async userHasPermission(userId, permission) {
    const permissions = await this.getUserPermissions(userId);
    return this.roleRepo.hasPermission(permissions, permission);
  }
  /**
   * Get all users with a specific role
   */
  async getUsersByRole(roleId) {
    const userRoleAssignments = await this.drizzle.select({
      user: users
    }).from(userRoles).innerJoin(
      users,
      and(
        eq(userRoles.userId, users.id),
        this.notDeleted(users)
      )
    ).where(and(eq(userRoles.roleId, roleId), this.notDeleted(userRoles)));
    return userRoleAssignments.map((ur) => ur.user);
  }
  /**
   * Replace all roles for a user (removes all existing, assigns new ones)
   */
  async replaceUserRoles(userId, roleIds) {
    const existing = await this.drizzle.select().from(userRoles).where(and(eq(userRoles.userId, userId), this.notDeleted(userRoles)));
    for (const assignment of existing) {
      await this.drizzle.update(userRoles).set({ deletedAt: /* @__PURE__ */ new Date() }).where(eq(userRoles.id, assignment.id));
    }
    const assignments = [];
    for (const roleId of roleIds) {
      const assignment = await this.assignRoleToUser(userId, roleId);
      assignments.push(assignment);
    }
    return assignments;
  }
}
class PermissionRepository extends BaseRepository {
  /**
   * Get permission by code
   */
  async getPermissionByCode(code) {
    const [permission] = await this.drizzle.select().from(permissions).where(and(eq(permissions.code, code), this.notDeleted(permissions)));
    return permission || null;
  }
  /**
   * Count permissions with optional filters
   */
  async countPermissions(filters) {
    return this.countRecords(
      permissions,
      this.notDeleted(permissions),
      filters
    );
  }
  /**
   * List all permissions with optional filters and sorting
   */
  async listPermissions(limit, offset, filters, sortBy, sortOrder) {
    const conditions = [this.notDeleted(permissions)];
    if (filters && filters.length > 0) {
      const filterCondition = this.buildFilters(permissions, filters);
      if (filterCondition) {
        conditions.push(filterCondition);
      }
    }
    let query = this.drizzle.select().from(permissions).where(and(...conditions));
    const sort = this.buildSort(
      permissions,
      sortBy || "category",
      sortOrder || "asc"
    );
    if (sort) {
      query = query.orderBy(sort);
    }
    if (limit !== void 0 && limit !== -1) {
      query = query.limit(limit);
      if (offset !== void 0) {
        query = query.offset(offset);
      }
    }
    return query;
  }
  /**
   * List permissions by category
   */
  async listPermissionsByCategory(category) {
    return this.drizzle.select().from(permissions).where(
      and(eq(permissions.category, category), this.notDeleted(permissions))
    ).orderBy(permissions.code);
  }
  /**
   * Validate permission codes (check if they exist in registry)
   * Uses batch query to avoid N+1 problem
   */
  async validatePermissions(codes) {
    if (codes.length === 0) return true;
    const found = await this.drizzle.select().from(permissions).where(
      and(
        inArray(permissions.code, codes),
        this.notDeleted(permissions)
      )
    );
    return found.length === codes.length;
  }
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class RBACService {
  constructor(database, config) {
    __publicField(this, "roleRepo");
    __publicField(this, "userRoleRepo");
    __publicField(this, "permissionRepo");
    __publicField(this, "userRepo");
    __publicField(this, "config");
    var _a, _b;
    this.roleRepo = new RoleRepository(database);
    this.userRoleRepo = new UserRoleRepository(database);
    this.permissionRepo = new PermissionRepository(database);
    this.userRepo = new UserRepository(database);
    this.config = {
      enabled: (_a = config == null ? void 0 : config.enabled) != null ? _a : true,
      allowAllWhenDisabled: (_b = config == null ? void 0 : config.allowAllWhenDisabled) != null ? _b : true
    };
  }
  // ========================================
  // CONFIGURATION
  // ========================================
  /**
   * Check if RBAC is enabled
   */
  isEnabled() {
    return this.config.enabled;
  }
  /**
   * Get RBAC configuration
   */
  getConfig() {
    return { ...this.config };
  }
  // ========================================
  // AUTHORIZATION CHECKS
  // ========================================
  /**
   * Check if user has a specific permission
   * Graceful degradation: Returns true when RBAC disabled
   */
  async userHasPermission(userId, permission) {
    if (!this.config.enabled && this.config.allowAllWhenDisabled) {
      return true;
    }
    const user = await this.userRepo.findById(userId);
    if (!user || !user.isActive) {
      return false;
    }
    return this.userRoleRepo.userHasPermission(userId, permission);
  }
  /**
   * Require permission (throws if not granted)
   * Graceful degradation: No-op when RBAC disabled
   */
  async requirePermission(userId, permission) {
    const hasPermission2 = await this.userHasPermission(userId, permission);
    if (!hasPermission2) {
      throw new PermissionDeniedError(permission, `Permission denied: ${permission} required`);
    }
  }
  /**
   * Check if user has ANY of the specified permissions
   */
  async userHasAnyPermission(userId, permissions) {
    if (!this.config.enabled && this.config.allowAllWhenDisabled) {
      return true;
    }
    for (const permission of permissions) {
      if (await this.userHasPermission(userId, permission)) {
        return true;
      }
    }
    return false;
  }
  /**
   * Check if user has ALL of the specified permissions
   */
  async userHasAllPermissions(userId, permissions) {
    if (!this.config.enabled && this.config.allowAllWhenDisabled) {
      return true;
    }
    for (const permission of permissions) {
      if (!await this.userHasPermission(userId, permission)) {
        return false;
      }
    }
    return true;
  }
  /**
   * Get all permissions for a user
   */
  async getUserPermissions(userId) {
    if (!this.config.enabled) {
      return [];
    }
    return this.userRoleRepo.getUserPermissions(userId);
  }
  // ========================================
  // ROLE MANAGEMENT
  // ========================================
  /**
   * Create a new role
   */
  async createRole(data) {
    const isValid = await this.permissionRepo.validatePermissions(data.permissions);
    if (!isValid) {
      throw new Error("Invalid permission codes provided");
    }
    return this.roleRepo.createRole(data);
  }
  /**
   * Get role by ID
   */
  async getRoleById(roleId) {
    return this.roleRepo.getRoleById(roleId);
  }
  /**
   * Get role by name
   */
  async getRoleByName(name) {
    return this.roleRepo.getRoleByName(name);
  }
  /**
   * List all roles with pagination, filtering, and sorting
   */
  async listRoles(limit, offset, filters, sortBy, sortOrder, options) {
    return this.roleRepo.listRoles(limit, offset, filters, sortBy, sortOrder, options);
  }
  /**
   * Count roles with optional filters
   */
  async countRoles(filters, options) {
    return this.roleRepo.countRoles(filters, options);
  }
  /**
   * Update role
   */
  async updateRole(roleId, data) {
    if (data.permissions) {
      const isValid = await this.permissionRepo.validatePermissions(data.permissions);
      if (!isValid) {
        throw new Error("Invalid permission codes provided");
      }
    }
    return this.roleRepo.updateRole(roleId, data);
  }
  /**
   * Delete role (soft delete)
   */
  async deleteRole(roleId) {
    return this.roleRepo.deleteRole(roleId);
  }
  // ========================================
  // USER-ROLE MANAGEMENT
  // ========================================
  /**
   * Assign role to user
   */
  async assignRoleToUser(userId, roleId) {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const role = await this.roleRepo.getRoleById(roleId);
    if (!role) {
      throw new Error("Role not found");
    }
    return this.userRoleRepo.assignRoleToUser(userId, roleId);
  }
  /**
   * Remove role from user
   */
  async removeRoleFromUser(userId, roleId) {
    return this.userRoleRepo.removeRoleFromUser(userId, roleId);
  }
  /**
   * Get all roles for a user
   */
  async getUserRoles(userId) {
    return this.userRoleRepo.getUserRoles(userId);
  }
  /**
   * Get all users with a specific role
   */
  async getUsersByRole(roleId) {
    return this.userRoleRepo.getUsersByRole(roleId);
  }
  /**
   * Replace all roles for a user
   */
  async replaceUserRoles(userId, roleIds) {
    for (const roleId of roleIds) {
      const role = await this.roleRepo.getRoleById(roleId);
      if (!role) {
        throw new Error(`Role not found: ${roleId}`);
      }
    }
    return this.userRoleRepo.replaceUserRoles(userId, roleIds);
  }
  // ========================================
  // PERMISSION REGISTRY
  // ========================================
  /**
   * List all available permissions with pagination, filtering, and sorting
   */
  async listPermissions(limit, offset, filters, sortBy, sortOrder) {
    return this.permissionRepo.listPermissions(limit, offset, filters, sortBy, sortOrder);
  }
  /**
   * Count permissions with optional filters
   */
  async countPermissions(filters) {
    return this.permissionRepo.countPermissions(filters);
  }
  /**
   * List permissions by category
   */
  async listPermissionsByCategory(category) {
    return this.permissionRepo.listPermissionsByCategory(category);
  }
  /**
   * Get permission by code
   */
  async getPermissionByCode(code) {
    return this.permissionRepo.getPermissionByCode(code);
  }
  /**
   * Validate permission codes
   */
  async validatePermissions(codes) {
    return this.permissionRepo.validatePermissions(codes);
  }
}
function getRBACService(event, config) {
  var _a, _b, _c, _d;
  const db = getDatabase(event);
  const runtimeConfig = useRuntimeConfig(event);
  const rbacEnabled = (_b = (_a = runtimeConfig.rbac) == null ? void 0 : _a.enabled) != null ? _b : true;
  return new RBACService(db, {
    enabled: (_c = config == null ? void 0 : config.enabled) != null ? _c : rbacEnabled,
    allowAllWhenDisabled: (_d = config == null ? void 0 : config.allowAllWhenDisabled) != null ? _d : true
  });
}
async function requirePermission(event, permission) {
  const userId = event.context.userId;
  if (!userId) {
    throw new AuthorizationError("Authentication required");
  }
  const rbacService = getRBACService(event);
  await rbacService.requirePermission(userId, permission);
}

const rbac = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  RBACService: RBACService,
  getRBACService: getRBACService,
  requirePermission: requirePermission
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$4 = defineEventHandler(async (event) => {
  await requirePermission(event, "roles:view");
  const query = parseListQuery(event);
  const allowedSortFields = ["code", "category", "description"];
  const sortBy = validateSortField(query.sortBy, allowedSortFields, "category");
  const sortOrder = query.sortOrder || "asc";
  const allowedFilterFields = ["code", "category"];
  const filters = validateFilters(query.filters || [], allowedFilterFields);
  const { limit, offset } = calculateLimitOffset(query.page || 1, query.perPage || 20);
  const rbacService = getRBACService(event);
  const [permissions, total] = await Promise.all([
    rbacService.listPermissions(limit, offset, filters, sortBy, sortOrder),
    rbacService.countPermissions(filters)
  ]);
  const response = buildPaginatedResponse(
    permissions,
    query.page || 1,
    query.perPage || 20,
    total
  );
  return createSuccessResponse(
    "Permissions retrieved successfully",
    response.items,
    response.pagination
  );
});

const index_get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$4
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete = defineEventHandler(async (event) => {
  await requirePermission(event, "roles:delete");
  const roleId = getRouterParam(event, "id");
  if (!roleId) {
    throw new MissingFieldError("id");
  }
  const rbacService = getRBACService(event);
  const success = await rbacService.deleteRole(roleId);
  if (!success) {
    throw new Error("Failed to delete role");
  }
  return createSuccessResponse("Role deleted successfully", { deleted: true });
});

const _id__delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get$2 = defineEventHandler(async (event) => {
  await requirePermission(event, "roles:view");
  const roleId = getRouterParam(event, "id");
  if (!roleId) {
    throw new MissingFieldError("id");
  }
  const rbacService = getRBACService(event);
  const role = await rbacService.getRoleById(roleId);
  if (!role) {
    throw new NotFoundError("Role");
  }
  return createSuccessResponse("Role retrieved successfully", role);
});

const _id__get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get$2
}, Symbol.toStringTag, { value: 'Module' }));

const updateRoleSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  permissions: z.array(z.string()).optional()
});
const _id__put = defineEventHandler(async (event) => {
  await requirePermission(event, "roles:update");
  const roleId = getRouterParam(event, "id");
  if (!roleId) {
    throw new MissingFieldError("id");
  }
  const body = await readBody(event);
  const validated = updateRoleSchema.parse(body);
  const sanitized = {
    name: validated.name ? sanitizeHtml(validated.name) : void 0,
    description: validated.description ? sanitizeHtml(validated.description) : void 0,
    permissions: validated.permissions
    // Permission codes don't need sanitization (validated against registry)
  };
  const rbacService = getRBACService(event);
  const role = await rbacService.updateRole(roleId, {
    name: sanitized.name,
    description: sanitized.description,
    permissions: sanitized.permissions
    // Type assertion for PermissionCode[]
  });
  if (!role) {
    throw new NotFoundError("Role");
  }
  return createSuccessResponse("Role updated successfully", role);
});

const _id__put$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$2 = defineEventHandler(async (event) => {
  await requirePermission(event, "roles:view");
  const query = parseListQuery(event);
  const rawQuery = getQuery$1(event);
  const includeSystem = rawQuery.includeSystem !== "false";
  const allowedSortFields = ["name", "createdAt", "isSystem", "description"];
  const sortBy = validateSortField(query.sortBy, allowedSortFields, "createdAt");
  const sortOrder = query.sortOrder || "desc";
  const allowedFilterFields = ["name", "isSystem"];
  const filters = validateFilters(query.filters || [], allowedFilterFields);
  const { limit, offset } = calculateLimitOffset(query.page || 1, query.perPage || 20);
  const rbacService = getRBACService(event);
  const [roles, total] = await Promise.all([
    rbacService.listRoles(limit, offset, filters, sortBy, sortOrder, { includeSystem }),
    rbacService.countRoles(filters, { includeSystem })
  ]);
  const response = buildPaginatedResponse(
    roles,
    query.page || 1,
    query.perPage || 20,
    total
  );
  return createSuccessResponse(
    "Roles retrieved successfully",
    response.items,
    response.pagination
  );
});

const index_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$2
}, Symbol.toStringTag, { value: 'Module' }));

const createRoleSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  permissions: z.array(z.string())
});
const index_post = defineEventHandler(async (event) => {
  await requirePermission(event, "roles:create");
  const body = await readBody(event);
  const validated = createRoleSchema.parse(body);
  const sanitized = {
    name: sanitizeHtml(validated.name),
    description: validated.description ? sanitizeHtml(validated.description) : void 0,
    permissions: validated.permissions
    // Permission codes don't need sanitization (validated against registry)
  };
  const rbacService = getRBACService(event);
  const role = await rbacService.createRole({
    name: sanitized.name,
    description: sanitized.description,
    permissions: sanitized.permissions,
    // Type assertion for PermissionCode[]
    isSystem: false
    // User-created roles are never system roles
  });
  return createSuccessResponse("Role created successfully", role);
});

const index_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get = defineEventHandler(async (event) => {
  await requirePermission(event, "users:view");
  const userId = getRouterParam(event, "id");
  if (!userId) {
    throw new MissingFieldError("id");
  }
  const identityService = createIdentityService(event);
  const user = await identityService.getUser(userId);
  return createSuccessResponse("User retrieved successfully", user);
});

const _id__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get
}, Symbol.toStringTag, { value: 'Module' }));

const index_get = defineEventHandler(async (event) => {
  await requirePermission(event, "users:view");
  const query = parseListQuery(event);
  const allowedSortFields = [
    "email",
    "firstName",
    "lastName",
    "createdAt",
    "role",
    "isActive",
    "isEmailVerified"
  ];
  const sortBy = validateSortField(query.sortBy, allowedSortFields, "createdAt");
  const sortOrder = query.sortOrder || "desc";
  const allowedFilterFields = [
    "email",
    "firstName",
    "lastName",
    "role",
    "isActive",
    "isEmailVerified"
  ];
  const filters = validateFilters(query.filters || [], allowedFilterFields);
  const { limit, offset } = calculateLimitOffset(query.page || 1, query.perPage || 20);
  const identityService = createIdentityService(event);
  const [users, total] = await Promise.all([
    identityService.listUsers(limit, offset, filters, sortBy, sortOrder),
    identityService.countUsers(filters)
  ]);
  const response = buildPaginatedResponse(
    users,
    query.page || 1,
    query.perPage || 20,
    total
  );
  return createSuccessResponse(
    "Users retrieved successfully",
    response.items,
    response.pagination
  );
});

const index_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get
}, Symbol.toStringTag, { value: 'Module' }));

const profile_get = defineEventHandler(async (event) => {
  const identityService = createIdentityService(event);
  const user = await identityService.getCurrentUser();
  return createSuccessResponse("User profile retrieved successfully", user);
});

const profile_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: profile_get
}, Symbol.toStringTag, { value: 'Module' }));

const updateProfileSchema = z.object({
  // Personal info
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  dateOfBirth: z.string().date().optional(),
  // ISO date string
  phone: z.string().max(20).optional(),
  // Address
  address: z.string().max(255).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  postalCode: z.string().max(20).optional(),
  // Emergency contact (ec prefix)
  ecFirstName: z.string().max(100).optional(),
  ecLastName: z.string().max(100).optional(),
  ecRelationship: z.string().max(50).optional(),
  ecEmail: z.string().email().max(255).optional(),
  ecPhone: z.string().max(20).optional(),
  ecAddress: z.string().max(255).optional(),
  ecCity: z.string().max(100).optional(),
  ecState: z.string().max(100).optional(),
  ecCountry: z.string().max(100).optional(),
  ecPostalCode: z.string().max(20).optional()
});

const profile_put = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validated = updateProfileSchema.parse(body);
  const identityService = createIdentityService(event);
  if (!event.context.userId) {
    throw new AuthenticationError("User not authenticated");
  }
  const sanitized = {
    firstName: validated.firstName ? sanitizeHtml(validated.firstName) : void 0,
    lastName: validated.lastName ? sanitizeHtml(validated.lastName) : void 0,
    dateOfBirth: validated.dateOfBirth ? new Date(validated.dateOfBirth) : void 0,
    phone: validated.phone ? sanitizePhone(validated.phone) : void 0,
    address: validated.address ? sanitizeHtml(validated.address) : void 0,
    city: validated.city ? sanitizeHtml(validated.city) : void 0,
    state: validated.state ? sanitizeHtml(validated.state) : void 0,
    country: validated.country ? sanitizeHtml(validated.country) : void 0,
    postalCode: validated.postalCode ? sanitizePostalCode(validated.postalCode) : void 0,
    ecFirstName: validated.ecFirstName ? sanitizeHtml(validated.ecFirstName) : void 0,
    ecLastName: validated.ecLastName ? sanitizeHtml(validated.ecLastName) : void 0,
    ecRelationship: validated.ecRelationship ? sanitizeHtml(validated.ecRelationship) : void 0,
    ecEmail: validated.ecEmail ? sanitizeEmail(validated.ecEmail) : void 0,
    ecPhone: validated.ecPhone ? sanitizePhone(validated.ecPhone) : void 0,
    ecAddress: validated.ecAddress ? sanitizeHtml(validated.ecAddress) : void 0,
    ecCity: validated.ecCity ? sanitizeHtml(validated.ecCity) : void 0,
    ecState: validated.ecState ? sanitizeHtml(validated.ecState) : void 0,
    ecCountry: validated.ecCountry ? sanitizeHtml(validated.ecCountry) : void 0,
    ecPostalCode: validated.ecPostalCode ? sanitizePostalCode(validated.ecPostalCode) : void 0
  };
  const user = await identityService.updateUser(event.context.userId, sanitized);
  return createSuccessResponse("User profile updated successfully", { user });
});

const profile_put$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: profile_put
}, Symbol.toStringTag, { value: 'Module' }));

const roles_get = defineEventHandler(async (event) => {
  await requirePermission(event, "users:view");
  const userId = getRouterParam(event, "userId");
  if (!userId) {
    throw new MissingFieldError("userId");
  }
  const rbacService = getRBACService(event);
  const roles = await rbacService.getUserRoles(userId);
  return createSuccessResponse("User roles retrieved successfully", roles);
});

const roles_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: roles_get
}, Symbol.toStringTag, { value: 'Module' }));

const updateUserRolesSchema = z.object({
  roleIds: z.array(z.string())
});
const roles_put = defineEventHandler(async (event) => {
  await requirePermission(event, "users:update");
  const userId = getRouterParam(event, "userId");
  if (!userId) {
    throw new MissingFieldError("userId");
  }
  const body = await readBody(event);
  const validated = updateUserRolesSchema.parse(body);
  const rbacService = getRBACService(event);
  const assignments = await rbacService.replaceUserRoles(userId, validated.roleIds);
  return createSuccessResponse("User roles updated successfully", assignments);
});

const roles_put$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: roles_put
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}

const renderSSRHeadOptions = {"omitLineBreaks":true};

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const ssrContext = createSSRContext(event);
  const headEntryOptions = { mode: "server" };
  ssrContext.head.push(appHead, headEntryOptions);
  if (ssrError) {
    ssrError.statusCode &&= Number.parseInt(ssrError.statusCode);
    if (typeof ssrError.data === "string") {
      try {
        ssrError.data = destr(ssrError.data);
      } catch {
      }
    }
    setSSRError(ssrContext, ssrError);
  }
  const isRenderingPayload = PAYLOAD_URL_RE.test(ssrContext.url);
  if (isRenderingPayload) {
    const url = ssrContext.url.substring(0, ssrContext.url.lastIndexOf("/")) || "/";
    ssrContext.url = url;
    event._path = event.node.req.url = url;
  }
  const routeOptions = getRouteRules(event);
  if (routeOptions.ssr === false) {
    ssrContext.noSSR = true;
  }
  const renderer = await getRenderer(ssrContext);
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  const inlinedStyles = [];
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response = renderPayloadResponse(ssrContext);
    return response;
  }
  const NO_SCRIPTS = routeOptions.noScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (ssrContext._preloadManifest && !NO_SCRIPTS) {
    ssrContext.head.push({
      link: [
        { rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`) }
      ]
    }, { ...headEntryOptions, tagPriority: "low" });
  }
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  const link = [];
  for (const resource of Object.values(styles)) {
    if ("inline" in getQuery(resource.file)) {
      continue;
    }
    link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
  }
  if (link.length) {
    ssrContext.head.push({ link }, headEntryOptions);
  }
  if (!NO_SCRIPTS) {
    ssrContext.head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.noScripts) {
    const tagPosition = "head";
    ssrContext.head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition,
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
  const htmlContext = {
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  return {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
});
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}

const renderer$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: renderer
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
