---

# Soccer Scouting Platform

## Project Description

The intent of this project was to gain an understanding of the process of building a full database application.

### Domain of the Application:
The domain of this application is a soccer scouting platform. This platform is designed to focus on the data that measures the performance of players and assists clubs in making informed decisions regarding player recruitment.

### Aspects of the Domain Modeled by the Database:
The database models active soccer players. Each player is characterized by:
- Generic physical stats such as height, weight, preferred foot, etc.
- Game-specific stats such as km run, pass completion rate, tackle success, and more.

## Database Specifications:

### Benefits:
Our application serves as a comprehensive information bank for football scouts. The database is pivotal to its functionality, ensuring secure storage of relevant statistics and efficient data access management.

### Functionality:
The database offers the following functionalities:
- Allows football scouts to access player and team statistics.
- Provides rankings of players based on position and league.
- Supports two user classes: data collectors (who input new game information) and scouts (who analyze the data to assess player quality and ability).
- Enables statistical analysis of player performance using various filters, such as performance against specific teams, home vs. away games, and game day weather conditions.

## Application Platform:

The project utilizes Reactjs for building the user interface. This interface communicates with a Postgresql DBMS via an Expressjs RESTful API.

## ER Diagram:

Please refer to the provided [ER Diagram](ER-diagram.drawio.pdf) for a visual representation of the database structure. Our drawing software uses a color (red on the diagram) to distinguish weak entity relationship keys from other keys.

## Entities & Relationships:

Detailed information about the entities, their attributes, and relationships can be found in the provided document. Some of the main entities include Player, Club, Team, League, Staff, Manager, and Stadium, among others.

---

### Running the Application

- Build backend development server container
`cd backend`
`docker build -t soccer-sleuth-frontend -f Dockerfile.dev .`
- Build frontend development server container
`cd frontend`
`docker build -t soccer-sleuth-backend -f Dockerfile.dev .`
However,these two steps are usually not needed.
Build the entire stack by running the command `docker-compose build`. Make sure to be in the root directory while running this.
You can run the whole stack container with the command in the root directory terminal window :`docker compose up -d`
Please, make sure docker is running before attempting this. To stop the stack container, run `docker compose down`

### Development

When the docker container is running, your changes will not be visible on the application unless you rebuild the container (see command from earlier above). We will set up automatic file-watching later to eliminate this repetitive building of the container.


### PGadmin

PGadmin allows for seeing the data live as we perform operations on the app.
Download: https://www.pgadmin.org/download/
Docker: already configured in the covker file
Starting it up: the port is `5050:80`. you will be prompoted for login credintials. I set them as: 
   - username: pgadmin4@pgadmin.org
   - password: admin
Connecting Database: Once signed in, you need to connect our database.
   - right click Servers -> Regsiter -> Server
   - Under General Tabe enter Name (doesnt matter)
   - Under Connection Tab enter: name = db, username = Soccer_Scout, Password = Soccer_Sleuth_2023
Viewing Table:
   - Servers -> Databases -> soccer_sleuth-db -> Schemas -> public -> Tables
   - Right click on table you want to view -> View Data
