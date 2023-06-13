import { cloneDeep } from "lodash";
import { Posicao, Tabuleiro } from "..";
import { Jogador } from "../enums";
import { TransformarPosicao } from "../funcoes";

function getPossibleCombinations(){
    let possiblePositions = []
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
           let pos = TransformarPosicao(i, j);
           possiblePositions.push(pos)
        }
    }
    return possiblePositions
}

let combinations = getPossibleCombinations()

export function IaPensando(tabuleiro: Tabuleiro, grau: number, grauMax: number): [number, Posicao | null, Posicao | null] {
    let posPont: [number, Posicao | null, Posicao | null] = [0, null, null];
    let posPont2: [number, Posicao | null, Posicao | null] = [0, null, null];

    let posicoes: Posicao[];
    const turno = tabuleiro.getTurno() == Jogador.COMPUTADOR ? 1 : -1;
    let tabuleiroCopia: Tabuleiro;
    let tabuleiroCopia2: Tabuleiro;
    let jogou = false;
    let pontuacao: number;
    let allMovementsCombinations = combinations

    if (grau != grauMax) {
        allMovementsCombinations.forEach(pecaNoTabuleiro => {
            tabuleiroCopia = cloneDeep(tabuleiro);
            tabuleiroCopia.click(pecaNoTabuleiro);
            posicoes = tabuleiroCopia.getMovimentosPossiveis();
            if (posicoes.length == 0) {
                return
            }
            console.warn(grau, tabuleiroCopia.getUltimoMovimento().pecaMovimentada.jogador)

            posicoes.forEach(posPecaAposMovimentar => {
                pontuacao = Math.random() * 0.001;
                jogou = true;
                tabuleiroCopia2 = cloneDeep(tabuleiroCopia);
                console.warn(tabuleiroCopia2)
                tabuleiroCopia2.click(posPecaAposMovimentar);

                let peca = tabuleiroCopia2.getUltimoMovimento().pecaCapturada;
                if (peca != null) {
                    pontuacao = peca.getPontuacao() * turno;
                    console.log(peca);
                    console.log(pontuacao);
                }
                posPont2 = IaPensando(tabuleiroCopia2, grau + 1, grauMax);
                pontuacao += posPont2[0];
                if (posPont[0] == 0) {
                    posPont[0] = pontuacao;
                    posPont[1] = pecaNoTabuleiro;
                    posPont[2] = posPecaAposMovimentar;
                }
                if (turno == 1 && pontuacao > posPont[0]) {
                    posPont[0] = pontuacao;
                    posPont[1] = pecaNoTabuleiro;
                    posPont[2] = posPecaAposMovimentar;
                } else if (turno != 1 && pontuacao < posPont[0]) {
                    posPont[0] = pontuacao;
                    posPont[1] = pecaNoTabuleiro;
                    posPont[2] = posPecaAposMovimentar;
                }
            });
        });
        if (!jogou) {

            posPont[0] = 9999 * turno;;
        }
    }
    else {
        posPont[0] = 0;
    }
    console.log(jogou);
    console.log(posPont[0]);
    console.log(posPont[1]);
    console.log(posPont[2]);
    console.log("grau é " + grau);
    return posPont;
}
