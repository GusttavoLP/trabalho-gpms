import { Jogador, Posicao, Quadrante, verificarPosicao, ChecarMovimento, SituacaoQuadrante } from ".";
import { Bispo, Cavalo, Peao, Peca, Rainha, Rei, Torre } from "./pecas";


export function MovimentosPossiveis(quadrantes: Quadrante[][], posicaoPeca: Posicao): Posicao[] {
    let movimentosPossiveis: Posicao[] = [];
    const peca = quadrantes[posicaoPeca.linha][posicaoPeca.coluna].getPeca()
    if (peca == null) {
        return movimentosPossiveis;
    }
    //console.log("to aq");
    //console.log(peca.constructor.name+" "+peca.getCor()+" em "+posicaoPeca.linha+" e "+posicaoPeca.coluna)
    //console.log(peca.constructor.name)
    if (peca instanceof Peao) { movimentosPossiveis = MovimentosPeao(peca, quadrantes, posicaoPeca) }
    if (peca instanceof Torre) {
        // console.log(peca.constructor.name);
        movimentosPossiveis = MovimentosTorre(peca, quadrantes, posicaoPeca)
    }
    if (peca instanceof Bispo) {
        // console.log(peca.constructor.name);
        movimentosPossiveis = MovimentosBispo(peca, quadrantes, posicaoPeca)
    }
    if (peca instanceof Rainha) {
        // console.log(peca.constructor.name);
        movimentosPossiveis = MovimentosBispo(peca, quadrantes, posicaoPeca).concat(MovimentosTorre(peca, quadrantes, posicaoPeca))
    }
    if (peca instanceof Cavalo) {
        // console.log(peca.constructor.name);
        movimentosPossiveis = MovimentosCavalo(peca, quadrantes, posicaoPeca)
    }
    if (peca instanceof Rei) {
        // console.log(peca.constructor.name);
        movimentosPossiveis = MovimentosRei(peca, quadrantes, posicaoPeca)
    }




    // console.log(movimentosPossiveis);


    return movimentosPossiveis;



}
function MovimentosPeao(peca: Peca, quadrantes: Quadrante[][], posicaoPeca: Posicao): Posicao[] {
    //console.log(peca.constructor.name+" "+peca.getCor()+" em "+posicaoPeca.linha+" e "+posicaoPeca.coluna)

    const movimentosPossiveis: Posicao[] = [];
    const posicaoAtual: Posicao = posicaoPeca;

    const direcao = peca.getjogador() == Jogador.JOGADOR ? -1 : 1;
    const posicaoInicial = peca.getjogador() == Jogador.JOGADOR ? 6 : 1;
    //console.log(peca.getjogador()+" E "+peca.getCor());

    for (let i = (posicaoAtual.coluna - 1); i < (posicaoAtual.coluna + 2); i++) {
        let posicaoAlvo: Posicao = { linha: (posicaoAtual.linha + direcao), coluna: i }

        if (verificarPosicao(posicaoAlvo)) {
            let quadranteAlvo = quadrantes[posicaoAlvo.linha][posicaoAlvo.coluna]
            let quadranteAtual = quadrantes[posicaoAtual.linha][posicaoAtual.coluna]
            let checagem: SituacaoQuadrante = ChecarMovimento(quadranteAlvo, quadranteAtual)


            if (posicaoAtual.coluna != i) {
                console.log("verificando as comida")
                if (checagem == SituacaoQuadrante.INIMIGO) {
                    console.log("achei inimigo kek")
                    movimentosPossiveis.push(posicaoAlvo);
                }
            }
            else {
                if (checagem == SituacaoQuadrante.VAZIO) {
                    movimentosPossiveis.push(posicaoAlvo);
                    quadranteAlvo = quadrantes[posicaoAlvo.linha + direcao][posicaoAlvo.coluna]
                    checagem = ChecarMovimento(quadranteAlvo, quadranteAtual)
                    if (checagem == SituacaoQuadrante.VAZIO && posicaoAtual.linha == posicaoInicial) {
                        let posicaoAlvo: Posicao = { linha: (posicaoAtual.linha + 2 * direcao), coluna: posicaoAtual.coluna }
                        movimentosPossiveis.push(posicaoAlvo);
                    }
                }
            }
        }


    }


    //console.log(direcao+","+ posicaoInicial)
    //console.log("movimentos possiveis FINAL");
    //console.log(movimentosPossiveis);
    return movimentosPossiveis;
}
function MovimentosTorre(peca: Peca, quadrantes: Quadrante[][], posicaoPeca: Posicao): Posicao[] {
    const movimentosPossiveis: Posicao[] = [];
    let posicaoAlvo: Posicao;
    let quadranteAlvo: Quadrante;
    let quadranteAtual: Quadrante;
    console.log(posicaoPeca);
    console.log(peca.constructor.name);
    const posicaoAtual: Posicao = posicaoPeca;
    

    //if( verificarPosicao(posicaoAlvo)){}
    let i = 0;
    let checagem;
    do {
        i++

        posicaoAlvo = { linha: posicaoAtual.linha, coluna: posicaoAtual.coluna + i }
        if(verificarPosicao(posicaoAlvo)){
        quadranteAlvo = quadrantes[posicaoAlvo.linha][posicaoAlvo.coluna]
        quadranteAtual = quadrantes[posicaoAtual.linha][posicaoAtual.coluna]
        checagem = ChecarMovimento(quadranteAlvo, quadranteAtual)
        if ( checagem != SituacaoQuadrante.ALIADO) { movimentosPossiveis.push(posicaoAlvo) }} else { break; }
    } while (checagem == SituacaoQuadrante.VAZIO)
    i = 0;
    do  {
        i++
        posicaoAlvo= { linha: posicaoAtual.linha + i, coluna: posicaoAtual.coluna }
        if(verificarPosicao(posicaoAlvo)){
        quadranteAlvo = quadrantes[posicaoAlvo.linha][posicaoAlvo.coluna]
        quadranteAtual = quadrantes[posicaoAtual.linha][posicaoAtual.coluna]
        checagem = ChecarMovimento(quadranteAlvo, quadranteAtual)
        if ( checagem != SituacaoQuadrante.ALIADO) { movimentosPossiveis.push(posicaoAlvo) } }else { break; }
    }
    while (checagem == SituacaoQuadrante.VAZIO)
    i = 0;

    do  {
        i--
        posicaoAlvo= { linha: posicaoAtual.linha, coluna: posicaoAtual.coluna + i }
        if(verificarPosicao(posicaoAlvo)){
        quadranteAlvo = quadrantes[posicaoAlvo.linha][posicaoAlvo.coluna]
        quadranteAtual = quadrantes[posicaoAtual.linha][posicaoAtual.coluna]
        checagem = ChecarMovimento(quadranteAlvo, quadranteAtual)
        if ( checagem != SituacaoQuadrante.ALIADO) { movimentosPossiveis.push(posicaoAlvo) }} else { break; }
    }
    while (checagem == SituacaoQuadrante.VAZIO)
    i = 0;

    do  {
        i--
        posicaoAlvo= { linha: posicaoAtual.linha + i, coluna: posicaoAtual.coluna }
        if(verificarPosicao(posicaoAlvo)){
        quadranteAlvo = quadrantes[posicaoAlvo.linha][posicaoAlvo.coluna]
        quadranteAtual = quadrantes[posicaoAtual.linha][posicaoAtual.coluna]
        checagem = ChecarMovimento(quadranteAlvo, quadranteAtual)
        if ( checagem != SituacaoQuadrante.ALIADO) { movimentosPossiveis.push(posicaoAlvo) } 
        }
        else { break; }
    }
    while (checagem == SituacaoQuadrante.VAZIO)



    return movimentosPossiveis;
}

