'use client'

import { createContext, useContext, useCallback, useEffect, useState, useMemo, useReducer } from 'react'

import { useSession } from 'next-auth/react'

import { getCart, updateCart, deleteCart } from '@/components/cart/queries'

const CartContext = createContext({})

function CartProvider({ children }) {
    //const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const [cart, setCart] = useState([])

    const session = useSession()

    useEffect(() => {
        getCart().then((result) => setCart(result))
    }, [session])

    const modify = useCallback((product, quantity) => {
        updateCart(product, quantity).then((result) => setCart(result))
    }, [])

    const clear = useCallback(() => {
        deleteCart().then(() => setCart([]))
    }, [])

    const contextValue = useMemo(() => ({
        cart,
        modify,
        clear,
        total: cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    }), [cart, modify, clear])

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart }
