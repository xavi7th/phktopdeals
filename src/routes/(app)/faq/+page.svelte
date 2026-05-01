<script>
  import PageHero from "$partials/static/PageHero.svelte";

  const categories = [
    {
      name: "General",
      items: [
        {
          q: "What is PHK Factor?",
          a: "PHK Factor (formerly PHK Hot Deals) is a digital marketplace where you can purchase games, gift cards, software licenses, e-SIMs, phone top-ups, and vouchers at competitive prices. We are a product of MOZYFLEX LTD (RC 1577964), registered in Nigeria.",
        },
        {
          q: "How does PHK Factor work?",
          a: "Simply create an account, browse our catalogue, add products to your cart, and pay using your preferred method. Digital products are delivered instantly to your account dashboard. For some items, you'll receive activation codes or top-up details right away.",
        },
        {
          q: "What products do you sell?",
          a: "We offer a wide range of digital products including video game keys and top-ups, gift cards (Google Play, iTunes, Amazon, Steam, and more), software licenses, e-SIMs, mobile phone top-ups, and digital vouchers.",
        },
      ],
    },
    {
      name: "Account & Wallet",
      items: [
        {
          q: "How do I create an account?",
          a: 'Click the "Sign Up" button at the top of the page. You\'ll need to provide your name, email address, and create a password. You can also sign up using your Google account for faster access.',
        },
        {
          q: "How does the wallet work?",
          a: "Your PHK Factor wallet is a prepaid balance you can use to pay for products on the platform. When you make a purchase, the cost is deducted from your wallet balance. It's the fastest way to check out.",
        },
        {
          q: "How do I top up my wallet?",
          a: 'Go to your account dashboard and click "Top Up Wallet." Choose your preferred payment method (bank transfer, card payment, or cryptocurrency), enter the amount, and complete the transaction. Your balance updates immediately after confirmation.',
        },
        {
          q: "Can I withdraw my wallet balance as cash?",
          a: "No. Wallet balance cannot be withdrawn, transferred, or converted to cash. It can only be used for purchases on PHK Factor. Any refunds issued will be credited to your wallet as store credit.",
        },
      ],
    },
    {
      name: "Orders & Delivery",
      items: [
        {
          q: "How do I place an order?",
          a: "Browse or search for the product you want, add it to your cart, proceed to checkout, and complete payment. For digital products, your order is processed and delivered automatically within minutes.",
        },
        {
          q: "How are digital products delivered?",
          a: "Once payment is confirmed, digital products are delivered directly to your account dashboard. You'll see activation codes, download links, or top-up details in your order history. You'll also receive an email notification.",
        },
        {
          q: "How long does delivery take?",
          a: "Most digital products are delivered instantly or within a few minutes of payment confirmation. In rare cases of high demand or technical issues, delivery may take up to 30 minutes. If you don't receive your order after 30 minutes, please contact our support team.",
        },
        {
          q: "What if I don't receive my order?",
          a: "If your order hasn't been delivered after 30 minutes, first check your order history in your account dashboard. If it's still not there, contact our support team via email (hello@hotdeals.stafr.pro), live chat, or WhatsApp with your order ID, and we'll resolve it promptly.",
        },
      ],
    },
    {
      name: "Payments",
      items: [
        {
          q: "What payment methods do you accept?",
          a: "We accept bank transfers, debit/credit cards, and select cryptocurrency (USDT, USDC, and other stablecoins). You can also pay using your PHK Factor wallet balance.",
        },
        {
          q: "Is my payment secure?",
          a: "Yes. All transactions are processed through secure, encrypted payment gateways. We do not store your full card details on our servers. Your financial information is protected with industry-standard security protocols.",
        },
        {
          q: "Can I pay with cryptocurrency?",
          a: "Yes. We support select cryptocurrencies including USDT and USDC. During checkout, select the cryptocurrency option and follow the instructions to complete your payment.",
        },
      ],
    },
    {
      name: "Returns & Refunds",
      items: [
        {
          q: "What is your refund policy?",
          a: "Digital products are generally non-refundable once the code, key, or activation details have been delivered and revealed. However, we evaluate refund requests on a case-by-case basis for issues like defective codes, wrong products delivered, or technical failures on our end. Please refer to our Returns & Refund Policy page for full details.",
        },
        {
          q: "How long do refunds take?",
          a: "If a refund is approved, the wallet credit is typically applied within 24\u201348 hours. You'll receive a notification once the credit has been added to your wallet.",
        },
        {
          q: "Do refunds go to my bank account or original payment method?",
          a: "No. All refunds are issued as wallet credit on your PHK Factor account, regardless of the original payment method. The wallet credit can be used for future purchases on the platform.",
        },
      ],
    },
    {
      name: "e-SIM & Top-ups",
      items: [
        {
          q: "How do e-SIM products work?",
          a: "An e-SIM is a digital SIM that allows you to activate a mobile plan without a physical SIM card. After purchasing, you'll receive a QR code or activation details that you can scan or enter on your compatible device to set up the plan.",
        },
        {
          q: "How do I activate my e-SIM?",
          a: "After purchase, go to your order history and reveal the activation details. On your phone, go to Settings > Mobile/Cellular > Add e-SIM, then scan the QR code or enter the details manually. Follow the on-screen instructions to complete activation.",
        },
        {
          q: "What if my top-up doesn't go through?",
          a: "If your top-up isn't applied after 30 minutes, double-check that you entered the correct phone number. If the issue persists, contact our support team with your order ID and phone number, and we'll investigate and resolve the issue.",
        },
      ],
    },
  ];

  let activeId = $state(null);

  /** @param {string} id */
  function toggle(id) {
    activeId = activeId === id ? null : id;
  }
