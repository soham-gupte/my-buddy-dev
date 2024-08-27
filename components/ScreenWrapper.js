import { Text, View, StatusBar, Platform, ScrollView } from 'react-native';

export default function ScreenWrapper({children}) {
    let statusBarHeight = StatusBar.currentHeight? StatusBar.currentHeight: Platform.OS === 'ios' ? 30 : 0;
    return (
        <ScrollView style={{paddingTop: statusBarHeight}}>
        {
            children
        }
        </ScrollView>
    );
}