import { getUser } from './services/user.js'
import { getRepositories } from './services/repositories.js'

import { user } from './objects/user.js'
import { screen } from './objects/screen.js'

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value;
    if (validadeEmptyInput(userName)) return;
    getUserData(userName);
});

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterKeyPressed = key === 13;

    if (isEnterKeyPressed) {
        if (validadeEmptyInput(userName)) return;  // Corrigido aqui
        getUserData(userName);
    }
});

function validadeEmptyInput(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário do GitHub');
        return true;
    }
}

async function getUserData(userName) {
    const userResponse = await getUser(userName);

    // Corrigido de "Not Fund" para "Not Found"
    if (userResponse.message === "Not Found") {
        screen.renderNotFound();  // Certifique-se de que essa função existe no objeto `screen`
        return;
    }

    const repositoriesResponse = await getRepositories(userName);

    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse);

    screen.renderUser(user);
}
