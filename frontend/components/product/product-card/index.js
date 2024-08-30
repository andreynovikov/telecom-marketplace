import { Fragment } from 'react'
import Link from 'next/link'

//import Button from "@mui/material/Button";
//import ButtonBase from "@mui/material/ButtonBase";
//import clsx from "clsx";

//import Add from "@mui/icons-material/Add";
//import Remove from "@mui/icons-material/Remove";

import LazyImage from "@/components/theme/LazyImage";
import { FlexBox } from "@/components/theme/flex-box";
import { H6, Paragraph } from "@/components/theme/Typography";

//import useProduct from "../use-product";

//import { calculateDiscount, currency } from "lib";

import { Content, PriceText } from "./styles";

export default function ProductCard({
    product
}) {
    const {
        id,
        name,
        image
    } = product || {};
    console.log(product)

    /*
    const {
        cartItem,
        handleCartAmountChange
    } = useProduct(slug)

    const handleIncrementQuantity = () => {
        const product = {
            id,
            slug,
            price,
            name: title,
            imgUrl: thumbnail,
            qty: (cartItem?.qty || 0) + 1
        };
        handleCartAmountChange(product);
    }

    const handleDecrementQuantity = () => {
        const product = {
            id,
            slug,
            price,
            name: title,
            imgUrl: thumbnail,
            qty: (cartItem?.qty || 0) - 1
        };
        handleCartAmountChange(product, "remove");
    }
    */

    return <Fragment>
        <Link href={`/product/${id}`}>
            <FlexBox bgcolor="grey.50" borderRadius={3} mb={2}>
                {image && (
                    <LazyImage
                        alt={name}
                        width={image.thumbnail.width}
                        height={image.thumbnail.height}
                        src={`${process.env.NEXT_PUBLIC_MEDIA_ROOT}${image.thumbnail.src}`} />
                )}
            </FlexBox>
        </Link>

        <Content>
            <H6 fontSize={17} fontWeight={700}>
                {name}
            </H6>

            {/*
            <PriceText>
                { price }
            </PriceText>

            <div className={clsx({
                "button-small": btnSmall
            })}>
                {!cartItem?.qty ? <Button fullWidth disableElevation color="primary" variant="contained" onClick={handleIncrementQuantity}>
                    Add To Cart
                </Button> : <div className="button-group">
                    <ButtonBase className="base-button" onClick={handleDecrementQuantity}>
                        <Remove fontSize="small" />
                    </ButtonBase>

                    <Paragraph flex={1} fontWeight="600" lineHeight={1.75}>
                        {cartItem?.qty}
                    </Paragraph>

                    <ButtonBase className="base-button" onClick={handleIncrementQuantity}>
                        <Add fontSize="small" />
                    </ButtonBase>
                </div>}
            </div>
            */
            }
        </Content>
    </Fragment>
}