// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {GraphQLClient,gql} from "graphql-request"

const graphqlApi=process.env.NEXT_PUBLIC_GRAPHICS_ENDPOINTS
const graphcmstoken=process.env.GRAPHCMS_TOKEN
export default async function comments(req, res) {
console.log({graphcmstoken});
  
  const graphQLClient=new GraphQLClient(graphqlApi,{
    headers:{
      authorization:`Bearer ${graphcmstoken}`
    }
  })
  const query =gql`
  mutation CreateComment($name:String!,$email:String!,$comment:String!,$slug:String!){

    createComment(data:{name:$name,email:$email,comment:$comment,post :{connect:{slug:$slug}}}) {id}
    
  }
  
  `
  try{

    const result=await graphQLClient.request(query,req.body)
    return res.status(200).send(result)
  }catch(error){
    return res.status(500).send(error)

  }
  
}
