
export const loadSession = key => {
    return {
        type: "PERSIST_LOAD",
        key: key
    };
}

export const saveSession = () => {
    return {
        type: "PERSIST_SAVE"
    };
}

