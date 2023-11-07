## Documentation

### Requirements

- Node.js >= 16
- pnpm 8

### Directory Structure

- [`.github`](.github) — GitHub configuration including the CI workflow.<br>
- [`.husky`](.husky) — Husky configuration and hooks.<br>
- [`public`](./public) — Static assets such as robots.txt, images, and favicon.<br>
- [`src`](./src) — Application source code, including pages, components, styles.
  - [`app`](./src/app) — Application pages and API Routes.
    - [`(private)`](<./src/app/(private)>) — Directory for pages accessible only to authenticated users.
      - [`create-order`](<./src/app/(private)/create-order>) — Directory for the order creation page.
      - [`orders`](<./src/app/(private)/orders>) — Directory for the order listing page.
        - [`[id]`](<./src/app/(private)/orders/[id]>) — Directory for Order details/edit Page.
    - [`(public)`](<./src/app/(public)>) — Directory for pages accessible to all users.
      - [`sign-in`](./src/app/sign-in) — Directory for the login page.
      - [`sign-up`](./src/app/sign-up) — Directory for the registration page.
    - [`actions.ts`](./src/app/actions.ts) — Archive for global application actions.
    - [`api`](./src/app/api) — Directory for API routes.
      - [`customer`](./src/app/api/customer/) — Directory for Customer API routes.
      - [`order`](./src/app/api/order/) — Directory for Order API Routes.
        - [`[id]`](./src/app/api/order/[id]/) — Directory for the Order API GET, PATH, and DELETE routes.
      - [`layout.tsx`](./src/app/api/order/[id]/) — Application global Layout component.
  - [`components`](./src/components/) — Directory for reusable components.
    - [`__tests__`](./src/components/__tests__/) — Directory for component testing.
  - [`context`](./src/context/) — Authentication context directory.
  - [`domain`](./src/domain/)
    - [`repositories`](./src/domain/repositories/) — Authentication context directory.
      - [`customers`](./src/domain/repositories/customers/) — Directory for the Customer repository with its Interface and Implementation using Prisma.
      - [`orders`](./src/domain/repositories/orders/) — Directory for the Order repository with its Interface and Implementation using Prisma.
    - [`useCases`](./src/domain/useCases/) — Directory for Use Cases.
      - [`customers`](./src/domain/useCases/customers) — Directory for Customer Use Cases.
        - [`__tests__`](./src/domain/useCases/customers/__tests__/) — Directory for testing the Customer use case.
      - [`orders`](./src/domain/useCases/orders/) — Directory for Order Use Cases.
        - [`__tests__`](./src/domain/useCases/orders/__tests__/) — Directory for testing the Order use case.
  - [`middleware.ts`](./src/middleware.ts) — Middleware responsible for controlling access to routes.
  - [`services`](./src/services/) — Directory for the application services.
  - [`styles`](./src/styles/) — Directory for the application global styles.

### Scripts

- `pnpm dev` — Starts the application in development mode at `http://localhost:3000`.
- `pnpm build` — Creates an optimized production build of your application.
- `pnpm start` — Starts the application in production mode.
- `pnpm type-check` — Validate code using TypeScript compiler.
- `pnpm lint` — Runs ESLint for all files in the `src` directory.
- `pnpm format` — Runs Prettier for all files in the `src` directory.
- `pnpm test` — Runs test for all test files in the `src` directory.
- `pnpm test:watch` — Runs test for all test files in the `src` directory waiting for updates.
- `pnpm test:coverage` — Runs test for all test files in the `src` generating coverage reports.

### Path Mapping

TypeScript are pre-configured with custom path mappings. To import components or files, use the `@` prefix.

```tsx
import { Button } from '@/components/Button';

// To import images or other files from the public folder
import avatar from '@/public/avatar.png';
```

### Switch to Yarn/npm

This starter uses pnpm by default, but this choice is yours. If you'd like to switch to Yarn/npm, delete the `pnpm-lock.yaml` file, install the dependencies with Yarn/npm, change the CI workflow, and Husky Git hooks to use Yarn/npm commands.

## Configuration

#### Variáveis de Ambiente

This project uses Prisma to interact with the database. To set up Prisma, you need to set the environment variable `DATABASE_URL`.

Create a `.env` file at the root of the project and add the following line:

```ts
DATABASE_URL = 'postgresql://user:password@localhost:5432/mydb?schema=public';
```

Replace `user`, `password`, `localhost`, `5432`, `mydb` and `public` by the details of your database.

### Clone the Project

After you configure the environment variable, you can run the project with the following commands:

```shell
# With Git installed, run in the terminal
git clone git@github.com:vagnereix/challenge-bmw-vipers.git

# Enter the cloned directory
cd challenge-bmw-vipers

```

### Running the Project

```shell
# Install dependencies
pnpm install

# Run Prisma migrations
pnpm prisma migrate dev

# Run the project
pnpm run dev
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more information.
