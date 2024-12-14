import { FlatList } from "react-native"
import {s} from "./styles"
import { Category } from "../category"

//Recebe e uar os dados do backend retornado por home 
//os cochetes no final servem para falar que vamos receber uma lista e não um unico objeto
export type CategoriesProps ={
    id : string
    name :  string 
}[]

//recebe as CategoriesProps para usar iternamente 
type Props = {
    data :  CategoriesProps
    selected:  string 
    //pode passar metodo também ele pega o id selecionado
    onSelect :  (id : string) => void

}

export function Categories({data, selected, onSelect} : Props){
   // console.log(data)
    return(
    //vamos retonar uma lista do proprio react 
    <FlatList style = {s.container}
        //primeiro pegamos os valores que devem ser exibidos na lista
        data ={data}
        //extrai os dados na lista como se fosse por um for buscando pelo id
        keyExtractor = {
            (item) => item.id
        }
        //rendeiza na lista a informação que você quer 
        renderItem={({ item }) => {
            return <Category 
            name={item.name}  
            iconId={item.id} 
            //passa um metodo ao ser precionado
            onPress={() =>  onSelect(item.id)}
             //verifica  se é verdadeiro
            isSelected =  {item.id === selected}
            />;
          }}

          //mostra os itens na horizontal o padrão ém vertical
          horizontal

          //personaliza cada item
          contentContainerStyle={s.content}

          //mostra uma barra de rolagem na horizontal eo false é para não mostrar a barra
          showsHorizontalScrollIndicator={false}

        />

        // <View>
        //     <Category name="Teste"></Category>
        // </View>
    )

}