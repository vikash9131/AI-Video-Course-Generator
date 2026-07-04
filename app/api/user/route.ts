import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const user= await currentUser();

    //if user already exist in DB
    const users= await db.select().from(usersTable)
        .where(eq(usersTable.email,user?.primaryEmailAddress?.emailAddress as string));

    if(users.length==0){
        const newUser= await db.insert(usersTable).values({
            email:user?.primaryEmailAddress?.emailAddress as string,
            name:user?.fullName as string,
        }).returning();

        return NextResponse.json(newUser[0]);
    }

    return NextResponse.json(users[0]);
}
