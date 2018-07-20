let websocketURL = "";
if (window.location.protocol === "https:") {
    websocketURL += "wss:";
}
else {
    websocketURL += "ws:";
}
websocketURL += "//" + window.location.host;
websocketURL += "/ws/websocket";

export default websocketURL;