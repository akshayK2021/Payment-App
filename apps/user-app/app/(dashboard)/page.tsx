import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export default async function Page({ res }) {
  const session = await getServerSession(authOptions);

 

  // If user is authenticated, render the page content here
  return <div>Your page content here</div>;
}
