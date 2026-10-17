// WHAT THIS FILE DOES: Turns a page's list of admin-editable sections (from
// the "pageContent" collection) into the actual visible page. Every public
// page that uses the admin "Pages" editor renders its content through this
// one component instead of writing its own fixed layout. A few section
// types are "automatic" (Featured Work, Homepage Videos, Client Reviews,
// Projects Grid, Blog Feed) — their repeating content comes from the real
// database collections (passed in via the `data` prop), not from the
// section document itself; only that section's heading/subheading/order/
// visibility is admin-controlled. Sections marked not-visible are expected
// to already be filtered out by the page calling this, so everything
// received here is shown.
//
// When `pageTitleFromFirstSection` is on, the first section's heading
// becomes the page's main title: set larger, over a faint blueprint grid,
// and "taking form" as the page opens.

import Link from "next/link";
import FeaturedWork from "@/components/FeaturedWork";
import HomepageVideos from "@/components/HomepageVideos";
import ReviewsSection from "@/components/ReviewsSection";
import ProjectsGridSection from "@/components/ProjectsGridSection";
import BlogListClient from "@/components/BlogListClient";
import SectionHeading from "@/components/SectionHeading";

const WRAP = "mx-auto max-w-7xl px-6 lg:px-10";

// Splits body text on blank lines into separate paragraphs, so admin-typed
// text with paragraph breaks renders the way it looks when typed, instead
// of collapsing into one run-on block.
function renderParagraphs(body) {
  return body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph, index) => (
      <p key={index} className="mt-5 text-muted first:mt-0">
        {paragraph}
      </p>
    ));
}

export default function PageSections({
  sections,
  data = {},
  pageTitleFromFirstSection = false,
}) {
  return (
    <>
      {sections.map((section, index) => {
        const isPageTitle = pageTitleFromFirstSection && index === 0;
        return (
          <Section
            key={section.id}
            section={section}
            data={data}
            isPageTitle={isPageTitle}
          />
        );
      })}
    </>
  );
}

// The opening block of an inner page (Services, Projects, Contact...).
function PageIntro({ heading, subheading, children }) {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="blueprint-grid pointer-events-none absolute inset-x-0 -top-32 h-[140%]"
      />
      <div className={`relative ${WRAP} pb-12 pt-16 sm:pb-16 sm:pt-24`}>
        <SectionHeading as="h1" heading={heading} subheading={subheading} />
        {children}
      </div>
    </div>
  );
}

