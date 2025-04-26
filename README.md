# Prekių valdymo sistema

Šis projektas yra mažas React + Node.js Express web app, kuris leidžia:
- Registruotis ir prisijungti vartotojams
- Matyti prekių sąrašą
- Pridėti naujas prekes
- Redaguoti prekes
- Ištrinti prekes
- Redaguoti vartotojo profilį (el. paštą ir slaptažodį)
- Atsijungti nuo paskyros
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

API endpointai:

- `POST /api/auth/register` - vartotojo registracija
- `POST /api/auth/login` - vartotojo prisijungimas
- `GET /api/auth/userinfo` - vartotojo informacijos gavimas
- `PATCH /api/auth/update` - vartotojo profilio atnaujinimas
- `GET /api/items` - gauti visas prekes
- `POST /api/items` - pridėti naują prekę
- `PUT /api/items/:id` - atnaujinti prekę
- `PATCH /api/items/:id` - iš dalies atnaujinti prekę
- `DELETE /api/items/:id` - ištrinti prekę

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
- JWT autorizacija
- CORS
- Helmet
- JSON failai kaip duomenų saugykla

## Funkcionalumai
- Registracija / Prisijungimas
- Prekių sąrašo peržiūra
- Prekės sukūrimas, atnaujinimas, trynimas
- Profilio redagavimas (el. paštas ir slaptažodis)
- Automatinis logout jei tokenas pasibaigia
- Responsive dizainas (prisitaikymas įvairiems įrenginiams)

## Svarbios pastabos
- API užklausos reikalauja `Authorization: Bearer <token>` ir `CustomValue` antraščių

- Visi vartotojų įvedami duomenys validuojami serveryje

- Vartotojų ir prekių duomenys saugomi JSON failuose (`users.json`, `items.json`)

- HTTPS ryšys su savarankišku sertifikatu (`cert.pem`, `key.pem`)