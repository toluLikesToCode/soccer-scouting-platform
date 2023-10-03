-- init.sql
CREATE ROLE Soccer_Scout WITH LOGIN PASSWORD '${POSTGRES_PASSWORD}';


-- InjuryTypeInfo
CREATE TABLE IF NOT EXISTS InjuryTypeInfo (
    injury_type VARCHAR(255) PRIMARY KEY,
    recovery_time VARCHAR(255)
);
-- ClubIdentity
CREATE TABLE IF NOT EXISTS ClubIdentity (
    ClubName VARCHAR(255) PRIMARY KEY,
    Nickname VARCHAR(255),
    Team_color VARCHAR(255)
);
-- ClubMainInfo
CREATE TABLE IF NOT EXISTS ClubMainInfo (
    ClubOwner VARCHAR(255),
    Founded DATE,
    Website VARCHAR(255),
    City VARCHAR(255),
    Club_ID VARCHAR(255) PRIMARY KEY,
    ClubName VARCHAR(255),
    FOREIGN KEY (ClubName) REFERENCES ClubIdentity(ClubName)
);

-- League
CREATE TABLE IF NOT EXISTS League (
    ID VARCHAR(255) PRIMARY KEY,
    Country VARCHAR(255),
    LeagueName VARCHAR(255),
    Num_teams INTEGER,
    Num_relegations INTEGER,
    Num_promotions INTEGER,
    Num_continental_competition_spots INTEGER,
    Domestic_Cups_rules VARCHAR(255),
    International_Cups_rules VARCHAR(255),
    Confederation VARCHAR(255),
    Founded DATE,
    Organizing_body VARCHAR(255),
    Current_Champion VARCHAR(255),
    Most_Championships VARCHAR(255),
    TV_partners VARCHAR(255),
    Website VARCHAR(255),
    Level_on_Pyramid INTEGER,
    Relegation_to VARCHAR(255),
    Promotion_to VARCHAR(255)
);

-- Season
CREATE TABLE IF NOT EXISTS Season (
    SeasonYear VARCHAR(255),
    League_ID VARCHAR(255) NOT NULL,
    Champions VARCHAR(255),
    Relegated VARCHAR(255),
    Standings VARCHAR(255),
    Matches INTEGER,
    Teams INTEGER,
    Goals_Scored INTEGER,
    Top_Goalscorer VARCHAR(255),
    Best_Goalkeeper VARCHAR(255),
    Biggest_home_win INTEGER,
    Biggest_away_win INTEGER,
    Highest_scoring_game INTEGER,
    Longest_winning_run INTEGER,
    Longest_unbeaten_run INTEGER,
    Longest_winless_run INTEGER,
    Longest_losing_run INTEGER,
    Highest_attendance INTEGER,
    Lowest_attendance INTEGER,
    Total_attendance INTEGER,
    Average_attendance INTEGER,
    PRIMARY KEY(SeasonYear,League_ID),
    FOREIGN KEY (League_ID) REFERENCES League(ID)
);
-- Staff
CREATE TABLE IF NOT EXISTS Staff (
    ID VARCHAR(255) PRIMARY KEY,
    First_name VARCHAR(255),
    Last_name VARCHAR(255),
    Club_ID VARCHAR(255),
    Position VARCHAR(255),
    Nationality VARCHAR(255),
    Playing_career_position VARCHAR(255),
    Past_clubs VARCHAR(255),
    ContractDate DATE,
    FOREIGN KEY (Club_ID) REFERENCES ClubMainInfo(Club_ID)
);
-- PlayerBirthInfo
CREATE TABLE IF NOT EXISTS PlayerBirthInfo (
    birthdate DATE PRIMARY KEY,
    age INTEGER
);
-- Team
CREATE TABLE IF NOT EXISTS Team (
    Club_ID VARCHAR(255),
    Age_group VARCHAR(255),
    Coach_Manager VARCHAR(255) NOT NULL,
    League_ID VARCHAR(255),
    PRIMARY KEY (Club_ID, Age_group),
    FOREIGN KEY (Club_ID) REFERENCES ClubMainInfo(Club_ID),
    FOREIGN KEY (League_ID) REFERENCES League(ID)
);
-- PlayerGeneralInfo
CREATE TABLE IF NOT EXISTS PlayerGeneralInfo (
    ID VARCHAR(255) PRIMARY KEY,
    First_name VARCHAR(255),
    Last_name VARCHAR(255),
    PlayerNumber INTEGER,
    Height FLOAT,
    PlayerWeight FLOAT,
    Position VARCHAR(255),
    Active_foot VARCHAR(255),
    Nationality VARCHAR(255),
    AgentID VARCHAR(255),
    clubID VARCHAR(255),
    teamID VARCHAR(255),
    birthdate DATE,
    Age_group VARCHAR(255),
    FOREIGN KEY (birthdate) REFERENCES PlayerBirthInfo(birthdate),
    FOREIGN KEY (clubID) REFERENCES ClubMainInfo(Club_ID),
    FOREIGN KEY (AgentID) REFERENCES Staff(ID),
    FOREIGN KEY (clubID,Age_group) REFERENCES Team(Club_ID,Age_group)
);


-- Goalkeeper
CREATE TABLE IF NOT EXISTS Goalkeeper  (
    Player_ID VARCHAR(255)PRIMARY KEY,
    Throwing_arm VARCHAR(255),
    FOREIGN KEY (Player_ID) REFERENCES PlayerGeneralInfo(ID) ON DELETE CASCADE
);

-- Stadium
CREATE TABLE IF NOT EXISTS Stadium (
    ID VARCHAR(255) PRIMARY KEY,
    Location VARCHAR(255),
    StadiumName VARCHAR(255),
    Seats_capacity INTEGER
);



-- Game
CREATE TABLE IF NOT EXISTS Game (
    Game_ID VARCHAR(255) UNIQUE,
    HomeClubID VARCHAR(255),
    AwayClubID VARCHAR(255),
    Age_group VARCHAR(255),
    Goals INTEGER,
    Stadium_ID VARCHAR(255),
    Competition VARCHAR(255),
    SeasonYear VARCHAR(255),
    Match_Date DATE,
    Odds FLOAT,
    Lineup VARCHAR(255),
    Substitutions VARCHAR(255),
    Yellow_cards INTEGER,
    Red_cards INTEGER,
    xG FLOAT,
    Ball_possession INTEGER,
    Goal_Attempts INTEGER,
    Shots_on_Goal INTEGER,
    Shots_off_Goal INTEGER,
    Blocked_Shots INTEGER,
    Corner_kicks INTEGER,
    Offsides INTEGER,
    Goalkeeper_saves INTEGER,
    Fouls INTEGER,
    Total_Passes INTEGER,
    Completed_Passes INTEGER,
    Tackles INTEGER,
    Attacks INTEGER,
    Dangerous_attacks INTEGER,
    League_ID VARCHAR(255),
    PRIMARY KEY (Game_ID, HomeClubID, AwayClubID),
    FOREIGN KEY (HomeClubID,Age_group) REFERENCES Team(Club_ID, Age_group),
    FOREIGN KEY (AwayClubID,Age_group) REFERENCES Team(Club_ID, Age_group),
    FOREIGN KEY (Stadium_ID) REFERENCES Stadium(ID),
    FOREIGN KEY (SeasonYear,League_ID) REFERENCES Season(SeasonYear,League_ID)
);

