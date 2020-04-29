const stopWords = ['a',
  'aby',
  'aby',
  'aj',
  'ale',
  'ani',
  'aniž',
  'ano',
  'asi',
  'az',
  'až',
  'bez',
  'bude',
  'budem',
  'budes',
  'budeš',
  'by',
  'byl',
  'byla',
  'byli',
  'bylo',
  'byt',
  'být',
  'ci',
  'či',
  'clanek',
  'článek',
  'clanku',
  'článku',
  'clanky',
  'články',
  'co',
  'coz',
  'což',
  'cz',
  'dalsi',
  'další',
  'dnes',
  'do',
  'email',
  'ho',
  'i',
  'já',
  'jak',
  'jako',
  'je',
  'jeho',
  'jej',
  'jeji',
  'její',
  'jejich',
  'jen',
  'jenž',
  'jeste',
  'ještě',
  'ji',
  'jine',
  'jiné',
  'jiz',
  'již',
  'jsem',
  'jses',
  'jseš',
  'jsme',
  'jsou',
  'jste',
  'jšte',
  'k',
  'kam',
  'každý',
  'kde',
  'kdo',
  'kdyz',
  'když',
  'ke',
  'ktera',
  'která',
  'ktere',
  'které',
  'kteri',
  'kteři',
  'kterou',
  'ktery',
  'který',
  'ku',
  'ma',
  'mate',
  'máte',
  'me',
  'mě',
  'mezi',
  'mi',
  'mit',
  'mít',
  'mně',
  'mnou',
  'muj',
  'můj',
  'muze',
  'může',
  'my',
  'na',
  'ná',
  'nad',
  'nam',
  'nám',
  'napiste',
  'napište',
  'nas',
  'náš',
  'nasi',
  'naši',
  'ne',
  'nebo',
  'nechť',
  'nejsou',
  'neni',
  'není',
  'nez',
  'než',
  'ní',
  'nic',
  'nove',
  'nové',
  'novy',
  'nový',
  'o',
  'od',
  'ode',
  'on',
  'pak',
  'po',
  'pod',
  'podle',
  'pokud',
  'pouze',
  'prave',
  'práve',
  'pred',
  'před',
  'přede',
  'pres',
  'přes',
  'pri',
  'při',
  'pro',
  'proc',
  'proč',
  'proto',
  'protoze',
  'protože',
  'prvni',
  'první',
  'pta',
  're',
  's',
  'se',
  'si',
  'sice',
  'strana',
  'sve',
  'své',
  'svůj',
  'svych',
  'svých',
  'svym',
  'svým',
  'svymi',
  'svými',
  'ta',
  'tak',
  'take',
  'také',
  'takze',
  'takže',
  'tato',
  'te',
  'tě',
  'tedy',
  'tema',
  'těma',
  'ten',
  'tento',
  'teto',
  'této',
  'tim',
  'tím',
  'timto',
  'tímto',
  'tipy',
  'to',
  'tohle',
  'toho',
  'tohoto',
  'tom',
  'tomto',
  'tomuto',
  'toto',
  'tu',
  'tuto',
  'tvůj',
  'ty',
  'tyto',
  'u',
  'uz',
  'už',
  'v',
  'vam',
  'vám',
  'vas',
  'váš',
  'vase',
  'vaše',
  've',
  'vice',
  'více',
  'vsak',
  'však',
  'všechen',
  'vy',
  'z',
  'za',
  'zda',
  'zde',
  'že',
  'ze',
  'zpet',
  'zpět',
  'zpravy',
  'zprávy',
  'česky',
  'úmyslem',
  'mého',
  'ročníkového',
  'projektu',
  'bylo',
  'ročníková',
  'práce'
]

