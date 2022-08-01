export default {
  title: 'Quiz',
  items1: {
    id: 1,
    Q: `1. You value this activity at <span>10 ECU</span> and your counteroffer is <span>9 ECU</span>. Are you going to participate in the activity? `,
    A: [
      {
        con: 'Yes',
        res: false
      },
      {
        con: 'No',
        res: true
      }
    ],
    disable: false,
    ansTips: ''
  },
  items2: {
    id: 2,
    Q: `2. You value this activity at <span>25 ECU</span> and your counteroffer is <span>27 ECU</span>. Are you going to participate in the activity? `,
    A: [
      {
        con: 'Yes',
        res: true
      },
      {
        con: 'No',
        res: false
      }
    ],
    disable: false,
    ansTips: ''
  },
  items3: {
    id: 3,
    Q: `1. You value this activity at <span>13 ECU</span> and your counteroffer is <span>11 ECU</span>. Are you going to participate in the activity? `,
    A: [
      {
        con: 'Yes',
        res: false
      },
      {
        con: 'No',
        res: true
      }
    ],
    disable: false,
    ansTips: ''
  },
  items4: {
    id: 4,
    Q: `2. You value this activity at <span>23 ECU</span> and your counteroffer is <span>29 ECU</span>. Are you going to participate in the activity? `,
    A: [
      {
        con: 'Yes',
        res: true
      },
      {
        con: 'No',
        res: false
      }
    ],
    disable: false,
    ansTips: ''
  },
  resTitle: 'QUIZ RESULTS',
  resCon: `<p>Thank you. You pass the quiz. </p>
           <p>Please click the NEXT button to continue.</p>`,
  firstWrong: `<p>Sorry, you did not pass the quiz.</p>
              <p>You have one more trial.</p>`,
  secondWrong: `<p>Since you failed two trials of the quiz, you have to leave the study now with a reduced amount of the participation fee.</p>`
}
