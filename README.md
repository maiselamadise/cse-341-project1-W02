# Contacts API — Part 1 (Week 01)

An Express + MongoDB API for storing and retrieving contacts. Part 1 covers
project setup, MongoDB connection, importing sample data, the GET routes,
and deployment to Render.

## What's included

- `server.js` — Express app entry point
- `db/connect.js` — MongoDB connection helper (native `mongodb` driver)
- `routes/contacts.js` — `GET /contacts` and `GET /contacts/:id`
- `seed.js` — inserts 3 sample contacts into the `contacts` collection
- `contacts.rest` — REST Client requests for manual testing
- `.env.example` — template for the required environment variable

## 1. MongoDB Atlas setup

1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Under **Database Access**, create a database user with a username/password.
3. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere) so Render can connect.
4. Click **Connect → Drivers**, copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority
   ```
5. Add a database name into the string (e.g. `.../contactsDB?retryWrites...`) so `client.db()` in `connect.js` resolves correctly.

## 2. Local setup

```bash
git clone <your-repo-url>
cd contacts-api
npm install
cp .env.example .env
```

Edit `.env` and paste in your real `MONGODB_URI`. This file is already in
`.gitignore` — it will never be pushed to GitHub.

## 3. Import sample data

The assignment requires at least 3 documents in a `contacts` collection with
`firstName`, `lastName`, `email`, `favoriteColor`, `birthday`. Run:

```bash
npm run seed
```

You can also just add documents manually through the Atlas UI, or edit the
`contacts` array in `seed.js` to use real people from your class before running it.

## 4. Run locally

```bash
npm start
```

Visit `http://localhost:3000/` — you should see "Hello World".
Then use `contacts.rest` (with the VS Code REST Client extension) or Postman/Insomnia to test:

- `GET /contacts` — returns all contacts
- `GET /contacts/:id` — returns one contact by its Mongo `_id`

## 5. Push to GitHub

```bash
git init
git add .
git commit -m "Part 1: project setup, MongoDB connection, GET routes"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

Double-check `.env` is **not** in the commit (`git status` should not list it).

## 6. Deploy to Render

1. Go to [render.com](https://render.com) → **New → Web Service**.
2. Connect your GitHub repo.
3. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Under **Environment**, add an environment variable:
   - Key: `MONGODB_URI`
   - Value: your real connection string
   (Render will also set `PORT` automatically — the code already falls back to it.)
5. Deploy. Once live, test the same routes against your Render URL, e.g.
   `https://your-app-name.onrender.com/contacts`.

## Part 1 checklist (this week)

- [x] Project set up, pushed to GitHub
- [x] MongoDB connected via `.env` connection string
- [x] `contacts` collection with 3+ sample documents
- [x] `GET /contacts` and `GET /contacts/:id` working
- [x] Deployed to Render and reachable externally

## Coming in Part 2 (Week 02)

- `POST`, `PUT`, `DELETE` routes for contacts
- Swagger API documentation
- Final demo video + Canvas submission (GitHub, Render, YouTube links)
