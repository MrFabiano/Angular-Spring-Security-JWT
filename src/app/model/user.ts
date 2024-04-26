import { Profissao } from "./profissao";
import { Telefone } from "./telefone";


export class User {

    id!: number;
    nome!: string;
    login!: string;
    senha!: string;
    cpf!: string;
    dataNascimento!: string;
    //profissao: Profissao;
    profissao: Profissao = new Profissao();
    salario!: string;
    //telefones?: Telefone[];
    telefones!: Array<Telefone>;
  


    
}