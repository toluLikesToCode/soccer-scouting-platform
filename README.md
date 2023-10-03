# Development of a SoccerSleuth: a Scouting Platform

## Contribution guidelines

### SSH verification and Configuration

Before we can clone the repository, we need to make sure that we have configured SSH communication between our machines and our UBC github account (not our personal accounts)

------------------
>
>**_NOTE_**: The following commands are for MAC devices. If you are using a windows device, you may need to do some research on how to do these steps on your machine.
-------------------

1. Check if you already have an SSH key
 Open a terminal window and run the command `ls -al ~/.ssh`.

   A.  If a compatible SSH key exists, it will be one of the following:

<https://github.students.cs.ubc.ca/CPSC304-2023S-T2/project_p9c3b_u5y3d_x5w6i.git>

- id_rsa.pub
- id_ecdsa.pub
- id_ed25519.pub
   If an SSH  key exists, display it by running `cat ~/.ssh/id_rsa.pub` (id_rsa can be replaced with any of the above three if it's not available)
   Once displayed, copy the SSH key and go to [this link](https://github.students.cs.ubc.ca/settings/keys) .

   Press "New SSH key" green button on the right.
   Paste the copied SSH key in the bottom text field and give it a name in the top field.

   Save (by press "Add SSH key")
   Next set up SSH connect your local agent to github with the command

   ```bash
    eval "$(ssh-agent -s)"

ssh-add ~/.ssh/id_rsa

```
Next, proceed to cloning

   B.  If a valid SSH key does not exist, please head over to [this link](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) to generate one and add to your UBC github account as described above

### Cloning

- Navigate to the your desired working directory (`cd <folder-name>`)
- Open a terminal window and run the following command

 ```bash
  git clone https://github.students.cs.ubc.ca/CPSC304-2023S-T2/project_p9c3b_u5y3d_x5w6i.git
 ```

You will need your cwl credentials to be able to clone the repo.
Once cloned, add the remote origin by running the command below

```bash
git remote add origin https://github.students.cs.ubc.ca/CPSC304-2023S-T2/project_p9c3b_u5y3d_x5w6i.git
```

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