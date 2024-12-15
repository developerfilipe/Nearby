//Tem  esse nome pois ele vai receber um parametro

import { useEffect, useState, useRef } from "react"
import { View, Alert, Modal, StatusBar, ScrollView, Text } from "react-native"
//useLocalSearchParams recupera os paramnetros [id] no nome do arquivo
import { router, useLocalSearchParams, Redirect } from "expo-router"
//importa a biblioteca com uso da camera 
import { useCameraPermissions, CameraView } from "expo-camera"


import { Button } from "@/components/button"
import { Loading } from "@/components/loading"
import { Cover } from "@/components/market/cover"
import { Coupon } from "@/components/market/coupon"
import { Details, PropsDetails } from "@/components/market/details"


import { backendAplcacao } from "@/services/api"
import { AxiosError } from "axios"

type DataProps = PropsDetails & {
    cover: string
  }


///este recebe o numero da pagina como parametro
export default function Loja() {
    const params  = useLocalSearchParams<{id : string}>()
   // const [permission, requestPermission] = useCameraPermissions()
    //você pode inibir se for usa apenas o requestPermission
    const [_, requestPermission] = useCameraPermissions()
   
     const [data, setData] = useState<DataProps>()
     const [coupon, setCoupon] = useState<string | null>(null)
     const [isLoading, setIsLoading] = useState(true)
     const [couponIsFetching, setCouponIsFetching] = useState(false)
     const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)
   
     //verifica se leu o qr code 
     const qrLock = useRef(false)
     console.log(params.id)


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
    async function handleOpenCamera() {
      try {
        const { granted } = await requestPermission()
  
        //caso o usario não permitiu 
        if (!granted) {
          //vai aparecer um alerta
          return Alert.alert("Câmera", "Você precisa habilitar o uso da câmera")
        }
  
        qrLock.current = false
        setIsVisibleCameraModal(true)
      } catch (error) {
        console.log(error)
        Alert.alert("Câmera", "Não foi possível utilizar a câmera")
      }
    }

    //busca o cupom na api com base no id do qr code da camera 
    async function getCoupon(id: string) {
      
      try {
        setCouponIsFetching(true)
        console.log(" edereco enviado /coupons/"+ id)
        const { data } = await backendAplcacao.patch("/coupons/"+ id)
  
        Alert.alert("Cupom", data.coupon)
        setCoupon(data.coupon)
      } catch (error) {

        // const axiosError = error as AxiosError; // Garantimos o tipo aqui
        // if (axiosError.response) {
        //     console.error("Erro do servidor:", axiosError.response.data);
        // } else if (axiosError.request) {
        //     console.error("Nenhuma resposta do servidor:", axiosError.request);
        // } else {
        //     console.error("Erro ao configurar requisição:", axiosError.message);
        // }
        console.log(error)
        Alert.alert("Erro", "Não foi possível utilizar o cupom")
        
      } finally { //ao finalizar seta o atributo como falso
        setCouponIsFetching(false)
      }
    }

    // confirma se o usuaurio deseja utilizar o dado obtido da camera ao ler o qr code
    function handleUseCoupon(id: string) {
      setIsVisibleCameraModal(false)
  
      Alert.alert(
        "Cupom",
        "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
        [
          { style: "cancel", text: "Não" },
          { text: "Sim", onPress: () => getCoupon(id) },
        ]
      )
    }
  

      useEffect(() => {
        fetchMarket()
      }, [params.id, coupon])


      //se estiver carregando vai aparecer loading e quando termina de baixar os dados ele seta falso e o louding some
      if (isLoading) {
        return <Loading />
      }
    
      if (!data) {
        return <Redirect href="/home" />
      } 
    
  return (
    <View style={{ flex: 1,  }}>
      {/*  Tema da barra de status e esconde */}
       <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />

{/* ScrollView para telas menores e coloca uma rolagem e esconde indicador de rolagem */}
         <ScrollView showsVerticalScrollIndicator={false}>
            <Cover uri={data.cover} />
            <Details data={data} />
            {coupon && <Coupon code={coupon} />}
      </ScrollView>


      {/* //componente de botão */}
      <View style={{ padding: 32 }}>
        <Button 
         onPress={handleOpenCamera}
        >
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      {/* cração de uma modal para ocupar a tela toda com flex de 1 */}
      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          //le os dados da camera
          onBarcodeScanned={({ data }) => {
            //se possui dados e não esta bloqueado 
            if (data && !qrLock.current) {
              qrLock.current = true
              setTimeout(() => handleUseCoupon(data), 500)
            }
          }
        }
        />

        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsVisibleCameraModal(false)}
            // Habilita o efeito de carregando no botão verificando se os dados ja foram carregados do cumpom com base no ID carregado da camera
            isLoading={couponIsFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}