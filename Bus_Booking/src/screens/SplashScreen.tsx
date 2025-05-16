import React, { useEffect } from 'react'
import { Alert, Image, Text, View } from 'react-native'
import tw from 'twrnc'
import { StatusBar } from 'react-native'
import { jwtDecode } from 'jwt-decode'
import { getAccessToken, getRefreshToken } from '../service/storage'
import { resetAndNavigate } from '../utils/NavigationUtils'
import { refresh_tokens } from '../service/requests/auth'

interface DecodedToken{ //it is for google signup
  exp:number;
}


const SplashScreen = () => {
  const tokenCheck = async () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken() as string;

    if(accessToken){
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(accessToken);
      
      const currentTime = Date.now()/100;

      if(decodedRefreshToken?.exp < currentTime){
        resetAndNavigate('LoginScreen');
        Alert.alert('Session Expired, please login again');
        return;
      }

      if(decodedAccessToken?.exp < currentTime){
        const refreshed = await refresh_tokens();
        if(!refreshed){
          Alert.alert('There was an error');
          return;
        }
      }

      resetAndNavigate('HomeScreen')
      return
    }
    resetAndNavigate('LoginScreen')
  };

  
  useEffect(() => {
    const timeoutId= setTimeout(()=>{
      tokenCheck()
    },1500)
    return () => clearTimeout(timeoutId)
  },[])
  
    // useEffect(() => {
    //     const checkToken = async () => {
    //         const token = getAccessToken();
    //         if (token) {
    //             resetAndNavigate('HomeScreen');
    //         } else {
    //             resetAndNavigate('LoginScreen');
    //         }
    //     };

    //     setTimeout(checkToken, 1500); // Simulate a splash screen delay
    // }, []);



  return (       
      <View style={tw`flex-1 justify-center bg-white items-center`}>
          <Image
              source={require('../assets/images/logo_t.png')}
              // style={tw`w-1/2 h-1/2`}
              style={tw`h-[30%] w-[60%]`}
              resizeMode="contain"
              />
      </View>
  )
}


export default SplashScreen;