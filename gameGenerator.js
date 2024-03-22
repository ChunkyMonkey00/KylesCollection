document.querySelector("#btn").onclick = toDiv;

function toDiv() {
  let url = document.querySelector("#url").value;
  let img = document.querySelector("#img").value;
  let name = document.querySelector("#name").value;

  let div = `
  			<div class="game-container">
				<img src="${img}" alt="${name}">
				<br>
				<span onclick="createIframe('${url}')">${name}</span>
			</div>
      `
  console.log(div);
  document.querySelector("#result").textContent = div;
  
  navigator.clipboard.writeText(div);
}
