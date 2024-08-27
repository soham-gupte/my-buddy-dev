import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { colors } from '../theme';
import { useState } from 'react/cjs/react.development';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLoading } from '../redux/slices/user';

export default function SignUpScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();
    const {userLoading} = useSelector(state => state.user);

    const dispatch = useDispatch();

    const handleSignIn = async () => {
        if (email && password) {
            // navigation.goBack();
            // navigation.navigate('Home');
            try {
                dispatch(setUserLoading(true));
                await signInWithEmailAndPassword(auth, email, password);
                dispatch(setUserLoading(false));
            }
            catch(e) {
                dispatch(setUserLoading(false));
                ToastAndroid.show(e.message, ToastAndroid.SHORT);
            }
        }
        else {
            // error
            ToastAndroid.show('Please enter email and password', ToastAndroid.SHORT);
        }
    }

  return (
    <ScreenWrapper>
        <View className='flex justify-between h-full mx-4 mt-4'>
            <View>
                <View className='relative'>
                    <View className='absolute top-0 left-0 z-10'>
                        <BackButton/>
                    </View>
                    <Text className={`${colors.heading} text-xl font-bold text-center`}>Sign In</Text>
                </View>
                <View className='flex-row justify-center my-3 mt-5'>
                    <Image source={require('../assets/images/login.png')} className='h-72 w-72'/>
                </View>
                <View className='space-y-2 mx-2'>
                    <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
                    <TextInput autoCapitalize='none' keyboardType='email-address' value={email} onChangeText={value => setEmail(value.replace('/\s/g', ''))} className='p-4 bg-white rounded-full mb-2'/>
                    <Text className={`${colors.heading} text-lg font-bold`}>Password</Text>
                    <TextInput value={password} secureTextEntry onChangeText={value => setPassword(value.replace(/\s/g, ''))} className='p-4 bg-white rounded-full mb-10'/>
                    {
                        userLoading ? (
                            <Loading/>
                        ) : (
                            <TouchableOpacity onPress={handleSignIn} style={{backgroundColor: colors.button}} className={`${colors.heading} text-lg font-bold p-4 my-10 rounded-full`}>
                                <Text className='text-center text-lg text-white font-bold'>Sign In</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
            {/* <View>
            {
                userLoading ? (
                    <Loading/>
                ) : (
                    <TouchableOpacity onPress={handleSignIn} style={{backgroundColor: colors.button}} className={`${colors.heading} text-lg font-bold p-4 my-10 rounded-full`}>
                        <Text className='text-center text-lg text-white font-bold'>Sign In</Text>
                    </TouchableOpacity>
                )
            }    
            </View> */}
        </View>
    </ScreenWrapper>
  );
}