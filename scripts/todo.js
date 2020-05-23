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
		if (todo.todo(task)) {
			msg.send('追加しました: ' + task);
		} else {
			msg.send('(既に同じ名前の TODO が存在します。)');
		}
	});
	robot.respond(/done (.+)/i, (msg) => {
		const task = msg.match[1].trim();
		if (todo.done(task)) {
			msg.send('完了にしました: ' + task);
		} else {
			msg.send('(指定した TODO は存在しないか、既に完了しています。)');
		}
	});
	robot.respond(/del (.+)/i, (msg) => {
		const task = msg.match[1].trim();
		if (todo.del(task)) {
			msg.send('削除しました: ' + task);
		} else {
			msg.send('(指定した TODO は存在しません。)');
		}
	});
	robot.respond(/list/i, (msg) => {
		const list = todo.list();
		if (list.length === 0 ) {
			msg.send('(TODO はありません。)');
		} else {
			msg.send(list.join('\n'));
		}
	});
	robot.respond(/donelist/i, (msg) => {
		const donelist = todo.donelist();
		if (donelist.length === 0) {
			msg.send('(完了した TODO はありません。)');
		} else {
			msg.send(donelist.join('\n'));
		}
	});
};
