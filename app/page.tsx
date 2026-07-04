import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return(
    <div>
      <center>
      <h2>hello world</h2>
      <Button>click me</Button>
      <UserButton />
      </center>
    </div>
  );

}
