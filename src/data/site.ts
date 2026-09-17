export const siteInfo = {
  name: '天公壇公園',
  fullName: '新竹天公壇公園',
  templeName: '新竹天公壇',
  tagline: '九龍柱、吊橋與客雅溪畔的城市綠地',
  description:
    '天公壇公園位於新竹市北區，緊鄰以玉皇大帝為主祀的新竹天公壇。這裡有大片草地、兒童遊戲區、健身設施、九龍柱與跨越客雅溪的吊橋，適合散步、親子停留與夜間看燈。',
  shortDescription:
    '新竹北區一處結合信仰地景、九龍柱、吊橋與客雅溪綠廊的開放式公園。',
  address: '新竹市北區中山路431巷36號',
  city: '新竹市',
  district: '北區',
  region: '台灣',
  phone: '03-522-8651',
  latitude: 24.799498,
  longitude: 120.957721,
  ratingValue: '4.5',
  ratingCount: 3773,
  bestRating: '5',
  priceRange: '免費',
  postalCode: '300',
  mapsShareUrl: 'https://maps.app.goo.gl/DZePQZpk2NUmxjPD9',
  govTourismUrl: 'https://travel.hccg.gov.tw/',
  nearbyLandmark1: '新竹都城隍廟',
  nearbyLandmark2: '北門大街',
  syncDate: '2026 年 9 月',
  openingHoursText: '戶外公園空間原則上不限時間；廟務、活動與設施使用請以現場公告為準。',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    }
  ],
  mapEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.8818772946397!2d120.957721!3d24.799498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346835915a873623%3A0xd5744ab9ae7c66a7!2z5aSp5YWs5Z2b5YWs5Zut!5e0!3m2!1szh-TW!2stw!4v1785476367575!5m2!1szh-TW!2stw&hl=zh-TW',
  ga4: 'G-HXM22WWPKP',
  ogImage: '/images/og/tiangongtan-park-og.jpg'
} as const;

export const navItems = [
  { href: '/', label: '首頁' },
  { href: '/guide/', label: '遊園指南' },
  { href: '/transport/', label: '交通停車' },
  { href: '/gallery/', label: '照片牆' },
  { href: '/plan/', label: '行程工具' },
  { href: '/faq/', label: 'FAQ' }
] as const;

export const highlights = [
  {
    title: '九龍柱地標',
    text: '高聳的九龍柱是公園最醒目的視覺焦點，白天看石雕細節，夜晚點燈後更有儀式感。',
    icon: '龍'
  },
  {
    title: '吊橋與溪畔散步',
    text: '吊橋跨越客雅溪並銜接西雅公園，可把短停留延伸成一段輕鬆的城市綠廊散步。',
    icon: '橋'
  },
  {
    title: '廟埕與公園相鄰',
    text: '天公壇香火與開放綠地相互呼應，適合安排成新竹市區半日慢遊。',
    icon: '壇'
  },
  {
    title: '親子友善停留',
    text: '草地、兒童遊戲設施與健身器材讓旅人不必趕行程，也能自在休息。',
    icon: '遊'
  }
] as const;

export const essentials = [
  { label: '門票 / 費用', value: '免費，戶外公園無售票口' },
  { label: '建議停留', value: '30–70 分鐘；連走西雅公園可抓 90 分鐘' },
  { label: '最佳時段', value: '清晨、傍晚與夜間點燈時段最舒服' },
  { label: '適合對象', value: '散步、親子、攝影、廟宇文化與城市慢遊' },
  { label: '停車資訊', value: '周邊路邊與鄰近停車格為主，廟會與假日建議提早抵達' },
  { label: '注意事項', value: '尊重廟宇動線，夜間散步留意照明與溪畔安全' }
] as const;

export const galleryImages = [
  {
    src: '/images/tiangongtan-night-pillar.jpg',
    alt: '夜間點燈的天公壇公園九龍柱',
    title: '九龍柱夜景',
    note: '夜色中最適合拍攝的地標角度',
    shape: 'wide'
  },
  {
    src: '/images/tiangongtan-day-pillar.jpg',
    alt: '白天拍攝的天公壇公園九龍柱與廣場',
    title: '白天的九龍柱',
    note: '石雕細節與柱體比例清楚可見',
    shape: 'tall'
  },
  {
    src: '/images/tiangongtan-park-sign.jpg',
    alt: '天公壇公園入口與公園標示',
    title: '公園入口',
    note: '從廟埕到公園的第一眼印象',
    shape: 'standard'
  },
  {
    src: '/images/tiangongtan-park-plaza.webp',
    alt: '天公壇公園廣場與步道空間',
    title: '廣場步道',
    note: '適合短暫散步與放慢腳步',
    shape: 'standard'
  },
  {
    src: '/images/tiangongtan-park-green.webp',
    alt: '天公壇公園綠地與樹木',
    title: '溪畔綠意',
    note: '草地與樹蔭讓城市停留更舒服',
    shape: 'wide'
  },
  {
    src: '/images/tiangongtan-temple-roof.jpg',
    alt: '新竹天公壇廟宇外觀與屋脊',
    title: '天公壇屋脊',
    note: '廟宇線條帶出在地信仰氣質',
    shape: 'standard'
  },
  {
    src: '/images/tiangongtan-lantern-hall.jpg',
    alt: '天公壇室內燈籠與廟宇空間',
    title: '燈籠廟景',
    note: '室內光影適合觀察傳統廟宇細節',
    shape: 'standard'
  },
  {
    src: '/images/tiangongtan-entry-detail.jpg',
    alt: '新竹天公壇入口細節與匾額',
    title: '入口細節',
    note: '抬頭看見歷史感與香火氛圍',
    shape: 'tall'
  }
] as const;

