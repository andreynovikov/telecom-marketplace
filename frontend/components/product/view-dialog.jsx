'use client'

import Grid from "@mui/material/Grid"
import Dialog from "@mui/material/Dialog"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import DialogContent from "@mui/material/DialogContent"

import { Carousel } from "@/components/theme/carousel"
import BazaarImage from "@/components/theme/BazaarImage"
import { FlexRowCenter } from '@/components/theme/flex-box'
import { H1, H2, Paragraph } from "@/components/theme/Typography"

import { CloseIcon } from '@/theme/icons'
import { IconCamera } from '@tabler/icons-react'

import { getCategory } from '@/components/product/category/queries'

import { useCart } from '@/lib/cart'
import { currency } from '@/lib'
import { useEffect, useState } from 'react'

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

import styles from '@/components/ui/admin/mdx-editor.module.css'

export default function ProductViewDialog(props) {
    const {
        product,
        images,
        open,
        onClose
    } = props

    const [category, setCategory] = useState({})

    useEffect(() => {
        if (product.category !== undefined)
            getCategory(product.category).then(category => setCategory(category))
        else
            setCategory({})
    }, [product])

    const { cart, available, modify } = useCart()
    const cartItem = cart.find(item => item.product.id === product.id)

    const handleCartAmountChange = amount => () => modify(product.id, amount)

    return (
        <Dialog open={open} maxWidth={false} onClose={onClose} sx={{ zIndex: 1501 }}>
            <DialogContent sx={{
                maxWidth: 900,
                width: "100%"
            }}>
                <div>
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            {images.length > 0 ? (
                                <Carousel slidesToShow={1} arrowStyles={{
                                    boxShadow: 0,
                                    color: "primary.main",
                                    backgroundColor: "transparent"
                                }}>
                                    {images.map((image, index) => <BazaarImage key={index} src={`${process.env.NEXT_PUBLIC_MEDIA_ROOT}${image.src}`} alt="product" sx={{
                                        mx: "auto",
                                        width: "100%",
                                        objectFit: "contain",
                                        height: {
                                            sm: 400,
                                            xs: 250
                                        }
                                    }} />)}
                                </Carousel>
                            ) : (
                                <FlexRowCenter sx={{ aspectRatio: 1, position: "relative" }}>
                                    <IconCamera color='grey' size={150} strokeWidth={1.5} />
                                </FlexRowCenter>
                            )}
                        </Grid>

                        <Grid item md={6} xs={12} sx={{ alignSelf: "center" }}>
                            <H2>{product.name}</H2>

                            <Paragraph py={1} color="grey.500" fontWeight={600} fontSize={13}>
                                Категория: {category?.name}
                            </Paragraph>

                            <H1 color="primary.main">{currency(product.price)}</H1>

                            {product.description && <Paragraph my={2}>
                                <Markdown className={styles.prose} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                    {product.description}
                                </Markdown>
                            </Paragraph>}

                            <Divider sx={{
                                mb: 2
                            }} />

                            {available && (
                                <Button
                                    size="large"
                                    color="dark"
                                    variant="contained"
                                    disabled={cartItem?.quantity > 0}
                                    onClick={handleCartAmountChange(1)}
                                    sx={{
                                        height: 45,
                                        borderRadius: 2
                                    }}>
                                    {cartItem?.quantity > 0 ? 'В корзине' : 'В корзину'}
                                </Button>

                            )}
                        </Grid>
                    </Grid>
                </div>

                <IconButton sx={{
                    position: "absolute",
                    top: 3,
                    right: 3
                }} onClick={onClose}>
                    <CloseIcon fontSize="small" color="secondary" />
                </IconButton>
            </DialogContent>
        </Dialog>
    )
}
