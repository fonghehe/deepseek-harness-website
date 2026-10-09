import { isChineseLocale } from '@/i18n/locales';
import { WeChatContact } from '../controls/wechat-contact';
import type { Locale, Messages } from '@/i18n';
import product from '@/config/product.json';

export function Footer({ locale, text }: { locale: Locale; text: Messages['Harness']['Index'] }) {
  return (
    <footer className="ds-container harness-footer">
      <div className="footer-contact">
        {isChineseLocale(locale) ? (
          <WeChatContact label={text.wechatLabel} tooltip={text.wechatTooltip} />
        ) : (
          <a
            className="x-contact"
            href={product.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={text.harnessFooterTwitter}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.5 5.4 22H2.2l7.4-8.5L.8 2h6.5l4.5 6.9L18.9 2ZM17.8 20h1.7L6.4 3.9H4.6L17.8 20Z"
              />
            </svg>
            <span>X (Twitter)</span>
          </a>
        )}
      </div>
      <p className="footer-copyright">
        {text.harnessFooterLicense} · {text.harnessFooterCopyright}
      </p>
      <nav className="footer-policies" aria-label={text.harnessFooterPolicyLinks}>
        <a
          href={
            isChineseLocale(locale) ? product.links.privacyChinese : product.links.privacyEnglish
          }
        >
          {text.harnessFooterPrivacyPolicy}
        </a>
        <span aria-hidden="true">·</span>
        <a href={isChineseLocale(locale) ? product.links.termsChinese : product.links.termsEnglish}>
          {text.harnessFooterTermsOfUse}
        </a>
      </nav>
    </footer>
  );
}
