document.addEventListener("DOMContentLoaded", function () {
    const calculateBtn = document.getElementById('calculate-btn');
    const dayInput = document.getElementById('dob-day');
    const monthInput = document.getElementById('dob-month');
    const yearInput = document.getElementById('dob-year');
    const dayError = document.getElementById('day-error');
    const monthError = document.getElementById('month-error');
    const yearError = document.getElementById('year-error');
    const resultContainer = document.getElementById('result');
    const yearsDisplay = document.getElementById('years');
    const monthsDisplay = document.getElementById('months');
    const daysDisplay = document.getElementById('days');

    // Add input validation
    dayInput.addEventListener('input', validateDay);
    monthInput.addEventListener('input', validateMonth);
    yearInput.addEventListener('input', validateYear);

    calculateBtn.addEventListener('click', calculateAge);

    function validateDay() {
        const day = parseInt(dayInput.value);
        const month = parseInt(monthInput.value) || 1;
        const year = parseInt(yearInput.value) || new Date().getFullYear();
        const daysInMonth = new Date(year, month, 0).getDate();

        if (isNaN(day) || day < 1 || day > 31) {
            dayError.classList.add('show');
            return false;
        }

        // Check for months with fewer than 31 days
        if (day > daysInMonth) {
            dayError.textContent = `This month only has ${daysInMonth} days`;
            dayError.classList.add('show');
            return false;
        }

        dayError.classList.remove('show');
        return true;
    }

    function validateMonth() {
        const month = parseInt(monthInput.value);

        if (isNaN(month) || month < 1 || month > 12) {
            monthError.classList.add('show');
            return false;
        }

        monthError.classList.remove('show');
        return true;
    }

    function validateYear() {
        const year = parseInt(yearInput.value);
        const currentYear = new Date().getFullYear();

        if (isNaN(year) || year < 1900 || year > currentYear) {
            yearError.textContent = `Please enter a valid year (1900-${currentYear})`;
            yearError.classList.add('show');
            return false;
        }

        yearError.classList.remove('show');
        return true;
    }

    function validateDate() {
        // First validate year, month, day in order
        const yearValid = validateYear();
        const monthValid = yearValid && validateMonth();
        const dayValid = monthValid && validateDay();

        return dayValid;
    }

    function calculateAge() {
        // Validate inputs first
        if (!validateDate()) {
            resultContainer.classList.remove('show');
            return;
        }

        const day = parseInt(dayInput.value);
        const month = parseInt(monthInput.value);
        const year = parseInt(yearInput.value);

        const birthDate = new Date(year, month - 1, day);
        const today = new Date();

        // Check if birth date is in the future
        if (birthDate > today) {
            yearError.textContent = "Birth date cannot be in the future";
            yearError.classList.add('show');
            resultContainer.classList.remove('show');
            return;
        } else {
            yearError.classList.remove('show');
        }

        // Calculate the difference
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        // Adjust for negative months or days
        if (days < 0) {
            months--;
            const lastMonthDate = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonthDate.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }


        // Update the UI
        yearsDisplay.textContent = years;
        monthsDisplay.textContent = months;
        daysDisplay.textContent = days;

        // Show the result
        resultContainer.classList.add('show');
    }
});
