import prisma from 'lib/prisma'
import { getSession, useSession } from 'next-auth/react'

export default async function handler(req,res){

    const session=await getSession({req})
    
    if(!session) return res.status(401).json({message: 'Not logged in'})

    const user=await prisma.user.findUnique({
        where:{
            email: session.user.email,
        },
    })

    if(!user) return res.status(401).json({message: 'User not defined'})
    
    if(req.method==='POST'){
        await prisma.tweet.create({
            data:{
                content: req.body.content,
                author: {
                    connect: {id: user.id},
                },
            },
        })
        res.end()
        return
    }

    if(req.method==='DELETE'){
        const id=req.body.id
        const tweet=await prisma.tweet.findUnique({
            where:{
                id,
            },
            include:{
                author: true,
            },
        })
        if(tweet.author.id!==user.id){
            res.status(401).end()
            return
        }
        await prisma.tweet.delete({
            where:{id},
        })
        res.status(200).end()
        return
    }
}