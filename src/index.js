document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/characters")
    .then(response => response.json())
    .then(data => {
        const characterBar = document.getElementById("character-bar");
        data.forEach(character => {
            const span = document.createElement("span");
            span.textContent = character.name;
            span.addEventListener("click", () => displayCharacter(character));
            characterBar.appendChild(span);
        });
    });
});

function displayCharacter(character) {
    document.getElementById("name").textContent = character.name;
    document.getElementById("image").src = character.image;
    document.getElementById("vote-count").textContent = character.votes;
}

document.getElementById("votes-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const voteInput = document.getElementById("votes");
    const voteCount = document.getElementById("vote-count");
    const newVotes = parseInt(voteInput.value) + parseInt(voteCount.textContent);
    voteCount.textContent = newVotes;
    voteInput.value = "";
});
