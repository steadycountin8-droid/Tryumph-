function initWallet() {
    const cashtag = document.getElementById('cashtag').value || 'PlayerOne';
    const balance = parseFloat(document.getElementById('initial-balance').value) || 10.00;

    fetch('/api/init-wallet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cashtag, balance })
    })
    .then(response => response.json())
    .then(data => {
        updateWalletDisplay(data);
        document.getElementById('setup-section').classList.add('hidden');
        document.getElementById('wallet-section').classList.remove('hidden');
    })
    .catch(error => console.error('Error:', error));
}

function depositFunds() {
    const amount = parseFloat(document.getElementById('deposit-amount').value);
    
    if (!amount || amount <= 0) {
        showAlert('Please enter a valid amount', 'error');
        return;
    }

    fetch('/api/deposit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount })
    })
    .then(response => response.json())
    .then(data => {
        updateWalletDisplay(data);
        document.getElementById('deposit-amount').value = '';
        showAlert(`✅ Successfully deposited $${amount.toFixed(2)}`, 'success');
    })
    .catch(error => console.error('Error:', error));
}

function playMatch() {
    const game_name = document.getElementById('game-select').value;
    const wager = parseFloat(document.getElementById('wager-amount').value);
    const balance = parseFloat(document.getElementById('wallet-balance').textContent.replace('$', ''));

    if (!wager || wager <= 0) {
        showAlert('Please enter a valid wager', 'error');
        return;
    }

    if (wager > balance) {
        showAlert('❌ Insufficient funds for this wager', 'error');
        return;
    }

    fetch('/api/play-match', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ game_name, wager })
    })
    .then(response => response.json())
    .then(data => {
        displayMatchResult(data);
        updateWalletDisplay(data.wallet);
        document.getElementById('wager-amount').value = '5.00';
    })
    .catch(error => console.error('Error:', error));
}

function displayMatchResult(result) {
    const resultDiv = document.getElementById('match-result');
    const contentDiv = document.getElementById('result-content');
    let html = '';

    if (result.status === 'error') {
        resultDiv.classList.add('loss');
        html = `<div class="alert alert-error">${result.message}</div>`;
    } else if (result.status === 'win') {
        resultDiv.classList.remove('loss');
        resultDiv.classList.add('win');
        html = `
            <h3>🏆 VICTORY!</h3>
            <div class="result-score">Your Score: ${result.player_score} vs ${result.opponent_score}</div>
            <p>💰 Winnings: +$${result.winnings.toFixed(2)}</p>
            <p>${result.message}</p>
        `;
    } else if (result.status === 'loss') {
        resultDiv.classList.remove('win');
        resultDiv.classList.add('loss');
        html = `
            <h3>💀 DEFEAT</h3>
            <div class="result-score">Your Score: ${result.player_score} vs ${result.opponent_score}</div>
            <p>${result.message}</p>
        `;
    }

    contentDiv.innerHTML = html;
    resultDiv.classList.remove('hidden');
}

function updateWalletDisplay(wallet) {
    document.getElementById('wallet-cashtag').textContent = wallet.cashtag;
    document.getElementById('wallet-balance').textContent = `$${wallet.balance.toFixed(2)}`;

    const historyDiv = document.getElementById('history');
    if (wallet.history.length === 0) {
        historyDiv.innerHTML = '<p class="placeholder">No activity yet</p>';
    } else {
        historyDiv.innerHTML = wallet.history.map(item => `<div class="history-item">🟩 ${item}</div>`).join('');
    }
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const parent = document.getElementById('wallet-section');
    parent.insertBefore(alertDiv, parent.firstChild);
    
    setTimeout(() => alertDiv.remove(), 3000);
}

function resetWallet() {
    document.getElementById('wallet-section').classList.add('hidden');
    document.getElementById('setup-section').classList.remove('hidden');
    document.getElementById('cashtag').value = 'PlayerOne';
    document.getElementById('initial-balance').value = '10.00';
    document.getElementById('match-result').classList.add('hidden');
}
