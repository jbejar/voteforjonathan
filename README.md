# nextjs-github-pages

This is a Next.js application configured to be deployed on GitHub Pages using GitHub Actions.

## Getting Started

To get started with this project, follow the instructions below.

### Prerequisites

- Node.js (version 12 or later)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jbejar/voteforjonathan.git
   cd voteforjonathan
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

To start the development server, run:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to see your application in action.

### Building for Production

To build the application for production, run:
```bash
npm run build
```

### Deploying to GitHub Pages

This project is set up to deploy automatically to GitHub Pages using GitHub Actions. Make sure to configure the `deploy.yml` file in the `.github/workflows` directory with your repository details.

### Features

#### School Enrollment Projections
The `/schools` page provides an interactive tool to explore school enrollment projections from 2024 to 2029:

- **School Type Filtering**: Filter by Elementary School, Jr. High School, High School, or view all schools
- **School Selection**: Choose specific schools from the filtered list
- **Interactive Charts**: Animated D3.js line charts showing enrollment trends
- **URL Parameters**: Selections are reflected in the query string for easy sharing
  - `?schoolType=Elementary%20School` - Filter by school type
  - `?school=Belmont` - Select specific school
  - Example: `/schools?schoolType=Elementary%20School&school=Belmont`

The data is sourced from `src/app/schools/projections.json` and includes:
- Current and projected enrollment numbers
- School type classifications
- 6-year projection timeline (2024-2029)

### Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.