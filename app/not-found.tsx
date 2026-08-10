import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-navy-950 py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-brand-500/35 blur-[120px]"
      />
      <div className="container-page relative text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent-cyan">
          404 Not Found
        </p>
        <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
          요청하신 페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-4 text-navy-100/75">
          주소가 변경되었거나 삭제된 페이지일 수 있습니다.
        </p>
        <Link
          href="/"
          className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-navy-950 transition hover:bg-navy-50"
        >
          홈으로 돌아가기
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
