# Agent Instructions for Todo App

This is a React + TypeScript + Vite project that uses **Bun** as the package manager and runtime.

## Package Manager

This project uses **Bun**, not npm or yarn. Always use `bun` commands.

## Project Setup

### Install Dependencies

```bash
bun install
```

This will install all dependencies listed in `package.json` and respect the `bun.lock` lockfile.

## Development Commands

### Start Development Server

```bash
bun run dev
```

This starts the Vite development server. The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

**Important**: This is a long-running command. Do NOT execute this in automated workflows or CI environments. It blocks the terminal and is meant for local development only.

### Build for Production

```bash
bun run build
```

This command:
1. Runs TypeScript compiler (`tsc -b`) to check types
2. Builds the project with Vite
3. Outputs to the `dist/` directory

Always run this before creating a pull request to ensure the code builds successfully.

### Lint Code

```bash
bun run lint
```

Runs ESLint on the codebase. The project uses:
- ESLint 9.x
- TypeScript ESLint
- React Hooks plugin
- React Refresh plugin

### Preview Production Build

```bash
bun run preview
```

Serves the production build from `dist/` directory locally for testing. Must run `bun run build` first.

**Important**: This is a long-running command. Do NOT execute this in automated workflows.

## Testing

Currently, this project does not have a test suite configured. There is no `test` script in `package.json`.

## Technology Stack

- **Framework**: React 19.x
- **Language**: TypeScript 5.9.x
- **Build Tool**: Vite 7.x
- **Styling**: Tailwind CSS 4.x
- **UI Components**: shadcn/ui with Base UI
- **Package Manager**: Bun
- **Linting**: ESLint 9.x

## Project Structure

```
.
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components
│   │   └── ...
│   ├── lib/            # Utility functions
│   ├── assets/         # Static assets
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles with theme variables
├── public/             # Public static files
├── index.html          # HTML template
└── package.json        # Dependencies and scripts
```

## Theme System

The app uses a CSS variable-based theme system defined in `src/index.css`:
- Dark mode is activated by adding the `dark` class to the `<html>` element
- Theme variables are defined for both light (`:root`) and dark (`.dark`) modes
- Uses oklch color space for modern color definitions

## Common Workflows for Agents

### Before Making Changes
1. Read relevant files to understand the codebase
2. Check `package.json` for available scripts and dependencies

### After Making Changes
1. Run `bun run build` to verify the code compiles and builds
2. Run `bun run lint` to check for linting errors (note: some pre-existing errors may exist)
3. Commit changes with descriptive commit messages
4. Push to a feature branch
5. Create a pull request

### Important Notes for Agents
- **Never run long-running commands** like `bun run dev` or `bun run preview` in automated workflows
- **Always use `bun`** instead of `npm` or `yarn`
- The project uses **bun.lock** - this file should be committed when dependencies change
- Some linting errors may be pre-existing in UI component files - focus on not introducing new errors
- TypeScript strict mode is enabled - ensure type safety
