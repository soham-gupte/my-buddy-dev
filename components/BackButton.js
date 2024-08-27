import { Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { colors } from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function BackButton() {

    const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
        <ChevronLeftIcon size='30' color={colors.button}/>
    </TouchableOpacity>
  );
}