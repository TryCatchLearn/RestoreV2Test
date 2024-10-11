import { LockOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginSchema, LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLazyUserInfoQuery, useLoginMutation } from "./accountApi";

export default function LoginForm() {
    const [login, {isLoading}] = useLoginMutation();
    const [fetchUserInfo] = useLazyUserInfoQuery();
    const location = useLocation();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginSchema) => {
        try {
            await login(data);
            await fetchUserInfo();
            navigate(location.state?.from || '/catalog');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container component={Paper} maxWidth='sm' sx={{ borderRadius: 3 }}>
            <Box display='flex' flexDirection='column' alignItems='center' marginTop={8}>
                <LockOutlined sx={{ mt: 3, color: 'secondary.main', fontSize: 40 }} />
                
                <Typography variant="h5">
                    Sign in
                </Typography>
                {location.state?.from && (
                    <Typography marginTop={2} color="error" variant="body2">Please sign in to access this area</Typography>
                )}
                <Box
                    component='form'
                    onSubmit={handleSubmit(onSubmit)}
                    width='100%'
                    display='flex'
                    flexDirection='column'
                    gap={3}
                    marginY={3}
                >
                    <TextField
                        fullWidth
                        label='Email'
                        autoFocus
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message as string}
                    />
                    <TextField
                        fullWidth
                        label='Password'
                        type="password"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message as string}
                    />
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        disabled={!isValid}
                        loading={isLoading}
                    >
                        Sign in
                    </LoadingButton>
                    <Typography sx={{ textAlign: 'center' }}>
                        Don't have an account? <Typography component={Link} to='/register' color="primary">Sign up</Typography>
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}