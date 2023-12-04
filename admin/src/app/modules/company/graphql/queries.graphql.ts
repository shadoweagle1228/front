import { gql } from "apollo-angular";


const GET_COMPANIES = gql`
query GetPosts {
  companies(where:{name:{contains:"test"}}){
    name
    commercialSegment{
      id
    }
   }
}
`;

export { GET_COMPANIES }