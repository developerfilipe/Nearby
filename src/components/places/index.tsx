//componente de loading
//useWindowDimensions  utiliza-se para fazer o redimensionamento da tela
import { Text,  useWindowDimensions } from "react-native";

//importa componente https://gorhom.dev/react-native-bottom-sheet/
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

//importar o arquivo criado de estilos para o componente 
import { s } from "./styles";

//redireciona para uma pagina
import { router } from "expo-router"

import { colors } from "@/styles/theme";

import { Place, PlaceProps } from "../place";
import { useRef } from "react";


type Props = {
    data : PlaceProps[]
}

export function Palces({data} : Props){
    const dimensions = useWindowDimensions()
    const bottomSheetRef = useRef<BottomSheet>(null)
  
    //seta altura maxima e minima bsaeada na altura da tela 
    const snapPoints = {
      min: 278,
      max: dimensions.height - 128,
    }
  
    return (
        <BottomSheet
        ref={bottomSheetRef}
        //define a altura maxima e minima do componente
        snapPoints={[snapPoints.min, snapPoints.max]}
       //personaliza com nosso css 
        handleIndicatorStyle={s.indicator}
        backgroundStyle={s.container}
        //não deixa passar do tamanho maximo
        enableOverDrag={false}
      >
        <BottomSheetFlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Place 
          data={item} 
          onPress={() => router.navigate(`/loja/${item.id}` as `/loja/[id]`)} 
        />}
            //coloca nossa estilização no comoponente
          contentContainerStyle={s.content}
          //passamos um header
          ListHeaderComponent={() => (
            <Text style={s.title}>Explore locais perto de você</Text>
          )}
          //
          showsVerticalScrollIndicator={false}
        />
      </BottomSheet>
    )
}