export const trafficRoutes = [
  {
    title: '台鐵步行',
    detail: '搭台鐵至新竹站後，沿市區道路步行約 15–20 分鐘可抵達；若帶小孩或長輩，可改搭計程車縮短步行。'
  },
  {
    title: '高鐵轉乘',
    detail: '搭高鐵至新竹站後，轉台鐵六家線至新竹站，再步行或轉乘計程車前往。'
  },
  {
    title: '自行開車',
    detail: '可由國道一號新竹系統交流道或國道三號茄苳交流道進入市區，再接中山路周邊道路。'
  },
  {
    title: '市區慢遊串聯',
    detail: '從城隍廟、北門大街或新竹市區老街區出發，可安排成步行、YouBike 或短程車行的半日路線。'
  }
] as const;

export const foodAreas = [
  {
    name: '城隍廟小吃圈',
    distance: '約可安排同一趟市區行程',
    ideas: ['新竹貢丸湯', '新竹米粉', '肉圓', '滷肉飯與傳統點心'],
    tip: '適合把天公壇公園排在傍晚前後，散步後再到城隍廟周邊吃晚餐。'
  },
  {
    name: '北門大街周邊',
    distance: '老街散步延伸區',
    ideas: ['老屋咖啡', '在地冰品', '傳統糕餅', '小吃攤位'],
    tip: '適合慢慢走，拍老街、吃點心，再回到市區車站。'
  },
  {
    name: '中山路與西大路生活圈',
    distance: '離公園較近',
    ideas: ['便當簡餐', '飲料店', '咖啡店', '家庭式小館'],
    tip: '若只是短暫停留，可在附近解決輕食與飲品，不必特地繞遠。'
  }
] as const;

export const nearbyAttractions = [
  {
    name: '新竹都城隍廟',
    text: '新竹市區代表性廟宇與小吃聚落，適合作為天公壇公園前後的主要美食停靠點。'
  },
  {
    name: '北門大街',
    text: '保留老街尺度與歷史街屋氛圍，可與城隍廟小吃串成步行路線。'
  },
  {
    name: '西雅公園與客雅溪綠廊',
    text: '從吊橋延伸的溪畔綠地，適合散步、遛小孩與補足城市自然感。'
  },
  {
    name: '新竹市眷村博物館',
    text: '認識新竹眷村文化的室內景點，天候不佳時可作為備案。'
  },
  {
    name: '十七公里海岸與南寮漁港',
    text: '若時間更充裕，可把市區信仰與海岸單車、夕陽行程串成一日遊。'
  }
] as const;

export const itineraryItems = [
  { id: 'pillar-night', title: '看九龍柱夜景', category: '拍照' },
  { id: 'temple-court', title: '走進天公壇廟埕', category: '文化' },
  { id: 'bridge', title: '散步通過吊橋', category: '散步' },
  { id: 'keya-creek', title: '沿客雅溪綠廊慢走', category: '自然' },
  { id: 'kids-play', title: '親子遊戲區停留', category: '親子' },
  { id: 'chenghuang-food', title: '到城隍廟小吃圈用餐', category: '美食' },
  { id: 'beimen-street', title: '順遊北門大街', category: '周邊' }
] as const;

export const faqItems = [
  {
    question: '天公壇公園需要門票嗎？',
    answer: '不需要。公園屬戶外開放空間，主要以散步、拍照、親子停留與溪畔休憩為主。'
  },
  {
    question: '天公壇公園和新竹天公壇是同一個地方嗎？',
    answer: '兩者相鄰但概念不同。新竹天公壇是以玉皇大帝為主祀的廟宇，天公壇公園則是旁邊的戶外綠地與九龍柱、吊橋等景觀空間。'
  },
  {
    question: '最推薦什麼時間去？',
    answer: '清晨與傍晚溫度較舒服；若想拍九龍柱與燈光，可安排在傍晚至夜間，但夜間請留意同行者與溪畔安全。'
  },
  {
    question: '可以帶小孩去嗎？',
    answer: '可以。公園有草地、兒童遊戲設施與健身器材，適合短暫放電。不過靠近道路、橋面與溪畔時仍需陪同。'
  },
  {
    question: '停車方便嗎？',
    answer: '周邊以路邊停車格與鄰近停車空間為主，遇到假日、廟會或活動時較容易滿位，建議提早出發或改搭大眾運輸。'
  },
  {
    question: '建議停留多久？',
    answer: '單看公園與九龍柱大約 30–70 分鐘；若加上吊橋、西雅公園、城隍廟小吃或北門大街，可規劃成半日行程。'
  }
] as const;
