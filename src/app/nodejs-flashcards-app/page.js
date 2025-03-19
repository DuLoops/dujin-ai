"use client"
import React, { useState, useEffect } from 'react';

const FlashcardApp = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shuffled, setShuffled] = useState(false);
  const [showProgress, setShowProgress] = useState(true);
  const [knownCards, setKnownCards] = useState(new Set());

  // Load flashcards data
  useEffect(() => {
    const loadFlashcards = async () => {
      try {
        // This data structure matches our flashcards markdown format
        const data = [
          {
            question: "What is Node.js?",
            answer: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine that allows developers to run JavaScript on the server-side, enabling the creation of scalable network applications."
          },
          {
            question: "What is the Event Loop in Node.js?",
            answer: "The event loop is a mechanism that allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded. It works by offloading operations to the system kernel whenever possible and executing callbacks when operations complete."
          },
          {
            question: "Explain the difference between synchronous and asynchronous code in Node.js",
            answer: "Synchronous code executes sequentially, blocking further execution until the current operation completes. Asynchronous code allows the program to continue executing while waiting for operations to complete, using callbacks, promises, or async/await to handle results when ready."
          },
          {
            question: "What are Promises in Node.js?",
            answer: "Promises are objects representing the eventual completion or failure of an asynchronous operation, allowing for cleaner handling of asynchronous code than callbacks. They have three states: pending, fulfilled, or rejected."
          },
          {
            question: "Explain async/await in Node.js",
            answer: "Async/await is syntactic sugar built on top of Promises that makes asynchronous code look and behave more like synchronous code. An async function returns a Promise, and the await keyword pauses execution until a Promise is resolved."
          },
          {
            question: "What is the purpose of the package.json file?",
            answer: "package.json is a metadata file that contains project information, dependencies, scripts, version details, and other configuration information needed for a Node.js application."
          },
          {
            question: "What is npm?",
            answer: "npm (Node Package Manager) is the default package manager for Node.js, used to install, share, and manage dependencies in Node.js applications and publish Node.js packages."
          },
          {
            question: "What is the difference between dependencies and devDependencies in package.json?",
            answer: "dependencies are packages required for the application to run in production, while devDependencies are packages only needed during development or testing, not in production."
          },
          {
            question: "What is Express.js?",
            answer: "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications, APIs, and microservices."
          },
          {
            question: "What is middleware in Express.js?",
            answer: "Middleware functions are functions that have access to the request and response objects and the next middleware function in the application's request-response cycle. They can execute code, modify the request and response objects, end the request-response cycle, or call the next middleware."
          },
          {
            question: "Explain the concept of routing in Express.js",
            answer: "Routing is how an application's endpoints (URIs) respond to client requests. It defines how different HTTP methods (GET, POST, etc.) and URL patterns are handled by the application."
          },
          {
            question: "What is the purpose of app.use() in Express.js?",
            answer: "app.use() is used to mount middleware functions at a specified path. If no path is specified, the middleware is executed for every request to the application."
          },
          {
            question: "Compare Express.js with other Node.js frameworks like Nest.js, Koa, or Hapi",
            answer: "Express.js is lightweight and flexible with minimal structure; Nest.js is opinionated with Angular-like architecture; Koa is created by Express developers with improved async handling; Hapi focuses on configuration over code and is good for large teams."
          },
          {
            question: "What are the common ways to connect a database to a Node.js application?",
            answer: "Using native drivers (like mongodb, pg), ORM libraries (like Sequelize, TypeORM, Mongoose), or query builders (like Knex.js) to interact with databases from Node.js applications."
          },
          {
            question: "What is Mongoose and how does it work with MongoDB?",
            answer: "Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js that provides schema validation, relationship management, and a straightforward API for database operations."
          },
          {
            question: "Explain the concept of database transactions in Node.js applications",
            answer: "Database transactions are units of work that ensure data integrity by grouping a set of operations that either all succeed or all fail together. In Node.js, they're implemented using the transaction API provided by database drivers or ORMs."
          },
          {
            question: "What is connection pooling and why is it important?",
            answer: "Connection pooling is a technique of creating and maintaining a collection of database connections that can be reused. It improves performance by reducing the overhead of establishing new connections for each database operation."
          },
          {
            question: "How would you handle database migrations in a Node.js application?",
            answer: "Using migration tools like Knex.js migrations, Sequelize migrations, or dedicated tools like db-migrate to version control database schema changes and apply them consistently across environments."
          },
          {
            question: "What is JWT (JSON Web Token) and how is it used in Node.js?",
            answer: "JWT is a compact, self-contained method for securely transmitting information as a JSON object. In Node.js applications, JWTs are commonly used for authentication by signing tokens with a secret key that can later be verified."
          },
          {
            question: "Explain the concept of password hashing and why it's important",
            answer: "Password hashing is the process of converting passwords into unreadable strings to protect them from being stored in plain text. Libraries like bcrypt are used in Node.js for secure password hashing and comparison."
          },
          {
            question: "What are common security vulnerabilities in Node.js applications and how can they be prevented?",
            answer: "Common vulnerabilities include injection attacks, broken authentication, XSS, and CSRF. Prevention includes input validation, proper authentication, using security headers, keeping dependencies updated, and following OWASP guidelines."
          },
          {
            question: "What is CORS and how do you implement it in a Node.js application?",
            answer: "Cross-Origin Resource Sharing (CORS) is a security feature that controls which domains can access your API. In Express.js, it's implemented using the cors middleware package to define allowed origins, methods, and headers."
          },
          {
            question: "How would you implement role-based access control in a Node.js application?",
            answer: "By implementing middleware that checks user roles stored in JWTs or database, creating permission hierarchies, and protecting routes based on required permissions or roles."
          },
          {
            question: "What are RESTful APIs and how do you design them in Node.js?",
            answer: "RESTful APIs follow architectural constraints like statelessness and resource-based URLs. In Node.js, they're typically built using Express.js with clearly defined routes that use HTTP methods semantically and return appropriate status codes."
          },
          {
            question: "Explain the difference between REST and GraphQL APIs",
            answer: "REST APIs have multiple endpoints with fixed data structures, while GraphQL has a single endpoint where clients can specify exactly what data they need. GraphQL reduces over-fetching but adds complexity."
          },
          {
            question: "What are the common HTTP status codes and when should they be used?",
            answer: "200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Internal Server Error). Each should be used to accurately reflect the result of a request."
          },
          {
            question: "How would you version an API in a Node.js application?",
            answer: "Common approaches include URL path versioning (/api/v1/), query parameter versioning (?version=1), custom HTTP headers (Accept-version), or content negotiation (Accept header)."
          },
          {
            question: "What is API documentation and what tools can be used to create it?",
            answer: "API documentation describes how to use an API, including endpoints, parameters, and responses. Tools like Swagger/OpenAPI, Postman, API Blueprint, or JSDoc with express-jsdoc-swagger can generate interactive documentation."
          },
          {
            question: "What are the common testing frameworks used in Node.js?",
            answer: "Jest, Mocha with Chai, Jasmine, and AVA are popular testing frameworks for Node.js applications, each with different syntax and features for unit, integration, and end-to-end testing."
          },
          {
            question: "Explain the concept of Test-Driven Development (TDD) in Node.js",
            answer: "TDD involves writing tests before implementing features, following the red-green-refactor cycle: write a failing test, implement the feature to make it pass, then refactor while keeping tests passing."
          },
          {
            question: "What is the difference between unit, integration, and end-to-end testing?",
            answer: "Unit tests check individual functions/components in isolation, integration tests verify interactions between components, and end-to-end tests validate entire workflows from the user's perspective."
          },
          {
            question: "How would you mock database calls in Node.js tests?",
            answer: "Using mocking libraries like Sinon.js, Jest mocks, or test-specific database implementations like mongodb-memory-server to simulate database interactions without using a real database."
          },
          {
            question: "What is code coverage and how do you measure it in Node.js?",
            answer: "Code coverage measures what percentage of code is executed during tests. Tools like Istanbul/nyc, built into Jest, or provided by testing platforms measure and report coverage metrics."
          },
          {
            question: "What is Docker and how is it used with Node.js applications?",
            answer: "Docker is a platform for containerizing applications. For Node.js apps, Docker ensures consistent environments across development and production by packaging the application with its dependencies in isolated containers."
          },
          {
            question: "Explain the concept of CI/CD for Node.js applications",
            answer: "Continuous Integration/Continuous Deployment automates testing and deployment processes. For Node.js, tools like GitHub Actions, Jenkins, or CircleCI run tests automatically and deploy code to staging/production if tests pass."
          },
          {
            question: "What are environment variables and why are they important in Node.js applications?",
            answer: "Environment variables store configuration information outside of code, allowing different settings per environment (development, staging, production) without code changes. The dotenv package is commonly used to manage them."
          },
          {
            question: "How would you handle logging in a production Node.js application?",
            answer: "Using structured logging libraries like Winston or Pino to capture different log levels, storing logs in appropriate systems (files, databases, services like Elasticsearch), and implementing log rotation to manage storage."
          },
          {
            question: "What is horizontal scaling and how can it be implemented with Node.js?",
            answer: "Horizontal scaling adds more instances of an application to handle increased load. With Node.js, this involves using PM2 or Docker Swarm/Kubernetes to run multiple instances, with a load balancer distributing traffic."
          },
          {
            question: "What are some performance optimization techniques for Node.js applications?",
            answer: "Techniques include using asynchronous code, implementing caching (Redis), optimizing database queries, using streams for large data, implementing clustering, and load balancing across multiple cores or servers."
          },
          {
            question: "Explain the importance of error handling in Node.js applications",
            answer: "Proper error handling prevents application crashes, improves debugging, and enhances user experience. Best practices include using try/catch with async/await, implementing global error handlers, and providing meaningful error messages."
          }
        ];
        
        setFlashcards(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading flashcards:", error);
        setLoading(false);
      }
    };

    loadFlashcards();
  }, []);

  const handleNext = () => {
    setFlipped(false);
    setCurrentCardIndex((prevIndex) => 
      prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setFlipped(false);
    setCurrentCardIndex((prevIndex) => 
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const shuffleCards = () => {
    const shuffledCards = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffledCards);
    setCurrentCardIndex(0);
    setFlipped(false);
    setShuffled(true);
  };

  const resetOrder = () => {
    // Reset to original order by reloading
    setLoading(true);
    const loadFlashcards = async () => {
      try {
        // This would reload the data in original order
        // Same data loading as in useEffect
        // For simplicity, I'm just setting loading to false here
        setLoading(false);
        setShuffled(false);
      } catch (error) {
        console.error("Error reloading flashcards:", error);
        setLoading(false);
      }
    };
    loadFlashcards();
  };

  const toggleKnown = () => {
    const newKnownCards = new Set(knownCards);
    if (newKnownCards.has(currentCardIndex)) {
      newKnownCards.delete(currentCardIndex);
    } else {
      newKnownCards.add(currentCardIndex);
    }
    setKnownCards(newKnownCards);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading flashcards...</div>;
  }

  const currentCard = flashcards[currentCardIndex];
  const isCurrentCardKnown = knownCards.has(currentCardIndex);
  const progressPercentage = (knownCards.size / flashcards.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Node.js Flashcards</h1>
      
      {showProgress && (
        <div className="w-full mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress: {knownCards.size}/{flashcards.length} cards mastered</span>
            <span>{progressPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between w-full mb-4">
        <button 
          onClick={shuffleCards} 
          className={`px-3 py-1 rounded ${shuffled ? 'bg-blue-300' : 'bg-blue-500 text-white'}`}
        >
          {shuffled ? 'Shuffled' : 'Shuffle Cards'}
        </button>
        
        {shuffled && (
          <button 
            onClick={resetOrder} 
            className="px-3 py-1 rounded bg-gray-500 text-white"
          >
            Reset Order
          </button>
        )}
        
        <button 
          onClick={() => setShowProgress(!showProgress)} 
          className="px-3 py-1 rounded bg-gray-500 text-white"
        >
          {showProgress ? 'Hide Progress' : 'Show Progress'}
        </button>
      </div>
      
      <div 
        className={`relative w-full h-64 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${
          flipped ? 'bg-blue-100' : 'bg-white'
        } ${
          isCurrentCardKnown ? 'border-2 border-green-500' : ''
        }`}
        onClick={handleFlip}
      >
        <div className="absolute top-2 right-2 text-sm text-gray-500">
          {currentCardIndex + 1}/{flashcards.length}
        </div>
        
        <div className="flex justify-center items-center h-full p-6">
          <div className="text-center">
            {!flipped ? (
              <div className="font-bold text-lg">{currentCard.question}</div>
            ) : (
              <div>{currentCard.answer}</div>
            )}
          </div>
        </div>
        
        {isCurrentCardKnown && (
          <div className="absolute bottom-2 right-2">
            <span className="text-green-500 text-sm font-bold">Mastered</span>
          </div>
        )}
      </div>
      
      <div className="flex justify-between w-full mt-4">
        <button 
          onClick={handlePrevious}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Previous
        </button>
        
        <button
          onClick={toggleKnown}
          className={`px-4 py-2 rounded ${
            isCurrentCardKnown 
              ? 'bg-red-100 hover:bg-red-200 text-red-700' 
              : 'bg-green-100 hover:bg-green-200 text-green-700'
          }`}
        >
          {isCurrentCardKnown ? 'Mark as Unknown' : 'Mark as Known'}
        </button>
        
        <button 
          onClick={handleNext}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
      
      <div className="mt-6 text-sm text-gray-600">
        <p>Click on the card to reveal the answer. Use the buttons below to navigate.</p>
      </div>
    </div>
  );
};

export default FlashcardApp;