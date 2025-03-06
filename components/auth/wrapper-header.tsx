import { Logo } from "../common/logo";

interface WrapperHeaderProps {
  title: string;
  subtitle?: string;
}

export function WrapperHeader({ title, subtitle }: WrapperHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2 pt-0">
      <Logo
        name="EduControl"
        className="mb-6 flex flex-col"
      />
      <h3 className="text-2xl leading-none text-center font-medium">
        {title}
      </h3>
      <p className="text-[15px] text-muted-foreground text-center">{subtitle}</p>
    </div>
  );
}
