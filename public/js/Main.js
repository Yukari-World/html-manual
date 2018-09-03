/**
 * @fileOverview マニュアル用Java Script
 * @version 1.0.0
 * @since 1.0.0
 */

// Init
const imdWidth = 992;
let bmenuToggle = false;
let bwordDecide = false;

/**
 * ランダムワードマニア
 * @const {string[][]}
 */
const randomWordList = [
	{
		'title': 'SCP-173 - The Sculpture - <b>The Original</b>',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-239 - The Witch Child',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-1048 - Builder Bear',
		'original': 'SCP Foundation',
		'summary': '<h3>SCP-1048 - ビルダー・ベア</h3><h4><b>オブジェクトクラス:</b> <s><span class="object-safe">Safe</span></s> <span class="object-keter">Keter</span></h4>'
	}, {
		'title': 'SCP-1145 - Nagasaki Teddy',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-1264 - Resurrected Wreckage',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-2091 - A Bear and His Granddaughter',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-2295 - The Bear with a Heart of Patchwork',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-2935 - O, Death',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-3000 - Ananteshesha',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-3999 - I Am At The Center of Everything That Happens To Me',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-011-JP - 俺達はスーパーボール',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-030-JP - 石油喰らい',
		'original': 'SCP Foundation',
		'summary': '<h4><b>オブジェクトクラス:</b> <span class="object-keter">Keter</span></h4><p>SCP-030-JPは石油を食事とし爆発的に増える、昆虫類の種である。体長は20cm前後であり、全身を白い毛で覆われ、翅及び目立った触角は持っておらず、また自力での移動能力が非常に低く、枝などに止まることが出来ないほどの小さく、力の弱い脚を持っている。SCP-030-JPは無変態であり、幼虫期からサイズを除いて変わらない姿を持ち、外見は全く別のものであるにもかかわらず、分子系統解析の結果遺伝情報がBombyx mori(カイコガ)と一致することが判明している。</p><p>雌雄同体であり、両性生殖と両性単為生殖の両方を行うことが可能なのに加え、幼形成熟の特徴を持ち、単体であっても3日以内に繁殖が可能で、一度の繁殖で約300個の卵を産む。SCP-030-JPの捕食者が自然界に存在せず、多くの生物に対して不快と思うような味をSCP-030-JPが持っており、死骸は自然分解の速度が極めて遅く、一般的なプラスチック製品のように800度以上の高温で焼却し、適切な処理を行わなければダイオキシン類のガスを発生させる。</p><p>また、石油を食糧としており、一定量の石油・石油加工製品を摂取することでSCP-030-JPはポリエチレンテレフタレートの糸を吐き出す。</p><p>このオブジェクトがKeterの理由は石油、もしくは石油製品を喰らうこと、莫大な繁殖力、自然に減少することがない事であり、万が一石油製品に溢れる一般社会に現れようものなら後は言わずとも結果は見えてくるだろう。</p>'
	}, {
		'title': 'SCP-040-JP - ねこですよろしくおねがいします',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-073-JP - ザリガニ池',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-100-JP - 屋根裏部屋の宇宙',
		'original': 'SCP Foundation',
		'summary': '<h4><b>オブジェクトクラス:</b> <s><span class="object-safe">Safe</span></s> <s><span class="object-euclid">Euclid</span></s> <span class="object-keter">Keter</span></h4>'
	}, {
		'title': 'SCP-133-JP - 栗ティカル・ヒット',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-173-JP - 恐竜 - <b>イミテーション</b>',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-185-JP - 冥曜日',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-413-JP - 13階段',
		'original': 'SCP Foundation',
		'summary': '<h4><b>オブジェクトクラス:</b> <span class="object-safe">Safe</span></h4><p>SCP-413-JPは12段の階段である。13に対して不吉、もしくはその関連の感情を持つ人がその階段を登ると暴露する(SCP-413-JP-A)。<br />暴露した人は階段を数えながら登る様になり、更に数えた結果が必ず13段になるように数える性質を持つ。階段の段数が13より少ない場合は数が9から順に認識できなくなり、多い場合は新たな数字が作られる。<br />更にその新たな数字を聞いた場合、その聞いた人も暴露する(SCP-413-JP-B)。こちらは記憶処理で除去できる。</p>'
	}, {
		'title': 'SCP-439-JP - ホームラン量産法',
		'original': 'SCP Foundation',
		'summary': '<h4><b>オブジェクトクラス:</b> <s><span class="object-euclid">Euclid</span></s> <span class="object-keter">Keter</span></h4><p>SCP-439-JPはSCP-439-JP-a-1～SCP-439-JP-a-10からなる一連の動作である。この動作をを他の動作を挟まずに連続して行った後、ボールを打つことでSCP-439-JPが発動する。SCP-439-JP-aの中には元来から一般的に非紳士的であると見做される動作が含まれており、SCP-439-JP-aに指定される動作の多さも手伝い、野球の歴史の長さから考えるとSCP-439-JPの発生は非常に少なく抑えられている。原理上、クリケットの様に棒とボールを用いた全てのスポーツでSCP-439-JP-aの成立及びSCP-439-JPの発生は起こりえるが、SCP-439-JP-aの多さや、打者の頭部の角度が細かく指定されるなどの複雑さのため野球以外で成立することは極めて稀と考えらる。なお、SCP-439-JP-aが途中で中断された場合や空振りをした場合はSCP-439-JP-a-1からやり直さなければSCP-439-JPは発生しない。</p><p>SCP-439-JPが発生すると打者により打たれたボールは必ず、ボールの重量に比例した距離だけ飛ぶ。この時の打球の飛距離は、概ね、(ボールの重量[kg]*1000)[m]であり、打者の筋力やフォーム、投球速度、バット及びボールの材質の影響は一切受けない。ただし、SCP-439-JP-a-10は「強振すること」であり、バントやバットに当てることに集中した緩い振り方では発生しないため、調査を目的にしない「観戦」程度では強振した結果ホームランになったという極自然な現象にしか見えないが、ハイスピードカメラを用いた解析を行うと、バットとボールの当たり方から考えると物理的に不自然な飛び方をしていることが分かる。</p><p>このSCPが危険な理由は発動条件がボールではなく球体であること、バットを振った時にバットが手から離れた場合でもSCP-439-JPが有効なことである。</p>'
	}, {
		'title': 'SCP-488-JP - 人<span style="color: #FF0000;">狼</span>',
		'original': 'SCP Foundation',
		'summary': '<h4><b style="color: #FF0000;">オブジェクトクラス:</b> <s><span style="color: #FF0000;">Euclid</span></s> Keter</h4><p><span style="color: #FF0000;">SCP-488-JPはタイリクオオカミ(Canis lupus)の一種</span>が突然変異を経て人間の姿を得た生物<span style="color: #FF0000;">である。SCP-488-JPは</span>文献の<span style="color: #FF0000;">情報</span>によると強力な現実<span style="color: #FF0000;">改変能力を備えており、自身に関する情報</span>の作成者<span style="color: #FF0000;">を</span>現実<span style="color: #FF0000;">改変</span>能力を使用して無惨に殺害<span style="color: #FF0000;">する。あらゆる情報媒体のうち、文書/音声/肉声</span>/画像/動画/その他すべて<span style="color: #FF0000;">が情報として見做され</span>、不幸にもSCP-488-JPの殺害対象にな<span style="color: #FF0000;">る。</span>SCP-488-JPの現実<span style="color: #FF0000;">改変</span>能力を使用<span style="color: #FF0000;">された</span>人間の<span style="color: #FF0000;">情報は</span>明文化する事すら憚られ、SCP-488-JPが<span style="color: #FF0000;">客観的な視点</span>から見ても倫理観<span style="color: #FF0000;">に欠け</span>た<span style="color: #FF0000;">、"凶暴で残酷な人狼"であることを示す。</span></p><p><span style="color: #FF0000;">改変された文書を赤色に着色する試みはデータの更なる改変を招き</span>、有効な手段とは判断され<span style="color: #FF0000;">ませんでした。詳細な経緯は研究ログ488-█"イヌ科生物の色覚と書体ごとの改変傾向の関係性"を参照。</span></p>'
	}, {
		'title': 'SCP-548-JP - 歌う雨音',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-989-JP - ふコウノトリ大作戦',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-1045-JP - お眼鏡にはかなわない',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-1176-JP - 食糧危機の救世主',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-1973-JP - メアリー・スーの怪物',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-014-JP-EX - 君のその顔が見たくて',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-014-JP-J - 『奈落の悪鬼、黒き翼の堕天使アイスヴァイン』',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': 'SCP-040-JP-J - ねこですよろしくおねがいしま<b>せん</b>',
		'original': 'SCP Foundation',
		'summary': '<h4>オブジェクトクラス: <s><span class="object-safe">Safe</span></s> Thaumiel</h4><p>『SCP-040-JP - ねこですよろしくおねがいします』が元のジョークオブジェクト。</p>'
	}, {
		'title': 'SCP-710-JP-J - 財団神拳',
		'original': 'SCP Foundation',
		'summary': '<h4><b>オブジェクトクラス:</b> Achoo!</h4><p>この時点で色々おかしいのだが、内容は実際に見たほうが早い。</p>'
	}, {
		'title': 'SCP-1210-JP-J - キメラれねぇ',
		'original': 'SCP Foundation',
		'summary': '<h4><b>オブジェクトクラス:</b> <span class="object-euclid">Euclid</span></h4><p>画像なしでは説明できない。そんなジョークオブジェクト。</p>'
	}, {
		'title': 'SCP-ZZZ-JP-J - 暁を覚えず',
		'original': 'SCP Foundation',
		'summary': '<h4><b>オブジェクトクラス:</b> <span class="object-unclass">Okiter</span></h4><p>睡眠不足をネタにしたジョークオブジェクト。</p>'
	}, {
		'title': '<span title="SCP-682">???</span>「(D-085を攻撃しながら)…奴らは…忌まわしい…」',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': '<span title="スカイリム衛兵">???</span>「I was once an adventurer like you;then I took an arrow in the knee.」',
		'original': 'The Elder Scrolls V: Skyrim',
		'summary': '<p>「昔はお前のような冒険者だったのだが、膝に矢を受けてしまってな…」の英語版。</p>'
	}, {
		'title': '<span title="インタビュアー">???</span>「あなたはSCP-ZZZ-JP-Jの影響を受けていると考えられます。ご存じですか」',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': '<span title="神崎蘭子">???</span>「異郷の地…神聖言語が飛び交っているわ…(外国語、カッコいい!)」',
		'original': 'アイドルマスター シンデレラガールズ スターライトステージ',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': '<span title="ビィ">???</span>「オイラはトカゲじゃねぇ!」',
		'original': 'グランブルーファンタジー',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': '<span title="トム･マールヴォロ･リドル">???</span>「お辞儀をするのだ!!」',
		'original': 'ハリー・ポッターと炎のゴブレット',
		'summary': '<p>トム･マールヴォロ･リドルことヴォルデモート卿がハリー･ポッターに決闘を仕掛ける時に言った発言。名前を言ってはいけないあの人とまで恐れられている彼が言うにしては余りにも似合わないがためにネタにされている。</p>'
	}, {
		'title': '<span title="森久保乃々">???</span>「おはようございます…帰っていいですか?」',
		'original': 'アイドルマスター シンデレラガールズ スターライトステージ',
		'summary': '<p>森久保乃々の朝の挨拶。アイドルとして参加するのは1度きりの予定がはっきりと物言わない性格故に引っ張られ続けている。尚帰っては駄目な模様。</p>'
	}, {
		'title': '<span title="神崎蘭子">???</span>「神よ…我はそなたに、別れを告げに来た!(お祈りしますね)」',
		'original': 'アイドルマスター シンデレラガールズ スターライトステージ',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': '<span title="SCP-011-JP-B達">???</span>「俺達はスーパーボールなんだ!だけどメンバーが足りないんだよ!見てくれよこの隙間!あと三人必要なんだ!」',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': '<span title="神崎蘭子">???</span>「ククク……煩わしい太陽ね(おはようございまーす!)」',
		'original': 'アイドルマスター シンデレラガールズ スターライトステージ',
		'summary': '<p>神崎蘭子なりの「おはよう」の挨拶……なのだが、何も知らずに「煩わしい太陽ね」とただ聞いただけでは「おはよう」とは繋がる筈もなく、唯々痛い子にしか見えない。尚彼女の発言は比喩的表現や言い回しが多く、訳がなければ多くは全く理解できないことが多い(事実100人以上いる登場人物の中で彼女の言葉を理解している人は少ない)。</p>'
	}, {
		'title': '<span title="神崎蘭子">???</span>「絢爛なる神の調べ……堕天使たる我には、今は遠き日々。再び訪れるのはいつの日か……せめて、別れを惜しもうぞ(大聖堂、綺麗だなぁー。記念に、ちゃんとお祈りしとこっと♪)」',
		'original': 'アイドルマスター シンデレラガールズ スターライトステージ',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': '<span title="神崎蘭子">???</span>「こ、小癪な!(遊ばないでよ～!)」',
		'original': 'アイドルマスター シンデレラガールズ スターライトステージ',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': '<span title="SCP-1000-JP">???</span>「ここはこんなにもすばらしい。」',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': '<span title="神崎蘭子">???</span>「言の葉は不得手、秘めたる真意を伝える秘術はないものか……(しゃべるのは苦手です。気持ちを伝える方法はないでしょうか)」',
		'original': 'ニコニコ大百科',
		'summary': '<p>神崎蘭子の難解な言葉の数々、出身が熊本ということもあり誰が言い始めたのか熊本弁とまで呼ばれている(公式認識済み)。</p>'
	}, {
		'title': '<span title="█████博士">???</span>「このSCPの性質のため、多岐にわたる実験データが役に立つだろう。ギアーズ博士は研究者自身または監督者がLevel3以上の研究者であるならば、自由に非生物実験を行なう許可を与えた。全ての実験はファイル#914-E(実験記録914)に記録されている。生物実験を実施するときは05指導部に事前に許可を得る必要がある。生きていない平凡な物に対して試してみたい者は、自由にデータを集めて欲しい。」',
		'original': 'SCP Foundation',
		'summary': '<p>だからといって死体を入れるではない。</p>'
	}, {
		'title': '<span title="Carver博士">???</span>「これはジョークではない。SCP-1048が持つ力の全容が解明されたわけではないのだ。いまいましいアレがこれまでどれだけ生み出されたのか、だれがわかるんだ?」',
		'original': 'SCP Foundation',
		'summary': '<p>SCP-1048は現在収容されておらず、また、SCP-1048は人間の耳や胎児からテディベアに似た人形を作るということをしたため、トラウマのあまりサイト24ではテディベアの人形の持ち込みを禁止されている。また、SCP-1048により作られた人形は非常に攻撃的なのもタチが悪い原因の一つ。</p>'
	}, {
		'title': '<span title="ジーン博士">???</span>「さっきから君が1973-JPについていかに素晴らしいかを聞かせてくれたが、その人柄というものが全く見えてこないんだ。」',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': '<span title="神崎蘭子">???</span>「祝杯を挙げようぞ。今宵は征服の夜!(楽しいお仕事、ありがとう!)」',
		'original': 'アイドルマスター シンデレラガールズ スターライトステージ',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': '<span title="森久保乃々">???</span>「そんなのー…むーりぃー…」',
		'original': 'アイドルマスター シンデレラガールズ スターライトステージ',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': '<span title="神崎蘭子">???</span>「魂が…ヴァルハラへと旅立ったようね(もしもーし、起きてますか～?)」',
		'original': 'アイドルマスター シンデレラガールズ スターライトステージ',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': '<span title="D-13284">???</span>「どうしてこんなクッソ長い階段が13段なんだよ!おかしいだろ!」',
		'original': 'SCP Foundation',
		'summary': '<p>SCP-413-JP-AとなったD-13284の発言。100段の階段を登らせたのだが、SCP-413-JPは暴露した人は階段を数えながら登る様になり、更に数えた結果が必ず13段になるように数える性質を持つ。階段の段数が13より少ない場合は数が9から順に認識できなくなり、多い場合は新たな数字が作られる。結果として登ったのは100段なのだが、この性質により数えた結果は13段であるというSCP-413-JP-Aにとって不可解な現象であった。</p>'
	}, {
		'title': '<span title="神崎蘭子">???</span>「ハーッハッハッハ、躍動の時はこれからよ!(遅くまで、お疲れ様です)」',
		'original': 'アイドルマスター シンデレラガールズ スターライトステージ',
		'summary': '<p>高笑いそのものは悪役のそれ。しかし内容は訳がなければ理解できないことが多い。</p>'
	}, {
		'title': '<span title="神崎蘭子">???</span>「日時計が、新たな贄をと囁いている…(お昼ご飯、もう食べました?)」',
		'original': 'アイドルマスター シンデレラガールズ スターライトステージ',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': '<span title="森久保乃々">???</span>「人は何を考えているのかわからない…そう思いません?」',
		'original': 'アイドルマスター シンデレラガールズ スターライトステージ',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': '<span title="エージェント･カナヘビ">???</span>「へー。でも特別な存在に対してドイツの豚の塩漬けの名前を付けるのってなんでなんや」',
		'original': 'SCP Foundation',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': '<span title="神崎蘭子">???</span>「誇り高き真紅の魔剣よ!(人の生き血をすする…設定は怖いからボツ)」',
		'original': 'アイドルマスター シンデレラガールズ スターライトステージ',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': '<span title="スカイリム衛兵">???</span>「昔はお前のような冒険者だったのだが、膝に矢を受けてしまってな…」',
		'original': 'The Elder Scrolls V: Skyrim',
		'summary': '<p>スカイリム衛兵が喋る冒険者を引退した理由……なのだが、衛兵共通の会話パターンという括りにこのワードが入っているがために、スカイリム衛兵は皆引退理由が膝に矢を受けてしまい引退したという5シリーズも続く壮大な世界観の割にシュールな事態となってしまっている。当然国内外問わずネタとなっておりこの言葉を元にした派生も多く存在する。<br />尚、実際の発言内容は「昔はお前みたいな冒険者だった。膝に矢を受けてしまって…」である。</p>'
	}, {
		'title': '<span title="森久保乃々">???</span>「もうむーりぃー……。えっ?まだやるんですか…?」',
		'original': 'アイドルマスター シンデレラガールズ スターライトステージ',
		'summary': '<p>Please Wait...</p>'
	}, {
		'title': '<span title="神崎蘭子">???</span>「闇に飲まれよ!(お疲れ様です!)」',
		'original': 'アイドルマスター シンデレラガールズ スターライトステージ',
		'summary': '<p>神崎蘭子なりの「お疲れ様です」の挨拶……なのだが、何も知らずに「闇に飲まれよ!」とただ聞いただけでは「お疲れ様です」とは繋がる筈もなく、また、それに繋がるワードが一つもないため、彼女の性格を知らない人には唯々痛い子にしか見えない。</p>'
	}, {
		'title': 'Fus, Ro, Dah',
		'original': 'The Elder Scrolls V: Skyrim',
		'summary': '<p>スカイリムのドラゴンシャウト『揺るぎ無き力』のワード。「力」、「均衡」、「押す」の3つで成り立ち、相手を吹き飛ばす強力なシャウトとなる。尚、シャウトを覚えるだけでも十数年もの修行が必要となる。その例外はドラゴンの血が通っているドラゴンボーン、今作の主人公である。</p>'
	}, {
		'title': 'あかしけ　やなげ　緋色の鳥よ　くさはみ　ねはみ　けをのばせ',
		'original': 'SCP Foundation',
		'summary': '<p>SCP-444-JPのトリガーオブジェクト。この文字を読み上げると緋色の荒野にて緋色の鳥に食べられる夢を無限に見ることとなる。脱出方法は上記の文字を何らかの媒体に書き出すこと。故に拡散力が高く、これが後に大規模な収容違反へと繋がる事となる。</p>'
	}, {
		'title': 'ごらんの有様だよ!!!',
		'original': '魔法少女アイ',
		'summary': '<p>『魔法少女アイ』のパッケージ裏のフレーズ。完成度など様々な問題もあり、そしてこのフレーズ故に自虐ネタとして扱われている。</p>'
	}, {
		'title': 'さようなら、いままで魚をありがとう',
		'original': '銀河ヒッチハイクガイド(The Hitchhiker\'s Guide to the Galaxy)',
		'summary': '<p>『銀河ヒッチハイクガイド(The Hitchhiker"s Guide to the Galaxy)』の続篇2作目のタイトル。英題は『So Long, and Thanks for All the Fish』。『銀河ヒッチハイクガイド』自体各方面において多大な影響を与えており、様々な作品でネタとして引用されていたりする。</p>'
	}, {
		'title': '生命、宇宙、そして万物についての究極の疑問の答え',
		'original': '銀河ヒッチハイクガイド(The Hitchhiker\'s Guide to the Galaxy)',
		'summary': '<p style="font-size: 42px;">42</p>'
	}, {
		'title': '静寂の恐怖が息を潜める',
		'original': '夢見館の物語',
		'summary': '<p>メガCDのアドベンチャーゲーム『夢見館の物語』のキャッチコピー。幻想的な雰囲気は 多くのユーザーを引き付け、今でも根強いファンが存在する知る人ぞ知る名作。クリアまでの総プレイ時間は短め。</p>'
	}, {
		'title': 'ねこでした',
		'original': 'SCP Foundation',
		'summary': '<p>よろしくおねがいします</p>'
	}
];
// let randomWordList;
let xorRand;

/**
 * Xor Shift乱数
 *
 * @type {class}
 * @since   1.1.0
 * @version 1.2.0
 */
class xorShift {
	/**
	 * コンストラクタメソッド
	 * @constructor
	 * @param {number} w Seed Number
	 */
	constructor(w = Math.floor(Date.now() / 1000)) {
		let dateTemp = new Date();
		/**
		 * 乱数 X
		 *
		 * 値は以下の何れかから大きい値を選択
		 * <ul>
		 * <li>Day ^ Month / 2</li>
		 * <li>Month * Day * max(Seconds, 5) * max(Minites, 3)</li>
		 * </ul>
		 * @type {number}
		 */
		this.x = Math.max(Math.floor(dateTemp.getDay() ** (dateTemp.getMonth() / 2)), dateTemp.getMonth() * dateTemp.getDay() * Math.max(dateTemp.getSeconds(), 5) * Math.max(dateTemp.getMinutes(), 3)); // 123456789

		/**
		 * 乱数 Y
		 *
		 * max(Seconds, 5) ^ floor(max(Minites, 10) / 10) + max(Seconds, 1) * max(Minites, 1) * floor(Year / 10)
		 * @type {number}
		 */
		this.y = Math.max(Math.max(dateTemp.getSeconds(), 5) ** Math.floor(Math.max(dateTemp.getMinutes(), 10) / 10) + Math.max(dateTemp.getSeconds(), 1) * Math.max(dateTemp.getMinutes(), 1) * Math.floor(dateTemp.getFullYear() / 10)); // 362436069

		/**
		 * 乱数 Z
		 *
		 * randomWordList.length + (配列randomWordListの2, 3, 5, 7 の文字列の文字数の和) * (配列randomWordListの11, 13, 17, 19 の文字列の文字数の和) * (配列randomWordListの23, 29 の文字列の文字数の和) * (配列randomWordListの31, 37 の文字列の文字数の和)
		 * @type {number}
		 */
		this.z = randomWordList.length + (randomWordList[2].summary.length + randomWordList[3].summary.length + randomWordList[5].summary.length + randomWordList[7].summary.length) * (randomWordList[11].summary.length + randomWordList[13].summary.length + randomWordList[17].summary.length + randomWordList[19].summary.length) * (randomWordList[23].summary.length + randomWordList[29].summary.length) * (randomWordList[31].summary.length + randomWordList[37].summary.length); // 521288629;

		/**
		 * 乱数 W
		 *
		 * デフォルト初期値は現在の時間の1970/01/01 00:00:00からの秒数
		 * @type {number}
		 */
		this.w = w;
		console.log('Number X: ' + this.x);
		console.log('Number Y: ' + this.y);
		console.log('Number Z: ' + this.z);
		console.log('Number W: ' + this.w);
	}

	/**
	 * 乱数の生成
	 * @return {number} 乱数の結果
	 */
	randomInt32() {
		let t = this.x ^ this.x << 11;
		this.x = this.y;
		this.y = this.z;
		this.z = this.w;
		this.w = this.w ^ this.w >>> 19 ^ (t ^ t >>> 8);

		// console.log('Number: ' + this.w);
		return this.w;
	}

	/**
	 * 浮動少数の乱数の生成
	 * @return {number} 乱数の結果
	 */
	randomFloat() {
		let randNumber = this.randomInt32();
		if (randNumber < 0) {
			randNumber = ~randNumber;
		}
		return randNumber / (2 ** 31 - 1);
	}
}

/**
 * HTTPステータスコードの確認
 *
 * @param  {Response}       response    レスポンスデータ
 * @return {Response|Error}             HTTPステータスコードが200番台ならレスポンスデータ、そうでなければエラー
 * @since   1.2.0
 * @version 1.2.0
 */
function checkStatus(response) {
	// HTTPステータスコードが200番台ではない場合
	// 類似方法にresponse.okがあるが大部分のブラウザが非対応なので非推奨
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		let error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
}

/**
 * JSONデータの切り出し
 *
 * @param  {Response}   response    レスポンスデータ
 * @return {JSON}                   レスポンスに格納されているJSONデータ
 * @since   1.2.0
 * @version 1.2.0
 */
