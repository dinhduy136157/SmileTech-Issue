import axiosClient from "./axiosClient";

const userApi = {
    getDataUser: () => axiosClient.get("/users"),
    getDataUserById: (userId: number) => axiosClient.get(`/users/${userId}`)
}
export default userApi