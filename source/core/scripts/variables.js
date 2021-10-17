/* eslint-disable */ 

import { isBrowser } from './core';

const D = isBrowser ? window.document : {};
const scope = isBrowser ? window : global;

// Export globals for use in other modules
export const _doc = D;
export const _body = D.body;
export const _html = D.documentElement;
export const _win = scope;
export const U = undefined;