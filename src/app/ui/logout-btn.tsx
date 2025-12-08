import { deleteSessionCookie } from '@/app/libs/session';
import { redirect } from 'next/navigation';
import "@/app/styles/logout.css";

export default function LogoutButton(){
  const logout = async () => {
    'use server';
    await deleteSessionCookie();
    redirect('/login');
  }

  return (
    <form action={logout}>
      <button id='btn-logout'>Logout</button>
    </form>
  )
}