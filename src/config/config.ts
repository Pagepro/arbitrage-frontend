const config: any = {
    get websocketBase () {
        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
    
        return `${protocol}//${window.location.host}`
    }
}

const apiConfig = {
    config: '/api/config'
}

const websocketsConfig = {
    exchanges: `${config.websocketBase}/ws/exchanges`
}

export {
    apiConfig,
    websocketsConfig
};