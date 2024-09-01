import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    IconButton,
    Typography
} from "@mui/material";

import {
    AddShoppingCart as AddShoppingCartIcon,
    RemoveShoppingCart as RemoveShoppingCartIcon
} from "@mui/icons-material";


type Props = {
    _id: number,
    title: string,
    currencySymbol: string,
    price: number,
    shippingPrice: number,
    onAddToCartButtonClick: (_id: number) => void
}

export default function ProductCard({ _id, title, currencySymbol, price, shippingPrice, onAddToCartButtonClick }: Props) {
    return (
        <Card sx={{ boxShadow: 1, minHeight: 446 }}>

            <CardActionArea>
                <CardMedia component="img" sx={{ minHeight: 180, maxHeight: 180 }} image={'https://www.livemint.com/lm-img/img/2023/08/14/1600x900/garena_free_fire_max_1688877791610_1691982307589.jpg'} />
            </CardActionArea>

            <CardContent>

                <CardHeader sx={{ p: 0, mb: 1 }} title={title} />

                <Box sx={{ mt: 1 }}>
                    <Typography variant="body2">
                        <Typography component="span" variant="subtitle1" fontWeight="700">{currencySymbol}{price}</Typography>
                    </Typography>
                    <Typography variant="body2">
                        <Typography component="span" variant="subtitle1" fontWeight="700">{currencySymbol}{shippingPrice} Shipping</Typography>
                    </Typography>
                </Box>

                <Divider />

                <Box display="flex" justifyContent="space-between" >
                    <Box>
                    </Box>
                    <Box>
                        {/* <IconButton><RemoveShoppingCartIcon /></IconButton> */}
                        <IconButton onClick={() => { onAddToCartButtonClick(_id); }} ><AddShoppingCartIcon /></IconButton>
                    </Box>
                </Box>
            </CardContent>


        </Card>
    );
}