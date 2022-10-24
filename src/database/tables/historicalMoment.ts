import SQL from "sql-template-strings";
import { query } from "..";
import { historical_moment } from "../index.d";
import { v4 as uuid } from "uuid";

const create = async (
  newMoment: historical_moment
): Promise<historical_moment> => {
  const {
    type,
    name,
    moment_team_id,
    against_team_id,
    player_name,
    clip_link,
    game_index_link,
  } = newMoment;

  const id = uuid();
  const createMomentQuery = SQL`
    INSERT INTO \`historical_moment\`
      (id, type, name, moment_team_id, against_team_id, player_name, clip_link, game_index_link)
    VALUES
      (${id}, ${type}, ${name}, ${moment_team_id}, ${against_team_id}, ${player_name}, ${clip_link}, ${game_index_link});
  `;

  const result = await query(createMomentQuery);

  return {
    ...newMoment,
    id,
  };
};

const findById = async (
  momentId: string
): Promise<{ moment: historical_moment | null; error: string | null }> => {
  const getMomentQuery = SQL`
    SELECT *
    FROM \`historical_moment\`
    WHERE id=${momentId};
  `;
  const result: historical_moment[] = await query(getMomentQuery);

  if (result.length < 1) {
    return {
      moment: null,
      error: `Could not get moment with id: ${momentId}`,
    };
  }

  return {
    moment: result[0],
    error: null,
  };
};

const findByMomentTeamId = async (
  teamId: string
): Promise<{ moments: historical_moment[] | null; error: string | null }> => {
  const getMomentsQuery = SQL`
    SELECT *
    FROM \`historical_moment\`
    WHERE moment_team_id=${teamId};
  `;
  const result: historical_moment[] = await query(getMomentsQuery);

  if (result.length < 1) {
    return {
      moments: null,
      error: `Could not get moments with teamId: ${teamId}`,
    };
  }

  return {
    moments: result,
    error: null,
  };
};

const findByAgainstTeamId = async (
  teamId: string
): Promise<{ moments: historical_moment[] | null; error: string | null }> => {
  const getMomentsQuery = SQL`
    SELECT *
    FROM \`historical_moment\`
    WHERE against_team_id=${teamId};
  `;
  const result: historical_moment[] = await query(getMomentsQuery);

  if (result.length < 1) {
    return {
      moments: null,
      error: `Could not get moments with teamId: ${teamId}`,
    };
  }

  return {
    moments: result,
    error: null,
  };
};

const findByPlayerName = async (
  playerName: string
): Promise<{ moments: historical_moment[] | null; error: string | null }> => {
  const getMomentsQuery = SQL`
    SELECT *
    FROM \`historical_moment\`
    WHERE player_name LIKE "%${playerName}%";
`;
  const result: historical_moment[] = await query(getMomentsQuery);

  if (result.length < 1) {
    return {
      moments: null,
      error: `Could not get moments with player name: ${playerName}`,
    };
  }

  return {
    moments: result,
    error: null,
  };
};

export const HistoricalMoment = {
  create,
  findById,
  findByMomentTeamId,
  findByAgainstTeamId,
  findByPlayerName,
};
