const tabela = document.getElementById("tabelaUsuarios");
const botaoRegistrar = document.querySelector(".botaoregistrar");
const modal = document.getElementById("popupRegistrar");
const botaoFechar = document.querySelector(".botaoFechar");
const form = document.getElementById("formUsuario");
const campoBusca = document.getElementById("buscarUsuario");

let usuarioEditando = null;
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function renderTabela(lista = usuarios) {
  tabela.innerHTML = "";

  lista.forEach((user, index) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
        <td>${index + 1}</td>
        <td>${user.matricula}</td>
        <td>${user.nome}</td>
        <td>${user.curso}</td>
        <td>${user.telefone}</td>
        <td>${user.situacao}</td>
        <td>
            <button onclick="editarUsuario(${index})" class="botaoEditar">EDITAR</button>
            <button onclick="apagarUsuario(${index})" class="botaoEditar">APAGAR</button>
        </td>
    `;

    tabela.appendChild(linha);
  });
}

/* ABRIR POPUP */
botaoRegistrar.onclick = function () {
  modal.showModal();
};

/* FECHAR POPUP */
botaoFechar.onclick = function () {
  usuarioEditando = null;
  form.reset();
  modal.close();
};

/* REGISTRAR OU EDITAR USUÁRIO */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nomeUsuario").value;
  const matricula = document.getElementById("matriculaUsuario").value;
  const curso = document.getElementById("cursoUsuario").value;
  const telefone = document.getElementById("telefoneUsuario").value;

  const usuario = {
    nome: nome,
    matricula: matricula,
    curso: curso,
    telefone: telefone,
    situacao: "Ativo",
  };

  if (usuarioEditando !== null) {
    usuarios[usuarioEditando] = usuario;
    usuarioEditando = null;
  } else {
    usuarios.push(usuario);
  }

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  renderTabela();

  form.reset();
  modal.close();
});

/* EDITAR USUÁRIO */
function editarUsuario(index) {
  const usuario = usuarios[index];

  document.getElementById("nomeUsuario").value = usuario.nome;
  document.getElementById("matriculaUsuario").value = usuario.matricula;
  document.getElementById("cursoUsuario").value = usuario.curso;
  document.getElementById("telefoneUsuario").value = usuario.telefone;

  usuarioEditando = index;

  modal.showModal();
}

/* APAGAR USUÁRIO */
function apagarUsuario(index) {
  const confirmar = confirm("Tem certeza que deseja apagar este usuário?");

  if (!confirmar) return;

  usuarios.splice(index, 1);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  renderTabela();
}

/* PESQUISAR USUÁRIO */
campoBusca.addEventListener("input", function () {
  const texto = campoBusca.value.toLowerCase();

  const filtrados = usuarios.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(texto) ||
      usuario.matricula.toLowerCase().includes(texto) ||
      usuario.curso.toLowerCase().includes(texto),
  );

  renderTabela(filtrados);
});

/* CARREGAR TABELA AO ABRIR A PÁGINA */
renderTabela();