-- Statistics_Per_Game_Per_Player
CREATE TABLE IF NOT EXISTS Statistics_Per_Game_Per_Player (
    ID VARCHAR(255) PRIMARY KEY,
    Game_ID VARCHAR(255),
    Player_ID VARCHAR(255) NOT NULL,
    Minutes_played INTEGER,
    Assists INTEGER,
    Goals INTEGER,
    Shots_taken INTEGER,
    Shots_on_goal INTEGER,
    Shots_taken_inside_box INTEGER,
    Shots_taken_outside_box INTEGER,
    Passes_attempted INTEGER,
    Passes_complete INTEGER,
    Key_passes_attempted INTEGER,
    Key_passes_completed INTEGER,
    Crosses INTEGER,
    Aerial_challenges_attempted INTEGER,
    Aerial_challenges_success INTEGER,
    FOREIGN KEY (Player_ID) REFERENCES PlayerGeneralInfo(ID) ON DELETE CASCADE,
    FOREIGN KEY (Game_ID) REFERENCES Game(Game_ID)
);

-- Goalkeeper_Statistics
CREATE TABLE IF NOT EXISTS Goalkeeper_Statistics (
    Statistics_ID VARCHAR(255) PRIMARY KEY,
    Game_ID VARCHAR(255) NOT NULL,
    Clean_sheets INTEGER,
    Penalty_saved INTEGER,
    Penalties_faced INTEGER,
    Goals_conceded INTEGER,
    Mistakes INTEGER,
    Saves INTEGER,
    Shots_against INTEGER,
    FOREIGN KEY (Statistics_ID) REFERENCES Statistics_Per_Game_Per_Player(ID),
    FOREIGN KEY (Game_ID) REFERENCES Game(Game_ID)
);

-- PlayerInjuries
CREATE TABLE IF NOT EXISTS PlayerInjuries (
    injury_id VARCHAR(255),
    player_id VARCHAR(255) NOT NULL,
    injury_date DATE,
    injury_type VARCHAR(255),
    PRIMARY KEY (injury_id, player_id),
    FOREIGN KEY (player_id) REFERENCES PlayerGeneralInfo(ID) ON DELETE CASCADE,
    FOREIGN KEY (injury_type) REFERENCES InjuryTypeInfo(injury_type)
);



INSERT INTO InjuryTypeInfo (injury_type, recovery_time)
VALUES
    ('Sprained Ankle', '2 weeks'),
    ('Muscle Strain', '3 weeks'),
    ('Concussion', '1 week'),
    ('Fractured Bone', '6 weeks'),
    ('Torn Ligament', '8 weeks'),
    ('Dislocated Shoulder', '4 weeks'),
    ('Hamstring Injury', '3 weeks'),
    ('Knee Injury', '5 weeks'),
    ('Groin Strain', '2 weeks'),
    ('Calf Strain', '3 weeks');

INSERT INTO ClubIdentity (ClubName, Nickname, Team_color)
VALUES
    ('Manchester United', 'Red Devils', 'Red'),
    ('Real Madrid', 'Los Blancos', 'White'),
    ('FC Barcelona', 'Blaugrana', 'Blue and Red'),
    ('Bayern Munich', 'Die Bayern', 'Red and White'),
    ('Liverpool FC', 'The Reds', 'Red'),
    ('Juventus', 'La Vecchia Signora', 'Black and White'),
    ('Paris Saint-Germain', 'PSG', 'Blue and Red'),
    ('Manchester City', 'Citizens', 'Blue'),
    ('Chelsea FC', 'The Blues', 'Blue'),
    ('AC Milan', 'Rossoneri', 'Red and Black'),
    ('Arsenal FC', 'The Gunners', 'Red and White'),
    ('Tottenham Hotspur', 'Spurs', 'White and Navy Blue'),
    ('Inter Milan', 'Nerazzurri', 'Black and Blue'),
    ('Borussia Dortmund', 'BVB', 'Yellow and Black'),
    ('AS Roma', 'Giallorossi', 'Red and Yellow'),
    ('Atletico Madrid', 'Los Colchoneros', 'Red and White'),
    ('Sevilla FC', 'Los Nervionenses', 'White and Red'),
    ('Valencia CF', 'Los Murciélagos', 'White and Black'),
    ('Villarreal CF', 'The Yellow Submarine', 'Yellow'),
    ('RCD Mallorca', 'Los Bermellones', 'Red'),
    ('RCD Espanyol', 'Los Periquitos', 'Blue and White'),
    ('Real Betis', 'Los Verdiblancos', 'Green and White'),
    ('Real Sociedad', 'Txuri-urdines', 'Blue and White'),
    ('Málaga CF', 'Los Boquerones', 'Blue and White'),
    ('Athletic Bilbao', 'Los Leones', 'Red and White'),
    ('Granada CF', 'Nazaries', 'Red and White'),
    ('Levante UD', 'Granotas', 'Blue and Red'),
    ('Cádiz CF', 'Los Piratas', 'Yellow and Blue'),
    ('SD Huesca', 'Oscenses', 'Blue and Red'),
    ('Deportivo Alavés', 'Babazorros', 'Blue and White'),
    ('Getafe CF', 'Azulones', 'Blue'),
    ('CA Osasuna', 'Los Rojillos', 'Red'),
    ('Celta Vigo', 'Célticos', 'Sky Blue');

    

