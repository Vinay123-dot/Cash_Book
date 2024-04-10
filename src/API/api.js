import appConfig from "../configs/app.config";

export const getTerminalList = async(data) => {

    const response = await fetch(`${appConfig.apiPrefix}/v1/mos/merchantTerminal`,{
        headers:{ 
            'Content-Type': `${appConfig.Authorization}`, 
            'auth_token':`${appConfig.authToken}`,
            "channel": `${appConfig.channel}` 
        },
        method: 'GET',
    })

    const datam = await response.json();
    return datam;
}

