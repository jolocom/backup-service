import { handleAuthentication } from "../authentication";
import { authData, testPublicKey } from "./test.data";
import { mockGlobalDate } from "./utils";

describe('Authentication', () => {
  beforeAll(() => {
    mockGlobalDate()
  });

  it('should successfully test authentication middleware', async () => {
    const data = { data: 'some data' };

    const next = jest.fn();

    // @ts-ignore
    await handleAuthentication({ body: { auth: authData, data: data } }, { send: jest.fn(), status: jest.fn() }, next);
    expect(next).toBeCalled()
  });

  it('should fail if authentication data is missing', async () => {
    const status = jest.fn();
    const send = jest.fn();
    // @ts-ignore
    await handleAuthentication({ body: {} }, { status: status, send: send }, jest.fn());
    expect(status).toBeCalledWith(400)
  });

  it('should fail if authentication signature is wrong', async () => {
    const status = jest.fn();
    const send = jest.fn();
    // @ts-ignore
    await handleAuthentication({
      body: {
        auth: {
          pubKey: testPublicKey,
          date: new Date().toISOString(),
          sig: 'wrongsig'
        }
      }
    }, { status: status, send: send }, jest.fn());
    expect(status).toBeCalledWith(400)
  });

  it('should fail if date is to old is wrong', async () => {
    const status = jest.fn();
    const send = jest.fn();
    const oldDateTime = new Date().getTime() - 70000;
    // @ts-ignore
    await handleAuthentication({
      body: {
        auth: {
          pubKey: testPublicKey,
          date: new Date(oldDateTime).toISOString(),
          sig: 'wrongsig'
        }
      }
    }, { status: status, send: send }, jest.fn());
    expect(status).toBeCalledWith(400)
  });
});