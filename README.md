# College Assignment Tracker – DevOps Mini Project

A simple web application designed to demonstrate the major practical ideas in the CMRTC R22 DevOps syllabus.

## What the project does
- Add college assignments with subject and due date
- View assignments
- Toggle Pending/Completed status
- Delete assignments
- Health-check endpoint for deployment verification

## Technology stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- Database: SQLite
- Source control: Git/GitHub
- CI: Jenkins
- Containerization: Docker
- Automated UI testing: Selenium
- Deployment automation: Ansible

## Run locally
1. Install Node.js 20+
2. `npm install`
3. `npm start`
4. Open `http://localhost:3000`

## Test
- Unit tests: `npm test`
- Selenium: start the app first, then run `npm run test:selenium` (Chrome and ChromeDriver must be available)

## Docker
`docker build -t devops-assignment-tracker .`
`docker run -p 3000:3000 devops-assignment-tracker`

## DevOps flow
Git push → Jenkins checkout → npm install → tests → Docker build → container health check → deployment with Ansible.

## Syllabus mapping
- Unit I: Agile/DevOps process, continuous delivery, delivery pipeline, bottlenecks
- Unit II: DevOps lifecycle, continuous testing, monolithic architecture, separation of concerns, database persistence, resilience/health endpoint
- Unit III: Git/source control, hosted Git, pull request model, Docker introduction
- Unit IV: Jenkins, build dependencies, triggers/pipelines, Docker infrastructure
- Unit V: automated testing, Selenium, backend endpoint testing, Docker deployment, Ansible
