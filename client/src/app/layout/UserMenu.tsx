import { Person, Inventory, Logout, History } from "@mui/icons-material";
import { Button, Menu, MenuItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../lib/types/user";
import { useLogoutMutation } from "../../features/account/accountApi";

type Props = {
    user: User;
}

export default function UserMenu({user}: Props) {
    const [logout] = useLogoutMutation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                onClick={handleClick}
                color='inherit'
                size="large"
                sx={{ fontSize: '1.1rem' }}
            >
                {user.email}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <Person />
                    </ListItemIcon>
                    <ListItemText>My profile</ListItemText>
                </MenuItem>
                <MenuItem component={Link} to='/orders'>
                    <ListItemIcon>
                        <History />
                    </ListItemIcon>
                    <ListItemText>My orders</ListItemText>
                </MenuItem>
                {user.roles.includes('Admin') &&
                    <MenuItem component={Link} to='/inventory'>
                        <ListItemIcon>
                            <Inventory />
                        </ListItemIcon>
                        <ListItemText>Inventory</ListItemText>
                    </MenuItem>}
                <Divider />
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    )
}