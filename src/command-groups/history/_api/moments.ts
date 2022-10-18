import SQL from "sql-template-strings";
import { query } from "src/database";
import { Moment, TeamNamingData } from "../index.d";
import { Teams } from "../_constants";

export const getTeamMoments = async (
  teamName: string
): Promise<{ moments: Moment[]; error: string | null }> => {
  if (!teamName) {
    const error = "Please provide a team name";
    console.log(error);
    return { moments: [], error };
  }

  const foundTeam: TeamNamingData | undefined = Teams.find(
    (team) =>
      team.full_name === teamName ||
      team.city_name === teamName ||
      team.team_name === teamName ||
      team.abbreviation === teamName
  );

  if (!foundTeam) {
    const error = "Team does not exist";
    console.log(error);
    return { moments: [], error };
  }

  const getTeamMomentsQuery = SQL`
    SELECT *
    FROM \`moments\`
    WHERE moment_team=${foundTeam.full_name}
  `;

  const result: Moment[] = await query(getTeamMomentsQuery);

  return { moments: result, error: null };
};

export const getTeamBlunders = async (
  teamName: string
): Promise<{ moments: Moment[]; error: string | null }> => {
  if (!teamName) {
    const error = "Please provide a team name";
    console.log(error);
    return { moments: [], error };
  }

  const foundTeam: TeamNamingData | undefined = Teams.find(
    (team) =>
      team.full_name === teamName ||
      team.city_name === teamName ||
      team.team_name === teamName ||
      team.abbreviation === teamName
  );

  if (!foundTeam) {
    const error = "Team does not exist";
    console.log(error);
    return { moments: [], error };
  }
  const getTeamBlundersQuery = SQL`
    SELECT *
    FROM \`moments\`
    WHERE against_team=${foundTeam}
  `;

  const result: Moment[] = await query(getTeamBlundersQuery);

  return { moments: result, error: null };
};

export const getPlayerMoments = async (
  playerName: string
): Promise<{ moments: Moment[]; error: string | null }> => {
  if (!playerName) {
    const error = "team does not exist";
    console.log(error);
    return { moments: [], error };
  }

  const getTeamMomentsQuery = SQL`
    SELECT *
    FROM \`moments\`
    WHERE player_name=${playerName}
  `;

  const result: Moment[] = await query(getTeamMomentsQuery);

  if (result.length < 1) {
    const error = `No moments found for ${playerName}`;
    console.log(error);
    return { moments: [], error };
  }

  return { moments: result, error: null };
};
