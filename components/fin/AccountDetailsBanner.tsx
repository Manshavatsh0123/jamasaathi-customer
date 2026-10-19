
import Image from "next/image";

export default function AccountDetailsBanner() {
  return (
    <div className="relative mt-3 h-[76px] overflow-hidden rounded-[14px] bg-gradient-to-r from-[#0c0a24] via-[#1d1450] to-[#4a2aa3] px-3.5 py-3.5 lg:mt-0">
      <p className="text-[12px] font-semibold text-white">
        View Your Account Details
      </p>

      <p className="relative z-10 mt-1 max-w-[52%] text-[8px] leading-[1.4] text-white/70">
        Check deposits, payments & maturity.
      </p>

      <Image
        src="/images/promo-woman.webp"
        alt=""
        width={140}
        height={140}
        aria-hidden="true"
        className="absolute -bottom-3 right-0 h-[96px] w-auto object-contain [mask-image:linear-gradient(to_right,transparent,black_35%)]"
      />
    </div>
  );
}
