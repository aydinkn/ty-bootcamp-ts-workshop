import { Entity } from "./entity";

export interface TVShow extends Entity<number> {
  name: string;
  firstAirDate?: Date;
  poster: string;
}