function MovimentosBispo(peca: Peca, quadrantes: Quadrante[][], posicaoPeca: Posicao): Posicao[] {
    const movimentosPossiveis: Posicao[] = [];
    console.log(posicaoPeca);
    console.log(peca.constructor.name);
    const posicaoAtual: Posicao = posicaoPeca;
    const max = posicaoAtual.coluna > posicaoAtual.linha ? posicaoAtual.coluna : posicaoAtual.linha;
    const min = posicaoAtual.coluna < posicaoAtual.linha ? posicaoAtual.coluna : posicaoAtual.linha;;
    let i = 0;
    while (true) {
        i++;
        let posicaoAlvo: Posicao = { linha: posicaoAtual.linha + i, coluna: posicaoAtual.coluna + i }
        if (verificarPosicao(posicaoAlvo)) { movimentosPossiveis.push(posicaoAlvo) } else { break; }
    }
    i = 0
    while (true) {
        i++;
        let posicaoAlvo: Posicao = { linha: posicaoAtual.linha - i, coluna: posicaoAtual.coluna - i }
        if (verificarPosicao(posicaoAlvo)) { movimentosPossiveis.push(posicaoAlvo) } else { break; }
    }
    i = 0
    while (true) {
        i++;
        let posicaoAlvo: Posicao = { linha: posicaoAtual.linha + i, coluna: posicaoAtual.coluna - i }
        if (verificarPosicao(posicaoAlvo)) { movimentosPossiveis.push(posicaoAlvo) } else { break; }
    }
    i = 0
    while (true) {
        i++;
        let posicaoAlvo: Posicao = { linha: posicaoAtual.linha - i, coluna: posicaoAtual.coluna + i }
        if (verificarPosicao(posicaoAlvo)) { movimentosPossiveis.push(posicaoAlvo) } else { break; }
    }


    return movimentosPossiveis;
}
function MovimentosCavalo(peca: Peca, quadrantes: Quadrante[][], posicaoPeca: Posicao): Posicao[] {
    const movimentosPossiveis: Posicao[] = [];
    console.log(posicaoPeca);
    console.log(peca.constructor.name);
    const posicaoAtual: Posicao = posicaoPeca;
    let posicaoAlvo: Posicao;

    posicaoAlvo = { linha: posicaoAtual.linha + 2, coluna: posicaoAtual.coluna + 1 }
    if (verificarPosicao(posicaoAlvo)) { movimentosPossiveis.push(posicaoAlvo) }

    posicaoAlvo = { linha: posicaoAtual.linha + 2, coluna: posicaoAtual.coluna - 1 }
    if (verificarPosicao(posicaoAlvo)) { movimentosPossiveis.push(posicaoAlvo) }

    posicaoAlvo = { linha: posicaoAtual.linha - 2, coluna: posicaoAtual.coluna - 1 }
    if (verificarPosicao(posicaoAlvo)) { movimentosPossiveis.push(posicaoAlvo) }

    posicaoAlvo = { linha: posicaoAtual.linha - 2, coluna: posicaoAtual.coluna + 1 }
    if (verificarPosicao(posicaoAlvo)) { movimentosPossiveis.push(posicaoAlvo) }

    posicaoAlvo = { linha: posicaoAtual.linha + 1, coluna: posicaoAtual.coluna + 2 }
    if (verificarPosicao(posicaoAlvo)) { movimentosPossiveis.push(posicaoAlvo) }

    posicaoAlvo = { linha: posicaoAtual.linha + 1, coluna: posicaoAtual.coluna - 2 }
    if (verificarPosicao(posicaoAlvo)) { movimentosPossiveis.push(posicaoAlvo) }

    posicaoAlvo = { linha: posicaoAtual.linha - 1, coluna: posicaoAtual.coluna - 2 }
    if (verificarPosicao(posicaoAlvo)) { movimentosPossiveis.push(posicaoAlvo) }

    posicaoAlvo = { linha: posicaoAtual.linha - 1, coluna: posicaoAtual.coluna + 2 }
    if (verificarPosicao(posicaoAlvo)) { movimentosPossiveis.push(posicaoAlvo) }
    return movimentosPossiveis;
}

