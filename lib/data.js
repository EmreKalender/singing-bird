export const getTweets=async (prisma)=>{
    return await prisma.Tweet.findMany({
        where: {},
        orderBy: [{
            id: 'desc'
        }],
        include: {
            author: true,
        },
    })
}