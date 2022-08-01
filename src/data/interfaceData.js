export default {
    participantIdNumber: '1', // 参与者ID
    gender: 'Male  (1)', //性别
    age: 30, //年龄
    education: 'Some High School or less  (1)', //学历
    race: 'White  (7)', //种族
    numberOfChildren: 2, //孩子数量
    maritalStatus: 'Single, never married', //婚姻状况
    annualIncome: 'Less than $30,000  (1)', //年收入
    employmentStatus: 'Unemployed  (1)', //就业状况
    participantSessionNumber: '1', // 参与者实验场次
    participantEmailAddress: '1', // 参与者邮箱
    participantIpAddress: '1', // 参与者ip地址
    participantRecruitmentId: '1', // 参与者在招募平台的id
    participantTimeStarted: '1', // 参与者的开始时间（时间戳）
    participantInGroupOrNot: false, // ( 0-no, 1-yes)
    updating: {
        participantMaxPage: 1, // 参与者的完成的最后一页
        participantCurrentAppName: '1', // 现在进行的活动名字
        participantCurrentPageName: '1', // 当前页面的名字
        finishedOrNo: false, // 是否完成问卷调查
    },
    taboo: {
        computerPrice: 1, // 计算机生成价格，（每个游戏实体都会有 单次储存 RDM）
        userPrice: 1, // 用户输入价格（单次固定）
        BDMBinary: false, // 对于参与者估价和计算随机价格比较的记录，如果估价小于计算机价格就记为1， 反之记为0
        hints: '', // 参与者获得几个提示(追加式: 4,5,6)
        correctWordsNum: 1, // 参与者猜对了几个词(更新式)
    },
    dotCounting: {
        computerPrice: 1, // 计算机生成价格，（每个游戏实体都会有 单次储存 RDM）
        userPrice: 1, // 用户输入价格（单次固定）
        BDMBinary: false, // 对于参与者估价和计算随机价格比较的记录，如果估价小于计算机价格就记为1， 反之记为0
        answerDetail:{
            round: 1, // 第几次
            correctAnswer: 1, // 正确答案
            userAnswer: 1, // 用户输入的答案
            isRight: false, // 是否正确
        },
    },
    snake: {
        computerPrice: 1, // 计算机生成价格，（每个游戏实体都会有 单次储存 RDM）
        userPrice: 1, // 用户输入价格（单次固定）
        BDMBinary: 1, // 对于参与者估价和计算随机价格比较的记录，如果估价小于计算机价格就记为1， 反之记为0
        roundDetail: {
            round: 1, // 第几轮
            result: 1, // 分数
        },
        highestScore: 1, // 最高分(更新)
    },
    video: {
        computerPrice: 1, // 计算机生成价格，（每个游戏实体都会有 单次储存 RDM）
        userPrice: 1, // 用户输入价格（单次固定）
        BDMBinary: 1, // 对于参与者估价和计算随机价格比较的记录，如果估价小于计算机价格就记为1， 反之记为0
    },
    creatingTabooCard: {
        computerPrice: 1, // 计算机生成价格，（每个游戏实体都会有 单次储存 RDM）
        userPrice: 1, // 用户输入价格（单次固定）
        BDMBinary: 1, // 对于参与者估价和计算随机价格比较的记录，如果估价小于计算机价格就记为1， 反之记为0
        roundDetail: {
            round: 1, // 第几个词 （excel中‘制作卡片的数目’的统计也可以用这个字段）
            desc: ['', '', '', ''] // 每个词的四个描述
        },
    },
    transcribing: {
        computerPrice: 1, // 计算机生成价格，（每个游戏实体都会有 单次储存 RDM）
        userPrice: 1, // 用户输入价格（单次固定）
        BDMBinary: 1, // 对于参与者估价和计算随机价格比较的记录，如果估价小于计算机价格就记为1， 反之记为0
        correctNumber: 1, // 多少个正确的字
    },
    participantTotalPayoff: 1, // 参与者会得到的最终报酬，所有参与的活动的计算机价格的总和加上固定的参与费
    participantTimeEnded: '', // 参与者离开这个问卷调查的最终时间(时间戳)
    doingGame: '', // 当前进行的项目
    doingGameState: 1, // 当前进行项目的状态， 1.未开始, 2.进行中, 3.完成 (更新)
}