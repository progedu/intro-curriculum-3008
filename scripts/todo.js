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
		msg.send('追加しましたニャ: ' + task);
	});

	robot.respond(/done (.+)/i, (msg) => {
		const task = msg.match[1].trim();
		todo.done(task);
		msg.send('完了にしましたニャ: ' + task);
	});

	robot.respond(/del (.+)/i, (msg) => {
		const task = msg.match[1].trim();
		todo.del(task);
		msg.send('削除しましたニャ: ' + task);
	});

	robot.respond(/list/i, (msg) => {
		const list = todo.list(); //list配列を取得する
		if (list.length === 0) {
			msg.send('予定はまだ無いニャ :thinking_face:');
		} else {
		  msg.send(list.join('\n'));
	}
	});

	robot.respond(/donelist/i, (msg) => {
		const donelist = todo.donelist(); //donelist配列を取得する
		if (donelist.length === 0) {
			msg.send('完了した予定はまだ無いニャ :disappointed_relieved:');
		} else {
		  msg.send(donelist.join('\n'));
	}
	});
};
