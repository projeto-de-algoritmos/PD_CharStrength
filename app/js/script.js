const selecionados = []
var valorSelecionado = 0
var melhorValor
var carga = 0;
const pesos = [2, 3, 4, 5];
const valores = [3, 4, 5, 6];
const nomes = [' Peixe',' Armadura de pano',' Adaga',' Escudo']
const numItems = pesos.length;
const teste = []


function escolhaitens(){
    document.getElementById('statos').style.display = 'none'
    defineCarga()
    document.getElementById('colec-itens').style.display = 'block'

}

function defineCarga(){
    carga = 2 * parseInt(document.getElementById('countforca').innerHTML)

    const result = knapsack(carga, pesos, valores, numItems);
    console.log("Valor máximo: " + result.melhorValor);
    result.selectedItems.forEach( resultado => {
      teste.push(nomes[resultado])
    })
    console.log("Itens selecionados: " + teste.join(", "));
    melhorValor = result.melhorValor
    document.getElementById("carga").innerHTML = 'Voce pode carregar ate ' + carga + 'KG'
}

function mostrarescolha(){
    document.getElementById('colec-itens').style.display = 'none'
    imprimeNome()
    document.getElementById('colec-lista').style.display = 'block'
}

function mostraresultado(){
    document.getElementById('colec-lista').style.display = 'none'
    comparaKnap()
}

function comparaKnap(){
    document.getElementById("voltar").style.display = 'block'
    if(melhorValor == valorSelecionado){
        document.getElementById('resultMensagem').innerHTML = 'Voce escolheu os melhores produtos'
    }else
        document.getElementById('resultMensagem').innerHTML = 'Voce devia ter colocado mais pontos em inteligencia'

}

function imprimeNome(){
    const temp = []
    selecionados.forEach(selecionado =>{
        temp.push(nomes[selecionado])
        valorSelecionado = valorSelecionado + valores[selecionado]
    })
    console.log(temp.length)
    if(temp.length != 0)
        document.getElementById('lista').innerHTML = temp
    else
        document.getElementById('lista').innerHTML = 'Voce nao escolheu nenhum item'
}

function soma(atributo) {
    if (parseInt(document.getElementById('pontos').innerHTML) > 0 && parseInt(document.getElementById(atributo).innerHTML)  > -1) {
        var temp = parseInt(document.getElementById(atributo).innerHTML)
        temp++
        document.getElementById(atributo).innerHTML = temp
        attPontos('+')
    } else {
        alert("Voce nao possui mais pontos")
    }
}

function sub(atributo) {
    if (parseInt(document.getElementById('pontos').innerHTML) < 10 && parseInt(document.getElementById(atributo).innerHTML)  > 0 ) {
        var temp = parseInt(document.getElementById(atributo).innerHTML)
        temp--
        document.getElementById(atributo).innerHTML = temp
        attPontos('-')
    } else {
        alert("Nao e possivel ficar com pontos negativos")
    }
}

function attPontos(simbolo) {
    if (simbolo == '+') {
        var temp = parseInt(document.getElementById('pontos').innerHTML)
        temp--
        document.getElementById('pontos').innerHTML = temp
    } else {
        var temp = parseInt(document.getElementById('pontos').innerHTML)
        temp++
        document.getElementById('pontos').innerHTML = temp
    }
}

function selected(selecionado){
    selecionados.push(selecionado)
    console.log(selecionados)

    var elemento = document.getElementById(selecionado);
    if (elemento) {
      elemento.classList.add("clicked");
    }
}


function knapsack(carga, pesos, valores, n) {

    const memo = [];
    for (let i = 0; i <= n; i++) {
      memo[i] = [];
      for (let j = 0; j <= carga; j++) {
        memo[i][j] = 0;
      }
    }


    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= carga; j++) {
        if (pesos[i - 1] > j) {
          memo[i][j] = memo[i - 1][j];
        } else {
          memo[i][j] = Math.max(
            memo[i - 1][j],
            valores[i - 1] + memo[i - 1][j - pesos[i - 1]]
          );
        }
      }
    }

    const selectedItems = [];
    let i = n;
    let j = carga;
    while (i > 0 && j > 0) {
      if (memo[i][j] !== memo[i - 1][j]) {
        selectedItems.push(i - 1);
        j -= pesos[i - 1];
      }
      i--;
    }


    return {
      melhorValor: memo[n][carga],
      selectedItems: selectedItems.reverse(),
    };
  }
