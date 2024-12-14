import axios from "axios";


//cria e expota a conexao com o backend
export const backendAplcacao = axios.create({
    //realiza conexão com o servidor do backend 
    //verificar se o ip e aporta continuam as mesmas a pos desligar o pc 
    baseURL :  "http://192.168.1.35:3333",
    //aguarda o tempo em segundos para dar time out na aplicação
    timeout :  700, 
})