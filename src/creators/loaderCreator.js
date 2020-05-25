export const isBusy = (status) => {
    return { type: "IS_LOADING", data: status }
}