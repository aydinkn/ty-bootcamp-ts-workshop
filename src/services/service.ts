import ConfigHelper from "../helpers/config-helper";

export default abstract class Service {
  injectToken(requestInit: RequestInit) {
    const headers = new Headers(requestInit.headers);
    const key = "Authorization";

    if (!headers.has(key)) {
      headers.append(key, `Bearer ${ConfigHelper.getToken()}`);
    }

    requestInit.headers = headers;
    
    return requestInit;
  }
}
