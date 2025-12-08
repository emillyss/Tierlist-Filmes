import { deleteSessionCookie } from '@/app/libs/session';
import { redirect } from 'next/navigation';

export default function LogoutButton(){
  const logout = async () => {
    'use server';
    await deleteSessionCookie();
    redirect('/login');
  }

  return (
    <form action={logout}>
      <button>Logout</button>
    </form>
  )
}