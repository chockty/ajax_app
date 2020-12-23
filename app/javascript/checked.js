function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    // ページがロードされた時、「posts.forEach(function (post) 」までが実行され、
    // 全てのpostに「post.addEventListener("click", () =>」が用意された状態でHTMLが設定される。
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {
      const postId = post.getAttribute("data-id");
      // getAttributeで要素名を指定することによって、その要素に入っている値を参照できる。
      const XHR = new XMLHttpRequest();
      // new XMLHttpRequest によって、サーバとAjax通信を行うためのオブジェクトを生成する。
      XHR.open("GET", `/posts/${postId}`, true);
      // openメソッドで 1.HTTPメソッド 2.送信先パス 3.非同期通信のOFF/ON を指定する。
      XHR.responseType = "json";
      // 返ってくるレスポンスデータの形式を定義する。
      XHR.send();
      // データを送信する。
      XHR.onload = () => {
        //サーバからのレスポンスを受信する
        if(XHR.status != 200) {
          //HTTPステータスが200以外の場合はアラートを表示する。
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;
        }
        const item = XHR.response.post;
        //レスポンスを定数itemへ格納（.postと指定するのは、コントローラ側でkeyをpostに指定認め）
        if (item.checked === true){
          post.setAttribute("data-checked", "true")
          // "data-checked"に"true"を格納して属性を追加
        } else if (item.checked === false) {
          post.removeAttribute("data-checked")
          // "data-checked"の属性を削除
        }
      }
    })
  })
}

setInterval(check, 1000);
window.addEventListener("load", check);