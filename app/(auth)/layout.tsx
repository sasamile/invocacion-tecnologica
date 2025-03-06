import { Logo } from "@/components/common/logo";
import { Card, CardContent } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-6 gap-5 md:grid-cols-2">
            {children}
            <div className="relative hidden bg-muted md:block rounded-sm">
              <img
                src="/image-auth.jpg"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale rounded-sm"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
