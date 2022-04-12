import { Movie } from "../models/movie";
import { TVShow } from "../models/tv-show";
import DiscoverService from "../services/discover-service";
import MovieMapper from "../mappers/movie-mapper";
import TVShowMapper from "../mappers/tv-show-mapper";

export default class DiscoverManager {
  private _discoverService: DiscoverService;
  private _movieMapper: MovieMapper;
  private _tvShowMapper: TVShowMapper;

  constructor() {
    this._discoverService = new DiscoverService();
    this._movieMapper = new MovieMapper();
    this._tvShowMapper = new TVShowMapper();
  }

  async getPopularMovies() {
    let movies: Movie[] = [];
    const movieResponse = await this._discoverService.getPopularMovies();

    if (movieResponse?.results.length) {
      movies = this._movieMapper.multiMapTo(movieResponse.results);
    }

    return movies;
  }

  async getPopularTVShows() {
    let tvShows: TVShow[] = [];
    const movieResponse = await this._discoverService.getPopularTVShows();

    if (movieResponse?.results.length) {
      tvShows = this._tvShowMapper.multiMapTo(movieResponse.results);
    }

    return tvShows;
  }
}
