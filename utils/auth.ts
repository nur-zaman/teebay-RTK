import { apiURL } from "./apiUrl";

export async function signIn(email: string, password: string) {
  const response = await fetch(`${apiURL}/api/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Sign in failed");
  }

  const data = await response.json();
  return data.userId;
}
