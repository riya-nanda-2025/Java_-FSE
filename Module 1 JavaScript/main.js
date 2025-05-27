// 1. JavaScript Basics & Setup
console.log("Welcome to the Community Portal");

// Function to show a custom message box instead of alert()
function showMessageBox(message, type = 'success') {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;
    messageBox.className = `message-box ${type}`; // Add type class for styling (success/error)
    messageBox.classList.add('show');

    setTimeout(() => {
        messageBox.classList.remove('show');
        // Optional: Hide the element completely after transition for accessibility/layout
        setTimeout(() => messageBox.style.display = 'none', 300);
    }, 3000); // Message disappears after 3 seconds
}

// Notify when the page is fully loaded using the custom message box
window.onload = function() {
    showMessageBox("Page fully loaded! Welcome to the Community Portal!", "success");
};

// --- Mock Data for Events ---
// This will simulate fetching data from an API
let events = []; // Will be populated by mock API fetch

// 5. Objects and Prototypes (using ES6 Class syntax)
class Event {
    constructor(id, name, date, location, category, seats) {
        this.id = id;
        this.name = name;
        this.date = new Date(date); // Store date as Date object
        this.location = location;
        this.category = category;
        this.seatsAvailable = seats;
        this.registeredUsers = []; // To track registrations for this specific event
    }

    // Method added to the prototype (class methods are automatically on prototype)
    checkAvailability() {
        return this.seatsAvailable > 0;
    }

    register() {
        if (this.checkAvailability()) {
            this.seatsAvailable--;
            // Simulate adding user to registeredUsers for this event
            // In a real app, you'd add user details here
            this.registeredUsers.push(`user_${Date.now()}`);
            return true;
        }
        return false;
    }

    cancelRegistration() {
        this.seatsAvailable++;
        // Simulate removing user from registeredUsers
        this.registeredUsers.pop(); // Simple pop for demonstration
        return true;
    }
}

// 4. Functions, Scope, Closures, Higher-Order Functions
/**
 * Adds a new event to the global events array.
 * @param {string} name - Name of the event.
 * @param {string} date - Date of the event (e.g., 'YYYY-MM-DD').
 * @param {string} location - Location of the event.
 * @param {string} category - Category of the event.
 * @param {number} seats - Number of available seats.
 * @returns {Event} The newly created Event object.
 */
