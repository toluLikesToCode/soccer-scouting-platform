

export const playerStatsURL = "players/player-stats";
export const playerAverageStatsURL = "players/player-average-stats";
export const deletePlayerURL = (playerId) => `/players/delete/${playerId}`; //DELETE
export const getGamesWherePlayerScoredURL = (playerId) => `/players/games-where-player-scored/${playerId}`; //GET
export const getPlayersWhoScoredInEveryGameURL = () => '/players/who-scored-in-every-game'; //GET
export const getPlayerUpdateURL = (playerId) => `/players/update/${playerId}`;
export const getPlayerCreationURL = (clubId) => `/players/add/${clubId}`; 
export const getPlayerCountByClubURL = () => `/players/count-by-club`; //GET

export const getSelectionResutlsURL = () => `/players/selectionquery`;
