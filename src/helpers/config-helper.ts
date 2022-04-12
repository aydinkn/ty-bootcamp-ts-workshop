export default class ConfigHelper {
  static getApiUrl(): string {
    return process.env.APIURL as string;
  }

  static getImageUrl(): string {
    return process.env.IMAGEURL as string;
  }

  static getToken(): string {
    return process.env.TOKEN as string;
  }
}
