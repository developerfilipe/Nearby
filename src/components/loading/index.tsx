//componente de loading
import { ActivityIndicator } from "react-native";

//importar o arquivo criado de estilos para o componente 
import { st } from "./styles";

import { colors } from "@/styles/theme";

export function Loading(){
    return <ActivityIndicator color={colors.green.base} style = {st.meuContainer} />
}