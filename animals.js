 //preset array of animals 
 var animalList=["anteater","bird","cat","dog","elephant","ferret","giraffe","hamster","iguana","jaguar","kangaroo","llama","mongoose","newt","octopus",
                  "parrot","quail","rooster","stingray","tiger","unicorn","vulture","walrus","yak","zebra"];

  
  // Function for displaying animal data
      function renderButtons() {

        // Deleting the animal buttons prior to adding new animal buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#animal-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < animalList.length; i++) {

          // Then dynamicaly generating buttons for each animal in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("animal");
          // Adding a data-attribute with a value of the animal at index i
          a.attr("data-name", animalList[i]);
          // Providing the button's text with a value of the animal at index i
          a.text(animalList[i]);
          // Adding the button to the HTML
          $("#animal-view").append(a);
          console.log(animalList);
          pullGifs();
        }
      }

      // This function handles events where one button is clicked
      $("#add-animal").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();


        // This line will grab the text from the input box
        var animal = $("#animal-input").val().trim();
        // The animal from the textbox is then added to our array
        animalList.push(animal);

        // calling renderButtons which handles the processing of our animal array
        renderButtons();
      });

      // Calling the renderButtons function at least once to display the initial list of animals
      renderButtons();

      // Adding click event listen listener to all buttons
    

    function pullGifs(){
    $("button").on("click", function(event) {
      // Grabbing and storing the data-animal property value from the button
      var animal = $(this).attr("data-name");

      // Constructing a queryURL using the animal name
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
          console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;
           $("#gifs-appear-here").empty();


          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            var active = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;


            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"

            // Creating and storing a div tag

            var animalDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");
          
            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(animalDiv);
              // Setting the src attribute of the image to a property pulled off the result item
              animalImage.attr({"active":active, "still":still, "src":active, "state":"still"});

             $(animalImage).on("click",function(){
             // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
               var state = $(this).attr("state");
               var source = $(this).attr("src");
              // If the clicked image's state is still, update its src attribute to what its data-animate value is.
              // Then, set the image's data-state to animate
              // Else set src to the data-still value
              if (state === "still") {
                $(this).attr("src", $(this).attr("active"));
                 $(this).attr("state", "active");}

                 else {
                   $(this).attr("src", $(this).attr("still"));
                   $(this).attr("state", "still");
                 }

            });

            }
          }
        });
        });
    };

    

       