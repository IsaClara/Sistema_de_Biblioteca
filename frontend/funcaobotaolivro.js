const button = document.querySelector("#botaoregistrarlivro")
const modal = document.querySelector("dialog")
const fechar = document.querySelector(".fecharModal")


button.onclick = function () {
    modal.showModal()
}

fechar.onclick = () => {
    modal.close()
}