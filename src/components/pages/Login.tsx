import {type SubmitHandler, useForm} from "react-hook-form";
import type {LoginInputs} from "@/types/LoginInputs.ts";
import {useMutation} from "@tanstack/react-query";
import {loginPost} from "@/services/apiUsers.ts";
import {useNavigate} from "react-router";
import {useAuth} from "@/context/AuthContext.tsx";

export default function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();
  const {
    mutate, isPending: isLogin, isError
  } = useMutation({
    mutationFn: loginPost,
    onSuccess: (data) => {
      console.log(data);
      login(data.user);
    },
    onError: (error) => {
      console.error('Deu ruim', error);
    }
  })

  const {
    register,
    handleSubmit,
  } = useForm<LoginInputs>()

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    mutate(data);
    if (!isError) navigate('/');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-stone-700">
          Faça login na sua conta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou{' '}
          <a href="#" className="font-medium text-stone-600 hover:text-stone-500">
            crie uma nova conta
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  {...register("email")}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="mt-1">
                <input
                  {...register("password")}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  {...register('rememberMe')}
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-stone-600 focus:ring-stone-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                  Lembrar de mim
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-stone-600 hover:text-stone-500">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>

            <div>
              <button
                disabled={isLogin}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-stone-600 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
              >
                Entrar
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}