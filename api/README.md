# Technical Task Ecwid online store


A Node.js + TypeScript-based image generator service built using Express. This project supports image processing and upload functionalities, and is secured using Helmet, with logging via Winston and Morgan. It is also integrated with Firebase Admin for extended functionality.

## 🚀 Features

- Express.js server with TypeScript
- Image uploads and processing using `multer` and `sharp`
- Firebase Admin SDK integration
- Security headers via `helmet`
- Logging with `winston` and `morgan`
- Prettier and ESLint setup for consistent code style
- Environment variable support via `.env`
- Docker container support
- Easy startup with Docker Compose

## 📦 Installation

```bash
git clone https://github.com/artEsoyan/artak-esoyan-backend-task.git
cd artak-esoyan-backend-task
yarn install
```

## 🐳 Docker Support

To run the project in a Docker container:

```bash
docker build -t ecwid-online-store .
docker run -p 3000:3000 ecwid-online-store
```

Or, using Docker Compose:

```bash
docker-compose up
```

This will build and start the application automatically.

## 🛠 Scripts

| Command        | Description                             |
|----------------|-----------------------------------------|
| `yarn start`   | Run the application                     |
| `yarn dev`     | Run the app in development with Nodemon |
| `yarn lint`    | Run ESLint to check for issues          |
| `yarn lint:fix`| Automatically fix linting issues        |
| `yarn format`  | Format code using Prettier              |

## 🧪 Tech Stack

- **Backend Framework:** Express
- **Language:** TypeScript
- **Image Handling:** Multer, Sharp
- **Security:** Helmet
- **Environment Config:** Dotenv
- **Logging:** Winston, Morgan
- **Cloud Admin:** Firebase Admin SDK
- **Containerization:** Docker, Docker Compose

## 🖼 Example Usage

> Add your API usage examples here, such as uploading an image via `/upload` endpoint.

```bash
curl -F "image=@/path/to/your/image.jpg" http://localhost:3000/upload/images
```

## 🧰 Folder Structure

```
src/
├── bin/
│   └── www.ts           # Entry point
├── routes/              # Route definitions
├── controllers/         # Request handlers
├── services/            # Business logic
├── utils/               # Helper functions
├── middlewares/         # Custom middleware
└── config/              # Configuration files
```