INSERT INTO ClubMainInfo (ClubOwner, Founded, Website, City, Club_ID, ClubName)
VALUES
    ('Joel Glazer', '1878-01-01', 'https://www.manutd.com', 'Manchester', 'MUFC', 'Manchester United'),
    ('Florentino Pérez', '1902-03-06', 'https://www.realmadrid.com', 'Madrid', 'RMCF', 'Real Madrid'),
    ('Josep Maria Bartomeu', '1899-11-29', 'https://www.fcbarcelona.com', 'Barcelona', 'FCB', 'FC Barcelona'),
    ('Herbert Hainer', '1900-02-27', 'https://fcbayern.com', 'Munich', 'FCBAY', 'Bayern Munich'),
    ('John W. Henry', '1892-06-03', 'https://www.liverpoolfc.com', 'Liverpool', 'LFC', 'Liverpool FC'),
    ('Andrea Agnelli', '1897-11-01', 'https://www.juventus.com', 'Turin', 'JUVE', 'Juventus'),
    ('Nasser Al-Khelaifi', '1970-08-12', 'https://en.psg.fr', 'Paris', 'PSG', 'Paris Saint-Germain'),
    ('Sheikh Mansour', '1880-04-16', 'https://www.mancity.com', 'Manchester', 'MCFC', 'Manchester City'),
    ('Roman Abramovich', '1905-03-10', 'https://www.chelseafc.com', 'London', 'CFC', 'Chelsea FC'),
    ('Paolo Scaroni', '1899-12-16', 'https://www.acmilan.com', 'Milan', 'ACM', 'AC Milan'),
    ('Stan Kroenke', '1886-12-01', 'https://www.arsenal.com', 'London', 'AFC', 'Arsenal FC'),
    ('Joe Lewis', '1882-09-05', 'https://www.tottenhamhotspur.com', 'London', 'THFC', 'Tottenham Hotspur'),
    ('Zhang Jindong', '1908-03-09', 'https://www.inter.it', 'Milan', 'INTER', 'Inter Milan'),
    ('Hans-Joachim Watzke', '1909-12-19', 'https://www.bvb.de', 'Dortmund', 'BVB', 'Borussia Dortmund'),
    ('Dan Friedkin', '1927-06-07', 'https://www.asroma.com', 'Rome', 'ASR', 'AS Roma'),
    ('Miguel Ángel Gil Marín', '1903-04-26', 'https://www.atleticodemadrid.com', 'Madrid', 'ATM', 'Atletico Madrid'),
    ('José Castro Carmona', '1890-01-25', 'https://www.sevillafc.es', 'Seville', 'SEV', 'Sevilla FC'),
    ('Anil Murthy', '1919-03-18', 'https://www.valenciacf.com', 'Valencia', 'VAL', 'Valencia CF'),
    ('Fernando Roig', '1923-03-10', 'https://www.villarrealcf.es', 'Villarreal', 'VIL', 'Villarreal CF'),
    ('Robert Sarver', '1916-03-05', 'https://www.rcdmallorca.es', 'Mallorca', 'RMA', 'RCD Mallorca'),
    ('Chen Yansheng', '1900-10-28', 'https://www.rcdespanyol.com', 'Barcelona', 'ESP', 'RCD Espanyol'),
    ('Ángel Haro', '1907-09-12', 'https://www.realbetisbalompie.es', 'Seville', 'BET', 'Real Betis'),
    ('Jokin Aperribay', '1909-09-07', 'https://www.realsociedad.eus', 'San Sebastián', 'SOC', 'Real Sociedad'),
    ('Carlos Mouriño', '1923-08-23', 'https://www.rccelta.es', 'Vigo', 'CEL', 'Celta Vigo'),
    ('Sheikh Al Thani', '1904-03-03', 'https://www.malagacf.com', 'Málaga', 'MAL', 'Málaga CF'),
    ('Aitor Elizegi', '1898-08-05', 'https://www.athletic-club.eus', 'Bilbao', 'ATH', 'Athletic Bilbao'),
    ('Jiang Lizhang', '1931-04-14', 'https://www.granadacf.es', 'Granada', 'GRA', 'Granada CF'),
    ('Francisco Catalán', '1909-09-09', 'https://www.levanteud.com', 'Valencia', 'LEV', 'Levante UD'),
    ('Manuel Vizcaíno', '1905-09-10', 'https://www.cadizcf.com', 'Cádiz', 'CAD', 'Cádiz CF'),
    ('Agustín Lasaosa', '1960-03-29', 'https://www.sdhuesca.es', 'Huesca', 'HUE', 'SD Huesca'),
    ('Alfonso Fernández de Trocóniz', '1921-01-23', 'https://www.deportivoalaves.com', 'Vitoria-Gasteiz', 'ALA', 'Deportivo Alavés'),
    ('Ángel Torres', '1983-07-24', 'https://www.getafecf.com', 'Getafe', 'GET', 'Getafe CF'),
    ('Luis Sabalza', '1920-10-24', 'https://www.osasuna.es', 'Pamplona', 'OSA', 'CA Osasuna');

INSERT INTO League (ID, Country, LeagueName, Num_teams, Num_relegations, Num_promotions, Num_continental_competition_spots, Domestic_Cups_rules, International_Cups_rules, Confederation, Founded, Organizing_body, Current_Champion, Most_Championships, TV_partners, Website, Level_on_Pyramid, Relegation_to, Promotion_to)
VALUES
    ('EPL', 'England', 'Premier League', 20, 3, 3, 4, 'FA Cup, EFL Cup', 'UEFA Champions League, UEFA Europa League', 'UEFA', '1888-12-01', 'The FA', 'Manchester City', 'Manchester United', 'Sky Sports, BT Sport', 'https://www.premierleague.com', 1, NULL, NULL),
    ('LaLiga', 'Spain', 'La Liga', 20, 3, 3, 4, 'Copa del Rey', 'UEFA Champions League, UEFA Europa League', 'UEFA', '1929-02-28', 'RFEF', 'Atletico Madrid', 'Real Madrid', 'Movistar, DAZN', 'https://www.laliga.com', 1, NULL, NULL),
    ('SerieA', 'Italy', 'Serie A', 20, 3, 3, 4, 'Coppa Italia', 'UEFA Champions League, UEFA Europa League', 'UEFA', '1898-03-12', 'FIGC', 'Inter Milan', 'Juventus', 'Sky Italia', 'https://www.legaseriea.it', 1, NULL, NULL),
    ('Bundesliga', 'Germany', 'Bundesliga', 18, 2, 2, 4, 'DFB-Pokal', 'UEFA Champions League, UEFA Europa League', 'UEFA', '1963-08-24', 'DFL', 'Bayern Munich', 'Bayern Munich', 'Sky Deutschland', 'https://www.bundesliga.com', 1, NULL, NULL),
    ('Ligue1', 'France', 'Ligue 1', 20, 3, 3, 3, 'Coupe de France', 'UEFA Champions League, UEFA Europa League', 'UEFA', '1932-02-11', 'LFP', 'Lille', 'Saint-Étienne', 'Canal+, beIN Sports', 'https://www.ligue1.com', 1, NULL, NULL);


INSERT INTO Season (SeasonYear, League_ID, Champions, Relegated, Standings, Matches, Teams, Goals_Scored, Top_Goalscorer, Best_Goalkeeper, Biggest_home_win, Biggest_away_win, Highest_scoring_game, Longest_winning_run, Longest_unbeaten_run, Longest_winless_run, Longest_losing_run, Highest_attendance, Lowest_attendance, Total_attendance, Average_attendance)
VALUES
    ('2022-2023', 'EPL', 'Manchester City', 'Norwich City', 'https://example.com/epl/2022-2023/standings', 380, 20, 1025, 'Harry Kane (Tottenham Hotspur)', 'Ederson (Manchester City)', 6, 5, 8, 10, 18, 12, 8, 75000, 10000, 19993000, 52582),
    ('2022-2023', 'LaLiga', 'Atletico Madrid', 'Huesca, Real Mallorca, Espanyol', 'https://example.com/laliga/2022-2023/standings', 380, 20, 995, 'Lionel Messi (Paris Saint-Germain)', 'Jan Oblak (Atletico Madrid)', 7, 6, 9, 9, 17, 11, 10, 69000, 8000, 17134500, 45145),
    ('2022-2023', 'SerieA', 'Inter Milan', 'Spezia, Venezia, Empoli', 'https://example.com/seriea/2022-2023/standings', 380, 20, 1003, 'Cristiano Ronaldo (Juventus)', 'Samir Handanovic (Inter Milan)', 6, 7, 10, 8, 16, 13, 9, 78000, 12000, 18045500, 47487),
    ('2022-2023', 'Bundesliga', 'Bayern Munich', 'Bochum, Greuther Fürth', 'https://example.com/bundesliga/2022-2023/standings', 306, 18, 913, 'Robert Lewandowski (Bayern Munich)', 'Manuel Neuer (Bayern Munich)', 5, 4, 7, 12, 14, 10, 11, 80000, 15000, 15689000, 51264),
    ('2022-2023', 'Ligue1', 'Lille', 'Bordeaux, Clermont, Troyes', 'https://example.com/ligue1/2022-2023/standings', 380, 20, 979, 'Kylian Mbappé (Paris Saint-Germain)', 'Benjamin Lecomte (Montpellier)', 5, 4, 9, 11, 15, 12, 10, 67000, 7000, 17593000, 46292),
     ('2021-2022', 'EPL', 'Manchester City', 'Fulham', 'https://example.com/epl/2021-2022/standings', 380, 20, 1020, 'Mohamed Salah (Liverpool)', 'Ederson (Manchester City)', 6, 5, 8, 10, 18, 12, 8, 75000, 10000, 19993000, 52582),
     ('2020-2021', 'EPL', 'Manchester City', 'West Brom', 'https://example.com/epl/2020-2021/standings', 380, 20, 1010, 'Harry Kane (Tottenham)', 'Ederson (Manchester City)', 6, 5, 8, 10, 18, 12, 8, 75000, 10000, 19993000, 52582),
    ('2020-2021', 'LaLiga', 'Atletico Madrid', 'Valladolid', 'https://example.com/laliga/2020-2021/standings', 380, 20, 980, 'Lionel Messi (Barcelona)', 'Jan Oblak (Atletico Madrid)', 7, 6, 9, 9, 17, 11, 10, 69000, 8000, 17134500, 45145);


