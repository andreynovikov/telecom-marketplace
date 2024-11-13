import { useCallback, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useCart } from '@/lib/cart'

export default function useProduct(id) {
    const {
        cart,
        available,
        priceFactor,
        modify
    } = useCart()
    const {
        enqueueSnackbar
    } = useSnackbar()
    const [openModal, setOpenModal] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const cartItem = cart.find(item => item.product.id === id)
    const toggleFavorite = useCallback(() => setIsFavorite(fav => !fav), [])
    const toggleDialog = useCallback(() => setOpenModal(open => !open), [])

    const handleCartAmountChange = (amount, action) => {
        modify(id, amount)

        if (action === 'remove')
            enqueueSnackbar("Удалён из корзины", {
                variant: "success"
            })
        else enqueueSnackbar("Добавлен в корзину", {
            variant: "success"
        })

    }

    return {
        available,
        priceFactor,
        cartItem,
        openModal,
        isFavorite,
        toggleDialog,
        toggleFavorite,
        handleCartAmountChange
    }
}
