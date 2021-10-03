const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelect = document.querySelector("#movie");

populateUI();

let ticketPrice = Number(movieSelect.value);

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    // Copy selected seats into array
    // Map through array
    // return a new array of indexes
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerHTML = String(selectedSeatsCount);
    total.innerHTML = String(selectedSeatsCount * ticketPrice);
}

// Get data from local storage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if (selectedSeats && selectedSeats.length > 0) {
        selectedSeats.forEach((seat) => {
            seats[seat].classList.add("selected");
        });
        console.log(selectedSeats);
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener("change", (e) => {
    ticketPrice = Number(e.target.value);
    updateSelectedCount();

    setMovieData(e.target.selectedIndex, e.target.value);
});

// Seat click event
container.addEventListener("click", (e) => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
});

// Initial count and total set
updateSelectedCount();
