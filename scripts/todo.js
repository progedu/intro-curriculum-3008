// Description:
//   TODO を管理することができるボットです
// Commands:
//   ボット名 todo     - TODO を作成
//   ボット名 done     - TODO を完了にする
//   ボット名 del      - TODO を消す
//   ボット名 list     - TODO の一覧表示
//   ボット名 donelist - 完了した TODO の一覧表示
'use strict';
const todo = require('todo');
module.exports = (robot) => {
	robot.respond(/todo (.+)/i, (msg) => {
		const task = msg.match[1].trim();
		todo.todo(task);
		msg.send('提督、作戦を実施してください。: ' + task);
	});
	robot.respond(/done (.+)/i, (msg) => {
		const task = msg.match[1].trim();
		todo.done(task);
		msg.send('提督、作戦、成功しました。流石です。: ' + task);
	});
	robot.respond(/del (.+)/i, (msg) => {
		const task = msg.match[1].trim();
		todo.del(task);
		msg.send('カーンカーン、解体しました。: ' + task);
	});
	robot.respond(/list/i, (msg) => {
		const tasklist = todo.list();
		if (tasklist.length === 0) {
			msg.send('エラー ４０４ Ｎｏｔ Ｆｏｕｎｄ　現在、なすべき作戦は、存在しません。');
		} else {
			msg.send(tasklist.join('\n'));
		}
	});
	robot.respond(/donelist/i, (msg) => {
		const donelist = todo.donelist();
		if (donelist.length === 0) {
			msg.send('エラー ４０４ Ｎｏｔ Ｆｏｕｎｄ　現在、達成された作戦は、存在しません。');
		} else {
		msg.send(donelist.join('\n'));
		}
	});
};
