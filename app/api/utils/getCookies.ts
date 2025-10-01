import { USER_ACCESS_TOKEN, USER_ACCESS_TOKEN_SECURE } from "@/app/lib/helper";
import { parse } from "cookie";

async function handler(req: any, res: any) {
  try {
    const cookies = parse(req.headers.cookie || "");
    const userAccessToken =
      (await cookies[USER_ACCESS_TOKEN]) || cookies[USER_ACCESS_TOKEN_SECURE];
    res.status(200).json({ userAccessToken });

    if (userAccessToken) {
      res.status(201).json({
        USER_ACCESS_TOKEN: userAccessToken,
      });
    } else {
      res.status(201).json({
        message: "User access token cookie does not exists",
      });
    }
  } catch (error) {
    res.status(422).json({
      userCredentials: null,
      error,
      message: "Error occoured",
    });
  }
}

export default handler;
