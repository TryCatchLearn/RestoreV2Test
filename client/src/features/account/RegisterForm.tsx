import { LockOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "./accountApi";
import { RegisterSchema, registerSchema } from "../../lib/schemas/registerSchema";
import { handleApiError } from "../../lib/util";

export default function RegisterForm() {
    const [registerUser, { isLoading }] = useRegisterMutation();
    const { register, setError, handleSubmit, formState: { errors, isValid } } = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterSchema) => {
        try {
            await registerUser(data).unwrap();
        } catch (error: unknown) {
            handleApiError<RegisterSchema>(error, setError, ['password', 'email']);
        }
    }

    return (
        <Container component={Paper} maxWidth='sm' sx={{ borderRadius: 3 }}>
            <Box display='flex' flexDirection='column' alignItems='center' marginTop={8}>
                <LockOutlined sx={{ mt: 3, color: 'secondary.main', fontSize: 40 }} />
                <Typography variant="h5">
                    Register
                </Typography>
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
                        Sign up
                    </LoadingButton>
                    <Typography sx={{ textAlign: 'center' }}>
                        Already have an account? <Typography component={Link} to='/login' color="primary">Sign in</Typography>
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}