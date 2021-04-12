const userReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "LOGIN":
            return {
                ...state, isLoggedIn: action.payload
            }
            case "CHANGE_USER":
                return {
                    ...state, ...action.payload
                }
                case "CLAER_USER":
                    return {}
                    default:
                        return state
    }
}
export default userReducer;