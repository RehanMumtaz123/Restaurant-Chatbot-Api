const router = require("express").Router();
var Jaccard = require("jaccard-index");
var jaccard = Jaccard();

router.get("/health", (req, res) => {
  console.log("server is running fine");
  res.status(200).send("Service is fine");
});

router.post("/detectintent", (req, res) => {
  const historicalMessages = {
    chatLog: [
      {
        utterance: "Hi, Mario's what can I get you?",
        intent: "Greeting",
      },
      {
        utterance: "I'd like to order a pizza for pickup please.",
        intent: "HowCanIHelp",
      },
      {
        utterance: "OK, what would you like to order?",
        intent: "ReadyToReceiveOrder",
      },
      {
        utterance: "I'd like a medium supreme pizza.",
        intent: "OrderItem",
      },
      {
        utterance: "Anything more?",
        intent: "AnyMoreItems",
      },
      {
        utterance: "Also, a garlic bread.",
        intent: "OrderItem",
      },
      {
        utterance: "Is that all?",
        intent: "AnyMoreItems",
      },
      {
        utterance: "Yes, that is all thanks.",
        intent: "EndOfOrder",
      },
      {
        utterance: "OK, your order is a medium supreme and a garlic bread.",
        intent: "ConfirmItem",
      },
      {
        utterance: "Should be ready in about 30 minutes.",
        intent: "DurationBeforePickupAnswer",
      },
      {
        utterance: "Thank you, goodbye.",
        intent: "Goodbye",
      },
      {
        utterance: "OK, your order is a large pizza and garlic bread.",
        intent: "ConfirmItem",
      },
      {
        utterance: "Ready in 30",
        intent: "DurationBeforePickupAnswer",
      },
    ],
  };
  function escape(s) {
    var n = s;
    n = n.replace(/&/g, "&amp;");
    n = n.replace(/</g, "&lt;");
    n = n.replace(/>/g, "&gt;");
    n = n.replace(/"/g, "");
    n = n.replace(/'/g, "");
    n = n.replace(/\?/g, "");
    n = n.replace(/\,/g, "");
    n = n.replace(/\./g, "");

    return n.split(" ");
  }

  const msgItems = {
    item1: [],
    item2: [],
    item3: [],
    item4: [],
    item5: [],
    item6: [],
    item7: [],
    item8: [],
    item9: [],
    item10: [],
    item11: [],
    item12: [],
    item13: [],
  };

  for (var i = 0; i < historicalMessages.chatLog.length; i++) {
    var med = escape(historicalMessages.chatLog[i].utterance);
    //  console.log(med);
    msgItems[`item${i + 1}`].push(med);
    msgItems[`item${i + 1}`].push(historicalMessages.chatLog[i].intent);
  }
  const indexIntent = [];

  const { message } = req.body;

  if (!message) {
    return res.status(422).json({ Error: "All fields need to be filled! " });
  }

  for (var i = 0; i < historicalMessages.chatLog.length; i++) {
    let ed = escape(message);

    var index = jaccard.index(ed, msgItems[`item${i + 1}`][0]);
    console.log(index); // + msgItems[`item${i + 1}`][1])
    indexIntent.push(index);
  }
  const myIntent = indexIntent.indexOf(Math.max(...indexIntent));
  console.log("mu", myIntent);
  console.log(msgItems[`item${myIntent + 1}`][1]);
  // return res.status(200).json({ "Success": message });
  return res.status(200).json({ Output: msgItems[`item${myIntent + 1}`][1] });
});

module.exports = router;
