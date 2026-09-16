import {
  Smartphone,
  PackageOpen,
} from "lucide-react";

import AppCard from "./AppCard";

export default function AppLibrary({
  apps,
  loading,
  onOpenDetails,
}) {
  return (
    <section
      id="apps"
      className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10"
    >

      {/* HEADER */}

      <div className="mb-8 flex items-end justify-between">

        <div>

          <div className="flex items-center gap-2">

            <div className="h-5 w-1 bg-blue-600" />

            <p className="text-[10px] font-black tracking-[0.2em] text-blue-600">
              APPLICATION LIBRARY
            </p>

          </div>

          <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] sm:text-4xl">
            Demo Applications
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Explore Android applications published by
            developers, students and creators.
          </p>

        </div>

        <div className="hidden items-center gap-2 border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500 sm:flex">

          <PackageOpen size={15} />

          {apps.length} Apps

        </div>

      </div>

      {/* LOADING */}

      {loading ? (

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {[1, 2, 3, 4].map((item) => (

            <div
              key={item}
              className="h-[370px] animate-pulse border border-slate-200 bg-white"
            >

              <div className="h-48 bg-slate-200" />

              <div className="space-y-3 p-5">

                <div className="h-4 w-2/3 bg-slate-200" />

                <div className="h-3 w-1/2 bg-slate-200" />

                <div className="h-3 w-full bg-slate-200" />

                <div className="h-3 w-4/5 bg-slate-200" />

              </div>

            </div>

          ))}

        </div>

      ) : apps.length === 0 ? (

        <div className="border border-slate-200 bg-white px-5 py-20 text-center">

          <div className="mx-auto grid size-20 place-items-center bg-slate-100">

            <Smartphone
              size={34}
              className="text-slate-400"
            />

          </div>

          <h3 className="mt-6 text-xl font-black">
            No applications available
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            There are no demo applications available right now.
            New applications will appear here after they are published.
          </p>

        </div>

      ) : (

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {apps.map((app, index) => (

            <div
              key={app._id}
              className="animate-[cardIn_.45s_ease-out]"
              style={{
                animationDelay: `${index * 70}ms`,
              }}
            >

              <AppCard
                app={app}
                onClick={() => onOpenDetails(app)}
              />

            </div>

          ))}

        </div>

      )}

    </section>
  );
}