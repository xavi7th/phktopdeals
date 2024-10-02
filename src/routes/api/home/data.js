export const categories = [
  'entertainment', 'fashion', 'groceries', 'food', 'beauty', 'electronics', 'payment-cards',
  'subscriptions', 'software', 'sports', 'security', 'travel', 'games', 'top-up', 'eSims', 'hot sales', 'streaming'
]; //This will be implemented the way theElects other product features was implemented but maybe using an sqlite DB instead of file

export const brands = [
  'Amazon', 'Apple', 'Visa', 'Nike', 'Netflix', 'Google', 'Rewarble', 'Airalo', 'PlayStation', 'XBox'
]

export const countries = [
  'Nigeria', 'USA', 'China', 'UAE', 'Australia', 'UK', 'Norway', 'Global' //All Countries. Global tags will always be queried with any other country
]

export const product_types = [
  {
    type: 'Gift Cards',
    url: '/store/gift-cards'
  },
  {
    type: 'Games',
    url: '/store/games'
  },
  {
    type: 'eSim',
    url: '/store/e-sims'
  },
  {
    type: 'Top Up',
    url: '/store/top-up'
  },
]

export const hot_deals = [
  {
    name: 'Visa Card',
    product_type: 'Gift Card',
    url: '/store/gift-cards/itunes-card',
    imgUrl: '/img',
    country: 'US', //, 'Global', 'Global Except Latin America'
    brand: 'Amazon', //Rewarble,
    categories: ['entertainment', 'fashion', 'groceries'],
    price_tags: { // All currencies will be set in dollars. We can implement a site-wide converter later OR we can have a field that specifies currencies (more difficult)
      min: 5,
      fixed: ['$1', '$5', '$10', '$25', 'other'],
      flexible: false, //determines whether they will be able to enter their own price. On create there will be a checkbox that determines if others will be added or not.
      commission: 5 // a percentage that determines how much markup will be to the total purchase as business profit
    },
    discount: 5, //percent off or false. If there is a discount display like this 9.5U will get you $10 (Assuming a 5% discount)
    discount_until: new Date() // This may not be sent to front end. discount becomes false after this date. Those that match today come under today's deals
  }
]

export const e_sim = {
  available_esim: [
    {
      name: 'Google eSim',
      placeholder: '0.00',
      min: 10,
      imgUrl: 'https://img.etimg.com/photo/msid-106641937/E%20SIM.jpg',
    },
    {
      name: 'Global eSim',
      placeholder: '0.00',
      min: 10,
      imgUrl: 'https://img.etimg.com/photo/msid-106641937/E%20SIM.jpg',
    },
  ],
  faq: [
    {
      title: "Accordion",
      description: "This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions."
    },
    {
      title: "Accordion",
      description: "This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions."
    },
    {
      title: "Accordion",
      description: "This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions."
    },
  ]
}

