// Function to show the popup with a delay and then hide it
const buttons = document.querySelectorAll(".read-button");
const pop = document.getElementById("popup");
const darkModeToggle = document.getElementById('dark-mode-toggle');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});


buttons.forEach(button => {
    button.addEventListener("click", async (event) => {
        const id = event.target.getAttribute("id");
        await sendData(id);
    });
});

async function sendData(id) {
  try {
      const response = await fetch('/read/' + id, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const responseData = await response.json(); // Parsing the JSON response
      if(responseData.answer==true){
        await fetch("/");
        alert("Book is added");
      }
      else{
        await fetch("/");
        alert("Book is already added");
      }
    
  } catch (error) {
      console.log('There was a problem with the fetch operation:', error);// Returning null in case of error
  }
}

