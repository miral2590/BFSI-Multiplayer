function GetUrlParam(paramToFind) {
  let token = new URLSearchParams(window.location.search).get(paramToFind);
  token = token ? token : "";
  return token;
}

initialScript();

function initialScript() {
  let opt;
  if(GetUrlParam('topic') && GetUrlParam('file')) {
    opt = {
      brand: isADDA ? 1 : 0,
      platformType: getPlatFormType(),
      topicName : GetUrlParam('topic'),
      contentUrl: GetUrlParam('file'),
      languageId: 0
    }
  }
  const contentDetails = JSON.stringify(opt);
  var script = document.createElement("script");
  script.src = loaderUrl;
  script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
      loadingBlock.style.display = "flex";
      progressBarFull.style.width = 100 * progress + "%";
      emptyBar.style.width = 100 * (1 - progress) + "%";
      if (progress == 1) {
        setTimeout(function () {
          loadingBlock.style.display = "none";
        }, 1000);
      }
    })
      .then((unityInstance) => {
        unityInstance.SendMessage(
          "VeekshaLibraryBehaviourController",
          "LoadContent",
          contentDetails
        );
        // loadingBar.style.display = "none";
        // fullscreenButton.onclick = () => {
        //   unityInstance.SetFullscreen(1);
        // };
      })
      .catch((message) => {
        alert(message);
      });
  };
  document.body.appendChild(script);
}
