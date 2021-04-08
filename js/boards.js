// const fetch=require("node-fetch")
let boards = []
let selectedBoard = ''
const load = document.addEventListener("DOMContentLoaded", () => {
  board();
})

const newBoard = document.querySelector(".addboards")
newBoard.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    createBoards()
  }

});

async function board() {
  document.querySelector(".boardlist").style.display = "none"
  await fetch('https://api.trello.com/1/members/me/boards?fields=name,url&key=d71118bbc2a871363416ddebdde1f69b&token=f01c685ff3583f725a159937a5add47553bef672fc1df6e5f49dda5e1854340a', {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })

    .then(res => res.json())
    .then(response => {
      console.log(response)
      const len = response.length
      boards = []
      for (let i = 0; i < len; i++) {
        boards.push({
          boardName: response[i].name,
          boardId: response[i].id
        })
      }
      console.log("ok")
      console.log(boards)
      displayBoards()
    })

}


// function displayBoards() {
//   console.log("enter")
//   console.log(boards)
//   document.querySelector(".boards").innerHTML = ""
//   template = ""
//   for (let i = 0; i < boards.length; i++)
//     if (boards)

//       template += `<div class='boa${i}' id='boardsdata' style='cursor:pointer' >` +
//         `<img src='../images/trash-2.svg' onclick='deleteBoard(${i})'alt='deleteIcon'>` +
//         `<span onclick='fetchLists("${boards[i].boardId}")'> ${boards[i].boardName} </span>` +
//         "</div>";

//   document.querySelector(".boards").innerHTML += template

// }

function displayBoards() {
  // console.log("boards", boards.length)
  document.querySelector(".boards").innerHTML = ""
  for (let i = 0; i < boards.length; i++) {
    if (boards) {
      const newDiv = document.createElement("div")
      newDiv.setAttribute("class", `boa${i}`)
      newDiv.setAttribute("id", "boardsdata")
      newDiv.style.cursor = "pointer"

      const trash = document.createElement("img")
      trash.src = "../images/trash-2.svg"
      trash.addEventListener("click", () => deleteBoard(i))

      const boardName = document.createElement("span")
      console.log(boards[i].boardName)
      boardName.innerText = boards[i].boardName
      boardName.addEventListener("click", () => fetchLists(boards[i].boardId))
      newDiv.appendChild(trash)
      newDiv.appendChild(boardName)
      document.querySelector(".boards").appendChild(newDiv)
    }

  }
}




function createBoards() {
  const boardName = document.querySelector(".addboards").value
  console.log("board")

  fetch(`https://api.trello.com/1/boards/?key=d71118bbc2a871363416ddebdde1f69b&token=f01c685ff3583f725a159937a5add47553bef672fc1df6e5f49dda5e1854340a&name=${boardName}`, {
    method: 'POST'
  }).then(resp => {
    board()
    document.querySelector(".addboards").value = ""
  })


}

function deleteBoard(ind) {
  console.log(ind)

}

function deleteBoard(i) {
  document.querySelector(`.boa${i}`).remove()
  // console.log(`board${i}`)
  fetch(`https://api.trello.com/1/boards/${boards[i].boardId}?key=d71118bbc2a871363416ddebdde1f69b&token=f01c685ff3583f725a159937a5add47553bef672fc1df6e5f49dda5e1854340a`, {
    method: 'DELETE'
  })
    // cardList[listIndex].cards.splice(cardIndex, 1);
    .then(res => {
      boards.splice(i, 1)
    })
  // .then(resp => displayBoards())
}
