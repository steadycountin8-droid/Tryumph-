from flask import Flask, render_template, request, jsonify, session
import random
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production')

class CashGamesEngine:
    def __init__(self, cashtag, balance=0.00):
        self.cashtag = f"${cashtag.lstrip('$')}"
        self.balance = float(balance)
        self.history = []

    def deposit_funds(self, amount):
        self.balance += amount
        self.history.append(f"Deposited +${amount:.2f} via Linked Debit")
        return f"Success. New Balance: ${self.balance:.2f}"

    def enter_1v1_match(self, game_name, wager):
        if self.balance < wager:
            return {"status": "error", "message": "❌ Declined: Insufficient Funds. Add cash to enter tournament."}
        
        # Deduct entry fee (Triumph style escrow)
        self.balance -= wager
        self.history.append(f"Escrow: Wagered ${wager:.2f} on {game_name}")
        
        # Simulate matchmaking and outcome (Skill check imitation)
        player_score = random.randint(80, 100)
        opponent_score = random.randint(70, 98)
        
        if player_score > opponent_score:
            # Payout equals 1.8x the wager (Keeping 10% platform fee for the house)
            winnings = wager * 1.8
            self.balance += winnings
            self.history.append(f"🏆 Match Won! {game_name} ({player_score} vs {opponent_score}). Payout: +${winnings:.2f}")
            return {
                "status": "win",
                "message": f"MATCH OVER: You Won! Payout ${winnings:.2f} added to your Cash Balance.",
                "player_score": player_score,
                "opponent_score": opponent_score,
                "winnings": winnings,
                "balance": self.balance
            }
        else:
            self.history.append(f"💀 Match Lost. {game_name} ({player_score} vs {opponent_score})")
            return {
                "status": "loss",
                "message": f"MATCH OVER: Defeat. Opponent scored higher. Wager lost.",
                "player_score": player_score,
                "opponent_score": opponent_score,
                "balance": self.balance
            }

    def get_wallet_state(self):
        return {
            "cashtag": self.cashtag,
            "balance": round(self.balance, 2),
            "history": self.history[-5:]
        }

# Store user sessions (in-memory for demo)
user_engines = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/init-wallet', methods=['POST'])
def init_wallet():
    data = request.json
    cashtag = data.get('cashtag', 'PlayerOne')
    initial_balance = float(data.get('balance', 10.00))
    
    user_engines[cashtag] = CashGamesEngine(cashtag, initial_balance)
    session['cashtag'] = cashtag
    
    return jsonify(user_engines[cashtag].get_wallet_state())

@app.route('/api/deposit', methods=['POST'])
def deposit():
    data = request.json
    cashtag = session.get('cashtag')
    amount = float(data.get('amount', 0))
    
    if cashtag not in user_engines:
        return jsonify({"error": "User not initialized"}), 400
    
    result = user_engines[cashtag].deposit_funds(amount)
    return jsonify(user_engines[cashtag].get_wallet_state())

@app.route('/api/play-match', methods=['POST'])
def play_match():
    data = request.json
    cashtag = session.get('cashtag')
    game_name = data.get('game_name', 'Stocks Runner')
    wager = float(data.get('wager', 5.00))
    
    if cashtag not in user_engines:
        return jsonify({"error": "User not initialized"}), 400
    
    result = user_engines[cashtag].enter_1v1_match(game_name, wager)
    wallet_state = user_engines[cashtag].get_wallet_state()
    
    result['wallet'] = wallet_state
    return jsonify(result)

@app.route('/api/wallet', methods=['GET'])
def get_wallet():
    cashtag = session.get('cashtag')
    
    if cashtag not in user_engines:
        return jsonify({"error": "User not initialized"}), 400
    
    return jsonify(user_engines[cashtag].get_wallet_state())

if __name__ == '__main__':
    app.run(debug=True)
