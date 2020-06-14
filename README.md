# White Noise

A White Noise player for Android built on React Native. Includes a web server that allows controlling playback remotely.

# Usage

You need to have [React Native setup](https://reactnative.dev/docs/environment-setup) and Android Studio installed and configured.

You should be able to run the application on an Android phone using the command

```bash
npx react-native run-android
```

The main screen will show you the IP and port of the server.

The following commands are supported:

* `GET /play` - start the white noise playing
* `GET /pause` - pause the white noise
* `GET /status` - get the current status (`{"status": "playing|paused"}`)

# Why?

I built this to have a white noise generator running in a separate room that I oculd control over the network. In my case I am using [Homebridge](https://homebridge.io) and the [homebridge-http-switch](https://www.npmjs.com/package/homebridge-http-switch) plugin to incorporate white noise into selected HomeKit scenes.

# Contributing

If you find this useful and want to contribute by all means send me a pull request. I'm not actively maintaining this unless there's something in particular I would like added.