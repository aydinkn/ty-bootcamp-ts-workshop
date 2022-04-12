import { DiscoverItemTVShow } from "../models/response/discover-response";
import { TVShow } from "../models/tv-show";
import { Mapper } from "./mapper";
import ConfigHelper from "../helpers/config-helper";
import { getDateFromString } from "../helpers/date-helper";

export default class TVShowMapper
  implements Mapper<DiscoverItemTVShow, TVShow>
{
  constructor() {}

  mapTo(discoverItemTV: DiscoverItemTVShow): TVShow {
    const { id, name, poster_path, first_air_date } = discoverItemTV;

    return {
      id,
      name,
      firstAirDate: getDateFromString(first_air_date),
      poster: `${ConfigHelper.getImageUrl()}/w185${poster_path}`,
    } as TVShow;
  }

  multiMapTo(discoverItemTV: DiscoverItemTVShow[]): TVShow[] {
    return discoverItemTV.map(this.mapTo);
  }
}
