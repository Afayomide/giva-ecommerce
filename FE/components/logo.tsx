import Link from "next/link";
import Image from "next/image";
import defaultLogo from "@/public/logo.jpeg";

type LogoProps = {
  className?: string;
  size?: number; // in px
  rounded?: boolean;
  href?: string;
  alt?: string;
  src?: Parameters<typeof Image>[0]["src"];
};

export function Logo({
  className,
  size = 40,
  rounded = true,
  href = "/",
  alt = "Brand Logo",
  src = defaultLogo,
}: LogoProps) {
  return (
    <Link href={href} className="flex items-center gap-2">
      <div
        className={`relative overflow-hidden ${
          rounded ? "rounded-full" : "rounded-md"
        }`}
        style={{ width: size, height: size }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          className={`object-cover ${className || ""}`}
        />
      </div>
    </Link>
  );
}
