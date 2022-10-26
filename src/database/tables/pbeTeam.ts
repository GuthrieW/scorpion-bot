import SQL from "sql-template-strings";
import { query } from "..";
import { pbe_team } from "../index.d";

const create = async (newTeam: pbe_team): Promise<pbe_team> => {
  const { city_name, team_name, abbreviation } = newTeam;
  const createTeamQuery = SQL`
    INSERT INTO \`pbe_team\`
      (id, city_name, team_name, abbreviation)
    VALUES
      (${city_name}, ${team_name}, ${abbreviation});
  `;
  const result = await query(createTeamQuery);

  return {
    ...newTeam,
  };
};

const findById = async (
  teamId: string
): Promise<{ team: pbe_team | null; error: string | null }> => {
  const getTeamQuery = SQL`
    SELECT *
    FROM \`pbe_team\`
    WHERE id=${teamId};
  `;

  const result: pbe_team[] = await query(getTeamQuery);

  if (result.length < 1) {
    return {
      team: null,
      error: `Could not get team with id: ${teamId}`,
    };
  }

  return {
    team: result[0],
    error: null,
  };
};

const findByName = async (
  teamName: string
): Promise<{ team: pbe_team | null; error: string | null }> => {
  const getTeamQuery = SQL`
      SELECT *
      FROM \`pbe_team\`
      WHERE team_name=${teamName};
    `;

  const result: pbe_team[] = await query(getTeamQuery);

  if (result.length < 1) {
    return {
      team: null,
      error: `Could not get team with name: ${teamName}`,
    };
  }

  return {
    team: result[0],
    error: null,
  };
};

export const PbeTeam = {
  create,
  findById,
  findByName,
};
