const nomeInput = document.querySelector("#nome");
const emailInput = document.querySelector("#email");
const senhaInput = document.querySelector("#senha");
const registroFormulario = document.querySelector("#registro-formulario");
const cepInput = document.querySelector("#cep");
const ruaInput = document.querySelector("#rua");
const numeroInput = document.querySelector("#numero");
const cidadeInput = document.querySelector("#cidade");
const complementoInput = document.querySelector("#complemento");
const bairroInput = document.querySelector("#bairro");
const estadoInput = document.querySelector("#estado");
const formInputs = document.querySelectorAll("[data-input]");

const closeButton = document.querySelector("#close-message");

// cadastrar usuário
function cadastrar() {
  fetch("http://localhost:8080/usuarios", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {
      nome: nomeInput.value,
      email: emailInput.value,
      senha: senhaInput.value,
      cep: cepInput.value,
      rua: ruaInput.value,
      numero: numeroInput.value,
      complemento: complementoInput.value,
      bairro: bairroInput.value,
      cidade: cidadeInput.value,
      estado: estadoInput.value
      }
    )
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    toggleMessage("Usuário cadastrado com sucesso!");
    resetForm();
  })
  .catch(error => console.log(error));
}

// Validar entrada do CEP
cepInput.addEventListener("keypress", (e) => {
  const onlyNumbers = /[0-9]|\./;
  const key = String.fromCharCode(e.keyCode);

  console.log(key);

  console.log(onlyNumbers.test(key));

  // permitir apenas números
  if (!onlyNumbers.test(key)) {
    e.preventDefault();
    return;
  }
});

// Evento para obter endereço
cepInput.addEventListener("keyup", (e) => {
  const inputValue = e.target.value;

// Verifica se tem um CEP
  if (inputValue.length === 8) {
    getAddress(inputValue);
  }
});

// Obter endereço da API
const getAddress = async (cep) => {
  toggleLoader();

  cepInput.blur();

  const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

  const response = await fetch(apiUrl);

  const data = await response.json();

  console.log(data);
  console.log(formInputs);
  console.log(data.erro);

  // Mostrar erro e redefinir formulário
  if (data.erro === "true") {
    if (!ruaInput.hasAttribute("disabled")) {
      toggleDisabled();
    }

    registroFormulario.reset();
    toggleLoader();
    toggleMessage("CEP Inválido, tente novamente.");
    return;
  }

  // Ativar atributo desativado se o formulário estiver vazio
  if (ruaInput.value === "") {
    toggleDisabled();
  }

  ruaInput.value = data.logradouro;
  cidadeInput.value = data.localidade;
  bairroInput.value = data.bairro;
  estadoInput.value = data.uf;

  toggleLoader();
};

// Adicionar ou remover atributo desativado
const toggleDisabled = () => {
  if (estadoInput.hasAttribute("disabled")) {
    formInputs.forEach((input) => {
      input.removeAttribute("disabled");
    });
  } else {
    formInputs.forEach((input) => {
      input.setAttribute("disabled", "disabled");
    });
  }
};

// Mostrar ou ocultar o carregador
const toggleLoader = () => {
  const fadeElement = document.querySelector("#fade");
  const loaderElement = document.querySelector("#loader");

  fadeElement.classList.toggle("hide");
  loaderElement.classList.toggle("hide");
};

// Mostrar ou esconder mensagem
const toggleMessage = (msg) => {
  const fadeElement = document.querySelector("#fade");
  const messageElement = document.querySelector("#message");

  const messageTextElement = document.querySelector("#message p");

  messageTextElement.innerText = msg;

  fadeElement.classList.toggle("hide");
  messageElement.classList.toggle("hide");
};

// Fecha modelo de mensagem
closeButton.addEventListener("click", () => toggleMessage());

// Salvar rua
registroFormulario.addEventListener("submit", (e) => {
  e.preventDefault();

  cadastrar();

  toggleLoader();

  setTimeout(() => {
    toggleLoader();

    toggleMessage("Endereço salvo com sucesso!");

    registroFormulario.reset();

    toggleDisabled();
  }, 1000);
});
