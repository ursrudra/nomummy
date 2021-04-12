const initialState = {
    isLoginPending: false,
    isAuthenticated: false,
    screenToRender: "LOGIN_SCREEN",
    isAuthenticationFailed: false,
    authMessage: ""
}
const AuthReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case "SIGN_IN_STARTING":
            return {
                ...state, ...action.payload
            }
            case "SIGN_IN_PENDING":
                return {
                    ...state, ...action.payload
                }
                case "SIGN_IN_ERROR":
                    return {
                        ...state, ...action.payload
                    }
                    case "SIGN_IN_SUCCESS":
                        return {
                            ...state, ...action.payload
                        }
                        default:
                            return state
    }
}

export default AuthReducer