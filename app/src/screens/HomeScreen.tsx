import {useRef} from 'react';
import {SafeAreaView, View, Pressable, Text} from 'react-native';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
type onMessageData =
  | {
      type: 'GetAsyncStorage';
      key?: string;
    }
  | {type: 'SetAsyncStorage'; key: string; value: string}
  | {type: 'navigate'; key: keyof RootStackParamList};
export const HomeScreen: React.FC = () => {
  const webViewRef = useRef<WebView>(null);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{height: '50%', justifyContent: 'center'}}>
        <Pressable
          onPress={() => {
            console.log('App to Web');
            webViewRef.current?.postMessage(
              JSON.stringify({type: 'myType', data: 'doSomething'}),
            );
          }}
          style={{alignItems: 'center'}}>
          <Text>App to Web</Text>
        </Pressable>
      </View>
      <WebView
        ref={webViewRef}
        javaScriptEnabled={true}
        onMessage={async event => {
          console.log(event);
          const data: onMessageData = JSON.parse(event.nativeEvent.data);
          if (data.type === 'navigate' && data.key) {
            navigation.navigate(data.key);
          }
          if (data.type === 'GetAsyncStorage' && data.key) {
            const value = await AsyncStorage.getItem(data.key);
            if (value) {
              webViewRef.current?.postMessage(
                JSON.stringify({
                  type: `GetAsyncStorage${data.key}`,
                  data: value,
                }),
              );
            } else {
              webViewRef.current?.postMessage(
                JSON.stringify({
                  type: `ErrorAsyncStorage${data.key}`,
                  message: `AsyncStorage key ${data.key} not found`,
                }),
              );
            }
          }
          if (data.type === 'SetAsyncStorage' && data.key && data.value) {
            await AsyncStorage.setItem(data.key, data.value);
          }
        }}
        source={{uri: '10.0.2.2:3000'}}
      />
    </SafeAreaView>
  );
};
