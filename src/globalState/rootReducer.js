import themeReducer from './reducers/themeReducer'
import storeReducer from "./reducers/storeReducer"

const rootReducer = ({
    theme,
    store
}, action) => {
    return {
        theme: themeReducer(theme, action),
        store: storeReducer(store, action)
    }
}

export default rootReducer;