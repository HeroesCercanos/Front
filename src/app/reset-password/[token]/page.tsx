// app/reset-password/[token]/page.tsx

import ResetPasswordForm from "@/components/common/ResetPassword"; 

interface Props {
  params: { token: string };
}

export default function ResetPasswordPage({ params }: Props) {
  // Aquí Next te pasa siempre un token válido en params.token
  return <ResetPasswordForm token={params.token} />;
}
