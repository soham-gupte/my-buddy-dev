import { Image, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { colors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function HomeScreen() {

  const navigation = useNavigation();
  
  const handleLogout = async() => {
    // navigation.navigate('Welcome');
    await signOut(auth);
  }

  return (
    <ScreenWrapper className="flex-1">
        <View className='flex-row justify-between items-center p-4'>
            <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>MyBuddy</Text>
            <TouchableOpacity onPress={handleLogout} className="p-2 px-3 border bg-blue-200 border-gray-200 rounded-full">
                <Text className={`white`}>Logout</Text>
            </TouchableOpacity>
        </View>
        <View className='flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4'>
            <Image source={require('../assets/images/banner.png')} className='w-60 h-60'/>
        </View>
    </ScreenWrapper>
  );
}