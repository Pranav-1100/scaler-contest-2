// JS file
// Define a variable for the tweet form
var tweetForm = $("#tweet-form");

// Define a variable for the tweet input
var tweetInput = $("#tweet-input");

// Define a variable for the tweet button
var tweetButton = $("#tweet-button");

// Define a variable for the tweet section
var tweetSection = $("#tweet-section");

// Define a function to create a tweet object
function createTweet(content) {
    // Create a tweet object with the content and a unique id
    var tweet = {
        content: content,
        id: Math.random().toString(36).substr(2, 9)
    };
    // Return the tweet object
    return tweet;
}

// Define a function to create a tweet card
function createTweetCard(tweet) {
    // Create a div element for the tweet card
    var tweetCard = $("<div></div>");
    // Add a class to the tweet card
    tweetCard.addClass("tweet-card");
    // Set the data-id attribute of the tweet card to the tweet.id property
    tweetCard.attr("data-id", tweet.id);
    // Create a div element for the tweet content
    var tweetContent = $("<div></div>");
    // Add a class to the tweet content
    tweetContent.addClass("tweet-content");
    // Create a p element for the tweet text
    var tweetText = $("<p></p>");
    // Add a class to the tweet text
    tweetText.addClass("tweet-text");
    // Set the text of the tweet text to the tweet.content property
    tweetText.text(tweet.content);
    // Append the tweet text to the tweet content
    tweetContent.append(tweetText);
    // Create a div element for the tweet actions
    var tweetActions = $("<div></div>");
    // Add a class to the tweet actions
    tweetActions.addClass("tweet-actions");
    // Create an img element for the like icon
    var likeIcon = $("<img>");
    // Add a class to the like icon
    likeIcon.addClass("like-icon");
    // Set the src attribute of the like icon to a heart image
    likeIcon.attr("src", "heart.png");
    // Set the data-liked attribute of the like icon to false
    likeIcon.attr("data-liked", false);
    // Append the like icon to the tweet actions
    tweetActions.append(likeIcon);
    // Append the tweet actions to the tweet content
    tweetContent.append(tweetActions);
    // Append the tweet content to the tweet card
    tweetCard.append(tweetContent);
    // Return the tweet card
    return tweetCard;
}

// Define a function to post a tweet
function postTweet() {
    // Get the value of the tweet input
    var tweetContent = tweetInput.val();
    // Check if the tweet input is not empty
    if (tweetContent) {
        // Create a tweet object with the tweet content
        var tweet = createTweet(tweetContent);
        // Create a tweet card with the tweet object
        var tweetCard = createTweetCard(tweet);
        // Prepend the tweet card to the tweet section
        tweetSection.prepend(tweetCard);
        // Clear the tweet input
        tweetInput.val("");
        // Save the tweet to the local storage
        saveTweet(tweet);
    }
}

// Define a function to like or unlike a tweet
function likeTweet() {
    // Get the like icon element
    var likeIcon = $(this);
    // Get the data-liked attribute of the like icon
    var liked = likeIcon.attr("data-liked");
    // Check if the tweet is liked or not
    if (liked === "false") {
        // Set the data-liked attribute to true
        likeIcon.attr("data-liked", true);
        // Change the src attribute of the like icon to a filled heart image
        likeIcon.attr("src", "heart-filled.png");
    } else {
        // Set the data-liked attribute to false
        likeIcon.attr("data-liked", false);
        // Change the src attribute of the like icon to an empty heart image
        likeIcon.attr("src", "heart.png");
    }
}

// Define a function to save a tweet to the local storage
function saveTweet(tweet) {
    // Get the tweets array from the local storage
    var tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    // Push the tweet object to the tweets array
    tweets.push(tweet);
    // Set the tweets array to the local storage
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Define a function to load the tweets from the local storage
function loadTweets() {
    // Get the tweets array from the local storage
    var tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    // Loop through the tweets array
    for (var tweet of tweets) {
        // Create a tweet card with the tweet object
        var tweetCard = createTweetCard(tweet);
        // Append the tweet card to the tweet section
        tweetSection.append(tweetCard);
    }
}

// Add an event listener to the tweet form on submit
tweetForm.on("submit", function(event) {
    // Prevent the default behavior of the form
    event.preventDefault();
    // Call the postTweet function
    postTweet();
});

// Add an event listener to the tweet section on click
tweetSection.on("click", function(event) {
    // Get the target element of the event
    var target = $(event.target);
    // Check if the target element is a like icon
    if (target.hasClass("like-icon")) {
        // Call the likeTweet function with the target element as the context
        likeTweet.call(target);
    }
});

// Call the loadTweets function when the document is ready
$(document).ready(function() {
    loadTweets();
});
