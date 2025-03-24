document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "//localhost:3000/characters";
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const votesForm = document.getElementById("votes-form");
    const votesInput = document.getElementById("votes");
    const resetButton = document.getElementById("reset-btn");
  
    let currentCharacter = null;
  
    // Fetch and display all characters in the character bar
    fetch(baseUrl)
      .then((response) => response.json())
      .then((characters) => {
        characters.forEach((character) => {
          const span = document.createElement("span");
          span.textContent = character.name;
          span.addEventListener("click", () => displayCharacterDetails(character));
          characterBar.appendChild(span);
        });
      });

    function displayCharacterDetails(character) {
        currentCharacter = character;
        detailedInfo.innerHTML = `
            <h2>${character.name}</h2>
            <img src="${character.image}" alt="${character.name}">
            <p>Votes: <span id="vote-count">${character.votes}</span></p>
            <form id="votes-form">
                <input type="number" id="votes" name="votes" min="1" placeholder="Enter votes">
                <button type="submit">Add Votes</button>
            </form>
            <button id="reset-btn">Reset Votes</button>
        `;

        // Add event listener for the votes form
        document.getElementById("votes-form").addEventListener("submit", (event) => {
            event.preventDefault();
            if (currentCharacter) {
                const newVotes = parseInt(document.getElementById("votes").value);
                if (!isNaN(newVotes)) {
                    currentCharacter.votes += newVotes;
                    document.getElementById("vote-count").textContent = currentCharacter.votes;
                    document.getElementById("votes").value = "";
                }
            }
        });

        // Add event listener for the reset button
        document.getElementById("reset-btn").addEventListener("click", () => {
            if (currentCharacter) {
                currentCharacter.votes = 0;
                document.getElementById("vote-count").textContent = currentCharacter.votes;
            }
        });
    }
});