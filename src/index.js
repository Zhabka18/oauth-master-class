// Авторизуем пользователя, используя инфу о нем.
const authorize = ({
  default_avatar_id: defaultAvatarId,
  display_name: displayName,
}) => {
  const avatarHtml = `<div class="avatar" style="background-image:url('https://avatars.mds.yandex.net/get-yapic/${defaultAvatarId}/islands-middle')"></div>`;
  const nameHtml = `<div class="name">${displayName}</div>`;

  document.getElementById("auth").innerHTML = `${avatarHtml}${nameHtml}`;
};

// Делаем запрос за инфой о пользователе.
const fetchYandexData = (token) =>
  fetch(`https://login.yandex.ru/info?format=json&oauth_token=${token}`).then(
    (res) => res.json()
  );

window.onload = () => {
  document.getElementById("button").onclick = () => {
    window.YaAuthSuggest.init(
      {
        client_id: "54c6922787f5412588f8ca822446dd33",
        response_type: "token",
        redirect_uri: "https://oauth-master-class3.vercel.app/token.html",
      },
      "https://oauth-master-class3.vercel.app",
    )
      .then(({ handler }) => handler())
      .then(async (data) => {
        const result = await fetchYandexData(data.access_token);
        authorize(result);
        console.log(result, data);
      })
      .catch((error) => console.log("Обработка ошибки", error));
  };
};
