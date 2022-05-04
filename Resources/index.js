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

      getRating();
    })
    .catch((error) => console.error(error));
};

const getBlog = () => {
  axios
    .get("https://codeforces.com/api/user.blogEntries?handle=" + handleValue)
    .then((response) => {
      //console.log(response);
      id1 = response.data.result[0].id;
      id2 = response.data.result[1].id;
      id3 = response.data.result[2].id;

      document.getElementById("blogTitle1").innerHTML =
        response.data.result[0].title;

      document.getElementById("blogTitle2").innerHTML =
        response.data.result[1].title;

      document.getElementById("blogTitle3").innerHTML =
        response.data.result[2].title;

      getComments();
    })
    .catch((error) => console.log(error));
};

const getComments = () => {
  let one = "https://codeforces.com/api/blogEntry.comments?blogEntryId=" + id1;
  let two = "https://codeforces.com/api/blogEntry.comments?blogEntryId=" + id2;
  let three =
    "https://codeforces.com/api/blogEntry.comments?blogEntryId=" + id3;

  const requestOne = axios.get(one);
  const requestTwo = axios.get(two);
  const requestThree = axios.get(three);

  axios
    .all([requestOne, requestTwo, requestThree])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        const responseThree = responses[2];

        //console.log(responseOne, responseTwo, responseThree);

        let len1 = responseOne.data.result.length;
        let len2 = responseTwo.data.result.length;
        let len3 = responseThree.data.result.length;
        let a, b, c;

        if (len1 < 3) {
          a = len1;
        } else {
          a = 3;
        }
        if (len2 < 3) {
          b = len2;
        } else {
          b = 3;
        }
        if (len3 < 3) {
          c = len3;
        } else {
          c = 3;
        }

        let text1 = "";
        for (let i = 0; i < a; i++) {
          text1 +=
            responseOne.data.result[i].commentatorHandle +
            ": " +
            responseOne.data.result[i].text +
            " ";
        }
        document.getElementById("comment1").innerHTML = text1;

        let text2 = "";
        for (let i = 0; i < b; i++) {
          text2 +=
            responseTwo.data.result[i].commentatorHandle +
            ": " +
            responseTwo.data.result[i].text +
            " ";
        }

        document.getElementById("comment2").innerHTML = text2;

        let text3 = "";
        for (let i = 0; i < c; i++) {
          text3 +=
            responseThree.data.result[i].commentatorHandle +
            ": " +
            responseThree.data.result[i].text +
            " ";
        }
        document.getElementById("comment3").innerHTML = text3;
      })
    )
    .catch((errors) => {
      console.error(errors);
    });
};

const getRating = () => {
  axios
    .get("https://codeforces.com/api/user.rating?handle=" + handleValue)
    .then((response) => {
      //console.log(response);
      let num = response.data.result.length;

      document.getElementById("rank0").innerHTML =
        response.data.result[num - 1].contestName +
        "  Rank: " +
        response.data.result[num - 1].rank;

      document.getElementById("rank1").innerHTML =
        response.data.result[num - 2].contestName +
        "  Rank: " +
        response.data.result[num - 2].rank;

      document.getElementById("rank2").innerHTML =
        response.data.result[num - 3].contestName +
        "  Rank: " +
        response.data.result[num - 3].rank;

      document.getElementById("rank3").innerHTML =
        response.data.result[num - 4].contestName +
        "  Rank: " +
        response.data.result[num - 4].rank;

      document.getElementById("rank4").innerHTML =
        response.data.result[num - 5].contestName +
        "  Rank: " +
        response.data.result[num - 5].rank;

      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        // Set Data
        var data = google.visualization.arrayToDataTable([
          ["Contest", "Rating"],
          [
            response.data.result[num - 5].contestName,
            response.data.result[num - 5].newRating,
          ],
          [
            response.data.result[num - 4].contestName,
            response.data.result[num - 4].newRating,
          ],
          [
            response.data.result[num - 3].contestName,
            response.data.result[num - 3].newRating,
          ],
          [
            response.data.result[num - 2].contestName,
            response.data.result[num - 2].newRating,
          ],
          [
            response.data.result[num - 1].contestName,
            response.data.result[num - 1].newRating,
          ],
        ]);
        // Set Options
        var options = {
          title: "",
          hAxis: { title: "Contests" },
          vAxis: { title: "Rating" },
          legend: "none",
        };
        // Draw
        var chart = new google.visualization.LineChart(
          document.getElementById("myChart")
        );
        chart.draw(data, options);
      }
    })
    .catch((error) => console.log(error));
};
