//componente de loading
//useWindowDimensions  utiliza-se para fazer o redimensionamento da tela
import { Text,  useWindowDimensions } from "react-native";

//importa componente https://gorhom.dev/react-native-bottom-sheet/
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

//importar o arquivo criado de estilos para o componente 
import { s } from "./styles";

import { colors } from "@/styles/theme";

import { Place, PlaceProps } from "../place";
import { useRef } from "react";


type Props = {
    data : PlaceProps[]
}

export function Palces({data} : Props){
    const dimensions = useWindowDimensions()
    const bottomSheetRef = useRef<BottomSheet>(null)
  
    const snapPoints = {
      min: 278,
      max: dimensions.height - 128,
    }
  
    return (
        <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[snapPoints.min, snapPoints.max]}
        handleIndicatorStyle={s.indicator}
        backgroundStyle={s.container}
        enableOverDrag={false}
      >
        <BottomSheetFlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Place data={item} />}
          contentContainerStyle={s.content}
          ListHeaderComponent={() => (
            <Text style={s.title}>Explore locais perto de você</Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      </BottomSheet>
    )
}