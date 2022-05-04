let handleValue, id, no;
const getInfo = () => {
  handleValue = document.getElementById("handle_id").value;
  axios
    .get("https://codeforces.com/api/user.info?handles=" + handleValue)
    .then((response) => {
      console.log(handleValue);
      bloghandle = handleValue;
      //console.log(response);
      document.getElementById("name").innerText =
        "Name: " +
        response.data.result[0].firstName +
        " " +
        response.data.result[0].lastName;
      document.getElementById("rating").innerText =
        "Rating: " + response.data.result[0].rating;
      document.getElementById("maxRating").innerText =
        "Max Rating: " + response.data.result[0].maxRating;
      document.getElementById("rank").innerText =
        "Rank: " + response.data.result[0].rank;
      document.getElementById("place").innerText =
        "Place: " +
        response.data.result[0].city +
        ", " +
        response.data.result[0].country;
      document.getElementById(
        "pic"
      ).innerHTML = `<img src='${response.data.result[0].avatar}'>`;
      document.getElementById("blogBtn").style.display = "inline";
    })
    .catch((error) => console.error(error));
};

const getBlog = () => {
  axios
    .get("https://codeforces.com/api/user.blogEntries?handle=" + handleValue)
    .then((response) => {
      //console.log(response);
      id = response.data.result[0].id;
      no = response.data.result.length;
      console.log(no);
      let text = response.data.result[0].title + " ";
      for (let i = 1; i < no; i++) {
        text += response.data.result[i].title + " ";
      }
      document.getElementById("blogTitle").innerHTML = text;

      getComments();
    })
    .catch((error) => console.log(error));
};

const getComments = () => {
  //console.log(id);

  axios
    .get("https://codeforces.com/api/blogEntry.comments?blogEntryId=" + id)
    .then((response) => {
      console.log(response);
      document.getElementById("comment").innerHTML =
        response.data.result[0].text;
    })
    .catch((error) => console.log(error));
};

// avatar: "https://userpic.codeforces.org/422/avatar/2b5dbe87f0d859a2.jpg";
// city: "Gomel";
// contribution: 156;
// country: "Belarus";
// firstName: "Gennady";
// friendOfCount: 43316;
// handle: "tourist";
// lastName: "Korotkevich";
// lastOnlineTimeSeconds: 1651404461;
// maxRank: "legendary grandmaster";
// maxRating: 3979;
// organization: "ITMO University";
// rank: "legendary grandmaster";
// rating: 3814;
// registrationTimeSeconds: 1265987288;
// titlePhoto: "https://userpic.codeforces.org/422/title/50a270ed4a722867.jpg";
