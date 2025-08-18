import type {PostType} from "@/types/PostType.ts";

export async function loginPost (postData: PostType): Promise<Response> {
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

    sessionStorage.setItem('user', JSON.stringify(data.user));

    console.log('Login realizado com sucesso!');
  } else {
    console.error(data.message || 'Erro ao fazer login');
  }

  return response.json();
}
