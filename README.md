# 🐔 Web_TP – Gestion numérique de l'environnement d'un poulailler

Ce projet, développé par **Desire Amizero**, regroupe trois applications interconnectées pour faciliter la gestion d’un poulailler :

- **poulailler-web** : interface web Angular pour la visualisation des données.
- **poulaillet-mobile** : application mobile Ionic pour la gestion sur smartphone.
- **poulailler-backend** : serveur Node.js/Express pour exposer une API RESTful.
  
---

## 🧰 Technologies utilisées

| Module              | Technologies                                  |
|---------------------|-----------------------------------------------|
| Web (frontend)       | Angular, TypeScript, HTML/CSS                |
| Mobile               | Ionic, Angular                                |
| Backend (API REST)   | Node.js, Express.js                           |
| Base de données      | MongoDB                                       |

---

## 🚀 Fonctionnalités

- 🔐 Authentification simple (admin/admin)
- 📱 Application mobile responsive
- 📊 Affichage des données capteurs (température, humidité, etc.)
- 🌐 Communication entre mobile/web/backend via API REST

---

## 🗂️ Structure du projet

Web_TP/
├── poulailler-backend/ # Backend Node.js + Express
├── poulailler-web/ # Frontend Angular
├── poulaillet-mobile/ # Application mobile Ionic
└── .gitignore # Fichiers ignorés par Git

---

## 🧪 Installation locale



 ### 1. cloner le depot
```bash
git clone https://github.com/ton-utilisateur/Web_TP.git
cd Web_TP

### 2. Lancer chaque module
Backend
cd poulailler-backend
npm install
npm start

Web (Angular)

cd ../poulailler-web
npm install
ng serve

Mobile (Ionic)
Générer un APK Android
1. S’assurer que Capacitor est installé :
npm install @capacitor/core @capacitor/cli
npx cap init
2.Générer et ouvrir dans Android Studio :
ionic build
npx cap add android
npx cap open android

### 3. Identifiants de test
(web)
Utilisateur	/Mot de passe
admin	/admin123
(mobile)
admin/admin
### 4 . Licence
Ce projet est open-source et développé à des fins pédagogiques.
© 2025 – Desire Amizero
