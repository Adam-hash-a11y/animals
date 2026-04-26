# Persons API

A REST API for managing a list of persons with full CRUD operations, statistics, and filtering by gender and type.

---

## Tech Stack

- Node.js + Express
- TypeScript
- Jest + Supertest
- Validator.js
- Dotenv

---

## Installation

```bash
git clone https://github.com/Adam-hash-a11y/persons-api.git
cd persons-api
npm install
```

## Environment Variables

Create a `.env` file in the root:
PORT=5000

## Run

```bash
npm run dev
```

## Tests

```bash
npm run test
```

---

## Endpoints

### GET /api/persons
Returns all persons. Supports optional query params.
GET /api/persons
GET /api/persons?gender=male
GET /api/persons?type=kid
GET /api/persons?gender=male&type=kid

**Response 200**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "age": 25,
    "gender": "male",
    "type": "men"
  }
]
```

**Error responses**
```json
{ "message": "invalid query params" }
{ "message": "gender must be male or female" }
{ "message": "type must be kid, men or women" }
```

---

### GET /api/persons/stats
Returns count of kids, men and women.
GET /api/persons/stats

**Response 200**
```json
{
  "Number of kids": 2,
  "Number of men": 4,
  "Number of women": 3
}
```

---

### GET /api/persons/:id
Returns a person by id.
GET /api/persons/1

**Response 200**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "age": 25,
    "gender": "male",
    "type": "men"
  }
]
```

**Error responses**
```json
{ "error": "invalid id, the id must a number" }
{ "error": "person is not found" }
```

---

### POST /api/persons/add-person
Adds a new person to the list.
POST /api/persons/add-person

**Request body**
```json
{
  "id": 100,
  "name": "Adam Hamdi",
  "age": 25,
  "gender": "male",
  "type": "men"
}
```

**Response 201**
```json
[...updated list]
```

**Error responses**
```json
{ "message": "invalid or missing fields" }
{ "message": "id must be a positive integer" }
{ "message": "person with this id already exists" }
{ "message": "name must contain only letters and be at least 3 characters" }
{ "message": "age must be a positive integer under 150" }
{ "message": "gender must be male or female" }
{ "message": "type must be kid, men or women" }
```

---

### DELETE /api/persons/:id
Deletes a person by id.
DELETE /api/persons/1

**Response 200**
```json
[...updated list]
```

**Error responses**
```json
{ "message": "invalid id, the id must be a number" }
{ "message": "person not found" }
```

---

## Validation Rules

| Field | Rules |
|---|---|
| id | positive integer, must be unique |
| name | letters only, minimum 3 characters |
| age | positive integer, maximum 150 |
| gender | male or female |
| type | kid, men or women |

---

## Project Structure
src/
api/        → express app setup
controller/ → request/response handling
service/    → business logic
validator/  → input validation
routes/     → route definitions
types/      → TypeScript types and enums
data/       → person data
tests/
api/        → api integration tests
service/    → service unit tests
validator/  → validator unit tests