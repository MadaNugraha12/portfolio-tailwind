document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // LOGIKA KALKULATOR KONVERSI BINER
    // ==========================================
    const modeSelect = document.getElementById("modeSelect");
    const numberInput = document.getElementById("numberInput");
    const inputLabel = document.getElementById("inputLabel");
    const convertBtn = document.getElementById("convertBtn");
    const resultDisplay = document.getElementById("resultDisplay");
    const logicSteps = document.getElementById("logicSteps");
    const errorMessage = document.getElementById("errorMessage");

    if (!modeSelect || !numberInput) return; // Mencegah error jika dibuka di halaman selain calculator.html

    // Ubah label & reset saat mode diganti
    modeSelect.addEventListener("change", function () {
        numberInput.value = "";
        resultDisplay.innerText = "0";
        logicSteps.innerHTML = "Waiting for input...";
        errorMessage.classList.add("hidden");

        if (modeSelect.value === "binToDec") {
            inputLabel.innerText = "Enter Binary Number (e.g. 10110)";
            numberInput.placeholder = "Type 0 or 1...";
        } else {
            inputLabel.innerText = "Enter Decimal Number (e.g. 22)";
            numberInput.placeholder = "Type base 10 number...";
        }
    });

    // Jalankan konversi saat tombol diklik atau tekan Enter
    convertBtn.addEventListener("click", processConversion);
    numberInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") processConversion();
    });

    function processConversion() {
        const val = numberInput.value.trim();
        const mode = modeSelect.value;
        errorMessage.classList.add("hidden");

        if (val === "") {
            showError("Input cannot be empty!");
            return;
        }

        if (mode === "binToDec") {
            // Validasi biner (hanya angka 0 dan 1)
            if (!/^[01]+$/.test(val)) {
                showError("Binary input can only contain 0 and 1!");
                return;
            }
            convertBinaryToDecimal(val);
        } else {
            // Validasi desimal (hanya angka bulat positif)
            if (!/^\d+$/.test(val)) {
                showError("Decimal input must be a positive integer!");
                return;
            }
            convertDecimalToBinary(parseInt(val, 10));
        }
    }

    function showError(msg) {
        errorMessage.innerHTML = `<i class="fa-solid fa-circle-exclamation me-1"></i> ${msg}`;
        errorMessage.classList.remove("hidden");
        resultDisplay.innerText = "Error";
        logicSteps.innerHTML = `<span class="text-red-400">${msg}</span>`;
    }

    // LOGIKA MATEMATIKA: Biner ke Desimal
    function convertBinaryToDecimal(binStr) {
        let decimalValue = 0;
        let stepsHTML = [];
        const len = binStr.length;

        for (let i = 0; i < len; i++) {
            const digit = parseInt(binStr[i], 10);
            const power = len - 1 - i;
            const termValue = digit * Math.pow(2, power);
            decimalValue += termValue;

            stepsHTML.push(
                `<span>Bit [${digit}] × 2<sup>${power}</sup> = <b>${termValue}</b></span>`
            );
        }

        resultDisplay.innerText = decimalValue;
        logicSteps.innerHTML = stepsHTML.join("<br>") + 
            `<hr class="border-slate-800 my-2"><b>Sum = ${decimalValue} (Decimal)</b>`;
    }

    // LOGIKA MATEMATIKA: Desimal ke Biner
    function convertDecimalToBinary(decNum) {
        if (decNum === 0) {
            resultDisplay.innerText = "0";
            logicSteps.innerHTML = "0 ÷ 2 = 0 (Remainder: 0)";
            return;
        }

        let tempNum = decNum;
        let remainders = [];
        let stepsHTML = [];

        while (tempNum > 0) {
            let rem = tempNum % 2;
            let quotient = Math.floor(tempNum / 2);

            stepsHTML.push(`${tempNum} ÷ 2 = ${quotient} (Remainder: <b>${rem}</b>)`);
            remainders.push(rem);
            tempNum = quotient;
        }

        const binaryStr = remainders.reverse().join("");

        resultDisplay.innerText = binaryStr;
        logicSteps.innerHTML = stepsHTML.join("<br>") + 
            `<hr class="border-slate-800 my-2"><b>Binary (Read remainders backwards) = ${binaryStr}</b>`;
    }
});