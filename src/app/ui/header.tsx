import tiermovie from 'public/tiermovie.png';
import fita from 'public/fitaHeader.png'
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
      <div id='parteEsquerda'>
        <Image id='IMGfita' src={fita} alt='imagem de um fita de filme'/>
        <Image id='IMGlogo' src={tiermovie} alt='logo tiermovie'/>
        <p id='p-tiermovie'>TIER MOVIE</p>
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
          <div style={{color:'white'}}>
            <Link href="/login">Login</Link>
          </div>
        )}
      </div>

    </header>
  );
}