function parseJSON(response) {
	// console.log(response);
	return response.json();
}

/**
 * Ajax転送処理
 *
 * @param       {string}                        sendURL 転送先URL
 * @param       {FormData}                      form    転送するForm Data
 * @return      {Promise.JSON|Promise.Error}            JSONデータもしくはエラー内容
 * @since   1.2.0
 * @version 1.2.0
 */
function SendAjax(sendURL, form) {
	return new Promise((resolve, reject) => {
		fetch(sendURL, {
			method: 'POST',
			body: form
		})
			.then(checkStatus)
			.then(parseJSON)
			.then(function (json) {
				resolve(json);
			})
			.catch(function (error) {
				reject(error);
			});
	});
}

/**
 * ランダムワード取得
 *
 * @return {Promise}    終了コード
 * @since   1.2.0
 * @version 1.2.0
 */
function getrandomWord() {
	return new Promise((resolve, reject) => {
		let fd = new FormData();

		SendAjax('json/randomWord.json', fd)
			.then(function (json) {
				// console.log(json);
				resolve(json);
			})
			.catch(function (error) {
				console.error('request failed', error);
				// document.getElementById('errors').appendChild(document.createTextNode(event.toString));
				reject(error);
			});
	});
}

/**
 * 指定時間毎に実行する
 *
 * @param {number} seconds 時間
 * @return {void}
 * @version 1.2.0
 * @since 1.0.0
 */
