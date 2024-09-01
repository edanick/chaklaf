import { useContext } from "react";

import { IconButton } from "@mui/material";
import { StyledBadge } from "./StyledBadge";
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';

import { CartProductsContext } from "../Contexts/CartProductsContext";

export default function TopBar() {

    const { totalProductsAmount } = useContext(CartProductsContext);

    return (
        <div>

            <IconButton aria-label="cart">
                <StyledBadge badgeContent={totalProductsAmount} color="secondary">
                    <ShoppingCartIcon />
                </StyledBadge>
            </IconButton>
        </div>
    );
}