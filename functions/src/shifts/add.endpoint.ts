import { Request, Response } from "express";
import { Endpoint, RequestType } from "firebase-backend";


function handler(req: Request, res: Response) {

  return res.send("YOoo")
}

export default new Endpoint(
  "shifts/add",
  RequestType.GET,
  handler
);