function secondsInterval(seconds = 5) {
	let bdate = new Date();
	if (bdate.getSeconds() % seconds === 0 && bwordDecide === false) {
		bwordDecide = true;
		setrandomWord();
	} else if (bdate.getSeconds() % seconds === 1 && bwordDecide === true) {
		bwordDecide = false;
	}
}

/**
 * ランダムワードの解説を出力
 *
 * @interface
 * @param  {JSON}   jsonData    JSON Data
 * @return {void}
 * @version 1.2.0
 * @since 1.0.0
 */
function randomOutput(jsonData) {
	// Init
	const textRandom = document.getElementById('randomOutput');
	textRandom.innerHTML = '';
	let dl = document.createElement('dl');
	for (let data_t of jsonData) {
		let dt = document.createElement('dt');
		let dd = document.createElement('dd');

		dt.innerHTML = '<h3>' + data_t.title + '</h3><h4>出典: ' + data_t.original + '</h4>';
		dd.innerHTML = data_t.summary;

		dl.appendChild(dt);
		dl.appendChild(dd);
	}
	textRandom.appendChild(dl);
}

/**
 * ランダムワードの出力
 *
 * @interface
 * @return {void}
 * @version 1.2.0
 * @since 1.0.0
 */
function setrandomWord() {
	document.getElementById('randomWord').innerHTML = randomWordList[Math.floor(xorRand.randomFloat() * randomWordList.length)].title;
}

