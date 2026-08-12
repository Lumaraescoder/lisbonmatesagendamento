import React from "react";
import { t, defaultLocale, normalizeLocale, pickLocaleFromAcceptLanguage } from "@/i18n";
import { cookies, headers } from "next/headers";
import BackgroundSection from "@/components/BackgroundSection";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import { TaxonomyType } from "@/data/types";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox";
import SectionHero3 from "@/app/(server-components)/SectionHero3";
import CardCategory6 from "@/components/CardCategory6";
import panteao_alfama from "@/images/guides/panteao alfama.jpeg";
import lucaspanteaoalfama from "@/images/guides/lucaspanteaoalfama.jpeg";
import igrejaalfama from "@/images/guides/igrejaalfama.jpeg";
import pessoas from "@/images/guides/pessoas.jpeg";
import fado from "@/images/guides/diferente/fado.jpeg";
import igrejaDiferente from "@/images/guides/diferente/igreja.jpeg";
import comida from "@/images/guides/diferente/comida.jpeg";
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import SectionClientSay from "@/components/SectionClientSay";

export default async function PageHome3() {
  // determine locale on server from cookie, Accept-Language header, else default
  const cookieStore = await cookies();
  const cookieLocale = normalizeLocale(cookieStore.get('locale')?.value);
  const headersStore = await headers();
  const acceptLang = headersStore.get('accept-language') || undefined;
  const headerLocale = pickLocaleFromAcceptLanguage(acceptLang);
  const serverLocale = cookieLocale || headerLocale || defaultLocale;

  const L = {
    section: t(serverLocale, 'section'),
    subscribe: t(serverLocale, 'subscribe'),
    categories: t(serverLocale, 'categories'),
  } as any;

  const DEMO_CATS_2: TaxonomyType[] = [
    {
      id: "1",
      href: "/listing-stay",
      name: L.categories.scenic,
      taxonomy: "category",
      thumbnail: panteao_alfama,
    },
    {
      id: "2",
      href: "/listing-stay",
      name: L.categories.fado,
      taxonomy: "category",
      thumbnail: fado,
    },
    {
      id: "3",
      href: "/listing-stay",
      name: L.categories.historical,
      taxonomy: "category",
      thumbnail: igrejaDiferente,
    },
    {
      id: "4",
      href: "/listing-stay",
      name: L.categories.food,
      taxonomy: "category",
      thumbnail: comida,
    },
  ];

  return (
    <main className="nc-PageHome3 relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      {/* SECTION HERO */}
      <div id="hero" className="container px-1 sm:px-4 mb-24 ">
        <SectionHero3 className="" />
      </div>

      <div className="container relative space-y-24 mb-24 ">
        {/* SECTION 1 */}


        {/* SECTION */}
        {/* <SectionGridCategoryBox /> */}

        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionGridAuthorBox boxCard="box2" />
        </div> */}

        <div id="tours">
          <SectionGridFeaturePlaces unit={String(t(serverLocale, "common.perPerson"))} />
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
            <CardCategory6 taxonomy={DEMO_CATS_2[0]} />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 grid grid-rows-2 gap-6">
            <CardCategory6 taxonomy={DEMO_CATS_2[1]} />
            <CardCategory6 taxonomy={DEMO_CATS_2[2]} />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
            <CardCategory6 taxonomy={DEMO_CATS_2[3]} />
          </div>
        </div>
        {/* SECTION */}
        <div id="testimonials" className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div>
        {/* Contact / Subscribe section as anchor target */}
        <div id="contact" className="relative py-16">
          <div className="container">
          </div>
        </div>
      </div>
    </main>
  );
}

