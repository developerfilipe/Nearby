import { backendAplcacao } from "@/services/api";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";

type LojasProps  =  PlaceProps;

export default function Home(){

    //sao duas variaveis(funções) do react que servem para gerar uma nova redenrização na tela caso o valor seja alterado
    //vamos definir um tipo e o retorno inicial o tipo vai ser po generics <CategoriesProps> e o inicio vai ser dentro do parenteses [] um array vazio
    const [categorias, setCategorias] = useState<CategoriesProps>([])

    const [categoria, setCategoria] = useState("")
    const [lojas, setLojas] = useState<LojasProps[]>([])


    async function buscarCategorias() {
        try {

            //busca na rota da aplcação do backend de categorias sendo um get e devolve para const
            const {data} = await backendAplcacao.get("/categories")
            //verificar o retorno
            //console.log(data)

            //adiona o valor recebido da api para o estado de categorias 
            setCategorias(data)
            setCategoria(data[0].id)
            
        } catch (error) {
            console.log(error)
            Alert.alert("Não foi possível carregar as categorias.")
        }
    }

    async function buscarLojas() {
        try {
            if(!categoria){
                return 
            }

            const {data}  = await backendAplcacao.get("/markets/category/"+categoria)
            setLojas(data)
            console.log(data)
        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possivél carregar os locais!")
        }
    }

    //Coloca as funções que vão ser chamadas quando a tela e carregada
    //dentro do array voce pode colocar uma função quando mudar ele re-executa o useEfect
    useEffect(
        ()=>{
            buscarCategorias()
        },
        []
    )

    //é bom criar um Useefect para cada função async e a dependecia fica entre o arry no caso precisa da categoria carregada
    useEffect(
        ()=>{
            buscarLojas()
        },
        [categoria]
    )


    return (
        <View style={{flex:1}}>
           <Categories data={categorias} onSelect={setCategoria} selected={categoria}/>
        </View>
    )
}