</script>

<svelte:head>
  <title>FAQ - PHK Factor</title>
  <meta name="description" content="Find answers to frequently asked questions about PHK Factor — accounts, orders, payments, refunds, e-SIMs, and more." />
</svelte:head>

<PageHero title="Frequently Asked Questions" subtitle="Find quick answers to common questions about PHK Factor." />

<div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
  {#each categories as category, ci (category.name)}
    <div class="mb-10">
      <h2 class="mb-4 border-b-2 border-brand-400 pb-2 text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
        {category.name}
      </h2>

      <div class="hs-accordion-group space-y-3" data-hs-accordion-always-open>
        {#each category.items as item, qi (item.q)}
          {@const id = `faq-${ci}-${qi}`}
          {@const isOpen = activeId === id}
          <div class="hs-accordion rounded-lg border bg-white dark:border-neutral-700 dark:bg-neutral-800 {isOpen ? 'active' : ''}">
            <button
              class="hs-accordion-toggle flex w-full items-center justify-between gap-x-3 p-5 text-start font-semibold text-gray-800 hs-accordion-active:text-brand-500 dark:text-neutral-200 dark:hs-accordion-active:text-brand-400"
              onclick={() => toggle(id)}
              aria-expanded={isOpen}>
              <span>{item.q}</span>
              <svg
                class="block size-4 shrink-0 hs-accordion-active:hidden"
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
              <svg
                class="hidden size-4 shrink-0 hs-accordion-active:block"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <path d="m18 15-6-6-6 6"></path>
              </svg>
            </button>
            <div class="hs-accordion-content overflow-hidden transition-[height] duration-300 {isOpen ? '' : 'hidden'}" role="region">
              <div class="px-5 pb-5 text-gray-600 dark:text-neutral-400">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}

  <div class="mt-12 rounded-lg bg-gray-50 p-8 text-center dark:bg-neutral-800/50">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Still have questions?</h3>
    <p class="mt-2 text-gray-600 dark:text-neutral-400">Can't find what you're looking for? Reach out to our support team.</p>
    <div class="mt-4 flex flex-wrap items-center justify-center gap-3">
      <a href="mailto:hello@hotdeals.stafr.pro" class="inline-flex items-center gap-x-2 rounded-lg bg-brand-400 px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-brand-500 focus:bg-brand-500 focus:outline-none">
        Email Us
      </a>
      <a
        href="/"
        class="inline-flex items-center gap-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700">
        Live Chat
      </a>
    </div>
  </div>
</div>
