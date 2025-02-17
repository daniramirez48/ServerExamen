//daniel ramirez
function sanitizeInput(input) {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML.trim();
}


function validateForm(data) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = [];

    if (!data.name || data.name.length < 3) {
        errors.push('El nombre debe tener al menos 3 caracteres.');
    }
    if (!data.username || data.username.length < 3) {
        errors.push('El nombre de usuario debe tener al menos 3 caracteres.');
    }
    if (!data.email || !emailPattern.test(data.email)) {
        errors.push('El correo electrónico no es válido.');
    }
    if (!data.password || data.password.length < 6) {
        errors.push('La contraseña debe tener al menos 6 caracteres.');
    }

    return errors;
}

document.getElementById('registration-form')?.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());


    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            data[key] = sanitizeInput(data[key]);
        }
    }


    const errors = validateForm(data);
    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }

    console.log(data); // Para verificar los datos que se enviarán

    try {
        const response = await fetch('/userExamen', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message || 'Registro exitoso!');
            const modal = document.getElementById("myModal");
            modal.style.display = "none";

            const containerSubs = document.querySelector('.container-subs');
            if (containerSubs) {
                containerSubs.innerHTML = "<h4>Examen de dani</h4>";
            }
        } else {
            alert(result.error || 'Error en el registro');
        }

    } catch (error) {
        alert('Error de conexión con el servidor');
        console.error('Error en la petición:', error);
    }
});
