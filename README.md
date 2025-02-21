# CrustLab Finance Panel

An admin panel application for managing user accounts and financial transactions. Browse the user list, perform user financial operations, and track operations history. Easily deposit, withdraw, transfer funds and exchange currencies!

## 🚀 Live Preview

The project is deployed on Vercel:
[crustlab-finance-panel.vercel.app](https://crustlab-finance-panel.vercel.app)

## 📥 Installation

Clone the repository:

```sh
git clone https://github.com/patryk-penczek/crustlab-finance-panel.git
```

```sh
cd crustlab-finance-panel
```

Install dependencies using Bun:

```sh
bun install
```

```sh
bun dev
```

## 📌 Features

Users page `/users` – Displays a list of users with basic account details.

- User ID
- Full name
- Available balance in PLN, EUR, and USD
- Search users by name or ID

User details page `/users/[id]` – Shows detailed account balance and transaction history.

- View detailed balance in different currencies
- See full transaction history
- Perform financial operations

Financial operations:

- Deposit funds – Add funds to the account in selected currency.
- Withdraw funds – Withdraw money, with a balance check.
- Transfer funds – Send money to another user with a transaction fee.
- Currency exchange – Exchange money between PLN, EUR, and USD at a fixed rate.

## 🛠️ Technologies Used

- Next.js (App Router) – React framework for server-side rendering
- TypeScript – Strict typing for better maintainability
- Tailwind CSS – Utility-first CSS framework
- Shadcn/ui - Pre-built UI components for faster development
- Lucide-react – Icon library for UI elements
- LocalStorage – Storing user balances and transaction history
