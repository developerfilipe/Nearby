import { View, Text } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

import { IconProps } from "@tabler/icons-react-native";

import {s} from "./styles"
import React from "react";

//Esse é o modelo pára criar tipagem no typsCript  a pavra prosp pode ser qualquer coisa 

type Props = {
    title:  string
    description : string
    icon : React.ComponentType<IconProps> //Aqui recebe um tipo de gerics do react recebendo o tipo dos icones que é um componente
}
//Passa a tipagem das propriedades que deve receber
//Pode se desestrutura as props pegando so valores diretos como no exemplo: export function Step({title, description, icon:Icon} : Props){ -- e pegando os valores sem a apavra props
// o Incon foi renomeado  pois propiedades devem ser com letra maiuscula 
export function Step(props : Props){
    return( 
    <View style={s.container}>
        {/* validação que verifica se o icone existe para poder renderizar ele */}
       { props.icon && <props.icon size={32} color={colors.red.base}/>}
        <View style={s.datails}>
            <Text style={s.title}>{props.title}</Text>
            <Text style={s.description}>{props.description}</Text>
        </View>
    </View>
    )

}