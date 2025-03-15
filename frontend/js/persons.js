let formGetPersons = document.getElementById("formGetPersons");
formGetPersons.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        const url = `http://localhost:5173/api/persons`;
        let response = await fetch(url);
        let persons = await response.json();
        console.log(persons);
        let personsContainer = document.getElementById("persons");
        personsContainer.innerHTML = '<ul class="list-group">';
        for (const person of persons) {
            const date = new Date(person.date_of_birth).toLocaleDateString();
            personsContainer.innerHTML +=`<li class="list-group-item">${person.last_name} ${person.first_name}, ${date}</li>`;
        }
        personsContainer.innerHTML += '</ul>';
    } catch (err) {
        console.error(err);
    }
});