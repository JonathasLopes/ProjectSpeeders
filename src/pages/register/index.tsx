import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import ButtonComponent from '../../components/Button/ButtonComponent';
import InputComponent from '../../components/Input/InputComponent';
import './styles.css';
import { CreateUser } from '../../api/UserAPI';
import { UserModel } from '../../models/UserModel';
import { useState } from 'react';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';
import LoaderComponent from '../../components/Loader/LoaderComponent';

function Register() {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const createUser = async () => {
        if(confirmPassword !== password){
            toast.error("As Senhas não são identicas!");
            return;
        }
        setLoading(true);
        try {
            var user = {
                id: uuid(),
                email: email,
                name: name,
                password: password
            } as UserModel;

            await CreateUser(user).then(() => {
                toast.success("Usuário cadastrado com sucesso!");
                goToLogin();
            });
        } catch(error: any) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }

    const goToLogin = () => {
        navigate("/");
    }

    return (
        <div className='register-container'>
            <LoaderComponent show={loading} />
            <img src={Logo} />
            <InputComponent
                label='Nome Completo'
                placeholder='Fulano de Tal'
                onChange={value => setName(value)}
            />
            <InputComponent
                label='Email'
                placeholder='email@email.com'
                onChange={value => setEmail(value)}
            />
            <div className='password-container'>
                <InputComponent
                    label='Senha'
                    placeholder='**********'
                    isPassword={true}
                    onChange={value => setPassword(value)}
                />
                <InputComponent
                    label='Confirmar a Senha'
                    placeholder='**********'
                    isPassword={true}
                    onChange={value => setConfirmPassword(value)}
                />
            </div>
            <ButtonComponent action={createUser} label='Cadastrar' />
        </div>
    );
}

export default Register;