INSERT INTO Staff (ID, First_name, Last_name, Club_ID, Position, Nationality, Playing_career_position, Past_clubs, ContractDate)
VALUES
    ('STAFF003', 'David', 'Williams', 'MUFC', 'Fitness Coach', 'England', 'Midfielder', 'Man United U23', '2022-04-05'),
    ('STAFF004', 'Maria', 'Martinez', 'RMCF', 'Physiotherapist', 'Spain', 'Defender', 'Real Madrid B', '2023-01-20'),
    ('STAFF005', 'Robert', 'Johnson', 'FCBAY', 'Head Coach', 'Germany', 'Midfielder', 'Bayern Munich II', '2021-12-12'),
    ('STAFF006', 'Julia', 'Gomez', 'LFC', 'Assistant Coach', 'England', 'Forward', 'Liverpool U23', '2023-05-10'),
    ('STAFF007', 'Paul', 'Smith', 'FCB', 'Head Coach', 'France', 'Midfielder', 'Juventus, Marseille', '2020-11-18'),
    ('STAFF008', 'Marco', 'Rossi', 'AFC', 'Head Coach', 'Italy', 'Defender', 'AC Milan', '2023-06-01'),
    ('STAFF009', 'Anna', 'Schmidt', 'BVB', 'Physiotherapist', 'Germany', 'Midfielder', 'Borussia Dortmund B', '2022-07-15');

INSERT INTO PlayerBirthInfo (birthdate, age)
VALUES
    ('1997-10-30', 25),
    ('1996-05-18', 27),
    ('2000-02-12', 23),
    ('1994-12-07', 28),
    ('1999-08-25', 23),
    ('2001-05-22', 22),
    ('2000-04-15', 23),
    ('1995-06-18', 28),
    ('2002-02-12', 21),
    ('1996-12-07', 26),
    ('2001-08-25', 21),
    ('1998-03-15', 25),
    ('1999-10-30', 23),
    ('2000-05-18', 23),
    ('1994-01-12', 29),
    ('1987-06-24', 36),
    ('1987-02-02', 36),
    ('1986-03-30', 37),
    ('1987-12-19', 35),
    ('1987-01-24', 36),
    ('1993-01-07', 30),
    ('1988-03-10', 35),
    ('1985-11-21', 37),
    ('1997-01-02', 26),
    ('1995-05-25', 28),
    ('1992-04-07', 31),
    ('1997-01-16', 26),
    ('2001-06-04', 22),
    ('2004-11-18', 18),
    ('1994-10-17', 28),
    ('1991-06-17', 32),
    ('1993-07-18', 30),
    ('1991-02-16', 32),
    ('1997-04-21', 26),
    ('1999-09-21', 23);

    


INSERT INTO Team (Club_ID, Age_group, Coach_Manager, League_ID)
VALUES
    ('LFC', 'Senior', 'STAFF006', 'EPL'),
    ('LFC', 'Youth', 'STAFF008', 'LaLiga'),
    ('FCBAY', 'Senior', 'STAFF005', 'Bundesliga'),
    ('FCBAY', 'Youth', 'STAFF010', 'Bundesliga'),
    ('FCB', 'Senior', 'STAFF007', 'SerieA'),
    ('FCB', 'Youth', 'STAFF007', 'SerieA'),
    ('MUFC', 'Senior', 'STAFF0011', 'EPL'),
    ('MUFC', 'Youth', 'STAFF0011', 'EPL'),
    ('RMCF', 'Senior','STAFF0012','LaLiga'),
    ('RMCF', 'Youth','STAFF0012','LaLiga'),
    ('AFC', 'Senior', 'STAFF008', 'EPL'),
    ('AFC', 'Youth', 'STAFF008', 'EPL'),
    ('BVB', 'Senior', 'STAFF009', 'Bundesliga'),
    ('JUVE', 'Senior', 'STAFF009', 'LaLiga'),
    ('BVB', 'Youth', 'STAFF009', 'Bundesliga'),
    ('PSG', 'Senior', 'STAFF009', 'Ligue1'),
    ('PSG', 'Youth', 'STAFF009', 'Ligue1'),
    ('MCFC', 'Senior', 'STAFF009', 'EPL'),
    ('MCFC', 'Youth', 'STAFF009', 'EPL'),
    ('ATM', 'Senior', 'STAFF009', 'LaLiga'),
    ('SEV', 'Senior', 'STAFF009', 'LaLiga'),
    ('VAL', 'Senior', 'STAFF009', 'LaLiga'),
    ('VIL', 'Senior', 'STAFF009', 'LaLiga'),
    ('ESP', 'Senior', 'STAFF009', 'LaLiga'),
    ('BET', 'Senior', 'STAFF009', 'LaLiga'),
    ('SOC', 'Senior', 'STAFF009', 'LaLiga'),
    ('CEL', 'Senior', 'STAFF022', 'LaLiga'),
    ('MAL', 'Senior', 'STAFF023', 'LaLiga'),
    ('ATH', 'Senior', 'STAFF024', 'LaLiga'),
    ('GRA', 'Senior', 'STAFF025', 'LaLiga'),
    ('LEV', 'Senior', 'STAFF026', 'LaLiga'),
    ('CAD', 'Senior', 'STAFF027', 'LaLiga'),
    ('HUE', 'Senior', 'STAFF028', 'LaLiga'),
    ('ALA', 'Senior', 'STAFF029', 'LaLiga'),
    ('GET', 'Senior', 'STAFF030', 'LaLiga'),
    ('OSA', 'Senior', 'STAFF031', 'LaLiga');



