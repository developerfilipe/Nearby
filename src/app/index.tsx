import {View, Text} from "react-native"

import { Welcome } from "@/components/welcome"
import { Steps } from "@/components/steps"
import { Button } from "@/components/button"

//Ao criar uma rota para o servidor e rode de novo
import { router } from "expo-router"
// import { IconPlus } from "@tabler/icons-react-native"

export default function Index(){
    return(
        <View style={{
            flex: 1, 
            padding: 40,
            gap: 40
        }}>
           {/* <Text style={{fontSize :22}}>Hello World!</Text>  */}

           <Welcome/>
           <Steps/>
           {/* Permite que a navegação te leve para home */}
           <Button onPress={()=> router.navigate("/home")}>
                <Button.Title>Começar</Button.Title>
                {/* <Button.Icon icon={IconPlus}></Button.Icon> */}
           </Button>
        </View>
    )

}