import 'isomorphic-fetch';
import ErrorBadRequest from '../ErrorBadRequest';

const code = 400;
const codeText = 'Bad Request';
const message = 'user_id parameter required';

describe('Error Bad Request', () => {
  it('Error should be thrown', () => {
    expect(() => {
      throw new ErrorBadRequest(message);
    }).toThrow();
  });

  it('Error should properly transfer code', () => {
    try {
      throw new ErrorBadRequest(message);
    } catch (error) {
      expect(error.statusCode).toBe(code);
    }
  });

  it('Error should properly transfer code text', () => {
    try {
      throw new ErrorBadRequest(message);
    } catch (error) {
      expect(error.statusText).toBe(codeText);
    }
  });

  it('Error should properly transfer message', () => {
    try {
      throw new ErrorBadRequest(message);
    } catch (error) {
      expect(error.message).toBe(message);
    }
  });

  it('Error should set message as null if it omitter', () => {
    try {
      throw new ErrorBadRequest();
    } catch (error) {
      expect(error.message).toBe(null);
    }
  });

  it('Error should show proper stack trace', () => {
    try {
      throw new ErrorBadRequest(message);
    } catch (error) {
      expect(error.stack).not.toBe(undefined);
    }
  });

  it('Error should show proper stack trace if captureStackTrace unavailable', () => {
    try {
      Error.captureStackTrace = undefined;
      throw new ErrorBadRequest(message);
    } catch (error) {
      expect(error.stack).not.toBe(undefined);
    }
  });
});
