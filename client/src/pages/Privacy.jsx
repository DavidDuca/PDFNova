const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="font-display text-lg font-semibold text-gray-900 mb-3">{title}</h2>
    <div className="text-gray-600 text-sm leading-relaxed space-y-2">{children}</div>
  </div>
)

export default function Privacy() {
  return (
    <div className="py-16 px-4 bg-surface-50">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-card border border-surface-200">
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: 2026</p>

          <Section title="1. Introduction">
            <p>PDFNova (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our PDF to Word conversion service.</p>
          </Section>

          <Section title="2. File Handling & Temporary Storage">
            <p>When you upload a PDF file for conversion:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>The uploaded PDF is deleted from our servers as soon as the conversion finishes.</li>
              <li>The converted DOCX is held for a maximum of 10 minutes so you can re-download it, then it is automatically deleted.</li>
              <li>A background janitor sweeps any leftover files every 2 minutes as a safety net.</li>
              <li>We do not back up, archive, or analyze any uploaded files.</li>
            </ul>
          </Section>

          <Section title="3. No Permanent Storage">
            <p>We do not permanently store any files you upload. We do not maintain a database of uploaded documents, and no human at PDFNova ever views your files.</p>
          </Section>

          <Section title="4. Information We Collect">
            <p>We may collect minimal, non-personal usage data such as:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Anonymous page-view counts</li>
              <li>Browser type and operating system (aggregate, non-identifiable)</li>
              <li>Conversion success/failure rates (no file content is recorded)</li>
            </ul>
            <p>We do not collect names, email addresses, or any personally identifiable information unless you contact us voluntarily.</p>
          </Section>

          <Section title="5. Cookies & Analytics">
            <p>We may use minimal cookies for session management and anonymous analytics. We do not use tracking or third-party ad cookies.</p>
          </Section>

          <Section title="6. Third-Party Services">
            <p>Our service is hosted on Render (backend) and Vercel (frontend). Please review their respective privacy policies for server-level data handling.</p>
          </Section>

          <Section title="7. Your Rights">
            <p>Because we do not store personal data, there is nothing to access, correct, or delete. If you have concerns, contact us at <a href="mailto:privacy@pdfnova.app" className="text-brand-500 underline">privacy@pdfnova.app</a>.</p>
          </Section>

          <Section title="8. Changes to This Policy">
            <p>We may update this policy periodically. Continued use of PDFNova after changes constitutes acceptance of the updated policy.</p>
          </Section>
        </div>
      </div>
    </div>
  )
}
