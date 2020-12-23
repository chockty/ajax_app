function memo() {
  //投稿ボタンのid「submit」を指定して定数へいれる。
  const submit = document.getElementById("submit");
  //投稿ボタンがクリックされた場合の処理を以下に記載する。
  submit.addEventListener("click", (e) => {
    // FormDataによって、フォームに入力された値を持ってくる。
    const formData = new FormData(document.getElementById("form"));
    // Ajax通信用のオブジェクトを生成する。
    const XHR = new XMLHttpRequest();
    // XHRを初期化
    XHR.open("POST", "/posts/", true);
    // レスポンスのデータフォーマットを指定 
    XHR.responseType = "json";
    // データをアクションに送信
    XHR.send(formData);
    // サーバからのレスポンス（jsonファイル）を読み込む
    XHR.onload = () => {
      // 返ってきたHTTPstatusを確認
      if(XHR.status != 200){
        alert(`Error: ${XHR.status},${XHR.statusText}`);
        return null;
      }
      // レスポンスの中身を定数へ格納
      const item = XHR.response.post;
      // HTMLにて描画する場所を特定
      const list = document.getElementById("list");
      // 後ほど入力した値をクリアにするために持ってくる
      const formText = document.getElementById("content");
      // 実際にいれるHTMLの中身を定数へ格納
      const HTML = `
        <div class="post" data-id="${item.id}">
          <div class="post-date">
              POST＿CREATE：${item.created_at}
          </div>
          <div class="post-content">
            ${item.content}
          </div>
        </div>`;
      //指定した要素（ここではlistに格納されている）の直後にいれる。
      list.insertAdjacentHTML("afterend", HTML);
      // 入力されていた値をクリアする。
      formText.value = "";
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);


