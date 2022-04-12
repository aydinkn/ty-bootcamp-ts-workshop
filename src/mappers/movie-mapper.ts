import { DiscoverItemMovie } from "../models/response/discover-response";
import { Movie } from "../models/movie";
import { Mapper } from "./mapper";
import ConfigHelper from "../helpers/config-helper";
import { getDateFromString } from "../helpers/date-helper";

export default class MovieMapper implements Mapper<DiscoverItemMovie, Movie> {
  constructor() {}

  mapTo(discoverItemMovie: DiscoverItemMovie): Movie {
    const { id, title, poster_path, release_date } =
      discoverItemMovie;

    return {
      id,
      title,
      releaseDate: getDateFromString(release_date),
      poster: `${ConfigHelper.getImageUrl()}/w185${poster_path}`
    } as Movie;
  }

  multiMapTo(discoverItemMovie: DiscoverItemMovie[]): Movie[] {
    return discoverItemMovie.map(this.mapTo);
  }
}
