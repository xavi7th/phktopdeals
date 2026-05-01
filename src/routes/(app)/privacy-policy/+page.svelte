<script>
  import PageHero from "$partials/static/PageHero.svelte";

  let showToc = $state(false);

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "information-we-collect", title: "Information We Collect" },
    { id: "how-we-use", title: "How We Use Your Information" },
    { id: "data-storage-security", title: "Data Storage & Security" },
    { id: "sharing-of-information", title: "Sharing of Information" },
    { id: "cookies-tracking", title: "Cookies & Tracking" },
    { id: "your-rights", title: "Your Rights" },
    { id: "childrens-privacy", title: "Children's Privacy" },
    { id: "changes-to-policy", title: "Changes to This Policy" },
    { id: "contact-us", title: "Contact Us" },
  ];

  /** @param {string} id */
  function scrollTo(id) {
    showToc = false;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
</script>

<svelte:head>
  <title>Privacy Policy - PHK Factor</title>
  <meta name="description" content="Learn how PHK Factor collects, uses, and protects your personal information. Our privacy policy explains your rights and our commitments." />
</svelte:head>

<PageHero title="Privacy Policy" />

<div class="mx-auto max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8">
  <div class="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
    <!-- Table of Contents - Sidebar -->
    <aside class="mb-8 lg:sticky lg:top-24 lg:mb-0 lg:self-start">
      <!-- Mobile toggle -->
      <button
        class="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-sm font-semibold text-gray-900 lg:hidden dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
        onclick={() => (showToc = !showToc)}>
        Table of Contents
        <svg
          class="size-4 transition-transform {showToc ? 'rotate-180' : ''}"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>

      <!-- TOC links -->
      <nav class="overflow-hidden transition-all duration-300 {showToc ? 'mt-3 max-h-[600px]' : 'max-h-0'} lg:!mt-0 lg:!max-h-none">
        <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
          <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">On This Page</p>
          <ul class="space-y-2">
            {#each sections as section (section.id)}
              <li>
                <button class="text-left text-sm text-gray-600 hover:text-brand-500 dark:text-neutral-400 dark:hover:text-brand-400" onclick={() => scrollTo(section.id)}>
                  {section.title}
                </button>
              </li>
            {/each}
          </ul>
        </div>
      </nav>
    </aside>

    <!-- Content -->
    <article
      class="prose max-w-none dark:prose-invert prose-headings:font-bold prose-h2:mt-10 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-3 prose-h2:text-xl prose-h2:sm:text-2xl dark:prose-h2:border-neutral-700">
      <div class="mb-8 inline-block rounded-full bg-brand-400/10 px-4 py-1.5 text-sm font-medium text-brand-500 dark:bg-brand-400/20 dark:text-brand-300">Last updated: March 2026</div>

      <h2 id="introduction">Introduction</h2>
      <p>
        PHK Factor ("we", "our", "us") is a digital marketplace operated by <strong>MOZYFLEX LTD</strong>
        (RC 1577964), registered in Nigeria. We are committed to protecting and respecting your privacy.
      </p>
      <p>
        This Privacy Policy explains how we collect, use, store, and share your personal information when you use our website, mobile applications, and services (collectively, the "Service"). It also outlines your rights
        regarding your data.
      </p>
      <p>
        By accessing or using our Service, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this privacy policy, please do not access the Service.
      </p>
      <p>This policy is aligned with the Nigeria Data Protection Regulation (NDPR) and applicable data protection laws.</p>

      <h2 id="information-we-collect">Information We Collect</h2>
      <p>We may collect and process the following categories of information about you:</p>

      <h3>Personal Information</h3>
      <ul>
        <li>Full name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Billing and delivery address (if applicable)</li>
        <li>Account login credentials</li>
      </ul>

      <h3>Payment Information</h3>
      <ul>
        <li>Payment method details (card type, last four digits)</li>
        <li>Transaction history</li>
        <li>Wallet balance and top-up records</li>
      </ul>
      <p>
        We do <strong>not</strong>
        store full credit/debit card numbers on our servers. Payment processing is handled by secure third-party payment providers.
      </p>

      <h3>Device & Usage Information</h3>
      <ul>
        <li>IP address</li>
        <li>Browser type and version</li>
        <li>Operating system</li>
        <li>Device identifiers</li>
        <li>Pages visited, time spent, and click patterns</li>
        <li>Referring website addresses</li>
      </ul>

      <h3>Communications</h3>
      <ul>
        <li>Support ticket submissions</li>
        <li>Chat transcripts</li>
        <li>Email correspondence with our team</li>
      </ul>

      <h2 id="how-we-use">How We Use Your Information</h2>
      <p>We use the information we collect for the following purposes:</p>
      <ul>
        <li>
          <strong>Service Delivery:</strong>
          Process orders, deliver digital products, manage your wallet, and provide customer support.
        </li>
        <li>
          <strong>Account Management:</strong>
          Create and maintain your account, verify your identity, and handle password recovery.
        </li>
        <li>
          <strong>Communication:</strong>
          Send order confirmations, delivery notifications, and respond to your inquiries.
        </li>
        <li>
          <strong>Improvement:</strong>
          Analyse usage patterns to improve our platform, fix bugs, and enhance user experience.
        </li>
        <li>
          <strong>Security:</strong>
          Detect and prevent fraud, unauthorised access, and other illegal activities.
        </li>
        <li>
          <strong>Marketing:</strong>
          Send promotional offers and newsletters (only with your consent, and you may opt out at any time).
        </li>
        <li>
          <strong>Legal Compliance:</strong>
          Comply with applicable laws, regulations, and legal processes.
        </li>
      </ul>

      <h2 id="data-storage-security">Data Storage & Security</h2>
      <p>Your data is stored on secure servers with appropriate technical and organisational measures to protect against unauthorised access, alteration, disclosure, or destruction.</p>
      <p>Security measures include:</p>
      <ul>
        <li>Encryption of data in transit (SSL/TLS)</li>
        <li>Encryption of sensitive data at rest</li>
        <li>Regular security audits and vulnerability assessments</li>
        <li>Access controls limiting employee access to personal data</li>
        <li>Secure payment processing through certified payment gateways</li>
      </ul>
      <p>
        While we strive to protect your personal information, no method of electronic storage or transmission is 100% secure. We cannot guarantee absolute security but are committed to maintaining industry-standard
        protections.
      </p>

      <h2 id="sharing-of-information">Sharing of Information</h2>
      <p>We do not sell, trade, or rent your personal information to third parties. We may share your data with:</p>
      <ul>
        <li>
          <strong>Service Providers:</strong>
          Trusted third-party companies that help us operate the platform (payment processors, hosting providers, email services). These providers are contractually obligated to protect your data.
        </li>
        <li>
          <strong>Legal Requirements:</strong>
          When required by law, court order, or government regulation, we may disclose your information.
        </li>
        <li>
          <strong>Business Transfers:</strong>
          In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
        </li>
        <li>
          <strong>Protection of Rights:</strong>
          To protect our rights, property, or safety, or that of our users or the public.
        </li>
      </ul>

      <h2 id="cookies-tracking">Cookies & Tracking</h2>
      <p>Our website uses cookies and similar tracking technologies to enhance your experience. Types of cookies we use:</p>
      <ul>
        <li>
          <strong>Essential Cookies:</strong>
          Required for the website to function properly (session management, authentication, security).
        </li>
        <li>
          <strong>Analytics Cookies:</strong>
          Help us understand how visitors interact with our website (page views, navigation patterns, errors).
        </li>
        <li>
          <strong>Functional Cookies:</strong>
          Remember your preferences and settings (language, region, display preferences).
        </li>
      </ul>
      <p>You can manage or disable cookies through your browser settings. Note that disabling certain cookies may affect the functionality of the Service.</p>

      <h2 id="your-rights">Your Rights</h2>
      <p>Under applicable data protection laws, you have the following rights regarding your personal information:</p>
      <ul>
        <li>
          <strong>Access:</strong>
          Request a copy of the personal data we hold about you.
        </li>
        <li>
          <strong>Correction:</strong>
          Request correction of inaccurate or incomplete personal data.
        </li>
        <li>
          <strong>Deletion:</strong>
          Request deletion of your personal data, subject to legal obligations.
        </li>
        <li>
          <strong>Portability:</strong>
          Request your data in a structured, commonly used, machine-readable format.
        </li>
        <li>
          <strong>Objection:</strong>
          Object to the processing of your data for marketing purposes.
        </li>
        <li>
          <strong>Withdrawal of Consent:</strong>
          Withdraw consent for any processing based on consent at any time.
        </li>
      </ul>
      <p>To exercise any of these rights, please contact us using the details provided below. We will respond to your request within 30 days.</p>

      <h2 id="childrens-privacy">Children's Privacy</h2>
      <p>
        Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with
        personal information, please contact us immediately, and we will take steps to delete such information.
      </p>

      <h2 id="changes-to-policy">Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. When we make changes:</p>
      <ul>
        <li>We will update the "Last updated" date at the top of this page.</li>
        <li>We will notify you via email or a prominent notice on our website for significant changes.</li>
        <li>Continued use of the Service after changes constitutes acceptance of the updated policy.</li>
      </ul>
      <p>We encourage you to review this policy periodically to stay informed about how we protect your information.</p>

      <h2 id="contact-us">Contact Us</h2>
      <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
      <ul>
        <li>
          <strong>Email:</strong>
          <a href="mailto:hello@hotdeals.stafr.pro" class="text-brand-500 hover:text-brand-400 dark:text-brand-400 dark:hover:text-brand-300">hello@hotdeals.stafr.pro</a>
        </li>
        <li>
          <strong>Live Chat:</strong>
          Click the chat icon on our website
        </li>
        <li>
          <strong>WhatsApp:</strong>
          Click the WhatsApp button on our website
        </li>
      </ul>
      <div class="not-prose mt-8 rounded-lg bg-gray-50 p-6 dark:bg-neutral-800/50">
        <p class="text-sm text-gray-600 dark:text-neutral-400">
          PHK Factor is a product of <strong class="text-gray-900 dark:text-white">MOZYFLEX LTD</strong>
          (RC 1577964), registered in Nigeria.
        </p>
      </div>
    </article>
  </div>
</div>
