import { Telefone } from "./telefone";

export interface User {

    id: number;
    nome: string;
    login: string;
    senha: string;
    cpf: string;
    dataNascimento : string;
    telefones?: Telefone[];

    
}