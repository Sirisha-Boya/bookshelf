// import axios from "axios";


// const baseURL = "https://www.googleapis.com/books/v1/volumes?q";
// export const requests = {
//   technology: `${baseURL}=subject:technology&key=${API_KEY}&langRestrict=en&maxResults=40`,
//   novels: `${baseURL}=subject:novel&key=${API_KEY}&langRestrict=en&maxResults=40`,
//   it: `${baseURL}=subject:it&key=${API_KEY}&langRestrict=en&maxResults=40`,
//   poetry: `${baseURL}=subject:poetry&key=${API_KEY}&langRestrict=en&maxResults=40`,
//   humor: `${baseURL}=subject:humor&key=${API_KEY}&langRestrict=en&maxResults=40`,
// };
// https://www.googleapis.com/books/v1/volumes?q=subject:technology&key=AIzaSyAGp1hTQjtZEqFDya1Q-r6fdw_gD-FIgno&langRestrict=en&maxResults=40
export const requests = {
  technology: `http://www.localhost:4000/technology`,
  novels: `http://www.localhost:4000/novels`,
  it: `http://www.localhost:4000/it`,
  poetry: `http://www.localhost:4000/poetry`,
  humor: `http://www.localhost:4000/humor`,
};

// export const searchBooks = () => {
//   const bookSearch = [
//     axios.get(requests.technology),
//     axios.get(requests.novels),
//     axios.get(requests.poetry),
//     axios.get(requests.it),
//     axios.get(requests.humor),
//   ];

//   var res = Promise.all(bookSearch)
//     .then((responses) => {
//       const combinedResults = responses.reduce(
//         (results, response) => results.concat(response.data.items),
//         []
//       );
//       console.log("search data", combinedResults);
//       return combinedResults;
//     })
//     .catch((error) => {
//       console.error("Error searching for books:", error);
//     });

//   return res;
// };
