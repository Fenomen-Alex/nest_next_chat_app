import { redirect } from 'next/navigation';
import { FormState, LoginSchema, SignupFormSchema, UpdateUserSchema } from '@/lib/definitions';
import toast from 'react-hot-toast';


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
  } else {
    toast.error('Something went wrong');
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
  } else {
    toast.error('Invalid credentials');
  }
}

export async function updateUserAction(state: FormState, formData: FormData) {
  const validatedFields = UpdateUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    role: formData.get('role'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const response = await fetch('/auth/update', {
    method: 'POST',
    body: JSON.stringify(validatedFields.data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    toast.success('User updated successfully');
  } else {
    toast.error('Failed to update user');
  }
}