window.onresize = function () {
	if (window.innerWidth <= imdWidth && bmenuToggle === false) {
		document.getElementById('menu').setAttribute('style', 'display: none');
	} else if (window.innerWidth > imdWidth || bmenuToggle === true) {
		document.getElementById('menu').removeAttribute('style');
	}
};

/**
 * HTMLの読み込み終了時に行われれる処理
 */
// document.addEventListener('DOMContentLoaded', async function () {
document.addEventListener('DOMContentLoaded', function () {
	// randomWordList = await getrandomWord();
	xorRand = new xorShift();

	if (window.innerWidth <= 992 && bmenuToggle === false) {
		document.getElementById('menu').setAttribute('style', 'display: none');
	} else if (bmenuToggle === true) {
		document.getElementById('menu').removeAttribute('style');
	}

	/**
	 * 現在の個数
	 * @const {Element}
	 */
	const cntRandom = document.getElementById('countRandom');
	if (cntRandom !== null) {
		cntRandom.textContent = randomWordList.length;
	}

	/**
	 * 現在の個数
	 * @const {Element}
	 */
	const textRandom = document.getElementById('randomOutput');
	if (textRandom !== null) {
		randomOutput(randomWordList);
	}

	document.getElementById('menuBtn').addEventListener('click', function () {
		if (!bmenuToggle) {
			bmenuToggle = true;
			document.getElementById('menu').removeAttribute('style');
		} else {
			bmenuToggle = false;
			document.getElementById('menu').setAttribute('style', 'display: none');
		}
	});

	setrandomWord();

	setInterval(function () {
		secondsInterval(10);
	}, 50);
});
