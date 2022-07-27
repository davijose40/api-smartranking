import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interface/Jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {
    private jogadores: Jogador[] = [];
    private readonly LOGGER = new Logger(JogadoresService.name);

    async criarAtualizarJogador( criarJogadorDto: CriarJogadorDto ): Promise<void> {
        const { email } = criarJogadorDto;
        const jogadorIndex = this.jogadores.findIndex(j => j.email === email);
        if( jogadorIndex === -1 ) {
            await this.criar(criarJogadorDto);
        }
        await this.upDateJogador(criarJogadorDto);

    }

    private async criar(criaJogadorDto: CriarJogadorDto): Promise<void> {
        const { email, telefoneCelular, nome } = criaJogadorDto;
        
        const jogador: Jogador = {
            _id: uuidv4(),
            nome,
            telefoneCelular,
            email,
            ranking: "A",
            posicaoRanking: 1,
            urlFotoJogador: "www.google.com.br/foto123.jpg"
        }

        this.LOGGER.log(`criaJodaarDto: ${JSON.stringify(jogador)}`);
        this.jogadores.push(jogador);

    }

    private async upDateJogador( criaJogadorDto: CriarJogadorDto ): Promise<void> {
        const { email, telefoneCelular, nome } = criaJogadorDto;
        const jogadorIndex = this.jogadores.findIndex(j => j.nome === criaJogadorDto.nome);

        const jogador: Jogador = {
            _id: uuidv4(),
            nome: nome == "" ?this.jogadores[jogadorIndex].nome: nome,
            telefoneCelular: telefoneCelular == "" ?this.jogadores[jogadorIndex].telefoneCelular: telefoneCelular,
            email: email == "" ?this.jogadores[jogadorIndex].email: email,
            ranking: "A",
            posicaoRanking: 1,
            urlFotoJogador: "www.google.com.br/foto123.jpg"
        }

        this.jogadores[jogadorIndex] = jogador;
       
    }

    async consultarJogadores(): Promise<Jogador[]> {    
        return this.jogadores;
    }


}
