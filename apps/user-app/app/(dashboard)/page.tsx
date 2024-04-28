import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";


export default async function Page() {
  const session = await getServerSession(authOptions);
  if(!session){
   redirect("/api/auth/signin") ;
  }

 

  // If user is authenticated, render the page content here
  return <div>Your page content here</div>;
}
