export default {
  title: 'Survey',
  item0: {
    Q: 'Q1. Please indicate your email address for your payment.',
    rules: 'Please enter'
  },
  item1: {
    Q: 'Q2. Please answer the following short demographic questions. Which gender do you identify with?',
    A: ['Male', 'Female', 'Other'],
    rules: 'Please select'
  },
  item2: {
    Q: 'Q3. Please type your age (in years):',
    Re: '[to programmer: response limit from 0-120]',
    rules: 'Please enter'
  },
  item3: {
    Q: 'Q4. Please indicate the highest level of education you have completed:',
    A: ['Some High School or less', 'High School Diploma', 'Some College', '2 year/ Associates Degree', '4 year/ Bachelor’s Degree', 'Some Graduate School', 'Graduate Degree'],
    rules: 'Please select'
  },
  item4: {
    Q: 'Q5. Please indicate your race: (multiple choices are allowable.)',
    A: ['White', 'Asian/Pacific Islander', 'African American/Black', 'Native American', 'Hispanic', 'Other (Please list in the box below)'],
    rules: 'Please select'
  },
  item5: {
    Q: 'Q6. How many children do you have, if any?',
    Re: '[to programmer: response limit from 0-30]',
    rules: 'Please enter'
  },
  item6: {
    Q: 'Q7. What is your marital status?',
    A: ['Single, never married', 'Married or domestic partnership', 'Widowed', 'Divorced', 'Separated'],
    rules: 'Please select'
  },
  item7: {
    Q: 'Q8. Please indicate your personal yearly income for 2021 for all the people in your household.  (Include all forms of income, including salary, interest and dividend payments, tips, scholarship support, student loans, parental support, social security, child support, and allowance).',
    A: ['Less than $30,000', '$30,000-$39,999', '$40,000-$49,999', '$50,000-$59,999', '$60,000-$69,999', '$70,000-$79,999', '$80,000-$89,999', '$90,000-$99,999', '$100,000-$149,999', 'More than $150,000'],
    rules: 'Please select'
  },
  item8: {
    Q: 'Q9. Which of the following best describes your employment status?',
    A: ['Unemployed', 'Stay-at-Home Parent', 'Part-time Employed', 'Retired', 'Disabled', 'Student', 'Full-time Employed'],
    rules: 'Please select'
  }
}
