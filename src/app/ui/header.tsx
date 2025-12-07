import tiermovie from 'public/tiermovie.png';
import claquete from 'public/claqueteDourada.png'
import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from './logout-btn';
import UserInfo from './user-info';
import { isSessionValid } from '@/app/libs/session';
import "@/app/styles/header.css";

export default async function Header(){
  const session = await isSessionValid();
  const userEmail = session?.userEmail as string | undefined;

  return (
    <header>
      <div id='kkk'>
        <Image id='tiermovie' src={tiermovie} alt='imagem fita'/>
        <Image id='claquete' src={claquete} alt='imagem fita'/>
        <h1 id='tier'>TIER MOVIE</h1>
      </div>
      <div>
        {session ? (
          <div style={{ display: 'flex'}}>
            <div style={{marginRight: 200, fontSize: 20, color: 'white'}}>
              <UserInfo userEmail={userEmail || ''} />
            </div>
            <div id='logout'>
              <LogoutButton />
            </div>
          </div>
          
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>

    </header>
  );
}