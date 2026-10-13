
# Node Repo — User API

A lightweight REST API built with **Node.js** and **Express.js**. This project demonstrates the fundamentals of backend development, including HTTP request handling, Express routing, controller-based architecture, JSON request processing, and creating user-related API endpoints.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [How the Application Works](#how-the-application-works)
- [Request and Response Examples](#request-and-response-examples)
- [Environment Configuration](#environment-configuration)
- [Error Handling and Validation](#error-handling-and-validation)
- [Security Considerations](#security-considerations)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Overview

Node Repo is a backend development project that uses Express.js to create a simple HTTP server and expose user-related routes.

The application has a modular structure that separates the main server configuration, route definitions, and request-handling logic into different files. This separation provides a foundation for building more maintainable and scalable Node.js applications.

The current implementation includes:

- A root endpoint that confirms the server is running.
- A user homepage endpoint.
- An about endpoint.
- A user creation endpoint that accepts JSON data and returns a response.

The project is intended as a starting point for learning how to structure and develop backend applications with Node.js and Express.

**Current implementation status:** The API demonstrates basic request handling. Database persistence, authentication, password hashing, comprehensive validation, and automated tests have not yet been implemented.

## Features

### 1. Express server

The application uses Express.js to create an HTTP server and define endpoints for incoming requests.

### 2. JSON request processing

Express's built-in JSON middleware is configured to parse JSON request bodies, allowing the application to access submitted data through `req.body`.

### 3. Modular routing

User-related endpoints are grouped in a dedicated router rather than being defined entirely in the main application file.

### 4. Controller-based request handling

Controller functions handle the logic associated with individual routes. This separates request processing from route configuration.

### 5. User creation response

The user creation handler accepts `username`, `email`, and `password` fields and returns a JSON response with HTTP status `201 Created`.

> The current user creation handler does not persist users to a database. Its success response indicates that a response was generated, not that a user account has been securely stored.

## Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime for the backend |
| Express.js 5 | HTTP server and routing framework |
| JavaScript ES modules | Modular imports and exports |
| npm | Dependency management and project scripts |
| JSON | Request and response data format |

### Dependencies

The project currently declares the following runtime dependency:

- **Express (`^5.2.1`)** — provides the application framework, routing, middleware support, and HTTP response utilities.

The dependency versions are defined in `package.json` and resolved through `package-lock.json`.

## Project Structure

The repository currently follows this structure:

```text
node-repo/
├── src/
│   ├── index.js
│   ├── routes/
│   │   └── userroutes.js
│   └── controllers/
│       └── usercontrollers.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

### Directory and file descriptions

#### `src/index.js`

The application entry point. It:

- Imports Express and the user router.
- Creates the Express application.
- Configures JSON middleware.
- Defines the root endpoint (`GET /`).
- Mounts the user router under `/users`.
- Starts the server on port `3000`.

#### `src/routes/userroutes.js`

Defines the user-related routes using Express's `Router()` function.

The router connects HTTP methods and paths to their corresponding controller functions.

#### `src/controllers/usercontrollers.js`

Contains the request-handling functions:

- `gethome` — returns a simple homepage message.
- `getAbout` — returns a simple about message.
- `postuser` — reads submitted user fields and returns a JSON response.

#### `package.json`

Contains the project metadata, module configuration, dependencies, and npm scripts.

#### `package-lock.json`

Records the resolved dependency tree to help ensure consistent dependency installations.

#### `.gitignore`

Specifies files and directories that Git should exclude from version control.

## Prerequisites

Before running the project, ensure you have installed:

- **Node.js:** A supported Node.js release compatible with Express 5.
- **npm:** Normally installed alongside Node.js.
- **Git:** Required to clone the repository.
- **An API client:** Optional, but useful for testing endpoints. Examples include Postman, Insomnia, and `curl`.

Verify your installations:

```bash
node --version
npm --version
git --version
```

## Getting Started

### 1. Clone the repository

Open your terminal and run:

```bash
git clone https://github.com/Ayokunle9x/node-repo.git
```

### 2. Navigate to the project directory

```bash
cd node-repo
```

### 3. Install dependencies

```bash
npm install
```

This installs the dependencies declared in `package.json`, including Express.

### 4. Check the application configuration

Before starting the server, verify that the development script points to the actual entry point and that local ES module imports include their file extensions.

The current `package.json` specifies `src/index.js` as the main entry point, but its development script references `index.js` at the repository root. The current router also imports its controller without a `.js` extension.

These inconsistencies should be corrected before relying on the documented startup commands.

## Running the Application

### Recommended development script

Update the `dev` script in `package.json` to point to the source entry point:

```json
{
  "scripts": {
    "dev": "node --watch src/index.js"
  }
}
```

Keep the existing package metadata and dependency configuration when applying this change.

Also update the controller import in `src/routes/userroutes.js`:

```javascript
import {
  gethome,
  getAbout,
  postuser
} from "../controllers/usercontrollers.js";
```

Once these corrections have been made, start the application using:

```bash
npm run dev
```

The terminal should display:

```text
server running on port 3000
```

The `--watch` option restarts the Node.js process when watched files change.

### Alternative: start the server directly

After correcting the import path, you can start the application without the watch mode:

```bash
node src/index.js
```

### Verify the server

Open the following URL in your browser or send a request using an API client:

```text
http://localhost:3000/
```

Expected response:

```text
homepage!, server is active
```

This confirms that the root route is responding.

## API Documentation

The application exposes a root endpoint and a router mounted at `/users`.

The table below describes the effective paths based on the current route configuration.

**Base URL**

```text
http://localhost:3000
```

### Endpoint summary

| Method | Endpoint | Purpose | Expected status |
|---|---|---|---|
| GET | `/` | Root server health-style message | `200 OK` |
| GET | `/users` | User router homepage | `200 OK` |
| GET | `/users/about` | About endpoint | `200 OK` |
| POST | `/users/users` | Returns submitted user fields | `201 Created` |

**Routing note:** The current creation route is registered as `/users` inside a router already mounted at `/users`. Therefore, its effective path is `/users/users`, not `/users`. If the intended endpoint is `POST /users`, change the route definition to `router.post("/", postuser)`.

### 1. Root endpoint

**Method:** `GET`

**Path:** `/`

**Full URL:**

```text
http://localhost:3000/
```

**Description:** Returns a plain-text message confirming that the root endpoint is responding.

**Example request:**

```bash
curl http://localhost:3000/
```

**Expected response:**

```text
homepage!, server is active
```

**Response content type:** Plain text.

### 2. User homepage

**Method:** `GET`

**Path:** `/users`

**Full URL:**

```text
http://localhost:3000/users
```

**Description:** Invokes the `gethome` controller through the user router.

**Example request:**

```bash
curl http://localhost:3000/users
```

**Expected response:**

```text
hompage!
```

The spelling above reflects the current controller response.

**Response content type:** Plain text.

### 3. About endpoint

**Method:** `GET`

**Path:** `/users/about`

**Full URL:**

```text
http://localhost:3000/users/about
```

**Description:** Invokes the `getAbout` controller and returns a simple text response.

**Example request:**

```bash
curl http://localhost:3000/users/about
```

**Expected response:**

```text
about!
```

**Response content type:** Plain text.

### 4. User creation endpoint

**Method:** `POST`

**Current path:** `/users/users`

**Full URL:**

```text
http://localhost:3000/users/users
```

**Description:** Accepts a JSON payload containing `username`, `email`, and `password`, then returns those fields inside a JSON response.

**Request content type:**

```http
Content-Type: application/json
```

**Example request:**

```bash
curl -X POST http://localhost:3000/users/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "example-password"
  }'
```

**Expected response status:**

```http
HTTP/1.1 201 Created
```

**Response body:**

```json
{
  "data": {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "example-password"
  },
  "message": "user created successfully"
}
```

Use only fictitious credentials when testing this endpoint. The response format above reflects the current implementation and is not a recommendation to return passwords from a production API.

### Recommended API design

For a more conventional REST API, the intended user creation endpoint would normally be:

```http
POST /users
```

To achieve this, change the router definition to:

```javascript
router.get("/", gethome);
router.get("/about", getAbout);
router.post("/", postuser);
```

Because the router is mounted at `/users`, the final paths become `/users`, `/users/about`, and `POST /users`.

## How the Application Works

The application follows a straightforward request-processing flow.

### Step 1: Application initialization

`src/index.js` imports Express and the user router, creates the Express application, and configures middleware.

```javascript
import express from "express";
import userRoutes from "./routes/userroutes.js";

const app = express();

app.use(express.json());
```

The JSON middleware parses incoming requests with JSON bodies so that controllers can access the parsed data through `req.body`.

### Step 2: Route registration

The application registers the root endpoint and mounts the user router.

```javascript
app.get("/", (req, res) => {
  res.send("homepage!, server is active");
});

app.use("/users", userRoutes);
```

The router mount adds `/users` as a prefix to paths defined in the router.

### Step 3: Request dispatch

When an incoming request matches a registered route, Express invokes the corresponding controller.

For example, a request to `GET /users/about` invokes `getAbout`.

### Step 4: Controller execution

The controller performs the operation defined for the route and sends an HTTP response.

```javascript
export const getAbout = (req, res) => {
  res.send("about!");
};
```

For the creation endpoint, the controller reads the submitted fields:

```javascript
const { username, email, password } = req.body;
```

It then constructs a JSON response containing those values and a message.

### Step 5: HTTP response

Express sends the response to the client. Successful `GET` requests normally receive `200 OK`, while the creation handler explicitly sets `201 Created`.

At present, the request-processing flow ends with the response. No database operation takes place.

## Request and Response Examples

### Testing with Postman

To test the API with Postman:

1. Start the server.
2. Create a new HTTP request.
3. Enter the endpoint URL.
4. Select the HTTP method.
5. For the user creation request, select **Body → raw → JSON**.
6. Enter a JSON payload.
7. Send the request and inspect the status code and response body.

Example JSON body:

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "example-password"
}
```

For the current implementation, send this to `POST /users/users`. After correcting the route to use `router.post("/", postuser)`, send it to `POST /users`.

### Testing with curl

Test the root endpoint:

```bash
curl -i http://localhost:3000/
```

Test the user homepage:

```bash
curl -i http://localhost:3000/users
```

Test the about endpoint:

```bash
curl -i http://localhost:3000/users/about
```

Test user creation:

```bash
curl -i -X POST http://localhost:3000/users/users \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","email":"john@example.com","password":"example-password"}'
```

The `-i` flag displays the HTTP response headers as well as the response body.

## Environment Configuration

The application currently uses port `3000` directly in its server entry point.

No environment variables are required by the existing code.

For improved configurability, consider reading the port from `process.env.PORT`, with `3000` as the default:

```javascript
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
```

This allows the application to use a platform-provided port when deployed.

If environment variables are introduced later, document them in an `.env.example` file and avoid committing secrets or production credentials to version control.

## Error Handling and Validation

The current implementation does not define dedicated error-handling middleware or comprehensive request validation.

Before using the API in a production environment, consider implementing the following:

- Validate that `username`, `email`, and `password` are present.
- Reject malformed or invalid email addresses.
- Enforce suitable password requirements.
- Return consistent error response objects.
- Handle malformed JSON requests and unexpected server errors.
- Add a not-found handler for unregistered routes.
- Prevent duplicate user registrations once persistent storage is introduced.

A typical validation error response could follow this structure:

```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "A valid email address is required"
    }
  ]
}
```

This is an illustrative response format, not behavior currently implemented by the repository.

## Security Considerations

The current code is a learning-oriented implementation and should not be treated as a production-ready account management system.

### Password handling

The user creation controller currently includes the submitted password in its response. This can expose credentials in client responses, logs, monitoring systems, or other places where response bodies are recorded.

A production implementation should:

- Never return plaintext passwords.
- Hash passwords using a suitable password-hashing algorithm, such as Argon2id or bcrypt.
- Avoid logging sensitive credentials.
- Validate request data before processing it.

### Database persistence

User information is not currently stored in a database. A future implementation should use a database and enforce appropriate uniqueness constraints for fields such as email addresses.

### Authentication and authorization

The application does not currently implement authentication, sessions, tokens, or access-control rules. These features should be added before protected user resources are exposed.

### Additional production safeguards

Depending on the deployment environment, consider HTTPS, security headers, rate limiting, CORS configuration, request-size limits, and structured error handling.

## Known Limitations

The following limitations are based on the repository's current code.

| Area | Current status |
|---|---|
| Server and routing | Basic Express server and routes are defined |
| Development command | References `index.js` at the root instead of `src/index.js` |
| ES module imports | Controller import is missing the `.js` extension |
| User creation route | Currently resolves to `POST /users/users` |
| Database | Not implemented |
| Password security | Password is returned in the response |
| Input validation | Not implemented |
| Authentication | Not implemented |
| Automated tests | No test suite is configured |
| Error handling | No dedicated error-handling middleware |
| Configuration | Server port is hardcoded to `3000` |

The development script currently defined in `package.json` is `node --watch index.js`, while the declared application entry point is `src/index.js`. The import and route corrections described earlier should be applied before treating the setup instructions as verified.

## Future Improvements

The project can be extended into a more complete backend service through the following improvements.

### 1. Database integration

Introduce a database such as PostgreSQL or MongoDB to store and retrieve user records persistently.

### 2. Request validation

Add a validation library or dedicated validation middleware to validate user input before it reaches the controller.

### 3. Secure password management

Hash passwords before storage and ensure that credentials are never returned in API responses.

### 4. Authentication

Implement a suitable authentication mechanism, such as secure sessions or token-based authentication, based on the application's requirements.

### 5. CRUD operations

Expand the API to support the standard user-management operations:

- **Create:** Register a user.
- **Read:** Retrieve one or more users.
- **Update:** Modify an existing user's details.
- **Delete:** Remove a user record.

These operations should include appropriate validation and authorization.

### 6. Automated testing

Replace the placeholder test script with automated tests for routes, controllers, validation, and error handling. A test framework such as Vitest or Jest, together with an HTTP testing library, can support this work.

### 7. API documentation

Introduce an OpenAPI specification and Swagger UI so developers can explore endpoints, request schemas, and response formats.

### 8. Deployment and monitoring

Add environment-based configuration, health checks, structured logging, and an automated deployment workflow.

## Contributing

Contributions that improve the project's functionality, documentation, reliability, or security are welcome.

To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the affected functionality.
5. Commit your changes with a descriptive commit message.
6. Open a pull request describing the changes.

Example commands:

```bash
git checkout -b feature/your-feature
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
```

Please keep changes focused and document any new endpoints, dependencies, or configuration requirements.

## License

The `package.json` currently specifies the **ISC License**. Confirm that a corresponding `LICENSE` file exists in the repository and that its terms reflect the intended licensing of the project before distributing it.

## Author

**Ayokunle9x**

- GitHub: [@Ayokunle9x](https://github.com/Ayokunle9x)
- Repository: [node-repo](https://github.com/Ayokunle9x/node-repo)

## Acknowledgements

This project uses Node.js and Express.js to demonstrate fundamental backend development concepts, including HTTP routing, middleware, controllers, and JSON responses.

---

**Note:** This documentation describes the current repository and identifies recommended corrections separately. Features listed under future improvements are proposals and should not be considered implemented functionality.
