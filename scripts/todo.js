// Description:
//   TODO を管理することができるボットです
// Commands:
//   ボット名 todo     - TODO を作成
//   ボット名 done     - TODO を完了にする
//   ボット名 del      - TODO を消す
//   ボット名 list     - TODO の一覧表示
//   ボット名 donelist - 完了した TODO の一覧表示
'use strict'
const todo = require('todo');

module.exports = (robot) => {
	// todoというボットの名前が呼び出されたら実行
	// .は任意の1文字 +は1回以上の繰り返し（1文字以上の文字列にマッチする）
	robot.respond(/todo (.+)/i, (msg) => {
		// msgはメッセージに関わる情報が含まれたオブジェクト
		// matchは正規表現のグループでマッチした文字列
		// 添え字1は1番目の()でマッチ
		// 添え字0は特殊で、文字列すべてが格納されている
		// trim()は文字列の両端の空白を取り除く関数
		const task = msg.match[1].trim();
		// todoモジュールのtodo関数を呼び出す
		todo.todo(task);
		// msgオブジェクトのsend関数を呼び出す
		// 「追加しました: タスク名」と表示する
		msg.send('追加しました: ' + task);
	});
	// doneというボットの名前が呼び出されたら実行
	// .は任意の1文字 +は1回以上の繰り返し（1文字以上の文字列にマッチ）
	robot.respond(/done (.+)/i, (msg) => {
		// matchは正規表現のグループでマッチした文字列
		// 添え字1は1番目の()でマッチ
		// trim()は文字列の両端の空白を取り除く関数
		const task = msg.match[1].trim();
		// todoモジュールのtodo関数を呼び出す
		todo.done(task);
		// msgオブジェクトのsend関数を呼び出す
		// 「完了にしました: タスク名」と表示する
		msg.send('完了にしました： ' + task);
	});
	// delというボットの名前が呼び出されたら実行
	// .は任意の1文字 +は1回以上の繰り返し（1文字以上の文字列にマッチ）
	robot.respond(/del (.+)/i, (msg) => {
		// matchは正規表現のグループでマッチした文字列
		// 添え字1は1番目の()でマッチ
		// trim()は文字列の両端の空白を取り除く関数
		const task = msg.match[1].trim();
		// todoモジュールのtodo関数を呼び出す
		todo.del(task);
		// msgオブジェクトのsend関数を呼び出す
		// 「削除しました: タスク名」と表示する
		msg.send('削除しました： ' + task);
	});

	robot.respond(/list/i, (msg) => {
		// 教材の答えは
		// if (list.length === 0) {
		if (!Object.keys(todo.donelist).length) {
			msg.send('TODOはありません');
		} else {
			// todoモジュールのlist()は配列が返る
			// join()を使って配列の内容を改行で区切って表示
			msg.send(todo.list().join('\n'));
		}
	});

	robot.respond(/donelist/i, (msg) => {
		// 教材の答えは
		// if (donelist.length === 0) {
		if (!Object.keys(todo.donelist).length) {
			msg.send('完了したTODOはありません');
		} else {
			// todoモジュールのdonelist()は配列が返る
			// join()を使って配列の内容を改行で区切って表示
			msg.send(todo.donelist().join('\n'));
		}
	});

};
