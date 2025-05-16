import React ,{useState} from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useMutation } from '@tanstack/react-query';
import { loginWithGoogle } from '../service/requests/auth';
import { resetAndNavigate } from '../utils/NavigationUtils';


GoogleSignin.configure({
    webClientId:'149632330500-qbaopj5r19492uukpcbhgeq2i23ad7hb.apps.googleusercontent.com', // From Firebase Console
    // androidClientId:'149632330500-q0jqf2nusg96nf1m0j85um1p3k8ug341.apps.googleusercontent.com', // From Firebase Console
});



const LoginScreen = () => {
    const [Phone, setPhone] = useState('');
    
    const loginMutation = useMutation({

        mutationFn: loginWithGoogle,
        onSuccess: () => {
            resetAndNavigate('HomeScreen')
        },
        onError: error => {
            console.error('Login Failed', error);
        }
    });
    

    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            loginMutation.mutate(response.data?.idToken as string);
            
        } catch (error) {
            console.error('Google Sign-In Error:', error);
        }
    }
    
    
    
    
    
    return (
        <View>
            <Image
                source={require('../assets/images/cover.jpeg')}
                style={tw`w-full h-64 bg-cover`}
            />
            <View style={tw`p-4`}>
                <Text style={tw`font-okra font-semibold text-xl text-center`}>
                    Create Account or Sign in
                </Text>
                <View style={tw`my-4 mt-12 border-1 gap-2 border border-black px-2 flex-row items-center`}>
                    <Text style={tw`font-okra w-[10%] font-bold text-base`}>
                        +91
                    </Text>
                    <TextInput
                        value={Phone}
                        onChangeText={setPhone}
                        maxLength={10}
                        keyboardType='number-pad'
                        placeholder='Enter 10 digit phone number'
                        style={tw`font-okra h-11 w-[90%]`}
                    />
                </View>
                <TouchableOpacity
                onPress={handleGoogleSignIn}
                style={tw`bg-red-500 justify-center items-center p-3 rounded-lg my-4`}>
                <Text style={tw`text-white font-semibold font-okra`}>
                    LET'S GO
                </Text>
                </TouchableOpacity>
                <Text style={tw`text-center my-8 text-sm font-okra text-gray-700`}>
                    ------ OR ------
                </Text> 
                <View style={tw`flex items-center justify-center flex-row gap-4`}>
                    <TouchableOpacity 
                    onPress={handleGoogleSignIn}
                    style={tw`border border-gray-300 p-2`}>
                        <Image
                            source={require('../assets/images/google.png')}
                            style={tw`w-5 h-5 contain-size`}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`border border-gray-300 p-2`}>
                        <Image
                            source={require('../assets/images/apple.png')}
                            style={tw`w-5 h-5 contain-size`}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={tw`text-okra test-sm text-gray-500 font-medium text-center mt-10 w-72 self-center`}>
                    By signing up, you agree to our Terms of Service and Privacy Policy.
                </Text>

            </View>
        </View>
    )
}


export default LoginScreen;