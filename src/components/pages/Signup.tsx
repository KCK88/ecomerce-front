import React from 'react';
import { Link } from 'react-router-dom';
import {useForm, type SubmitHandler} from "react-hook-form";
import type {SignupForm} from "@/types/SignupForm.ts";
import {useMutation} from "@tanstack/react-query";
import {signupPost} from "@/services/apiUsers.ts";
import {useNavigate} from "react-router";

const Signup: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<SignupForm>();

  const navigate = useNavigate();

  const {mutate, isError} = useMutation({
    mutationFn: signupPost,
    onSuccess: (data: any) => {
      console.log("Success", data);
    },
    onError: (error: any) => {
      console.log("Error", error);
    }
  })

  const onSubmit: SubmitHandler<SignupForm> = (data) => {
    mutate(data);
    console.log(isError)
    if (!isError) navigate("/login");
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Criar sua conta</h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-700">
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Full name is required' })}
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="signup-email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="passwordConfirm" className="block text-sm font-bold text-gray-700">
              Confirme sua senha
            </label>
            <input
              type="password"
              id="passwordConfirm"
              {...register('passwordConfirm', {
                required: 'Please confirm your password',
                validate: value =>
                  value === getValues('password') || 'The passwords do not match'
              })}
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
            />
            {errors.passwordConfirm && <p className="text-red-500 text-xs mt-1">{errors.passwordConfirm.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-stone-600 rounded-md hover:bg-stone-700 focus:outline-none focus:shadow-outline transition-colors"
          >
            Criar conta
          </button>

        </form>
        <p className="text-sm text-center text-gray-600">
          Já tem uma conta?{' '}
          <Link to="/login" className="font-medium text-stone-600 hover:text-stone-800">
            Entre aqui!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
