# Prekių valdymo sistema

Šis projektas yra mažas React + Node.js Express web app, kuris leidžia:

- Matyti prekių sąrašą
- Pridėti naujas prekes
- Atnaujinti prekes
- Ištrinti prekes
- Visa komunikacija vyksta per apsaugotą HTTPS ryšį su JWT token autorizacija
- Duomenys saugomi JSON faile (`items.json`)

## Kaip paleisti projektą

### 1. Backend (Node.js + Express)

Eik į `backend/` aplanką:

```bash
cd backend
```

Įdiek priklausomybes:

```bash
npm install
```

Paleisk serverį:
```bash
npm start
```

Backend serveris pasileis adresu: https://localhost:3001

API prieiga: https://localhost:3001/api/items

> **Pastaba:** Kadangi naudojamas savarankiškas sertifikatas, naršyklė gali rodyti "Not secure" (tai normalu lokaliai).


### 2. Frontend (React + Vite)
Eik į `frontend/` aplanką:

```bash
cd frontend
```

Įdiek priklausomybes:
```bash
npm install
```

Paleisk frontend'ą:
```bash
npm run dev
```

Frontend atsidarys adresu: http://localhost:5174 (arba kitu, jei 5173 jau užimtas).

## Naudojamos technologijos
- React
- Vite
- Axios
- Bootstrap 5
- Node.js
- Express
- HTTPS
- JWT (fake token autorizacija)
- CORS
- Helmet

## Svarbios pastabos

- Kiekviena API užklausa privalo turėti Authorization: Bearer token antraštę ir CustomValue antraštę

- Visi duomenys tikrinami (validuojami) serveryje

- Failas items.json saugo visas prekes (nėra duomenų bazės)

- HTTPS sertifikatas sukurtas lokaliai naudojant openssl