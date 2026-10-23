import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[80svh] flex-col justify-center py-32">
      <p className="mono-label text-gold">404</p>
      <h1 className="display mt-6 text-[clamp(2.5rem,8vw,6rem)]">
        Lost in <em>space</em>
        .
      </h1>
      <p className="mt-6 max-w-md text-mist">這個頁面不存在，或已經移動到別的地方。</p>
      <Link href="/" className="btn btn-primary mt-10 w-fit">
        Back home
      </Link>
    </div>
  );
}
