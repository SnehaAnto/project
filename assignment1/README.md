# project

Web and Mobile Software Dev - Project - Timesheet App

# Timesheet App

A simple web application that allows users to log their work hours and manage their timesheets. The app features a login page with options for username or email authentication and a form for submitting timesheet entries.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [License](#license)

## Features

- User login with two authentication methods: username or email.
- Timesheet submission with fields for date, project, hours worked, and a description.
<!-- - Display of recent timesheet entries in a table format. -->
- Responsive design using Bootstrap.

## Technologies Used

- HTML
- CSS
- JavaScript (To be changed to TypeScript later)
- Bootstrap

## Installation

1. Clone the repository: Use the command: git clone https://github.com/SnehaAnto/project
2. Navigate to the assignment1 folder that contains the static design for this app:
3. Open login-page.html in your browser to view the login-page.
4. Open timesheet.html in your browser to view the timesheet page.


## Usage

Login Page: 
1. Select a login method (username or email)
2. Fill in your credentials
3. Click "Login."
4. Land on Timesheet page.

Timesheet Page: 
1. After logging in, enter the date, project name, hours worked, and a description of your work
2. Then click "Submit." Recent entries will be displayed below the form.
3. Once done, click on Logout that redirects back to the Login page.

## File Structure

assignment1/
├──login-page
    ├── login-page.html             # Login page HTML
    ├── login-page.css              # Styles for the login page
    ├── login-page.js               # JavaScript for login functionality
├──timesheet
    ├── timesheet.html              # Timesheet entry page HTML
    ├── timesheet.css               # Styles for the timesheet page
    ├── timesheet.js                # JavaScript for timesheet

├── package.json                    # Project dependencies and scripts
└── .gitignore                      # Files to be ignored by Git


## License
This project is licensed under the MIT License - see the LICENSE file for details.