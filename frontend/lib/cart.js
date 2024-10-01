'use client'

import { createContext, useContext, useCallback, useEffect, useState, useMemo, useReducer } from 'react'

import { useSession } from 'next-auth/react'

import { getCart, updateCart, deleteCart } from '@/components/cart/queries'

const CartContext = createContext({})

function CartProvider({ children }) {
    //const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const [cart, setCart] = useState([])
    const [available, setAvailable] = useState(false)

    const session = useSession()

    const setCartVerified = (result) => {
        setAvailable(Array.isArray(result))
        if (Array.isArray(result))
            setCart(result)
    }

    useEffect(() => {
        setAvailable(session.status === 'authenticated')
        if (session.status === 'authenticated')
            getCart().then((result) => setCartVerified(result))
    }, [session])

    const modify = useCallback((product, quantity) => {
        updateCart(product, quantity).then((result) => setCartVerified(result))
    }, [])

    const clear = useCallback(() => {
        deleteCart().then(() => setCartVerified([]))
    }, [])

    const contextValue = useMemo(() => ({
        cart,
        available,
        total: cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
        modify,
        clear
    }), [cart, available, modify, clear])

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart }
