## Kolay Bul API Project

### API

![image](https://github.com/user-attachments/assets/8e61d52e-4e5c-4a1b-a67d-ef23dddb8c0b)

### DATA MODEL

![image](https://github.com/user-attachments/assets/176ad1bb-4705-4af6-ad05-289b1a38862c)



Video : https://drive.google.com/file/d/1WKSrbfV2PVnXH1wb2EdYOc7BvjxU29yI/view

## **Here is the design, my assumptions, and issues that I encountered**

### **1. Design**
The project is designed as a **NestJS application** to implement a scalable, modular, and maintainable API. Below are the key design considerations:

- **Modular Architecture**:  
  The application is divided into feature modules to maintain separation of concerns. For instance:
  - `AuthModule`: Handles user authentication and authorization using JWT.
  - `ProductModule`: Manages CRUD operations for products.
  - `UserModule`: Manages user-related operations.
  
- **Swagger API Documentation**:  
  Integrated Swagger to provide an interactive API documentation, making it easier for developers to understand and test the endpoints.

- **Database**:  
  Utilized **Prisma ORM** to interact with the database. Prisma was chosen for its type-safety, ease of migrations, and compatibility with NestJS.

- **Validation and Error Handling**:  
  Used `class-validator` and `class-transformer` to ensure data validation at the DTO level. Global error handling is implemented using NestJS's exception filters.

- **Environment Configuration**:  
  Used `@nestjs/config` to manage environment variables, ensuring flexibility for different environments (development, staging, production).

---

### **2. Assumptions**
Here are the assumptions made during the development:

- **Authentication Flow**:  
  The application assumes users will authenticate using JWT tokens, and a secure mechanism for token storage is handled on the frontend.

- **Database Schema**:  
  The database schema is designed to accommodate typical CRUD operations for users and products. It assumes:
  - Each product has a unique identifier.
  - Users can have roles (e.g., admin, user) to restrict access to specific routes.
  
- **Deployment Environment**:  
  Assumes the application will be deployed in a serverless environment like **Vercel**, and build commands are configured accordingly.

- **Request Rates and Scalability**:  
  Assumes a moderate level of concurrent requests; thus, no advanced caching or load-balancing mechanisms were implemented at this stage.

---

### **3. Issues Encountered**
Several challenges were encountered during the development and deployment process:

- **Database Connection**:  
  Initially faced issues with configuring Prisma for serverless environments. This was resolved by using a connection pooling solution compatible with serverless platforms.

- **Vercel Deployment**:  
  Encountered the error `No Output Directory found` during the build process. This was resolved by explicitly setting the output directory in the `vercel.json` configuration file.

- **Swagger Integration**:  
  Configuring Swagger for seamless API documentation took extra time as some routes required custom decorators for better documentation clarity.

- **Dynamic Configuration**:  
  Setting up environment variables in Vercel required careful attention to ensure secrets like `DATABASE_URL` and `JWT_SECRET` were securely stored and correctly referenced.

- **Error Handling and Validation**:  
  Implementing robust error handling while maintaining clean code proved challenging, but global exception filters and DTO validation resolved this issue.


# If  you want to use download this repo for your local please read below and contact with me for .env file 💪🏻👌🏻

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
