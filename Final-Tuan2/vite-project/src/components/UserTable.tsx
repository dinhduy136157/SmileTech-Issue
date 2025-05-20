import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useNavigate } from "react-router-dom";

export default function UserTable() {
  const users = useSelector((state: RootState) => state.users.users);
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Danh sách người dùng</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[50px]">STT</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">Họ tên</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">Tuổi</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((u, idx) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{idx + 1}</td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900">{u.name}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{u.email}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{u.age}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => navigate(`/users/${u.id}`)}
                    className="text-blue-600 hover:text-blue-800 font-medium transition duration-200 px-3 py-1 bg-blue-50 rounded-md"
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Không có người dùng nào được tìm thấy
        </div>
      )}
    </div>
  );
}