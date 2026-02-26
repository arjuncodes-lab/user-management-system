# Run the app (only this folder – no impact on company projects)

All commands below are run **inside this folder**: `C:\ednosoft\user-management-app`.

1. **Open terminal and go to this folder**
   ```bash
   cd C:\ednosoft\user-management-app
   ```

2. **Optional:** Clear npm cache
   ```bash
   npm cache clean --force
   ```

3. **Install dependencies** (uses this folder’s `.npmrc` only)
   ```bash
   npm install --legacy-peer-deps
   ```

4. **Start the app**
   ```bash
   npm start
   ```
   Then open **http://localhost:4200** and log in with `admin` / `admin123`.

**Proxy (only for this project):** Edit `.npmrc` in this folder and uncomment/set `proxy=` and `https-proxy=` if needed. Do not use `npm config set` so company projects stay unchanged.
