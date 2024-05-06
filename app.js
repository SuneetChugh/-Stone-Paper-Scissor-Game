let user = 0;
let computer = 0;
const u = document.getElementById("user");
const c = document.getElementById("computer");
const choices = document.querySelectorAll(".choice");
const msg = document.getElementById("msg");
let turns = 0;
let timerInterval;

const compChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randIndex = Math.floor(Math.random() * 3);
    return options[randIndex];
}

const draw = () => {
    console.log("Game was a draw");
    msg.innerText = "It's a Draw!";
    msg.style.backgroundColor = "grey";
}

const showWinner = (userWin, userChoice, comp) => {
    if (userWin) {
        console.log("You won, how unexpected.");
        user++;
        u.innerText = user;
        msg.innerText = `${userChoice.charAt(0).toUpperCase() + userChoice.slice(1)} won over Computer's ${comp}!`;
        msg.style.backgroundColor = "green";
    } else {
        console.log("You lost, as predicted.");
        computer++;
        c.innerText = computer;
        msg.innerText = `${userChoice.charAt(0).toUpperCase() + userChoice.slice(1)} lost against Computer's ${comp}!`;
        msg.style.backgroundColor = "red";
    }
};

const playGame = (choiceId) => {
    console.log("User choice =", choiceId);
    const comp = compChoice();
    console.log("Computer Choice =", comp);
    turns++;

    if (choiceId === comp) {
        draw();
    } else {
        let userWin = true;
        if (choiceId === "rock") {
            userWin = comp === "paper" ? false : true;
        } else if (choiceId === "paper") {
            userWin = comp === "scissor" ? false : true;
        } else {
            userWin = comp === "rock" ? false : true;
        }
        showWinner(userWin, choiceId, comp);
    }

    if (user === 10 || computer === 10) {
        const winner = user > computer ? "You" : "Computer";
        msg.innerText = `Game ended! The winner is ${winner} with ${winner === "You" ? user : computer} points!`;

        setTimeout(() => {
            const continueGame = confirm("Do you want to continue playing?");
            if (continueGame) {
                location.reload();
            } else {
                msg.innerText = "Thanks for playing!";
                let countdown = 3;
                timerInterval = setInterval(() => {
                    if (countdown === 0) {
                        clearInterval(timerInterval);
                        msg.innerText = "Closing the window...";
                        setTimeout(() => {
                            window.close();
                        }, 1000);
                    } else {
                        msg.innerText = `Closing the window in ${countdown} seconds...`;
                        countdown--;
                    }
                }, 1000);
            }
        }, 2000);
    }
};

// Start the game when the user clicks on a choice
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        playGame(choice.id);
    });
});
