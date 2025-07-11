import { useUserData } from "@/context/userContext";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isUserReady } = useUserData();

  if (!isUserReady) return null;

  return <>{children}</>;
}