function Section({ section, data, isPageTitle }) {
  const HeadingTag = isPageTitle ? "h1" : "h2";
  const headingAs = isPageTitle ? "h1" : "h2";

  switch (section.type) {
    case "heading":
      if (isPageTitle) {
        return <PageIntro heading={section.heading} subheading={section.subheading} />;
      }
      return (
        <div className={`${WRAP} pb-4 pt-20`}>
          <SectionHeading heading={section.heading} subheading={section.subheading} />
        </div>
      );

    // Heading on the left, body text on the right on wide screens — reads
    // like a chapter opening rather than a block of centred text.
    case "text":
      if (isPageTitle) {
        return (
          <PageIntro heading={section.heading} subheading={section.subheading}>
            {section.body && (
              <div className="mt-8 max-w-2xl text-lg">{renderParagraphs(section.body)}</div>
            )}
          </PageIntro>
        );
      }
      return (
        <div className={`${WRAP} py-12 sm:py-16`}>
          <div className="grid grid-cols-1 gap-8 border-t border-white/10 pt-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              {section.heading && (
                <HeadingTag className="font-display text-[clamp(1.9rem,3.6vw,2.75rem)] font-semibold leading-[1.05] text-foreground">
                  {section.heading}
                </HeadingTag>
              )}
              {section.subheading && (
                <p className="mt-4 max-w-md text-lg text-muted">{section.subheading}</p>
              )}
            </div>
            {section.body && (
              <div className="max-w-2xl text-[1.08rem] lg:col-span-7">
                {renderParagraphs(section.body)}
              </div>
            )}
          </div>
        </div>
      );

    // Each point is "checked off" in amber — these are things that ship.
    case "list":
      return (
        <div className={`${WRAP} py-8 sm:py-10`}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              {section.heading && (
                <HeadingTag className="font-display text-[1.5rem] font-semibold leading-tight text-foreground">
                  {section.heading}
                </HeadingTag>
              )}
              {section.subheading && (
                <p className="mt-3 max-w-md text-muted">{section.subheading}</p>
              )}
            </div>
            {section.items?.length > 0 && (
              <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:col-span-7">
                {section.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-3 border-b border-white/7 py-4 text-foreground"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="mt-1 h-4 w-4 shrink-0 text-accent"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 10.5l4 4 8-9" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );

    case "imageText":
      return (
        <div className={`${WRAP} py-16 sm:py-20`}>
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-16">
            {section.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={section.image}
                alt={section.heading || ""}
                className="w-full rounded-[14px] object-cover ring-1 ring-white/10"
              />
            )}
            <div>
              {section.heading && (
                <HeadingTag className="font-display text-[clamp(1.9rem,3.6vw,2.75rem)] font-semibold leading-[1.05] text-foreground">
                  {section.heading}
                </HeadingTag>
              )}
              {section.subheading && (
                <p className="mt-4 text-lg text-muted">{section.subheading}</p>
              )}
              {section.body && <div className="mt-6">{renderParagraphs(section.body)}</div>}
            </div>
          </div>
        </div>
      );

    // Numbered steps joined by a line — this section type holds a process
    // (e.g. "How It Works": Enquiry → Discussion → Build → Handover), so
    // the order matters. Each step's marker starts as a dashed outline
    // and the last is filled in amber: the finished product.
    case "cards": {
      const items = section.items || [];
      return (
        <div className={`${WRAP} py-20 sm:py-28`}>
          <SectionHeading
            as={headingAs}
            heading={section.heading}
            subheading={section.subheading}
          />
          {items.length > 0 && (
            <ol
              className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))] lg:gap-8"
              style={{ "--steps": items.length }}
            >
              <span
                aria-hidden="true"
                className="absolute left-5 right-5 top-5 hidden h-px border-t border-dashed border-line/70 lg:block"
              />
              {items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (
                  <li key={index} className="relative lg:pr-4">
                    <span
                      className={`font-display relative flex h-10 w-10 items-center justify-center rounded-full text-[0.95rem] font-semibold ${
                        isLast
                          ? "bg-accent text-background"
                          : "border border-dashed border-line bg-background text-foreground"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <p className="font-display mt-6 text-[1.35rem] font-semibold leading-tight text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-2 text-[0.97rem] text-muted">{item.description}</p>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      );
    }

    case "quote":
      return (
        <div className={`${WRAP} py-20 sm:py-28`}>
          <figure className="max-w-4xl">
            {section.body && (
              <blockquote className="font-display text-[clamp(1.75rem,3.6vw,2.9rem)] font-medium leading-[1.15] tracking-[-0.02em] text-foreground">
                <span className="text-accent">&ldquo;</span>
                {section.body}
                <span className="text-accent">&rdquo;</span>
              </blockquote>
            )}
            {section.heading && (
              <figcaption className="mt-6 text-muted">{section.heading}</figcaption>
            )}
          </figure>
        </div>
      );

    case "cta":
      return (
        <div className={`${WRAP} py-16 sm:py-24`}>
          <div className="relative overflow-hidden rounded-[20px] bg-card px-8 py-14 ring-1 ring-white/10 sm:px-14 sm:py-20">
            <div
              aria-hidden="true"
              className="blueprint-grid pointer-events-none absolute inset-0"
            />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                {section.heading && (
                  <HeadingTag className="font-display text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.04] text-foreground">
                    {section.heading}
                  </HeadingTag>
                )}
                {section.subheading && (
                  <p className="mt-4 text-lg text-muted">{section.subheading}</p>
                )}
              </div>
              {section.buttonLabel && section.buttonLink && (
                <Link href={section.buttonLink} className="btn-form shrink-0 self-start lg:self-auto">
                  {section.buttonLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      );

    case "featuredWork":
      return (
        <FeaturedWork
          projects={(data.projects || []).filter((project) => project.featured)}
          heading={section.heading}
          subheading={section.subheading}
        />
      );

    case "homepageVideos":
      return (
        <HomepageVideos
          videos={(data.videos || []).filter((video) => video.published)}
          heading={section.heading}
          subheading={section.subheading}
        />
      );

    case "reviewsFeed":
      return (
        <ReviewsSection
          heading={section.heading}
          subheading={section.subheading}
          reviews={data.reviewsFilter === "featured" ? (data.reviews || []).filter((r) => r.featured) : data.reviews || []}
          action={data.reviewsAction}
        />
      );

    case "projectsGrid":
      return (
        <ProjectsGridSection
          projects={data.projects || []}
          heading={section.heading}
          subheading={section.subheading}
        />
      );

    case "blogFeed":
      return (
        <div className={`${WRAP} pb-24 pt-8`}>
          <SectionHeading heading={section.heading} subheading={section.subheading} />
          <BlogListClient posts={data.posts || []} />
        </div>
      );

    default:
      return null;
  }
}
