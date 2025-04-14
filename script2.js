        // Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Custom Duration Toggle
        const durationSelect = document.getElementById('duration');
        const customDurationGroup = document.getElementById('customDurationGroup');
        
        durationSelect.addEventListener('change', () => {
            if (durationSelect.value === 'custom') {
                customDurationGroup.style.display = 'block';
            } else {
                customDurationGroup.style.display = 'none';
            }
        });
        
        // Calculate Budget
        const calculateBtn = document.getElementById('calculateBtn');
        const budgetResults = document.getElementById('budgetResults');
        
        calculateBtn.addEventListener('click', () => {
            // Get form values
            const journeyType = document.getElementById('journeyType').value;
            const packageType = document.getElementById('packageType').value;
            const duration = document.getElementById('duration').value === 'custom' 
                ? document.getElementById('customDuration').value 
                : document.getElementById('duration').value;
            const travelers = document.getElementById('travelers').value;
            const airline = document.getElementById('airline').value;
            const hotelCategory = document.getElementById('hotelCategory').value;
            const roomType = document.getElementById('roomType').value;
            const mealPlan = document.getElementById('mealPlan').value;
            const transportType = document.getElementById('transportType').value;
            
            // Calculate base costs (this is simplified - in a real app you'd have a more complex pricing model)
            let baseCost = 0;
            let flightCost = 0;
            let accommodationCost = 0;
            let transportCost = 0;
            let visaCost = 0;
            let mealsCost = 0;
            let otherCost = 0;
            
            // Journey type basic costs
            if (journeyType === 'umrah') {
                baseCost = 1500;
            } else if (journeyType === 'hajj') {
                baseCost = 4500;
            } else if (journeyType === 'umrahPlus') {
                baseCost = 2000;
            }
            
            // Package multipliers
            let packageMultiplier = 1;
            if (packageType === 'standard') packageMultiplier = 1.2;
            if (packageType === 'premium') packageMultiplier = 1.5;
            if (packageType === 'vip') packageMultiplier = 2;
            
            // Hotel costs
            let hotelBasePrice = 50; // per night
            if (hotelCategory === '4star') hotelBasePrice = 80;
            if (hotelCategory === '5star') hotelBasePrice = 120;
            if (hotelCategory === 'luxury') hotelBasePrice = 200;
            
            // Room type multipliers
            let roomMultiplier = 1;
            if (roomType === 'triple') roomMultiplier = 0.8;
            if (roomType === 'quad') roomMultiplier = 0.7;
            if (roomType === 'suite') roomMultiplier = 1.5;
            
            // Airline costs
            let airlineMultiplier = 1;
            if (airline === 'garuda') airlineMultiplier = 1.2;
            if (airline === 'emirates') airlineMultiplier = 1.3;
            if (airline === 'etihad') airlineMultiplier = 1.25;
            if (airline === 'qatar') airlineMultiplier = 1.35;
            
            // Transportation costs
            let transportBasePrice = 200;
            if (transportType === 'premium') transportBasePrice = 350;
            if (transportType === 'private') transportBasePrice = 600;
            
            // Meal costs
            let mealBasePrice = 15; // per day
            if (mealPlan === 'halfBoard') mealBasePrice = 25;
            if (mealPlan === 'fullBoard') mealBasePrice = 40;
            
            // Calculate individual components
            flightCost = Math.round(600 * airlineMultiplier);
            accommodationCost = Math.round(hotelBasePrice * parseInt(duration) * roomMultiplier);
            transportCost = Math.round(transportBasePrice * (parseInt(duration) / 10));
            
            visaCost = journeyType === 'hajj' ? 450 : 300;
            mealsCost = Math.round(mealBasePrice * parseInt(duration));
            otherCost = Math.round((baseCost * packageMultiplier * 0.1));
            
            // Calculate total
            const totalCost = Math.round((flightCost + accommodationCost + transportCost + visaCost + mealsCost + otherCost) * packageMultiplier);
            
            // Update the UI
            document.getElementById('totalCost').textContent = `$${totalCost.toLocaleString()} per person`;
            document.getElementById('flightCost').textContent = `$${flightCost.toLocaleString()}`;
            document.getElementById('accommodationCost').textContent = `$${accommodationCost.toLocaleString()}`;
            document.getElementById('transportCost').textContent = `$${transportCost.toLocaleString()}`;
            document.getElementById('visaCost').textContent = `$${visaCost.toLocaleString()}`;
            document.getElementById('mealsCost').textContent = `$${mealsCost.toLocaleString()}`;
            document.getElementById('otherCost').textContent = `$${otherCost.toLocaleString()}`;
            
            // Update details
            const hotelCategoryText = {
                '3star': '3-Star',
                '4star': '4-Star',
                '5star': '5-Star',
                'luxury': 'Luxury'
            };
            
            const airlineText = {
                'any': 'Best Available',
                'garuda': 'Garuda Indonesia',
                'saudia': 'Saudia Airlines',
                'emirates': 'Emirates',
                'etihad': 'Etihad Airways',
                'qatar': 'Qatar Airways'
            };
            
            const mealPlanText = {
                'breakfast': 'Breakfast Only',
                'halfBoard': 'Half Board (B+D)',
                'fullBoard': 'Full Board (All Meals)'
            };
            
            const transportTypeText = {
                'standard': 'Shared Bus',
                'premium': 'Small Group Van',
                'private': 'Private Vehicle'
            };
            
            document.getElementById('flightDetails').textContent = `Round Trip, ${airlineText[airline]}`;
            document.getElementById('accommodationDetails').textContent = `${duration} nights, ${hotelCategoryText[hotelCategory]} Hotels`;
            document.getElementById('transportDetails').textContent = `${transportTypeText[transportType]}, All Transfers`;
            document.getElementById('visaDetails').textContent = `${journeyType.charAt(0).toUpperCase() + journeyType.slice(1)} Visa & Processing`;
            document.getElementById('mealsDetails').textContent = `${mealPlanText[mealPlan]}`;
            document.getElementById('otherDetails').textContent = 'Guide, Tips, Misc.';
            
            // Generate recommendations
            const recommendationsList = document.getElementById('recommendationsList');
            recommendationsList.innerHTML = '';
            
            // Add season-based recommendation
            const departureDate = new Date(document.getElementById('departureDate').value);
            const month = departureDate.getMonth();
            
            let seasonRec = '';
            if (month >= 3 && month <= 5) { // Spring
                seasonRec = 'Spring is a popular time for Umrah. Consider booking well in advance.';
            } else if (month >= 6 && month <= 8) { // Summer
                seasonRec = 'Summer can be extremely hot in Saudi Arabia. Pack appropriate clothing and stay hydrated.';
            } else if (month >= 9 && month <= 11) { // Fall
                seasonRec = 'Fall offers pleasant weather in Saudi Arabia, making it ideal for Umrah.';
            } else { // Winter
                seasonRec = 'Winter is peak season. Book early and expect higher prices.';
            }
            
            // Add recommendations based on selections
            const recommendations = [
                seasonRec,
                packageType === 'economy' ? 'Consider upgrading to a Standard package for more comfort during your journey.' : '',
                hotelCategory === '3star' ? 'A 4-Star hotel offers better proximity to the Haram at a moderate price increase.' : '',
                mealPlan === 'breakfast' ? 'Half Board meal plan provides better value and convenience during your stay.' : '',
                parseInt(duration) < 14 ? 'Adding a few more days to your journey would allow a more relaxed pace of worship.' : '',
                'Book at least 3 months in advance for better rates and availability.',
                'Consider adding Ziarah (historical sites visits) to enrich your spiritual journey.'
            ];
            
            recommendations.filter(r => r).forEach(rec => {
                const li = document.createElement('li');
                li.textContent = rec;
                recommendationsList.appendChild(li);
            });
            
            // Show results
            budgetResults.classList.add('active');
            
            // Scroll to results
            budgetResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        
        // Book Now Button
        document.getElementById('bookNowBtn').addEventListener('click', () => {
            alert('Thank you for your interest! A booking specialist will contact you shortly to finalize your journey details.');
            // In a real application, this would redirect to a booking page or form
        });
        
        // Save Quote Button
        document.getElementById('saveQuoteBtn').addEventListener('click', () => {
            alert('Your personalized quote has been saved! You can access it anytime from your account or via the email we just sent you.');
            // In a real application, this would save the quote to user's account or send via email
        });
        
        // Set min date to today
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const minDate = tomorrow.toISOString().split('T')[0];
        document.getElementById('departureDate').setAttribute('min', minDate);
        document.getElementById('departureDate').value = minDate;
        
        // Sticky Header
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            header.classList.toggle('sticky', window.scrollY > 0);
        });

  // Nonaktifkan tombol F12, Ctrl+Shift+I, Ctrl+U
        document.addEventListener('keydown', function(e) {
          if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
            (e.ctrlKey && e.key === 'U')
          ) {
            e.preventDefault();
          }
        });
        document.getElementById("konten").innerHTML = atob("SGFsbzogSmlrYSBhZGFsYWggdGFtcGlsIGxpaGF0Lg==");

