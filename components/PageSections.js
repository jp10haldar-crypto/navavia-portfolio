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

import Link from "next/link";
import FeaturedWork from "@/components/FeaturedWork";
import HomepageVideos from "@/components/HomepageVideos";
import ReviewsSection from "@/components/ReviewsSection";
import ProjectsGridSection from "@/components/ProjectsGridSection";
import BlogListClient from "@/components/BlogListClient";

// Splits body text on blank lines into separate paragraphs, so admin-typed
// text with paragraph breaks renders the way it looks when typed, instead
// of collapsing into one run-on block.
function renderParagraphs(body) {
  return body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph, index) => (
      <p key={index} className="mt-4 text-muted first:mt-0">
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

function Section({ section, data, isPageTitle }) {
  const HeadingTag = isPageTitle ? "h1" : "h2";
  const headingClasses = isPageTitle
    ? "text-3xl font-bold text-foreground sm:text-4xl"
    : "text-2xl font-bold text-foreground sm:text-3xl";

  switch (section.type) {
    case "heading":
      return (
        <div className="mx-auto max-w-6xl px-6 py-16">
          {section.heading && (
            <HeadingTag className={headingClasses}>{section.heading}</HeadingTag>
          )}
          {section.subheading && (
            <p className="mt-3 max-w-xl text-muted">{section.subheading}</p>
          )}
        </div>
      );

    case "text":
      return (
        <div className="mx-auto max-w-6xl px-6 py-10">
          {section.heading && (
            <HeadingTag className={headingClasses}>{section.heading}</HeadingTag>
          )}
          {section.subheading && (
            <p className="mt-3 max-w-2xl text-muted">{section.subheading}</p>
          )}
          {section.body && (
            <div className="mt-4 max-w-2xl">{renderParagraphs(section.body)}</div>
          )}
        </div>
      );

    case "list":
      return (
        <div className="mx-auto max-w-6xl px-6 py-10">
          {section.heading && (
            <HeadingTag className={headingClasses}>{section.heading}</HeadingTag>
          )}
          {section.subheading && (
            <p className="mt-3 max-w-2xl text-muted">{section.subheading}</p>
          )}
          {section.items?.length > 0 && (
            <ul className="mt-4 flex max-w-2xl flex-col gap-2 text-foreground">
              {section.items.map((item, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-accent">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      );

    case "imageText":
      return (
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            {section.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={section.image}
                alt={section.heading || ""}
                className="w-full rounded-xl object-cover"
              />
            )}
            <div>
              {section.heading && (
                <HeadingTag className={headingClasses}>
                  {section.heading}
                </HeadingTag>
              )}
              {section.subheading && (
                <p className="mt-3 text-muted">{section.subheading}</p>
              )}
              {section.body && <div className="mt-4">{renderParagraphs(section.body)}</div>}
            </div>
          </div>
        </div>
      );

    case "cards":
      return (
        <div className="mx-auto max-w-6xl px-6 py-10">
          {section.heading && (
            <HeadingTag className={headingClasses}>{section.heading}</HeadingTag>
          )}
          {section.subheading && (
            <p className="mt-3 max-w-xl text-muted">{section.subheading}</p>
          )}
          {section.items?.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {section.items.map((item, index) => (
                <div key={index}>
                  <span className="text-3xl font-bold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      );

    case "quote":
      return (
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          {section.body && (
            <blockquote className="text-xl font-medium italic text-foreground sm:text-2xl">
              &ldquo;{section.body}&rdquo;
            </blockquote>
          )}
          {section.heading && (
            <p className="mt-4 text-muted">— {section.heading}</p>
          )}
        </div>
      );

    case "cta":
      return (
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          {section.heading && (
            <HeadingTag className={headingClasses}>{section.heading}</HeadingTag>
          )}
          {section.subheading && (
            <p className="mt-3 text-muted">{section.subheading}</p>
          )}
          {section.buttonLabel && section.buttonLink && (
            <Link
              href={section.buttonLink}
              className="mt-8 inline-block rounded-full bg-accent px-8 py-4 text-lg font-semibold text-background transition-opacity hover:opacity-90"
            >
              {section.buttonLabel}
            </Link>
          )}
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
        <div className="mx-auto max-w-6xl px-6 pb-16">
          {section.heading && (
            <HeadingTag className={headingClasses}>{section.heading}</HeadingTag>
          )}
          {section.subheading && (
            <p className="mt-3 max-w-xl text-muted">{section.subheading}</p>
          )}
          <BlogListClient posts={data.posts || []} />
        </div>
      );

    default:
      return null;
  }
}
