# Gittes Glamping


# 🌿 Gittes Glamping – Eksamensopgave Webudvikler (EUD) 2025
Media College Denmark – Viborg
November 2025

---

## 📦 Projektstruktur

glampingopgave-main/
│
├── lib/
│ ├── server.js # Express-server setup
│ └── db/ # Database / seed data
│
├── sites/
│ └── www/ # Frontend React + Vite
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── vite.config.js
│
├── index.js # Root launcher (starter serveren)
├── .env.local # Miljøvariabler til serveren
└── README.md # Denne fil


---

## ⚙️ Installation

1. **Klon projektet**
   ```bash
   git clone <repo-url>
   cd glampingopgave-main

 Installer afhængigheder
For både backend og frontend:

npm install
cd sites/www
npm install
cd ../..

🚀 Sådan startes projektet

Åbn to terminaler (eller to faner i VSCode):

🟩 1. Start Node-serveren (backend)

Fra projektets rodmappe:

nodemon index.js


Serveren kører typisk på http://localhost:3000

🟦 2. Start React-frontend (Vite)

Fra frontend-mappen:

cd sites/www
npm run dev


Frontend kører på http://localhost:5173

🧩 Miljøvariabler

Serveren læser miljøvariabler fra .env.local, fx:

PORT=3000
MONGO_URI=mongodb://localhost:27017/gittesglamping

🧱 Teknologier brugt

Frontend: React + Vite + MUI + Framer Motion

Styling: CSS Modules + custom design (Zen Loop & Nanum Gothic fonts)

Backend: Node.js + Express

Database: MongoDB (stub data i /lib/db/seed/)

Tools: nodemon, dotenv, react-toastify



```
Author  : Ionut Catalin Belu
Project : API / Backend for Gittes Glamping.
```

## Kom igang.

Følg følgende trin.

### Installér Moduler.

```
npm install
```

### Opret en .env.local fil i roden af projektet.

Indsæt dette indhold:

```
# Secret Variables for use in Server Application.
NODE_ENV=development

SERVER_PORT=3042
SERVER_HOST=http://localhost:3042

MONGODB_URI=mongodb://127.0.0.1:27017/mcd-glamping

# JWT
JWT_EXPIRES_IN="24h"
JWT_SECRET="8e18fa26acc704d3ca37fea29e17e8e024423a7c3eab4b76390a94ac579c20f0"

# Flags.
USE_JWT=false
```

### 2. Opret database & indhold.

Tryk på knappen `Opret Database` i 'NPM Script' i visual kode.

Eller benyt kommandoen

```
npm run "Opret Database"
```

### 4. Tjek at databasen er oprettet.

Åbn Mongo Compass og se din nye database "mcd-glamping".

### 5. Start serveren.

Kør "start" i 'NPM Script' i visual kode.

### 6. Åbn Postman.

Importér 'postman*collection.json' *(som ligger i `/postman` i dette projekt)\_

Opret et Postman Environment i postman op ret to variabler.

1. server_path
2. token

Værdierne for de to variabler skal være.

1. **server_path** = http://localhost:3042
2. **token** = Den token du er logget ind med. (kun når du benytter auth - start uden)

At benytte authentication vil være et tilvalg - du skal slå funktionaliteten til, ved at sætte
**USE_JWT=true** i .env.local filen.

### 7. Tjek at der er adgang til serveren fra postman.

Benyt "Get Users" i postman og forvent 2 brugere en **Admin** og en **Guest**.

Ala:

```javascript
{
    "message": "Users fetched successfully",
    "data": [
        {
            "_id": "66e6a2da51a46bc59db69480",
            "name": "admin",
            "email": "admin@mediacollege.dk",
            "picture": "/images/defaults/default-user.png",
            "hashedPassword": "$2a$10$QbDVVE5iOu25HJYm/87dmeBUv4P0WmHbF3lwhXLorVCqTgUP9Sbpi",
            "role": "admin",
            "created": "2024-09-15T09:03:22.406Z"
        },
        {
            "_id": "66e6a2da51a46bc59db69483",
            "name": "guest",
            "email": "guest@mediacollege.dk",
            "picture": "/images/defaults/default-user.png",
            "hashedPassword": "$2a$10$7HGjZH4x9q5KYFay2cnub.ES9HzEk/eNSscsiR8gNqPQ1GLU6M952",
            "role": "guest",
            "created": "2024-09-15T09:03:22.406Z"
        }
    ]
}
```

Nu er alt oprettet og du er klar til at udvikle Projektet. Hvis dette ikke er tilfældet, så tag fat i din underviser.

:bulb: Husk! I kan altid droppe/slette jeres database og genskabe den som oprindelig med "Opret Database" scriptet. I kan også omdøbe databasen ved at ændre navnet i .env.local filen. Tøv ikke med at tage fat i en underviser hvis der er problemer.
