import { useSession } from 'next-auth/react'
import { router, useRouter } from 'next/router'
import NewTweet from 'components/NewTweet'
import Tweets from 'components/Tweets'
import { getTweets } from 'lib/data'
import prisma from 'lib/prisma'
import LoadMore from 'components/LoadMore'
import { useState } from 'react'

export default function Home({initialTweets}) {
  const [tweets,setTweets]=useState(initialTweets)
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
    <NewTweet tweets={tweets} setTweets={setTweets}/>
    <Tweets tweets={tweets}/>
    <LoadMore tweets={tweets} setTweets={setTweets}/>
    </>
  ) 
}

export async function getServerSideProps(){
  let tweets=await getTweets(prisma,2)
  tweets=JSON.parse(JSON.stringify(tweets))
  return{
    props: {
      initialTweets: tweets,
    },
  }
}