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







// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/config/db";
// import { usersTable } from "@/config/schema";
// import { eq } from "drizzle-orm";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     // 1. Get the user
//     const user = await currentUser();
    
//     // 2. ✅ CRITICAL: Check if user exists
//     if (!user) {
//       return NextResponse.json(
//         { error: "Unauthorized - No user found" },
//         { status: 401 }
//       );
//     }

//     // 3. Get email safely
//     const email = user.primaryEmailAddress?.emailAddress;
//     if (!email) {
//       return NextResponse.json(
//         { error: "No email address found" },
//         { status: 400 }
//       );
//     }

//     // 4. Check if user exists in DB (now safe)
//     const existingUsers = await db
//       .select()
//       .from(usersTable)
//       .where(eq(usersTable.email, email));

//     // 5. If user doesn't exist, create them
//     if (existingUsers.length === 0) {
//       const newUser = await db
//         .insert(usersTable)
//         .values({
//           email: email,
//           name: user.fullName || user.username || "Anonymous",
//         })
//         .returning();

//       return NextResponse.json({ 
//         success: true, 
//         user: newUser[0],
//         isNew: true 
//       });
//     }

//     // 6. Return existing user
//     return NextResponse.json({ 
//       success: true, 
//       user: existingUsers[0],
//       isNew: false 
//     });

//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json(
//       { 
//         error: "Internal Server Error",
//         details: error instanceof Error ? error.message : String(error)
//       },
//       { status: 500 }
//     );
//   }
// }