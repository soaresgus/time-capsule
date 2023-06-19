import { cookies } from 'next/headers'
import { SignIn } from './SignIn'
import { Profile } from './Profile'

export function Account() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <SignIn />
  }

  return <Profile />
}
