import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const userSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  age: z.number().min(19, "Tuổi phải lớn hơn 18"),
})

type UserFormData = z.infer<typeof userSchema>

export default function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  })

  const onSubmit = (data: UserFormData) => {
    console.log("Dữ liệu hợp lệ:", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Tên:</label>
        <input {...register("name")} className="border p-2 rounded w-full" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label>Tuổi:</label>
        <input
          type="number"
          {...register("age", { valueAsNumber: true })}
          className="border p-2 rounded w-full"
        />
        {errors.age && <p className="text-red-500">{errors.age.message}</p>}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Gửi
      </button>
    </form>
  )
}
