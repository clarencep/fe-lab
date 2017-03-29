# node-websocket-log-server-demo
A demo for how to use websocket-log-server

# How to run the demo:

## 1. download the code

```
git clone https://github.com/Clarence-pan/node-websocket-log-server-demo.git 

```

## 2. install npm packages 

```
cd node-websocket-log-server-demo
npm install
```

## 3. build the project

```
npm run build
```

## 4. run the websocket-log-server

```
.\node_modules\.bin\websocket-log-server

```


## 5. run the HTTP server 

Open another terminal window (as the previous is occupied by websocket-log-server) and execute command:

```
npm run server
```

If everthing is fine, your default browser will be opened and a demo page will be shown. Try click on the page, then you can find log messages on step#4's terminal.
