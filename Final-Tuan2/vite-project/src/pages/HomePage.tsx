import { useEffect } from "react";
import { useDispatch } from "react-redux";
import userApi from "../api/userApi";
import { setUsers } from "../features/users/userSlice";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    userApi.getDataUser().then((res) => {
      const usersWithAge = res.data.map((u: any) => ({
        ...u,
        age: 25 + Math.floor(Math.random() * 10),
      }));
      dispatch(setUsers(usersWithAge));
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Quản lý người dùng</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <UserForm />
        </div>
        <div className="lg:col-span-2">
          <UserTable />
        </div>
      </div>
    </div>
  );
}