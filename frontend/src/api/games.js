
export const getGoalScorersURL = (gameId) => `/games/goalscorers/${gameId}`; // GET
export const gameStatsProjectionURL = `/games/projection`; //GET
export const getGameUpdateURL = (gameId) =>`games/update/${gameId}`;
export const gameCreationURL = `/games/add`; 
export const gameStatsURL = `/games/all`;
export const getGameStatsUpdateURL = (leagueId,gameId) => `/games/stats/update/${leagueId}/${gameId}`; 
export const getGameDeletionURL =(gameId) =>`games/delete/${gameId}`