INSERT INTO PlayerGeneralInfo (ID, First_name, Last_name, PlayerNumber, Height, PlayerWeight, Position, Active_foot, Nationality, AgentID, clubID, teamID, birthdate, Age_group)
VALUES
    ('PLAYER005', 'James', 'Brown', 9, 182.0, 78.5, 'Forward', 'Left', 'England', 'STAFF003', 'MUFC', 'MUFC_Senior', '1997-10-30', 'Senior'),
    ('PLAYER006', 'Sophia', 'Garcia', 7, 175.0, 68.0, 'Midfielder', 'Right', 'Spain', 'STAFF004', 'RMCF', 'RMCF_Senior', '1996-05-18', 'Senior'),
    ('PLAYER007', 'Daniel', 'Keller', 22, 184.5, 80.0, 'Defender', 'Right', 'Germany', 'STAFF005', 'FCBAY', 'FCBAY_Senior', '2000-02-12', 'Senior'),
    ('PLAYER008', 'Isabella', 'Wong', 14, 167.0, 65.0, 'Forward', 'Left', 'England', 'STAFF006', 'LFC', 'LFC_Senior', '1994-12-07', 'Senior'),
    ('PLAYER009', 'Thomas', 'Martin', 19, 189.0, 83.5, 'Midfielder', 'Right', 'France', 'STAFF007', 'FCB', 'FCB_Senior', '1999-08-25', 'Senior'),
    ('PLAYER010', 'Lucas', 'Martinez', 10,  180.0, 75.0, 'Midfielder', 'Right', 'Argentina', 'STAFF008', 'AFC', 'AFC_Senior', '1998-03-15', 'Senior'),
    ('PLAYER011', 'Eva', 'Wagner', 11,  170.0, 65.0, 'Defender', 'Left', 'Germany', 'STAFF009', 'BVB', 'BVB_Senior', '2001-05-22', 'Senior'),
    ('PLAYER012', 'Alice', 'Johnson', 15, 170.0, 60.0, 'Midfielder', 'Right', 'England', 'STAFF003', 'MUFC', 'MUFC_Senior', '2000-04-15', 'Senior'),
    ('PLAYER013', 'Bob', 'Smith', 10,  180.0, 75.0, 'Forward', 'Left', 'Spain', 'STAFF004', 'RMCF', 'RMCF_Senior', '1995-06-18', 'Senior'),
    ('PLAYER014', 'Charlie', 'Williams', 8,  175.0, 70.0, 'Defender', 'Right', 'Germany', 'STAFF005', 'FCBAY', 'FCBAY_Senior', '2002-02-12', 'Senior'),
    ('PLAYER015', 'David', 'Brown', 14,  182.0, 80.0, 'Forward', 'Left', 'England', 'STAFF006', 'LFC', 'LFC_Senior', '1996-12-07', 'Senior'),
    ('PLAYER016', 'Eva', 'Martinez', 19,  165.0, 65.0, 'Midfielder', 'Right', 'France', 'STAFF007', 'FCB', 'FCB_Senior', '2001-08-25', 'Senior'),
    ('PLAYER017', 'Frank', 'Taylor', 7,  185.0, 78.0, 'Midfielder', 'Right', 'Argentina', 'STAFF008', 'AFC', 'AFC_Senior', '1998-03-15', 'Senior'),
    ('PLAYER018', 'Grace', 'Lewis', 11,  168.0, 63.0, 'Defender', 'Left', 'Germany', 'STAFF009', 'BVB', 'BVB_Senior', '2001-05-22', 'Senior'),
    ('PLAYER019', 'Hannah', 'Clark', 9,  172.0, 67.0, 'Forward', 'Right', 'Italy', 'STAFF009', 'JUVE', 'JUVE_Senior', '1999-10-30', 'Senior'),
    ('PLAYER020', 'Ivan', 'Garcia', 6,  178.0, 73.0, 'Midfielder', 'Left', 'Spain', 'STAFF009', 'PSG', 'PSG_Senior', '2000-05-18', 'Senior'),
    ('PLAYER021', 'Jack', 'Roberts', 20,  190.0, 85.0, 'Defender', 'Right', 'Brazil', 'STAFF009', 'MCFC', 'MCFC_Senior', '1994-01-12', 'Senior'),
    ('PLAYER022', 'Lionel', 'Messi', 10, 170.0, 72.0, 'Forward', 'Left', 'Argentina', 'STAFF003', 'FCB', 'FCB_Senior', '1987-06-24', 'Senior'),
    ('PLAYER023', 'Gerard', 'Piqué', 3, 194.0, 85.0, 'Defender', 'Right', 'Spain', 'STAFF004', 'FCB', 'FCB_Senior', '1987-02-02', 'Senior'),
    ('PLAYER024', 'Sergio', 'Ramos', 4, 184.0, 82.0, 'Defender', 'Right', 'Spain', 'STAFF005', 'RMCF', 'RMCF_Senior', '1986-03-30', 'Senior'),
    ('PLAYER025', 'Karim', 'Benzema', 9, 185.0, 81.0, 'Forward', 'Right', 'France', 'STAFF006', 'RMCF', 'RMCF_Senior', '1987-12-19', 'Senior'),
    ('PLAYER026', 'Luis', 'Suárez', 9, 182.0, 86.0, 'Forward', 'Right', 'Uruguay', 'STAFF007', 'ATM', 'ATM_Senior', '1987-01-24', 'Senior'),
    ('PLAYER027', 'Jan', 'Oblak', 13, 188.0, 87.0, 'Goalkeeper', 'Right', 'Slovenia', 'STAFF008', 'ATM', 'ATM_Senior', '1993-01-07', 'Senior'),
    ('PLAYER028', 'Ivan', 'Rakitić', 4, 184.0, 78.0, 'Midfielder', 'Right', 'Croatia', 'STAFF009', 'SEV', 'SEV_Senior', '1988-03-10', 'Senior'),
    ('PLAYER029', 'Jesús', 'Navas', 16, 170.0, 60.0, 'Right Back', 'Right', 'Spain', 'STAFF009', 'SEV', 'SEV_Senior', '1985-11-21', 'Senior'),
    ('PLAYER030', 'Carlos', 'Soler', 8, 183.0, 76.0, 'Midfielder', 'Right', 'Spain', 'STAFF009', 'VAL', 'VAL_Senior', '1997-01-02', 'Senior'),
    ('PLAYER031', 'José', 'Gayà', 14, 175.0, 70.0, 'Left Back', 'Left', 'Spain', 'STAFF009', 'VAL', 'VAL_Senior', '1995-05-25', 'Senior'),
    ('PLAYER032', 'Gerard', 'Moreno', 7, 181.0, 75.0, 'Forward', 'Right', 'Spain', 'STAFF009', 'VIL', 'VIL_Senior', '1992-04-07', 'Senior'),
    ('PLAYER033', 'Pau', 'Torres', 5, 191.0, 77.0, 'Defender', 'Left', 'Spain', 'STAFF009', 'VIL', 'VIL_Senior', '1997-01-16', 'Senior'),
    ('PLAYER034', 'Takefusa', 'Kubo', 26, 173.0, 67.0, 'Midfielder', 'Left', 'Japan', 'STAFF009', 'RMCF', 'RMCF_Senior', '2001-06-04', 'Senior'),
    ('PLAYER035', 'Luka', 'Romero', 30, 170.0, 65.0, 'Midfielder', 'Right', 'Argentina', 'STAFF009', 'RMCF', 'RMCF_Senior', '2004-11-18', 'Senior'),
    ('PLAYER036', 'Raúl', 'de Tomás', 11, 178.0, 73.0, 'Forward', 'Right', 'Spain', 'STAFF009', 'ESP', 'ESP_Senior', '1994-10-17', 'Senior'),
    ('PLAYER037', 'Leandro', 'Cabrera', 18, 187.0, 80.0, 'Defender', 'Left', 'Uruguay', 'STAFF009', 'ESP', 'ESP_Senior', '1991-06-17', 'Senior'),
    ('PLAYER038', 'Nabil', 'Fekir', 8, 173.0, 75.0, 'Midfielder', 'Left', 'France', 'STAFF009', 'BET', 'BET_Senior', '1993-07-18', 'Senior'),
    ('PLAYER039', 'Sergio', 'Canales', 10, 180.0, 73.0, 'Midfielder', 'Right', 'Spain', 'STAFF009', 'BET', 'BET_Senior', '1991-02-16', 'Senior'),
    ('PLAYER040', 'Mikel', 'Oyarzabal', 10, 181.0, 70.0, 'Forward', 'Left', 'Spain', 'STAFF009', 'SOC', 'SOC_Senior', '1997-04-21', 'Senior'),
    ('PLAYER041', 'Alexander', 'Isak', 19, 190.0, 80.0, 'Forward', 'Right', 'Sweden', 'STAFF009', 'SOC', 'SOC_Senior', '1999-09-21', 'Senior');



