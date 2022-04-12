import { Entity } from "./entity";

export interface Movie extends Entity<number> {
  title: string;
  releaseDate?: Date;
  poster: string;
}
