import {
  DiscoverItemMovie,
  DiscoverItemTVShow,
  DiscoverResponse,
} from "../models/response/discover-response";
import Service from "./service";
import ConfigHelper from "../helpers/config-helper";

export default class DiscoverService extends Service {
  private _sortByPopularity = "sort_by=popularity.desc";

  async getPopularMovies() {
    try {
      const response = await fetch(
        `${ConfigHelper.getApiUrl()}/discover/movie?${this._sortByPopularity}`,
        this.injectToken({
          method: "GET",
        })
      );

      if (response.ok) {
        const data =
          (await response.json()) as DiscoverResponse<DiscoverItemMovie>;

        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getPopularTVShows() {
    try {
      const response = await fetch(
        `${ConfigHelper.getApiUrl()}/discover/tv?${this._sortByPopularity}`,
        this.injectToken({
          method: "GET",
        })
      );

      if (response.ok) {
        const data =
          (await response.json()) as DiscoverResponse<DiscoverItemTVShow>;

        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
