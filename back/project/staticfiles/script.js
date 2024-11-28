// Função para abrir e fechar o modal de login
function toggleUserCard() {
    const modal = document.getElementById('login-modal');
    modal.style.display = modal.style.display === "block" ? "none" : "block";
}

// Função para exibir o formulário de cadastro
function showRegisterForm() {
    const registerForm = document.getElementById('register-form');
    registerForm.style.display = "block"; // Mostra o formulário de cadastro
}

// Função para registrar usuário (fictício)
function registerUser() {
    const newLogin = document.getElementById('new-login').value;
    const newPassword = document.getElementById('new-password').value;
    if (newLogin && newPassword) {
        alert("Usuário cadastrado com sucesso!");
        document.getElementById('register-form').style.display = "none"; // Oculta o formulário de cadastro
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Fechar o modal quando clicar fora dele
window.onclick = function (event) {
    const modal = document.getElementById('login-modal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Função para exibir o modal de certificados
function showCertificates() {
    const certificatesModal = document.getElementById('certificates-modal');
    certificatesModal.style.display = 'flex';
}

// Função para fechar o modal de certificados
function closeCertificatesModal(event) {
    if (event.target === document.getElementById('certificates-modal') || event.target.tagName === 'BUTTON') {
        document.getElementById('certificates-modal').style.display = 'none';
    }
}

// Função para exibir o modal de Meus Eventos
function showEvents() {
    const eventsModal = document.getElementById('events-modal');
    eventsModal.style.display = 'flex';
}

// Função para fechar o modal de Meus Eventos
function closeEventsModal(event) {
    if (event.target === document.getElementById('events-modal') || event.target.tagName === 'BUTTON') {
        document.getElementById('events-modal').style.display = 'none';
    }
}

// Função para exibir o modal de Perfil
function showProfile() {
    const profileModal = document.getElementById('profile-modal');
    profileModal.style.display = 'flex';
}

// Função para fechar o modal de Perfil
function closeProfileModal(event) {
    if (event.target === document.getElementById('profile-modal') || event.target.tagName === 'BUTTON') {
        document.getElementById('profile-modal').style.display = 'none';
    }
}

// Função para abrir o modal de configurações
function showSettings() {
    const settingsModal = document.getElementById('settings-modal');
    settingsModal.style.display = 'flex';
}

// Função para fechar o modal de configurações
function closeSettingsModal(event) {
    if (event.target === document.getElementById('settings-modal') || event.target.tagName === 'BUTTON') {
        document.getElementById('settings-modal').style.display = 'none';
    }
}

// Função para alterar o tema (Claro/Escuro)
function changeTheme() {
    const theme = document.getElementById('theme').value;
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}

// Função para alterar o idioma
function changeLanguage() {
    const language = document.getElementById('language').value;
    console.log('Idioma alterado para: ' + language);
}

// Função para alterar a senha
function changePassword() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword === confirmPassword) {
        alert('Senha alterada com sucesso!');
    } else {
        alert('As senhas não coincidem. Tente novamente.');
    }
}

// Função para exibir o modal de Cadastro de Evento
function showEventRegistration() {
    const modal = document.getElementById('event-registration-modal');
    modal.style.display = 'flex';
}

// Função para fechar o modal de Cadastro de Evento
function closeEventRegistrationModal(event) {
    if (event.target === document.getElementById('event-registration-modal') || event.target.tagName === 'BUTTON') {
        document.getElementById('event-registration-modal').style.display = 'none';
    }
}

// Função para enviar os dados do formulário de cadastro de eventos
document.getElementById('event-registration-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
        "event-name": document.getElementById('event-name').value,
        "event-date": document.getElementById('event-date').value,
        "event-location": document.getElementById('event-location').value,
        "event-description": document.getElementById('event-description').value
    };

    try {
        const response = await fetch('/api/add-event/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            location.reload(); // Atualiza a página para refletir os novos eventos
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error("Erro ao cadastrar evento:", error);
        alert("Erro ao cadastrar evento. Tente novamente.");
    }
});

// Alterna a visibilidade do modal de cidades
function toggleCityModal() {
    const modal = document.getElementById("city-modal");
    modal.classList.toggle("hidden");
    modal.classList.toggle("visible");
}

// Simula o uso da localização atual
function useCurrentLocation() {
    alert("Usando sua localização atual!");
}

// Filtro por Categoria
function toggleCategoryModal() {
    const modal = document.getElementById("category-modal");
    modal.classList.toggle("hidden");
}

// Filtro por Data
function toggleDateModal() {
    const modal = document.getElementById("date-modal");
    modal.classList.toggle("hidden");
}

// Filtro por Preço
function togglePriceModal() {
    const modal = document.getElementById("price-modal");
    modal.classList.toggle("hidden");
}

// Filtro por Tipo de Evento
function toggleTypeModal() {
    const modal = document.getElementById("type-modal");
    modal.classList.toggle("hidden");
}

// Alterna a visibilidade do modal de comentários
function toggleModal() {
    const modal = document.getElementById("comment-modal");
    modal.classList.toggle("hidden");
    modal.style.display = modal.classList.contains("hidden") ? "none" : "flex";
}

// Função para enviar uma mensagem (protótipo)
function sendMessage() {
    const message = document.getElementById("user-message").value.trim();
    if (message) {
        alert("Sua mensagem foi enviada: " + message);
        document.getElementById("user-message").value = ""; // Limpa o campo de entrada
    } else {
        alert("Por favor, digite uma mensagem.");
    }
}
