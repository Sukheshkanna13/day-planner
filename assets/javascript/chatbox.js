$(document).ready(function() {
    $('#user-input').keypress(function(event) {
        if (event.which === 13) {
            var userInput = $(this).val();
            $(this).val('');
            $('#chat-log').append('<div class="user-message">' + userInput + '</div>');
            // Send user input to API endpoint
            sendUserInputToAPI(userInput);
        }
    });

    // Function to send user input to API endpoint
    function sendUserInputToAPI(userInput) {
        // Make AJAX request to API endpoint
        $.ajax({
            url: 'https://your-api-endpoint.com/process-message',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ message: userInput }),
            success: function(response) {
                // Display response from API in chat log
                $('#chat-log').append('<div class="bot-message">' + response + '</div>');
                // Handle API command for planner calendar
                handleAPICommand(response);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
                // Display error message in chat log
                $('#chat-log').append('<div class="bot-message">An error occurred. Please try again.</div>');
            }
        });
    }

    // Function to handle commands received from API
    function handleAPICommand(command) {
        // Forward command to planner calendar
        // Example:
        handleAPICommand(command);
    }
});
