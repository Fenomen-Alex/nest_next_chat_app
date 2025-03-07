import { NextRequest, NextResponse } from 'next/server';
import { updateUser } from '@/lib/dal/user';

export async function POST(request: NextRequest) {
  const { name, email, role } = await request.json();
  const updatedUser = await updateUser(name, email, role);

  return NextResponse.json(
    { message: 'User updated successfully', user: updatedUser },
    { status: 200 }
  );
}
