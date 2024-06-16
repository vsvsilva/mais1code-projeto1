// Atividade: Adicionar uma validação no campo de quantidade para impedir que o usuário insira valores negativos ou zero.

addEventListener("input",(event)=>{ // Escuta o evento do input no momento em que mudar o valor.
  validarQuantidade(event)
})

function validarQuantidade(event) {
    const valor = event?.target.value // ? verifica se o evento existe (não seria necessário pois o onchand não está sendo utilizado)
    if (isNaN(Number(valor))){ // (Number) transforma valor recebido em número / isNaN verifica se valor foi tranformado é um número.
      const quantidadeInput = document.getElementById("quantidade");
      quantidadeInput.value = 1
    } 

    const mensagemErro = document.getElementById("erro"); // Busca especificamente a tag spam      
    if (valor < 1){
      mensagemErro.innerHTML="Favor adicionar uma quantidade maior que 0."  
    } else {
      mensagemErro.innerHTML=""
    }

      console.log("event",event?.target.value) // Para leitura em console / Elemento + valor extraidos do evento (evento + elemento + valor)

  }

   

