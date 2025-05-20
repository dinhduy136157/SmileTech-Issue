import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { addUser } from "../features/users/userSlice";
import type { User } from "../features/users/userTypes";

const schema = z.object({
  name: z.string().trim().nonempty("Tên không được để trống"),
  age: z
    .number({ invalid_type_error: "Tuổi phải là số" })
    .min(19, "Tuổi phải lớn hơn 18")
    .max(150, "Tuổi phải nhỏ hơn 150"),
  email: z.string().email("Email không hợp lệ"),
});

type FormData = z.infer<typeof schema>;

export default function UserForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const newUser: User = {
      ...data,
      id: Date.now(),
    };
    dispatch(addUser(newUser));
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Thêm người dùng mới</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
          <input
            {...register("name")}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.name ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tuổi</label>
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.age ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            {...register("email")}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Thêm người dùng
        </button>
      </form>
    </div>
  );
}