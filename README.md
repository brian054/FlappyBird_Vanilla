# FlappyBird_Vanilla
Flappy Bird is an old mobile game that I wanted to recreate to use as a mini-game in another game project I have.

# To Run on your localhost (MAC):
Open a terminal and write the following:

```
python3 -m http.server
```

# To Run on your localhost (Windows):

Step 1: Install NodeJS

Step 2: Navigate to your project directory (or clone this project)

Step 3: Open a terminal and type

```
npm init
```

This command will create your 'package.json' file which will store
our project's metadata and dependencies. 

There will be a prompt to enter information, I just press 'Enter' until it's done, this assigns everything to the necessary default information. 

Step 4: Install Web Server 
In the same Terminal window, run the command below to install 'http-server' which is a lightweight web server for development.

```
npm install --global http-server
```
Step 5: Start your Web Server
Run the following command to start up your web server.

```
http-server
```

Then visit http://localhost:8080. If you have port 8080 already in use you can specify a different port by doing the command below.

```
http-server -p 3000
```

