const themeReducer = (state, action) => {
    console.log(state, action);
    switch (action.type) {
        case "changeTheme":
            console.log({
                ...state,
                theme: action.payload
            })
            return {
                ...state, ...{
                    primary: action.payload
                }
            }

            default:
                return state
    }
}

export default themeReducer