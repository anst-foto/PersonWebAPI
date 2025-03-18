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

let formAddPerson = document.getElementById("formAddPerson");
formAddPerson.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const url = `http://localhost:5173/api/persons`;
    try {
        let formData = new FormData(formAddPerson)
        let formDataJson = JSON.stringify(Object.fromEntries(formData));
        console.log(formDataJson);
        
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: formDataJson,
            mode: 'cors'
        });
    }
    catch (err) {
        console.error(err);
    }
});