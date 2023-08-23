import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import ButtonComponent from '../../components/Button/ButtonComponent';
import InputComponent from '../../components/Input/InputComponent';
import './styles.css';
import { useState } from 'react';
import { MakeLogin } from '../../api/LoginAPI';
import { toast } from 'react-toastify';
import LoaderComponent from '../../components/Loader/LoaderComponent';

function Login() {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const makeLogin = async () => {
        setLoading(true);
        try {
            await MakeLogin(email, password).then(resp => {
                if (resp.length > 0) {
                    goToUserList();
                } else {
                    toast.error("Usuário não encontrado ou senha inválida!");
                }
            });
        }
        catch (error: any) {
            toast.error(error);
        }finally {
            setLoading(false);
        }
    }

    const goToUserList = () => {
        navigate("/userList");
    }

    return (
        <div className='login-container'>
            <LoaderComponent show={loading} />
            <img src={Logo} />
            <InputComponent
                label='Usuario'
                placeholder='email@email.com'
                onChange={value => setEmail(value)}
            />
            <InputComponent
                label='Senha'
                placeholder='**********'
                isPassword={true}
                onChange={value => setPassword(value)}
            />
            <a className='link-forgot-password'>Esqueci a senha?</a>
            <ButtonComponent action={makeLogin} label='login' />
            <span className='register-link'>NÃO TEM CONTA?<Link to="/register">Cadastre-se</Link></span>
        </div>
    );
}

export default Login;