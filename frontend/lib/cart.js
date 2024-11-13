'use client'

import { createContext, useContext, useCallback, useEffect, useState, useMemo, useReducer } from 'react'

import { useSession } from 'next-auth/react'

import { getCart, updateCart, deleteCart } from '@/components/cart/queries'
import { getContractors } from '@/components/contractor/queries'

const CartContext = createContext({})

function CartProvider({ children }) {
    //const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const [cart, setCart] = useState([])
    const [available, setAvailable] = useState(false)
    const [priceFactor, setPriceFactor] = useState(1)

    const session = useSession()

    const setCartVerified = (result) => {
        setAvailable(Array.isArray(result))
        if (Array.isArray(result))
            setCart(result)
    }

    useEffect(() => {
        setAvailable(session.status === 'authenticated')
        if (session.status === 'authenticated') {
            getCart().then(result => setCartVerified(result))
            getContractors().then(result => {
                const priceFactor = result.reduce((priceFactor, contractor) => {
                    if (contractor.price_factor === null)
                        return priceFactor
                    const factor = Number(contractor.price_factor)
                    return factor < priceFactor ? factor : priceFactor
                }, 1)
                setPriceFactor(priceFactor)
            })
        }
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
        priceFactor,
        total: cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
        modify,
        clear
    }), [cart, available, priceFactor, modify, clear])

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart }
