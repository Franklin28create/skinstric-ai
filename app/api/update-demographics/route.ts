import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function PUT(req: Request) {
  try {
    const { name, location, race, gender, age } = await req.json();

    if (!name || !location || !race || !gender || !age) {
      return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const usersCollection = db.collection("users");

    const result = await usersCollection.updateOne(
      { name, location },
      { $set: { race, gender, age } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Demographics updated successfully" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
