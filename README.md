# Workout Odyssey

Check it out [here](https://www.workoutodyssey.com)!

Workout Odyssey helps people stay organized and motivated with their workouts. The app makes it easy to track your progress and see how you're improving over time.

![screenshot](https://github.com/user-attachments/assets/fcdbcbed-cc42-459b-9ef2-06deef011491)

## Features

-   create, edit, and track workouts for 3 different activities: running, walking, cycling
-   view workout progress over time with detailed statistics
-   import workout data directly from TCX files
-   view the workout location on Google maps

## Overview

Workout Odyssey is a full-stack Next.js app. Sequelize is used as ORM to interact with a PostgreSQL database (with PostGIS extension). Chart.js is library of choice used for rendering charts on HTML5 Canvas with great performance. The end-to-end test are automated with Playwright.

## Development

### Prerequisites

-   `git`
-   `nodejs` v20
-   `pnpm` (can be enabled in Node js by running `corepack enable`)
-   `docker` and `docker compose` (to run E2E tests)

A `.env.local` file must be placed in the root directory with several environment variables (check the `.env.example` file).

### Installation

1. Run `pnpm i` from the root directory to install all dependencies
2. Run `pnpm dev` to build and start a development server on port `3000`

### Tests

#### Unit Tests

The unit test suit can be run with `pnpm test` (or `pnpm test:watch` to run in watch mode) and the coverage with `pnpm test:coverage`

#### E2E Tests

The the end-to-end tests can be run locally with `pnpm test:e2e` which builds the app, starts the production build on port `3000` and runs all the Playwright tests. In case of any failures, a test report can be accessed at `http://localhost:9323`. The mock server and test database are required to run e2e tests and must be started before the test run with `sh ./scripts/startMock.sh` which will spin up wiremock server running on port `8080` (mocks are located in `mocks/mappings` directory and available mappings can be viewed at `/__admin/mappings`) and a postgis database populated with data from `mocks/dbTestData`. The data base has mock data for 2 users: `bob@test.com` and `alice@test.com` with a common password `Password1`. The containters and their volumes can be removed with `sh ./scripts/testCleanup.sh`.
