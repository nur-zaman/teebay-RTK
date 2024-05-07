## Technical Documentation for Teebay Project

### Part 1: Overview

Teebay is a Next.js application built to facilitate product renting and buying/selling. The application utilizes various technologies, including:

- **Front-end:** React with Next.js framework
    
- **Back-end/API:** Next.js API routes
    
- **Database:** PostgreSQL managed by Prisma ORM
    
- **State Management:** Zustand
    
- **Data Fetching:** React Query
    
- **UI Components:** ShadCn UI and Tailwind CSS

### Part 2: Authentication

Teebay's authentication system is relatively simple, focusing on core functionalities without advanced security measures like hashing and salting.

**Sign-up:**

1. The SignupForm component captures user information (first name, last name, address, email, phone number, password, and confirm password).
    
2. Form validation is handled by zod library, ensuring data integrity and providing user feedback on errors.
    
3. Upon submission, data is sent to the /api/signup API route.
    
4. The API route uses Prisma to create a new user in the database.
    
5. Successful registration redirects the user to the login page.
    

**Login:**

1. The LoginForm component collects user credentials (email and password).
    
2. Validation ensures correct email format and checks for empty password fields.
    
3. On submission, data is sent to the /api/signin API route.
    
4. The API route uses Prisma to find the user by email and compare the provided password with the stored one.
    
5. If credentials are valid, the user's ID is stored in local storage, and the user is redirected to the 'My Products' page.
    
6. Invalid credentials trigger an error message on the login form.


### Part 3: Product Management

Teebay allows users to manage their products through a multi-step form for creation and a separate interface for editing and deleting.

**Product Creation:**

1. The product creation process is divided into five steps using Zustand for state management:
    
    - **Step 1 (ProductTitle):** The user enters the product title with validation for minimum length and maximum character limit.
        
    - **Step 2 (ProductCategories):** Users select one or more categories for the product from a predefined list using a multiple selector component.
        
    - **Step 3 (ProductDescription):** The user provides a detailed description of the product with validation for minimum length.
        
    - **Step 4 (ProductPriceInfo):** Users enter the product's purchase price, rent price, and rental rate (per day, week, month, or year) with validation for minimum values.
        
    - **Step 5 (ProductSummary):** The application displays a summary of the entered information for review.
        
2. Each step utilizes zod for validation and provides feedback through error messages.
    
3. Navigation buttons allow users to move back and forth between steps, editing information as needed.
    
4. Upon confirming the summary, the product data is sent to the /api/add-product API route.
    
5. The API route handles the creation of new categories, if necessary, and associates them with the product.
    
6. Prisma is used to create the product record in the database.
    
7. Successful product creation redirects the user to the 'My Products' page.
    

**Editing Products:**

1. The MyProductsPage displays a list of products belonging to the logged-in user using the ProductList component.
    
2. Each product card allows the user to navigate to the EditProductPage with the product's ID as a query parameter.
    
3. The EditProduct component retrieves the product details based on the provided ID using React Query and displays the information in a form.
    
4. Users can edit the product details, and the form utilizes zod for validation similar to the creation process.
    
5. On submission, the updated product data is sent to the /api/update-product API route.
    
6. The API route updates the product information and its associated categories in the database using Prisma.
    
7. Successful editing redirects the user back to the 'My Products' page.

**Deleting Products:**

1. Each product card on the MyProductsPage includes a delete button.
    
2. Clicking the delete button triggers a confirmation dialog using the ConfirmAlert component.
    
3. Upon confirmation, the handleDelete function sends a request to the /api/delete-product API route with the product ID.
    
4. The API route uses Prisma to delete the corresponding product record from the database.
    
5. React Query refetches the product list to reflect the deletion.

### Part 4: Product Listing and Transactions

Teebay allows users to browse and interact with products through listing and transaction functionalities.

**Product Listing:**

1. The AllProductsPage displays a list of all products from all users using the ProductList component.
    
2. The ProductList component fetches product data based on the provided filters (e.g., user ID, status) using React Query and the /api/get-products API route.
    
3. Each product is presented in a ProductCard component displaying relevant information and allowing users to view more details or perform transactions.
    

**Buying Products:**

1. Each product card on the AllProductsPage includes a "Buy" button.
    
2. Clicking the "Buy" button triggers a confirmation dialog using the ConfirmAlert component.
    
3. Upon confirmation, the handleBuy function sends a request to the /api/buy-product API route with the user ID and product ID.
    
4. The API route uses Prisma to create a purchase record and update the product's status to "SOLD".
    
5. React Query refetches the product list, and the purchased product is no longer displayed as available.
    

**Renting Products:**

1. The ProductDetails component presents a "Rent" button for available products.
    
2. Clicking the "Rent" button opens the ProductRentMenu, which includes a date picker component allowing the user to select the rental start and end dates.
    
3. Upon confirming the rental period, the handleRentProduct function sends a request to the /api/rent-product API route with user ID, product ID, start date, and end date.
    
4. The API route creates a rental record and updates the product's status to "RENTED".
    
5. React Query refetches the product list, and the rented product is no longer available.
    

**Product Status Tracking:**

1. The ProductStatusPage utilizes tabs to display products based on their status and the logged-in user's involvement:
    
    - **Bought:** Lists products purchased by the user, utilizing the ProductList component with a filter for the user ID and "SOLD" status.
        
    - **Sold:** Lists products sold by the user, filtering by the user ID and "SOLD" status, excluding products purchased by the same user.
        
    - **Borrowed:** Lists products rented by the user, filtering by user ID and "RENTED" status.
        
    - **Lent:** Lists products rented out by the user, filtering by user ID and "RENTED" status, excluding products rented by the same user.
        
2. Each tab displays relevant product information and allows users to view more details.
