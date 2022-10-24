import { HistoricalMomentType, historical_moment } from "../index.d";
import { HistoricalMoment } from "../tables/historicalMoment";
import { PbeTeam } from "../tables/pbeTeam";

type NewMoment = {
  type?: HistoricalMomentType;
  name?: string;
  teamName?: string;
  againstTeam?: string;
  playerName?: string;
  clipLink?: string;
  gameIndexLink?: string;
};

export const addMoment = async ({
  type,
  name,
  teamName,
  againstTeam,
  playerName,
  clipLink,
  gameIndexLink,
}: NewMoment): Promise<{
  newMoment: historical_moment | null;
  error: string | null;
}> => {
  if (!type) {
    return { newMoment: null, error: "INVALID_MOMENT_TYPE" };
  }

  if (!name) {
    return { newMoment: null, error: "INVALID_MOMENT_NAME" };
  }

  if (!teamName) {
    return { newMoment: null, error: "INVALID_MOMENT_TEAM" };
  }

  if (!againstTeam) {
    return { newMoment: null, error: "INVALID_MOMENT_AGAINST_TEAM" };
  }

  if (!playerName) {
    return { newMoment: null, error: "INVALID_MOMENT_PLAYER_NAME" };
  }

  if (!clipLink) {
    return { newMoment: null, error: "INVALID_MOMENT_CLIP_LINK" };
  }

  if (!gameIndexLink) {
    return { newMoment: null, error: "INVALID_MOMENT_GAME_INDEX_LINK" };
  }

  const { team: moment_team, error: momentTeamError } =
    await PbeTeam.findByName(teamName);

  if (momentTeamError) {
    return { newMoment: null, error: momentTeamError };
  }

  const { team: against_team, error: againstTeamError } =
    await PbeTeam.findByName(playerName);

  if (againstTeamError) {
    return { newMoment: null, error: againstTeamError };
  }

  const newMomentData = {
    type,
    name,
    moment_team_id: moment_team?.id,
    against_team_id: against_team?.id,
    player_name: playerName,
    clip_link: clipLink,
    game_index_link: gameIndexLink,
  };

  const newMoment = await HistoricalMoment.create(newMomentData);

  return {
    newMoment,
    error: newMoment
      ? null
      : `Could not create new historical moment with data: ${JSON.stringify(
          newMomentData
        )}`,
  };
};

export const getTeamMoments = async (
  teamName: string
): Promise<{ moments: historical_moment[] | null; error: string | null }> => {
  if (!teamName) {
    return { moments: [], error: "Please provide a team name" };
  }

  const { team, error: pbeTeamError } = await PbeTeam.findByName(teamName);

  if (!team) {
    return { moments: [], error: pbeTeamError };
  }

  return await HistoricalMoment.findByMomentTeamId(team.id as string);
};

export const getTeamBlunders = async (
  teamName: string
): Promise<{ moments: historical_moment[] | null; error: string | null }> => {
  if (!teamName) {
    return { moments: [], error: "Please provide a team name" };
  }

  const { team, error: pbeTeamError } = await PbeTeam.findByName(teamName);

  if (!team) {
    return { moments: [], error: pbeTeamError };
  }

  return await HistoricalMoment.findByAgainstTeamId(team.id as string);
};

export const getPlayerMoments = async (
  playerName: string
): Promise<{ moments: historical_moment[] | null; error: string | null }> => {
  if (!playerName) {
    return { moments: [], error: "Please provide a player name" };
  }

  return await HistoricalMoment.findByPlayerName(playerName);
};