function extractKeywords(text, callback) {
  getText(text, result => {
    var wordArray = result.split(/\s+/);
    wordArray = wordArray.map(x => x.toLowerCase().replace(/[\(,\)]/, ''));
    let i;
    let sequence = [];
    let sequences = [];
    //creating sequences of words based on phrase separators
    for (i = 0; i < wordArray.length; i++) {
      if (wordArray[i].includes(':') || wordArray[i].includes(';') || wordArray[i].includes(',') || wordArray[i].includes('.')) {
        let nword = wordArray[i].substring(0, wordArray[i].length - 1);
        if (stopWords.includes(nword) || nword.match(/\d/)) {
          sequences.push(sequence);
          sequence = [];
        } else {
          sequence.push(nword);
          sequences.push(sequence);
          sequence = [];
        }
      } else {
        if (stopWords.includes(wordArray[i]) || wordArray[i].match(/\d/)) {
          sequences.push(sequence);
          sequence = [];
        } else {
          sequence.push(wordArray[i]);
        }
      }
    }
    wordlist = []; 
    var rateSet = {};
    //removing numbers and cleaning up words
    for(i = 0; i< wordArray.length; i++){
      if(wordArray[i] && !wordArray[i].match(/\d/)){
        wordlist.push(wordArray[i].replace(/[\.,\,,\(,\)]/,''));
      }
    }
    //counting frequencies of words
    for(i=0; i< wordlist.length;i++){
      let word = wordlist[i];
      if(!(word in rateSet) && !stopWords.includes(word)){
        rateSet[word] = {};
        let j;
        for(j = 0; j<wordlist.length; j++){
          if(!stopWords.includes(wordlist[j])){
            if(word!=wordlist[j]){
              rateSet[word][wordlist[j]] = 0;
            } else {
              rateSet[word][word] = 1;
            }
          }
        }
      } else {
        if(!stopWords.includes(word)){
          rateSet[word][word] += 1;
        }
      }
    }
    //removing empty sequences
    sequences = sequences.filter((x) => { return x.length});
    //counting degree of words (appearance in sequences)
    for(i = 0; i<sequences.length; i++){
      let j;
      let arr = sequences[i];
      for(j = 0; j<arr.length; j++){
        let k;
        for(k = 0; k<arr.length; k++){
          if(k!=j){
          if(rateSet[arr[j]]){
            rateSet[arr[j]][arr[k]] += 1;
          }
          }
        }
      }
    }
    wordScores = {};
    const keys = Object.keys(rateSet);
    //counting word scores
    for(const key of keys){
      const entries = Object.entries(rateSet[key])
      var deg = 0;
      var freq = 0;
      var j;
      for(j = 0; j< entries.length; j++){
        deg += entries[j][1];
        if(entries[j][0]==key){
          freq += entries[j][1];
        }
      }
      wordScores[key] = deg/freq;
      deg = 0;
      freq = 0;
    }
    //counting sequence scores
    for(i = 0; i< sequences.length; i++){
      let score = 0;
      let j;
      for(j = 0; j< sequences[i].length; j++){
        score += wordScores[sequences[i][j]];
      }
      sequences[i].push(score);
      score = 0;
    }
    sequences = sequences.filter((x) => { return !isNaN(x[x.length-1])});
    sequences.sort((a,b) => { 
      return b[b.length-1] - a[a.length-1];
    })
    keywords = [];
    while(keywords.length<4){
      var arr = sequences.shift();
      if(!isNaN(arr[arr.length-1])){
        arr.pop();
        keywords.push(arr);
      }
    }
    console.log(keywords);
    callback(keywords);
  });
}

function getText(text, callback){
  let lines = text.split('\n');
  let result = '';
  let i;
  for(i = 1; i < lines.length; i++){
    if(lines[i-1].toLowerCase().match(/anotace/) && lines[i-1].length<=10){
      while(lines[i+1] && !lines[i+1].match(/(^\d\.)/)){
        result=result.concat(lines[i]+'\n');
        i++;
      }
      result=result.concat(lines[i]+'\n');
    }
  }
  callback(result);
}
module.exports = extractKeywords;