INSERT INTO Goalkeeper (Player_ID, Throwing_arm)
VALUES
    ('PLAYER009', 'Right'),
    ('PLAYER008', 'Left'),
    ('PLAYER005', 'Right'),
    ('PLAYER006', 'Left'),
    ('PLAYER007', 'Right');


INSERT INTO Stadium (ID, Location, StadiumName, Seats_capacity)
VALUES
    ('STADIUM003', 'Liverpool', 'Anfield', 56000),
    ('STADIUM004', 'Barcelona', 'Camp Nou', 99000),
    ('STADIUM005', 'Milan', 'San Siro', 80000),
    ('STADIUM006', 'Munich', 'Allianz Arena', 75000),
    ('STADIUM007', 'Paris', 'Parc des Princes', 48000);

INSERT INTO Game (Game_ID, HomeClubID, AwayClubID, Age_group, Goals, Stadium_ID, Competition, SeasonYear, Match_Date, Odds, Lineup, Substitutions, Yellow_cards, Red_cards, xG, Ball_possession, Goal_Attempts, Shots_on_Goal, Shots_off_Goal, Blocked_Shots, Corner_kicks, Offsides, Goalkeeper_saves, Fouls, Total_Passes, Completed_Passes, Tackles, Attacks, Dangerous_attacks,League_ID)
VALUES
    ('GAME003', 'LFC', 'FCBAY', 'Senior', 4, 'STADIUM003', 'EPL', '2022-2023','2022-09-10', 2.10, 'Lineup information', 'Substitution details', 1, 2, 1.5, 58, 14, 6, 8, 2, 3, 7, 1, 2, 16, 245, 205, 18, 32, 'EPL'),
    ('GAME004', 'LFC', 'FCBAY', 'Youth', 3, 'STADIUM004', 'Youth League','2022-2023', '2022-09-11', 2.50, 'Lineup information', 'Substitution details', 2, 0, 1.2, 60, 13, 5, 7, 3, 4, 6, 0, 1, 14, 260, 220, 20, 37, 'LaLiga'),
    ('GAME005', 'FCB', 'RMCF', 'Senior', 2, 'STADIUM005', 'SerieA', '2022-2023','2022-09-12', 1.90, 'Lineup information', 'Substitution details', 4, 1, 0.9, 62, 12, 4, 6, 2, 2, 8, 1, 2, 18, 250, 210, 22, 39, 'Ligue1'),
    ('GAME006', 'FCBAY', 'MUFC', 'Senior', 1, 'STADIUM006', 'Bundesliga','2022-2023', '2022-09-13', 2.20, 'Lineup information', 'Substitution details', 2, 1, 1.3, 55, 13, 7, 6, 3, 3, 6, 1, 1, 15, 240, 200, 17, 30,'EPL'),
     ('GAME007', 'AFC', 'MUFC', 'Senior', 3, 'STADIUM003', 'EPL', '2021-2022','2021-10-15', 2.30, 'Lineup information', 'Substitution details', 2, 1, 1.4, 57, 15, 7, 9, 3, 4, 5, 2, 3, 17, 255, 215, 19, 33, 'EPL'),
    ('GAME008', 'BVB', 'FCBAY', 'Youth', 2, 'STADIUM006', 'Youth League','2022-2023', '2022-10-16', 2.40, 'Lineup information', 'Substitution details', 1, 0, 1.1, 59, 12, 6, 5, 2, 3, 7, 0, 2, 13, 245, 205, 21, 36, 'Bundesliga'),
    ('GAME009', 'MUFC', 'RMCF', 'Senior', 3, 'STADIUM003', 'EPL', '2022-2023','2023-01-10', 2.30, 'Lineup information', 'Substitution details', 2, 1, 1.4, 57, 15, 7, 9, 3, 4, 5, 2, 3, 17, 255, 215, 19, 33, 'EPL'),
    ('GAME010', 'FCBAY', 'LFC', 'Youth', 2, 'STADIUM004', 'Youth League','2022-2023', '2023-01-11', 2.40, 'Lineup information', 'Substitution details', 1, 0, 1.1, 59, 12, 6, 5, 2, 3, 7, 0, 2, 13, 245, 205, 21, 36, 'Bundesliga'),
    ('GAME011', 'FCB', 'PSG', 'Senior', 2, 'STADIUM005', 'SerieA', '2022-2023','2023-01-12', 1.90, 'Lineup information', 'Substitution details', 4, 1, 0.9, 62, 12, 4, 6, 2, 2, 8, 1, 2, 18, 250, 210, 22, 39, 'Ligue1'),
    ('GAME012', 'JUVE', 'MCFC', 'Senior', 1, 'STADIUM006', 'Bundesliga','2022-2023', '2023-01-13', 2.20, 'Lineup information', 'Substitution details', 2, 1, 1.3, 55, 13, 7, 6, 3, 3, 6, 1, 1, 15, 240, 200, 17, 30,'EPL'),
    ('GAME013', 'AFC', 'BVB', 'Senior', 3, 'STADIUM003', 'EPL', '2022-2023','2023-02-15', 2.30, 'Lineup information', 'Substitution details', 2, 1, 1.4, 57, 15, 7, 9, 3, 4, 5, 2, 3, 17, 255, 215, 19, 33, 'EPL'),
    ('GAME014', 'PSG', 'MUFC', 'Youth', 2, 'STADIUM006', 'Youth League','2022-2023', '2023-02-16', 2.40, 'Lineup information', 'Substitution details', 1, 0, 1.1, 59, 12, 6, 5, 2, 3, 7, 0, 2, 13, 245, 205, 21, 36, 'Ligue1'),
    ('GAME015', 'MCFC', 'AFC', 'Senior', 2, 'STADIUM005', 'EPL', '2022-2023','2023-02-17', 1.90, 'Lineup information', 'Substitution details', 4, 1, 0.9, 62, 12, 4, 6, 2, 2, 8, 1, 2, 18, 250, 210, 22, 39, 'EPL'),
    ('GAME016', 'BVB', 'JUVE', 'Senior', 1, 'STADIUM006', 'Bundesliga','2022-2023', '2023-02-18', 2.20, 'Lineup information', 'Substitution details', 2, 1, 1.3, 55, 13, 7, 6, 3, 3, 6, 1, 1, 15, 240, 200, 17, 30,'Bundesliga'),
    ('GAME017', 'RMCF', 'PSG', 'Senior', 3, 'STADIUM003', 'LaLiga', '2022-2023','2023-03-15', 2.30, 'Lineup information', 'Substitution details', 2, 1, 1.4, 57, 15, 7, 9, 3, 4, 5, 2, 3, 17, 255, 215, 19, 33, 'LaLiga'),
    ('GAME018', 'LFC', 'MCFC', 'Youth', 2, 'STADIUM006', 'Youth League','2022-2023', '2023-03-16', 2.40, 'Lineup information', 'Substitution details', 1, 0, 1.1, 59, 12, 6, 5, 2, 3, 7, 0, 2, 13, 245, 205, 21, 36, 'EPL'),
      ('GAME039', 'FCB', 'RMCF', 'Senior', 2, 'STADIUM005', 'LaLiga', '2020-2021','2020-09-15', 1.90, 'Lineup information', 'Substitution details', 4, 1, 0.9, 62, 12, 4, 6, 2, 2, 8, 1, 2, 18, 250, 210, 22, 39, 'LaLiga'),
    ('GAME040', 'ATM', 'SEV', 'Senior', 3, 'STADIUM004', 'LaLiga', '2020-2021','2020-10-03', 2.10, 'Lineup information', 'Substitution details', 2, 0, 1.2, 60, 13, 5, 7, 3, 4, 6, 0, 1, 14, 260, 220, 20, 37, 'LaLiga'),
    ('GAME041', 'VAL', 'VIL', 'Senior', 1, 'STADIUM003', 'LaLiga', '2020-2021','2020-11-21', 2.30, 'Lineup information', 'Substitution details', 1, 1, 1.1, 55, 11, 4, 5, 2, 3, 5, 1, 2, 15, 230, 190, 17, 30, 'LaLiga'),
    ('GAME042', 'RMCF', 'ESP', 'Senior', 4, 'STADIUM006', 'LaLiga', '2020-2021','2020-12-05', 1.80, 'Lineup information', 'Substitution details', 3, 0, 1.3, 58, 14, 6, 8, 2, 3, 7, 1, 2, 16, 245, 205, 18, 32, 'LaLiga'),
    ('GAME043', 'BET', 'SOC', 'Senior', 2, 'STADIUM005', 'LaLiga', '2020-2021','2021-01-10', 2.40, 'Lineup information', 'Substitution details', 2, 2, 1.4, 57, 15, 7, 9, 3, 4, 5, 2, 3, 17, 255, 215, 19, 33, 'LaLiga'),
    ('GAME044', 'CEL', 'MAL', 'Senior', 3, 'STADIUM004', 'LaLiga', '2020-2021','2021-02-15', 2.00, 'Lineup information', 'Substitution details', 1, 0, 1.0, 59, 12, 6, 5, 2, 3, 7, 0, 2, 13, 245, 205, 21, 36, 'LaLiga'),
    ('GAME045', 'ATH', 'GRA', 'Senior', 1, 'STADIUM003', 'LaLiga', '2020-2021','2021-03-20', 2.20, 'Lineup information', 'Substitution details', 0, 1, 0.8, 53, 10, 3, 4, 1, 2, 4, 2, 1, 12, 220, 180, 15, 28, 'LaLiga'),
    ('GAME046', 'LEV', 'CAD', 'Senior', 2, 'STADIUM006', 'LaLiga', '2020-2021','2021-04-10', 2.30, 'Lineup information', 'Substitution details', 2, 1, 1.2, 54, 11, 5, 6, 2, 3, 6, 1, 1, 14, 235, 195, 16, 31, 'LaLiga'),
    ('GAME047', 'HUE', 'ALA', 'Senior', 0, 'STADIUM005', 'LaLiga', '2020-2021','2021-05-05', 2.50, 'Lineup information', 'Substitution details', 0, 0, 0.7, 50, 9, 2, 3, 1, 1, 3, 3, 0, 10, 210, 170, 13, 25, 'LaLiga'),
    ('GAME048', 'GET', 'OSA', 'Senior', 1, 'STADIUM004', 'LaLiga', '2020-2021','2021-05-22', 2.10, 'Lineup information', 'Substitution details', 1, 1, 0.9, 52, 10, 4, 5, 2, 2, 5, 2, 1, 11, 225, 185, 14, 29, 'LaLiga'),
    ('GAME049', 'RMCF', 'VIL', 'Senior', 3, 'STADIUM007', 'LaLiga', '2020-2021','2021-06-05', 1.70, 'Lineup information', 'Substitution details', 3, 1, 1.5, 61, 16, 7, 9, 3, 4, 8, 1, 3, 19, 260, 220, 23, 40, 'LaLiga'),
