import { BASE_API, apiFetch } from "@/constants/api";

export const getMessage = async (
  name: string,
  company: string,
  phone: string,
  email: string,
  message: string,
): Promise<number> => {
  const res = await (
    await apiFetch(`${BASE_API}/site/message`, {
      headers: {
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
  throw new Error(res.msg || "Unknown error");
};
