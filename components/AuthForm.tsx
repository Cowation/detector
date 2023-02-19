import { useForm } from "react-hook-form";

interface AuthFormProps {
  onSubmit: (data: any) => void;
}

const AuthForm = (props: AuthFormProps) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    if (data.password === "testpassword") {
      props.onSubmit(data);
    }
  };

  return (
    <div className="bg-red-500 flex h-[100dvh] w-screen justify-center items-center">
      <form
        className="flex flex-col justify-center gap-4"
        onSubmit={handleSubmit(props.onSubmit)}
      >
        <label className="text-center text-3xl font-bold">Unlock</label>
        <input
          className="relative bg-gray-100 border border-gray-200 shadow-sm  padding-20 rounded-sm p-2"
          name="password"
          placeholder="password123"
        />
        <input
          className="inline-block font-bold bg-black text-white p-2"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AuthForm;
