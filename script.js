declare var FullCalendar: any;
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid'],
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'addEventButton'
        },
        customButtons: {
            addEventButton: {
                text: 'Add Event',
                click: function() {
                    // Code to show modal or form for adding events
                }
            }
        },
        dateClick: function(info) {
            // Code to show modal or form for adding events
        }
    });

    calendar.render();

    function showModal(dateStr = '') {
        var modal = document.getElementById('modal');
        var modalTitle = document.querySelector('#modal h2');
        var modalForm = document.getElementById('meal-form');
        var titleInput = document.getElementById('meal-title');
        var dateInput = document.getElementById('meal-date');
        var timeInput = document.getElementById('meal-time');
        var recipeInput = document.getElementById('meal-recipe');

        if (dateStr !== '') {
            modalTitle.innerText = 'Add Meal on ' + moment(dateStr).format('MMM D, YYYY');
            dateInput.value = dateStr;
        } else {
            modalTitle.innerText = 'Add Meal';
            dateInput.value = moment().format('YYYY-MM-DD');
        }

        modal.style.display = 'block';

        // Close modal when the user clicks the "x"
        const closeButton = document.querySelector('.close');
        closeButton.onclick = function () {
            modal.style.display = 'none';
        }

        // Close modal when the user clicks outside of it
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }

        // Handle form submission
        modalForm.onsubmit = function (event) {
            event.preventDefault();
            var title = titleInput.value;
            var date = dateInput.value;
            var time = timeInput.value;
            var recipe = recipeInput.value;

            if (title.trim() === '' || date.trim() === '' || time.trim() === '' || recipe.trim() === '') {
                alert('Please fill in all fields.');
                return;
            }

            const eventData = {
                title: title,
                start: date + 'T' + time,
                recipe: recipe
            };
            calendar.addEvent(eventData);
            modal.style.display = 'none';
            modalForm.reset();
        }
    }
});