function addEvent(name, date, location, category, seats) {
    // Generate a simple unique ID for the event
    const id = `event_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const newEvent = new Event(id, name, date, location, category, seats);
    events.push(newEvent);
    return newEvent;
}

/**
 * Registers a user for a specific event.
 * @param {string} eventId - The ID of the event to register for.
 * @returns {boolean} True if registration was successful, false otherwise.
 */
function registerUser(eventId) {
    // 3. Conditionals, Loops, and Error Handling - Wrap registration logic in try-catch
    try {
        const eventToRegister = events.find(event => event.id === eventId);

        if (!eventToRegister) {
            throw new Error("Event not found.");
        }

        // 3. Conditionals - Check if event is in the past (mocking for demonstration)
        // In a real app, you'd compare against current date
        if (eventToRegister.date < new Date('2025-01-01')) { // Example: events before 2025-01-01 are "past"
            throw new Error("Cannot register for past events.");
        }

        if (eventToRegister.register()) {
            // 2. Syntax, Data Types, and Operators - Manage seat count (done within Event.register())
            // Also demonstrates using template literals for messages
            showMessageBox(`Successfully registered for "${eventToRegister.name}"! Seats left: ${eventToRegister.seatsAvailable}`, "success");
            return true;
        } else {
            throw new Error(`Registration failed for "${eventToRegister.name}". No seats available.`);
        }
    } catch (error) {
        console.error("Registration Error:", error.message);
        showMessageBox(`Registration failed: ${error.message}`, "error");
        return false;
    }
}

/**
 * Returns a function that tracks total registrations for a given category.
 * Demonstrates closure.
 * @param {string} category - The category to track registrations for.
 * @returns {function(number): number} A function that takes a number (registrations) and returns the updated total.
 */
function createCategoryRegistrationTracker(category) {
    let totalRegistrations = 0; // This variable is "closed over" by the inner function

    return function(newRegistrations = 1) {
        totalRegistrations += newRegistrations;
        console.log(`Total registrations for ${category}: ${totalRegistrations}`);
        return totalRegistrations;
    };
}

// Example usage of closure:
const musicRegistrationTracker = createCategoryRegistrationTracker("Music");
const workshopRegistrationTracker = createCategoryRegistrationTracker("Workshop");


// 4. Higher-Order Functions - Pass callbacks to filter functions for dynamic search
/**
 * Filters events by category and applies a callback function.
 * @param {string} category - The category to filter by ('all' for no filter).
 * @param {function(Event[]): void} callback - A function to execute with the filtered events.
 * @returns {Event[]} The filtered array of events.
 */
function filterEventsByCategory(category, callback) {
    let filtered = events;
    if (category !== 'all') {
        // 6. Arrays and Methods - Use .filter()
        filtered = events.filter(event => event.category === category);
    }
    callback(filtered); // Execute the callback with the filtered events
    return filtered;
}

/**
 * Filters events by name and applies a callback function.
 * @param {string} searchTerm - The search term for event names.
 * @param {function(Event[]): void} callback - A function to execute with the filtered events.
 * @returns {Event[]} The filtered array of events.
 */
function filterEventsByName(searchTerm, callback) {
    // 10. Modern JavaScript Features - Use default parameters (already in use for callback)
    // 10. Modern JavaScript Features - Use spread operator to clone event list before filtering
    const eventsToFilter = [...events]; // Clone the array to avoid modifying the original

    const filtered = eventsToFilter.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    callback(filtered);
    return filtered;
}


// --- DOM Elements ---
const eventsContainer = document.getElementById('eventsContainer');
const categoryFilter = document.getElementById('categoryFilter');
const eventSearchInput = document.getElementById('eventSearch');
const registrationForm = document.getElementById('registrationForm');
const eventSelect = document.getElementById('eventSelect');
const loadingSpinner = document.getElementById('loadingSpinner');
const noEventsMessage = document.getElementById('noEventsMessage');

// 7. DOM Manipulation - Function to render events
/**
 * Renders a list of events to the DOM.
 * @param {Event[]} eventsToDisplay - The array of Event objects to render.
 */
function renderEvents(eventsToDisplay) {
    eventsContainer.innerHTML = ''; // Clear existing events
    noEventsMessage.classList.add('hidden'); // Hide no events message by default

    if (eventsToDisplay.length === 0) {
        noEventsMessage.classList.remove('hidden');
        return;
    }

    eventsToDisplay.forEach(event => {
        // 3. Conditionals - Use if-else to hide past or full events
        // (Simplified for demonstration, real check would be more robust)
        const isPastEvent = event.date < new Date(); // Check if event date is in the past
        const isFullEvent = !event.checkAvailability();

        if (isPastEvent || isFullEvent) {
            // Don't display past or full events
            return;
        }

        // 7. DOM Manipulation - Create and append event cards using createElement()
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card bg-white rounded-lg shadow-md p-6 flex flex-col justify-between'; // Tailwind classes for styling

        // 10. Modern JavaScript Features - Use destructuring to extract event details
        const { id, name, date, location, category, seatsAvailable } = event;

        // 2. Syntax, Data Types, and Operators - Concatenate event info using template literals
        eventCard.innerHTML = `
            <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">${name}</h3>
                <p class="text-gray-600 text-sm mb-1"><strong>Date:</strong> ${date.toLocaleDateString()}</p>
                <p class="text-gray-600 text-sm mb-1"><strong>Location:</strong> ${location}</p>
                <p class="text-gray-600 text-sm mb-2"><strong>Category:</strong> ${category}</p>
                <p id="seats-${id}" class="text-gray-700 font-medium text-sm">Seats Available: ${seatsAvailable}</p>
            </div>
            <button data-event-id="${id}" class="register-btn mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline ${isFullEvent ? 'opacity-50 cursor-not-allowed' : ''}" ${isFullEvent ? 'disabled' : ''}>
                ${isFullEvent ? 'Full' : 'Register'}
            </button>
        `;
        eventsContainer.appendChild(eventCard);
    });

    // Populate the registration form's event select dropdown
    populateEventSelect(eventsToDisplay.filter(e => e.checkAvailability() && e.date >= new Date()));
}

/**
 * Populates the event selection dropdown in the registration form.
 * @param {Event[]} availableEvents - Array of events that are available for registration.
 */
function populateEventSelect(availableEvents) {
    eventSelect.innerHTML = '<option value="">-- Select an Event --</option>'; // Reset options
    availableEvents.forEach(event => {
        const option = document.createElement('option');
        option.value = event.id;
        option.textContent = `${event.name} (${event.date.toLocaleDateString()})`;
        eventSelect.appendChild(option);
    });
}

// 7. DOM Manipulation - Update UI when user registers or cancels
function updateEventCardUI(eventId) {
    const event = events.find(e => e.id === eventId);
    if (event) {
        const seatsElement = document.getElementById(`seats-${eventId}`);
        if (seatsElement) {
            seatsElement.textContent = `Seats Available: ${event.seatsAvailable}`;
        }
        const registerButton = document.querySelector(`.register-btn[data-event-id="${eventId}"]`);
        if (registerButton) {
            if (!event.checkAvailability()) {
                registerButton.textContent = 'Full';
                registerButton.disabled = true;
                registerButton.classList.add('opacity-50', 'cursor-not-allowed');
            } else {
                registerButton.textContent = 'Register';
                registerButton.disabled = false;
                registerButton.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }
    }
}


// --- Event Handlers ---

// 8. Event Handling - Use onchange to filter events by category
categoryFilter.addEventListener('change', (event) => {
    const selectedCategory = event.target.value;
    filterEventsByCategory(selectedCategory, (filteredEvents) => {
        renderEvents(filteredEvents);
    });
});

// 8. Event Handling - Use keydown to allow quick search by name
eventSearchInput.addEventListener('keydown', (event) => {
    // You could add a debounce here for performance in a real app
    // For this exercise, we'll just filter on each keydown
    const searchTerm = event.target.value;
    filterEventsByName(searchTerm, (filteredEvents) => {
        renderEvents(filteredEvents);
    });
});

// 8. Event Handling - Use onclick for "Register" buttons (delegated event listener)
// This handles clicks on buttons that are dynamically added to the DOM
eventsContainer.addEventListener('click', async (event) => {
    if (event.target.classList.contains('register-btn')) {
        const eventId = event.target.dataset.eventId;
        if (eventId) {
            // 12. AJAX & Fetch API - Simulate POST user data to a mock API
            const userName = document.getElementById('userName').value; // Get user name from form
            const userEmail = document.getElementById('userEmail').value; // Get user email from form

            // Basic validation for quick registration from card
            if (!userName || !userEmail) {
                showMessageBox("Please fill in your Name and Email in the registration form below.", "error");
                return;
            }

            try {
                // Show loading spinner
                loadingSpinner.style.display = 'block';
                event.target.disabled = true; // Disable button during registration

                const registrationData = {
                    eventId: eventId,
                    userName: userName,
                    userEmail: userEmail
                };

                // Simulate API call
                const response = await fetchMockRegistrationAPI(registrationData);

                if (response.success) {
                    // 2. Syntax, Data Types, and Operators - Use ++ or -- to manage seat count
                    // (Done by Event.register() method)
                    if (registerUser(eventId)) { // This decrements seats and shows success message
                        updateEventCardUI(eventId); // Update UI
                        // Track registrations using closure
                        const eventCategory = events.find(e => e.id === eventId)?.category;
                        if (eventCategory === "Music") musicRegistrationTracker();
                        else if (eventCategory === "Workshop") workshopRegistrationTracker();
                    }
                } else {
                    showMessageBox(`API Registration Failed: ${response.message}`, "error");
                }
            } catch (error) {
                console.error("API Error during registration:", error);
                showMessageBox(`An error occurred during registration: ${error.message}`, "error");
            } finally {
                // Hide loading spinner
                loadingSpinner.style.display = 'none';
                event.target.disabled = false; // Re-enable button
            }
        }
    }
});


// 11. Working with Forms - Capture name, email, and selected event using form.elements
// 11. Working with Forms - Prevent default form behavior using event.preventDefault()
registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    // 11. Working with Forms - Validate inputs and show errors inline
    const userNameInput = registrationForm.elements.userName;
    const userEmailInput = registrationForm.elements.userEmail;
    const eventSelectInput = registrationForm.elements.eventSelect;

    let isValid = true;

    // Clear previous errors
    document.getElementById('userNameError').classList.add('hidden');
    document.getElementById('userEmailError').classList.add('hidden');
    document.getElementById('eventSelectError').classList.add('hidden');

    if (userNameInput.value.trim() === '') {
        document.getElementById('userNameError').classList.remove('hidden');
        isValid = false;
    }
    if (!userEmailInput.value.includes('@') || !userEmailInput.value.includes('.')) {
        document.getElementById('userEmailError').classList.remove('hidden');
        isValid = false;
    }
    if (eventSelectInput.value === '') {
        document.getElementById('eventSelectError').classList.remove('hidden');
        isValid = false;
    }

    if (!isValid) {
        showMessageBox("Please correct the errors in the form.", "error");
        return;
    }

    const selectedEventId = eventSelectInput.value;
    const registrationData = {
        eventId: selectedEventId,
        userName: userNameInput.value.trim(),
        userEmail: userEmailInput.value.trim()
    };

    // 12. AJAX & Fetch API - Use fetch() to POST user data to a mock API
    // 12. AJAX & Fetch API - Show success/failure message after submission
    // 12. AJAX & Fetch API - Use setTimeout() to simulate a delayed response
    try {
        // Show loading spinner
        loadingSpinner.style.display = 'block';
        document.getElementById('registerBtn').disabled = true; // Disable button

        const response = await fetchMockRegistrationAPI(registrationData);

        if (response.success) {
            if (registerUser(selectedEventId)) { // This decrements seats and shows success message
                updateEventCardUI(selectedEventId); // Update UI
                registrationForm.reset(); // Clear form on success
                // Track registrations using closure
                const eventCategory = events.find(e => e.id === selectedEventId)?.category;
                if (eventCategory === "Music") musicRegistrationTracker();
                else if (eventCategory === "Workshop") workshopRegistrationTracker();
            }
        } else {
            showMessageBox(`API Registration Failed: ${response.message}`, "error");
        }
    } catch (error) {
        console.error("Form Submission Error:", error);
        showMessageBox(`An error occurred during form submission: ${error.message}`, "error");
    } finally {
        // Hide loading spinner
        loadingSpinner.style.display = 'none';
        document.getElementById('registerBtn').disabled = false; // Re-enable button
    }
});


// 9. Async JS, Promises, Async/Await
/**
 * Simulates fetching event data from a mock JSON endpoint.
 * @returns {Promise<Event[]>} A promise that resolves with an array of Event objects.
 */
function fetchMockEvents() {
    loadingSpinner.style.display = 'block'; // Show spinner
    return new Promise(resolve => {
        setTimeout(() => {
            const mockData = [
                { id: 'e1', name: 'Summer Music Festival', date: '2025-07-15', location: 'Central Park', category: 'Music', seats: 150 },
                { id: 'e2', name: 'Advanced JavaScript Workshop', date: '2025-08-01', location: 'Community Hall', category: 'Workshop', seats: 30 },
                { id: 'e3', name: 'Annual Marathon', date: '2025-09-10', location: 'City Stadium', category: 'Sports', seats: 500 },
                { id: 'e4', name: 'Local Art Exhibition', date: '2025-07-20', location: 'Art Gallery', category: 'Festival', seats: 75 },
                { id: 'e5', name: 'Beginner Yoga Class', date: '2025-08-05', location: 'Community Center', category: 'Workshop', seats: 20 },
                { id: 'e6', name: 'Jazz Night', date: '2025-07-25', location: 'The Blue Note', category: 'Music', seats: 60 },
                { id: 'e7', name: 'Past Event (No Seats)', date: '2024-01-01', location: 'Old Hall', category: 'Workshop', seats: 0 }, // Past and full event
                { id: 'e8', name: 'Full Event', date: '2025-10-01', location: 'Auditorium', category: 'Music', seats: 0 }, // Full event
            ];
            // Convert plain objects to Event class instances
            const eventInstances = mockData.map(data => new Event(data.id, data.name, data.date, data.location, data.category, data.seats));
            resolve(eventInstances);
            loadingSpinner.style.display = 'none'; // Hide spinner
        }, 1500); // Simulate network delay
    });
}

/**
 * Simulates a POST request to a mock registration API.
 * @param {object} data - The registration data to send.
 * @returns {Promise<object>} A promise that resolves with a success/failure message.
 */
function fetchMockRegistrationAPI(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            // Simulate success or failure based on some condition, e.g., random chance
            const success = Math.random() > 0.1; // 90% chance of success
            if (success) {
                resolve({ success: true, message: "Registration successful!" });
            } else {
                resolve({ success: false, message: "Server error or registration limit reached." });
            }
        }, 1000); // Simulate network delay
    });
}

// Initial data fetch and rendering using async/await
async function initializePortal() {
    try {
        // 9. Async JS, Promises, Async/Await - Rewrite using async/await
        events = await fetchMockEvents(); // Fetch events and assign to global 'events'
        renderEvents(events); // Render all fetched events initially
    } catch (error) {
        console.error("Error fetching events:", error);
        showMessageBox("Failed to load events. Please try again later.", "error");
    }
}

// Initialize the portal when the DOM is ready
document.addEventListener('DOMContentLoaded', initializePortal);


// 14. jQuery and JS Frameworks (Conceptual/Simulated)
// This section is for demonstration purposes only.
// In a real project, you would either use plain JS, jQuery, or a framework, not all three.

// Simulated jQuery-like functions for demonstration
const $ = (selector) => {
    const elements = document.querySelectorAll(selector);
    return {
        // Simulating .click()
        click: function(callback) {
            elements.forEach(el => el.addEventListener('click', callback));
            return this;
        },
        // Simulating .fadeIn()
        fadeIn: function(duration = 400) {
            elements.forEach(el => {
                el.style.opacity = 0;
                el.style.display = 'block';
                let start = null;
                const animate = (currentTime) => {
                    if (!start) start = currentTime;
                    const progress = (currentTime - start) / duration;
                    el.style.opacity = progress;
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };
                requestAnimationFrame(animate);
            });
            return this;
        },
        // Simulating .fadeOut()
        fadeOut: function(duration = 400) {
            elements.forEach(el => {
                el.style.opacity = 1;
                let start = null;
                const animate = (currentTime) => {
                    if (!start) start = currentTime;
                    const progress = (currentTime - start) / duration;
                    el.style.opacity = 1 - progress;
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        el.style.display = 'none';
                    }
                };
                requestAnimationFrame(animate);
            });
            return this;
        }
    };
};

// Example of how jQuery might be used (simulated)
// This part is commented out to avoid conflicting with the main JS logic
/*
document.addEventListener('DOMContentLoaded', () => {
    // 14. jQuery: Use $('#registerBtn').click(...) to handle click events
    // This would typically target all register buttons, or a specific one
    // For this example, let's target the main form's register button
    $('#registerBtn').click(function() {
        console.log("jQuery-like click handler fired for registration button.");
        // Your existing form submission logic would go here
    });

    // 14. jQuery: Use .fadeIn() and .fadeOut() for event cards
    // Example: Fade in all event cards after they are rendered
    // This would be called after renderEvents completes
    // You'd need to ensure the cards are initially hidden (e.g., with opacity: 0 and display: none)
    // to see the fadeIn effect properly.
    // For demonstration, let's just make a dummy button fade in/out
    const dummyButton = document.createElement('button');
    dummyButton.textContent = 'Toggle Dummy Element';
    dummyButton.className = 'mt-8 p-3 bg-purple-500 text-white rounded-md';
    document.querySelector('main').appendChild(dummyButton);

    const dummyElement = document.createElement('div');
    dummyElement.textContent = 'I am a dummy element for fade effect!';
    dummyElement.className = 'mt-4 p-4 bg-yellow-200 rounded-md hidden'; // Initially hidden
    document.querySelector('main').appendChild(dummyElement);

    $(dummyButton).click(() => {
        if (dummyElement.style.display === 'none') {
            $(dummyElement).fadeIn(800);
        } else {
            $(dummyElement).fadeOut(800);
        }
    });
});
*/

// 14. Mention one benefit of moving to frameworks like React or Vue
/*
    Benefits of moving to frameworks like React or Vue:
    1.  Component-Based Architecture: Encourages breaking down UI into reusable, isolated components,
        making development more modular, scalable, and easier to maintain.
    2.  Declarative UI: You describe what the UI should look like for a given state, and the framework
        handles the DOM updates efficiently, reducing direct DOM manipulation (which can be error-prone).
    3.  Virtual DOM (React) / Reactive System (Vue): Optimizes UI updates by minimizing direct DOM
        manipulation, leading to better performance.
    4.  State Management: Provides robust patterns and libraries for managing application state,
        especially in complex applications.
    5.  Ecosystem & Tooling: Large communities and rich ecosystems with extensive libraries, development
        tools, and build pipelines (e.g., Webpack, Babel) that streamline the development process.
    6.  Improved Developer Experience: Features like hot-reloading, clear error messages, and
        predictable data flow enhance productivity.
*/

// 13. Debugging and Testing
/*
    Debugging Tips for this project:

    •   Chrome Dev Tools Console:
        -   Check for console.log() messages (e.g., "Welcome to the Community Portal", "Registration Error").
        -   Look for uncaught exceptions or errors.
        -   Use console.dir(element) to inspect DOM elements.
        -   Use console.table(events) to view the events array in a structured way.

    •   Network Tab:
        -   Inspect the mock API calls (fetchMockEvents, fetchMockRegistrationAPI).
        -   Check their status codes (e.g., 200 OK).
        -   Examine the request payload (for POST requests like registration) and the response data.
        -   Verify the simulated network delay.

    •   Breakpoints:
        -   Set breakpoints in the `registerUser` function to step through the logic and check `eventToRegister.seatsAvailable`.
        -   Place a breakpoint in the `registrationForm` submit event listener to inspect `registrationData` and `isValid` before the mock API call.
        -   Add breakpoints in `renderEvents` to see how `eventCard` is constructed and appended.
        -   Inspect variables in the 'Scope' panel when a breakpoint is hit.

    •   Logging Form Submission Steps:
        -   Add `console.log("Form submission started", registrationData);`
        -   Add `console.log("API response:", response);`
        -   Add `console.log("Updated event after registration:", events.find(e => e.id === selectedEventId));`
*/
