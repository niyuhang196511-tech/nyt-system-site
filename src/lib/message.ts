import { BASE_API, TENANT_ID } from "@/constants/api";

export const getMessage = async (
  name: string,
  company: string,
  phone: string,
  email: string,
  message: string,
): Promise<number> => {
  const res = await (
    await fetch(`${BASE_API}/site/message`, {
      headers: {
        "tenant-id": TENANT_ID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        company,
        phone,
        email,
        message,
      }),
      method: "POST",
    })
  ).json();

  if (res.code === 0) {
    return res.data;
  }
  throw new Error(res.message || "Unknown error");
};
