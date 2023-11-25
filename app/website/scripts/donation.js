

/*
function donate() {
    console.log("Test123");
    let totalBitcoinsElement = document.getElementById('total-bitcoins');
    let donationInputElement = document.getElementById('donation-input');
    let donateButton = document.getElementById('donate-button');
    

    let totalBitcoins = parseInt(totalBitcoinsElement.textContent);

    if(donateButton){
        donateButton.addEventListener('click', function () {
            const donatedBitcoins = parseInt(donationInputElement.value, 10);

            if (!isNaN(donatedBitcoins) && donatedBitcoins > 0) {
                totalBitcoins += donatedBitcoins;
                totalBitcoinsElement.textContent = totalBitcoins;
            } else {
                alert('Please enter a valid positive integer for donation.');
            }

            // Clear the input field after donation
            donationInputElement.value = '';
        });
    }
    */

