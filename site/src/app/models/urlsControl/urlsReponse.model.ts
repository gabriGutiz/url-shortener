import { Url } from "./url.model";

export class UrlsResponse {
  quantidade?: number;
  urls: Array<Url> = new Array<Url>();
}
