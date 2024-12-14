import { StyleSheet } from "react-native";
import {fontFamily, colors} from "@/styles/theme"


export const s  = StyleSheet.create(
    {
        container : {
            height : 56,
            maxHeight : 56,
            borderRadius : 10,
            backgroundColor :  colors.green.base,
            alignItems : "center",
            justifyContent :  "center",
            flexDirection : "row",
            gap :  14, //espaçamento entre os elementos dentro do contaner

        },
        title : {
            color :  colors.gray[100],
            fontFamily :  fontFamily.semiBold,
            fontSize : 16,
        }
    }
)