import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import type { HandbookPolicy } from "./handbookData";
import { PAGE_CARD, statusBadgeClass } from "../shared/pageStyles";

type HandbookContentProps = {
  policy: HandbookPolicy;
  activeSectionId: string;
  onSectionSelect: (id: string) => void;
};

function TocItem({
  id,
  title,
  active,
  indent,
  onSelect,
}: {
  id: string;
  title: string;
  active: boolean;
  indent?: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`block w-full text-left text-body-md transition-colors ${
        indent ? "pl-4" : ""
      } ${
        active
          ? "border-l-2 border-primary font-medium text-primary"
          : "border-l-2 border-transparent text-on-surface-variant hover:text-on-surface"
      } py-1.5 pl-3`}
    >
      {title}
    </button>
  );
}

export default function HandbookContent({
  policy,
  activeSectionId,
  onSectionSelect,
}: HandbookContentProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <aside className="lg:col-span-3">
        <p className="mb-3 text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase">
          On this page
        </p>
        <nav className="space-y-0.5">
          {policy.sections.map((section) => (
            <div key={section.id}>
              <TocItem
                id={section.id}
                title={section.title}
                active={activeSectionId === section.id}
                onSelect={onSectionSelect}
              />
              {section.subsections?.map((sub) => (
                <TocItem
                  key={sub.id}
                  id={sub.id}
                  title={sub.title}
                  active={activeSectionId === sub.id}
                  indent
                  onSelect={onSectionSelect}
                />
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <article className={`lg:col-span-9 ${PAGE_CARD} p-6 md:p-8`}>
        <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-outline-variant/30 pb-4">
          <span className={statusBadgeClass("info")}>{policy.version}</span>
          <span className="text-caption text-on-surface-variant">
            Last updated: {policy.lastUpdated}
          </span>
          {policy.signatureStatus === "pending" ? (
            <span className={`${statusBadgeClass("warning")} gap-1`}>
              <GppMaybeOutlinedIcon sx={{ fontSize: 14 }} />
              Signature Pending
            </span>
          ) : (
            <span className={statusBadgeClass("success")}>Signed</span>
          )}
        </div>

        <div className="space-y-8">
          {policy.sections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="mb-3 text-h2 font-semibold text-on-surface">{section.title}</h2>
              {section.paragraphs?.map((p) => (
                <p key={p.slice(0, 40)} className="mb-3 text-body-lg leading-relaxed text-on-surface-variant">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-3">
                  {section.bullets.map((item) => (
                    <li key={item.title} className="text-body-lg text-on-surface-variant">
                      <span className="font-semibold text-on-surface">{item.title}:</span>{" "}
                      {item.description}
                    </li>
                  ))}
                </ul>
              )}
              {section.subsections?.map((sub) => (
                <div key={sub.id} id={sub.id} className="mt-5 scroll-mt-24">
                  <h3 className="mb-2 text-h3 font-semibold text-on-surface">{sub.title}</h3>
                  {sub.paragraphs.map((p) => (
                    <p
                      key={p.slice(0, 40)}
                      className="mb-3 text-body-lg leading-relaxed text-on-surface-variant"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
