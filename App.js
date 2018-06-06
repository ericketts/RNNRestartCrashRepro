// @flow

async function afterJSContextReady() {
  const {Navigation} = require('react-native-navigation');
  const MainScreen = require('./MainComp').default;
  const MainScreenName = `main-screen`;
  Navigation.registerComponent(MainScreenName, () => MainScreen);
  Navigation.startSingleScreenApp({
    screen: {
      screen: MainScreenName,
      navigatorStyle: {
        topBarElevationShadowEnabled: false,
        navBarNoBorder: true
      }
    },
    animationType: 'fade'
  });
}

(async () => {
  require('./polyfills');
  const {Platform} = require('react-native');
  // on ios, the fact that we're here means the JS context is ready and stable
  if (Platform.OS === 'ios') {
    return await afterJSContextReady();
  }
  // on Android, we might resume the context in the background _after_ parsing the bundle and arriving here,
  // meaning if we try to  start the navigation lib immediatly, it would give us that endless splash screen bug
  const {Navigation, NativeEventsReceiver} = require('react-native-navigation');
  const contextReadyImmediately = await Navigation.isAppLaunched();
  if (contextReadyImmediately) {
    return await afterJSContextReady();
  }
  (new NativeEventsReceiver).appLaunched(afterJSContextReady);
})();
