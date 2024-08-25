## Readme for server
=============

### prerequsties
-Nodejs
-Mongodb
-Redis (Installation step on bottom area)

## Installation

1. Clone the repository:

```
git clone https://github.com/iam-abin/Blogster.git
```

2. Navigate to the project directory:

```
cd Blogster
```

3. Install the dependencies:

```
cd backend
```
```
npm install 
```
- open another tab in vscode terminal and run
```
cd frontend
```
```
npm install 
```

4. Set up the required environment variables. Rename the `.env.example` file to `.env` and provide the necessary values for your environment.

5. Start server (Running the app):

- In both frontend and backend terminal tabs, run

```
 npm run dev
```

## redis

### Installation 

- first install brew package manager if not installed
(visit the official site of brew to install based on the os)

- To install redis in our local machine,

```
brew install redis
```

- To start redis using brew,

```
brew services start redis
```

- To Check redis server is running,

```
redis-cli ping
```

- To stop redis server

```
brew services stop redis
```

- To restart redis

```
brew services restart redis
```