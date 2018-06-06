## RNNResetartCrashRepro

This repo is a minimal reproduction of the crash caused when using `wix/react-native-navigation` on Android with any lib that calls `ReactInstanceManager.recreateReactContextInBackground()` (which here is the `avishayil/react-native-restart` lib, but could just as easily be `Microsoft/react-native-code-push`).

I go into a bit of detail about why I believe this is happening at [this ticket comment](https://github.com/wix/react-native-navigation/issues/2331#issuecomment-395143392).



#### Repro

##### Setup
To see the issue in action, clone this repo, `cd` into the project, use `yarn` to install the deps (I cannot guarentee using `npm` will work, since I override the `core-js` resolution using a `yarn` specific feature).


##### Running
Execute `react-native run-android` in the project dir with your simulator running or device attached. You should see roughly the default component you get when generating a new RN project, with the addition of the `Tap me to trigger a restart` header.

Tapping the aforementioned header will trigger a restart after a few seconds; blink and you'll miss it, but in debug, a redbox will be shown due to the invariant violation of `Module AppRegistry is not a registered callable module (calling runApplication)` (see the link to the ticket comment above to see why this is). If you don't see the redbox, check `adb` logs to verify that this exception does indeed occur.

If building for prod, your app has now crashed. If in debug, a new activity will appear, and our JS context will have fully reloaded (which you can (hopefully) verify by noting a change to the component's background color).

If you want, try the same steps above, but with `react-native run-ios`, and note that there are no exceptions thrown, as there appear to be no issues.



#### Fix?

I have an idea for a fix, but need to investigate the potential ramifications further before I publish it (I'll likely put in a PR on the `react-native-navigation` repo, but as they're focused on V2, and this is (afaik) a V1 issue, I'm not sure whether it'll be merged ever...)
