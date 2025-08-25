# 🚀 Frontend – Dashboard Utilisateurs (React / Next.js)

Ce projet est le frontend du système de gestion des utilisateurs. Il affiche les statistiques, les derniers utilisateurs, le taux de croissance et des graphiques mensuels.

---

## 🚀 Instructions d’installation

1. **Cloner le projet**

```bash
git clone https://github.com/GOLDEN-RESSOURCES-MANAGEMENT/usermanager-front.git
cd usermanager-front
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Créer le fichier `.env`**

Créez un fichier `.env` à la racine du projet et ajoutez les variables suivantes :

```env
API_URL="http://127.0.0.1:2500/api"
NEXT_PUBLIC_API_URL="http://127.0.0.1:2500/api"
JWT_SECRET=<clé_aléatoire>
```

4. **Générer la clé secrète pour JWT**

Exécutez la commande suivante dans le terminal pour générer un `JWT_SECRET` sécurisé :

```bash
openssl rand -base64 32
```

Copiez la clé générée et remplacez `<clé_aléatoire>` dans le `.env`.

1. **Lancer le serveur de développement**

```bash
npm run dev
```

- Le projet sera accessible sur : [http://localhost:3000](http://localhost:3000)


## ⚡ Technologies utilisées

- **Frontend**
  - [React](https://react.dev/) – Bibliothèque UI
  - [Next.js](https://nextjs.org/) – Framework React pour SSR et routing
  - [TailwindCSS](https://tailwindcss.com/) – Stylisation rapide
  - [Recharts](https://recharts.org/) – Graphiques et statistiques
- **Outils**
  - Node.js / NPM – Gestion des dépendances et scripts
  - ESLint / Prettier – Qualité du code
  - OpenSSL – Génération du JWT_SECRET

---

## 📊 Fonctionnalités

- Tableau de bord avec statistiques utilisateurs :
  - Total utilisateurs
  - Nouveaux utilisateurs
  - Utilisateurs actifs
  - Taux de croissance
- Liste des utilisateurs
- Graphiques d’évolution sur les 12 derniers mois
- Composants réutilisables (Cards, Charts, Inputs)