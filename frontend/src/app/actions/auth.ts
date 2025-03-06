import { redirect } from 'next/navigation';
import { FormState, LoginSchema, SignupFormSchema } from '@/lib/definitions';


export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const response = await fetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(validatedFields.data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    redirect('/');
  }
}

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const response = await fetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(validatedFields.data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    redirect('/');
  }
}
