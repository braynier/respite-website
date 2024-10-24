import { Suspense } from "react";

import { getCabin, getCabins } from "@/app/_lib/data-service";

import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

export async function generateMetadata({ params }) {
  // dynamic metadata, also from params
  const cabin = await getCabin(params.cabinId);
  return {
    title: `Cabin ${cabin.name}`,
  };
}

export async function generateStaticParams() {
  // if we know beforehand, this is a good solution, pre render it
  // the name is the same as folder
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  // each dynamic route gets access to PARAMS arguement
  // got a lot of blocking code here, put fetching in components and not the parent, and stream the data
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="mb-10 text-center text-5xl font-semibold text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          {/* making a component for ReservationForm and DateSelector*/}
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}