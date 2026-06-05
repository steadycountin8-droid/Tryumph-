# Triumph - Cash Games Wallet

A simple Flask web application for the Cash Games Engine simulation.

## Features

- 💳 **Deposit Funds** - Add cash to your wallet
- 🎮 **Play Matches** - Engage in 1v1 games with random outcomes
- 🏆 **Win Rewards** - Earn 1.8x payouts on victories
- 📜 **Activity History** - Track all transactions
- 💰 **Real-time Balance** - View your current balance

## Installation

1. Clone the repository:
```bash
git clone https://github.com/steadycountin8-droid/Tryumph-.git
cd Tryumph-
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the App

```bash
python app.py
```

The app will be available at `http://localhost:5000`

## How to Play

1. **Initialize Account** - Enter a cashtag and starting balance
2. **Deposit Funds** - Add money to your wallet
3. **Select a Game** - Choose from available games
4. **Enter a Wager** - Bet an amount you can afford
5. **See Results** - Win 1.8x your wager or lose it
6. **Check History** - Review all your transactions

## Game Rules

- Player Score: 80-100
- Opponent Score: 70-98
- Win Payout: 1.8x wager (10% platform fee)
- Minimum Balance Required: Amount of wager

## Technologies

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Session Management**: Flask Sessions

## Disclaimer

This is a simulation/demo application. The random outcomes are for entertainment purposes only.
