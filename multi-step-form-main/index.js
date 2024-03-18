document.addEventListener('DOMContentLoaded', function () {
    const steps = document.querySelectorAll('.stp');
    const nextBtn = document.getElementById('next');
    const backBtn = document.getElementById('back');
    const circles = document.querySelectorAll('.circle div');
    const circle1 = document.querySelector('.circle1')
    const planButtons = document.querySelectorAll('.plan');
    const switcherInput = document.querySelector('.switch input');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const planName = document.querySelector('.plan-name');
    const planPrice = document.querySelector('.plan-price');
    const serviceName = document.querySelector('.service-name')
    const servicePrice = document.querySelector('.service-price');
    const totalPrice = document.querySelector('.total b');


    let currentStep = 0;  // Track the current step
    let price = 0;


    steps.forEach((step, index) => {
        if (index !== 0) {
            step.style.display = 'none';
        }
    });



    function checkInputs() {
        const inputs = document.querySelectorAll('.inputs .inputfield'); // Select all input fields
        const errorMessages = document.querySelectorAll('.inputs .error'); // Select all error messages

        let allInputsFilled = true; // Assume all inputs are filled initially

        inputs.forEach((input, index) => {
            const errorMessage = errorMessages[index]; // Get the corresponding error message

            if (input.value.trim() === '') {
                // If input is empty, display error message and change flag to false
                errorMessage.textContent = 'This field is required';
                errorMessage.style.color = 'red';
                allInputsFilled = false;
            } else {
                // If input is filled, clear error message
                errorMessage.textContent = '';
            }
        });

        if (allInputsFilled) {
            next();
        }
    };


    function updateActiveCircle(currentStep) {
        circles.forEach((circle, index) => {
            if (index + 1 === currentStep) {
                circle.classList.add('active');
                circle1.style.backgroundColor = 'transparent';
                circle1.style.color = 'white'
            } else {
                circle.classList.remove('active');
            }
        });
    }

    function getCurrentStep() {
        steps.forEach((step, index) => {
            if (step.style.display !== 'none') {
                currentStep = index + 1; // Since index is zero-based, we add 1 to get the step number
            }
        });
        return currentStep;
    }

    // Function to navigate between pages
    function navigatePages(currentStep, nextStep) {
        const currentPage = document.querySelector(`.stp.step${currentStep}`); // Get the current page element
        const nextPage = document.querySelector(`.stp.step${nextStep}`); // Get the next page element

        currentPage.style.display = 'none'; // Hide current page
        nextPage.style.display = 'block'; // Show next page

        updateActiveCircle(nextStep);

    }


    function next() {
        const currentStep = getCurrentStep(); // Get the current step number
        const nextStep = currentStep + 1; // Calculate the next step number
        navigatePages(currentStep, nextStep);

    }

    function back() {
        const currentStep = getCurrentStep(); // Get the current step number
        const prevStep = currentStep - 1; // Calculate the previous step number

        navigatePages(currentStep, prevStep); // Navigate to the previous page
    };



    // Select all plan buttons
    // Add event listener to each plan button
    let selectedPlan = '';
    planButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove border color from all buttons
            planButtons.forEach(btn => {
                btn.style.borderColor = 'hsl(213, 96%, 18%)';
            });
            // Add border color to the clicked button
            button.style.borderColor = 'blue';
            // Store the selected plan and price
            selectedPlan = button.querySelector('p').textContent.trim();
            let selectedPrice = button.querySelector('#price').textContent;
            let selectedPlanPrice = parseInt(selectedPrice.replace(/\D/g, ''), 10);
            price = selectedPlanPrice;
            planName.textContent = selectedPlan;
            planPrice.textContent = selectedPrice;
            finalTotal()
        });
    });



    // Define monthly prices for each plan
    const monthlyPrices = {
        'Arcade': 9,
        'Advanced': 12,
        'Pro': 15
    }
// Define yearly prices for each plan
    const yearlyPrices = {
        'Arcade': 90,
        'Advanced': 120,
        'Pro': 150
    };

    // Add event listener to the switcher
    switcherInput.addEventListener('change', () => {
        const yearlyOption = document.querySelector('.yearly');
        const monthlyOption = document.querySelector('.monthly');
        const planButtons = document.querySelectorAll('.plan');

        if (switcherInput.checked) {
            // Yearly option selected
            yearlyOption.classList.add('sw-active');
            monthlyOption.classList.remove('sw-active');
            planButtons.forEach(button => {
                const planName = button.querySelector('p').textContent.trim();
                const span = button.querySelector('span');
                const yearlyPrice = yearlyPrices[planName];
                if (yearlyPrice) {
                    span.textContent = `$${yearlyPrice}/yr`;
                }
            });
        } else {
            // Monthly option selected
            yearlyOption.classList.remove('sw-active');
            monthlyOption.classList.add('sw-active');
            planButtons.forEach(button => {
                const planName = button.querySelector('p').textContent.trim();
                const span = button.querySelector('span');
                const monthlyPrice = monthlyPrices[planName];
                if (monthlyPrice) {
                    span.textContent = `$${monthlyPrice}/mo`;
                }
            });
        }
        back();
        next();

    });


    let selectedAddonsPrice = 0; // Initialize total price for selected addons
    let selectedAddonsLabels = []; // Initialize array to store labels of selected addons

    // Add event listener to checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {

            const isChecked = checkbox.checked; // Check if the checkbox is checked or unchecked
            const boxId = checkbox.id; // Get the ID of the checkbox
            const addonBox = document.querySelector(`.box input#${boxId}`);
            const addonLabel = addonBox.nextElementSibling.querySelector('label').textContent; // Get the addon label
            const addonPrice = parseInt(addonBox.nextElementSibling.nextElementSibling.textContent.replace(/\D/g, ''), 10); // Get the addon price

            if (isChecked) {
                // If checkbox is checked, add addon label to selected addons labels array
                selectedAddonsLabels.push(addonLabel);
            } else {
                // If checkbox is unchecked, remove addon label from selected addons labels array
                const index = selectedAddonsLabels.indexOf(addonLabel);
                if (index !== -1) {
                    selectedAddonsLabels.splice(index, 1);
                }
            }

            // If checkbox is checked, add addon price to total price; otherwise, subtract it
            selectedAddonsPrice += isChecked ? addonPrice : -addonPrice;
            finalTotal()
            // Log selected addon labels, total price of selected addons for testing
            console.log(selectedAddonsLabels);
            console.log(selectedAddonsPrice);

        });
    });





    function finalTotal() {
        // Calculate total price
        const total = price + selectedAddonsPrice;
        totalPrice.textContent = `$${total}`;
        planName.textContent = selectedPlan;
        planPrice.textContent = `$${price}`;
        serviceName.textContent = selectedAddonsLabels;
        servicePrice.textContent = `$${selectedAddonsPrice}`;


        console.log("Total Price:", total);
        console.log("Selected Addons Labels:", selectedAddonsLabels);
        console.log("Selected Addons Price:", selectedAddonsPrice);
    }





    nextBtn.addEventListener('click', next)
    backBtn.addEventListener('click', back)
    document.getElementById('step1-next').addEventListener('click', checkInputs);
    document.getElementById('nextStep3').addEventListener('click', next);

    document.getElementById('backStep3').addEventListener('click', back);

    document.getElementById('nextStep4').addEventListener('click', next);

    document.getElementById('backStep4').addEventListener('click', back);

})