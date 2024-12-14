import { Pressable, PressableProps, Text } from "react-native"
import {s} from "./styles"
import {colors} from "@/styles/theme"
import { categoriesIcons } from "@/utils/categories-icons"


//Cria as propriedades obrigatorias tipagem do typesCript
//e tipo o TouchableOpacity só que não fica opaco
type Props =  PressableProps &{
    iconId: string
    isSelected?: boolean 
    name:  string 
}

export function Category({name,  iconId,  isSelected = false,  ...rest} : Props){
    const Icon =  categoriesIcons[iconId]
    return(
        //passa o rest para funcionar onPress
       <Pressable style={[s.container, isSelected && s.containerSelected]} {...rest}>
        <Icon size={16} color={colors.gray[ isSelected ? 100  : 400 ]}/>
            <Text style={[s.name, isSelected && s.nameSelected  ]}>{name}</Text>
       </Pressable> 
    )

}