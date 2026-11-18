# CineTrack

CineTrack is a movie discovery app built with React. It uses The Movie Database (TMDB) API to display popular movies, search the catalog and let users save titles to a personal watchlist.

## Features

- Browse popular and highly rated movies.
- Search movies by title using the TMDB API.
- Save and remove movies from **My List**.
- Keep the personal list between visits with `localStorage`.
- Responsive layout for desktop and mobile screens.

## Tech stack

- React
- JavaScript (ES Modules)
- Vite
- Tailwind CSS
- TMDB API
- Browser `localStorage`

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/joaoluis2211/CineTrack.git
cd CineTrack
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the TMDB API key

Create a `.env` file in the project root and add your TMDB API Read Access Token:

```env
VITE_TMDB_API_KEY=your_tmdb_api_read_access_token
```

You can create an API credential in your [TMDB account settings](https://www.themoviedb.org/settings/api). Keep your real `.env` file out of version control. The `.env` file is already listed in `.gitignore`.

### 4. Run the development server

```bash
npm run dev
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create the production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## API attribution

Movie information and images are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/). CineTrack uses the TMDB API but is not endorsed or certified by TMDB.
