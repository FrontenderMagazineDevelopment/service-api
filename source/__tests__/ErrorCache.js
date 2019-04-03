import 'isomorphic-fetch';
import ErrorCache from '../ErrorCache';

const code = 500;
const codeText = 'Cache failed';
const message = 'Memcached have commit suicide';

describe('Cache error', () => {
  it('Error should be thrown', () => {
    expect(() => {
      throw new ErrorCache(message);
    }).toThrow();
  });

  it('Error should properly transfer code', () => {
    try {
      throw new ErrorCache(message);
    } catch (error) {
      expect(error.statusCode).toBe(code);
    }
  });

  it('Error should properly transfer code text', () => {
    try {
      throw new ErrorCache(message);
    } catch (error) {
      expect(error.statusText).toBe(codeText);
    }
  });

  it('Error should properly transfer message', () => {
    try {
      throw new ErrorCache(message);
    } catch (error) {
      expect(error.message).toBe(message);
    }
  });

  it('Error should set message as null if it omitter', () => {
    try {
      throw new ErrorCache();
    } catch (error) {
      expect(error.message).toBe(null);
    }
  });

  it('Error should show proper stack trace', () => {
    try {
      throw new ErrorCache(message);
    } catch (error) {
      expect(error.stack).not.toBe(undefined);
    }
  });

  it('Error should show proper stack trace if captureStackTrace unavailable', () => {
    try {
      Error.captureStackTrace = undefined;
      throw new ErrorCache(message);
    } catch (error) {
      expect(error.stack).not.toBe(undefined);
    }
  });
});
