import { useSession} from 'next-auth/react'
import {useState} from 'react'
import Tweet from 'components/Tweet'
export default function ({tweets, noLink}){
    if(!tweets) return null

    return(
        <>
            {
                tweets.map(
                    (tweet,index)=>{
                        return <Tweet key={index} tweet={tweet} noLink={noLink}/>
                    }
                )
            }
        </>
    )

}