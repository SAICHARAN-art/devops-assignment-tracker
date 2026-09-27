# Syllabus-to-Project Mapping

| Syllabus topic | Project implementation |
|---|---|
| Agile development | Work can be divided into small user stories: add, view, complete, delete |
| DevOps process | Source → build → test → package → deploy |
| Continuous Delivery | Jenkins pipeline automatically builds/tests a Docker image |
| Release management | Docker image tagged with Jenkins build number |
| Scrum/Kanban | Suggested task board: Backlog → In Progress → Testing → Done |
| Delivery pipeline | Git → Jenkins → tests → Docker → health check → Ansible |
| Bottlenecks | Long tests, dependency installation, Docker build, or deployment can be measured in Jenkins |
| Continuous testing | Unit tests and Selenium UI test |
| Architecture | Simple monolithic web application with separate frontend/API/database concerns |
| Database migration | SQLite table is created automatically at application startup |
| Source code control | Git repository with branches and pull requests |
| Hosted Git | GitHub can host the repository |
| Docker | Dockerfile packages the application |
| Jenkins | Jenkinsfile defines CI pipeline |
| Build dependencies | npm ci installs package-lock dependencies |
| Build phases | Checkout → install → test → build → run/verify |
| Quality measures | Test pass/fail and health-check result |
| Selenium | Browser test verifies page title and heading |
| Backend integration | `/api/health` and assignment APIs can be tested |
| Ansible | Playbook deploys the Docker container |
| Deployment | Container exposes port 3000 |