function MovimentosRei(peca: Peca, quadrantes: Quadrante[][], posicaoPeca: Posicao): Posicao[] {
    const movimentosPossiveis: Posicao[] = [];
    console.log(posicaoPeca);
    console.log(peca.constructor.name);
    const posicaoAtual: Posicao = posicaoPeca;
    let posicaoAlvo: Posicao;

    posicaoAlvo = { linha: posicaoAtual.linha + 1, coluna: posicaoAtual.coluna + 1 }
    if (verificarPosicao(posicaoAlvo)) { movimentosPossiveis.push(posicaoAlvo) }

    posicaoAlvo = { linha: posicaoAtual.linha + 1, coluna: posicaoAtual.coluna }
    if (verificarPosicao(posicaoAlvo)) { movimentosPossiveis.push(posicaoAlvo) }

    posicaoAlvo = { linha: posicaoAtual.linha + 1, coluna: posicaoAtual.coluna - 1 }
    if (verificarPosicao(posicaoAlvo)) { movimentosPossiveis.push(posicaoAlvo) }

    posicaoAlvo = { linha: posicaoAtual.linha, coluna: posicaoAtual.coluna - 1 }
    if (verificarPosicao(posicaoAlvo)) { movimentosPossiveis.push(posicaoAlvo) }

    posicaoAlvo = { linha: posicaoAtual.linha - 1, coluna: posicaoAtual.coluna - 1 }
    if (verificarPosicao(posicaoAlvo)) { movimentosPossiveis.push(posicaoAlvo) }

    posicaoAlvo = { linha: posicaoAtual.linha - 1, coluna: posicaoAtual.coluna }
    if (verificarPosicao(posicaoAlvo)) { movimentosPossiveis.push(posicaoAlvo) }

    posicaoAlvo = { linha: posicaoAtual.linha - 1, coluna: posicaoAtual.coluna + 1 }
    if (verificarPosicao(posicaoAlvo)) { movimentosPossiveis.push(posicaoAlvo) }

    posicaoAlvo = { linha: posicaoAtual.linha, coluna: posicaoAtual.coluna + 1 }
    if (verificarPosicao(posicaoAlvo)) { movimentosPossiveis.push(posicaoAlvo) }
    return movimentosPossiveis;
}