export const prod_desc = {
  name: 'Assassin\'s Creed Brotherhood PC Ubisoft Connect CD Key',
  product_type: 'Games',
  url: '/store/gift-cards/itunes-card',
  imgUrl: 'https://static.kinguin.net/media/images/products/_AssassinsCreedBrotherhood111.jpg',
  country: 'US', //, 'Global', 'Global Except Latin America'
  brand: 'Amazon', //Rewarble,
  categories: ['entertainment', 'games', 'software'],
  price_tags: { // All currencies will be set in dollars. We can implement a site-wide converter later OR we can have a field that specifies currencies (more difficult)
    min: 14.02,
    denominations: [14.02, 22.40, 37, 55.30],
    flexible: true, //determines whether they will be able to enter their own price. On create there will be a checkbox that determines if others will be added or not.
    commission: 5 // a percentage that determines how much markup will be to the total purchase as business profit
  },
  discount: 5, //percent off or false. If there is a discount display like this 9.5U will get you $10 (Assuming a 5% discount)
  discount_until: 3, //Number of days left for discount to expire. This may not be sent to front end. discount becomes false after this date. Those that match today come under today's deals
  faq: `
    <div class="mat-expansion-panel-body ng-tns-c857250080-1035"><div _ngcontent-ng-c3917189997="" class="text-bolder ng-star-inserted" style=""><span _ngcontent-ng-c3917189997="" class="text-xl font-bold"> Description </span></div><div _ngcontent-ng-c3917189997="" class="mb-4 ng-star-inserted" style="">Live and breathe as Ezio, a legendary Master Assassin, in his enduring struggle against the powerful Templar Order. He must journey into Italy’s greatest city, Rome, center of power, greed and corruption to strike at the heart of the enemy. Defeating the corrupt tyrants entrenched there will require not only strength, but leadership, as Ezio commands an entire Brotherhood who will rally to his side. Only by working together can the Assassins defeat their mortal enemies. And for the first time, introducing a never-before-seen multiplayer layer that allows you to choose from a wide range of unique characters, each with their own signature weapons and assassination techniques, and match your skills against other players from around the world. It’s time to join the Brotherhood.</div><!----><!----><!----><div _ngcontent-ng-c3917189997="" class="font-bolder ng-star-inserted" style=""><span _ngcontent-ng-c3917189997="" class="text-xl font-bold"> Activation Details </span></div><div _ngcontent-ng-c3917189997="" class="mb-4 ng-star-inserted" style="">Go to:  http://uplay.ubi.com and download Uplay client.
    Install Uplay Client on your PC.
    Start the application, login with your Account name and Password (create one if you don't have).
    Please follow these instructions to activate a new retail purchase on Uplay:
    Click the Settings
    Choose Activate Product
    Follow the onscreen instructions to complete the process.</div><!----><!----><!----><!----></div>

    <div data-v-b25dd4ac="" class="question-item"><h3>Redemption Instruction:</h3><p><br></p><p>Redeem your iTunes card via the App Store, or via the Apple Music app on your iPhone.</p><p>In the App Store:</p><p>Log in with your Apple ID and navigate to 'Redeem';</p><p>Enter the code and the balance is topped up Immediately;</p><p>You're done, enjoy!</p><p>Via the Apple Music App</p><p>Open the iTunes App;</p><p>Click on 'Redeem' and enter the 16 digit code;</p><p>Your balance has been topped up! That's it, you are now ready to get started with the latest games and apps.</p><h3>Product Description</h3><p>One card, millions of ways to enjoy it. Use the App Store &amp; iTunes Gift Card to get apps, games, music, films, and TV programmers. Available in a variety of denominations—spend it on in-app content, books, TV-programmer subscriptions, or even iCloud storage to secure files from all your Apple devices</p><p><br></p><h3>Terms and Conditions:</h3><p>Valid only on purchases from the US iTunes Store. Use requires an active iTunes account &amp; prior acceptance of license &amp; usage terms.</p><p>Brand Partner Contact:</p><p><br></p><p>Visit:<a href="https://www.apple.com/" rel="noopener noreferrer" target="_blank" style="color: rgb(3, 155, 229);">https://www.apple.com</a></p></div>
  `,
};

export const filters = [ // 3 random categories, brands, countries
  {
    filter: 'Amazon',
    url: '/store/gift-cards/amazon',
  },
  {
    filter: 'Apple',
    url: '/store/gift-cards/amazon',
  },
  {
    filter: 'Visa',
    url: '/store/gift-cards/amazon',
  },
  {
    filter: 'Nigeria',
    url: '/store/gift-cards/amazon',
  },
  {
    filter: 'USA',
    url: '/store/gift-cards/amazon',
  },
  {
    filter: 'China',
    url: '/store/gift-cards/amazon',
  },
  {
    filter: 'entertainment',
    url: '/store/gift-cards/amazon',
  },
  {
    filter: 'fashion',
    url: '/store/gift-cards/amazon',
  },
  {
    filter: 'groceries',
    url: '/store/gift-cards/amazon',
  },
  {
    filter: 'food',
    url: '/store/gift-cards/amazon',
  }
];

