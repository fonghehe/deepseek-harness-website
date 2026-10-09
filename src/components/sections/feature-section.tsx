import content from '@/i18n/site-content.json';
import { locales } from '@/i18n/locales';
import type { Locale } from '@/i18n';
import product from '@/config/product.json';

export function FeatureSection({ locale }: { locale: Locale }) {
  const text = content[locale];
  return (
    <section
      className="ds-container site-capabilities"
      aria-labelledby="extended-capabilities-title"
    >
      <div className="section-heading" data-entrance="initial" data-reveal="heading">
        <p className="eyebrow">{text.explore}</p>
        <h2 id="extended-capabilities-title">{text.title}</h2>
        <p>{text.subtitle}</p>
      </div>
      <div className="site-feature-grid">
        {text.features.map((feature, index) => (
          <details
            className="site-feature"
            key={feature.id}
            data-entrance="initial"
            data-reveal="card"
            style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
          >
            <summary>
              <span className="site-feature-number" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.summary}</p>
              <span className="site-expand" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="site-feature-body">
              <p>{feature.detail}</p>
              <a href={product.featureSources.find((source) => source.id === feature.id)!.url}>
                {text.source} ↗
              </a>
            </div>
          </details>
        ))}
      </div>
      <div className="site-extension-footer">
        <p>{text.notice}</p>
        <a href={locales[locale].docsPath}>{text.docs} ↗</a>
      </div>
    </section>
  );
}
