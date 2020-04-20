// Description:
//   TODO を管理することができるボットです
// Commands:
//   ボット名 todo     - TODO を作成
//   ボット名 done     - TODO を完了にする
//   ボット名 del      - TODO を消す
//   ボット名 list     - TODO の一覧表示
//   ボット名 donelist - 完了した TODO の一覧表示
'use strict';
// 4つの関数の集まりのモジュールの名前を todo とし、それを todo 変数に代入
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
		// 関数の集まりの todo モジュールから list 関数 (TODOの一覧の配列を取得する) を実行し、その結果を list 変数に代入
		const list = todo.list();
		// 初期は何も入ってないので配列数はゼロ
		if (list.length === 0) {
			msg.send('TODOはありません');
		} else {			
			msg.send(todo.list().join('\n'));
		}
	});
	robot.respond(/donelist/i, (msg) => {
		const donelist = todo.donelist();
		if (donelist.length === 0) {
			msg.send('完了したTODOはありません');
		} else {
		msg.send(todo.donelist().join('\n'));
		}
	});
};
