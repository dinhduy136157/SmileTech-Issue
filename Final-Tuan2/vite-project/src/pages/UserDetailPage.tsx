import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function UserDetailPage() {
  const { id } = useParams();
  const user = useSelector((state: RootState) =>
    state.users.users.find((u) => u.id === Number(id))
  );

  if (!user) return <p>Không tìm thấy người dùng</p>;

  return (
    <div>
      <h2>Thông tin người dùng</h2>
      <p>Họ tên: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Tuổi: {user.age}</p>
    </div>
  );
}
