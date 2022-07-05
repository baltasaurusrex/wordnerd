import Fuse from "fuse.js";
import { connectMongoDB } from "../../utils/mongoose.js";
// import Phrase from "../../models/Phrase.js";

const data = [
  {
    _id: {
      $oid: "61081b329ac9440022c8515d",
    },
    author: "",
    description: "People of the same background have the same behavior",
    title: "Dogs of the same street bark alike.",
  },
  {
    _id: {
      $oid: "60ced8ec5a6e057a14a3ff9c",
    },
    author: "",
    description: "to procrastinate on a task",
    title: "kicking the can",
  },
  {
    _id: {
      $oid: "61081aa39ac9440022c85147",
    },
    author: "",
    description:
      "people of the same sort or with the same tastes and interests will be found together",
    title: "Birds of a feather flock together",
  },
  {
    _id: {
      $oid: "61081c409ac9440022c8518a",
    },
    author: "",
    description:
      "Quality people of integrity find other quality people of integrity and vice versa (low quality finds low quality).",
    title: "Water seeks its own level",
  },
  {
    _id: {
      $oid: "611be30f1e28df00232c893d",
    },
    author: "",
    description:
      "used to express someone's intention to complete an enterprise once it has been undertaken, however much time, effort, or money this entails.",
    title: "In for a penny, in for a pound",
  },
  {
    _id: {
      $oid: "60ced9895a6e057a14a3ffc2",
    },
    author: "",
    description: "be deliberately slow or reluctant to act",
    title: "drag ones feet",
  },
  {
    _id: {
      $oid: "60f3f0a63ef9b05be0994bb3",
    },
    author: "Franklin D. Roosevelt",
    description: "",
    title: "A smooth sea never made a skilled sailor.",
  },
  {
    _id: {
      $oid: "60ed83cf579ade11ff0169d4",
    },
    author: "",
    description: "test",
    title: "my first phrase",
  },
  {
    _id: {
      $oid: "60db26e31dc33f27b3a89e9d",
    },
    author: "Plato",
    description: "",
    title:
      "Wise men speak because they have something to say. Fools speak because they have to say something.",
  },
  {
    _id: {
      $oid: "60ed24a72c68c901fb036030",
    },
    author: "",
    description:
      "If you say that someone is preaching to the choir, you mean that they are presenting an argument or opinion to people who already agree with it.",
    title: "Preaching to the choir",
  },
  {
    _id: {
      $oid: "60ced9515a6e057a14a3ffb2",
    },
    author: "",
    description: "to wait before doing something or to do something slowly",
    title: "let the grass grow beneath your feet",
  },
  {
    _id: {
      $oid: "60ced9f95a6e057a14a3fff6",
    },
    author: "",
    description:
      "to delay or prevent the progress of (something) by acting in a deliberately slow manner",
    title: "slow walk",
  },
  {
    _id: {
      $oid: "611be7761e28df00232c8a2d",
    },
    author: "",
    description: "very similar to each other",
    title: "Cut from the same cloth",
  },
  {
    _id: {
      $oid: "60f3f4983ef9b05be0994bbe",
    },
    author: "C.S. Lewis",
    description: "",
    title:
      "“Hardships often prepare ordinary people for an extraordinary destiny.”",
  },
  {
    _id: {
      $oid: "60db274d1dc33f27b3a89ea9",
    },
    author: "",
    description: "One who lacks substance boasts loudest.",
    title: "An empty can rattles the most",
  },
  {
    _id: {
      $oid: "60f3fb673ef9b05be0994be8",
    },
    author: "Dolly Parton",
    description: "",
    title: "Storms make trees take deeper roots.",
  },
  {
    _id: {
      $oid: "611e5072b548310023bcf760",
    },
    author: "Confucius",
    description: "",
    title:
      "We have two lives, and the second begins when we realize we only have one.",
  },
  {
    _id: {
      $oid: "61266481392d1f00236830f1",
    },
    author: "Seneca the Younger",
    description: "",
    title: "There is no easy way from the earth to the stars",
  },
  {
    _id: {
      $oid: "612b4def08a3620023c1f069",
    },
    author: "Zeno",
    description: "",
    title: "Better to trip with the feet than with the tongue",
  },
  {
    _id: {
      $oid: "612cea09b7882f0023f68bd7",
    },
    author: "",
    description:
      "To do something that risks causing one harm, damage, or misfortune; to do something dangerous.",
    title: "Playing with fire",
  },
  {
    _id: {
      $oid: "612f81ed42c7640023c89370",
    },
    author: "Abraham Lincoln",
    description: "",
    title:
      "Give me six hours to chop down a tree and I will spend the first four sharpening the axe.",
  },
  {
    _id: {
      $oid: "6130c1db56eb8e00231727be",
    },
    author: "George Santayana",
    description: "",
    title: "The wisest mind has something yet to learn",
  },
  {
    _id: {
      $oid: "6130c26656eb8e00231727e6",
    },
    author: "Rosa Parks",
    description: "",
    title:
      "Memories of our lives, of our works, and our deeds will continue in others.",
  },
  {
    _id: {
      $oid: "6130c29556eb8e002317280d",
    },
    author: "Miguel De Cervantes",
    description: "",
    title: "To be prepared is half the victory",
  },
  {
    _id: {
      $oid: "6130e5700094bb002354dc71",
    },
    author: "Andre Maurois",
    description: "",
    title:
      "To reason with poorly chosen words is like using a pair of scales with inaccurate weights",
  },
  {
    _id: {
      $oid: "6130e91a0094bb002354dd1b",
    },
    author: "Grace Hopper",
    description: "",
    title:
      "The most damaging phrase in a language is “We’ve always done it this way”",
  },
  {
    _id: {
      $oid: "61317ddb330f6e002318cf17",
    },
    author: "St. Catherine of Siena",
    description: "",
    title: "Be who you were created to be, and you will set the world on fire",
  },
  {
    _id: {
      $oid: "61317e61330f6e002318cf3e",
    },
    author: "Steve Jobs",
    description: "",
    title: "The only way to do great work is to love what you do",
  },
  {
    _id: {
      $oid: "61317f53330f6e002318cfa6",
    },
    author: "Sarah Bahn Breathnach",
    description: "",
    title:
      "The world needs dreamers and the world needs doers. But above all, the world needs dreamers who do.",
  },
  {
    _id: {
      $oid: "61317f9e330f6e002318cfd3",
    },
    author: "Henry David Thoreau",
    description: "",
    title:
      "If you have built castles in the air, your work need not be lost, that is where they should be. Now put foundations under them.",
  },
  {
    _id: {
      $oid: "6131e16998eab9002317823e",
    },
    author: "",
    description:
      "used to emphasize that you can make it easy for someone to do something, but you cannot force them to do it",
    title: "You can lead a horse to water, but you can’t make it drink",
  },
  {
    _id: {
      $oid: "61321f8733876d0023893ae6",
    },
    author: "Anonymous",
    description: "",
    title:
      "Were all in the same game, just different levels, dealing with the same hell, just different devils.",
  },
  {
    _id: {
      $oid: "6132601bd558300023c9c347",
    },
    author: "Niels Bohr",
    description: "",
    title:
      "An expert is a man who has made all the mistakes which can be made, in a narrow field.",
  },
  {
    _id: {
      $oid: "613260a1d558300023c9c373",
    },
    author: "Dr Kerr L White",
    description: "",
    title:
      "Good judgment comes from experience, and a lot of that comes from bad judgment.",
  },
  {
    _id: {
      $oid: "6132614bd558300023c9c3b6",
    },
    author: "Richard Branson",
    description: "",
    title:
      "You don’t learn to walk by following rules. You learn by doing, and by falling over.",
  },
  {
    _id: {
      $oid: "6133213cc44ff30023827e8c",
    },
    author: "Mark Twain",
    description: "",
    title:
      "The two most important days of your life are the day you are born and the say you find out why.",
  },
  {
    _id: {
      $oid: "6133223dc44ff30023827eac",
    },
    author: "Confucius",
    description: "",
    title:
      "We have two lives, and the second begins when we realize we only have one.",
  },
  {
    _id: {
      $oid: "6134395ae258b4002324201a",
    },
    author: "",
    description:
      "The expression means to make a difficult decision with irreversible consequences – in short, to pass the point of no return. It refers back to a decision made by Julius Caesar in January 49 BC that changed Ancient Rome forever.",
    title: "Cross the rubicon",
  },
  {
    _id: {
      $oid: "6134840a2607b80023caed38",
    },
    author: "Catherine of Valois",
    description: "",
    title: "All monarchy is illegitimate",
  },
  {
    _id: {
      $oid: "6134844f2607b80023caed58",
    },
    author: "Niccolo Machiavelli",
    description: "",
    title: "The ends justify the means",
  },
  {
    _id: {
      $oid: "6134846f2607b80023caed77",
    },
    author: "Winston Churchill",
    description: "",
    title: "History is written by the victors",
  },
  {
    _id: {
      $oid: "6135eb6ee5b0af002364ee23",
    },
    author: "Confucius",
    description: "",
    title: "The man who moves a mountain begins by carrying away small stones.",
  },
  {
    _id: {
      $oid: "6135ebdae5b0af002364ee49",
    },
    author: "Jim Watkins",
    description: "",
    title:
      "A river cuts through rock, not because of its power, but because of its persistence.",
  },
  {
    _id: {
      $oid: "6135ec35e5b0af002364ee7d",
    },
    author: "",
    description:
      "Large, seemingly impossible tasks can be completed or accomplished through small, steady efforts.",
    title: "Little strokes fell great oaks",
  },
  {
    _id: {
      $oid: "613642645bed4100231c5ca8",
    },
    author: "",
    description:
      "To exchange something of great, important, or fundamental value for some financial gain that proves to be of little, trivial, or no value but which appears to be attractive or valuable on first reckoning. An allusion to Esau in Genesis 25:29–32, who sells to Jacob his birthright to his family's estate for a bowl of lentil stew (pottage).",
    title: "Sell your birthright for a bowl of soup",
  },
  {
    _id: {
      $oid: "6137342b5866390023d6895c",
    },
    author: "",
    description:
      "careful about small amounts of money but not about large amounts —used especially to describe something that is done to save a small amount of money now but that will cost a large amount of money in the future",
    title: "Penny wise, pound foolish",
  },
  {
    _id: {
      $oid: "613734925866390023d68997",
    },
    author: "Albert Einstein",
    description: "",
    title:
      "Great spirits have always encountered violent opposition from mediocre minds. The mediocre mind is incapable of understanding the man who refuses to bow blindly to conventional prejudices and chooses instead to express his opinions courageously and honestly.",
  },
  {
    _id: {
      $oid: "613734c95866390023d689c1",
    },
    author: "Winston Churchill",
    description: "",
    title:
      "You will never reach your destination if you stop and throw stones at every dog that barks.",
  },
  {
    _id: {
      $oid: "61378048544bbe0023718828",
    },
    author: "Cicero",
    description: "",
    title: "More is lost by indecision than wrong decision",
  },
  {
    _id: {
      $oid: "61378123544bbe002371884d",
    },
    author: "Charlotte Bunch",
    description: "",
    title:
      "We do not need, and indeed never will have, all the answers before we act ... It is often through taking action that we can discover some of them",
  },
  {
    _id: {
      $oid: "6137815b544bbe0023718878",
    },
    author: "Napoleon Bonaparte",
    description: "",
    title:
      "Take time to deliberate, but when the time for action has arrived, stop thinking and go in",
  },
  {
    _id: {
      $oid: "613f5b5b7b4b3900230bb379",
    },
    author: "Carl Jung",
    description: "",
    title: "You are what you do, not what you say you’ll do",
  },
  {
    _id: {
      $oid: "613f5b9c7b4b3900230bb3a9",
    },
    author: "Alfred Adler",
    description: "",
    title:
      "Trust only movement. Life happens at the level of events, not of words. Trust movement",
  },
  {
    _id: {
      $oid: "613f5bf17b4b3900230bb3f2",
    },
    author: "Andrew Carnegie",
    description: "",
    title:
      "As I grow older, I pay less attention to what people say. I just watch what they do",
  },
  {
    _id: {
      $oid: "6141f7d0b05745002379252f",
    },
    author: "",
    description:
      "used to emphasize that you can make it easy for someone to do something, but you cannot force them to do it",
    title: "You can lead a horse to water,  but you can’t make him drink",
  },
  {
    _id: {
      $oid: "6141f875b05745002379257e",
    },
    author: "Dale Carnegie",
    description: "",
    title: "Customers like to feel that they are buying—not being sold",
  },
  {
    _id: {
      $oid: "614934debd0f7c0023e52f11",
    },
    author: "",
    description:
      "f you say that something cuts both ways, you mean that it can have two opposite effects, or can have both good and bad effects.",
    title: "It cuts both ways",
  },
  {
    _id: {
      $oid: "6149354dbd0f7c0023e52f48",
    },
    author: "",
    description:
      'The proverb literally means "you cannot simultaneously retain your cake and eat it". Once the cake is eaten, it is gone. It can be used to say that one cannot have two incompatible things, or that one should not try to have more than is reasonable.',
    title: "You can't have your cake and eat it too",
  },
  {
    _id: {
      $oid: "619e0e476f844800230a84e4",
    },
    author: "",
    description:
      "it's easier to stop something from happening in the first place than to repair the damage after it has happened",
    title: "An ounce of prevention is worth a pound of cure",
  },
  {
    _id: {
      $oid: "619e0e6c6f844800230a8513",
    },
    author: "Seneca",
    description: "",
    title:
      "The man who has anticipated the coming of troubles takes away their power when they arrive",
  },
];

export default async (req, res) => {
  try {
    const { query } = req;

    // await connectMongoDB();

    // const phrases = await Phrase.find({});

    console.log(phrases.length);

    const options = {
      includeScore: true,
      keys: ["title"],
    };

    const fuse = new Fuse(data, options);
    let result = fuse.search(query.q);
    result = result.slice(0, 5);
    result = result.map(({ item }) => item.title);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};
