# Plan: Run project locally when npm install keeps failing

Follow these steps **in order**. Stop when one works.

---

## Step 1: Try Yarn (often works when npm fails on flaky network)

Yarn uses different connection handling and may succeed where npm fails.

1. Open a **new** terminal (PowerShell or CMD).
2. Install Yarn globally (one small package – often succeeds):
   ```bash
   npm install -g yarn
   ```
   If this fails with ECONNRESET, go to Step 2.

3. Go to your project and install with Yarn:
   ```bash
   cd C:\ednosoft\user-management-app
   yarn install
   ```
   Wait for it to finish.

4. Start the app (Yarn uses the same node_modules):
   ```bash
   npx ng serve
   ```
   Or: `npm start` (npm will use the existing node_modules).

5. Open **http://localhost:4200** and log in with **admin** / **admin123**.

If Yarn install completes, you are done. Run the app and then push to GitHub.

---

## Step 2: Try npm again with default registry (best on company network)

If you are on **company LAN or VPN** (same network where hcmp-ui works):

1. Open `.npmrc` in `C:\ednosoft\user-management-app`.
2. **Comment out** the mirror line so npm uses the default registry:
   - Change: `registry=https://registry.npmmirror.com`
   - To: `# registry=https://registry.npmmirror.com`
3. Save, then run:
   ```bash
   cd C:\ednosoft\user-management-app
   npm install --legacy-peer-deps --no-audit
   ```
4. If it completes: `npm start` and open http://localhost:4200.
5. (Optional) Restore the mirror line in `.npmrc` if you want it back for later.

---

## Step 3: Retry npm install many times (hotspot / unstable network)

Each run reuses the cache and may get a bit further. Sometimes 5–10 runs complete.

1. In the project folder, run the same command repeatedly:
   ```bash
   cd C:\ednosoft\user-management-app
   npm install --legacy-peer-deps --no-audit
   ```
2. If it fails, run it again. Do not delete `node_modules` between runs.
3. When it finally completes, run:
   ```bash
   npm start
   ```
4. Open http://localhost:4200 and log in with **admin** / **admin123**.

---

## Step 4: Use another PC, then copy node_modules (last resort)

If you have access to another computer with **stable internet** (home, friend, cafe):

1. Copy the **entire** `C:\ednosoft\user-management-app` folder to that PC (or clone from GitHub if already pushed). Do **not** copy `node_modules`.
2. On that PC, open the project folder and run:
   ```bash
   npm install --legacy-peer-deps --no-audit
   ```
   Wait until it finishes.

3. Zip the **node_modules** folder on that PC.
4. Copy the zip to your laptop. Extract it into:
   `C:\ednosoft\user-management-app\node_modules`
   (so that `node_modules` is **inside** the project folder).

5. On your laptop, run:
   ```bash
   cd C:\ednosoft\user-management-app
   npm start
   ```
6. Open http://localhost:4200 and log in with **admin** / **admin123**.

No need to run `npm install` again on the laptop.

---

## Summary

| Step | What to do |
|------|------------|
| 1 | Try **Yarn**: `npm install -g yarn`, then `yarn install` in project, then `npx ng serve` |
| 2 | On **company network**: comment out `registry=...` in .npmrc, run `npm install --legacy-peer-deps --no-audit` |
| 3 | **Retry** `npm install --legacy-peer-deps --no-audit` 5–10 times (same folder, keep cache) |
| 4 | **Another PC**: run npm install there, zip `node_modules`, copy to laptop and extract, then `npm start` |

After the app runs locally, push to GitHub as planned. All steps use only this project folder; the company project is not touched.
