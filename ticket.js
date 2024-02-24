const selectedSeats = [];
const couponCodefor15 = "NEW15";
const couponCodefor20 = "Couple 20";
const seats = [
  "A1",
  "A2",
  "A3",
  "A4",
  "B1",
  "B2",
  "B3",
  "B4",
  "C1",
  "C2",
  "C3",
  "C4",
  "D1",
  "D2",
  "D3",
  "D4",
  "E1",
  "E2",
  "E3",
  "E4",
  "F1",
  "F2",
  "F3",
  "F4",
  "G1",
  "G2",
  "G3",
  "G4",
  "H1",
  "H2",
  "H3",
  "H4",
  "I1",
  "I2",
  "I3",
  "I4",
  "J1",
  "J2",
  "J3",
  "J4",
];

const nextButton = document.getElementById("next_button");
const grandTotal = document.getElementById("grand_total");
const applyCoupon = document.getElementById("apply_coupon_code");
const discountText = document.getElementById("discount_text");
const couponBox = document.getElementById("coupon");

function handleClickEvent(event) {
  const target = event.target;
  const buttonClickedId = target.innerText;

  const buttonClicked = document.getElementById(buttonClickedId);

  if (selectedSeats.includes(buttonClickedId)) {
    selectedSeats.splice(selectedSeats.indexOf(buttonClickedId), 1);
    buttonClicked.classList.remove("bg-green-500");
    buttonClicked.classList.add("bg-gray-200");
  } else {
    if (!seats.includes(buttonClickedId)) {
      return;
    }

    if (selectedSeats.length === 4) {
      alert("You can select maximum 4 seats");
      return;
    }
    selectedSeats.push(buttonClickedId);
    buttonClicked.classList.remove("bg-gray-200");
    buttonClicked.classList.add("bg-green-500");
  }

  const seatCountElement = document.getElementById("seat_count");
  seatCountElement.innerText = selectedSeats.length;

  /**
   * 
    <div class="flex justify-between mx-10">
        <div>
        <p class="font-bold">C2</p>
        </div>
        <div>
        <p class="font-bold">Economy</p>
        </div>
        <div>
        <p class="font-bold">550</p>
        </div>
    </div>
   * 
   */

  const seatDetails = document.getElementById("seat_details");
  seatDetails.innerHTML = "";
  selectedSeats.forEach((seat) => {
    const seatDiv = document.createElement("div");
    seatDiv.classList.add("flex", "justify-between", "md:mx-10");
    const seatName = document.createElement("div");
    seatName.innerHTML = `<p class="font-bold">${seat}</p>`;
    const seatType = document.createElement("div");
    seatType.innerHTML = `<p class="font-bold">Economy</p>`;
    const seatPrice = document.createElement("div");
    seatPrice.innerHTML = `<p class="font-bold">550</p>`;
    seatDiv.appendChild(seatName);
    seatDiv.appendChild(seatType);
    seatDiv.appendChild(seatPrice);
    seatDetails.appendChild(seatDiv);
  });

  //   total price
  const totalPrice = document.getElementById("total_price");
  totalPrice.innerText = `Total Price: BDT ${selectedSeats.length * 550}`;

  // Grand total
  grandTotal.innerText = `Grand Total: BDT ${selectedSeats.length * 550}`;

  //   seat left
  const seatLeft = document.getElementById("seats_left");
  seatLeft.innerText = `${40 - selectedSeats.length} Seats left`;

  //   coupn box
  if (selectedSeats.length === 4) {
    couponBox.classList.remove("hidden");
    couponBox.classList.add("block");
  } else {
    couponBox.classList.remove("block");
    couponBox.classList.add("hidden");
  }

  // apply coupon code
  applyCoupon.addEventListener("click", handleDiscount);

  // passenger details
  const phoneNumber = document.getElementById("phone_number");
  phoneNumber.addEventListener("input", handlePhoneNumberChange);

  const modalCloseBtn = document.getElementById("modal_close_btn");
  modalCloseBtn.addEventListener("click", handleReset);
}

function handlePhoneNumberChange(event) {
  const phoneNumber = event.target.value;
  if (phoneNumber.length === 11) {
    nextButton.disabled = false;
  } else {
    nextButton.disabled = true;
  }
}

function handleDiscount() {
  const couponCode = document.getElementById("coupon_code").value;
  if (couponCode === couponCodefor15) {
    grandTotal.innerText = `Grand Total: BDT ${
      selectedSeats.length * 550 * 0.85
    }`;
    discountText.innerText = "15% discount applied";
    couponBox.classList.remove("block");
    couponBox.classList.add("hidden");
  } else if (couponCode === couponCodefor20) {
    grandTotal.innerText = `Grand Total: BDT ${
      selectedSeats.length * 550 * 0.8
    }`;
    discountText.innerText = "20% discount applied";
    couponBox.classList.remove("block");
    couponBox.classList.add("hidden");
  } else if (
    couponCode &&
    couponCode !== couponCodefor15 &&
    couponCode !== couponCodefor20
  ) {
    alert("Invalid coupon code");
    return;
  }
}

function handleReset() {
  selectedSeats.forEach((seat) => {
    const seatElement = document.getElementById(seat);
    seatElement.classList.remove("bg-green-500");
    seatElement.classList.add("bg-gray-200");
  });
  const phoneNumber = document.getElementById("phone_number");
  phoneNumber.value = "";
  nextButton.disabled = true;
  grandTotal.innerText = "Grand Total: BDT 0";
  discountText.innerText = "";
  const couponBox = document.getElementById("coupon");
  couponBox.classList.remove("block");
  couponBox.classList.add("hidden");
  const seatCountElement = document.getElementById("seat_count");
  seatCountElement.innerText = 0;
  const seatDetails = document.getElementById("seat_details");
  seatDetails.innerHTML = "";
  const totalPrice = document.getElementById("total_price");
  totalPrice.innerText = "Total Price: BDT 0";
  const seatLeft = document.getElementById("seats_left");
  seatLeft.innerText = "40 Seats left";
  selectedSeats.length = 0;
  const couponCode = document.getElementById("coupon_code");
  couponCode.value = "";
}

document.addEventListener("click", handleClickEvent);
