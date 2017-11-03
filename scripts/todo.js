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
		msg.send('追加しました: ' + task);
	});
	robot.respond(/done (.+)/i, (msg) => {
		const task = msg.match[1].trim();
		todo.done(task);
		msg.send('完了にしました: ' + task);
	});
	robot.respond(/del (.+)/i, (msg) => {
		const task = msg.match[1].trim();
		todo.del(task);
		msg.send('削除しました: ' + task);
	});
	robot.respond(/list/i, (msg) => {
		const list = todo.list();
		let list_msg = '(TODOはありません)';
		if (list.length > 0) {
			list_msg = list.join('\n');
		}
		msg.send(list_msg);
	});
	robot.respond(/donelist/i, (msg) => {
		const donelist = todo.donelist();
		let donelist_msg = '(完了したTODOはありません)';
		if (donelist.length > 0) {
			donelist_msg = donelist.join('\n');
		}
		msg.send(donelist_msg);
	});
};