('GAME050', 'RMCF', 'SEV', 'Senior', 2, 'STADIUM003', 'LaLiga', '2020-2021','2021-06-19', 1.60, 'Lineup information', 'Substitution details', 2, 0, 1.4, 63, 15, 6, 8, 2, 3, 7, 0, 2, 18, 255, 215, 21, 38, 'LaLiga'),
('GAME051', 'FCB', 'VAL', 'Senior', 4, 'STADIUM005', 'LaLiga', '2020-2021','2021-07-03', 1.80, 'Lineup information', 'Substitution details', 4, 2, 1.3, 65, 17, 8, 10, 3, 5, 9, 2, 3, 20, 270, 230, 24, 42, 'LaLiga'),
('GAME052', 'FCB', 'BET', 'Senior', 1, 'STADIUM005', 'LaLiga', '2020-2021','2021-07-17', 2.00, 'Lineup information', 'Substitution details', 1, 1, 1.2, 67, 14, 5, 7, 2, 3, 6, 1, 2, 15, 240, 200, 19, 34, 'LaLiga');

INSERT INTO Statistics_Per_Game_Per_Player (
    ID, Game_ID, Player_ID, Minutes_played, Assists, Goals, Shots_taken,
    Shots_on_goal, Shots_taken_inside_box, Shots_taken_outside_box,
    Passes_attempted, Passes_complete, Key_passes_attempted,
    Key_passes_completed, Crosses, Aerial_challenges_attempted, Aerial_challenges_success)
