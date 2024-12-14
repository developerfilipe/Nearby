//Responsavel pelas rotas da aplicação é executado antes mesmo do index.tsx

//importa o tipo de exbição da rota 
import {Stack} from "expo-router"

//importa as fontes criadas 
import {colors} from "@/styles/theme"

import {
    useFonts, //serve para poder usar as fontes
    //fontes que serão usadas 
    Rubik_600SemiBold,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold
} from "@expo-google-fonts/rubik"

//importa o componente de loading criado em components
import { Loading } from "@/components/loading"

export default function Layout(){

    //usa as fontes 
    // useFonts({
    //     Rubik_600SemiBold,
    //     Rubik_400Regular,
    //     Rubik_500Medium,
    //     Rubik_700Bold 
    // })


    //usa e carrega as fontes de forma sincrona 
   const [carregouFontes] =  useFonts({
        Rubik_600SemiBold,
        Rubik_400Regular,
        Rubik_500Medium,
        Rubik_700Bold 
    })

    //Verifica se as fontes foram carregadas caso não fica em espera usando o componente de loading
    if(!carregouFontes){
        return  <Loading />
    }


    //usa a rota
    return <Stack screenOptions={{
          //recebe uma propiedade para ocultar o cabeçalho da view
        headerShown : false,

        //Muda o background de todo o APP
        contentStyle: {backgroundColor :colors.gray[100] }
    
    }}/>
}
