// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', () => {
    // Select the button element
    let button = document.querySelector('button');
    // Select the textarea element
    let textarea = document.querySelector('textarea');
    // Select the paragraph element
    let paragraph = document.querySelector('p');
    // Select the character count element
    let charCount = document.querySelector('.char-count');
    // Initialize a variable to store updated content
    let updatedContent = '';

    // Add a click event listener to the button
    button.addEventListener('click', () => {
        // Call the updateText function when the button is clicked
        updateText();
    });

    // Define the updateText function
    const updateText = () => {
        // Check if the trimmed value of the textarea is not empty
        if (textarea.value.trim() !== '') {
            // Replace the updatedContent with the current textarea value
            updatedContent = textarea.value;
            // Update the text content of the paragraph with the updatedContent
            paragraph.textContent = updatedContent;
        }
        // Clear the textarea for new input
        textarea.value = '';
        // Update the character count display
        charCount.textContent = 'Characters remaining: 3000';
    };

    // Add an input event listener to the textarea
    textarea.addEventListener('input', () => {
        // Check if the length of the textarea value exceeds 3000 characters
        if (textarea.value.length > 3000) {
            // Restrict the input to a maximum of 3000 characters
            textarea.value = textarea.value.slice(0, 3000);
        }
        // Update the character count display
        let remainingChars = 3000 - textarea.value.length;
        charCount.textContent = 'Characters remaining: ' + remainingChars;
    });

    // Add a paste event listener to the textarea
    textarea.addEventListener('paste', (event) => {
        // Get clipboard data from the event, supporting both modern and older browsers
        let clipboardData = event.clipboardData || window.clipboardData;
        // Get the pasted text from the clipboard data
        let pastedText = clipboardData.getData('text');
        // Combine the current textarea value with the pasted text
        let combinedText = textarea.value + pastedText;

        // Check if the combined text length exceeds 3000 characters
        if (combinedText.length > 3000) {
            // Prevent the default paste behavior
            event.preventDefault();
            // Calculate the remaining characters that can be pasted
            let remainingChars = 3000 - textarea.value.length;
            // Extract the allowed portion of the pasted text
            let allowedPastedText = pastedText.substring(0, remainingChars);
            // Append the allowed pasted text to the textarea
            textarea.value += allowedPastedText;
        }
        // Update the character count display
        let remainingChars = 3000 - textarea.value.length;
        charCount.textContent = 'Characters remaining: ' + remainingChars;
    });
});
