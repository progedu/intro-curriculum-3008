// Description:
//   TODO を管理することができるボットです
// Commands:
//   ボット名 todo     - TODO を作成
//   ボット名 done     - TODO を完了にする
//   ボット名 del      - TODO を消す
//   ボット名 list     - TODO の一覧表示
//   ボット名 donelist - 完了した TODO の一覧表示
'use strict';
const todo = require('todo'); // 'todo'を require で呼び出し、const で todo を定数宣言している。const は後で上書き出来ない。

module.exports = (robot) => { // bot
  robot.respond(/todo (.+)/i, (msg) => {
    /*
    respond は名前が呼ばれた時、ここでは todo 〇〇と言う文字があれば、以下の関数を実行する。
    スラッシュで囲むと、大文字小文字両方に対応でき、その中で()で囲むと、match オブジェクトで取得する事が出来る。
    (.+)は一文字以上という意味。
    slack で、bot の名前を呼んで、todo (.+) との発言を見付け、タスク名(.+)を取る。
    */
    const task = msg.match[1].trim(); // trim 空白を消す。
    todo.todo(task); // todo オブジェクトの中の、todo 関数を実行し、task を渡すと task が登録される。
    msg.send('追加しました: ' + task); // slack に投稿し、返信させる関数。
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
  robot.respond(/list/i, (msg) => { // データを取ってくる必要が無いので、(.+)と次の行はいらない。
		const list = todo.list();
		if (list.length === 0) {
			msg.send('TODO はありません。');
		} else {
			msg.send(list.join('\n')); // そのままでは配列を取ってしまうので、文字列に変更。
		}
    /*
    join('\n')で配列を文字列に変更し、区切りを \n で改行している。
    逆に文字列から配列にするには split を使う。
    */
  });
  robot.respond(/donelist/i, (msg) => {
		const donelist = todo.donelist();
		if (donelist.length === 0){
			msg.send('完了した TODO はありません。');
		} else {
			msg.send(donelist.join('\n'));
		}    
  });
};