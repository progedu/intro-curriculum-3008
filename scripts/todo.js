// Description:
//   TODO を管理することができるボットです
// Commands:
//   ボット名 add      - TODO を作成
//   ボット名 done     - TODO を完了にする
//   ボット名 del      - TODO を消す
//   ボット名 list     - TODO の一覧表示
//   ボット名 donelist - 完了した TODO の一覧表示
'use strict';
const todo = require('todo');
module.exports = (robot) => {
	robot.respond(/add (.+)/i, (msg) => {
		const task = msg.match[1].trim();
		todo.add(task);
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
		// todo.list()が重い処理の可能性もあるので、何度も呼び出さなくて済むようにする
		const list = todo.list();
		if (list === 0) {
			// TODOが一つもない場合は以下のメッセージを返す
			msg.send('(TODOはありません)');
		} else {
			// join()関数は配列の全ての要素を与えられた文字列でつないで1つの文字列にする
			msg.send(list.join('\n'));
		}
	});
	robot.respond(/donelist/i, (msg) => {
		// todo.donelist()が重い処理の可能性もあるので、何度も呼び出さなくて済むようにする
		const donelist = todo.donelist();
		if (donelist.length === 0) {
			// 完了したTODOが一つもない場合は以下のメッセージを返す
			msg.send('(完了したTODOはありません)');
		} else {
			msg.send(donelist.join('\n'));
		}
	});
};
