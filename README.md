# Automation Exercise

This project uses Playwright to automate submitting a callback request form on `https://test.netlify.app/`. 

---
## ⚡ Quick Start / How to Run

### Option 1: Docker (Fastest - No Node.js required) 🐳

Run this command in your terminal:

**Linux / macOS / Git Bash:**

```sh
# Pulls and runs the pre-built image directly from Docker Hub, saving screenshot 'before-callback-request.png' to your local directory
docker run --rm -v "$PWD":/app amitha51111/automation-exercise:latest
```

**PowerShell:**
```sh
# Pulls and runs the pre-built image directly from Docker Hub, saving screenshot 'before-callback-request.png' to your local directory
docker run --rm -v "${PWD}:/app" amitha51111/automation-exercise:latest
```

**Note:** The project directory is mounted into the container, so the `before-callback-request.png` screenshot is saved in the current directory.


### Option 2: Local Setup  💻

Requirements: [Node.js](https://nodejs.org/) and npm

```sh
# Install dependencies
npm install
# Install playwright
npx playwright install chromium
# Run the automation script
node automation-exercise.js
```

**Note:** The automation runs in headless mode. Its screenshot, `before-callback-request.png`, is saved in the project directory.


### 🛠️ What the Automation Does

The `automation-exercise.js` script launches Chromium in headless mode and:

1. Opens the callback form at `https://test.netlify.app/`.
2. Fills in the name, email, phone, company, and website fields with the example values defined in the script.
3. Selects `51-500` for the number of employees when that option is available.
4. Saves a full-page screenshot as `before-callback-request.png` before submitting the form.
5. Clicks **Request a call back** and checks for a thank-you confirmation. If confirmation is not detected, it logs the current page details.

The browser is closed when the script finishes. If the automation encounters an error, it logs the error and exits with a failure code.


### 📁 Repository Structure
```
├── automation-exercise.js   # Main Playwright automation script
├── Dockerfile              # Docker container configuration
├── package.json            # Node.js dependencies & scripts
└── README.md               # Project documentation
```