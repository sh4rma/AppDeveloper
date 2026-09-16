export default function DeveloperStrip({ onUpload }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:px-10">

      <div className="relative overflow-hidden border border-blue-200 bg-blue-600 px-6 py-9 sm:px-10">

        <div className="absolute right-0 top-0 h-40 w-40 translate-x-12 -translate-y-12 border-[25px] border-white/10" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>

            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-blue-100">
              &lt;/&gt;
              FOR DEVELOPERS
            </div>

            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
              Built an Android demo?
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">
              Share your application with other developers,
              students and Android users.
            </p>

          </div>

          <button
            type="button"
            onClick={onUpload}
            className="flex shrink-0 items-center justify-center gap-2 bg-white px-6 py-3.5 text-sm font-black text-blue-700 transition hover:bg-slate-100 active:scale-[0.98]"
          >
            Publish Demo App
          </button>

        </div>

      </div>

    </section>
  );
}