import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";


export default async function Page() {
  const session = await getServerSession(authOptions);
  if(!session){
   return ;
  }

 

  // If user is authenticated, render the page content here
  return <div>Your page content here</div>;
}
