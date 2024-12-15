import { backendAplcacao } from "@/services/api";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Palces } from "@/components/places";

//importa os mapas do google para o react native 
//pega o icones 
import MapView,  {Callout, Marker} from "react-native-maps";
//pegar rotas automaticas
import * as Location from 'expo-location';


import { colors,fontFamily } from "@/styles/theme";
import { router } from "expo-router";


type LojasProps = PlaceProps & {
    latitude: number
    longitude: number
  }
  //seta a latitude e a logitude para usar no maps
 //-15.840083255775555, -48.02826506204693
  const currentLocation = {
    latitude: -15.840083255775555,
    longitude: -48.02826506204693,
  }
  

export default function Home(){

    //sao duas variaveis(funções) do react que servem para gerar uma nova redenrização na tela caso o valor seja alterado
    //vamos definir um tipo e o retorno inicial o tipo vai ser po generics <CategoriesProps> e o inicio vai ser dentro do parenteses [] um array vazio
    const [categorias, setCategorias] = useState<CategoriesProps>([]);

    const [categoria, setCategoria] = useState("");

    const [lojas, setLojas] = useState<LojasProps[]>([]);

    const [location, setLocation] = useState<Location.LocationObject | null>(null);


    async function buscarCategorias() {
        try {

            //busca na rota da aplcação do backend de categorias sendo um get e devolve para const
            const {data} = await backendAplcacao.get("/categories")
            //verificar o retorno
            //console.log(data)

            //adiona o valor recebido da api para o estado de categorias 
            setCategorias(data)
            setCategoria(data[0].id)
            
        } catch (error) {
            console.log(error)
            Alert.alert("Não foi possível carregar as categorias.")
        }
    }

    async function buscarLojas() {
        try {
            if(!categoria){
                return 
            }

            const {data}  = await backendAplcacao.get("/markets/category/"+categoria)
            setLojas(data)
           
        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possivél carregar os locais!")
        }
    }

    //busca localização automatica 
    async function getCurrentLocation() {
      
        try {
            //pede permissão para usar o maps no dispositivo
            let { status } = await Location.requestForegroundPermissionsAsync();
     
           // seta a localização do usaurio caso ele tenha dado permissão
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            
        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possivél carregar o mapa!") 
        }
      }

    //Coloca as funções que vão ser chamadas quando a tela e carregada
    //dentro do array voce pode colocar uma função quando mudar ele re-executa o useEfect
    useEffect(
        ()=>{
            buscarCategorias()
        },
        []
    )

    //é bom criar um Useefect para cada função async e a dependecia fica entre o arry no caso precisa da categoria carregada
    useEffect(
        ()=>{
            buscarLojas()
        },
        [categoria]
    )
    

        //é bom criar um Useefect para cada função async e a dependecia fica entre o arry no caso precisa da categoria carregada
        useEffect(
            ()=>{
                getCurrentLocation()
            },
            [lojas]
        )
    

    return (
        <View style={{flex:1}}>
           <Categories 
           data={categorias} 
           onSelect={setCategoria} 
           selected={categoria}/>

           {/* faz o uso do mapas */}
            <MapView 
            style={{ flex: 1 }} // Faz com que o mapa ocupe toda a área disponível no container pai
            // Define a região inicial do mapa
            initialRegion={{
            latitude:  currentLocation.latitude, // Usa a latitude de `location` ou a de `currentLocation` como fallback
            longitude:  currentLocation.longitude, // Usa a longitude de `location` ou a de `currentLocation` como fallback
            latitudeDelta: 0.0922, // Controle de zoom vertical (valores menores = zoom maior)
            longitudeDelta: 0.0421, // Controle de zoom horizontal (valores menores = zoom maior)
            }}
            >
                {/* Isere um marcador  de localização */}
                <Marker
                    identifier = "current"
                    coordinate={{
                        latitude:  currentLocation.latitude, // Usa a latitude de `location` ou a de `currentLocation` como fallback
                        longitude:  currentLocation.longitude, // Usa a longitude de `location` ou a de `currentLocation` como fallback
                        
                    }}
                    // troca aimagem do marcador
                    image={require("@/assets/location.png")}
                />

                {
                    lojas.map(
                        (item) => (
                            <Marker
                            //como vai percorrer um loop precisa do id
                            key = {item.id}
                            identifier = {item.id}
                            coordinate={{
                                latitude:  item.latitude, // Usa a latitude de `location` ou a de `currentLocation` como fallback
                                longitude:  item.longitude, // Usa a longitude de `location` ou a de `currentLocation` como fallback
                                
                            }}
                            // troca aimagem do marcador
                            image={require("@/assets/pin.png")}
                        >

                        {/* // Componete para exibir dados do lugar */}
                        <Callout 
                        //envia para outra pagina
                          onPress={() => router.navigate(`/loja/${item.id}` as `/loja/[id]`)} 
                        >
                            <View>
                                <Text
                                style={{
                                    fontSize: 14,
                                    color: colors.gray[600],
                                    fontFamily: fontFamily.medium,
                                }}
                                >
                                {item.name}
                                </Text>

                                <Text
                                style={{
                                    fontSize: 12,
                                    color: colors.gray[600],
                                    fontFamily: fontFamily.regular,
                                }}
                                >
                                {item.address}
                                </Text>
                            </View>
                        </Callout>
                        </Marker>
                        )
                    )
                }

            </MapView>



            <Palces data={lojas} />
        </View>
    )
}