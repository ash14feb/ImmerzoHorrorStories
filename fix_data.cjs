const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data.json', 'utf8'));

const durations = {
  "x9wge3ygbor53rsy2aa9ohyd06f1bxu5": 160050,
  "qdchxeg6we9zcdx3iakslmw63w3kf73o": 170965,
  "ddhhic7njmfr26upyx69dw1riocc47fg": 162024,
  "t3lkbu3c4skahd5ytpimwbalycqri7gk": 225983,
  "vnqpgpr2i0w8l2ls1y132woqrsvetxw7": 191483,
  "zo8joawr1qnhtlm4oxye1c3ms8ktny23": 185833,
  "kjcplxuodmh3j2ffrti6q6oio95itbgp": 192048,
  "499zn3i2zhnowj76yd0psfya9scze8up": 169217,
  "llzz6p26cgpfnq560x5kvjb4fnps87f2": 328917,
  "nffpk2x7dmrpesmcro25evfe4x6s4my0": 181900,
  "k24d4ihgsl12ebci3pwfeoidtdhxjcfq": 169900,
  "ili92m1i3ltzoi7imjhbvq5nmpkyc16i": 39100,
  "6ezlbmlzdo34vv10yxoy0znoy7hbviui": 186750,
  "fmook2v3ze0zrya6cch5morozkkquzpa": 157896,
  "d4vzdievld1pd040rb0uhr5ot7ty9fqm": 154417,
  "4m9h2n5ye42jh965xhhvbw6o114dvvkj": 158617,
  "w17hbk1qzu3yh1u5hevsxz6dkqn3u7p5": 113053,
  "4gf8o7ishtt7ehu0izig8zkunpzcpkpk": 168883,
  "0ps471tdqvkj9n0efd5nau4dp4v17dsu": 213624,
  "iex2xtebo5rdkw2uq2lghhol1f2aagp0": 67285,
  "qtw6m75c85xh6ohhqck4o12zzhf5lp6w": 103368,
  "3b6fm9n33j8bu5zvvh81x3bpk2t3fm2q": 153349,
  "ftcgcpvshbgckh2u1xux5pp6539co4p5": 162085,
  "jhnjilvbrjrvxn3sf12c0fmicicdp3ze": 165277
};

data.Video = data.Video.map(v => ({
  ...v,
  Duration: durations[v.Id]
}));

fs.writeFileSync('src/data.json', JSON.stringify(data, null, 2));
console.log("data.json updated successfully");
