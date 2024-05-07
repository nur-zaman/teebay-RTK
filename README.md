## Teebay: Rent and Buy/Sell Products with Ease

Teebay is a web application built with Next.js that allows users to rent and buy/sell products within various categories.

### Features

- **User Authentication:**
    
    - Sign up and create a new account.
        
    - Log in with existing credentials.
        
- **Product Management:**
    
    - Create products using a multi-step form with intuitive navigation.
        
    - Edit existing product details and categories.
        
    - Delete products you no longer wish to list.
        
- **Product Browsing and Transactions:**
    
    - View a comprehensive list of all available products from all users.
        
    - Buy products directly with a simple confirmation process.
        
    - Rent products by selecting desired rental start and end dates.
        
- **Product Status Tracking:**
    
    - Keep track of your buying, selling, borrowing, and lending activities through dedicated tabs.
        
    - View detailed information about each transaction.
        

### Technologies Used

- **Front-end:** React with Next.js
    
- **Back-end/API:** Next.js API routes and ExpressJs
    
- **Database:** Vercel Postgres ([https://vercel.com/storage/postgres](https://vercel.com/storage/postgres)) managed by Prisma ORM
    
- **State Management:** Zustand
    
- **Data Fetching:** React Query
    
- **UI Components:** ShadCn UI and Tailwind CSS
    

### Installation and Running

**Prerequisites:**

- Node.js and npm (or yarn) installed
    
- Vercel CLI: `npm install -g vercel@latest`
    

**Setup:**

1. Clone the repository: `git clone https://github.com/nur-zaman/teebay.git`
    
2. Install dependencies: `npm install`
    
3. Create and connect a Vercel Postgres database:
        
    - Create a database named teebay_db (or any name you prefer).
    - Connect the project with the db via `vercel link`
    - Use the Vercel CLI to pull down the environment variables for your local project: `vercel env pull .env`
        
4. Run the development server: npm run dev
    
5. Access the application in your browser at [http://localhost:3000](http://localhost:3000/)
    

**Optional:** Start the Backend Server (Expressjs)

If you want it to connect to the express backend server, you need to set the environment variables in the.env file.
```
BACKEND="express"
PORT=<any_available_port>
```

Open another terminal and run `npm run express-server`


### Documentation
For detailed technical documentation, please refer to [teebay.md](docs/teebay.md).

### Deployment

Teebay is deployed on Vercel at [https://teebay-olive.vercel.app](https://teebay-olive.vercel.app/).