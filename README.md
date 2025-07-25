# Expenses Manager

**Expenses Manager** is a modern, user-friendly web application for tracking personal expenses and income. It provides insightful statistics, interactive charts, and flexible category management, all built with React, Ant Design, and TypeScript.

## Features

- **Dashboard Overview:**  
  Visualize your financial health with summary statistics, pie charts, and a waterfall chart for income vs. expenses over time.

- **Expense & Income Tracking:**  
  Add, edit, and delete transactions. Each entry supports multiple categories, amounts, dates, and descriptions.

- **Category Management:**  
  Create, edit, and color-code your own expense and income categories.

- **Filtering:**  
  Filter your data by daily, weekly, monthly, quarterly, or yearly periods for focused analysis.

- **Data Persistence:**  
  All data is stored in your browser’s local storage—no server or account required.

- **Responsive UI:**  
  Clean, responsive design using Ant Design components and theming (light/dark mode).

## Screenshots

![Dashboard Screenshot](https://github.com/SanjaBozic/expenses-manager/raw/main/docs/dashboard.png)
![Expenses Grid Screenshot](https://github.com/SanjaBozic/expenses-manager/raw/main/docs/expenses.png)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/SanjaBozic/expenses-manager.git
    cd expenses-manager
    ```

2. **Install dependencies:**
    ```sh
    npm install
    # or
    yarn install
    ```

3. **Start the development server:**
    ```sh
    npm run dev
    # or
    yarn dev
    ```

4. **Open in your browser:**  
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

```
src/
  components/
    dashboard/         # Dashboard, charts, statistics
    expenses/          # Expenses grid and logic
    income/            # Income grid and logic
    main-grid/         # Shared grid components (add/edit/search)
    main-layout/       # Layout, navigation, theming
    settings/          # Category management, info
    side-navigation/   # Sidebar navigation
    top-navigation/    # Top navigation bar
    routes/            # Page routing
  context/
    data-context.tsx   # React context for global data
  hooks/
    use-data.tsx       # Custom hooks
  style/               # CSS overrides and framework
  main.tsx             # App entry point
```

## How It Works

- **Data Context:**  
  All data (expenses, income, categories) is managed via React Context and stored in localStorage for persistence.

- **Grids:**  
  Expenses and income are displayed in editable tables. You can add, edit, or delete rows inline.

- **Charts:**  
  The dashboard uses Ant Design Plots for pie and waterfall charts, providing a visual breakdown of your finances.

- **Filtering:**  
  Use the dashboard filters to view your data by different time periods.

- **Category Colors:**  
  Assign colors to categories for easy identification in tables and charts.

- **Theming:**  
  Switch between light and dark mode using the toggle in the top navigation.

## Customization

- **Add/Edit Categories:**  
  Go to Settings → Categories to manage your categories and their colors.

- **Data Reset:**  
  To clear all data, use your browser’s localStorage tools.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

## Author

Created by [Sanja Božić Ribarić](https://github.com/SanjaBozic)

---

**Project Link:** [https://github.com/SanjaBozic/expenses-manager](https://github.com/SanjaBozic/expenses-manager)