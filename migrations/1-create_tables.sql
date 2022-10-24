CREATE TABLE discord_channel 
(
    id VARCHAR(36) NOT NULL,
    channel_id VARCHAR() NOT NULL,
    channel_state TINYINT(1) NOT NULL,
    creation_date DATE,
    CONSTRAINT discord_channel_pk PRIMARY KEY (id, channel_id)
);

CREATE TABLE discord_user
(
    id VARCHAR(36) NOT NULL,
    discord_id VARCHAR() NOT NULL,
    creation_date DATE,
    CONSTRAINT discord_user_pk PRIMARY KEY (id, discord_id)
);

CREATE TABLE historical_moment
(
    id VARCHAR(36) NOT NULL,
    `type` VARCHAR(100) NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    moment_team_id VARCHAR(36) NOT NULL,
    against_team_id VARCHAR(36) NOT NULL,
    player_name VARCHAR(100) NOT NULL,
    clip_link VARCHAR(200) NOT NULL,
    game_index_link VARCHAR(200) NOT NULL,
    CONSTRAINT historical_moment_pk PRIMARY KEY (id)
);

CREATE TABLE jeopardy_account
(
    id VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    discord_id VARCHAR(36) NOT NULL,
    correct_answers INT(11) NOT NULL,
    wrong_answers INT(11) NOT NULL,
    `money` INT(11) NOT NULL,
    CONSTRAINT jeopardy_account_pk PRIMARY KEY (id)
);

CREATE TABLE pbe_team
(
    id VARCHAR(36) NOT NULL,
    city_name VARCHAR(100) NOT NULL,
    team_name VARCHAR(100) NOT NULL,
    abbreviation VARCHAR(5) NOT NULL,
    CONSTRAINT pbe_team_pk PRIMARY KEY (id)
);