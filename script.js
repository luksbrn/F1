document.addEventListener("DOMContentLoaded", function() {
    const raceTrack = document.getElementById("race-track");
    const betAmountInput = document.getElementById("bet-amount");
    const driverSelect = document.getElementById("driver-select");
    const placeBetBtn = document.getElementById("place-bet");

    const carWidth = 50;
    const trackWidth = raceTrack.clientWidth;
    const finishLine = trackWidth - carWidth;

    let balance = 100; 
    let profit = 0;

    const balanceSpan = document.getElementById("balance");
    const profitSpan = document.getElementById("profit");

    function updateBalanceAndProfit() {
        balanceSpan.textContent = `R$${balance.toFixed(2)}`;
        profitSpan.textContent = `R$${profit.toFixed(2)}`;
    }

    placeBetBtn.addEventListener("click", function() {
        const betAmount = parseInt(betAmountInput.value);
        const selectedDriver = parseInt(driverSelect.value);

        if (betAmount <= balance) {
            balance -= betAmount;
            profit += betAmount; 
            updateBalanceAndProfit();
            startRace(selectedDriver);
        } else {
            alert("Insufficient balance!");
        }
    });

    function startRace(selectedDriver) {
        let cars = document.querySelectorAll(".car");
        cars[selectedDriver - 1].style.backgroundColor = "blue"; 

        const raceInterval = setInterval(function() {
            cars.forEach(function(car, index) {
                let currentPosition = parseInt(car.style.left) || 0;
                let randomDistance = Math.floor(Math.random() * 10) + 1; 

                currentPosition += randomDistance;
                car.style.left = currentPosition + "px";

                if (currentPosition >= finishLine) {
                    clearInterval(raceInterval);
                    announceResult(index + 1, selectedDriver);
                }
            });
        }, 50);
    }

    function announceResult(winningDriver, selectedDriver) {
        const resultMessage = winningDriver === selectedDriver ? "You won!" : "You lost!";
        alert(resultMessage);
        resetRace();
    }

    function resetRace() {
        let cars = document.querySelectorAll(".car");
        cars.forEach(function(car) {
            car.style.left = 0;
            car.style.backgroundColor = "#ccc";
        });
    }
    function addCarsToTrack() {
        for (let i = 0; i < 5; i++) {
            const car = document.createElement("div");
            car.classList.add("car");
            car.style.top = i * 40 + "px"; 
            raceTrack.appendChild(car);
        }
    }

    addCarsToTrack();
});