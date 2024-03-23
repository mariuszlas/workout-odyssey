# Workout Odyssey

Check it out [here](https://www.workoutodyssey.com)!

Workout Odyssey helps people stay organized and motivated with their workouts. The app makes it easy to track your progress and see how you're improving over time.

## Features

-   create, edit, and track workouts for 3 different activities: running, walking, cycling
-   view workout progress over time with detailed statistics
-   import workout data directly from TCX files
-   view the workout location on Google maps

## Overview

Workout Odyssey is a full-stack Next.js app. Sequelize is used as ORM to interact with a MySQL database. Chart.js is library of choice used for rendering charts on HTML5 Canvas with great performance. The end-to-end test are automated with Playwright.

## Development

### Prerequisites

-   `git`
-   `nodejs` v20
-   `pnpm`

A `.env.local` file must be placed in the root directory with several environment variables (check the `.env.example` file).

### Installation

1. Run `pnpm i` from the root directory to install all dependencies
2. Run `pnpm dev` to build and start a development server on port `3000`

### Tests

#### Unit Tests

The unit test suit can be run with `pnpm test` (or `pnpm test:watch` to run in watch mode) and the coverage with `pnpm test:coverage`

#### E2E Tests

The the end-to-end tests can be run with `pnpm test:e2e-local` which starts the mock server and runs all the Playwright tests. In case of any failuers, a report can be accessed at `http://localhost:9323/`.
