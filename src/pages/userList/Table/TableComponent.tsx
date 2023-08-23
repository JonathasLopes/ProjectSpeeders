import { Fragment, useEffect, useState } from 'react';
import { UserModel } from '../../../models/UserModel';
import './styles.css';
import { FaTrash } from 'react-icons/fa';
import PaginationComponent from '../../../components/Pagination/PaginationComponent';
import { DeleteUser } from '../../../api/UserAPI';
import { toast } from 'react-toastify';

interface TableComponentProps {
    users: UserModel[],
    setUserDeleted: React.Dispatch<React.SetStateAction<boolean>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function TableComponent(props: TableComponentProps) {
    const { users, setUserDeleted, setLoading } = props;
    const [page, setPage] = useState(1);
    const [userPaginated, setUserPaginated] = useState<UserModel[]>([]);

    const deleteUser = async (id: string) => {
        setLoading(true);
        try {
            await DeleteUser(id).then(() => {
                toast.success("Usuário deletado com sucesso!");
                setUserDeleted(true);
            });
        } catch(error: any) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }

    const getByPage = () => {
        let start = (page - 1) * 13;

        let userSlice = users.slice(start, start + 13);

        setUserPaginated(userSlice);
    }

    const fillEmptyLines = () => {
        let userPaginatedLength = userPaginated.length;
        var array: any = [];

        for (let i = 0; i < (13 - userPaginatedLength); i++) {
            array.push(
                <tr key={i}>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            );
        }

        return array;
    }

    useEffect(() => {
        getByPage();
    }, [page, users]);

    return (
        <Fragment>
            <table className='table-container'>
                <tbody>
                    <tr>
                        <th>Nome do Usuário</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                    {userPaginated.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => deleteUser(user.id)} className='btn-trash'>
                                        <FaTrash size={15} />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    {userPaginated.length < 13 && fillEmptyLines()}
                </tbody>
            </table>
            <PaginationComponent total={users.length} page={page} setPage={setPage} />
        </Fragment>
    )
}

export default TableComponent;