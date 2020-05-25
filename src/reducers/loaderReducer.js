const loaderReducer = (state = false, action) => {
    switch (action.type) {
        case "IS_LOADING":
            return action.data
        default:
            return state;
    }
}

export default loaderReducer;