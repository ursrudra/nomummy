const storeReducer = (state, action) => {
    console.log(state, action);
    switch (action.type) {
        case "ADD_PRODUCT":
            return [
                ...state,
                action.payload
            ]
        case "UPDATE_PRODUCT":
            return state.map(product => {
                if (product.product_id === action.payload.product_id) {
                    return {
                        ...product,
                        ...action.payload
                    }
                }
                return product
            })
        case "DELETE_PRODUCT":
            return state.filter(product => product.product_id !== action.payload.product_id)

        default:
            return state
    }
}
export default storeReducer;