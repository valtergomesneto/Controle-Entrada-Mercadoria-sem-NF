var dados = []

function ApagaRegistro(id) {
    let _confirm = confirm("Deseja realmente excluir este registro?")

    if (_confirm) {
        for (let i = 0; i < dados.length; i++) {
            if (dados[i].ID == id) {
                dados.splice(i, 1)
            }
        }

        PopulaTabela()
    }

}

function EditaRegistro(id) {
    $("#modalRegistro").modal("show")

    dados.forEach(function (item) {
        if (item.ID == id) {
            $("#hdID").val(item.ID)
            $("#txtData").val(item.Data.substr(6, 4) + "-" + item.Data.substr(3, 2) + "-" + item.Data.substr(0, 2))
            $("#txtEmpresa").val(item.Empresa)
            $("#txtItens").val(item.Itens)
            $("#txtObs").val(item.Obs)

        }
    })

}

function PopulaTabela() {
    if (Array.isArray(dados)) {

        localStorage.setItem("__dados__", JSON.stringify(dados))

        $("#tblDados tbody").html("") //codigo Jquery

        dados.forEach(function (item) {
            //TEMPLATE STRING
            $("#tblDados tbody").append(`<tr>
            <td>${item.ID}</td>
            <td>${item.Data}</td>
            <td>${item.Empresa}</td>
            <td>${item.Itens}</td>
            <td>${item.Obs}</td>
            <td><button type="button" class="btn btn-primary" onclick="javascript:EditaRegistro(${item.ID});"><i class="fas fa-edit" /></button></td>
            <td><button type="button" class="btn btn-danger" onclick="javascript:ApagaRegistro(${item.ID});"><i class="fas fa-trash" /></button></td>
            </tr>`)
        })
    }
}

$(function () {
    //EXECUTA AO CARREGAR DA TELA
    dados = JSON.parse(localStorage.getItem("__dados__"))

    if (dados) {
        PopulaTabela()
    }

    $("#btnSalvar").click(function () {
        //EVENTO CLICK DO BOTAO btnSalvar

        // as variaveis abaixo pegam o valor digitado usando a funcao val()
        let _id = $("#hdID").val()
        let Data = new Date($("#txtData").val()).toLocaleDateString("pt-br", { timeZone: "UTC" })
        let Empresa = $("#txtEmpresa").val()
        let Itens = $("#txtItens").val()
        let Obs = $("#txtObs").val()


        if (!_id || _id == "0") {
            let registro = {}
            registro.Data = Data
            registro.Empresa = Empresa
            registro.Itens = Itens
            registro.Obs = Obs

            registro.ID = dados.length + 1
            dados.push(registro)
        }
        else {
            dados.forEach(function (item) {
                if (item.ID == _id) {
                    item.Data = Data
                    item.Empresa = Empresa
                    item.Itens = Itens
                    item.Obs = Obs
                }
            })
        }


        alert("Registro salvo com sucesso!")
        $("#modalRegistro").modal("hide") //fecha a modal

        //LIMPAR CAMPOS
        $("#hdID").val("0")
        $("#txtData").val("")
        $("#txtEmpresa").val("")
        $("#txtItens").val("")
        $("#txtObs").val("")

        PopulaTabela()

    })

})