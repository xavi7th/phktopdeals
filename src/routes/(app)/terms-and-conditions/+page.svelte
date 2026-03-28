<script>
  import PageHero from "$partials/static/PageHero.svelte";

  let showToc = $state(false);

  const sections = [
    { id: "acceptance-of-terms", title: "Acceptance of Terms" },
    { id: "definitions", title: "Definitions" },
    { id: "account-registration", title: "Account Registration" },
    { id: "products-and-services", title: "Products & Services" },
    { id: "orders-and-payment", title: "Orders & Payment" },
    { id: "wallet-system", title: "Wallet System" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "user-conduct", title: "User Conduct" },
    { id: "limitation-of-liability", title: "Limitation of Liability" },
    { id: "indemnification", title: "Indemnification" },
    { id: "termination", title: "Termination" },
    { id: "governing-law", title: "Governing Law" },
    { id: "dispute-resolution", title: "Dispute Resolution" },
    { id: "changes-to-terms", title: "Changes to Terms" },
    { id: "contact-us", title: "Contact Us" },
  ];

  /** @param {string} id */
  function scrollTo(id) {
    showToc = false;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
</script>

<svelte:head>
  <title>Terms & Conditions - PHK Factor</title>
  <meta
    name="description"
    content="Read the Terms and Conditions for using PHK Factor's digital marketplace, including account rules, wallet policies, and user responsibilities." />
</svelte:head>

<PageHero title="Terms & Conditions" />

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
      <nav
        class="overflow-hidden transition-all duration-300 {showToc ? 'mt-3 max-h-[800px]' : 'max-h-0'} lg:!mt-0 lg:!max-h-none">
        <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
          <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
            On This Page
          </p>
          <ul class="space-y-2">
            {#each sections as section (section.id)}
              <li>
                <button
                  class="text-left text-sm text-gray-600 hover:text-brand-500 dark:text-neutral-400 dark:hover:text-brand-400"
                  onclick={() => scrollTo(section.id)}>
                  {section.title}
                </button>
              </li>
            {/each}
          </ul>
        </div>
      </nav>
    </aside>

    <!-- Content -->
    <article class="prose max-w-none dark:prose-invert prose-headings:font-bold prose-h2:mt-10 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-3 prose-h2:text-xl prose-h2:sm:text-2xl dark:prose-h2:border-neutral-700">
      <div class="mb-8 inline-block rounded-full bg-brand-400/10 px-4 py-1.5 text-sm font-medium text-brand-500 dark:bg-brand-400/20 dark:text-brand-300">
        Last updated: March 2026
      </div>

      <h2 id="acceptance-of-terms">Acceptance of Terms</h2>
      <p>
        By accessing or using the PHK Factor website, mobile applications, or any related services (collectively, the "Service"), you agree to be bound by these Terms and
        Conditions. If you do not agree to these terms, please do not use the Service.
      </p>
      <p>
        These terms constitute a legally binding agreement between you ("User", "you", "your") and <strong>MOZYFLEX LTD</strong> (RC 1577964), the company that operates PHK
        Factor ("we", "our", "us").
      </p>
      <p>
        We reserve the right to modify these terms at any time. Continued use of the Service after changes are posted constitutes acceptance of the revised terms.
      </p>

      <h2 id="definitions">Definitions</h2>
      <ul>
        <li><strong>"Service"</strong> — The PHK Factor website, mobile applications, and all related platforms and features.</li>
        <li><strong>"User"</strong> — Any individual who accesses or uses the Service.</li>
        <li><strong>"Products"</strong> — Digital goods available for purchase on the platform, including but not limited to game codes, gift cards, software licences, e-SIM
          activations, airtime and data top-ups, and vouchers.</li>
        <li><strong>"Wallet"</strong> — The digital credit system within your PHK Factor account used to store funds for purchases.</li>
        <li><strong>"Order"</strong> — A request to purchase one or more Products through the Service.</li>
        <li><strong>"Content"</strong> — Text, images, graphics, and other materials displayed on the Service.</li>
      </ul>

      <h2 id="account-registration">Account Registration</h2>
      <p>To use certain features of the Service, you must create an account. By registering, you agree to:</p>
      <ul>
        <li>Provide <strong>accurate, current, and complete</strong> information during registration.</li>
        <li>Keep your account information updated at all times.</li>
        <li>Maintain the <strong>security and confidentiality</strong> of your login credentials.</li>
        <li>Accept responsibility for all activities that occur under your account.</li>
        <li>Notify us immediately of any unauthorised use of your account.</li>
      </ul>
      <p>
        You must be at least <strong>18 years old</strong> to create an account. We reserve the right to suspend or terminate accounts that provide false information.
      </p>

      <h2 id="products-and-services">Products & Services</h2>
      <p>PHK Factor is a digital marketplace that offers various digital products and services. Please note:</p>
      <ul>
        <li>All products are <strong>digital</strong> in nature — no physical goods are shipped.</li>
        <li>Product availability may change without notice.</li>
        <li>Prices are displayed in the applicable currency and may fluctuate based on market conditions.</li>
        <li>We strive for accuracy but do not guarantee that product descriptions, pricing, or other content on the Service is error-free.</li>
        <li>Product images and descriptions are for illustrative purposes and may differ slightly from the actual product.</li>
      </ul>

      <h2 id="orders-and-payment">Orders & Payment</h2>
      <h3>Placing Orders</h3>
      <ul>
        <li>By placing an order, you make an offer to purchase the selected product(s) at the displayed price.</li>
        <li>We reserve the right to accept or decline any order for any reason, including pricing errors or suspected fraud.</li>
        <li>Once your order is confirmed and payment is processed, the digital product will be delivered to your account.</li>
      </ul>

      <h3>Payment Processing</h3>
      <ul>
        <li>We accept various payment methods as displayed at checkout.</li>
        <li>Payment is processed securely through certified third-party payment gateways.</li>
        <li>We do not store full credit/debit card details on our servers.</li>
        <li>You may also pay using your PHK Factor wallet balance.</li>
      </ul>

      <h3>Order Confirmation</h3>
      <p>
        After a successful purchase, you will receive an order confirmation via email and in your account. This confirmation serves as your proof of purchase. Please retain it for
        your records.
      </p>

      <h2 id="wallet-system">Wallet System</h2>
      <p>The PHK Factor wallet allows you to store credit for convenient purchases. Key terms:</p>
      <ul>
        <li><strong>Topping Up:</strong> You can add funds to your wallet using available payment methods.</li>
        <li><strong>Usage:</strong> Wallet credit can be used to purchase any product on the platform.</li>
        <li><strong>Non-Transferable:</strong> Wallet credit cannot be transferred to another user account.</li>
        <li><strong>Non-Withdrawable:</strong> Wallet credit cannot be withdrawn as cash, bank transfer, or to any external payment method.</li>
        <li><strong>No Expiration:</strong> Wallet credit does not expire.</li>
        <li><strong>Refunds:</strong> Approved refunds are credited to your wallet. See our <a href="/returns-policy" class="text-brand-500 hover:text-brand-400 dark:text-brand-400 dark:hover:text-brand-300">Returns & Refund Policy</a> for details.</li>
      </ul>

      <h2 id="intellectual-property">Intellectual Property</h2>
      <p>
        All content on the Service — including but not limited to the website design, logos, graphics, text, software, and the compilation thereof — is the property of PHK Factor
        / MOZYFLEX LTD or its licensors and is protected by applicable intellectual property laws.
      </p>
      <ul>
        <li>You may not reproduce, distribute, modify, or create derivative works from any content on the Service without our prior written consent.</li>
        <li>The "PHK Factor" name, logo, and related marks are trademarks of MOZYFLEX LTD. All other trademarks are the property of their respective owners.</li>
        <li>User-submitted content (reviews, feedback) grants us a non-exclusive, royalty-free licence to use, display, and distribute such content in connection with the
          Service.</li>
      </ul>

      <h2 id="user-conduct">User Conduct</h2>
      <p>By using the Service, you agree <strong>not</strong> to:</p>
      <ul>
        <li>Use the Service for any unlawful purpose or in violation of any applicable laws.</li>
        <li>Engage in fraud, including using stolen payment methods or submitting false refund claims.</li>
        <li>Attempt to gain unauthorised access to other users' accounts or our systems.</li>
        <li>Use automated systems (bots, scripts) to interact with the Service without authorisation.</li>
        <li>Resell or redistribute purchased digital products without proper authorisation.</li>
        <li>Submit malicious code, viruses, or any technology that may harm the Service or its users.</li>
        <li>Impersonate another person or entity, or misrepresent your affiliation with any person or entity.</li>
        <li>Manipulate pricing, exploit errors, or abuse promotions or discounts.</li>
        <li>Harass, threaten, or abuse other users or our staff.</li>
      </ul>
      <p>
        Violations may result in account suspension or termination, and we may pursue legal action where appropriate.
      </p>

      <h2 id="limitation-of-liability">Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by applicable law:
      </p>
      <ul>
        <li>Digital products are provided <strong>"as is"</strong> without warranties of any kind beyond those expressly stated in these terms.</li>
        <li>We do not guarantee uninterrupted or error-free operation of the Service.</li>
        <li>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.</li>
        <li>Our total liability for any claim arising from the Service shall not exceed the amount you paid to us for the specific product or service in question.</li>
        <li>We are not responsible for issues arising from third-party products or services not directly provided by us.</li>
      </ul>

      <h2 id="indemnification">Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless PHK Factor, MOZYFLEX LTD, its officers, directors, employees, and agents from and against any and all claims, damages,
        losses, liabilities, costs, and expenses (including reasonable legal fees) arising from:
      </p>
      <ul>
        <li>Your use of the Service.</li>
        <li>Your violation of these Terms and Conditions.</li>
        <li>Your violation of any applicable law or regulation.</li>
        <li>Your violation of any rights of a third party, including intellectual property rights.</li>
      </ul>

      <h2 id="termination">Termination</h2>
      <p>We reserve the right to suspend or terminate your account at our sole discretion, including but not limited to:</p>
      <ul>
        <li>Violation of these Terms and Conditions.</li>
        <li>Engaging in fraudulent or abusive behaviour.</li>
        <li>Extended periods of account inactivity.</li>
        <li>Legal requirements or court orders.</li>
      </ul>
      <p>Upon termination:</p>
      <ul>
        <li>Your access to the Service will be revoked.</li>
        <li>Any remaining wallet credit is forfeited and non-refundable.</li>
        <li>Provisions that by their nature should survive termination will remain in effect.</li>
      </ul>
      <p>
        You may choose to stop using the Service at any time. If you wish to delete your account, please contact our support team.
      </p>

      <h2 id="governing-law">Governing Law</h2>
      <p>
        These Terms and Conditions are governed by and construed in accordance with the laws of the <strong>Federal Republic of Nigeria</strong>. Any disputes arising from these
        terms or the use of the Service shall be subject to the exclusive jurisdiction of the courts of Nigeria.
      </p>

      <h2 id="dispute-resolution">Dispute Resolution</h2>
      <p>If you have a dispute or concern:</p>
      <ol>
        <li><strong>Contact support first:</strong> Reach out to our support team via email, live chat, or WhatsApp. Most issues can be resolved quickly.</li>
        <li><strong>Provide details:</strong> Share relevant order IDs, screenshots, and a clear description of the issue.</li>
        <li><strong>Escalation:</strong> If your concern is not resolved to your satisfaction, you may request escalation to a senior team member for review.</li>
      </ol>
      <p>
        We are committed to resolving disputes fairly and promptly. We encourage you to contact us before taking any external action.
      </p>

      <h2 id="changes-to-terms">Changes to Terms</h2>
      <p>
        We reserve the right to update or modify these Terms and Conditions at any time. When changes are made:
      </p>
      <ul>
        <li>We will update the "Last updated" date at the top of this page.</li>
        <li>We may notify you via email or a prominent notice on our website for significant changes.</li>
        <li>Continued use of the Service after changes are posted constitutes acceptance of the revised terms.</li>
      </ul>
      <p>
        We encourage you to review these terms periodically.
      </p>

      <h2 id="contact-us">Contact Us</h2>
      <p>If you have any questions about these Terms and Conditions, please contact us:</p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:hello@hotdeals.stafr.pro" class="text-brand-500 hover:text-brand-400 dark:text-brand-400 dark:hover:text-brand-300">hello@hotdeals.stafr.pro</a></li>
        <li><strong>Live Chat:</strong> Click the chat icon on our website</li>
        <li><strong>WhatsApp:</strong> Click the WhatsApp button on our website</li>
      </ul>

      <div class="not-prose mt-8 rounded-lg bg-gray-50 p-6 dark:bg-neutral-800/50">
        <p class="text-sm text-gray-600 dark:text-neutral-400">
          PHK Factor is a product of <strong class="text-gray-900 dark:text-white">MOZYFLEX LTD</strong> (RC 1577964), registered in Nigeria.
        </p>
      </div>
    </article>
  </div>
</div>
