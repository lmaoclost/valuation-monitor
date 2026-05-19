import { describe, it, expect, afterEach } from 'vitest';
import { setCookie } from '@/lib/cookies';

describe('setCookie', () => {
  afterEach(() => {
    document.cookie = '';
  });

  it('sets a cookie with name and value', () => {
    setCookie('test', 'hello');
    expect(document.cookie).toContain('test=hello');
  });

  it('encodes special characters in value', () => {
    setCookie('test', 'hello world');
    expect(document.cookie).toContain('hello%20world');
  });

  it('sets cookie with name=value only in jsdom', () => {
    setCookie('test', 'value');
    expect(document.cookie).toBe('test=value');
  });
});
