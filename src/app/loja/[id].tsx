//Tem  esse nome pois ele vai receber um parametro

import { useEffect, useState, useRef } from "react"
import { View, Alert, Modal, StatusBar, ScrollView, Text } from "react-native"
//useLocalSearchParams recupera os paramnetros [id] no nome do arquivo
import { router, useLocalSearchParams, Redirect } from "expo-router"


import { Button } from "@/components/button"
import { Loading } from "@/components/loading"
import { backendAplcacao } from "@/services/api"

import { Cover } from "@/components/market/cover"

import { Details, PropsDetails } from "@/components/market/details"
import { Coupon } from "@/components/market/coupon"

type DataProps = PropsDetails & {
    cover: string
  }


///este recebe o numero da pagina como parametro
export default function Loja() {
    const params  = useLocalSearchParams<{id : string}>()
   
     const [data, setData] = useState<DataProps>()
     const [coupon, setCoupon] = useState<string | null>(null)
     const [isLoading, setIsLoading] = useState(true)
     const [couponIsFetching, setCouponIsFetching] = useState(false)
     const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)
   

    async function fetchMarket() {
        try {
          const { data } = await backendAplcacao.get(`/markets/${params.id}`)
          setData(data)
          setIsLoading(false)
    
        } catch (error) {
          console.log(error)
          Alert.alert("Erro", "Não foi possível carregar os dados", [
            //uma opção para personalzar o botão ele fica com o texto de ok e usa o routerr para voltar a pagina
            {
              text: "OK",
              onPress: () => router.back(),
            },
          ])
        }
      }

      useEffect(() => {
        fetchMarket()
      }, [params.id])


      //se estiver carregando vai aparecer loading e quando termina de baixar os dados ele seta falso e o louding some
      if (isLoading) {
        return <Loading />
      }
    
      if (!data) {
        return <Redirect href="/home" />
      } 
    
  return (
    <View style={{ flex: 1,  }}>
         <ScrollView showsVerticalScrollIndicator={false}>
            <Cover uri={data.cover} />
            <Details data={data} />
            {coupon && <Coupon code={coupon} />}
      </ScrollView>


      {/* //componente de botão */}
      <View style={{ padding: 32 }}>
        <Button 
        // onPress={handleOpenCamera}
        >
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>
    </View>
  )
}