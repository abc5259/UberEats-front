import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();

  const onValid: SubmitHandler<Inputs> = data => {
    console.log(data);
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Log In</h3>
        <form onSubmit={handleSubmit(onValid)} className="grid gap-3 mt-5 px-5">
          <input
            {...register("email", {
              required: "이메일을 적어주세요",
            })}
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <span className="font-medium text-red-500">
              {errors.email?.message}
            </span>
          )}
          <input
            {...register("password", {
              required: "password를 적어주세요",
              minLength: {
                value: 10,
                message: "최소한 10글자 이상이어야합니다",
              },
            })}
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <span className="font-medium text-red-500">
              {errors.password?.message}
            </span>
          )}
          <button className="button">Log In</button>
        </form>
      </div>
    </div>
  );
};
