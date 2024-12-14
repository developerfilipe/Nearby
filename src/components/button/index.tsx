import { ActivityIndicator, Text, TextProps, TouchableOpacity, TouchableOpacityProps } from "react-native"

//pode remear as propriedades para pode usar 
//Recebe um icone generico 
import { IconProps as MeuIconProps} from "@tabler/icons-react-native"

import {s} from "./styles"
import { colors} from "@/styles/theme"
import React from "react"


//cria a tipagem personalizada com todos os tipos de TouchableOpacityProps e adciona parametros como isLoading 
//que foi criado para verificar se os dados ja foram carregados 
type ButtonProps =  TouchableOpacityProps & {
    isLoading?  : boolean
}

//cria uma propriedade IconProps que recebe o renomeado no atributo icon
type IconProps = {
    icon: React.ComponentType<MeuIconProps>
}


//pode receber os filhos do TouchableOpacityProps e os tipos que criamos acima
// o style permite passar as propriedades de estilo para o button 
//...rest passa todas as propriedades não declaradas
function Button({children, style, isLoading = false, ...rest} : ButtonProps){
    return (
        // cria uma estrutura que fica opaca ao ser clicada e passa como 1 100% da opacidade
        //passa um array de estilos
        //{...rest} pega todas as  propreidades que não floram extraidas explicitamente 
        <TouchableOpacity style={[s.container, style]} activeOpacity={0.8} disabled={isLoading} {...rest}>
          
          {/* verifica se os isLoading e verdadiro para poder exibir os testos ou o icone de carregamento ActivityIndicator*/}
          {
            isLoading ?  <ActivityIndicator size="small" color={colors.gray[100]} /> : <Text>{children}</Text>
          }
          
           
        </TouchableOpacity>
    )
}

//Permite passar as prtopriedades do texto onde children é ocnteudo que da para repassar para a função componente
function Title({children} : TextProps){
    return <Text style={s.title}>{children}</Text>
}

//recebe o icon da tipagem criada e renomeio como Icon pois é um componente
function Icon({icon : Icon} : IconProps){
    return <Icon size={14} color={colors.gray[100]}/>
}


//transmite a função Title para dentro do Button permitindo chamadas Button.Title
Button.Title =  Title; 

//transmite a função Icon para dentro do Button permitindo chamadas Button.Icon
Button.Icon =  Icon; 

//Outra maneura de exportar o botão
export {Button}
