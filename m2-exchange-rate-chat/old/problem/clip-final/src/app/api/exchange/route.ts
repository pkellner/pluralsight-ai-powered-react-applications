import { postHandler } from "./post-handler";

export async function POST(req: Request) {
  return postHandler(req);
}
