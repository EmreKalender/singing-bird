import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import NewTweet from 'components/NewTweet'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const loading= (status === 'loading') 
  if (loading){
    return null
  }

  if (session) {
    router.push('/home')
  }

  return <a href='/api/auth/signin'>login</a>
}