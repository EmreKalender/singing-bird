import { useSession } from 'next-auth/react'
import { router, useRouter } from 'next/router'
import NewTweet from 'components/NewTweet'
import Tweets from 'components/Tweets'
import { getTweets } from 'lib/data'
import prisma from 'lib/prisma'

export default function Home({tweets}) {
  const { data: session, status } = useSession()
  const loading=(status==="loading") 
  if(loading) return null
  if(!session) {
    router.push('/')
    return
  }
  if(session && !session.user.name){
    router.push('/setup')
    return
  }
  return(
    <>
    <NewTweet/>
    <Tweets tweets={tweets}/>
    </>
  ) 
}

export async function getServerSideProps(){
  let tweets=await getTweets(prisma)
  tweets=JSON.parse(JSON.stringify(tweets))
  return{
    props: {
      tweets,
    },
  }
}