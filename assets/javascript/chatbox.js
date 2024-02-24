$(document).ready(function() {
    // Function to handle user input
    $('#user-input').keypress(function(event) {
        if (event.which === 13) {
            var userInput = $(this).val();
            $(this).val('');
            $('#chatbox-messages').append('<div class="user-message">' + userInput + '</div>');
            // Send user input to AI and get response
            getAIResponse(userInput);
        }
    });

    // Function to get AI response
    function getAIResponse(userInput) {
        // Make AJAX request to AI API endpoint
        $.ajax({
            url: 'YOUR_AI_ENDPOINT',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ message: userInput }),
            success: function(response) {
                // Display AI response in chatbox
                $('#chatbox-messages').append('<div class="ai-message">' + response + '</div>');
                // Scroll to the bottom of chatbox
                $('#chatbox-messages').scrollTop($('#chatbox-messages')[0].scrollHeight);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
                // Display error message in chatbox
                $('#chatbox-messages').append('<div class="ai-message">Error occurred. Please try again later.</div>');
            }
        });
    }
});
