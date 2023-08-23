import { api } from "../services/Axios";

const MakeLogin = async (email: string, password: string) => {
    try {
        const result = await api.get(`/users?email=${email}&password=${password}`);
        const response = await result.data;
        return response;
    }
    catch(error: any) {
        throw new Error(error.response.data);
    }
}

export {
    MakeLogin
}