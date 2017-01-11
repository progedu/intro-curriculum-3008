// Description:
//   TODO を管理することができるボットです
// Commands:
//   ボット名 todo     - メンバー を作成
//   ボット名 done     - メンバー に告白する
//   ボット名 del      - メンバー が帰国する
//   ボット名 list     - メンバー の一覧表示
//   ボット名 donelist - 告白した メンバー の表示 
'use strict';

const todo = require('todo');
const persons = new Map();
const person = persons[Math.floor(Math.random() * persons.length)];
module.exports = (robot) => {
	robot.respond(/todo (.+)/i, (msg) => {
		const task = msg.match[1].trim();
		todo.todo(task);
		msg.send('新メンバーの追加: ' + task + ' さん');
	});
	robot.respond(/done (.+)/i, (msg) => {
		const task = msg.match[1].trim();
		const persons = todo.list(task,false)
		const person = persons[Math.floor(Math.random() * persons.length)];

		if( persons.length >= 2) {
		todo.done(task)
		const persons = todo.list(task,false)
		const person = persons[Math.floor(Math.random() * persons.length)];
		msg.send('ダダダダーン!! [ ' + task + ' ] さんが [ ' + person   +' ] さんに告白');
		;
		} else if( persons.length ===1) {
		msg.send('メンバーは' + task + 'さんだけです、新メンバーを追加するか del で帰国してください');
		}else{
			msg.send('告白する相手がいません、新メンバーを追加するか del で帰国してください');
		}
	});

	// done した後、donelist で成功か失敗かの結果を表示
	
	// 告白に成功した場合、カップルが成立したメンバーに対して del を実行してください
	// 2人はキスをして日本に帰国します

    // 告白に失敗した場合、告白をしたメンバーのみ del　を実行してください
	// 1人で日本に帰国します

	robot.respond(/del (.+)/i, (msg) => {
		const task = msg.match[1].trim();
		todo.del(task);
		msg.send( task + ' さんが国を出ることになりました');
	});
	robot.respond(/list/i, (msg) => {
		const tasklist = todo.list();
		if (tasklist.length === 0) {
			msg.send('メンバーがいません')
		} else  {
			msg.send(todo.list().join('\n'))
	} 
	});
	robot.respond(/donelist/i, (msg) => {
		const taskdonelist = todo.donelist();

		if (taskdonelist.length === 0) {
			msg.send('カップルがいません');
		} else {
			const persons = todo.list();
		　　const person = todo.list()
			const lots = ['  さんは、カップル成立です。おめでとう!!',' さんは、カップル不成立です。Bye!!' + todo.donelist()];
			const lot = lots[Math.floor(Math.random() * lots.length)];
			msg.send(todo.donelist().join('\n') +'  さんと' + person +lot );
			msg.send()
		}
	});
};