VALUES
    ('STAT001', 'GAME003', 'PLAYER008', 90, 2, 4, 4, 3, 2, 2, 60, 48, 3, 2, 5, 7, 4),
    ('STAT002', 'GAME003', 'PLAYER009', 90, 0, 2, 3, 2, 1, 2, 50, 40, 4, 3, 2, 6, 3),
    ('STAT003', 'GAME005', 'PLAYER008', 90, 1, 1, 5, 3, 3, 2, 55, 45, 2, 2, 4, 8, 5),
    ('STAT004', 'GAME004', 'PLAYER009', 90, 1, 5, 6, 4, 4, 2, 70, 60, 5, 4, 6, 7, 4),
    ('STAT005', 'GAME005', 'PLAYER005', 90, 0, 2, 4, 3, 2, 2, 65, 55, 4, 3, 3, 5, 2),
    ('STAT006', 'GAME006', 'PLAYER006', 90, 0, 0, 3, 2, 1, 2, 60, 50, 3, 2, 2, 6, 3),
    ('STAT007', 'GAME006', 'PLAYER007', 90, 0, 1, 4, 2, 1, 3, 55, 45, 3, 3, 4, 4, 2),
     ('STAT008', 'GAME007', 'PLAYER010', 90, 1, 2, 5, 3, 3, 2, 65, 55, 4, 3, 3, 5, 2),
    ('STAT009', 'GAME007', 'PLAYER005', 90, 0, 1, 4, 2, 1, 3, 55, 45, 3, 3, 4, 4, 2),
    ('STAT010', 'GAME008', 'PLAYER011', 90, 0, 1, 3, 2, 1, 2, 60, 50, 3, 2, 2, 6, 3),
    ('STAT011', 'GAME008', 'PLAYER007', 90, 0, 1, 4, 2, 1, 3, 55, 45, 3, 3, 4, 4, 2),
     ('STAT012', 'GAME009', 'PLAYER012', 90, 1, 2, 4, 3, 2, 2, 60, 48, 3, 2, 5, 7, 4),
    ('STAT013', 'GAME009', 'PLAYER013', 90, 0, 1, 3, 2, 1, 2, 50, 40, 4, 3, 2, 6, 3),
    ('STAT014', 'GAME010', 'PLAYER014', 90, 1, 1, 5, 3, 3, 2, 55, 45, 2, 2, 4, 8, 5),
    ('STAT015', 'GAME010', 'PLAYER015', 90, 1, 0, 6, 4, 4, 2, 70, 60, 5, 4, 6, 7, 4),
    ('STAT016', 'GAME011', 'PLAYER016', 90, 0, 2, 4, 3, 2, 2, 65, 55, 4, 3, 3, 5, 2),
    ('STAT017', 'GAME011', 'PLAYER017', 90, 0, 0, 3, 2, 1, 2, 60, 50, 3, 2, 2, 6, 3),
    ('STAT018', 'GAME012', 'PLAYER018', 90, 0, 1, 4, 2, 1, 3, 55, 45, 3, 3, 4, 4, 2),
    ('STAT019', 'GAME012', 'PLAYER019', 90, 1, 2, 5, 3, 3, 2, 65, 55, 4, 3, 3, 5, 2),
    ('STAT020', 'GAME013', 'PLAYER020', 90, 0, 1, 4, 2, 1, 3, 55, 45, 3, 3, 4, 4, 2),
    ('STAT021', 'GAME013', 'PLAYER021', 90, 0, 1, 3, 2, 1, 2, 60, 50, 3, 2, 2, 6, 3),
    ('STAT022', 'GAME014', 'PLAYER012', 90, 0, 1, 4, 2, 1, 3, 55, 45, 3, 3, 4, 4, 2),
    ('STAT023', 'GAME014', 'PLAYER013', 90, 1, 2, 5, 3, 3, 2, 65, 55, 4, 3, 3, 5, 2),
    ('STAT024', 'GAME015', 'PLAYER014', 90, 0, 1, 4, 2, 1, 3, 55, 45, 3, 3, 4, 4, 2),
    ('STAT025', 'GAME015', 'PLAYER015', 90, 0, 1, 3, 2, 1, 2, 60, 50, 3, 2, 2, 6, 3),
    ('STAT026', 'GAME016', 'PLAYER016', 90, 0, 1, 4, 2, 1, 3, 55, 45, 3, 3, 4, 4, 2),
    ('STAT027', 'GAME016', 'PLAYER017', 90, 1, 2, 5, 3, 3, 2, 65, 55, 4, 3, 3, 5, 2),
    ('STAT028', 'GAME017', 'PLAYER018', 90, 0, 1, 4, 2, 1, 3, 55, 45, 3, 3, 4, 4, 2),
    ('STAT029', 'GAME017', 'PLAYER019', 90, 0, 1, 3, 2, 1, 2, 60, 50, 3, 2, 2, 6, 3),
    ('STAT030', 'GAME018', 'PLAYER020', 90, 0, 1, 4, 2, 1, 3, 55, 45, 3, 3, 4, 4, 2),
    ('STAT031', 'GAME018', 'PLAYER021', 90, 1, 2, 5, 3, 3, 2, 65, 55, 4, 3, 3, 5, 2),
    ('1', 'GAME049', 'PLAYER024', 90, 0, 1, 3, 2, 2, 1, 60, 50, 5, 3, 2, 4, 3),
    ('2', 'GAME049', 'PLAYER025', 80, 1, 0, 4, 2, 3, 1, 55, 45, 4, 2, 1, 3, 2),
    ('3', 'GAME050', 'PLAYER034', 70, 0, 0, 2, 1, 1, 1, 40, 30, 3, 1, 2, 2, 1),
    ('4', 'GAME050', 'PLAYER035', 60, 1, 1, 5, 3, 4, 1, 65, 55, 6, 4, 3, 5, 4),
    ('5', 'GAME051', 'PLAYER022', 90, 2, 2, 6, 4, 5, 1, 70, 60, 7, 5, 4, 6, 5),
    ('6', 'GAME051', 'PLAYER023', 85, 0, 0, 1, 0, 0, 1, 50, 40, 2, 1, 1, 3, 2),
    ('7', 'GAME052', 'PLAYER022', 80, 1, 1, 4, 3, 3, 1, 60, 50, 5, 3, 2, 4, 3),
    ('8', 'GAME052', 'PLAYER023', 75, 0, 0, 2, 1, 1, 1, 55, 45, 4, 2, 1, 3, 2),
     ('9', 'GAME049', 'PLAYER032', 90, 0, 1, 4, 2, 3, 1, 58, 48, 4, 3, 2, 4, 3),
    ('10', 'GAME049', 'PLAYER033', 85, 0, 0, 2, 1, 1, 1, 52, 42, 3, 2, 1, 3, 2),
    ('11', 'GAME050', 'PLAYER028', 80, 0, 0, 3, 1, 2, 1, 54, 44, 4, 2, 2, 4, 3),
    ('12', 'GAME050', 'PLAYER029', 75, 0, 0, 1, 0, 0, 1, 50, 40, 2, 1, 1, 3, 2),
     ('13', 'GAME051', 'PLAYER030', 80, 0, 1, 4, 3, 3, 1, 60, 50, 5, 3, 2, 4, 3),
    ('14', 'GAME051', 'PLAYER031', 75, 0, 1, 2, 1, 1, 1, 55, 45, 4, 2, 1, 3, 2),
    ('15', 'GAME052', 'PLAYER038', 80, 1, 0, 4, 2, 3, 1, 58, 48, 4, 3, 2, 4, 3),
    ('16', 'GAME052', 'PLAYER039', 85, 0, 1, 3, 2, 2, 1, 52, 42, 3, 2, 1, 3, 2),
   ('17', 'GAME049', 'PLAYER034', 70, 0, 0, 2, 1, 1, 1, 40, 30, 3, 1, 2, 2, 1),
    ('18', 'GAME049', 'PLAYER035', 60, 1, 1, 5, 3, 4, 1, 65, 55, 6, 4, 3, 5, 4),
      ('21', 'GAME039', 'PLAYER022', 90, 1, 1, 5, 3, 4, 1, 70, 60, 7, 5, 4, 6, 5),
    ('22', 'GAME039', 'PLAYER023', 85, 0, 0, 1, 0, 0, 1, 50, 40, 2, 1, 1, 3, 2),
    ('23', 'GAME039', 'PLAYER024', 90, 0, 1, 3, 2, 2, 1, 60, 50, 5, 3, 2, 4, 3),
    ('24', 'GAME039', 'PLAYER025', 80, 1, 0, 4, 2, 3, 1, 55, 45, 4, 2, 1, 3, 2),
     ('25', 'GAME042', 'PLAYER024', 90, 0, 0, 2, 1, 1, 1, 58, 48, 4, 3, 2, 4, 3),
    ('26', 'GAME042', 'PLAYER025', 85, 0, 1, 3, 2, 2, 1, 52, 42, 3, 2, 1, 3, 2),
    ('27', 'GAME042', 'PLAYER034', 70, 0, 0, 2, 1, 1, 1, 40, 30, 3, 1, 2, 2, 1),
    ('28', 'GAME042', 'PLAYER035', 60, 1, 1, 5, 3, 4, 1, 65, 55, 6, 4, 3, 5, 4);







