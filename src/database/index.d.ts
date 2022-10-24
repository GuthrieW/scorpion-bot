export type pbe_team = {
  id?: string;
  city_name?: string;
  team_name?: string;
  abbreviation?: string;
};

export type HistoricalMomentType = "WorldSeriesClinch" | "Cycle" | "NoHitter";

export type historical_moment = {
  id?: string;
  type?: HistoricalMomentType;
  name?: string;
  moment_team_id?: string;
  against_team_id?: string;
  player_name?: string;
  clip_link?: string;
  game_index_link?: string;
};

export type discord_channel = {
  id?: string;
  channel_id?: string;
  channel_state?: 0 | 1;
};

export type discord_user = {
  id?: string;
  discord_id?: string;
  username?: string;
};

export type jeopardy_account = {
  id?: string;
  discord_id?: string;
  correct_answers?: number;
  wrong_answers?: number;
  money?: number;
};
