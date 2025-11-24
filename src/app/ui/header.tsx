import Link from 'next/link';
import LogoutButton from './logout-btn';
import UserInfo from './user-info';
import { isSessionValid } from '@/app/libs/session';

export default async function Header(){
  const session = await isSessionValid();
  const userEmail = session?.userEmail as string | undefined;

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, background: '#eee' }}>
      <div>
        <Link href="/tierlist"><strong>TierMovie</strong></Link>
      </div>
      <nav>
        <Link href="/tierlist" style={{ marginRight: 12 }}>Tierlist</Link>
        {session ? (
          <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
            <UserInfo userEmail={userEmail || ''} />
            <LogoutButton />
          </span>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}