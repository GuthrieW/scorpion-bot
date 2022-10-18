export type MomentType = "WorldSeriesClinch" | "Cycle" | "NoHitter";

export type TeamNamingData = {
  full_name: string;
  city_name: string;
  team_name: string;
  abbreviation: string;
};

export type Moment = {
  id: string;
  type: MomentType;
  name: string;
  moment_team: TeamAbbreviations;
  against_team: TeamAbbreviations;
  player_name: string;
  clip_link: string;
  game_link: string;
};
