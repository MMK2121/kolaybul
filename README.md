## Kolay Bul Microservices Project

### Overview

This project is restructured as a **microservices architecture** to enhance scalability, modularity, and maintainability. Each feature is developed as an independent service with its own responsibilities. Below are the updated services and architecture details:

---
video: https://drive.google.com/file/d/1dVgEe-SKsRfSAkdF6P6jY_Z37L_m-j9E/view?usp=drive_link
### Microservices

#### 1. **Auth Service**

- **Responsibilities**:
  - Handles user authentication and authorization.
  - Provides JWT-based authentication.
  - Manages user roles and permissions.
- **Endpoints**:
  - `POST /auth/signin`: Authenticates users and provides a JWT token.
  - `POST /auth/signup`: Registers a new user.
- **Communication**:
  - Listens on a dedicated TCP port for inter-service communication.

#### 2. **User Service**

- **Responsibilities**:
  - Manages user-related operation for retrieval.
  - Stores user data securely.
- **Endpoints**:
  - `GET /user/:id`: Retrieves user details by ID.
- **Communication**:
  - Listens for API Gateway requests and communicates with Auth Service for secure access.

#### 3. **Listing Service**

- **Responsibilities**:
  - Manages create and get operations for product listings.
  - Provides search functionality for products.
- **Endpoints**:
  - `POST /listings`: Creates a new product listing.
  - `GET /listings`: Retrieves all product listings.
  - `GET /listings/:id`: Retrieves a specific product listing by ID.
- **Communication**:
  - Handles inter-service queries from API Gateway.

#### 4. **Review Service**

- **Responsibilities**:
  - Manages reviews for booking.
  - Ensures that only authenticated users can leave reviews.
- **Endpoints**:
  - `POST /reviews`: Creates a new review.
  - `GET /reviews/`: Retrieves all reviews.
- **Communication**:
  - Collaborates with Auth Service for user verification.

#### 5. **Booking Service**

- **Responsibilities**:
  - Handles bookings for listed products.
- **Endpoints**:
  - `POST /bookings`: Creates a new booking.
  - `GET /bookings/:id`: Retrieves booking details.
- **Communication**:
  - Communicates with Product Listing Service to verify availability.

#### 6. **API Gateway**

- **Responsibilities**:
  - Serves as a single entry point for external clients.
  - Routes requests to the appropriate microservices.
  - Implements authentication.
- **Features**:
  - Consolidates responses from multiple services.

---

### Architecture Design

- **Communication Protocol**:

  - Inter-service communication uses TCP with NestJS’s microservice framework.
  - API Gateway uses HTTP/REST to communicate with external clients.

- **Database**:

  - Prisma ORM is used for database interactions across services.

- **Authentication**:

  - Auth Service issues JWT tokens.
  - Other services validate the tokens via the Auth Service.

- **Environment Configuration**:

  - Managed with `@nestjs/config`.
  - Secrets such as `JWT_SECRET` and `DATABASE_URL` are securely stored in environment variables.

---

### Assumptions

- Each microservice is deployed independently.
- Communication between services is secure and uses token-based authentication.
- The project is expected to handle moderate traffic; advanced load balancing or caching can be added later.

---

### Issues Encountered

#### **1. Inter-service Communication**

- Initial difficulties with TCP-based communication between services were resolved by correctly configuring hostnames and ports in Docker Compose.

---

#### **2. Docker Microservices Port Communication**

- I talked about this in the video. I faced this issue two days in a row. The build correctly runs and services are running but I had a deadline so I never came up with a solution about microservices ports error. I planned in the finals this microservices ports are runs correctly no matter what 😎 But the api gateway runs no matter what.

---

### Project Setup

#### 1. Clone the Repository

```bash
$ git clone <repository-url>
```

#### 2. Install Dependencies

```bash
$ npm install
```

#### 3. Setup Environment Variables

Contact the project maintainer to get the `.env` files for each microservice.

#### 4. Start the Services

Using Docker Compose:

```bash
## This just deploy for Api gateway. Like I mentioned and applied in the video.

$ docker-compose up --build
```

Start individually:

```bash
# Auth Service
$ nest start start:auth --watch

# User Service
$ nest start start:user --watch

# Product Listing Service
$ nest start start:listing --watch

# Review Service
$ nest start start:review --watch

# Booking Service
$ nest start start:booking --watch

# API Gateway
$ nest start --watch
```
