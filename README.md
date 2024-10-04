## Blogster

It is a blog application build focused on the redis caching mechanism.

### prerequsties
- Nodejs
- Mongodb 
- Redis (Installation step on bottom area)

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

5. Access the application from browser using:

```
http://localhost:4000
```

# Images
![Screenshot from 2024-08-25 13-13-44](https://github.com/user-attachments/assets/323499e5-b189-44b1-86ac-e5d1e1e31043)

![Screenshot from 2024-08-25 13-14-04](https://github.com/user-attachments/assets/e8a7544d-7622-41b7-bd99-29a8d03a6c6a)

![Screenshot from 2024-08-25 13-20-48](https://github.com/user-attachments/assets/d809a9ee-fd82-4114-8b4d-269b623ce2db)

![Screenshot from 2024-08-25 13-19-38](https://github.com/user-attachments/assets/cec07238-7b22-46ea-b339-7a1cce6c9491)

![Screenshot from 2024-08-25 13-23-04](https://github.com/user-attachments/assets/6fdfea7c-c17c-49df-9cce-1cc95f45dbda)


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
