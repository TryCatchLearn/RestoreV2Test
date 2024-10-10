import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { useFetchBasketQuery } from "../../features/basket/basketApi";

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' }
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' },
]

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: '#baecf9'
    }
}

type Props = {
    toggleDarkMode: () => void;
    darkMode: boolean;
}

export default function NavBar({ toggleDarkMode, darkMode }: Props) {
    const { isLoading } = useAppSelector(state => state.ui);
    const { data: basket } = useFetchBasketQuery();

    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

    return (
        <AppBar position="fixed">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex' alignItems='center'>
                    <Typography component={NavLink} to='/' variant="h6" sx={navStyles}>RE-STORE</Typography>
                    <IconButton onClick={toggleDarkMode}>
                        {darkMode ? <DarkMode /> : <LightMode sx={{ color: 'yellow' }} />}
                    </IconButton>
                </Box>

                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to='/basket' size='large' edge='start' color='inherit' sx={{ mr: 2 }}>
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
            {isLoading &&
                <Box sx={{ width: '100%' }}>
                    <LinearProgress color="secondary" />
                </Box>}
        </AppBar>
    )
}