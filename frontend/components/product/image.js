'use client'

import { useState } from 'react'

import Avatar from '@mui/material/Avatar'

import { FlexBox, FlexRowCenter } from '@/components/theme/flex-box'
import LazyImage from '@/components/theme/LazyImage'


export default function ProductImage({ name, images }) {
    const [selectedImage, setSelectedImage] = useState(0)

    return (
        <>
            <FlexBox borderRadius={3} overflow="hidden" justifyContent="center" mb={6}>
                {images.length > 0 && selectedImage < images.length ? (
                    <LazyImage
                        alt={name}
                        width={images[selectedImage].width}
                        height={images[selectedImage].height}
                        loading="eager"
                        src={`${process.env.NEXT_PUBLIC_MEDIA_ROOT}${images[selectedImage].src}`}
                        sx={{
                            objectFit: "contain"
                        }} />
                ) : (
                    null
                )}
            </FlexBox>

            {images.length > 0 && (
                <FlexBox overflow="auto">
                    {images.map((image, index) => (
                        <FlexRowCenter
                            key={index}
                            width={64}
                            height={64}
                            minWidth={64}
                            bgcolor="white"
                            border="1px solid"
                            borderRadius="10px"
                            ml={index === 0 ? "auto" : 0}
                            style={{
                                cursor: "pointer"
                            }}
                            onClick={() => setSelectedImage(index)}
                            mr={index === images.length - 1 ? "auto" : "10px"}
                            borderColor={selectedImage === index ? "primary.main" : "grey.400"}>
                            <Avatar
                                alt={`${name} - ${index + 1}`}
                                src={`${process.env.NEXT_PUBLIC_MEDIA_ROOT}${image.src}`}
                                variant="square"
                                sx={{ height: 40 }} />
                        </FlexRowCenter>
                    ))}
                </FlexBox>
            )}
        </>
    )
}
