import { ImExit } from 'react-icons/im';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import TableComponent from './Table/TableComponent';
import { useEffect, useState } from 'react';
import { UserModel } from '../../models/UserModel';
import { GetAllUsers } from '../../api/UserAPI';
import { toast } from 'react-toastify';
import LoaderComponent from '../../components/Loader/LoaderComponent';

function UserList() {
    const [loading, setLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<UserModel[]>([]);
    const [userDeleted, setUserDeleted] = useState<boolean>(false);
    const navigation = useNavigate();

    const exit = () => {
        navigation("/");
    }

    const getAllUsers = async () => {
        setLoading(true);
        try {
            await GetAllUsers().then(result => {
                var data = result as UserModel[];
                setUsers(data);
            });
        }
        catch (error: any) {
            toast.error(error);
        }
        finally {
            if (userDeleted) {
                setUserDeleted(false);
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        if (userDeleted) {
            getAllUsers();
        }
    }, [userDeleted]);

    return (
        <div className='userList-container'>
            <LoaderComponent show={loading} />
            <div className='userList-header-container'>
                <h1>Lista de Usuários</h1>
                <button onClick={exit} className='btn-exit'>
                    <span>Sair</span>
                    <ImExit size={15} />
                </button>
            </div>
            <TableComponent
                setLoading={setLoading}
                setUserDeleted={setUserDeleted}
                users={users}
            />
        </div>
    );
}

export default UserList;