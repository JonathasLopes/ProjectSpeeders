import { UserModel } from '../models/UserModel';
import { api } from '../services/Axios';

const GetAllUsers = async () => {
    try {
        const result = await api.get(`/users`);
        const response = await result.data;
        return response;
    }
    catch (error: any) {
        throw new Error(error.response.data);
    }
}

const DeleteUser = async (id: string) => {
    try {
        const result = await api.delete(`/users/${id}`);
        const response = await result.data;
        return response;
    }
    catch (error: any) {
        throw new Error(error.response.data);
    }
}

const CreateUser = async (user: UserModel) => {
    try {
        const result = await api.post(`/users`, {id: user.id, name: user.name, email: user.email, password: user.password});
        const response = await result.data;
        return response;
    }
    catch (error: any) {
        throw new Error(error.response.data);
    }
}

export {
    GetAllUsers,
    DeleteUser,
    CreateUser
}