import { Entity } from "../entity";

interface DiscoverItem extends Entity<number> {
  poster_path: string;
}

export interface DiscoverItemMovie extends DiscoverItem {
  title: string;
  release_date: string;
}

export interface DiscoverItemTVShow extends DiscoverItem {
  name: string;
  first_air_date: string;
}

export interface DiscoverResponse<
  T extends DiscoverItemMovie | DiscoverItemTVShow
> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