export const sections = {
  top: {
    hot_sales: { // the best selling items or those tagged hot in the category
      url: '/hot-sales', // for the view more button
      desc: 'Most in-demand items of all time!',
      items: [
        {
          name: 'Visa Card',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20231121/Rewarble-paypal_1700501815044.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'BIGO Live',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20240221/BigoLive_1708470494560.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Apple Itunes',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20231125/iTunes_1700842377403.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Amazon USA',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20220627/amazon_1656321392563.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Spotify USA',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20220726/Spotify_1658833400672.png',
          country: 'Global',
          min_price: 1,
        },
      ]
    },
    bestsellers: { //best sellers this month
      url: '/hot-sales',
      desc: 'Best selling items this month!',
      items: [
        {
          name: 'Visa Card',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20231121/Rewarble-paypal_1700501815044.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'BIGO Live',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20240221/BigoLive_1708470494560.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Apple Itunes',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20231125/iTunes_1700842377403.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Amazon USA',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20220627/amazon_1656321392563.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Spotify USA',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20220726/Spotify_1658833400672.png',
          country: 'Global',
          min_price: 1,
        },
      ]
    },
    hot_deals: { //random items with discounts
      url: '/hot-sales',
      desc: 'Hot deals! Get discounts on these items',
      items: [
        {
          name: 'Visa Card',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20231121/Rewarble-paypal_1700501815044.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'BIGO Live',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20240221/BigoLive_1708470494560.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Apple Itunes',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20231125/iTunes_1700842377403.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Amazon USA',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20220627/amazon_1656321392563.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Spotify USA',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20220726/Spotify_1658833400672.png',
          country: 'Global',
          min_price: 1,
        },
      ]
    },
    today_deals: { //random items with discounts ending today
      url: '/hot-sales',
      desc: 'These discounts are going away today! Hurry Now while it lasts',
      items: [
        {
          name: 'Visa Card',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20231121/Rewarble-paypal_1700501815044.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'BIGO Live',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20240221/BigoLive_1708470494560.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Apple Itunes',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20231125/iTunes_1700842377403.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Amazon USA',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20220627/amazon_1656321392563.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Spotify USA',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20220726/Spotify_1658833400672.png',
          country: 'Global',
          min_price: 1,
        },
      ]
    },
  },
  misc: {
    amazon: { //random items from this filter. We are going to get random items from each of the random filters that came in the filters data. This data will prob need to be cached weekly
      url: '/hot-sales',
      desc: 'Amazon Gift Cards!',
      items: [
        {
          name: 'Visa Card',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20231121/Rewarble-paypal_1700501815044.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'BIGO Live',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20240221/BigoLive_1708470494560.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Apple Itunes',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20231125/iTunes_1700842377403.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Amazon USA',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20220627/amazon_1656321392563.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Spotify USA',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20220726/Spotify_1658833400672.png',
          country: 'Global',
          min_price: 1,
        },
      ]
    },
    apple: {
      url: '/hot-sales',
      desc: 'Best selling items!',
      items: [
        {
          name: 'Visa Card',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20231121/Rewarble-paypal_1700501815044.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'BIGO Live',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20240221/BigoLive_1708470494560.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Apple Itunes',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20231125/iTunes_1700842377403.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Amazon USA',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20220627/amazon_1656321392563.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Spotify USA',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20220726/Spotify_1658833400672.png',
          country: 'Global',
          min_price: 1,
        },
      ]
    },
    usa: {
      url: '/hot-sales',
      desc: 'Best selling items!',
      items: [
        {
          name: 'Visa Card',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20231121/Rewarble-paypal_1700501815044.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'BIGO Live',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20240221/BigoLive_1708470494560.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Apple Itunes',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20231125/iTunes_1700842377403.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Amazon USA',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20220627/amazon_1656321392563.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Spotify USA',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20220726/Spotify_1658833400672.png',
          country: 'Global',
          min_price: 1,
        },
      ]
    },
    electronics: {
      url: '/hot-sales',
      desc: 'Best selling items!',
      items: [
        {
          name: 'Visa Card',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20231121/Rewarble-paypal_1700501815044.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'BIGO Live',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20240221/BigoLive_1708470494560.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Apple Itunes',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20231125/iTunes_1700842377403.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Amazon USA',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20220627/amazon_1656321392563.png',
          country: 'Global',
          min_price: 1,
        },
        {
          name: 'Spotify USA',
          url: '/store/gift-cards/itunes-card',
          imgUrl: 'https://adminapi.bytetopup.com/u/20220726/Spotify_1658833400672.png',
          country: 'Global',
          min_price: 1,
        },
      ]
    },
  }
}
