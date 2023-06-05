export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: {
    name: string;
    url: string;
  };
  location: Omit<
    Location,
    "id" | "type" | "dimension" | "residents" | "created"
  >;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export type CharacterStatus = "Alive" | "Dead" | "unknown";
type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

interface PaginationInfo {
  info?: { count: number; pages: number; next: string; prev: string };
}

export const UNKNOWN = "unknown";

export type ResultsWithPaginationInfo<T> = { results: T } & PaginationInfo;
