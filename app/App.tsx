import React, {useRef} from 'react';
import {Alert, Pressable, SafeAreaView, Text, View} from 'react-native';
import WebView from 'react-native-webview';

const App = () => {
  const webViewRef = useRef<WebView>(null);
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
        onMessage={event => {
          console.log(event);
          Alert.alert(event.nativeEvent.data);
        }}
        source={{uri: '10.0.2.2:3000'}}
      />
    </SafeAreaView>
  );
};

export default App;
