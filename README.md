# Loyalty Multi-tenant Database

A multi-tenant loyalty points management system using PostgreSQL, Prisma, and Express.js.

## Database Schema

### Companies Table

Primary table for storing company information.

#### Mandatory Fields:

- `id` (UUID): Primary key
- `companyUID` (String): Unique company identifier
- `name` (String): Company name
- `email` (String): Unique company email
- `phone` (String): Unique company phone number
- `password` (String): Encrypted company password

#### Optional Fields:

- `industry` (String): Company industry
- `website` (String): Company website URL
- `address` (Text): Company address
- `description` (Text): Company description
- `parentCompany` (String): Parent company name
- `adminName` (String): Administrator name
- `jobTitle` (String): Administrator job title
- `primaryColor` (String): Brand primary color (hex)
- `secondaryColor` (String): Brand secondary color (hex)
- `logo` (Text): Company logo URL
- `socialMedia` (String[]): Array of social media links

### Users Table

Stores user information for each company.

#### Mandatory Fields:

- `id` (UUID): Primary key
- `userID` (String): Unique user identifier
- `email` (String): Unique user email
- `companyId` (UUID): Foreign key to companies table

#### Optional Fields:

- `name` (String): User's name
- `phone` (String): User's phone number
- `totalPoints` (Float): Total loyalty points (default: 0)
- `createdAt` (DateTime): Account creation timestamp

### Transactions Table

Records all point transactions.

#### Mandatory Fields:

- `id` (UUID): Primary key
- `transactionID` (String): Unique transaction identifier
- `userId` (UUID): Foreign key to users table
- `points` (Float): Point value (positive for addition, negative for deduction)

#### Optional Fields:

- `dateTime` (DateTime): Transaction timestamp
- `validUntil` (DateTime): Points expiration date
- `available` (Float): Available points balance

## Setup Instructions

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables in `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/loyalty_db?schema=public"
PORT=3000
```

4. Push database schema:

```bash
npx prisma generate
npx prisma db push
```

5. Seed the database:

```bash
npx ts-node prisma/seed.ts
```

6. Start the development server:

```bash
npm run dev
```

## API Endpoints

- `GET /health`: Health check endpoint
- More endpoints to be documented as they are implemented

## Technology Stack

- **Database**: PostgreSQL
- **ORM**: Prisma
- **API**: Express.js
- **Language**: TypeScript
- **Authentication**: bcrypt for password hashing

## Project Structure

```
loyalty-multitenant-db/
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts         # Seed script
├── src/
│   └── server.ts       # Express server setup
├── .env               # Environment variables
├── package.json       # Project dependencies
└── tsconfig.json     # TypeScript configuration
```

## Development

- The server uses `ts-node-dev` for development with hot-reloading
- Database schema changes should be made in `prisma/schema.prisma`
- New changes require running `npx prisma generate` and `npx prisma db push`
