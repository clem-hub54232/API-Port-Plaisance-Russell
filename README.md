# API Port Plaisance Russell

Application web de gestion des reservations de catways du port de Plaisance Russell.

Le projet contient :
- une API Node.js / Express dans `api`
- un frontend React / Vite dans `frontend`

## Middleware d'authentification

Le dossier `api/middlewares` contient le code qui s'execute entre la requete HTTP et la route finale.

Le fichier `api/middlewares/auth.js` sert a proteger les routes privees :
- il verifie la presence d'un token JWT dans l'en-tete `Authorization`
- il refuse la requete avec une erreur `401` si le token est absent ou invalide
- il laisse passer la requete si le token est correct

Dans les routes, cette ligne permet de proteger les routes qui suivent :

```js
router.use(requireAuth);
```

## Variables d'environnement

Avant de lancer l'API, creer le fichier `api/env/.env` avec ces variables :

```env
APP_NAME=Port Plaisance Russell API
NODE_ENV=development
PORT=3000
URL_MONGO=mongodb://localhost:27017/PortPlaisanceRussell
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=remplacer-par-une-cle-longue-et-secrete
JWT_EXPIRES_IN=2h
```

Pour le frontend, si l'API n'est pas sur `http://localhost:3000`, creer un fichier `frontend/.env` :

```env
VITE_API_URL=http://localhost:3000
```

Ne pas envoyer les vrais fichiers `.env` sur GitHub.

## Lancement de l'API

```bash
cd api
npm install
npm run start
```

## Lancement du frontend

```bash
cd frontend
npm install
npm run dev
```
