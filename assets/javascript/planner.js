// planner.js
$(document).ready(function() {
    // Function to update header with current day
    function updateHeaderWithDay() {
        $('#currentDay').text(moment().format('dddd, MMMM Do'));
    }

    updateHeaderWithDay();
});
