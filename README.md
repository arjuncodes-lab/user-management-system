# User Management App

Angular 12 app for the assignment: login, user list (add/edit/delete), data entry form, and log off. Data is kept in browser localStorage for demo; no backend.

**Submission note:** This project is the one to submit. Demo login: **arjun** / **Arjun@123**.

## How to run

**Prerequisites:** Node 12.x or 14.x, npm 6+

```bash
# from project root
npm install
npm start
```

Then open **http://localhost:4200** and log in with **arjun** / **Arjun@123**.

If `npm install` fails or hangs (e.g. on corporate network), use `npm install --legacy-peer-deps --no-audit` or see **RUN_LOCALLY.md** for other options.

## Screenshots (working UI)

Below are snapshots of the running application (add your own images to the `screenshots/` folder and push).

| Screen | Description |
|--------|-------------|
| [Login](screenshots/login.png) | Login page with credential validation |
| [Users list](screenshots/users-list.png) | User table with Add / Edit / Delete |
| [Data entry](screenshots/data-entry.png) | Add/Edit user form (Name, DOB, Address, Phone) |

Save your browser screenshots into the `screenshots/` folder with the names above (e.g. `login.png`, `users-list.png`, `data-entry.png`), then commit and push so reviewers can see the working app.

## How it works

- **Login:** Credentials are checked against a demo user (arjun / Arjun@123). On success, a flag is stored in localStorage and you’re redirected to the users list. Routes under `/users` and `/data-entry` are protected by an auth guard; if not logged in, you’re sent to `/login`.
- **Users list:** Reads users from `UserService`, which persists them in localStorage. Table shows name, DOB, address, phone. “Add User” goes to the data-entry form; “Edit” goes to the same form with the user id in the URL; “Delete” asks for confirmation and then removes the user and refreshes the list.
- **Data entry:** Form for name, DOB, address, phone. If the URL has an `id` (e.g. `/data-entry/123`), the form loads that user and updates on submit; otherwise it creates a new user. After save, it navigates back to the users list.
- **Log off:** Navbar “Log off” clears the auth flag from localStorage and redirects to `/login`.

So: login → users list (table) → add/edit/delete via data-entry form → log off. All state is in memory + localStorage; no API.

## Build

```bash
ng build --configuration production
```

Output is in `dist/user-management-app`.

## Project structure

- `src/app/core` – `AuthService`, `UserService`, `AuthGuard`, `User` model
- `src/app/features` – login, users list, data-entry components
- `src/app/shared` – layout (navbar + log off + router outlet)

## Push to GitHub

From project root:

```bash
git init
git add .
git commit -m "Initial commit: Angular 12 user management app"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
