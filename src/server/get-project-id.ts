"use server";

export async function getProjectId(): Promise<string | undefined> {
  return process.env.NEXT_PUBLIC_PROJECT_ID;
}
