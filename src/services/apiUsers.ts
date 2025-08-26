import type {PostType} from "@/types/PostType.ts";
import type {LoginResponse} from "@/types/LoginResponse.ts";

export async function loginPost (postData: PostType): Promise<LoginResponse> {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  const data = await response.json();

  if (response.ok) {
    sessionStorage.setItem('token', data.token);

    console.log('Login realizado com sucesso!');
  } else {
    console.error(data.message || 'Erro ao fazer login');
  }
  return data;
}
