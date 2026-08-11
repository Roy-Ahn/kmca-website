import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-ink-950 py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-brand-600/25 blur-[130px]"
      />
      <div className="container-page relative text-center">
        <p className="text-eyebrow text-accent">404 Not Found</p>
        <h1 className="text-title-1 mt-6 text-white">요청하신 페이지를 찾을 수 없습니다</h1>
        <p className="text-lede mt-5 text-ink-300">
          주소가 변경되었거나 삭제된 페이지일 수 있습니다.
        </p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/" tone="dark" arrow>
            홈으로 돌아가기
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
