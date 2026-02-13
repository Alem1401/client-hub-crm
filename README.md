# Client Hub CRM 🏢

A comprehensive Customer Relationship Management (CRM) system designed specifically for insurance agents to manage clients, policies, and analytics efficiently.

## 📋 Overview

Client Hub CRM is a full-stack web application that enables insurance agents to:
- Manage client information and relationships
- Handle insurance policies (Car and Property insurance)
- Track policy lifecycle and renewals
- Visualize business analytics and revenue metrics
- Monitor client engagement and policy statistics

## 🏗️ Technology Stack

### Backend
- **Framework**: ASP.NET Core 8.0
- **Database**: SQL Server with Entity Framework Core
- **API**: RESTful API with Swagger/OpenAPI documentation
- **Authentication**: Password hashing with salt

### Frontend
- **Framework**: Angular 20
- **UI Components**: Angular Material
- **Charts**: Chart.js with ng2-charts
- **Styling**: CSS with Angular Material theming

## 🚀 Getting Started

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18 or higher)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (Express or higher)
- [Angular CLI](https://angular.io/cli) (v20 or higher)

### Backend Setup

1. **Navigate to the Backend directory:**
   ```bash
   cd Backend/ClientHub
   ```

2. **Configure the database connection:**
   Update the connection string in `appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=ClientHubDB;Trusted_Connection=true;TrustServerCertificate=true;"
     }
   }
   ```

3. **Apply database migrations:**
   ```bash
   cd ClientHub
   dotnet ef database update
   ```

4. **Run the backend server:**
   ```bash
   dotnet run
   ```

   The API will be available at `https://localhost:7000` (or the port shown in the console).

5. **Access Swagger documentation:**
   Navigate to `https://localhost:7000/swagger` to view and test the API endpoints.

### Frontend Setup

1. **Navigate to the Frontend directory:**
   ```bash
   cd Frontend/ClientHub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

   The application will be available at `http://localhost:4200`.

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📦 Features

### Client Management
- **Add/Edit/Delete Clients**: Comprehensive client information including personal details, contact information, and address
- **Client Status Tracking**: Monitor client status (Active, Inactive, etc.)
- **Agent Assignment**: Assign clients to specific insurance agents
- **Notes & Last Contact**: Track interactions and important client notes

### Insurance Policy Management
- **Car Insurance Policies**:
  - Vehicle details (chassis number, registration plate, production year)
  - Vehicle specifications (power, engine capacity, color, type)
  - Policy terms (start date, end date, policy number)
  - Financial details (total amount, discount, surcharge, bonus)

- **Property Insurance Policies**:
  - Property location (address, city)
  - Property details (square meters, covered risks)
  - Policy terms and financial information

### Analytics Dashboard
- **Revenue Analytics**: Track revenue over time
- **Client Count Trends**: Monitor client acquisition and retention
- **Policy Statistics**:
  - Total policies count
  - New policies this month
  - Expired policies count
  - Average policy value
- **Policy Type Distribution**: Car vs Property insurance breakdown

### Agent Features
- **Agent Registration & Login**: Secure authentication system
- **Dashboard**: Personalized dashboard with key metrics
- **Client Portfolio**: View and manage assigned clients
- **Policy Overview**: Track all policies under management

## 🔌 API Endpoints

### Agents
- `POST /api/Agent/register` - Register a new agent
- `POST /api/Agent/login` - Agent login
- `GET /api/Agent/{id}` - Get agent details

### Clients
- `GET /api/Client` - Get all clients
- `GET /api/Client/{id}` - Get client by ID
- `GET /api/Client/agent/{agentId}` - Get clients by agent
- `POST /api/Client` - Create new client
- `PUT /api/Client/{id}` - Update client
- `DELETE /api/Client/{id}` - Delete client

### Car Insurance
- `GET /api/CarInsurance` - Get all car insurance policies
- `GET /api/CarInsurance/{id}` - Get car insurance by ID
- `GET /api/CarInsurance/agent/{agentId}` - Get car insurances by agent
- `POST /api/CarInsurance` - Create new car insurance
- `PUT /api/CarInsurance/{id}` - Update car insurance
- `DELETE /api/CarInsurance/{id}` - Delete car insurance

### Property Insurance
- `GET /api/PropertyInsurance` - Get all property insurance policies
- `GET /api/PropertyInsurance/{id}` - Get property insurance by ID
- `GET /api/PropertyInsurance/agent/{agentId}` - Get property insurances by agent
- `POST /api/PropertyInsurance` - Create new property insurance
- `PUT /api/PropertyInsurance/{id}` - Update property insurance
- `DELETE /api/PropertyInsurance/{id}` - Delete property insurance

### Analytics
- `GET /api/Analytics/revenue/{agentId}` - Get revenue analytics
- `GET /api/Analytics/client-count/{agentId}` - Get client count analytics
- `GET /api/Analytics/count/car/{agentId}` - Get car insurance count
- `GET /api/Analytics/count/property/{agentId}` - Get property insurance count
- `GET /api/Analytics/total-policies/{agentId}` - Get total policies count
- `GET /api/Analytics/new-this-month/{agentId}` - Get new policies this month
- `GET /api/Analytics/expired/{agentId}` - Get expired policies count
- `GET /api/Analytics/avg-policy-value/{agentId}` - Get average policy value

## 🗄️ Database Schema

### Key Entities

- **Agent**: Insurance agent information with authentication
- **Client**: Client personal and contact information
- **Insurance** (Abstract): Base class for all insurance types
  - **CarInsurance**: Car-specific insurance details
  - **PropertyInsurance**: Property-specific insurance details

### Relationships
- One Agent → Many Clients
- One Agent → Many Insurances
- One Client → Many Insurances

## 🛠️ Development

### Running Tests

**Backend:**
```bash
cd Backend/ClientHub
dotnet test
```

**Frontend:**
```bash
cd Frontend/ClientHub
npm test
```

### Code Scaffolding

**Generate Angular component:**
```bash
ng generate component component-name
```

**Add Entity Framework migration:**
```bash
dotnet ef migrations add MigrationName
```

## 📝 Project Structure

```
client-hub-crm/
├── Backend/
│   └── ClientHub/
│       ├── ClientHub/
│       │   ├── Controllers/      # API Controllers
│       │   ├── Models/           # Domain Models
│       │   ├── DTOs/             # Data Transfer Objects
│       │   ├── Repositories/     # Data Access Layer
│       │   ├── Interfaces/       # Repository Interfaces
│       │   ├── Data/             # DbContext & Seed Data
│       │   ├── Helpers/          # Utility Classes
│       │   └── Migrations/       # EF Migrations
│       └── ClientHub.sln
└── Frontend/
    └── ClientHub/
        ├── src/
        │   ├── app/
        │   │   ├── features/     # Feature Modules
        │   │   ├── services/     # Angular Services
        │   │   └── dtos/         # TypeScript DTOs
        │   └── ...
        └── package.json
```

## 🔒 Security Notes

- Passwords are securely hashed using salt-based hashing
- CORS is configured for Angular development server
- Use HTTPS in production
- Update connection strings for production environments
- Never commit sensitive configuration to version control

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is available for use under standard software licensing terms.

## 👤 Author

Created by Alem1401

## 🙏 Acknowledgments

- Built with ASP.NET Core and Angular
- UI components from Angular Material
- Charts powered by Chart.js
