import type { LearningContent } from '../types';

export const learningContent: LearningContent[] = [
  {
    productId: 'fj-remote-start',
    whatIsIt: {
      ja: 'リモートスタートは、スマートフォンのアプリからエンジンを遠隔始動し、乗車前に車内の温度を快適に整える機能です。冬の霜取り、夏の車内冷却、通勤前の暖機など、あらゆる気候・季節でのドライブ体験を向上させます。',
      en: 'Remote Start lets you start your engine remotely from a smartphone app and pre-condition the cabin before you get in. Whether it\'s defrosting in winter, cooling down in summer, or warming up before your commute, it improves the driving experience in any climate.',
    },
    whyCustomersCare: [
      {
        feature: { ja: '遠隔エンジン始動', en: 'Remote engine start' },
        value: { ja: '乗る前に快適な温度に整える', en: 'Cabin ready at a comfortable temperature before entry' },
        experience: { ja: '真冬でも車に乗った瞬間から快適。ストレスゼロ', en: 'Comfortable the moment you get in, even in deep winter. Zero stress.' },
      },
      {
        feature: { ja: '霜取り支援', en: 'Defrost support' },
        value: { ja: '朝の準備時間を短縮', en: 'Reduce morning preparation time' },
        experience: { ja: '急いでいる朝でも、窓が完全に見える状態で出発できる', en: 'Leave on time with full visibility even on rushed mornings.' },
      },
      {
        feature: { ja: '空調事前制御', en: 'Pre-conditioning air control' },
        value: { ja: '真夏の灼熱地獄を回避', en: 'Avoid summer heat buildup in the cabin' },
        experience: { ja: '炎天下に停めていても、乗り込んだ瞬間に冷たい風が出る', en: 'Cool air meets you when you get in, even after parking under the sun.' },
      },
    ],
    bestFitCustomers: [
      {
        persona: { ja: '通勤で毎日使うファミリー', en: 'Daily commuting family' },
        reason: { ja: '毎朝の準備時間が節約できる。特に子どもを乗せる場合に価値が高い', en: 'Saves preparation time every morning, especially valuable with children aboard.' },
        tags: ['Commuter', 'Family', 'Daily'],
      },
      {
        persona: { ja: '寒冷地に住む方', en: 'Residents of cold-weather regions' },
        reason: { ja: '霜・雪・低温のある地域では特に価値が高い。北海道、ミネソタ等', en: 'Extremely valuable in frost, snow, and low-temperature areas like Hokkaido or Minnesota.' },
        tags: ['Cold Region', 'Winter'],
      },
      {
        persona: { ja: '夏の暑い地域に住む方', en: 'Residents of hot summer regions' },
        reason: { ja: '真夏の炎天下駐車後の車内温度問題を解消する', en: 'Solves the problem of extreme cabin heat after parking in summer sun.' },
        tags: ['Hot Region', 'Summer', 'Comfort'],
      },
    ],
    customerStory: {
      persona: { ja: '東京在住・2児の父・毎日通勤', en: 'Tokyo resident, father of 2, daily commuter' },
      before: { ja: '冬の朝、子どもたちを乗せるたびに「寒い！」と言われていた。霜で窓が曇るので、毎朝5分早起きしていた。', en: 'Every winter morning, the kids would complain about the cold when getting in. Had to wake up 5 minutes early to defrost the windows.' },
      after: { ja: 'リモートスタートで出発15分前にエンジン始動。乗り込んだ時には暖かく、窓も完全に見える状態。家族から「快適になった」と言われた。', en: 'Started using Remote Start 15 minutes before departure. Warm cabin and clear windows every morning. Family says it\'s become much more comfortable.' },
      label: 'Demo / Hypothesis',
    },
    howToSell: {
      opener: { ja: '毎朝の通勤で、乗り込む前に車内が整っていたら便利だと思いませんか？', en: 'Wouldn\'t it be convenient if your cabin was already ready before you get in every morning?' },
      questions: [
        { ja: '冬の朝、車に乗る前に霜取りや暖機をしていますか？', en: 'Do you defrost or warm up your car in the morning before driving?' },
        { ja: 'お子さんや家族を乗せることが多いですか？', en: 'Do you often have children or family members in the car?' },
        { ja: '夏、炎天下に停めた後の車内温度が気になりますか？', en: 'Does extreme cabin heat after parking in summer bother you?' },
      ],
      suggestedTalk: { ja: '毎朝の霜取りや暖機の5分が、リモートスタート一つでゼロになります。特にお子さんがいらっしゃる場合、寒い思いをさせずに乗せられます。もちろん夏の灼熱対策にも効果的です。', en: 'Those 5 minutes of defrosting and warm-up every morning disappear with Remote Start. Especially with kids, they\'ll never have to endure the cold again. Works great for summer heat too.' },
      objectionHandling: [
        {
          objection: { ja: 'そんなに使わないかも', en: 'I might not use it that much' },
          response: { ja: '特に冬の通勤や、お子さんがいる場合に使い始めると、「これなしでは無理」とおっしゃるお客様が多いです。', en: 'Many customers who start using it in winter or with kids say they can\'t imagine going back.' },
        },
        {
          objection: { ja: '操作が難しそう', en: 'Sounds complicated to operate' },
          response: { ja: 'スマートフォンアプリから2タップで操作できます。実際に触ってみましょうか？', en: 'Just 2 taps on the smartphone app. Would you like to try it out right now?' },
        },
      ],
    },
    successStory: {
      title: { ja: '北海道ディーラー：リモートスタート提案率と成約率の改善事例', en: 'Hokkaido Dealer: Remote Start proposal rate and conversion improvement' },
      content: { ja: 'リモートスタートの価値訴求をファミリー＋通勤層に絞り、ストーリー形式で提案したところ、前年比で大幅に提案数・成約数が向上したという仮説事例です。', en: 'By targeting Remote Start value proposition at family+commuter segments with story-based proposals, a hypothetical case showed significant improvements in both proposal and conversion rates year-over-year.' },
      label: 'Demo / Hypothesis',
    },
    quiz: [
      {
        question: { ja: 'リモートスタートが最も価値を発揮するのはどのようなお客様ですか？', en: 'Which customer profile benefits most from Remote Start?' },
        options: [
          { ja: '週末のみ運転するアウトドア趣味の方', en: 'Weekend-only outdoor enthusiast' },
          { ja: '毎日通勤で使い、寒冷地または暑い地域に住む方', en: 'Daily commuter living in cold or hot climate regions' },
          { ja: '高速道路を中心に長距離を走る方', en: 'Long-distance highway driver' },
          { ja: 'EVを初めて使う方', en: 'First-time EV user' },
        ],
        correctIndex: 1,
        explanation: { ja: '毎日通勤で使う方は使用頻度が高く、寒冷地・暑い地域では乗車前の温度問題が明確なため、価値訴求が最も強くなります。', en: 'Daily commuters have high usage frequency, and cold or hot climates create a clear problem with cabin temperature before entry, making the value proposition strongest.' },
      },
      {
        question: { ja: 'リモートスタートの「霜取り支援」はどのような状況で特に価値がありますか？', en: 'When is Remote Start\'s defrost support particularly valuable?' },
        options: [
          { ja: '雨の多い地域での視認性向上', en: 'Improving visibility in rainy regions' },
          { ja: '真冬の朝、窓に霜が付く地域・季節', en: 'Winter mornings with frost on windows' },
          { ja: '充電ケーブルの管理が必要なEV', en: 'Managing charging cables for EVs' },
          { ja: '子どもの乗降時のシート保護', en: 'Protecting seats during child entry/exit' },
        ],
        correctIndex: 1,
        explanation: { ja: '霜取り支援は特に冬の朝、窓に霜が付く場面で効果を発揮します。北海道やミネソタなどの寒冷地での価値が特に高くなります。', en: 'Defrost support is most effective on winter mornings when frost forms on windows. Its value is especially high in cold regions like Hokkaido or Minnesota.' },
      },
      {
        question: { ja: 'このお客様に最初に聞く質問として最も適切なのはどれですか？「毎朝通勤で使い、お子さんが2人いる、東京在住の方」', en: 'What is the best first question to ask this customer: "Daily commuter, 2 kids, lives in Tokyo"?' },
        options: [
          { ja: '充電ケーブルの管理に困っていますか？', en: 'Do you have trouble managing your charging cables?' },
          { ja: '毎朝の出発前に、車内が整っていると便利だと思いませんか？', en: 'Wouldn\'t it be convenient if your car was ready before you get in each morning?' },
          { ja: 'シートが汚れやすい環境で使っていますか？', en: 'Are you using the car in an environment where seats get dirty easily?' },
          { ja: '家族で車を共有していますか？', en: 'Are you sharing the car with family?' },
        ],
        correctIndex: 1,
        explanation: { ja: '毎日通勤・子ども2人というProfileから、朝の準備時間短縮と快適な乗車体験が最大の価値。「車内が整っていると便利では？」という問いかけが最も自然なオープナーです。', en: 'Given the daily commute and 2 kids, reducing morning prep time and comfortable cabin entry are the primary values. "Wouldn\'t it be convenient if your car was ready?" is the most natural opener.' },
      },
    ],
  },
  {
    productId: 'fj-air-lumbar',
    whatIsIt: {
      ja: 'エアーランバーは、シートと背中の間の隙間をエアーで埋め、腰部をサポートするシートアクセサリーです。体圧を分散し、姿勢を整えることで、長時間の運転による疲労感を軽減します。',
      en: 'Air Lumbar is a seat accessory that fills the gap between your seat and back with air to support your lumbar region. It distributes body pressure and improves posture to reduce fatigue during long drives.',
    },
    whyCustomersCare: [
      {
        feature: { ja: 'エアーによる腰部サポート', en: 'Air-based lumbar support' },
        value: { ja: '長距離でも疲れにくい体勢をキープ', en: 'Maintain a fatigue-resistant posture on long drives' },
        experience: { ja: '2時間走っても腰に重だるさを感じない快適なドライブ体験', en: 'Comfortable drive without lumbar fatigue even after 2 hours.' },
      },
      {
        feature: { ja: '体圧分散', en: 'Pressure distribution' },
        value: { ja: '一点集中の負担を解消', en: 'Eliminate concentrated pressure on a single point' },
        experience: { ja: 'シートに沈み込む感じがなく、適切な姿勢が自然に維持される', en: 'No sinking into the seat, posture naturally maintained throughout the drive.' },
      },
    ],
    bestFitCustomers: [
      {
        persona: { ja: '長距離ドライブをよくする方', en: 'Frequent long-distance driver' },
        reason: { ja: '走行距離・時間が長いほど、腰への負担が蓄積。エアーランバーの効果が実感しやすい', en: 'The longer the drive, the more strain on the lumbar. The effect of Air Lumbar is most noticeable here.' },
        tags: ['Long-distance', 'Highway', 'Comfort'],
      },
      {
        persona: { ja: '毎日通勤で運転する方', en: 'Daily commuter' },
        reason: { ja: '毎日の蓄積疲労を軽減し、仕事後の疲れを減らす', en: 'Reduces cumulative daily fatigue and end-of-work tiredness.' },
        tags: ['Commuter', 'Daily'],
      },
    ],
    customerStory: {
      persona: { ja: '都内在住・週5日通勤・長距離出張が月2回', en: 'Tokyo resident, 5-day commuter, long-distance business trips twice a month' },
      before: { ja: '片道40分の通勤と月2回の長距離出張で、腰の重さが慢性的に気になっていた。特に帰り道は運転が億劫だった。', en: 'With a 40-minute commute and two long-distance trips per month, chronic lumbar fatigue was a constant issue. Especially dreading the drive home.' },
      after: { ja: 'エアーランバーを取り付けてから1週間で、「運転後の腰の疲れが明らかに違う」と実感。長距離出張後の翌日の疲れも改善。', en: 'Within a week of installing Air Lumbar, noticed a clear difference in post-drive lumbar fatigue. Recovery after long-distance trips also improved.' },
      label: 'Demo / Hypothesis',
    },
    howToSell: {
      opener: { ja: '長距離を走った後や、毎日の通勤で腰の疲れが気になることはありませんか？', en: 'Do you notice lumbar fatigue after long drives or your daily commute?' },
      questions: [
        { ja: '週にどのくらいの距離を運転されますか？', en: 'How many miles or kilometers do you drive per week?' },
        { ja: '高速道路を使ったり、長距離を走ることはありますか？', en: 'Do you drive on highways or take long-distance trips?' },
        { ja: '運転後の疲れや腰の重さを感じることはありますか？', en: 'Do you feel tired or have lumbar discomfort after driving?' },
      ],
      suggestedTalk: { ja: '長距離や毎日の通勤では、背中とシートの間の隙間が腰に負担をかけます。エアーランバーはその隙間をエアーで埋め、体圧を分散。「疲れにくい移動体験」に変えます。', en: 'On long drives or daily commutes, the gap between your back and seat puts strain on your lumbar. Air Lumbar fills that gap with air, distributing pressure and transforming the drive into a fatigue-resistant experience.' },
      objectionHandling: [
        {
          objection: { ja: 'シートの調整で対応できると思っている', en: 'Thinks seat adjustment is enough' },
          response: { ja: 'シート調整は大まかな位置合わせ。エアーランバーは体型に合わせてエアー量を調整できるため、より細かいフィットが可能です。', en: 'Seat adjustment handles general positioning. Air Lumbar lets you fine-tune air volume to match your body shape for a more precise fit.' },
        },
      ],
    },
    successStory: {
      title: { ja: '長距離ドライバーへのエアーランバー提案効果の仮説事例', en: 'Hypothetical Air Lumbar proposal results for long-distance drivers' },
      content: { ja: '通勤距離・週走行距離が高いお客様へのエアーランバー提案を優先したディーラーで、成約後のリピート来店率が向上したという仮説事例です。', en: 'In a hypothetical case, a dealer prioritizing Air Lumbar proposals for customers with long commutes and high weekly mileage saw increased repeat visit rates after conversion.' },
      label: 'Demo / Hypothesis',
    },
    quiz: [
      {
        question: { ja: 'エアーランバーが最も効果を発揮するのはどのような走行シーンですか？', en: 'In which driving scenario does Air Lumbar provide the most benefit?' },
        options: [
          { ja: '短距離の買い物や送迎', en: 'Short trips for shopping or pickup' },
          { ja: '週複数回の長距離ドライブや毎日の長い通勤', en: 'Multiple long-distance drives per week or long daily commutes' },
          { ja: '週末のみのアウトドアドライブ', en: 'Weekend-only outdoor drives' },
          { ja: 'EV充電後のドライブ', en: 'Drives after EV charging' },
        ],
        correctIndex: 1,
        explanation: { ja: '走行距離や時間が長いほど腰への負担が蓄積するため、長距離・毎日の長い通勤で最も効果を実感できます。', en: 'The longer the drive time and distance, the more lumbar strain accumulates. Long-distance drives and daily long commutes show the most noticeable benefit.' },
      },
      {
        question: { ja: 'エアーランバーの主要機能はどれですか？', en: 'What is the primary function of Air Lumbar?' },
        options: [
          { ja: '車内の空気を清浄化する', en: 'Purifies cabin air' },
          { ja: 'シートを加熱・冷却する', en: 'Heats and cools the seat' },
          { ja: '背中とシートの隙間をエアーで埋め、体圧を分散する', en: 'Fills the gap between back and seat with air to distribute pressure' },
          { ja: 'ドライバーの眠気を検知してアラートを出す', en: 'Detects driver drowsiness and alerts' },
        ],
        correctIndex: 2,
        explanation: { ja: 'エアーランバーの主機能は背中とシートの隙間をエアーで埋め、体圧を分散することで腰への負担を軽減することです。', en: 'The primary function of Air Lumbar is to fill the gap between the back and seat with air, distributing body pressure to reduce lumbar strain.' },
      },
      {
        question: { ja: '次のお客様にエアーランバーをすすめる際の最適な訴求ポイントはどれですか？「週320km走行、毎日通勤、快適さへの関心が高い」', en: 'What is the best appeal for this customer? "320km weekly, daily commuter, high comfort interest"' },
        options: [
          { ja: '充電ケーブルの収納が楽になる', en: 'Easier charging cable storage' },
          { ja: '毎日の蓄積疲労を軽減し、疲れにくい移動体験を実現する', en: 'Reduces daily cumulative fatigue for a less tiring driving experience' },
          { ja: '車内の汚れが拭き取りやすくなる', en: 'Easier to wipe clean inside the car' },
          { ja: '雨の日の後方視認性が向上する', en: 'Better rear visibility on rainy days' },
        ],
        correctIndex: 1,
        explanation: { ja: '毎日の通勤・高走行距離・快適さへの関心から、腰疲れの軽減と疲れにくい移動体験が最も響く訴求です。', en: 'Given the daily commute, high weekly mileage, and comfort interest, reducing lumbar fatigue and providing a less-tiring drive experience is the most resonant appeal.' },
      },
    ],
  },
  {
    productId: 'fj-seat-cover',
    whatIsIt: {
      ja: 'シートカバーは、撥水加工・水や泥・汗への高い耐性を持ち、汚れを簡単に拭き取れる実用的なシートプロテクターです。ISOFIX対応で子どもの安全も確保しながら、アウトドアや家族利用のライフスタイルを快適にサポートします。',
      en: 'The Seat Cover is a practical seat protector with water-repellent coating and high resistance to water, mud, and sweat that wipes clean easily. ISOFIX compatible to keep children safe while supporting outdoor and family-oriented lifestyles.',
    },
    whyCustomersCare: [
      {
        feature: { ja: '撥水・防汚加工', en: 'Water-repellent and anti-dirt coating' },
        value: { ja: 'アウトドア・子ども利用後も車内を清潔に保てる', en: 'Keep the interior clean after outdoor use or rides with kids' },
        experience: { ja: 'キャンプ後の泥だらけの服でも、帰宅後さっと拭けばOK。ストレスゼロ', en: 'After camping with muddy clothes, just wipe clean on arrival home. Zero stress.' },
      },
      {
        feature: { ja: 'ISOFIX対応', en: 'ISOFIX compatible' },
        value: { ja: 'チャイルドシートを安全に設置できる', en: 'Safely install child seats' },
        experience: { ja: 'シートカバーをしていても子どもの安全を犠牲にしない', en: 'Child safety is never compromised even with the seat cover installed.' },
      },
    ],
    bestFitCustomers: [
      {
        persona: { ja: 'アウトドア・キャンプを楽しむファミリー', en: 'Outdoor and camping family' },
        reason: { ja: '泥・汗・食べこぼしなど、ライフスタイル由来の汚れに最も効果的', en: 'Most effective against lifestyle-origin soiling from mud, sweat, food spills.' },
        tags: ['Family', 'Outdoor', 'Camping'],
      },
      {
        persona: { ja: '子どものいるファミリー', en: 'Families with children' },
        reason: { ja: '子どもの乗降時の汚れ・ISOFIX対応の安全性の両立ができる', en: 'Balances protection from children\'s mess with ISOFIX compatible child seat safety.' },
        tags: ['Family', 'Kids', 'Safety'],
      },
    ],
    customerStory: {
      persona: { ja: '東京在住・小学生2人・週末にキャンプや山へ行く', en: 'Tokyo resident, 2 elementary school kids, weekend camping and mountain trips' },
      before: { ja: 'キャンプや海から帰るたびに、シートが砂・泥・食べこぼしで汚れ、毎回クリーニングが大変だった。子どものジュース漏れで一度シートを汚してから、「乗るな」と言いたくなった。', en: 'Every camping or beach return trip left the seats full of sand, mud, and food. Cleaning was a constant hassle. After a juice spill from the kids, almost wanted to ban them from the car.' },
      after: { ja: 'シートカバー装着後は、キャンプ帰りも水で流すか拭くだけ。「この車はアウトドアに最高」と家族全員が快適に使えるようになった。', en: 'With the seat cover installed, post-camping cleanup is just a wipe or rinse. "This car is perfect for outdoor use" — the whole family now uses it comfortably.' },
      label: 'Demo / Hypothesis',
    },
    howToSell: {
      opener: { ja: '週末にアウトドアやキャンプに行かれたり、お子さんを乗せることはありますか？', en: 'Do you go outdoors or camping on weekends, or have children in the car?' },
      questions: [
        { ja: 'キャンプや山・海など、アウトドアに行くことはありますか？', en: 'Do you go camping, to the mountains, or to the beach?' },
        { ja: 'お子さんや荷物で、シートが汚れやすい環境で使っていますか？', en: 'Do you use the car in environments where seats get dirty easily with kids or cargo?' },
        { ja: '車内の清潔さは気になりますか？', en: 'Is interior cleanliness important to you?' },
      ],
      suggestedTalk: { ja: 'アウトドアやキャンプを楽しまれるなら、泥・砂・汗は避けられません。シートカバーなら、帰宅後に拭き取るだけ。ISOFIX対応なのでチャイルドシートも安全に取り付けられます。', en: 'If you enjoy outdoor activities and camping, mud, sand, and sweat are unavoidable. With the Seat Cover, just wipe clean after returning home. ISOFIX compatible for safe child seat installation.' },
      objectionHandling: [
        {
          objection: { ja: '見た目が変わるのが嫌だ', en: 'Doesn\'t want to change the appearance' },
          response: { ja: 'シートに合わせたデザインですので、装着後もオリジナルの雰囲気を損なわないよう設計されています。実際の装着例をご覧になりますか？', en: 'Designed to match the seat style so the original look is preserved after installation. Would you like to see an example of the installed product?' },
        },
      ],
    },
    successStory: {
      title: { ja: 'ファミリー×アウトドアへのシートカバー提案効果の仮説事例', en: 'Hypothetical Seat Cover proposal results for Family × Outdoor segment' },
      content: { ja: 'アウトドア・ファミリー層を絞り込んでシートカバーを提案したディーラーでは、提案後の成約率が他のアクセサリーと比較して高い水準だったという仮説事例です。', en: 'In a hypothetical case, dealers targeting the outdoor/family segment with Seat Cover proposals saw higher conversion rates compared to other accessories.' },
      label: 'Demo / Hypothesis',
    },
    quiz: [
      {
        question: { ja: 'シートカバーのISOFIX対応は何のための機能ですか？', en: 'What is the ISOFIX compatibility of the Seat Cover for?' },
        options: [
          { ja: 'シートカバーを固定するためのロック機能', en: 'Locking mechanism to secure the seat cover' },
          { ja: 'チャイルドシートを安全に取り付けられるようにするため', en: 'To safely install child seats' },
          { ja: '後部座席の乗客の安全ベルトをサポートするため', en: 'To support rear passenger seat belts' },
          { ja: 'シートヒーターとの互換性を確保するため', en: 'To ensure compatibility with seat heaters' },
        ],
        correctIndex: 1,
        explanation: { ja: 'ISOFIXはチャイルドシートの固定規格です。シートカバーがISOFIX対応であることで、カバー装着時でもチャイルドシートを安全に取り付けられます。', en: 'ISOFIX is the child seat anchoring standard. ISOFIX compatibility ensures that child seats can be safely installed even with the cover in place.' },
      },
      {
        question: { ja: 'シートカバーを最優先で提案すべきお客様はどのプロフィールに最も当てはまりますか？', en: 'Which customer profile should be the top priority for Seat Cover proposals?' },
        options: [
          { ja: 'EV初心者で充電に不慣れな方', en: 'First-time EV user unfamiliar with charging' },
          { ja: '毎日長距離を通勤する単身者', en: 'Solo daily long-distance commuter' },
          { ja: 'ファミリー＋アウトドア・キャンプが趣味で、車内の汚れが気になる方', en: 'Family with outdoor/camping hobby who cares about cabin cleanliness' },
          { ja: '安全運転支援が必要な高齢者', en: 'Senior needing driving assistance' },
        ],
        correctIndex: 2,
        explanation: { ja: 'シートカバーの訴求軸は撥水・防汚・ISOFIX。ファミリー×アウトドア×車内清潔感への関心を持つお客様に最も刺さります。', en: 'Seat Cover appeals through water repellency, anti-soiling, and ISOFIX. Strongest resonance with Family × Outdoor × cleanliness-conscious customers.' },
      },
      {
        question: { ja: 'このお客様にシートカバーを提案する際の最初の一言として最も自然なのはどれですか？「週末にキャンプや山に行く、小学生2人のパパ」', en: 'What is the most natural opening when proposing Seat Cover to: "Dad of 2 elementary kids who goes camping/mountains on weekends"?' },
        options: [
          { ja: '充電ケーブルの管理に困っていませんか？', en: 'Do you have trouble managing charging cables?' },
          { ja: '腰の疲れが気になることはありませんか？', en: 'Do you ever feel lumbar fatigue?' },
          { ja: '週末のアウトドアの後、シートの汚れが気になることはありませんか？', en: 'After weekend outdoor trips, do you worry about the seats getting dirty?' },
          { ja: '冬の朝、霜取りに時間がかかっていませんか？', en: 'Are you spending too much time defrosting on winter mornings?' },
        ],
        correctIndex: 2,
        explanation: { ja: 'アウトドア×ファミリーのプロフィールから、「アウトドア後の車内の汚れ」が最も直接的な痛点。そこに直結する問いかけが最も自然なオープナーです。', en: 'From the outdoor × family profile, cabin soiling after outdoor trips is the most direct pain point. A question that directly connects to this is the most natural opener.' },
      },
    ],
  },
  {
    productId: 'bz-cable-holder',
    whatIsIt: {
      ja: '充電ケーブルホルダーは、長い充電ケーブルをすっきり整理するための専用ホルダーです。毎回まとめる手間を解消し、収納性と持ち運びやすさを両立。EV生活を毎日より快適にサポートします。',
      en: 'The Charging Cable Holder is a dedicated holder for neatly organizing long charging cables. Eliminates the daily hassle of bundling, combining storage convenience with portability for a more comfortable daily EV life.',
    },
    whyCustomersCare: [
      {
        feature: { ja: '充電ケーブル専用収納', en: 'Dedicated charging cable storage' },
        value: { ja: '毎回のケーブル束ね作業がゼロに', en: 'Eliminate daily cable bundling work' },
        experience: { ja: '充電が終わったらホルダーにかけるだけ。毎日のルーティンがスムーズに', en: 'Just hang on the holder when charging is done. Daily routine becomes smooth.' },
      },
      {
        feature: { ja: '持ち運びしやすい設計', en: 'Portable design' },
        value: { ja: '外出先充電でもケーブルがすっきり', en: 'Clean cable management even at away-from-home charging' },
        experience: { ja: '外出先での充電でも、ケーブルが絡まらず取り出しやすい', en: 'Easy to retrieve without tangling at away-from-home charging locations.' },
      },
    ],
    bestFitCustomers: [
      {
        persona: { ja: '自宅充電を毎日行うEVコミューター', en: 'Daily home-charging EV commuter' },
        reason: { ja: '充電頻度が高いほどケーブル管理の手間が大きく、ホルダーによる改善が実感しやすい', en: 'Higher charging frequency means more cable management hassle — the holder improvement is most noticeable.' },
        tags: ['EV', 'Commuter', 'Home Charging'],
      },
      {
        persona: { ja: 'EVを初めて使い始めた方', en: 'First-time EV user' },
        reason: { ja: 'EV生活のルーティン構築に、便利な収納が早期に差を生む', en: 'Convenient storage makes a difference early in building an EV lifestyle routine.' },
        tags: ['EV', 'Convenience', 'New Owner'],
      },
    ],
    customerStory: {
      persona: { ja: 'ワシントン州在住・毎日通勤・自宅充電・週5回以上', en: 'Washington state resident, daily commuter, home charging, 5+ times a week' },
      before: { ja: '毎晩充電するたびにケーブルを束ね、毎朝取り出す作業が地味にストレス。ケーブルが絡まって取り出せないこともあった。', en: 'Bundling the cable every evening and retrieving it every morning was a subtle but constant stress. Sometimes the cable tangled and was hard to retrieve.' },
      after: { ja: '充電ケーブルホルダー装着後は、充電後にかけるだけ・朝はそのまま取り出すだけ。「こんな小さいことで毎日のストレスがなくなった」と実感。', en: 'After installing the holder, just hang after charging and grab in the morning. "Such a small thing eliminated daily stress" was the feeling.' },
      label: 'Demo / Hypothesis',
    },
    howToSell: {
      opener: { ja: '毎日の充電で、ケーブルの収納や取り扱いが面倒に感じることはありますか？', en: 'Do you find it troublesome to store or handle your charging cable every day?' },
      questions: [
        { ja: '自宅での充電は週に何回くらいしていますか？', en: 'How many times a week do you charge at home?' },
        { ja: '充電ケーブルの収納や束ねる作業で不便を感じますか？', en: 'Do you feel any inconvenience storing or bundling your charging cable?' },
        { ja: 'EV生活でもっと便利になってほしい部分はありますか？', en: 'Is there any part of your EV life you wish was more convenient?' },
      ],
      suggestedTalk: { ja: '自宅充電を毎日行う方にとって、充電ケーブルの収納・取り出しは毎日のルーティン。専用ホルダーがあれば、充電後はかけるだけ・朝は取り出すだけ。毎日の小さなストレスがゼロになります。', en: 'For daily home chargers, cable storage and retrieval is an everyday routine. A dedicated holder means just hang after charging and grab in the morning. Eliminates daily small stresses.' },
      objectionHandling: [
        {
          objection: { ja: 'こんなもの必要か？', en: 'Do I really need this?' },
          response: { ja: '毎日充電されるなら、毎日発生する手間です。実際に触ってみると「こんなに楽になるとは」とおっしゃる方が多いです。', en: 'If you charge daily, it\'s a daily hassle. Many customers who try it say they had no idea it would make such a difference.' },
        },
      ],
    },
    successStory: {
      title: { ja: 'EV日常利用者への充電ケーブルホルダー提案効果の仮説事例', en: 'Hypothetical results for Charging Cable Holder proposals to daily EV users' },
      content: { ja: '自宅充電を週4回以上行うEVユーザーへの提案で、即決成約率が高かったという仮説事例です。', en: 'In a hypothetical case, proposals to EV users charging at home 4+ times per week showed high immediate conversion rates.' },
      label: 'Demo / Hypothesis',
    },
    quiz: [
      {
        question: { ja: '充電ケーブルホルダーの提案に最も適したお客様はどのプロフィールですか？', en: 'Which customer profile is best suited for a Charging Cable Holder proposal?' },
        options: [
          { ja: '週1回程度の充電・主に公共充電を使う方', en: 'Weekly charging using mainly public chargers' },
          { ja: '自宅充電を毎日行うEVコミューター', en: 'Daily home-charging EV commuter' },
          { ja: '長距離ドライブで疲労を感じている方', en: 'Long-distance driver experiencing fatigue' },
          { ja: 'アウトドアで車を使うファミリー', en: 'Family using car for outdoor activities' },
        ],
        correctIndex: 1,
        explanation: { ja: '充電頻度が高いほどケーブル管理の手間が大きくなります。自宅充電を毎日行うEVコミューターに最も刺さる提案です。', en: 'Higher charging frequency means more cable management hassle. Daily home-charging EV commuters are the most receptive audience.' },
      },
      {
        question: { ja: '充電ケーブルホルダーの主な価値はどれですか？', en: 'What is the primary value of the Charging Cable Holder?' },
        options: [
          { ja: '充電速度を向上させる', en: 'Improves charging speed' },
          { ja: '毎日のケーブル束ね・収納の手間を解消する', en: 'Eliminates daily cable bundling and storage hassle' },
          { ja: '車内の温度を調整する', en: 'Adjusts cabin temperature' },
          { ja: '走行距離を延ばす', en: 'Extends driving range' },
        ],
        correctIndex: 1,
        explanation: { ja: '充電ケーブルホルダーはケーブルの収納・管理を便利にする商品です。充電速度や走行距離には関係しません。', en: 'The Charging Cable Holder makes cable storage and management convenient. It has no relation to charging speed or driving range.' },
      },
      {
        question: { ja: 'このお客様に最初に確認すべき質問はどれですか？「bZ4Xオーナー、毎日通勤、自宅充電あり」', en: 'What is the first question to ask this customer? "bZ4X owner, daily commuter, has home charging"' },
        options: [
          { ja: '腰の疲れが気になりますか？', en: 'Do you experience lumbar fatigue?' },
          { ja: '週に何回くらい充電しているかや、ケーブルの収納で不便を感じることはありますか？', en: 'How often do you charge per week, and do you feel any inconvenience with cable storage?' },
          { ja: '雨の日の視界が気になりますか？', en: 'Are you concerned about visibility in rain?' },
          { ja: '家族で車を共有していますか？', en: 'Are you sharing the car with family?' },
        ],
        correctIndex: 1,
        explanation: { ja: '自宅充電あり・毎日通勤というプロフィールから、充電ケーブルの管理が毎日のルーティンになっている可能性が高い。充電頻度と不便を確認するのが最適です。', en: 'With home charging and daily commuting, cable management is likely a daily routine. Confirming charging frequency and cable-related inconvenience is optimal.' },
      },
    ],
  },
  {
    productId: 'bz-rain-mirror',
    whatIsIt: {
      ja: 'レインクリアリングブルーミラーは、ミラー表面に特殊な親水処理を施したルームミラーです。雨天時に水滴を均一な水膜に変えることで後方視認性をサポート。太陽光によって親水性が回復・持続します。',
      en: 'The Rain Clearing Blue Mirror applies a special hydrophilic coating to the mirror surface. In rain, it converts water droplets into a uniform water film to support rear visibility. Solar light helps recover and maintain the hydrophilic effect.',
    },
    whyCustomersCare: [
      {
        feature: { ja: '親水コーティング', en: 'Hydrophilic coating' },
        value: { ja: '雨天時の後方視認性をサポート', en: 'Support rear visibility in rain' },
        experience: { ja: '雨の日も視界が安定しており、車線変更や駐車が安心してできる', en: 'Stable visibility in rain, lane changes and parking feel safer.' },
      },
      {
        feature: { ja: '太陽光による親水性回復', en: 'Solar-powered hydrophilic recovery' },
        value: { ja: 'メンテナンス不要で効果が持続', en: 'Effect persists without maintenance' },
        experience: { ja: '洗車や特別なメンテナンスなしに、晴れた日に自動で性能が回復する', en: 'Performance automatically recovers on sunny days without washing or special maintenance.' },
      },
    ],
    bestFitCustomers: [
      {
        persona: { ja: '雨天が多い地域に住む方', en: 'Residents of regions with frequent rain' },
        reason: { ja: 'ワシントン州・ニューヨーク等、雨天頻度が高い地域では特に効果を実感できる', en: 'In high-rain frequency regions like Washington state or New York, the benefit is most noticeable.' },
        tags: ['Rainy Region', 'Safety', 'Visibility'],
      },
      {
        persona: { ja: '通勤で毎日運転する方', en: 'Daily commuter driver' },
        reason: { ja: '毎日の雨天運転での視認性確保は、安全運転の基本', en: 'Securing visibility in daily rain driving is fundamental to safe driving.' },
        tags: ['Commuter', 'Daily', 'Safety'],
      },
    ],
    customerStory: {
      persona: { ja: 'ワシントン州シアトル在住・毎日通勤・bZ4Xオーナー', en: 'Seattle, Washington resident, daily commuter, bZ4X owner' },
      before: { ja: 'シアトルは年間で雨の日が多く、雨天時のミラーが見えづらくて車線変更や駐車の際に不安を感じていた。', en: 'Seattle has many rainy days a year, and poor mirror visibility in rain caused anxiety during lane changes and parking.' },
      after: { ja: 'レインクリアリングブルーミラー装着後は、雨天でも視界が安定。「雨の日が怖くなくなった」という声をいただいた事例です。', en: 'After installing the Rain Clearing Blue Mirror, visibility remained stable in rain. "Rainy days no longer feel scary" — a hypothetical customer testimonial.' },
      label: 'Demo / Hypothesis',
    },
    howToSell: {
      opener: { ja: '雨の日の運転で、ミラーが見えにくくて不安になることはありますか？', en: 'Do you ever feel anxious about poor mirror visibility when driving in rain?' },
      questions: [
        { ja: 'お住まいの地域は雨が多いですか？', en: 'Is your region prone to frequent rain?' },
        { ja: '雨の日の運転で、視界や安全性を気にすることはありますか？', en: 'Are you concerned about visibility or safety when driving in rain?' },
        { ja: '通勤など、毎日の運転で雨の日が多いですか？', en: 'Are rainy days frequent in your daily driving routine like your commute?' },
      ],
      suggestedTalk: { ja: '特に雨の多い地域では、ミラーの視認性が安全運転の大きな要素です。レインクリアリングブルーミラーは親水コーティングで水滴を水膜に変え、視界をサポートします。晴れた日に太陽光で自動回復するのでメンテナンスも不要です。', en: 'In high-rain regions, mirror visibility is a major factor in safe driving. The Rain Clearing Blue Mirror converts water droplets into a water film with hydrophilic coating to support visibility. No maintenance needed as it auto-recovers with sunlight on clear days.' },
      objectionHandling: [
        {
          objection: { ja: 'そんなに効果があるの？', en: 'Does it really make that much difference?' },
          response: { ja: '親水コーティングにより、雨粒が均一な水膜になります。実際に雨天時に体験いただくと、視認性の差がはっきり分かります。', en: 'The hydrophilic coating causes rain to form a uniform water film. The difference in visibility becomes clear when you experience it in rain.' },
        },
      ],
    },
    successStory: {
      title: { ja: '雨天地域でのレインクリアリングブルーミラー提案効果の仮説事例', en: 'Hypothetical Rain Clearing Blue Mirror proposal results in high-rain regions' },
      content: { ja: 'ワシントン州のディーラーで、視認性・安全への関心の高いbZ4Xユーザーへの提案で高い反応率だったという仮説事例です。', en: 'In a hypothetical case, Washington state dealers saw high response rates when proposing to bZ4X users with high safety/visibility interest.' },
      label: 'Demo / Hypothesis',
    },
    quiz: [
      {
        question: { ja: 'レインクリアリングブルーミラーが特に効果的なのはどの地域ですか？', en: 'In which region is the Rain Clearing Blue Mirror most effective?' },
        options: [
          { ja: 'カリフォルニア州（温暖・乾燥）', en: 'California (warm and dry)' },
          { ja: 'ワシントン州（雨が多い）またはニューヨーク州（雨・雪）', en: 'Washington state (frequent rain) or New York (rain and snow)' },
          { ja: 'テキサス州（高温・乾燥）', en: 'Texas (hot and dry)' },
          { ja: '北海道（寒冷・雪が多い）', en: 'Hokkaido (cold and snowy)' },
        ],
        correctIndex: 1,
        explanation: { ja: '親水コーティングは雨天時に最も効果を発揮するため、雨が多いワシントン州やニューヨーク州で特に価値が高くなります。', en: 'Hydrophilic coating is most effective in rain, so regions with frequent rain like Washington or New York see the highest value.' },
      },
      {
        question: { ja: 'レインクリアリングブルーミラーの親水性はどのように回復・持続しますか？', en: 'How does the Rain Clearing Blue Mirror recover and maintain its hydrophilic properties?' },
        options: [
          { ja: '専用クリーナーで定期的に拭く必要がある', en: 'Requires regular wiping with a dedicated cleaner' },
          { ja: '太陽光によって自動で回復・持続する', en: 'Automatically recovers and is maintained by solar light' },
          { ja: '雨に当たることで効果が増す', en: 'Effect increases from rain exposure' },
          { ja: '走行風圧によって活性化される', en: 'Activated by driving wind pressure' },
        ],
        correctIndex: 1,
        explanation: { ja: 'レインクリアリングブルーミラーは太陽光によって親水性が回復・持続します。特別なメンテナンスは不要です。', en: 'The Rain Clearing Blue Mirror\'s hydrophilic properties recover and are maintained by solar light. No special maintenance required.' },
      },
      {
        question: { ja: '同じbZ4Xオーナーでも、レインクリアリングブルーミラーの訴求優先度が最も高くなるのはどのケースですか？', en: 'Among bZ4X owners, which case has the highest priority for Rain Clearing Blue Mirror proposals?' },
        options: [
          { ja: 'カリフォルニア在住・週末ドライブ好き', en: 'California resident, enjoys weekend drives' },
          { ja: 'ミネソタ在住・長距離ドライブが多い', en: 'Minnesota resident, frequent long-distance driver' },
          { ja: 'ワシントン州在住・毎日通勤・視認性への関心が高い', en: 'Washington state resident, daily commuter, high interest in visibility' },
          { ja: 'テキサス在住・家族との週末利用', en: 'Texas resident, weekend family use' },
        ],
        correctIndex: 2,
        explanation: { ja: 'ワシントン州（雨が多い）+ 毎日通勤（頻度高い）+ 視認性への関心（明示的ニーズ）の三拍子が揃い、最も訴求が刺さるプロフィールです。', en: 'Washington state (high rain) + daily commuting (high frequency) + visibility interest (explicit need) combine for the most resonant profile.' },
      },
    ],
  },
  {
    productId: 'bz-smart-key',
    whatIsIt: {
      ja: 'プラスサポート用スマートキーは、専用キーでプラスサポートを始動させる機能です。急アクセル時の加速抑制支援、警報・ディスプレイでの注意喚起により、複数のドライバーが安心して車を使える環境をサポートします。',
      en: 'The Plus Support Smart Key activates Plus Support with a dedicated key. Acceleration suppression support during sudden acceleration, plus alert and display notifications, support an environment where multiple drivers can use the vehicle with peace of mind.',
    },
    whyCustomersCare: [
      {
        feature: { ja: '急加速抑制支援', en: 'Sudden acceleration suppression support' },
        value: { ja: 'うっかりミスによるリスク低減を支援', en: 'Support risk reduction from accidental mistakes' },
        experience: { ja: '急いでいるときや不慣れな場面でも、車がサポートしてくれる安心感', en: 'Peace of mind knowing the car provides support even when rushing or in unfamiliar situations.' },
      },
      {
        feature: { ja: '専用キーによる作動', en: 'Dedicated key activation' },
        value: { ja: '必要なドライバーのみサポートを適用できる', en: 'Apply support only for drivers who need it' },
        experience: { ja: '車を家族で共有していても、それぞれの運転スタイルに合わせた設定ができる', en: 'Even when sharing a vehicle with family, settings can be adjusted to each driver\'s style.' },
      },
    ],
    bestFitCustomers: [
      {
        persona: { ja: '安全運転支援に関心の高い方', en: 'Person with high interest in driving support' },
        reason: { ja: '明示的に安全・運転支援への関心を示している方に、具体的な機能として提案できる', en: 'Can be proposed as a concrete function to those who explicitly express interest in safety/driving support.' },
        tags: ['Safety', 'Driving Support'],
      },
      {
        persona: { ja: '複数ドライバーで車を共有する家族', en: 'Family sharing vehicle among multiple drivers' },
        reason: { ja: '専用キーで特定ドライバー向けにサポートを設定できる機能が特に価値を持つ', en: 'The dedicated key to configure support for specific drivers is particularly valuable.' },
        tags: ['Shared Vehicle', 'Family'],
      },
    ],
    customerStory: {
      persona: { ja: 'ミネソタ州在住・配偶者と車を共有・安全性への明示的関心', en: 'Minnesota resident, shares car with spouse, explicitly expressed safety interest' },
      before: { ja: '配偶者と車を共有しているが、運転スタイルが異なり、特に不慣れな状況での急加速が心配だった。', en: 'Shares the car with spouse, but different driving styles caused worry, especially about sudden acceleration in unfamiliar situations.' },
      after: { ja: 'プラスサポート用スマートキーを導入後、「車が支援してくれる安心感がある」と配偶者からも評価。日常の運転がより穏やかになったという仮説事例です。', en: 'After introducing the Plus Support Smart Key, "there\'s a reassuring feeling that the car supports you" was the response from the spouse. Driving became calmer — a hypothetical case.' },
      label: 'Demo / Hypothesis',
    },
    howToSell: {
      opener: { ja: '安全運転のサポートや、車を複数の方で共有していることについて、何かお困りのことはありますか？', en: 'Do you have any concerns about driving support or sharing your vehicle with multiple drivers?' },
      questions: [
        { ja: '運転支援機能への関心や、より安全に運転したいというニーズはありますか？', en: 'Do you have interest in driving assistance features or a need for safer driving?' },
        { ja: '配偶者やご家族と車を共有されていますか？', en: 'Are you sharing the car with your spouse or family?' },
        { ja: '市街地での駐車や交差点での操作に不安を感じることはありますか？', en: 'Do you feel any anxiety about parking in urban areas or intersections?' },
      ],
      suggestedTalk: { ja: '安全運転への関心がある方や、複数ドライバーで共有する場合に、プラスサポート用スマートキーは具体的な安心をご提供できます。急加速の抑制支援や警報機能で、車がドライバーを支援します。\n\n※ 本機能は運転を完全に代替するものではなく、リスク低減を支援する機能です。必ず安全確認を行った上でご使用ください。', en: 'For those with safety driving interest or sharing with multiple drivers, the Plus Support Smart Key provides concrete peace of mind. Acceleration suppression support and alerts mean the car supports the driver.\n\n※ This feature does not replace safe driving. It supports risk reduction. Always perform safety checks when driving.' },
      objectionHandling: [
        {
          objection: { ja: '特に困っていない', en: 'Not particularly concerned' },
          response: { ja: '明示的な困りごとがなくても、車を家族で共有するときや、不慣れな状況での安心感として価値を感じていただけることが多いです。', en: 'Even without an explicit concern, many find value in the peace of mind during shared family use or in unfamiliar driving situations.' },
        },
      ],
    },
    successStory: {
      title: { ja: '複数ドライバー×安全関心への提案効果の仮説事例', en: 'Hypothetical results for proposals to multiple drivers × safety-conscious customers' },
      content: { ja: '安全への関心と車の共有を組み合わせたプロフィールへの提案で、複数アクセサリーの同時購入が多かったという仮説事例です。\n\n年齢のみを根拠に提案した場合は反応が低下することも観察されており、明示的な安全ニーズや共有状況に基づいた訴求が重要です。', en: 'In a hypothetical case, profiles combining safety interest and vehicle sharing showed higher rates of multiple accessory purchases.\n\nNote: Proposals based solely on age showed lower response rates. Proposals grounded in explicit safety needs and shared vehicle context are key.' },
      label: 'Demo / Hypothesis',
    },
    quiz: [
      {
        question: { ja: 'プラスサポート用スマートキーを提案する際に最も重要な顧客情報はどれですか？', en: 'What is the most important customer information when proposing the Plus Support Smart Key?' },
        options: [
          { ja: '顧客の年齢', en: 'Customer\'s age' },
          { ja: '明示的な安全運転への関心、または複数ドライバーでの共有', en: 'Explicit safety driving interest, or sharing with multiple drivers' },
          { ja: '車の購入年数', en: 'Years since vehicle purchase' },
          { ja: '週間走行距離', en: 'Weekly driving distance' },
        ],
        correctIndex: 1,
        explanation: { ja: '年齢のみで提案してはいけません。明示的な安全ニーズや複数ドライバーでの共有という具体的な状況に基づいて提案します。', en: 'Never propose based solely on age. Base proposals on explicit safety needs or the concrete situation of multiple drivers sharing the vehicle.' },
      },
      {
        question: { ja: 'プラスサポート用スマートキーの機能について正しく説明しているのはどれですか？', en: 'Which statement correctly describes the function of the Plus Support Smart Key?' },
        options: [
          { ja: '事故を完全に防止する', en: 'Completely prevents accidents' },
          { ja: '専用キーでプラスサポートを始動し、急加速抑制支援・警報でリスク低減を支援する', en: 'Activates Plus Support with a dedicated key, supports risk reduction through acceleration suppression and alerts' },
          { ja: '自動で安全な速度に制御する自動運転機能', en: 'Autonomous driving function that automatically controls to safe speed' },
          { ja: '緊急ブレーキを自動で作動させる機能', en: 'Function that automatically activates emergency braking' },
        ],
        correctIndex: 1,
        explanation: { ja: 'プラスサポート用スマートキーは「事故を防止」するとは表現しません。急加速抑制支援・警報・ディスプレイ通知で「リスク低減を支援する」機能です。', en: 'Never say the Plus Support Smart Key "prevents accidents." It "supports risk reduction" through acceleration suppression, alerts, and display notifications.' },
      },
      {
        question: { ja: 'このお客様への提案で注意すべきことはどれですか？「Robert Miller、66歳、ミネソタ州」', en: 'What should you be careful about when proposing to this customer? "Robert Miller, age 66, Minnesota"' },
        options: [
          { ja: '高齢だから安全機能が必要と説明する', en: 'Explain that safety features are needed because of advanced age' },
          { ja: '年齢ではなく、車の共有状況と明示的な安全ニーズを根拠にして提案する', en: 'Base the proposal on shared vehicle situation and explicit safety needs, not age' },
          { ja: '高齢ドライバーは必ずプラスサポートが必要と案内する', en: 'Advise that elderly drivers definitely need Plus Support' },
          { ja: '年齢が高いほどFit Scoreが上がることを説明する', en: 'Explain that higher age increases the Fit Score' },
        ],
        correctIndex: 1,
        explanation: { ja: '年齢のみを根拠に推薦してはいけません。Robert Millerの場合は「配偶者との共有」「明示的な運転支援ニーズ」を根拠にして提案します。', en: 'Never recommend based solely on age. For Robert Miller, base the proposal on "shared vehicle with spouse" and "explicit driving support needs."' },
      },
    ],
  },
];

export const getLearningContent = (productId: string) =>
  learningContent.find(l => l.productId === productId);
