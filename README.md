URL Shortener Service with Analytics Dashboard
This project is a URL shortener service that allows users to shorten long URLs, track click data, and manage their personalized shortened URLs. Built using Firebase for backend and database management, and React for frontend development.

Features
User authentication via Firebase Authentication.
URL shortening with randomly generated short codes.
URL redirection using the shortened link.
View history of previously shortened URLs.
Analytics dashboard to track click counts and geolocation data.
Tech Stack
Cloud Integration & Database: Firebase
Backend Development: Firebase Functions
Frontend Development: React
Application Workflow
User Authentication: Users must log in using Firebase Authentication to access the URL shortening service.
URL Shortening: Once logged in, users can input a long URL, and the system will generate a short URL in the format http://localhost:3000/l/${code}.
Redirection: Clicking the shortened URL will redirect to the original URL via the GoLink.js component, which retrieves the long URL from Firebase.
History View: Logged-in users can view their past shortened URLs by clicking on the "My URLs" button.
