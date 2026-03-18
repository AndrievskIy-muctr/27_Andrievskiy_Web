function point21() {
    function createDeck() {
        const suits = ["♠", "♥", "♦", "♣"];
        const ranks = ["6", "7", "8", "9", "10", "В", "Д", "К", "Т"];

        const deck = [];

        suits.forEach(suit => {
            ranks.forEach(rank => {
                deck.push(suit + rank);
            });
        });

        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }

        return deck
    }

    function getValue(card) {
        const rank = card.slice(1);
        if (rank === "В") return 2;
        if (rank === "Д") return 3;
        if (rank === "К") return 4;
        if (rank === "Т") return 11;
        return parseInt(rank); // 6 7 8 9 10
    }

    function calcScore(hand) {
        return hand.reduce((sum, card) => sum + getValue(card), 0);
    }

    function handToString(hand) {
        return hand.join(", ");
    }

    let balance = 100;

    while (balance > 0) {

        let deck = createDeck();

        let betInput = prompt(`💰 Баланс: ${balance}₽\nКарт в колоде: ${deck.length}\nВаша ставка (1–${balance}):`);
        if (betInput === null) break;

        let bet = parseInt(betInput);
        if (isNaN(bet) || bet < 1 || bet > balance) {
            alert("Некорректная ставка. Попробуй снова.");
            continue;
        }

        let playerHand = [deck.shift(), deck.shift()];
        let dealerHand = [deck.shift(), deck.shift()];

        let playerScore = calcScore(playerHand);
        let dealerScore = calcScore(dealerHand);

        let goldenPair = false;
        if (playerScore === 22) {
            alert(`🃏 Ваши карты: ${handToString(playerHand)}\n\n👑 ДВА ТУЗА — самая сильная комбинация!`);
            goldenPair = true;
        }

        else if (playerScore === 21) {
            alert(`🃏 Ваши карты: ${handToString(playerHand)} (сумма: 21)\n\n🎉 21 с первых карт — победная комбинация!`);
        }

        else {
            while (true) {
                if (playerScore > 21) {
                    alert(`🃏 Ваши карты: ${handToString(playerHand)} (сумма: ${playerScore})\n\n\n Вы перебрали`)
                    break;
                }

                let hit = confirm(`🃏 Ваши карты: ${handToString(playerHand)} (сумма: ${playerScore})\n\n\nОК — взять карту\nОтмена — остановиться`);
                if (!hit) break;

                playerHand.push(deck.shift());
                playerScore = calcScore(playerHand);

                if (calcScore(playerHand) === 21) {
                    alert(`🃏 Ваши карты: ${handToString(playerHand)}\n\n🎯 Ровно 21! Останавливаемся.`);
                    break;
                }
            }
        }

        let dealerGoldenPair = dealerScore === 22;

        alert("Теперь посмотрим что вытянет компьютер")
        while (calcScore(dealerHand) < 17) {
            dealerHand.push(deck.shift());
        }

        dealerScore = calcScore(dealerHand);
        let result = "";

        if (goldenPair && dealerGoldenPair) {
            result = `🤝 Ничья! У обоих два туза!\nСтавка возвращена`;

        } else if (dealerGoldenPair) {
            balance -= bet;
            result = `👑 У компьютера два туза!\nВы проиграли ${bet}₽`;

        } else if (goldenPair) {
            balance += bet;
            result = `👑 ДВА ТУЗА — победа!\nВы выиграли ${bet}₽`;
        }
        else if (playerScore > 21 && dealerScore <= 21) {
            balance -= bet;
            result = `💥 Перебор! (${playerScore})\nВы проиграли ${bet}₽`;
        } else if ((playerScore === dealerScore) || (playerScore > 21 && dealerScore > 21)) {
            result = `🤝 Ничья! (${playerScore} vs ${dealerScore})\nСтавка возвращена`;

        } else if (dealerScore > 21 || playerScore > dealerScore) {
            balance += bet;
            result = `🎉 Победа! (${playerScore} vs ${dealerScore})\nВы выиграли ${bet}₽`;

        } else {
            balance -= bet;
            result = `😞 Компьютер выиграл (${playerScore} vs ${dealerScore})\nВы проиграли ${bet}₽`;
        }

        let continueGame = confirm(`${result}\n\n🃏 Ваши карты: ${handToString(playerHand)}(${playerScore})\n🃏 Карты компьютера: ${handToString(dealerHand)}(${dealerScore})\n\n💰 Баланс: ${balance}₽\n\nОК — играть ещё\nОтмена — выйти`);
        if (!continueGame) break;
    }

    if (balance <= 0) {
        alert("💸 Баланс на нуле. Игра окончена!");
    } else {
        alert(`👋 Спасибо за игру!\nФинальный баланс: ${balance}₽`);
    }
}