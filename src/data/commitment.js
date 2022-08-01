export default {
  title: 'Consent Form',
  desc: 'Please read the following consent form. If you consent to participate in the study, please sign using your mouse cursor and typing in the date.',
  title2: 'Introduction:',
  desc2: 'The purpose of this form is to provide you with information that may affect your decision as to whether or not to participate in this study. If you decide to participate in this study, this form will also be used to record your consent. The purpose of this study is to understand individual behavior in economic games. ',
  items: [
    {
      Q: 'How many people will be asked to be in this study? ',
      A: 'About 1000 people will be invited to participate in this study. '
    },
    {
      Q: 'What will I be asked to do? ',
      A: 'If you agree to participate in this study, you will join an online experiment in the Mturk environment. You will answer survey questions and play economic games for which you can receive a monetary compensation. ',
      desc: 'There is a quiz about the instructions and you have two trials before you start the study. If you fail the quiz twice, you will be dropped out of the study with a reduced participation fee.'
    },
    {
      Q: 'Are there any risks to me? ',
      A: 'There are no known risks associated with this study. '
    },
    {
      Q: 'Are there any benefits to me? ',
      A: 'There are no direct benefits. '
    },
    {
      Q: 'Will There Be Any Costs To Me? ',
      A: 'You need to use your personal computer or mobile device to complete this study. The study will take around 30 minutes to complete. Aside from your time, there are no additional costs. '
    },
    {
      Q: 'Do I have to participate? ',
      A: 'No. Your participation is voluntary. You may decide not to participate or to withdraw at any time. '
    },
    {
      Q: 'Will I be compensated? ',
      A: 'Yes, you will receive a $x participation fee and extra earnings based on your decisions and potentially the decisions of others in the study. '
    },
    {
      Q: 'Who will know about my participation in this research study? ',
      A: 'This study is confidential, and the records of this study will be kept private. No identifiers linking you to this study will be included in any sort of report that might be published. Research records will be stored securely. '
    },
    {
      Q: 'Who may I Contact for More Information? ',
      A: 'You may contact the Principal Investigator, Dr. Marco Palma regarding any concerns or complaints about the study at mapalma@tamu.edu, or Dr. Erkmen Aslim at aslime@gvsu.edu. For questions about your rights as a research participant, you may contact the Texas A&M University Human Subjects Protection Program at 979.458.4067, toll-free at 1.855.795.8636, or email at irb@tamu.edu. '
    }
  ],
  tipsTitle: 'By completing this survey, you are giving permission to the investigator to use your answers and recordings to study questions for research purposes. ',
  tipsCon: `<p>By consenting to start the study, you acknowledge: </p>
            <p>Your participation in the study is voluntary. </p>
            <p>You are at least 18 years of age. </p>
            <p>If you agree to participate, please consent to this form to start! </p>`,
  tipsItem: [
    {
      con: 'I understand and I DO want to participate in this study.',
      res: true
    },
    {
      con: 'I understand and I DO NOT want to participate in this study. ',
      res: false
    }
  ],
  foot: 'IRB NUMBER: IRB2020-1466M IRB APPROVAL DATE: 02/05/2021 ',
  sitOutTips: 'Thank you for your participation.'
}
