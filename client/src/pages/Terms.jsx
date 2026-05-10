const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="font-display text-lg font-semibold text-gray-900 mb-3">{title}</h2>
    <div className="text-gray-600 text-sm leading-relaxed space-y-2">{children}</div>
  </div>
)

export default function Terms() {
  return (
    <div className="py-16 px-4 bg-surface-50">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-card border border-surface-200">
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">Terms &amp; Conditions</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: 2026</p>

          <Section title="1. Acceptance of Terms">
            <p>By accessing or using PDFNova, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our service.</p>
          </Section>

          <Section title="2. Acceptable Use">
            <p>You may use PDFNova only for lawful purposes. You agree to use the service solely to convert PDF documents you own or have the legal right to convert.</p>
          </Section>

          <Section title="3. Prohibited Uploads">
            <p>You must NOT upload files that:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Contain illegal content including child exploitation material</li>
              <li>Violate third-party intellectual property rights</li>
              <li>Contain malware, viruses, or malicious code</li>
              <li>Are used to facilitate fraud, harassment, or criminal activity</li>
              <li>Contain classified government or military information</li>
            </ul>
            <p>Violation of this section may result in permanent IP bans and reporting to authorities.</p>
          </Section>

          <Section title="4. Intellectual Property">
            <p>PDFNova and its underlying technology, branding, and interface are the intellectual property of PDFNova. You retain all rights to your own files.</p>
          </Section>

          <Section title="5. Disclaimer of Liability">
            <p>PDFNova is provided &quot;as is&quot; without warranty of any kind. We do not guarantee that:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Conversions will be 100% accurate or perfectly formatted</li>
              <li>The service will be available at all times</li>
              <li>The service is free of errors or bugs</li>
            </ul>
          </Section>

          <Section title="6. Service Availability">
            <p>We reserve the right to modify, suspend, or discontinue the service at any time without notice.</p>
          </Section>

          <Section title="7. Donations">
            <p>Donations made via the Donate page are voluntary and non-refundable. Donating does not entitle the donor to any extra service, feature, or guarantee.</p>
          </Section>

          <Section title="8. Privacy">
            <p>Your use of PDFNova is also governed by our <a href="/privacy" className="text-brand-500 underline">Privacy Policy</a>.</p>
          </Section>

          <Section title="9. Changes to Terms">
            <p>We may update these terms at any time. Continued use of the service constitutes acceptance of the revised terms.</p>
          </Section>

          <Section title="10. Contact">
            <p>Questions? Contact us at <a href="mailto:legal@pdfnova.app" className="text-brand-500 underline">legal@pdfnova.app</a>.</p>
          </Section>
        </div>
      </div>
    </div>
  )
}
