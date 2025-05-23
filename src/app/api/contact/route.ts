import { sendEmail } from "@/service/email";
import * as yup from "yup";

const bodySchema = yup.object().shape({
  from: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().required(),
});

export async function POST(req: Request) {
  const body = await req.json();
  if (!bodySchema.isValidSync(body)) {
    return new Response(JSON.stringify({ message: "유효하지 않은 포멧" }), { status: 400 });
  }

  return sendEmail(body)
    .then(() => new Response(JSON.stringify({ message: "메일 전송 성공" }), { status: 200 }))
    .catch((error) => {
      console.log(error);
      return new Response(JSON.stringify({ message: "메일 전송 실패" }), { status: 500 });
    });
}
