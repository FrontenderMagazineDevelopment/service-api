import 'isomorphic-fetch';
import ErrorServerResponse from '../ErrorNotFound';

const code = 404;
const codeText = 'Not Found';
const message = 'Not found';

describe('Error Not  Found', () => {
  it('Error should be thrown', () => {
    expect(() => {
      throw new ErrorServerResponse(message);
    }).toThrow();
  });

  it('Error should properly transfer code', () => {
    try {
      throw new ErrorServerResponse(message);
    } catch (error) {
      expect(error.statusCode).toBe(code);
    }
  });

  it('Error should properly transfer code text', () => {
    try {
      throw new ErrorServerResponse(message);
    } catch (error) {
      expect(error.statusText).toBe(codeText);
    }
  });

  it('Error should properly transfer message', () => {
    try {
      throw new ErrorServerResponse(message);
    } catch (error) {
      expect(error.message).toBe(message);
    }
  });

  it('Error should set message as null if it omitter', () => {
    try {
      throw new ErrorServerResponse();
    } catch (error) {
      expect(error.message).toBe(null);
    }
  });

  it('Error should show proper stack trace', () => {
    try {
      throw new ErrorServerResponse(message);
    } catch (error) {
      expect(error.stack).not.toBe(undefined);
    }
  });

  it('Error should show proper stack trace if captureStackTrace unavailable', () => {
    try {
      Error.captureStackTrace = undefined;
      throw new ErrorServerResponse(message);
    } catch (error) {
      expect(error.stack).not.toBe(undefined);
    }
  });
});
