const textoOperacaoAnterior = document.querySelector("#operacao-anterior")
const textoOperacaoAtual = document.querySelector("#operacao-atual")
const botoes = document.querySelectorAll("#botoes-container button")

class Calculadora {
    constructor(textoOperacaoAnterior, textoOperacaoAtual) {
        this.textoOperacaoAnterior = textoOperacaoAnterior;
        this.textoOperacaoAtual = textoOperacaoAtual;
        this.operacaoAtual = "";
    }

    // Mostra o que está sendo digitado na tela
    addDigito(digito) {
        //Checar se o ponto já foi clicado
        if(digito === "." && this.textoOperacaoAtual.innerText.includes(".")) {
            return;
        }

        this.operacaoAtual = digito;
        this.atualizaTela();
    }

    // Todas as operações da calculadora
    processoOperacao(operacao) { 
        //Chegar se o valor atual está vazio
        if(this.textoOperacaoAtual.innerText === "" && operacao !== "C") {
            //Mudar operação
            if(this.textoOperacaoAnterior.innerText !== "") {
                this.mudarOperacao(operacao);
            }
            return;
        }

        // Obter valor atual e anterior
        let valorOperacao;
        const anterior = +this.textoOperacaoAnterior.innerText.split(" ")[0];
        const atual = +this.textoOperacaoAtual.innerText;

        switch (operacao) {
            case "+":
                valorOperacao = anterior + atual
                this.atualizaTela(valorOperacao, operacao, atual, anterior);
                break;
            case "*":
                valorOperacao = anterior * atual
                this.atualizaTela(valorOperacao, operacao, atual, anterior);
                break;
            case "/":
                valorOperacao = anterior / atual
                this.atualizaTela(valorOperacao, operacao, atual, anterior);
                break;
            case "-":
                valorOperacao = anterior - atual
                this.atualizaTela(valorOperacao, operacao, atual, anterior);
                break;
            case "DEL":
                this.processoDeletar();
                break;
            case "CE":
                this.limparOperacaoAtual();
                break; 
            case "C":
                this.limparTela();
                break;  
            case "=":
                this.operacaoIgual();
                break;                   
            default:
                return;    
        }
    }

    // Mudar o que foi escrito na tela
    atualizaTela(
        valorOperacao = null,
        operacao = null,
        atual = null,
        anterior = null
    ) {
        if(valorOperacao === null) {
            this.textoOperacaoAtual.innerText += this.operacaoAtual;
        } else {
            //Checar se o valor é zero, se for, adicionar valor atual
            if(anterior === 0) {
                valorOperacao = atual
            }

            //Adicionar o valor atual para o visor de cima da calculadora
            this.textoOperacaoAnterior.innerText = `${valorOperacao} ${operacao}`
            this.textoOperacaoAtual.innerText = "";
        }
    } 

    // Mudar operações matemáticas
    mudarOperacao(operacao) {
        const operacoesMat = ["+", "-", "*", "/"]

        if(!operacoesMat.includes(operacao)) {
            return;
        }

        this.textoOperacaoAnterior.innerText = this.textoOperacaoAnterior.innerText.slice(0, -1) + operacao;
    }
    //Deletar o último dígito
    processoDeletar() {
        this.textoOperacaoAtual.innerText = this.textoOperacaoAtual.innerText.slice(0, -1);
    }

    //Limpar operacao atual
    limparOperacaoAtual() {
        this.textoOperacaoAtual.innerText = "";
    }

    //Limpar a operação atual e a operação anterior
    limparTela() {
        this.textoOperacaoAtual.innerText = "";
        this.textoOperacaoAnterior.innerText = "";
    }

    // O clique no igual mostra o resultado da operação feita
    operacaoIgual() {
        
      const operacao = this.textoOperacaoAnterior.innerText.split(" ")[1];
      
      this.processoOperacao(operacao);
    }
}

const calc = new Calculadora(textoOperacaoAnterior, textoOperacaoAtual);

botoes.forEach((btn) => {
    btn.addEventListener("click", (evento) => {
        const valor = evento.target.innerText;

        if(+valor >= 0 || valor === ".") {
            calc.addDigito(valor)
        } else {
            calc.processoOperacao(valor)
        }
    });
});