export const jsonToBase64 = (json: any) => {
    return btoa(unescape(encodeURIComponent(JSON.stringify(json))));
}

export const base64ToJson = (base64: string) => {
    return JSON.parse(decodeURIComponent(escape(atob(base64))));
}