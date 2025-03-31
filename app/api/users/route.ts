import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { name, location } = await req.json();

    if (!name?.trim() || !location?.trim()) {
      return NextResponse.json(
        { error: "All fields are required!" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({
      name: name.trim().toLowerCase(),
    });

    if (existingUser) {
      return NextResponse.json(
        { message: `Welcome back, ${name}` },
        { status: 200 }
      );
    }

    await usersCollection.insertOne({
      name: name.trim().toLowerCase(),
      location: location.trim(),
    });

    return NextResponse.json(
      { message: "User created Successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
