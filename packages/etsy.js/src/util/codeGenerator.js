'use strict';

const crypto = require('crypto');

module.exports = class CodeGenerator {
  #codeVerifier;
  constructor() {
    this.#codeVerifier = null;
  }

  create() {
    this.#codeVerifier = this.#base64URLEncode(crypto.randomBytes(32));

    const codeChallenge = this.#base64URLEncode(this.#sha256(this.#codeVerifier));
    const state = Math.random().toString(36).substring(7);

    return { codeChallenge, state };
  }

  #base64URLEncode(str) {
    /* eslint-disable-next-line newline-per-chained-call */
    return str.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }

  #sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
  }
};
