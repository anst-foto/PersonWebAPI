let persons;

let formGetPersons = document.getElementById("formGetPersons");
formGetPersons.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        const url = `http://localhost:5173/api/persons`;
        let response = await fetch(url, {
            method: 'GET'
        });
        persons = await response.json();
        console.log(persons);
        let personsContainer = document.getElementById("persons");
        personsContainer.innerHTML = '<ul class="list-group">';
        for (const person of persons) {
            const date = new Date(person.date_of_birth).toLocaleDateString();
            personsContainer.innerHTML +=`
<li class="list-group-item">
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <p>${person.last_name} ${person.first_name}, ${date}</p>
            </div>
            <div class="col">
                <button class="btn btn-outline-warning btn-sm" type="button" onclick="updatePerson('${person.id}')">Изменить</button>
            </div>
            <div class="col">
                <button class="btn btn-outline-danger btn-sm" type="button" onclick="deletePerson('${person.id}')">Удалить</button>
            </div>
        </div>
    </div>
</li>
`;
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

let formUpdatePerson = document.getElementById("formUpdatePerson");
formUpdatePerson.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    try {
        const url = `http://localhost:5173/api/persons`;
        let formData = new FormData(formUpdatePerson)
        let formDataJson = JSON.stringify(Object.fromEntries(formData));
        console.log(formDataJson);

        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: formDataJson,
            mode: 'cors'
        });
        
    } catch (err) {
        console.error(err);
    }
});

async function updatePerson(personId) {
    let currentPerson;
    for (const person of persons) {
        if (person.id === personId) {
            currentPerson = person;
            break;
        }
    }
    
    document.getElementById("updateId").value = currentPerson.id;
    document.getElementById("updateLastName").value = currentPerson.last_name;
    document.getElementById("updateFirstName").value = currentPerson.first_name;
    document.getElementById("updateDateOfBirth").value = new Date(currentPerson.date_of_birth).toLocaleDateString();
    
    let tabNavUpdate = document.getElementById("nav-update-tab");
    new bootstrap.Tab(tabNavUpdate).show();
}

async function deletePerson(personId) {
    const url = `http://localhost:5173/api/persons/${personId}`;
    await fetch(url, {
        method: 'DELETE'
    });
}